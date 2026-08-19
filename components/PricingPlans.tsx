import React from 'react';
import { Check, Zap, ShieldCheck, Sparkles, ArrowLeft } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const PricingPlans: React.FC = () => {
  const { systemSettings, openPaymentModal, currentUser, setActivePage, t, dir, language } = useApp();

  const monthlyPrice = systemSettings.pricing.monthlyTeacherFee;
  const annualPrice = systemSettings.pricing.annualTeacherFee;
  const annualSavings = (monthlyPrice * 12) - annualPrice;

  const handleSubscribe = (planName: 'شهري (Monthly)' | 'سنوي (Annual)', amount: number) => {
    openPaymentModal({
      type: 'teacher_plan',
      itemTitle: language === 'ar' ? `اشتراك المعلم في المنصة (${planName})` : `Teacher Room Plan (${planName})`,
      amount,
      targetId: currentUser?.id || 'teacher_1',
      planName,
    });
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-4 sm:p-6 lg:p-12 font-sans" dir={dir}>
      <div className="text-center mb-12 max-w-2xl space-y-3">
        <div className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-400 border border-blue-500/20 px-3 py-1 rounded-full text-xs font-bold">
          <ShieldCheck size={14} className="text-emerald-400" /> {language === 'ar' ? 'باقات المدرسين المعتمدة' : 'Verified Teacher Plans'}
        </div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight">{t.pricingTitle}</h1>
        <p className="text-gray-400 text-xs sm:text-sm">
          {t.pricingSubtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
        
        {/* Monthly Plan */}
        <div className="bg-[#0A0A0A] border border-gray-800 p-8 sm:p-10 rounded-[2.5rem] relative overflow-hidden flex flex-col justify-between shadow-xl hover:border-gray-700 transition-all">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white">{t.monthlyPlanTitle}</h3>
              <span className="text-xs bg-gray-900 border border-gray-800 px-3 py-1 rounded-full text-gray-400">
                {language === 'ar' ? 'مرونة كاملة' : 'Full Flexibility'}
              </span>
            </div>
            
            <div className="flex items-baseline gap-2 mb-8">
              <span className="text-4xl sm:text-5xl font-black font-mono text-white">{monthlyPrice.toLocaleString()}</span>
              <span className="text-gray-400 font-bold uppercase text-xs">{t.currency} {t.perMonth}</span>
            </div>

            <ul className="space-y-3.5 mb-8">
              {[
                language === 'ar' ? 'غرفة تعليمية خاصة باسمك وتخصصك' : 'Dedicated branded classroom & domain',
                language === 'ar' ? 'إدارة وتتبع مدفوعات ما يصل لـ 100 طالب' : 'Manage & track up to 100 students',
                language === 'ar' ? 'رفع وتوزيع شيتات غير محدود ومحمي' : 'Unlimited protected sheet uploads',
                language === 'ar' ? 'حماية BOLA الصارمة لمنع تسريب الشيتات' : 'Strict BOLA & watermarking protection',
                language === 'ar' ? 'دعم فني واستشارات تقنية 24/7' : '24/7 dedicated customer assistance'
              ].map((feat, i) => (
                <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-gray-300">
                  <Check className="text-blue-500 shrink-0 mt-0.5" size={16} /> 
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          <button 
            onClick={() => handleSubscribe('شهري (Monthly)', monthlyPrice)}
            className="w-full bg-white hover:bg-gray-200 text-black py-3.5 rounded-2xl font-black text-sm transition-all shadow-md cursor-pointer"
          >
            {language === 'ar' ? 'اشترك الآن (شهري)' : 'Subscribe Now (Monthly)'}
          </button>
        </div>

        {/* Annual Plan */}
        <div className="bg-[#0A0A0A] border-2 border-blue-600 p-8 sm:p-10 rounded-[2.5rem] relative overflow-hidden shadow-2xl shadow-blue-600/15 flex flex-col justify-between">
          <div className={`absolute top-6 ${dir === 'rtl' ? 'left-6' : 'right-6'} bg-blue-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest flex items-center gap-1 shadow-md`}>
            <Sparkles size={11} /> {t.mostPopular}
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-blue-400 flex items-center gap-2">
                {t.annualPlanTitle} <Zap size={18} fill="currentColor" />
              </h3>
            </div>
            
            <div className="flex items-baseline gap-2 mb-8">
              <span className="text-4xl sm:text-5xl font-black font-mono text-blue-400">{annualPrice.toLocaleString()}</span>
              <span className="text-gray-400 font-bold uppercase text-xs">{t.currency} {t.perYear}</span>
            </div>

            <ul className="space-y-3.5 mb-8">
              {[
                language === 'ar' ? 'كل مميزات الباقة الشهرية الشاملة' : 'All Pro Monthly features included',
                language === 'ar' ? `توفير سنوي مباشر بقيمة ${annualSavings.toLocaleString()} جنيه` : `Direct annual savings of ${annualSavings.toLocaleString()} EGP`,
                language === 'ar' ? 'أولوية قصوى في الدعم الفني وربط البوابات' : 'Priority gateway integration & SLA',
                language === 'ar' ? 'تقارير مالية متقدمة وتصدير كشوف الطلاب' : 'Advanced accounting reports & exports',
                language === 'ar' ? 'شهادة ترخيص الغرفة التعليمية المعتمدة' : 'Official certified classroom badge'
              ].map((feat, i) => (
                <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-white font-medium">
                  <ShieldCheck className="text-blue-500 shrink-0 mt-0.5" size={17} /> 
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          <button 
            onClick={() => handleSubscribe('سنوي (Annual)', annualPrice)}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-2xl font-black text-sm shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
          >
            {language === 'ar' ? `اشترك الآن ووفر ${annualSavings.toLocaleString()} ج.م` : `Subscribe & Save ${annualSavings.toLocaleString()} EGP`}
          </button>
        </div>

      </div>

      <div className="mt-12 text-center text-xs text-gray-500 flex items-center gap-2">
        <ShieldCheck size={16} className="text-emerald-400" />
        <span>{t.freeTrialNote}</span>
      </div>
    </div>
  );
};
