import React, { useState, useMemo } from 'react';
import { TaxColumn } from '../types';
import { TAX_COLUMNS } from '../data/columns';
import { Search, BookOpen, Clock, Calendar, ArrowLeft, Tag, Share2, Check, ArrowRight, Calculator } from 'lucide-react';

interface ColumnViewsProps {
  selectedColumnId: string | null;
  onSelectColumn: (id: string | null) => void;
  onGoToSimulator: () => void;
}

export const ColumnViews: React.FC<ColumnViewsProps> = ({
  selectedColumnId,
  onSelectColumn,
  onGoToSimulator,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copied, setCopied] = useState(false);

  // Active column lookup
  const activeColumn = useMemo(() => {
    if (!selectedColumnId) return null;
    return TAX_COLUMNS.find((c) => c.id === selectedColumnId) || null;
  }, [selectedColumnId]);

  // Filtered columns
  const filteredColumns = useMemo(() => {
    return TAX_COLUMNS.filter((col) => {
      const matchCategory = selectedCategory === '전체' || col.category === selectedCategory;
      const matchQuery =
        searchQuery.trim() === '' ||
        col.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        col.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        col.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCategory && matchQuery;
    });
  }, [selectedCategory, searchQuery]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // If viewing a single column in detail
  if (activeColumn) {
    return (
      <article id="column-detail-view" className="max-w-4xl mx-auto space-y-6">
        {/* Navigation bar */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => onSelectColumn(null)}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-blue-600 bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>칼럼 목록으로 돌아가기</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 bg-white px-3 py-2 rounded-xl border border-slate-200 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copied ? '링크 복사됨' : '공유하기'}</span>
            </button>
            <button
              onClick={onGoToSimulator}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 px-3.5 py-2 rounded-xl shadow-sm transition-colors"
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>시뮬레이터로 계산</span>
            </button>
          </div>
        </div>

        {/* Article Header Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-sm space-y-4">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full font-bold border border-blue-100">
              {activeColumn.category}
            </span>
            <div className="flex items-center gap-1 text-slate-400">
              <Calendar className="w-3.5 h-3.5" />
              <span>{activeColumn.publishedDate}</span>
            </div>
            <span className="text-slate-300">•</span>
            <div className="flex items-center gap-1 text-slate-400">
              <Clock className="w-3.5 h-3.5" />
              <span>{activeColumn.readTime}</span>
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug font-serif">
            {activeColumn.title}
          </h1>

          <div className="bg-slate-50 border-l-4 border-blue-600 p-4 rounded-r-xl text-slate-700 text-sm leading-relaxed">
            <span className="font-semibold text-slate-900">핵심 요약: </span>
            {activeColumn.summary}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 pt-2">
            {activeColumn.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg"
              >
                <Tag className="w-3 h-3 text-slate-400" />
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Article Body Content */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-sm space-y-6 text-slate-800 leading-relaxed text-base">
          {activeColumn.content.map((paragraph, index) => {
            if (paragraph.startsWith('### ')) {
              return (
                <h2
                  key={index}
                  className="text-lg sm:text-xl font-bold text-slate-900 pt-5 pb-1 border-b border-slate-100 font-serif"
                >
                  {paragraph.replace('### ', '')}
                </h2>
              );
            }

            if (paragraph.startsWith('- ')) {
              return (
                <li key={index} className="ml-4 list-disc text-slate-700 pl-1">
                  <span
                    dangerouslySetInnerHTML={{
                      __html: paragraph.replace('- ', '').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'),
                    }}
                  />
                </li>
              );
            }

            if (paragraph.match(/^[0-9]\. /)) {
              return (
                <div key={index} className="ml-2 pl-2 border-l-2 border-slate-200 my-2">
                  <span
                    dangerouslySetInnerHTML={{
                      __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'),
                    }}
                  />
                </div>
              );
            }

            return (
              <p
                key={index}
                className="text-slate-700 leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong class="text-slate-900 font-semibold">$1</strong>'),
                }}
              />
            );
          })}

          {/* Bottom Interactive CTA Box */}
          <div className="mt-8 pt-6 border-t border-slate-200 bg-blue-50/50 -mx-6 sm:-mx-10 -mb-6 sm:-mb-10 p-6 sm:p-10 rounded-b-3xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">
                내 사업의 실질 세금·건보료 차이를 확인해보세요
              </h3>
              <p className="text-xs text-slate-600 mt-0.5">
                매출과 순이익을 입력하면 본 칼럼의 절세 공식이 자동 적용된 실시간 비교 리포트가 생성됩니다.
              </p>
            </div>
            <button
              onClick={onGoToSimulator}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md transition-colors flex-shrink-0"
            >
              <span>시뮬레이터 바로가기</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </article>
    );
  }

  // Column List Overview
  return (
    <div id="column-list-view" className="space-y-6">
      {/* Search and Category Filter Bar */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm space-y-4">
        <div>
          <div className="flex items-center gap-2 text-blue-600 mb-1">
            <BookOpen className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-wider">BizTax Research Columns</span>
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight font-serif">
            1인 기업 & 개인사업자 절세 심층 전문 칼럼
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            단순 상식이 아닌 조세특례제한법 및 건강보험공단 실무 지침에 근거한 검증된 절세 가이드라인을 제공합니다.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="칼럼 제목, 키워드(예: 건보료, 무보수, 청년감면, 가지급금) 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-1.5">
            {['전체', '법인전환', '건강보험', '세액감면', '급여전략', '비용처리', '자금관리', '배당전략', '퇴직금플랜', '가족법인'].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs px-3 py-2 rounded-xl font-medium transition-colors ${
                  selectedCategory === cat
                    ? 'bg-slate-900 text-white font-bold'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid of Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredColumns.map((col) => (
          <div
            key={col.id}
            id={`column-card-${col.id}`}
            onClick={() => onSelectColumn(col.id)}
            className="bg-white rounded-2xl border border-slate-200/90 hover:border-blue-400 shadow-sm hover:shadow-md transition-all p-6 flex flex-col justify-between cursor-pointer group"
          >
            <div>
              <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                <span className="px-2.5 py-0.5 bg-blue-50 text-blue-700 rounded-full font-bold border border-blue-100">
                  {col.category}
                </span>
                <div className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{col.readTime}</span>
                </div>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug font-serif">
                {col.title}
              </h3>

              <p className="text-xs text-slate-600 mt-2.5 line-clamp-3 leading-relaxed">
                {col.summary}
              </p>
            </div>

            <div className="pt-5 mt-4 border-t border-slate-100 flex items-center justify-between">
              <div className="flex flex-wrap gap-1">
                {col.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="text-[10px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                    #{tag}
                  </span>
                ))}
              </div>

              <span className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 group-hover:translate-x-1 transition-transform">
                <span>자세히 보기</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        ))}
      </div>

      {filteredColumns.length === 0 && (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 text-slate-500">
          <p className="text-sm font-medium">검색 조건에 맞는 칼럼이 없습니다.</p>
          <button
            onClick={() => {
              setSelectedCategory('전체');
              setSearchQuery('');
            }}
            className="mt-3 text-xs text-blue-600 hover:underline font-semibold"
          >
            검색 필터 초기화하기
          </button>
        </div>
      )}
    </div>
  );
};
