import React, { useState } from 'react';
import { SimulationResult } from '../types';
import { formatKoreanWon } from './SimulatorForm';
import { 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  ArrowRight, 
  Building2, 
  User, 
  PiggyBank,
  ShieldCheck,
  Zap,
  Info
} from 'lucide-react';

interface ComparisonDashboardProps {
  result: SimulationResult;
  onNavigateToColumn?: (columnId: string) => void;
}

export const ComparisonDashboard: React.FC<ComparisonDashboardProps> = ({ result, onNavigateToColumn }) => {
  const [showDetails, setShowDetails] = useState(false);
  const { soleProp, corp, annualSavings, disposableWealthDifference, recommendationLevel, recommendationTitle, recommendationReason } = result;

  const isAdvantageous = annualSavings > 0;
  const absSavings = Math.abs(annualSavings);

  // 시각화 비율 계산 (최대 100%)
  const maxBurden = Math.max(soleProp.totalBurden, corp.totalBurden, 1);
  const soleBarPercent = Math.min(100, Math.round((soleProp.totalBurden / maxBurden) * 100));
  const corpBarPercent = Math.min(100, Math.round((corp.totalBurden / maxBurden) * 100));

  return (
    <div id="comparison-dashboard-container" className="space-y-6">
      {/* 1. Top Impact Card: Final Conclusion & Savings */}
      <div 
        id="result-hero-card"
        className={`rounded-2xl p-6 sm:p-8 text-white relative overflow-hidden shadow-xl transition-all ${
          isAdvantageous 
            ? 'bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 border border-blue-500/30' 
            : 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-slate-700'
        }`}
      >
        <div className="relative z-10">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/30">
              <Zap className="w-3.5 h-3.5 text-blue-400" />
              <span>실시간 세무·건보료 비교 진단 결과</span>
            </div>

            {/* Recommendation badge */}
            <div className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold ${
              recommendationLevel === 'strongly_recommended'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/40'
                : recommendationLevel === 'recommended'
                ? 'bg-blue-500/20 text-blue-300 border border-blue-400/40'
                : recommendationLevel === 'neutral'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-400/40'
                : 'bg-slate-500/20 text-slate-300 border border-slate-400/30'
            }`}>
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{recommendationTitle}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Primary Savings Hero Metric */}
            <div className="lg:col-span-7">
              <div className="text-sm font-medium text-slate-300 mb-1">
                {isAdvantageous ? '1인 법인 설립 시 예상되는 연간 총비용 절감액' : '개인사업자 유지 시 예상 연간 비용 차이'}
              </div>
              <div className="flex items-baseline gap-3 flex-wrap">
                <span className={`text-4xl sm:text-5xl font-extrabold tracking-tight font-serif ${
                  isAdvantageous ? 'text-emerald-400' : 'text-slate-200'
                }`}>
                  {isAdvantageous ? `+ ${formatKoreanWon(absSavings)}` : `- ${formatKoreanWon(absSavings)}`}
                </span>
                <span className="text-xs sm:text-sm text-slate-300 font-medium">
                  {isAdvantageous ? '/ 연간 세금·건보료 절감' : '/ 연간 개인사업자 우세'}
                </span>
              </div>

              <p className="mt-4 text-sm text-slate-300 leading-relaxed max-w-2xl">
                {recommendationReason}
              </p>

              {/* BEP Callout */}
              <div className="mt-4 pt-4 border-t border-slate-800/80 flex flex-wrap items-center gap-4 text-xs text-slate-300">
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold text-white">최적 손익분기점(BEP):</span>
                  <span className="text-blue-400 font-bold">순이익 약 6,000만~7,000만 원 선</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold text-white">현재 고객님 순이익:</span>
                  <span className="text-emerald-400 font-bold">{formatKoreanWon(result.input.netProfit)}</span>
                </div>
              </div>
            </div>

            {/* Quick Wealth Creation Summary */}
            <div className="lg:col-span-5 bg-white/5 rounded-xl p-4 sm:p-5 border border-white/10 space-y-3">
              <div className="text-xs font-semibold text-blue-200 uppercase tracking-wider flex items-center gap-1.5">
                <PiggyBank className="w-4 h-4 text-blue-300" />
                <span>실질 자산 창출 및 유보금 비교</span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between items-center py-1.5 border-b border-white/10">
                  <span className="text-slate-400">개인사업자 순 가처분소득</span>
                  <span className="text-slate-200 font-semibold">{formatKoreanWon(soleProp.takeHomeIncome)}</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-white/10">
                  <span className="text-slate-400">법인 대표 실수령 급여</span>
                  <span className="text-slate-200 font-semibold">{formatKoreanWon(corp.ceoNetTakeHomeSalary)}</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-white/10">
                  <span className="text-blue-300 font-medium">법인 통장 사내유보금(저율과세)</span>
                  <span className="text-emerald-400 font-bold">+{formatKoreanWon(corp.corporateRetainedEarnings)}</span>
                </div>
                <div className="flex justify-between items-center pt-1 font-bold text-sm">
                  <span className="text-white">법인 총 창출 자산</span>
                  <span className="text-blue-300">{formatKoreanWon(corp.totalWealthCreated)}</span>
                </div>
              </div>

              <div className="text-[11px] text-slate-400 bg-slate-800/60 p-2 rounded-lg border border-slate-700/50">
                💡 법인 사내유보금은 통장에 안전하게 적립되어 재투자, 장기 임원 퇴직금, 정기 배당의 재원이 됩니다.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Dependent Disqualification Warning Banner (Crucial!) */}
      {soleProp.isDependentDisqualified && (
        <div id="dependent-warning-banner" className="bg-amber-50 border-l-4 border-amber-500 rounded-xl p-4 sm:p-5 shadow-sm">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="space-y-1.5 text-sm">
              <h3 className="font-bold text-amber-900">
                건강보험 피부양자 자격 박탈 및 지역건보료 부과 경고
              </h3>
              <p className="text-amber-800 leading-relaxed text-xs sm:text-sm">
                현재 ‘피부양자’ 자격이지만, 사업자등록 후 연간 순이익(사업소득)이 1원 이상 발생하면 국민건강보험법 시행규칙 제41조에 따라 
                <strong> 피부양자 자격이 즉시 박탈</strong>되고 지역가입자로 전환되어 연간 약 <strong>{formatKoreanWon(soleProp.healthInsuranceAnnual)}</strong>의 지역건보료 고지서가 부과됩니다.
              </p>
              <div className="pt-2 flex items-center gap-2">
                <span className="text-xs font-semibold text-amber-950">💡 해결책:</span>
                <span className="text-xs text-amber-900">
                  1인 법인을 설립하여 ‘무보수 대표’로 신고하면 합법적으로 피부양자 자격을 유지할 수 있습니다.
                </span>
                {onNavigateToColumn && (
                  <button
                    onClick={() => onNavigateToColumn('column-2')}
                    className="text-xs font-bold text-blue-700 hover:text-blue-900 underline inline-flex items-center gap-0.5 ml-1"
                  >
                    <span>무보수 대표 건보료 실전 가이드 읽기</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. Visual Comparison Cards: Side-by-Side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: 개인사업자 */}
        <div id="card-sole-proprietor" className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center font-bold">
                  <User className="w-4 h-4" />
                </span>
                <div>
                  <h3 className="text-base font-bold text-slate-900">개인사업자 부담 내역</h3>
                  <p className="text-xs text-slate-500">종합소득세 + 지역건보료 + 국민연금</p>
                </div>
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                실효부담률 {soleProp.effectiveRate}%
              </span>
            </div>

            {/* Cost Breakdown Rows */}
            <div className="py-4 space-y-3 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-slate-600 flex items-center gap-1">
                  종합소득세 (본세)
                  <span className="text-[11px] text-slate-400 font-mono">(6%~45% 누진세)</span>
                </span>
                <span className="font-semibold text-slate-900">{formatKoreanWon(soleProp.incomeTax)}</span>
              </div>

              {soleProp.youthDiscountAmount > 0 && (
                <div className="flex justify-between items-center text-xs text-emerald-600 bg-emerald-50 px-2 py-1 rounded">
                  <span>청년창업 세액감면 혜택</span>
                  <span className="font-bold">-{formatKoreanWon(soleProp.youthDiscountAmount)}</span>
                </div>
              )}

              <div className="flex justify-between items-center">
                <span className="text-slate-600">지방소득세 (종소세의 10%)</span>
                <span className="font-semibold text-slate-900">{formatKoreanWon(soleProp.localIncomeTax)}</span>
              </div>

              <div className="flex justify-between items-center pt-2 border-t border-slate-100">
                <span className="text-slate-600 flex items-center gap-1">
                  지역건강보험료 & 장기요양
                  <span className="text-[11px] text-amber-600 font-medium">(소득+재산점수)</span>
                </span>
                <span className="font-semibold text-amber-700">
                  {formatKoreanWon(soleProp.healthInsuranceAnnual + soleProp.longTermCareAnnual)}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-slate-600">국민연금 (지역가입자 9%)</span>
                <span className="font-semibold text-slate-900">{formatKoreanWon(soleProp.nationalPensionAnnual)}</span>
              </div>
            </div>
          </div>

          {/* Bottom Total for Sole Prop */}
          <div className="pt-4 border-t-2 border-slate-100">
            <div className="flex justify-between items-center">
              <span className="text-sm font-bold text-slate-700">연간 총 부담 비용</span>
              <span className="text-xl font-extrabold text-slate-900 font-serif">
                {formatKoreanWon(soleProp.totalBurden)}
              </span>
            </div>
            <div className="flex justify-between items-center text-xs text-slate-500 mt-1">
              <span>세후 실수령 가처분소득</span>
              <span className="font-semibold text-slate-700">{formatKoreanWon(soleProp.takeHomeIncome)}</span>
            </div>
          </div>
        </div>

        {/* Card 2: 1인 법인 */}
        <div id="card-corporation" className="bg-white rounded-2xl border-2 border-blue-500/60 shadow-md p-6 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-extrabold uppercase px-3 py-1 rounded-bl-xl tracking-wider">
            추천 옵션
          </div>

          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                  <Building2 className="w-4 h-4" />
                </span>
                <div>
                  <h3 className="text-base font-bold text-slate-900">1인 법인 부담 내역</h3>
                  <p className="text-xs text-slate-500">법인세 + 대표 근로세 + 직장 4대보험</p>
                </div>
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-blue-50 text-blue-700">
                실효부담률 {corp.effectiveRate}%
              </span>
            </div>

            {/* Cost Breakdown Rows */}
            <div className="py-4 space-y-3 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-slate-600 flex items-center gap-1">
                  법인세 + 지방소득세
                  <span className="text-[11px] text-blue-600 font-mono">(초저율 9.9%)</span>
                </span>
                <span className="font-semibold text-slate-900">{formatKoreanWon(corp.totalCorporateTax)}</span>
              </div>

              {corp.youthDiscountAmount > 0 && (
                <div className="flex justify-between items-center text-xs text-emerald-600 bg-emerald-50 px-2 py-1 rounded">
                  <span>청년창업 법인세 감면</span>
                  <span className="font-bold">-{formatKoreanWon(corp.youthDiscountAmount)}</span>
                </div>
              )}

              <div className="flex justify-between items-center">
                <span className="text-slate-600">
                  대표자 근로소득세
                  <span className="text-[11px] text-slate-400"> (월급 {formatKoreanWon(result.input.desiredMonthlySalary)} 기준)</span>
                </span>
                <span className="font-semibold text-slate-900">{formatKoreanWon(corp.ceoTotalIncomeTax)}</span>
              </div>

              <div className="flex justify-between items-center pt-2 border-t border-slate-100">
                <span className="text-slate-600 flex items-center gap-1">
                  직장건강보험 (회사+근로자분)
                  <span className="text-[11px] text-emerald-600 font-medium">(급여비례 정률)</span>
                </span>
                <span className="font-semibold text-slate-900">
                  {formatKoreanWon(corp.companyHealthInsurance + corp.companyLongTermCare + corp.employeeHealthInsurance + corp.employeeLongTermCare)}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-slate-600">직장국민연금 (회사+근로자분)</span>
                <span className="font-semibold text-slate-900">
                  {formatKoreanWon(corp.companyNationalPension + corp.employeeNationalPension)}
                </span>
              </div>

              <div className="flex justify-between items-center text-xs text-slate-500">
                <span>법인 추가 유지비 (세무기장료 차액 등)</span>
                <span>{formatKoreanWon(corp.corporateMaintenanceCost)}</span>
              </div>
            </div>
          </div>

          {/* Bottom Total for Corporation */}
          <div className="pt-4 border-t-2 border-slate-100">
            <div className="flex justify-between items-center">
              <span className="text-sm font-bold text-slate-700">연간 총 부담 비용</span>
              <span className="text-xl font-extrabold text-blue-600 font-serif">
                {formatKoreanWon(corp.totalBurden)}
              </span>
            </div>
            <div className="flex justify-between items-center text-xs mt-1">
              <span className="text-slate-500">대표 실수령 + 법인 사내유보금</span>
              <span className="font-bold text-emerald-600">{formatKoreanWon(corp.totalWealthCreated)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Visual Bar Comparison Chart */}
      <div id="visual-comparison-chart" className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6">
        <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-blue-600" />
          <span>총비용 지출 시각화 비교 (세금 + 4대보험 + 부대비용)</span>
        </h3>

        <div className="space-y-4">
          {/* Sole Prop Bar */}
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
              <span>개인사업자 총비용 ({soleProp.effectiveRate}%)</span>
              <span className="font-serif">{formatKoreanWon(soleProp.totalBurden)}</span>
            </div>
            <div className="w-full h-8 bg-slate-100 rounded-xl overflow-hidden flex shadow-inner">
              <div 
                style={{ width: `${soleBarPercent}%` }} 
                className="bg-gradient-to-r from-amber-500 to-rose-500 h-full rounded-xl flex items-center justify-end px-3 text-white text-xs font-bold transition-all duration-500"
              >
                {soleBarPercent > 20 && `${formatKoreanWon(soleProp.totalBurden)}`}
              </div>
            </div>
          </div>

          {/* Corporation Bar */}
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
              <span>1인 법인 총비용 ({corp.effectiveRate}%)</span>
              <span className="font-serif text-blue-600">{formatKoreanWon(corp.totalBurden)}</span>
            </div>
            <div className="w-full h-8 bg-slate-100 rounded-xl overflow-hidden flex shadow-inner">
              <div 
                style={{ width: `${corpBarPercent}%` }} 
                className="bg-gradient-to-r from-blue-600 to-indigo-600 h-full rounded-xl flex items-center justify-end px-3 text-white text-xs font-bold transition-all duration-500"
              >
                {corpBarPercent > 20 && `${formatKoreanWon(corp.totalBurden)}`}
              </div>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-[11px] text-slate-500">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-gradient-to-r from-amber-500 to-rose-500"></span>
              <span>개인사업자 (종소세 + 지역건보)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-gradient-to-r from-blue-600 to-indigo-600"></span>
              <span>1인 법인 (법인세 9.9% + 직장건보)</span>
            </div>
          </div>
          <span className="text-slate-400">※ 부양가족 1인 및 기본 공제 기준</span>
        </div>
      </div>

      {/* 5. Detailed Breakdown Accordion */}
      <div id="detailed-breakdown-accordion" className="bg-slate-50 rounded-2xl border border-slate-200/80 overflow-hidden">
        <button
          type="button"
          onClick={() => setShowDetails(!showDetails)}
          className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-slate-100/70 transition-colors"
        >
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-bold text-slate-800">
              세부 항목별 정밀 산출 기준표 및 세법 근거 펼쳐보기
            </span>
          </div>
          {showDetails ? <ChevronUp className="w-5 h-5 text-slate-500" /> : <ChevronDown className="w-5 h-5 text-slate-500" />}
        </button>

        {showDetails && (
          <div className="px-6 pb-6 pt-2 border-t border-slate-200/70 text-xs text-slate-600 space-y-4 bg-white">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-700 bg-slate-50">
                    <th className="py-2.5 px-3 font-semibold">구분 항목</th>
                    <th className="py-2.5 px-3 font-semibold text-right">개인사업자</th>
                    <th className="py-2.5 px-3 font-semibold text-right">1인 법인</th>
                    <th className="py-2.5 px-3 font-semibold">차이 및 비고</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="py-2 px-3 font-medium text-slate-800">과세 기준소득(과세표준)</td>
                    <td className="py-2 px-3 text-right">{formatKoreanWon(soleProp.taxableIncome)}</td>
                    <td className="py-2 px-3 text-right">{formatKoreanWon(corp.taxableCorporateProfit)}</td>
                    <td className="py-2 px-3 text-slate-500">법인은 대표자 급여를 전액 비용(손금) 처리 후 과세</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium text-slate-800">사업 소득세율</td>
                    <td className="py-2 px-3 text-right">6% ~ 45% 누진</td>
                    <td className="py-2 px-3 text-right text-blue-600 font-semibold">9.9% (2억 이하)</td>
                    <td className="py-2 px-3 text-slate-500">순이익이 커질수록 법인세율 9.9% 방어 효과 극대화</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium text-slate-800">건강보험료 산정방식</td>
                    <td className="py-2 px-3 text-right text-amber-700">지역가입자 (소득+재산)</td>
                    <td className="py-2 px-3 text-right text-emerald-700">직장가입자 (급여정률)</td>
                    <td className="py-2 px-3 text-slate-500">법인은 개인 명의 주택, 자동차에 건보료가 부과되지 않음</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium text-slate-800">자금 인출 유연성</td>
                    <td className="py-2 px-3 text-right text-emerald-700">자유 인출 (제약 없음)</td>
                    <td className="py-2 px-3 text-right text-rose-600">급여/배당/퇴직금 규정 준수</td>
                    <td className="py-2 px-3 text-slate-500">법인 자금 임의 인출 시 가지급금(이자 4.6%) 주의 필요</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <div className="font-semibold text-slate-800 mb-1 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                  <span>적용된 세법령 기준</span>
                </div>
                <ul className="list-disc list-inside space-y-0.5 text-slate-500 text-[11px]">
                  <li>소득세법 제55조 (종합소득세율표)</li>
                  <li>법인세법 제55조 (법인세율 9%~19%)</li>
                  <li>조세특례제한법 제6조 (청년창업중소기업 세액감면)</li>
                  <li>국민건강보험법 시행령 제41조 (직장/지역 보험료율)</li>
                </ul>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <div className="font-semibold text-slate-800 mb-1 flex items-center gap-1.5">
                  <PiggyBank className="w-3.5 h-3.5 text-emerald-600" />
                  <span>사내유보금 활용 팁</span>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  법인 통장에 남은 유보금은 매년 2,000만 원 이하 주주 배당(15.4% 분리과세)이나, 
                  향후 임원 퇴직금(분류과세 저율)으로 인출할 때 세금을 가장 크게 줄일 수 있습니다.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 6. Contextual Link to In-depth Columns */}
      <div className="bg-blue-50/70 border border-blue-200/80 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-bold text-blue-950">
            시뮬레이션 결과를 더 깊이 파고들고 싶으신가요?
          </h4>
          <p className="text-xs text-blue-800 mt-0.5">
            1인 법인 무보수 대표 4대보험 처리, 청년창업 100% 감면 비상주오피스 팁, 합법 자금 인출 3루트를 확인하세요.
          </p>
        </div>
        {onNavigateToColumn && (
          <button
            onClick={() => onNavigateToColumn('column-1')}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-colors flex-shrink-0"
          >
            <span>절세 전문 칼럼 읽기</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
