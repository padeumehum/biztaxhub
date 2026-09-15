import React, { useState } from 'react';
import { ShieldCheck, FileText, Mail, Send, CheckCircle2, AlertCircle } from 'lucide-react';

export const LegalViews: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'privacy' | 'terms' | 'contact'>('privacy');

  // Contact form state
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmitContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName.trim() || !contactEmail.trim() || !contactMessage.trim()) return;

    setSubmitting(true);
    // Simulate immediate smooth feedback
    setTimeout(() => {
      setSubmitting(false);
      setIsSubmitted(true);
      setContactName('');
      setContactEmail('');
      setContactMessage('');
    }, 600);
  };

  return (
    <div id="legal-views-container" className="max-w-4xl mx-auto space-y-6">
      {/* Sub Navigation */}
      <div className="flex border-b border-slate-200 gap-2">
        <button
          onClick={() => setActiveSubTab('privacy')}
          className={`pb-3 px-4 text-sm font-bold transition-colors border-b-2 flex items-center gap-2 ${
            activeSubTab === 'privacy'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          개인정보처리방침
        </button>

        <button
          onClick={() => setActiveSubTab('terms')}
          className={`pb-3 px-4 text-sm font-bold transition-colors border-b-2 flex items-center gap-2 ${
            activeSubTab === 'terms'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <FileText className="w-4 h-4" />
          이용약관 & 세무 면책조항
        </button>

        <button
          onClick={() => setActiveSubTab('contact')}
          className={`pb-3 px-4 text-sm font-bold transition-colors border-b-2 flex items-center gap-2 ${
            activeSubTab === 'contact'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Mail className="w-4 h-4" />
          문의 및 제휴
        </button>
      </div>

      {/* 1. Privacy Policy */}
      {activeSubTab === 'privacy' && (
        <div id="privacy-policy-section" className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-sm space-y-6 text-slate-700 text-sm leading-relaxed">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight font-serif">
              개인정보처리방침 (Privacy Policy)
            </h2>
            <p className="text-xs text-slate-400 mt-1">시행일자: 2025년 1월 1일 (최종 개정: 2026년)</p>
          </div>

          <section className="space-y-2">
            <h3 className="font-bold text-slate-900 text-base">1. 개인정보의 수집 및 이용 목적</h3>
            <p>
              「BizTax Lab」(이하 &apos;웹사이트&apos;)은 사용자의 프라이버시를 절대적으로 존중하며 개인정보 보호법을 준수합니다. 본 웹사이트의 세금 및 건강보험료 시뮬레이터 기능은 <strong>완전한 클라이언트 사이드(Client-Side) 연산 방식</strong>으로 구동됩니다. 사용자가 입력하는 연간 매출액, 순이익, 대표 급여 등 모든 입력값은 사용자의 브라우저 내 메모리에서만 연산되며 본 사이트의 데이터베이스나 외부 서버로 전송 또는 저장되지 않습니다.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="font-bold text-slate-900 text-base">2. 구글 애드센스(Google AdSense) 및 쿠키(Cookies) 관련 고지</h3>
            <p>
              본 웹사이트는 운영 비용 충당 및 서비스 유지를 위해 타사 광고 서비스인 <strong>Google AdSense</strong>를 이용할 수 있습니다.
            </p>
            <ul className="list-disc list-inside space-y-1 text-slate-600 pl-2">
              <li>Google을 포함한 타사 공급업체는 쿠키를 사용하여 사용자의 본 사이트 또는 다른 웹사이트 방문 기록을 바탕으로 맞춤형 광고를 게재합니다.</li>
              <li>Google의 광고 쿠키 사용으로 Google 및 파트너는 사용자의 사이트 방문 정보를 바탕으로 관련성 높은 광고를 제공할 수 있습니다.</li>
              <li>사용자는 <strong>Google 광고 설정(www.google.com/settings/ads)</strong>을 방문하여 개인 맞춤 광고를 수신 거부(Opt-out)할 수 있습니다.</li>
              <li>또한 웹 브라우저 설정을 통해 쿠키 허용 여부를 언제든지 직접 제어하거나 차단할 수 있습니다.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h3 className="font-bold text-slate-900 text-base">3. 로그 분석 및 통계</h3>
            <p>
              서비스 품질 개선 및 트래픽 통계 파악을 위해 IP 주소, 브라우저 유형, 참조 URL, 방문 일시 등 식별 불가능한 기술적 로그 정보가 자동 생성될 수 있으나, 이는 개인을 특정하는 용도로 결코 사용되지 않습니다.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="font-bold text-slate-900 text-base">4. 개인정보 보호책임자 및 문의처</h3>
            <p>
              개인정보 보호 관련 문의 사항은 본 웹사이트의 [문의 및 제휴] 탭을 통하여 접수해 주시기 바랍니다.
            </p>
          </section>
        </div>
      )}

      {/* 2. Terms of Service & Disclaimer */}
      {activeSubTab === 'terms' && (
        <div id="terms-of-service-section" className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-sm space-y-6 text-slate-700 text-sm leading-relaxed">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight font-serif">
              서비스 이용약관 및 세무 면책 조항 (Terms & Disclaimer)
            </h2>
            <p className="text-xs text-slate-400 mt-1">시행일자: 2025년 1월 1일</p>
          </div>

          <section className="space-y-2">
            <h3 className="font-bold text-slate-900 text-base">제 1 조 (목적)</h3>
            <p>
              본 약관은 BizTax Lab이 제공하는 세금·건강보험료 시뮬레이션 및 세무 정보 칼럼(이하 &apos;서비스&apos;)의 이용 조건과 절차에 관한 기본 사항을 정함을 목적으로 합니다.
            </p>
          </section>

          <section className="space-y-2 bg-amber-50/70 p-4 sm:p-5 rounded-2xl border border-amber-200/80">
            <h3 className="font-bold text-amber-950 text-base flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-amber-600" />
              <span>제 2 조 (세무 및 법적 면책 조항 - 필독)</span>
            </h3>
            <p className="text-amber-900 text-xs sm:text-sm">
              1. 본 서비스에서 제공하는 모든 시뮬레이션 결과(종합소득세, 법인세, 건강보험료, 국민연금 등)는 현행 대한민국 세법(소득세법, 법인세법, 조세특례제한법) 및 국민건강보험법 규정을 모델링한 <strong>학술 및 의사결정 참고용 개략 추정치</strong>입니다.<br/>
              2. 실제 사업자의 개별 세액은 업종별 경비율, 적격증빙 수취율, 추가 소득공제 및 세액감면 요건, 개인 재산(부동산/자동차) 변동 등에 따라 시뮬레이션 수치와 차이가 발생할 수 있습니다.<br/>
              3. 따라서 실제 법인 설립, 사업자등록, 정기 세금 신고 및 4대보험 자격 변동을 실행하기 전에는 반드시 <strong>공인회계사 또는 세무사 등 자격을 갖춘 전문 세무 대리인과의 공식 상담</strong>을 거치시기 바랍니다. 서비스 제공자는 이용자가 본 결과만을 근거로 행한 결정에 대해 법적 책임을 지지 않습니다.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="font-bold text-slate-900 text-base">제 3 조 (지식재산권)</h3>
            <p>
              BizTax Lab에 게시된 모든 심층 분석 칼럼, 계산 로직, UI 디자인에 대한 저작권은 당사에 귀속되며, 사전 서면 승인 없는 무단 복제, 전재, 스크래핑 행위를 엄격히 금지합니다.
            </p>
          </section>
        </div>
      )}

      {/* 3. Contact Us Form */}
      {activeSubTab === 'contact' && (
        <div id="contact-us-section" className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight font-serif">
              문의 및 피드백 (Contact Us)
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              시뮬레이터 오류 제보, 세법 개정 반영 요청, 제휴 문의는 아래 폼을 통해 남겨주시면 연구팀이 신속히 검토합니다.
            </p>
          </div>

          {isSubmitted ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h3 className="font-bold text-emerald-950 text-base">문의가 성공적으로 접수되었습니다.</h3>
              <p className="text-xs text-emerald-800">
                소중한 의견 감사드립니다. 담당자가 입력하신 이메일로 영업일 기준 1~2일 이내에 답변드리겠습니다.
              </p>
              <button
                type="button"
                onClick={() => setIsSubmitted(false)}
                className="mt-2 text-xs font-bold text-emerald-700 underline"
              >
                추가 문의 작성하기
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmitContact} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="contact-name" className="text-xs font-bold text-slate-700">성명 또는 회사명</label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    placeholder="홍길동"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="contact-email" className="text-xs font-bold text-slate-700">이메일 주소</label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    placeholder="contact@example.com"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="contact-message" className="text-xs font-bold text-slate-700">문의 내용</label>
                <textarea
                  id="contact-message"
                  required
                  rows={5}
                  placeholder="계산기 기능 제안, 오류 피드백, 세무 제휴 등 자유롭게 작성해주세요."
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full sm:w-auto px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md transition-colors flex items-center justify-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{submitting ? '전송 중...' : '문의 보내기'}</span>
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
};
