import React from 'react';
import { SimulationInput, BusinessType, HealthInsuranceStatus, YouthTaxBenefit } from '../types';
import { Sparkles, DollarSign, Briefcase, UserCheck, ShieldCheck, HelpCircle, RotateCcw } from 'lucide-react';

interface SimulatorFormProps {
  input: SimulationInput;
  onChange: (newInput: SimulationInput) => void;
  onReset: () => void;
}

export function formatKoreanWon(amount: number): string {
  if (amount === 0) return '0원';
  const eok = Math.floor(amount / 100_000_000);
  const man = Math.floor((amount % 100_000_000) / 10_000);

  let result = '';
  if (eok > 0) result += `${eok}억 `;
  if (man > 0) result += `${man.toLocaleString()}만 `;
  return `${result.trim()}원`;
}

export const SimulatorForm: React.FC<SimulatorFormProps> = ({ input, onChange, onReset }) => {
  const handleInputChange = <K extends keyof SimulationInput>(field: K, value: SimulationInput[K]) => {
    onChange({
      ...input,
      [field]: value,
    });
  };

  // 템플릿 프리셋
  const applyPreset = (preset: {
    revenue: number;
    profit: number;
    type: BusinessType;
    salary: number;
    health: HealthInsuranceStatus;
    youth: YouthTaxBenefit;
  }) => {
    onChange({
      ...input,
      annualRevenue: preset.revenue,
      netProfit: preset.profit,
      businessType: preset.type,
      desiredMonthlySalary: preset.salary,
      currentHealthStatus: preset.health,
      youthTaxBenefit: preset.youth,
    });
  };

  return (
    <div id="simulator-form-container" className="bg-white rounded-2xl shadow-sm border border-slate-200/90 p-5 sm:p-7">
      {/* Form Header & Presets */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-blue-50 text-blue-600 rounded-lg">
              <DollarSign className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">1. 사업 현황 및 시뮬레이션 조건 입력</h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            실제 매출과 순이익(비용 차감 후 소득)을 입력하면 2025/2026 세법 기반의 실시간 비교가 진행됩니다.
          </p>
        </div>

        <button
          id="btn-reset-simulator"
          onClick={onReset}
          className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition-colors font-medium self-start sm:self-center"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          초기화
        </button>
      </div>

      {/* Quick Presets */}
      <div className="py-4 border-b border-slate-100">
        <div className="flex items-center gap-1.5 mb-2.5">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span className="text-xs font-semibold text-slate-700">원클릭 업종별 대표 시나리오</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <button
            id="preset-creator"
            type="button"
            onClick={() =>
              applyPreset({
                revenue: 150_000_000,
                profit: 110_000_000,
                type: 'creator',
                salary: 3_000_000,
                health: 'local',
                youth: 'metropolitan_outer_100',
              })
            }
            className="text-left px-3 py-2 rounded-xl border border-slate-200 hover:border-blue-400 bg-slate-50/70 hover:bg-blue-50/50 transition-all text-xs group"
          >
            <div className="font-semibold text-slate-800 group-hover:text-blue-700">유튜버 / 크리에이터</div>
            <div className="text-slate-500 text-[11px] mt-0.5">매출 1.5억 (순익 1.1억)</div>
          </button>

          <button
            id="preset-ecommerce"
            type="button"
            onClick={() =>
              applyPreset({
                revenue: 250_000_000,
                profit: 70_000_000,
                type: 'ecommerce',
                salary: 2_500_000,
                health: 'local',
                youth: 'none',
              })
            }
            className="text-left px-3 py-2 rounded-xl border border-slate-200 hover:border-blue-400 bg-slate-50/70 hover:bg-blue-50/50 transition-all text-xs group"
          >
            <div className="font-semibold text-slate-800 group-hover:text-blue-700">스마트스토어 / 셀러</div>
            <div className="text-slate-500 text-[11px] mt-0.5">매출 2.5억 (순익 7천만)</div>
          </button>

          <button
            id="preset-developer"
            type="button"
            onClick={() =>
              applyPreset({
                revenue: 95_000_000,
                profit: 80_000_000,
                type: 'it_software',
                salary: 3_500_000,
                health: 'local',
                youth: 'none',
              })
            }
            className="text-left px-3 py-2 rounded-xl border border-slate-200 hover:border-blue-400 bg-slate-50/70 hover:bg-blue-50/50 transition-all text-xs group"
          >
            <div className="font-semibold text-slate-800 group-hover:text-blue-700">IT개발자 / 프리랜서</div>
            <div className="text-slate-500 text-[11px] mt-0.5">매출 9.5천 (순익 8천만)</div>
          </button>

          <button
            id="preset-service"
            type="button"
            onClick={() =>
              applyPreset({
                revenue: 300_000_000,
                profit: 180_000_000,
                type: 'service',
                salary: 5_000_000,
                health: 'local',
                youth: 'metropolitan_inner_50',
              })
            }
            className="text-left px-3 py-2 rounded-xl border border-slate-200 hover:border-blue-400 bg-slate-50/70 hover:bg-blue-50/50 transition-all text-xs group"
          >
            <div className="font-semibold text-slate-800 group-hover:text-blue-700">전문 서비스 / 컨설팅</div>
            <div className="text-slate-500 text-[11px] mt-0.5">매출 3억 (순익 1.8억)</div>
          </button>
        </div>
      </div>

      {/* Main Inputs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-5">
        {/* Input 1: Annual Revenue */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label htmlFor="input-annual-revenue" className="text-sm font-semibold text-slate-800 flex items-center gap-1.5">
              <span>연간 사업 매출액 (공급가액)</span>
            </label>
            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
              {formatKoreanWon(input.annualRevenue)}
            </span>
          </div>
          <div className="relative">
            <input
              id="input-annual-revenue"
              type="number"
              step="1000000"
              min="0"
              value={input.annualRevenue}
              onChange={(e) => handleInputChange('annualRevenue', Number(e.target.value))}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-medium"
            />
            <span className="absolute right-3.5 top-2.5 text-xs text-slate-400">원</span>
          </div>
          <div className="flex gap-1.5 pt-1">
            {[50_000_000, 100_000_000, 150_000_000, 200_000_000, 300_000_000].map((val) => (
              <button
                key={val}
                type="button"
                onClick={() => handleInputChange('annualRevenue', val)}
                className="text-[11px] px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors font-medium"
              >
                {val / 100_000_000}억
              </button>
            ))}
          </div>
        </div>

        {/* Input 2: Net Profit (Taxable Income) */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label htmlFor="input-net-profit" className="text-sm font-semibold text-slate-800 flex items-center gap-1.5">
              <span>연간 순이익 (과세대상 사업소득)</span>
              <span className="text-red-500 font-bold">*</span>
            </label>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
              {formatKoreanWon(input.netProfit)}
            </span>
          </div>
          <div className="relative">
            <input
              id="input-net-profit"
              type="number"
              step="1000000"
              min="0"
              value={input.netProfit}
              onChange={(e) => handleInputChange('netProfit', Number(e.target.value))}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-medium"
            />
            <span className="absolute right-3.5 top-2.5 text-xs text-slate-400">원</span>
          </div>
          <p className="text-[11px] text-slate-500 pt-0.5">
            매출에서 인건비, 매입원가, 광고비 등 필요경비를 차감한 실제 소득입니다.
          </p>
        </div>

        {/* Input 3: Business Type */}
        <div className="space-y-1.5">
          <label htmlFor="select-business-type" className="text-sm font-semibold text-slate-800 flex items-center gap-1.5">
            <Briefcase className="w-4 h-4 text-slate-500" />
            <span>사업 유형 / 업종</span>
          </label>
          <select
            id="select-business-type"
            value={input.businessType}
            onChange={(e) => handleInputChange('businessType', e.target.value as BusinessType)}
            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-medium"
          >
            <option value="ecommerce">전자상거래 / 스마트스토어 / 온라인쇼핑몰</option>
            <option value="it_software">IT 소프트웨어 개발 / SaaS / 플랫폼</option>
            <option value="creator">1인 미디어 / 유튜버 / 콘텐츠 크리에이터</option>
            <option value="freelancer">전문 프리랜서 / 디자이너 / 마케터 (3.3%)</option>
            <option value="service">전문 서비스업 / 교육 / 경영 컨설팅</option>
            <option value="general">일반 도소매 / 제조업 / 기타 서비스업</option>
          </select>
        </div>

        {/* Input 4: Desired CEO Monthly Salary in Corporation */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label htmlFor="input-ceo-salary" className="text-sm font-semibold text-slate-800 flex items-center gap-1.5">
              <span>법인 설립 시 희망 대표자 월 급여액</span>
            </label>
            <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
              {input.desiredMonthlySalary === 0 ? '무보수 (0원)' : `월 ${formatKoreanWon(input.desiredMonthlySalary)}`}
            </span>
          </div>
          <div className="relative">
            <input
              id="input-ceo-salary"
              type="number"
              step="500000"
              min="0"
              value={input.desiredMonthlySalary}
              onChange={(e) => handleInputChange('desiredMonthlySalary', Number(e.target.value))}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-medium"
            />
            <span className="absolute right-3.5 top-2.5 text-xs text-slate-400">원/월</span>
          </div>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {[0, 2_000_000, 3_000_000, 4_000_000, 5_000_000].map((val) => (
              <button
                key={val}
                type="button"
                onClick={() => handleInputChange('desiredMonthlySalary', val)}
                className={`text-[11px] px-2.5 py-1 rounded font-medium transition-colors ${
                  input.desiredMonthlySalary === val
                    ? 'bg-blue-600 text-white font-semibold'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                }`}
              >
                {val === 0 ? '무보수' : `${val / 10_000}만`}
              </button>
            ))}
          </div>
        </div>

        {/* Input 5: Current Health Insurance Status */}
        <div className="space-y-1.5">
          <label htmlFor="select-health-status" className="text-sm font-semibold text-slate-800 flex items-center gap-1.5">
            <UserCheck className="w-4 h-4 text-slate-500" />
            <span>대표자의 현재 건강보험 자격</span>
          </label>
          <select
            id="select-health-status"
            value={input.currentHealthStatus}
            onChange={(e) => handleInputChange('currentHealthStatus', e.target.value as HealthInsuranceStatus)}
            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-medium"
          >
            <option value="local">지역가입자 (기본 개인사업자)</option>
            <option value="workplace">직장가입자 (투잡/타 직장 재직 중)</option>
            <option value="dependent">피부양자 (가족 건보 밑에 등재)</option>
          </select>
          {input.currentHealthStatus === 'dependent' && (
            <p className="text-[11px] text-amber-700 bg-amber-50 p-2 rounded-lg border border-amber-200/70">
              ⚠️ 주의: 개인사업자로 순이익 1원 이상 발생 시 피부양자 자격이 박탈되어 지역건보료가 부과됩니다.
            </p>
          )}
        </div>

        {/* Input 6: Youth Startup Tax Exemption */}
        <div className="space-y-1.5">
          <label htmlFor="select-youth-benefit" className="text-sm font-semibold text-slate-800 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-slate-500" />
            <span>청년창업중소기업 세액감면 (조특법 제6조)</span>
          </label>
          <select
            id="select-youth-benefit"
            value={input.youthTaxBenefit}
            onChange={(e) => handleInputChange('youthTaxBenefit', e.target.value as YouthTaxBenefit)}
            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-medium"
          >
            <option value="none">감면 미해당 (일반 창업 또는 만 34세 초과)</option>
            <option value="metropolitan_outer_100">
              수도권 과밀억제권역 외 100% 감면 (용인, 송도, 화성, 평택 등)
            </option>
            <option value="metropolitan_inner_50">
              수도권 과밀억제권역 내 50% 감면 (서울, 인천, 수원, 성남 등)
            </option>
          </select>
          <p className="text-[11px] text-slate-500 pt-0.5">
            만 15~34세(군 복무 기간 추가) 생애 최초 창업 시 최대 5년간 세액감면이 적용됩니다.
          </p>
        </div>
      </div>

      {/* Advanced toggle options */}
      <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-600">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span>부양가족 수(기본공제):</span>
            <select
              id="select-dependents-count"
              value={input.familyDependentsCount}
              onChange={(e) => handleInputChange('familyDependentsCount', Number(e.target.value))}
              className="px-2 py-1 bg-slate-100 border border-slate-200 rounded font-semibold text-slate-800"
            >
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n}>
                  {n}인
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span>법인 추가 유지비(기장료 등):</span>
            <span className="font-semibold text-slate-800">연 120만 원(기본)</span>
          </div>
        </div>

        <div className="flex items-center gap-1 text-slate-400">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>모든 계산은 브라우저에서 안전하게 실시간 처리됩니다.</span>
        </div>
      </div>
    </div>
  );
};
