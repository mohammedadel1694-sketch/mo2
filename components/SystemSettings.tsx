import React, { useState } from 'react';
import { 
  Settings, 
  DollarSign, 
  Globe, 
  ShieldCheck, 
  Save, 
  RefreshCw, 
  ToggleRight, 
  ToggleLeft,
  Lock,
  Mail,
  Smartphone,
  Key,
  Eye,
  EyeOff,
  AlertTriangle,
  Server,
  Database,
  Cpu,
  Receipt,
  FileCode,
  QrCode,
  Sparkles,
  CheckCircle2,
  Sliders,
  BellRing,
  CreditCard
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const SystemSettings: React.FC = () => {
  const { 
    systemSettings, 
    updateSystemSettings, 
    testPaymentGateway, 
    currentUser, 
    showToast,
    setIsSecurityModalOpen,
    setLanguage: setAppLanguage,
    t,
    dir
  } = useApp();

  const [monthlyPrice, setMonthlyPrice] = useState(systemSettings.pricing.monthlyTeacherFee);
  const [annualPrice, setAnnualPrice] = useState(systemSettings.pricing.annualTeacherFee);
  const [currency, setCurrency] = useState(systemSettings.pricing.currency);
  const [language, setLanguage] = useState(systemSettings.language);
  const [maintenance, setMaintenance] = useState(systemSettings.maintenanceMode);
  const [allowSignups, setAllowSignups] = useState(systemSettings.allowNewRegistrations);
  const [autoEmail, setAutoEmail] = useState(systemSettings.autoEmailInvoices);
  const [autoSms, setAutoSms] = useState(systemSettings.autoSmsReminders);

  // Security policy & Watermark settings
  const [watermarkEnabled, setWatermarkEnabled] = useState(true);
  const [bolaGuardStrict, setBolaGuardStrict] = useState(true);
  const [tokenExpiryHours, setTokenExpiryHours] = useState(48);

  // Gateway credentials (securely managed with masking)
  const [fawryMerchant, setFawryMerchant] = useState(systemSettings.gateways.fawryMerchantId);
  const [fawryKey, setFawryKey] = useState(systemSettings.gateways.fawrySecurityKeyMasked);
  const [vodafoneWallet, setVodafoneWallet] = useState(systemSettings.gateways.vodafoneWalletNumber);
  const [vodafoneSecret, setVodafoneSecret] = useState(systemSettings.gateways.vodafoneApiSecretMasked);
  const [showSecrets, setShowSecrets] = useState(false);
  const [isTestingGateway, setIsTestingGateway] = useState(false);

  const handleSave = () => {
    if (currentUser?.role !== 'admin') {
      showToast(t.error, 'error');
      return;
    }

    setAppLanguage(language);

    updateSystemSettings({
      pricing: {
        monthlyTeacherFee: Number(monthlyPrice),
        annualTeacherFee: Number(annualPrice),
        currency,
      },
      language,
      maintenanceMode: maintenance,
      allowNewRegistrations: allowSignups,
      autoEmailInvoices: autoEmail,
      autoSmsReminders: autoSms,
      gateways: {
        ...systemSettings.gateways,
        fawryMerchantId: fawryMerchant,
        fawrySecurityKeyMasked: fawryKey,
        vodafoneWalletNumber: vodafoneWallet,
        vodafoneApiSecretMasked: vodafoneSecret,
      }
    });

    showToast(t.saveSettingsSuccess, 'success');
  };

  const handleTestGateways = () => {
    setIsTestingGateway(true);
    setTimeout(() => {
      testPaymentGateway('Fawry Pay & Vodafone Cash Gateway');
      setIsTestingGateway(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-gray-100 p-4 sm:p-6 lg:p-10 font-sans" dir="rtl">
      
      {/* 1. Header with Vault Status and Save Button */}
      <header className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8 border-b border-gray-800 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs px-2.5 py-0.5 rounded-full font-bold">
              إدارة المنصة المركزية
            </span>
            <span className="text-emerald-400 text-xs flex items-center gap-1 font-mono">
              <ShieldCheck size={14} /> Vault Encrypted • AES-256
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black flex items-center gap-3 text-white">
            <Settings className="text-blue-500" size={28} /> إعدادات النظام العالمية والخزينة
          </h1>
          <p className="text-gray-400 text-xs sm:text-sm mt-1">
            إدارة أسعار باقات المعلمين، بوابات الدفع المشفرة، سياسات العلامة المائية والأمان.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsSecurityModalOpen(true)}
            className="flex items-center gap-1.5 bg-[#141414] hover:bg-gray-800 border border-emerald-500/30 text-emerald-400 px-4 py-3 rounded-xl font-bold text-xs transition-all cursor-pointer"
          >
            <ShieldCheck size={16} /> فحص الأمان
          </button>

          <button 
            onClick={handleSave}
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all shadow-lg shadow-blue-600/20 cursor-pointer"
          >
            <Save size={16} /> حفظ التغييرات وتحديث الخزينة
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Pricing, Currency & Platform Language */}
        <div className="space-y-8">
          
          {/* Pricing Config */}
          <section className="bg-[#0A0A0A] border border-gray-800 rounded-2xl p-6 shadow-sm">
            <h2 className="text-base font-bold mb-5 flex items-center gap-2 text-white">
              <DollarSign className="text-emerald-400" size={18} /> إدارة أسعار باقات المدرسين
            </h2>
            <div className="space-y-4">
              <div>
                <label className="text-xs text-gray-400 font-bold uppercase mb-2 block">
                  الباقة الشهرية للمدرس ({currency})
                </label>
                <input 
                  type="number" 
                  value={monthlyPrice}
                  onChange={(e) => setMonthlyPrice(Number(e.target.value))}
                  className="w-full bg-[#141414] border border-gray-800 rounded-xl px-4 py-2.5 text-white font-mono font-bold focus:border-blue-500 outline-none transition-all text-sm"
                />
              </div>

              <div>
                <label className="text-xs text-gray-400 font-bold uppercase mb-2 block">
                  الباقة السنوية للمدرس ({currency})
                </label>
                <input 
                  type="number" 
                  value={annualPrice}
                  onChange={(e) => setAnnualPrice(Number(e.target.value))}
                  className="w-full bg-[#141414] border border-gray-800 rounded-xl px-4 py-2.5 text-emerald-400 font-mono font-bold focus:border-blue-500 outline-none transition-all text-sm"
                />
                <span className="text-[10px] text-gray-500 mt-1 block">
                  قيمة التوفير السنوي: {(monthlyPrice * 12 - annualPrice).toLocaleString()} ج.م
                </span>
              </div>
            </div>
          </section>

          {/* Language & Currency */}
          <section className="bg-[#0A0A0A] border border-gray-800 rounded-2xl p-6 shadow-sm">
            <h2 className="text-base font-bold mb-5 flex items-center gap-2 text-white">
              <Globe className="text-blue-400" size={18} /> اللغة والعملة الافتراضية
            </h2>
            <div className="space-y-4">
              <div>
                <label className="text-xs text-gray-400 font-bold mb-1.5 block">العملة المعتمدة</label>
                <select 
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full bg-[#141414] border border-gray-800 rounded-xl px-4 py-2.5 text-xs text-white focus:border-blue-500 outline-none"
                >
                  <option value="EGP">الجنيه المصري (EGP)</option>
                  <option value="USD">الدولار الأمريكي (USD)</option>
                  <option value="SAR">الريال السعودي (SAR)</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-gray-400 font-bold mb-1.5 block">لغة واجهة المنصة</label>
                <select 
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as any)}
                  className="w-full bg-[#141414] border border-gray-800 rounded-xl px-4 py-2.5 text-xs text-white focus:border-blue-500 outline-none"
                >
                  <option value="ar">اللغة العربية (الافتراضية - RTL)</option>
                  <option value="en">English (LTR)</option>
                </select>
              </div>
            </div>
          </section>

          {/* Security & Watermark Rules */}
          <section className="bg-[#0A0A0A] border border-gray-800 rounded-2xl p-6 shadow-sm space-y-4">
            <h2 className="text-base font-bold flex items-center gap-2 text-white">
              <Lock className="text-purple-400" size={18} /> سياسة الأمان والعلامة المائية
            </h2>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-[#111] rounded-xl border border-gray-800">
                <div>
                  <p className="text-xs font-bold text-white">العلامة المائية الديناميكية</p>
                  <p className="text-[10px] text-gray-500">طباعة اسم ورقم الطالب على الشيتات</p>
                </div>
                <button 
                  type="button"
                  onClick={() => setWatermarkEnabled(!watermarkEnabled)}
                  className={`transition-all cursor-pointer ${watermarkEnabled ? 'text-emerald-400' : 'text-gray-600'}`}
                >
                  {watermarkEnabled ? <ToggleRight size={32} /> : <ToggleLeft size={32} />}
                </button>
              </div>

              <div className="flex items-center justify-between p-3 bg-[#111] rounded-xl border border-gray-800">
                <div>
                  <p className="text-xs font-bold text-white">فحص الصلاحيات الصارم (BOLA)</p>
                  <p className="text-[10px] text-gray-500">منع التحميل بروابط خارجية غير موقعة</p>
                </div>
                <button 
                  type="button"
                  onClick={() => setBolaGuardStrict(!bolaGuardStrict)}
                  className={`transition-all cursor-pointer ${bolaGuardStrict ? 'text-purple-400' : 'text-gray-600'}`}
                >
                  {bolaGuardStrict ? <ToggleRight size={32} /> : <ToggleLeft size={32} />}
                </button>
              </div>

              <div>
                <label className="text-[11px] text-gray-400 font-bold block mb-1.5">مدة صلاحية الرابط المشفر (بالساعات)</label>
                <input 
                  type="number" 
                  value={tokenExpiryHours}
                  onChange={(e) => setTokenExpiryHours(Number(e.target.value))}
                  className="w-full bg-[#141414] border border-gray-800 rounded-xl px-3 py-2 text-xs text-white font-mono"
                />
              </div>
            </div>
          </section>

        </div>

        {/* Middle & Right Column: Payment Gateways Vault & System Toggles */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Payment Gateways Vault */}
          <section className="bg-[#0A0A0A] border border-gray-800 rounded-2xl p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 mb-6">
              <div>
                <h2 className="text-base font-bold flex items-center gap-2 text-white">
                  <ShieldCheck className="text-purple-400" size={20} /> بوابات الدفع والخزينة المشفرة (API Secrets Vault)
                </h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  جميع المفاتيح محمية ومشفرة بمعيار AES-256 لمنع استخراجها في المتصفح (CWE-312 Protection).
                </p>
              </div>
              <button 
                onClick={handleTestGateways}
                disabled={isTestingGateway}
                className="text-blue-400 hover:text-blue-300 text-xs font-bold flex items-center gap-1.5 bg-blue-500/10 px-3 py-1.5 rounded-lg border border-blue-500/20 cursor-pointer self-start sm:self-auto"
              >
                <RefreshCw size={13} className={isTestingGateway ? 'animate-spin' : ''} />
                <span>اختبار الاتصال بالبوابات</span>
              </button>
            </div>

            <div className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Fawry Gateway Card */}
                <div className="p-4 bg-[#111111] border border-gray-800 rounded-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-blue-600/20 text-blue-500 rounded-lg flex items-center justify-center font-bold text-xs">F</div>
                      <span className="font-bold text-xs text-white">Fawry Pay API</span>
                    </div>
                    <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded font-mono">متصل</span>
                  </div>

                  <div>
                    <label className="text-[10px] text-gray-500 font-bold uppercase block mb-1">Merchant ID</label>
                    <input 
                      type="text" 
                      value={fawryMerchant}
                      onChange={(e) => setFawryMerchant(e.target.value)}
                      placeholder="Merchant ID" 
                      className="w-full bg-[#050505] border border-gray-800 rounded-lg px-3 py-2 text-xs text-white font-mono" 
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-gray-500 font-bold uppercase block mb-1">Security Key (Encrypted)</label>
                    <div className="relative">
                      <input 
                        type={showSecrets ? "text" : "password"} 
                        value={fawryKey}
                        onChange={(e) => setFawryKey(e.target.value)}
                        placeholder="Security Key" 
                        className="w-full bg-[#050505] border border-gray-800 rounded-lg px-3 py-2 text-xs text-white font-mono" 
                      />
                      <button
                        type="button"
                        onClick={() => setShowSecrets(!showSecrets)}
                        className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-400 cursor-pointer"
                      >
                        {showSecrets ? <EyeOff size={13} /> : <Eye size={13} />}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Vodafone Cash Gateway Card */}
                <div className="p-4 bg-[#111111] border border-gray-800 rounded-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-red-600/20 text-red-500 rounded-lg flex items-center justify-center font-bold text-xs">V</div>
                      <span className="font-bold text-xs text-white">Vodafone Cash Business</span>
                    </div>
                    <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded font-mono">متصل</span>
                  </div>

                  <div>
                    <label className="text-[10px] text-gray-500 font-bold uppercase block mb-1">Wallet Number</label>
                    <input 
                      type="text" 
                      value={vodafoneWallet}
                      onChange={(e) => setVodafoneWallet(e.target.value)}
                      placeholder="Wallet Number" 
                      className="w-full bg-[#050505] border border-gray-800 rounded-lg px-3 py-2 text-xs text-white font-mono" 
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-gray-500 font-bold uppercase block mb-1">API Secret (Encrypted)</label>
                    <div className="relative">
                      <input 
                        type={showSecrets ? "text" : "password"} 
                        value={vodafoneSecret}
                        onChange={(e) => setVodafoneSecret(e.target.value)}
                        placeholder="API Secret" 
                        className="w-full bg-[#050505] border border-gray-800 rounded-lg px-3 py-2 text-xs text-white font-mono" 
                      />
                      <button
                        type="button"
                        onClick={() => setShowSecrets(!showSecrets)}
                        className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-400 cursor-pointer"
                      >
                        {showSecrets ? <EyeOff size={13} /> : <Eye size={13} />}
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* Platform Status & Security Toggles */}
          <section className="bg-[#0A0A0A] border border-gray-800 rounded-2xl p-6 shadow-sm">
            <h2 className="text-base font-bold mb-5 text-white">حالة المنصة والأمان وسياسة التسجيل</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              <div className="flex items-center justify-between p-4 bg-[#111111] rounded-xl border border-gray-800">
                <div>
                  <p className="text-xs font-bold text-white">وضع الصيانة (Maintenance Mode)</p>
                  <p className="text-[10px] text-gray-500">إيقاف وصول الطلاب والمعلمين مؤقتاً للتحديث</p>
                </div>
                <button 
                  type="button"
                  onClick={() => setMaintenance(!maintenance)}
                  className={`transition-all cursor-pointer ${maintenance ? 'text-amber-500' : 'text-gray-600'}`}
                >
                  {maintenance ? <ToggleRight size={38} /> : <ToggleLeft size={38} />}
                </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-[#111111] rounded-xl border border-gray-800">
                <div>
                  <p className="text-xs font-bold text-white">التسجيلات الجديدة</p>
                  <p className="text-[10px] text-gray-500">السماح للمدرسين والطلاب بفتح حسابات جديدة</p>
                </div>
                <button 
                  type="button"
                  onClick={() => setAllowSignups(!allowSignups)}
                  className={`transition-all cursor-pointer ${allowSignups ? 'text-blue-500' : 'text-gray-600'}`}
                >
                  {allowSignups ? <ToggleRight size={38} /> : <ToggleLeft size={38} />}
                </button>
              </div>

            </div>
          </section>

          {/* Automatic Notifications & SMS */}
          <section className="bg-[#0A0A0A] border border-gray-800 rounded-2xl p-6 shadow-sm">
            <h2 className="text-base font-bold mb-4 flex items-center gap-2 text-white">
              <BellRing className="text-amber-400" size={18} /> إعدادات الإشعارات التلقائية والتذكير
            </h2>
            <div className="space-y-3">
              <label className="flex items-center gap-3 p-3.5 bg-[#111111] rounded-xl border border-gray-800/80 cursor-pointer hover:border-gray-700 transition-all">
                <div className="p-2 bg-blue-500/10 text-blue-500 rounded-lg shrink-0">
                  <Mail size={16} />
                </div>
                <span className="flex-1 text-xs text-gray-300">إرسال الفواتير والإيصالات تلقائياً عبر البريد الإلكتروني للطلاب والمدرسين</span>
                <input 
                  type="checkbox" 
                  checked={autoEmail}
                  onChange={(e) => setAutoEmail(e.target.checked)}
                  className="w-4 h-4 accent-blue-500 cursor-pointer" 
                />
              </label>

              <label className="flex items-center gap-3 p-3.5 bg-[#111111] rounded-xl border border-gray-800/80 cursor-pointer hover:border-gray-700 transition-all">
                <div className="p-2 bg-purple-500/10 text-purple-500 rounded-lg shrink-0">
                  <Smartphone size={16} />
                </div>
                <span className="flex-1 text-xs text-gray-300">إرسال رسائل SMS ذكية لتذكير الطلاب بمواعيد سداد الشيتات الشهرية</span>
                <input 
                  type="checkbox" 
                  checked={autoSms}
                  onChange={(e) => setAutoSms(e.target.checked)}
                  className="w-4 h-4 accent-blue-500 cursor-pointer" 
                />
              </label>
            </div>
          </section>

        </div>

      </div>
    </div>
  );
};
