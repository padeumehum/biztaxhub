export type BusinessType = 
  | 'ecommerce' 
  | 'it_software' 
  | 'creator' 
  | 'freelancer' 
  | 'service' 
  | 'general';

export type HealthInsuranceStatus = 'local' | 'workplace' | 'dependent';

export type YouthTaxBenefit = 'none' | 'metropolitan_outer_100' | 'metropolitan_inner_50';

export interface SimulationInput {
  annualRevenue: number;         // 연간 매출액 (원)
  netProfit: number;             // 연간 순이익 (과세대상 사업소득) (원)
  businessType: BusinessType;    // 업종
  desiredMonthlySalary: number;  // 법인 설립 시 희망 대표자 월 급여 (원)
  currentHealthStatus: HealthInsuranceStatus; // 현재 건보 자격
  youthTaxBenefit: YouthTaxBenefit;          // 청년창업감면 여부
  familyDependentsCount: number; // 부양가족 수 (본인 포함 기본 1)
  additionalCorporateAnnualCost: number; // 법인 추가 유지비용(세무기장료 차액, 설립등기 등) (기본 연 120만원)
}

export interface SoleProprietorResult {
  taxableIncome: number;
  incomeTax: number;
  localIncomeTax: number;
  totalIncomeTax: number;
  youthDiscountAmount: number;
  finalIncomeTax: number;
  healthInsuranceAnnual: number;
  longTermCareAnnual: number;
  nationalPensionAnnual: number;
  totalSocialInsurance: number;
  totalBurden: number; // 종합소득세 + 지방소득세 + 건보료 + 국민연금
  effectiveRate: number; // 총부담 / 순이익
  takeHomeIncome: number; // 순이익 - 총부담
  isDependentDisqualified: boolean;
  dependentWarningMessage?: string;
}

export interface CorporationResult {
  taxableCorporateProfit: number;
  corporateTax: number;
  localCorporateTax: number;
  totalCorporateTax: number;
  youthDiscountAmount: number;
  finalCorporateTax: number;
  
  ceoAnnualGrossSalary: number;
  ceoEarnedIncomeTax: number;
  ceoLocalIncomeTax: number;
  ceoTotalIncomeTax: number;
  
  companyHealthInsurance: number;
  companyLongTermCare: number;
  companyNationalPension: number;
  companyTotalInsurance: number;

  employeeHealthInsurance: number;
  employeeLongTermCare: number;
  employeeNationalPension: number;
  employeeTotalInsurance: number;
  
  ceoNetTakeHomeSalary: number; // 대표자 실수령 급여 (연간)
  corporateRetainedEarnings: number; // 법인 통장 사내유보금 (법인세 납부 후)
  corporateMaintenanceCost: number; // 추가 법인기장료 등
  
  totalBurden: number; // 법인세 + 대표세금 + 4대보험(회사+근로자) + 추가유지비
  effectiveRate: number;
  totalWealthCreated: number; // 대표자 실수령액 + 법인 유보금
}

export interface SimulationResult {
  input: SimulationInput;
  soleProp: SoleProprietorResult;
  corp: CorporationResult;
  annualSavings: number; // 개인 총부담 - 법인 총부담
  disposableWealthDifference: number; // 법인 창출 총자산 - 개인 가처분소득
  recommendationLevel: 'strongly_recommended' | 'recommended' | 'neutral' | 'stay_sole_prop';
  recommendationTitle: string;
  recommendationReason: string;
  bepNetProfit: number; // 대략적 손익분기점
  keyHighlights: string[];
}

export interface TaxColumn {
  id: string;
  slug: string;
  title: string;
  category: '법인전환' | '건강보험' | '청년창업감면' | '자금인출';
  summary: string;
  readTime: string;
  publishedDate: string;
  author: string;
  tags: string[];
  content: string[];
}
