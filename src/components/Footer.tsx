import React from 'react';
import { TrendingUp, ShieldCheck, Mail, BookOpen, Calculator } from 'lucide-react';

interface FooterProps {
  onNavigateTab: (tab: 'simulator' | 'columns' | 'about' | 'legal') => void;
  onSelectColumn?: (id: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateTab, onSelectColumn }) => {
  return (
    <footer id="main-footer" className="bg-slate-900 border-t border-slate-800 text-slate-400 text-xs mt-16 pt-12 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5 text-white">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold">
                <TrendingUp className="w-4 h-4 text-white" />
              </div>
              <span className="font-extrabold text-base tracking-tight font-serif">BizTax Lab</span>
              <span className="text-[10px] text-blue-300 bg-blue-900/60 px-2 py-0.5 rounded border border-blue-700/50">
                v2025/2026 Engine
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-md">
              BizTax Lab은 유튜버, 스마트스토어, 개발자, 프리랜서 등 연 매출 5천만~3억 원대 1인 사업자를 위해 종합소득세, 법인세, 건강보험료, 국민연금을 정밀 시뮬레이션하고 최적의 절세 손익분기점을 분석하는 독립 세무 유틸리티 포털입니다.
            </p>
            <div className="text-[11px] text-slate-500">
              © {new Date().getFullYear()} BizTax Lab. All rights reserved. 브라우저 로컬 연산 기반 프라이버시 보호.
            </div>
          </div>

          {/* Nav Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">주요 서비스</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigateTab('simulator')}
                  className="hover:text-blue-400 transition-colors flex items-center gap-1.5"
                >
                  <Calculator className="w-3.5 h-3.5" />
                  <span>세금·건보료 실시간 시뮬레이터</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('columns')}
                  className="hover:text-blue-400 transition-colors flex items-center gap-1.5"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>절세 심층 분석 칼럼 4편</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('about')}
                  className="hover:text-blue-400 transition-colors"
                >
                  연구소 취지 및 자주 묻는 질문(FAQ)
                </button>
              </li>
            </ul>
          </div>

          {/* Legal & Compliance Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">법적 고지 및 고객센터</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigateTab('legal')}
                  className="hover:text-blue-400 transition-colors flex items-center gap-1.5"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>개인정보처리방침 & 구글 광고 쿠키</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('legal')}
                  className="hover:text-blue-400 transition-colors"
                >
                  이용약관 및 세무 면책조항
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('legal')}
                  className="hover:text-blue-400 transition-colors flex items-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>제휴 및 오류 제보 문의</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer Bar */}
        <div className="pt-6 border-t border-slate-800 text-[11px] text-slate-400 leading-relaxed">
          <p>
            <strong>면책 공고:</strong> 본 웹사이트에서 산출되는 시뮬레이션 결과(종합소득세, 법인세, 건강보험료, 국민연금 등)는 소득세법, 법인세법, 조세특례제한법 및 국민건강보험법 규정을 기반으로 한 추정치로서, 개별 사업자의 세부 소득공제 및 자산 변동 상황에 따라 실제 고지액과 차이가 있을 수 있습니다. 본 결과를 토대로 실제 법인 설립 및 세무 신고를 진행하기 전에는 반드시 공인회계사 또는 세무사 등 전문가의 자문을 받으시기 바랍니다.
          </p>
        </div>
      </div>
    </footer>
  );
};
