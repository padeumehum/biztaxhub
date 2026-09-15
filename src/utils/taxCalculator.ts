import { SimulationInput, SoleProprietorResult, CorporationResult, SimulationResult } from '../types';

// 2025/2026 대한민국 소득세율표 (종합소득세)
function calculateIncomeTaxBase(taxableBase: number): number {
  if (taxableBase <= 0) return 0;
  if (taxableBase <= 14_000_000) {
    return taxableBase * 0.06;
  } else if (taxableBase <= 50_000_000) {
    return taxableBase * 0.15 - 1_260_000;
  } else if (taxableBase <= 88_000_000) {
    return taxableBase * 0.24 - 5_760_000;
  } else if (taxableBase <= 150_000_000) {
    return taxableBase * 0.35 - 15_440_000;
  } else if (taxableBase <= 300_000_000) {
    return taxableBase * 0.38 - 19_940_000;
  } else if (taxableBase <= 500_000_000) {
    return taxableBase * 0.40 - 25_940_000;
  } else if (taxableBase <= 1_000_000_000) {
    return taxableBase * 0.42 - 35_940_000;
  } else {
    return taxableBase * 0.45 - 65_940_000;
  }
}

// 근로소득공제 계산
function calculateEarnedIncomeDeduction(salary: number): number {
  if (salary <= 0) return 0;
  if (salary <= 5_000_000) {
    return salary * 0.70;
  } else if (salary <= 15_000_000) {
    return 3_500_000 + (salary - 5_000_000) * 0.40;
  } else if (salary <= 45_000_000) {
    return 7_500_000 + (salary - 15_000_000) * 0.15;
  } else if (salary <= 100_000_000) {
    return 12_000_000 + (salary - 45_000_000) * 0.05;
  } else {
    return 14_750_000 + (salary - 100_000_000) * 0.02;
  }
}

// 근로소득 세액공제
function calculateEarnedIncomeTaxCredit(calculatedTax: number): number {
  if (calculatedTax <= 0) return 0;
  let credit = 0;
  if (calculatedTax <= 1_300_000) {
    credit = calculatedTax * 0.55;
  } else {
    credit = 715_000 + (calculatedTax - 1_300_000) * 0.30;
  }
  // 공제 한도 (일반 74만원 한도 적용)
  return Math.min(credit, 740_000);
}

// 법인세 계산 (2025/2026 기준: 2억 이하 9%, 2억 초과 19%)
function calculateCorporateTaxBase(taxableIncome: number): number {
  if (taxableIncome <= 0) return 0;
  if (taxableIncome <= 200_000_000) {
    return taxableIncome * 0.09;
  } else {
    return 200_000_000 * 0.09 + (taxableIncome - 200_000_000) * 0.19;
  }
}

export function runTaxSimulation(input: SimulationInput): SimulationResult {
  const {
    netProfit,
    desiredMonthlySalary,
    currentHealthStatus,
    youthTaxBenefit,
    familyDependentsCount,
    additionalCorporateAnnualCost,
  } = input;

  // -------------------------------------------------------------
  // 1. 개인사업자 연산
  // -------------------------------------------------------------
  // 기본인적공제 (1인당 150만원)
  const personalDeduction = Math.max(1, familyDependentsCount) * 1_500_000;
  const soleTaxableBase = Math.max(0, netProfit - personalDeduction);

  const rawSoleIncomeTax = calculateIncomeTaxBase(soleTaxableBase);

  // 청년창업 세액감면 적용 (종합소득세)
  let soleYouthDiscount = 0;
  if (youthTaxBenefit === 'metropolitan_outer_100') {
    soleYouthDiscount = rawSoleIncomeTax * 1.0;
  } else if (youthTaxBenefit === 'metropolitan_inner_50') {
    soleYouthDiscount = rawSoleIncomeTax * 0.5;
  }
  const finalSoleIncomeTax = Math.max(0, rawSoleIncomeTax - soleYouthDiscount);
  const soleLocalIncomeTax = Math.round(finalSoleIncomeTax * 0.10);
  const totalSoleIncomeTax = finalSoleIncomeTax + soleLocalIncomeTax;

  // 지역건강보험료 및 장기요양보험료
  // 소득 부과 기준: 7.09% + 장기요양(건보료의 12.95% = 0.9181%) = 총 8.008%
  let soleHealthAnnual = 0;
  let soleLongTermCareAnnual = 0;
  let solePensionAnnual = 0;
  let isDependentDisqualified = false;
  let dependentWarningMessage: string | undefined;

  if (currentHealthStatus === 'dependent') {
    if (netProfit > 0) {
      isDependentDisqualified = true;
      dependentWarningMessage =
        '사업자등록 후 사업소득(순이익)이 1원 이상 발생하면 건강보험 피부양자 자격이 즉시 박탈되어 지역가입자로 전환되며 건보료가 새로 부과됩니다.';
    }
  }

  if (netProfit > 3_360_000) {
    // 월 소득 환산 및 건보료 상한/하한 적용 (연간 상한 약 5,088만원)
    const monthlyIncome = netProfit / 12;
    const monthlyHealthRaw = monthlyIncome * 0.0709;
    const cappedMonthlyHealth = Math.min(Math.max(monthlyHealthRaw, 19_780), 4_240_000);
    soleHealthAnnual = Math.round(cappedMonthlyHealth * 12);
    soleLongTermCareAnnual = Math.round(soleHealthAnnual * 0.1295);

    // 국민연금 (지역): 기준소득월액 9%, 상한 6,170,000원 (월 555,300원 한도)
    const cappedMonthlyPensionBase = Math.min(Math.max(monthlyIncome, 390_000), 6_170_000);
    solePensionAnnual = Math.round(cappedMonthlyPensionBase * 0.09 * 12);
  } else {
    // 최소 기준
    soleHealthAnnual = 19_780 * 12;
    soleLongTermCareAnnual = Math.round(soleHealthAnnual * 0.1295);
    solePensionAnnual = Math.round(Math.max(netProfit / 12, 390_000) * 0.09 * 12);
  }

  const soleTotalInsurance = soleHealthAnnual + soleLongTermCareAnnual + solePensionAnnual;
  const soleTotalBurden = totalSoleIncomeTax + soleTotalInsurance;
  const soleEffectiveRate = netProfit > 0 ? (soleTotalBurden / netProfit) * 100 : 0;
  const soleTakeHome = Math.max(0, netProfit - soleTotalBurden);

  const soleProp: SoleProprietorResult = {
    taxableIncome: soleTaxableBase,
    incomeTax: rawSoleIncomeTax,
    localIncomeTax: soleLocalIncomeTax,
    totalIncomeTax: totalSoleIncomeTax,
    youthDiscountAmount: soleYouthDiscount,
    finalIncomeTax: finalSoleIncomeTax,
    healthInsuranceAnnual: soleHealthAnnual,
    longTermCareAnnual: soleLongTermCareAnnual,
    nationalPensionAnnual: solePensionAnnual,
    totalSocialInsurance: soleTotalInsurance,
    totalBurden: soleTotalBurden,
    effectiveRate: Number(soleEffectiveRate.toFixed(1)),
    takeHomeIncome: soleTakeHome,
    isDependentDisqualified,
    dependentWarningMessage,
  };

  // -------------------------------------------------------------
  // 2. 1인 법인 연산
  // -------------------------------------------------------------
  const ceoGrossAnnual = desiredMonthlySalary * 12;

  // 대표자 4대보험 (대표이사는 고용/산재 제외, 건보+국민연금만 부과)
  let companyHealth = 0;
  let companyLongCare = 0;
  let companyPension = 0;

  let employeeHealth = 0;
  let employeeLongCare = 0;
  let employeePension = 0;

  if (desiredMonthlySalary > 0) {
    // 건보: 7.09% (회사 3.545%, 근로자 3.545%)
    // 장기요양: 건보료의 12.95%
    const monthlyHealthTotal = desiredMonthlySalary * 0.0709;
    const monthlyHealthHalf = monthlyHealthTotal / 2;
    const monthlyLongCareHalf = (monthlyHealthHalf * 0.1295);

    companyHealth = Math.round(monthlyHealthHalf * 12);
    companyLongCare = Math.round(monthlyLongCareHalf * 12);
    employeeHealth = companyHealth;
    employeeLongCare = companyLongCare;

    // 연금: 9% (회사 4.5%, 근로자 4.5%), 상한액 적용
    const pensionBase = Math.min(Math.max(desiredMonthlySalary, 390_000), 6_170_000);
    const monthlyPensionHalf = pensionBase * 0.045;
    companyPension = Math.round(monthlyPensionHalf * 12);
    employeePension = companyPension;
  }

  const companyTotalInsurance = companyHealth + companyLongCare + companyPension;
  const employeeTotalInsurance = employeeHealth + employeeLongCare + employeePension;

  // 대표자 근로소득세 계산
  let ceoIncomeTax = 0;
  let ceoLocalIncomeTax = 0;
  let ceoTotalIncomeTax = 0;

  if (desiredMonthlySalary > 0) {
    const earnedDeduction = calculateEarnedIncomeDeduction(ceoGrossAnnual);
    // 근로소득금액
    const earnedIncomeAmount = Math.max(0, ceoGrossAnnual - earnedDeduction);
    // 인적공제 + 근로자 4대보험 공제
    const ceoTaxableBase = Math.max(0, earnedIncomeAmount - personalDeduction - employeeTotalInsurance);

    const calculatedEarnedTax = calculateIncomeTaxBase(ceoTaxableBase);
    const taxCredit = calculateEarnedIncomeTaxCredit(calculatedEarnedTax);
    ceoIncomeTax = Math.max(0, Math.round(calculatedEarnedTax - taxCredit));
    ceoLocalIncomeTax = Math.round(ceoIncomeTax * 0.10);
    ceoTotalIncomeTax = ceoIncomeTax + ceoLocalIncomeTax;
  }

  // 대표자 연간 실수령액
  const ceoNetTakeHomeSalary = Math.max(
    0,
    ceoGrossAnnual - ceoTotalIncomeTax - employeeTotalInsurance
  );

  // 법인 과세표준 (순이익 - 대표급여 - 회사부담 4대보험 - 법인 추가유지비)
  const corporateCostDeductions =
    ceoGrossAnnual + companyTotalInsurance + additionalCorporateAnnualCost;
  const corporateTaxableProfit = Math.max(0, netProfit - corporateCostDeductions);

  // 법인세 산출
  const rawCorporateTax = calculateCorporateTaxBase(corporateTaxableProfit);
  let corpYouthDiscount = 0;
  if (youthTaxBenefit === 'metropolitan_outer_100') {
    corpYouthDiscount = rawCorporateTax * 1.0;
  } else if (youthTaxBenefit === 'metropolitan_inner_50') {
    corpYouthDiscount = rawCorporateTax * 0.5;
  }
  const finalCorporateTax = Math.max(0, rawCorporateTax - corpYouthDiscount);
  const localCorpTax = Math.round(finalCorporateTax * 0.10);
  const totalCorpTax = finalCorporateTax + localCorpTax;

  // 법인 사내유보금 (법인세 납부 후 남는 법인 통장 잔고)
  const corporateRetainedEarnings = Math.max(
    0,
    corporateTaxableProfit - totalCorpTax
  );

  // 법인 전환 시 발생하는 총부담 = 법인세 + 대표세금 + 4대보험(회사+근로자) + 부대비용
  const corpTotalBurden =
    totalCorpTax +
    ceoTotalIncomeTax +
    companyTotalInsurance +
    employeeTotalInsurance +
    additionalCorporateAnnualCost;

  const corpEffectiveRate =
    netProfit > 0 ? (corpTotalBurden / netProfit) * 100 : 0;

  // 창출된 총 가치 = 대표자 실수령액 + 사내유보금
  const totalWealthCreated = ceoNetTakeHomeSalary + corporateRetainedEarnings;

  const corp: CorporationResult = {
    taxableCorporateProfit: corporateTaxableProfit,
    corporateTax: rawCorporateTax,
    localCorporateTax: localCorpTax,
    totalCorporateTax: totalCorpTax,
    youthDiscountAmount: corpYouthDiscount,
    finalCorporateTax,
    ceoAnnualGrossSalary: ceoGrossAnnual,
    ceoEarnedIncomeTax: ceoIncomeTax,
    ceoLocalIncomeTax: ceoLocalIncomeTax,
    ceoTotalIncomeTax,
    companyHealthInsurance: companyHealth,
    companyLongTermCare: companyLongCare,
    companyNationalPension: companyPension,
    companyTotalInsurance,
    employeeHealthInsurance: employeeHealth,
    employeeLongTermCare: employeeLongCare,
    employeeNationalPension: employeePension,
    employeeTotalInsurance,
    ceoNetTakeHomeSalary,
    corporateRetainedEarnings,
    corporateMaintenanceCost: additionalCorporateAnnualCost,
    totalBurden: corpTotalBurden,
    effectiveRate: Number(corpEffectiveRate.toFixed(1)),
    totalWealthCreated,
  };

  // -------------------------------------------------------------
  // 3. 비교 및 결론 판정
  // -------------------------------------------------------------
  const annualSavings = soleTotalBurden - corpTotalBurden;
  const disposableWealthDifference = totalWealthCreated - soleTakeHome;

  let recommendationLevel: 'strongly_recommended' | 'recommended' | 'neutral' | 'stay_sole_prop';
  let recommendationTitle = '';
  let recommendationReason = '';
  const keyHighlights: string[] = [];

  // 손익분기점(BEP) 추산: 대략 순이익 6,000만 ~ 8,000만원 부근
  const bepNetProfit = 70_000_000;

  if (annualSavings > 10_000_000) {
    recommendationLevel = 'strongly_recommended';
    recommendationTitle = '1인 법인 설립/전환 적극 권장';
    recommendationReason = `연간 약 ${(annualSavings / 10_000).toLocaleString('ko-KR')}만 원 상당의 세금 및 건보료가 절감됩니다. 높은 누진세율(24%~38%)을 법인세율(9.9%)로 방어하고 직장건강보험으로 전환하는 것이 절대적으로 유리합니다.`;
  } else if (annualSavings > 2_500_000) {
    recommendationLevel = 'recommended';
    recommendationTitle = '1인 법인 전환 유리 (권장 단계)';
    recommendationReason = `연간 약 ${(annualSavings / 10_000).toLocaleString('ko-KR')}만 원의 비용 절감이 예상됩니다. 법인 유지비용(세무기장료 차액 약 120만 원)을 공제하고도 실질적인 자산 증식 효과가 나타납니다.`;
  } else if (annualSavings >= -1_500_000) {
    recommendationLevel = 'neutral';
    recommendationTitle = '손익분기점(BEP) 부근 - 운영 목적별 검토 필요';
    recommendationReason = `세금·건보료 차이가 크지 않은 구간입니다. 법인 통장 자금 인출의 엄격함(가지급금 리스크)과 향후 매출 성장성을 종합 고려하여 결정을 내리세요.`;
  } else {
    recommendationLevel = 'stay_sole_prop';
    recommendationTitle = '개인사업자 유지 권장';
    recommendationReason = `현재 순이익 규모에서는 법인 설립 등기 비용 및 법인 세무기장료 등 추가 관리비용으로 인해 개인사업자가 오히려 실질 비용 면에서 경제적입니다.`;
  }

  // 핵심 포인트 도출
  keyHighlights.push(
    `개인사업자 실효부담률 ${soleEffectiveRate.toFixed(1)}% vs 법인 실효부담률 ${corpEffectiveRate.toFixed(1)}%`
  );
  if (soleTotalInsurance > companyTotalInsurance + employeeTotalInsurance) {
    const insuranceDiff = soleTotalInsurance - (companyTotalInsurance + employeeTotalInsurance);
    keyHighlights.push(
      `건강보험 및 국민연금에서 연간 ${(insuranceDiff / 10_000).toLocaleString('ko-KR')}만 원 절감`
    );
  }
  if (corporateRetainedEarnings > 0) {
    keyHighlights.push(
      `법인 통장에 연간 ${(corporateRetainedEarnings / 10_000).toLocaleString('ko-KR')}만 원의 저율(9.9%) 과세 유보금 확보`
    );
  }
  if (youthTaxBenefit !== 'none') {
    keyHighlights.push(
      `청년창업중소기업 세액감면(${youthTaxBenefit === 'metropolitan_outer_100' ? '100%' : '50%'})이 반영된 정밀 산출`
    );
  }

  return {
    input,
    soleProp,
    corp,
    annualSavings,
    disposableWealthDifference,
    recommendationLevel,
    recommendationTitle,
    recommendationReason,
    bepNetProfit,
    keyHighlights,
  };
}
