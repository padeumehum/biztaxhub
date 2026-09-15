import React, { useState } from 'react';
import { ShieldCheck, ChevronDown, ChevronUp, CheckCircle, Database, Lock, TrendingUp, Sparkles, Building2 } from 'lucide-react';

export const AboutView: React.FC = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: '개인사업자에서 1인 법인으로 전환하면 왜 건강보험료가 획기적으로 줄어드나요?',
      a: '개인사업자의 ‘지역건강보험료’는 사업소득뿐만 아니라 본인 명의의 주택, 아파트 전월세, 자동차 등 재산 점수까지 합산되어 부과됩니다. 반면 1인 법인의 대표이사는 ‘직장가입자’로 분류되어 개인 명의 부동산이나 자동차에 상관없이 법인에서 본인이 수령하는 ‘월 급여액’에 대해서만 약 8%의 정률(회사 4% + 근로자 4%)로 산정되기 때문에 순이익이 높을수록 절감 폭이 비약적으로 커집니다.',
    },
    {
      q: '1인 법인 설립 시 자본금은 얼마로 시작하는 것이 적절한가요?',
      a: '상법 개정으로 자본금 100원 이상이면 자유롭게 법인 설립이 가능합니다. 다만 실무적으로는 법인 사업자등록 발급 시 세무서의 위장법인 의심을 방지하고, 초기 2~3개월간의 법인카드 결제 및 세무기장료, 서버비 등을 충당하기 위해 100만~500만 원 선에서 설립하는 것이 가장 일반적이고 권장됩니다.',
    },
    {
      q: '혼자 일하는 1인 기업인데 법인 운영 및 회계 관리가 너무 복잡하지 않나요?',
      a: '과거와 달리 전자등기 시스템과 전문 세무회계 플랫폼의 발달로 1인 법인 운영이 매우 간소화되었습니다. 세무사 사무실에 법인 기장을 맡기면 원천세 신고, 4대보험 취득/상실 신고, 부가세 및 법인세 결산을 모두 대행해 줍니다. 대표자가 지켜야 할 가장 중요한 핵심은 "법인 통장 돈을 개인 용도로 함부로 이체하지 않고 급여나 배당으로 공식 인출하는 것" 하나뿐입니다.',
    },
    {
      q: '법인 설립 후 무보수 대표로 있다가 나중에 급여를 책정하면 세무상 불이익이 있나요?',
      a: '불이익이 전혀 없습니다. 초기에는 무보수로 신고하여 4대보험료 부담을 0으로 유지하다가, 법인 매출과 순이익이 월 300만 원 이상으로 안정화되었을 때 주주총회 또는 이사회 결의서를 통해 월 급여를 정상 책정하고 4대보험 직장가입자로 편입하면 됩니다. 이는 세법 및 공단 지침상 정당한 권리입니다.',
    },
    {
      q: '청년창업중소기업 세액감면(조특법 제6조)을 받으려면 왜 주소지가 결정적인가요?',
      a: '조세특례제한법 제6조는 창업 당시 대표자가 만 34세 이하(군필자는 최대 40세)일 때 5년간 50%~100%의 세액을 감면합니다. 이때 서울 및 수도권 과밀억제권역(강남, 판교, 성남 등)에 본점을 두면 50%만 감면되지만, 과밀억제권역 외(인천 송도 경제자유구역, 경기 용인, 화성, 평택 등)에 본점을 등록하면 100% 전액 감면되기 때문입니다.',
    },
  ];

  return (
    <div id="about-us-view" className="max-w-4xl mx-auto space-y-8">
      {/* Hero Banner */}
      <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-sm space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-100">
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          <span>Independent Tax & Social Insurance Research</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-serif">
          BizTax Lab은 왜 탄생했을까요?
        </h1>
        <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
          최근 1인 미디어(유튜버), 스마트스토어 셀러, IT 개발자, 전문직 프리랜서 중 연 매출 5천만~3억 원 구간에 진입한 사업자들이 급증하고 있습니다. 
          하지만 기존의 연봉 계산기나 단순 인터넷 게시글은 "개인 종합소득세의 급격한 누진세율"과 "지역건강보험료 폭탄"의 결합 위험을 제대로 짚어주지 못합니다.
        </p>
        <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
          BizTax Lab은 대한민국 자영업자와 신기술 지식창업가들이 가장 투명하고 객관적으로 세금과 건강보험료를 비교 분석하여, 합법적인 절세와 비즈니스 자산 형성을 달성할 수 있도록 돕는 독립 세무 기술 연구 프로젝트입니다.
        </p>
      </div>

      {/* 3 Pillars of BizTax Lab */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm space-y-2">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            <TrendingUp className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-base">정밀 세법 엔진</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            소득세법 제55조, 법인세법 제55조, 조세특례제한법 제6조 청년창업감면을 완벽 반영하여 2025/2026 최신 개정 세율로 연산합니다.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm space-y-2">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <Lock className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-base">100% 클라이언트 연산</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            고객님의 소중한 매출 및 소득 정보는 일체 서버로 전송되거나 저장되지 않으며, 사용자 브라우저 내부에서만 즉시 계산 후 폐기됩니다.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm space-y-2">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
            <Building2 className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-base">건보료 연동 분석</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            세금뿐만 아니라 사업자들에게 더 무서운 국민건강보험료(지역가입자 vs 직장가입자)와 피부양자 박탈 규정을 함께 진단합니다.
          </p>
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-sm space-y-6">
        <div>
          <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">
            Frequently Asked Questions
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight font-serif">
            자주 묻는 질문 (FAQ)
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="border border-slate-200/90 rounded-2xl overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-3 hover:bg-slate-50 transition-colors"
                >
                  <span className="font-bold text-slate-900 text-sm sm:text-base flex items-center gap-2">
                    <span className="text-blue-600 font-serif font-extrabold">Q.</span>
                    {faq.q}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-slate-500 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-500 flex-shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-100 bg-slate-50/50">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
