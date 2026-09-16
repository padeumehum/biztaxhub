import React, { useState, useMemo, useEffect } from 'react';
import { SimulationInput } from './types';
import { runTaxSimulation } from './utils/taxCalculator';
import { Navbar } from './components/Navbar';
import { SimulatorForm } from './components/SimulatorForm';
import { ComparisonDashboard } from './components/ComparisonDashboard';
import { ColumnViews } from './components/ColumnViews';
import { AboutView } from './components/AboutView';
import { LegalViews } from './components/LegalViews';
import { Footer } from './components/Footer';
import { Calculator, BookOpen, ShieldCheck, Sparkles } from 'lucide-react';

const DEFAULT_INPUT: SimulationInput = {
  annualRevenue: 150_000_000,
  netProfit: 110_000_000,
  businessType: 'creator',
  desiredMonthlySalary: 3_000_000,
  currentHealthStatus: 'local',
  youthTaxBenefit: 'metropolitan_outer_100',
  familyDependentsCount: 1,
  additionalCorporateAnnualCost: 1_200_000,
};

export default function App() {
  const [activeTab, setActiveTab] = useState<'simulator' | 'columns' | 'about' | 'legal'>('simulator');
  const [selectedColumnId, setSelectedColumnId] = useState<string | null>(null);
  const [input, setInput] = useState<SimulationInput>(DEFAULT_INPUT);

  // Parse URL query params on initial load for deep-linking SEO support
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const tabParam = params.get('tab');
      const idParam = params.get('id');

      if (tabParam === 'columns' || tabParam === 'about' || tabParam === 'legal' || tabParam === 'simulator') {
        setActiveTab(tabParam);
      }
      if (idParam) {
        setSelectedColumnId(idParam);
        setActiveTab('columns');
      }
    } catch {
      // Graceful fallback for non-browser environments
    }
  }, []);

  // Compute live tax simulation
  const simulationResult = useMemo(() => {
    return runTaxSimulation(input);
  }, [input]);

  const handleReset = () => {
    setInput(DEFAULT_INPUT);
  };

  const handleNavigateToColumn = (columnId: string) => {
    setSelectedColumnId(columnId);
    setActiveTab('columns');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoToSimulator = () => {
    setActiveTab('simulator');
    setSelectedColumnId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-100/70 text-slate-900 font-sans">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          if (tab !== 'columns') {
            setSelectedColumnId(null);
          }
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onSelectColumn={() => setSelectedColumnId(null)}
      />

      {/* Main Content Area */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Simulator Tab */}
        {activeTab === 'simulator' && (
          <div className="space-y-8">
            {/* Header Title Section */}
            <div className="bg-gradient-to-r from-slate-900 via-slate-850 to-blue-950 text-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-800">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="space-y-2 max-w-3xl">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/30">
                    <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                    <span>2025/2026 대한민국 최신 세법 및 건보료율 완전 탑재</span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-serif">
                    1인 법인 vs 개인사업자 세금·건보료 실시간 정밀 시뮬레이터
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    연 매출 5천만~3억 원대 유튜버, 스마트스토어, 개발자, 프리랜서를 위한 필수 절세 랩입니다. 
                    종합소득세 최고 45% 누진세율과 지역건보료 폭탄을 법인세율 9.9% 및 직장건보료와 실시간 비교 분석하세요.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setActiveTab('columns');
                    setSelectedColumnId('column-1');
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-xl border border-white/20 transition-colors shadow-sm"
                >
                  <BookOpen className="w-4 h-4 text-amber-300" />
                  <span>손익분기점 칼럼 읽기</span>
                </button>
              </div>
            </div>

            {/* Step 1: Input Form */}
            <SimulatorForm
              input={input}
              onChange={setInput}
              onReset={handleReset}
            />

            {/* Step 2: Live Comparison & BEP Dashboard */}
            <div className="pt-2">
              <div className="flex items-center gap-2 mb-4">
                <span className="p-1.5 bg-blue-50 text-blue-600 rounded-lg">
                  <Calculator className="w-5 h-5" />
                </span>
                <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                  2. 실시간 비교 산출 결과 및 손익분기점(BEP) 진단
                </h2>
              </div>

              <ComparisonDashboard
                result={simulationResult}
                onNavigateToColumn={handleNavigateToColumn}
              />
            </div>
          </div>
        )}

        {/* In-depth Columns Tab */}
        {activeTab === 'columns' && (
          <ColumnViews
            selectedColumnId={selectedColumnId}
            onSelectColumn={setSelectedColumnId}
            onGoToSimulator={handleGoToSimulator}
          />
        )}

        {/* About & FAQ Tab */}
        {activeTab === 'about' && <AboutView />}

        {/* Legal & Contact Tab */}
        {activeTab === 'legal' && <LegalViews />}
      </main>

      {/* Global Footer */}
      <Footer
        onNavigateTab={(tab) => {
          setActiveTab(tab);
          if (tab !== 'columns') {
            setSelectedColumnId(null);
          }
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onSelectColumn={handleNavigateToColumn}
      />
    </div>
  );
}
