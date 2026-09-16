import React from 'react';
import { Calculator, BookOpen, ShieldAlert, Info, TrendingUp, Menu, X } from 'lucide-react';
import { TAX_COLUMNS } from '../data/columns';

interface NavbarProps {
  activeTab: 'simulator' | 'columns' | 'about' | 'legal';
  setActiveTab: (tab: 'simulator' | 'columns' | 'about' | 'legal') => void;
  onSelectColumn?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, onSelectColumn }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const handleTabClick = (tab: 'simulator' | 'columns' | 'about' | 'legal') => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    if (onSelectColumn) onSelectColumn();
  };

  return (
    <header className="sticky top-0 z-50 bg-slate-900 border-b border-slate-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <div 
            id="brand-logo"
            onClick={() => handleTabClick('simulator')} 
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg tracking-tight text-white font-serif">BizTax Lab</span>
                <span className="text-[10px] uppercase font-semibold bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full border border-blue-400/30">
                  절세·건보료 랩
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">1인 법인 vs 개인사업자 세금·건보료 시뮬레이터</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            <button
              id="nav-tab-simulator"
              onClick={() => handleTabClick('simulator')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'simulator'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Calculator className="w-4 h-4" />
              시뮬레이터
            </button>

            <button
              id="nav-tab-columns"
              onClick={() => handleTabClick('columns')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'columns'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              절세 심층 칼럼
              <span className="ml-1 text-[11px] bg-amber-400/20 text-amber-300 px-1.5 py-0.2 rounded-full font-semibold border border-amber-400/30">
                {TAX_COLUMNS.length}편
              </span>
            </button>

            <button
              id="nav-tab-about"
              onClick={() => handleTabClick('about')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'about'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Info className="w-4 h-4" />
              연구소 소개 & FAQ
            </button>

            <button
              id="nav-tab-legal"
              onClick={() => handleTabClick('legal')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'legal'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <ShieldAlert className="w-4 h-4" />
              법적 고지 & 문의
            </button>
          </nav>

          {/* Quick Info Badge */}
          <div className="hidden lg:flex items-center gap-2 text-xs text-slate-300 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700/60">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>2025/2026 개정 세법 및 건보료율 반영</span>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex md:hidden">
            <button
              id="mobile-menu-button"
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-slate-300 hover:text-white p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div id="mobile-navigation-menu" className="md:hidden bg-slate-900 border-b border-slate-800 px-4 pt-2 pb-4 space-y-1">
          <button
            id="mobile-tab-simulator"
            onClick={() => handleTabClick('simulator')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-base font-medium ${
              activeTab === 'simulator' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Calculator className="w-5 h-5 text-blue-400" />
            시뮬레이터 & 대시보드
          </button>
          <button
            id="mobile-tab-columns"
            onClick={() => handleTabClick('columns')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-base font-medium ${
              activeTab === 'columns' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            <div className="flex items-center gap-3">
              <BookOpen className="w-5 h-5 text-amber-400" />
              <span>절세 심층 전문 칼럼</span>
            </div>
            <span className="text-xs bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded-full font-semibold">
              {TAX_COLUMNS.length}편
            </span>
          </button>
          <button
            id="mobile-tab-about"
            onClick={() => handleTabClick('about')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-base font-medium ${
              activeTab === 'about' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Info className="w-5 h-5 text-emerald-400" />
            연구소 소개 & FAQ
          </button>
          <button
            id="mobile-tab-legal"
            onClick={() => handleTabClick('legal')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-base font-medium ${
              activeTab === 'legal' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            <ShieldAlert className="w-5 h-5 text-rose-400" />
            법적 고지 & 문의
          </button>
        </div>
      )}
    </header>
  );
};
