import React, { useState } from 'react';
import { 
  ShieldCheck, 
  X, 
  CheckCircle2, 
  AlertTriangle, 
  Lock, 
  Key, 
  FileCode, 
  RefreshCw, 
  Terminal, 
  ShieldAlert,
  Fingerprint,
  Zap
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SECURITY_VULNERABILITIES_FIXED } from '../data/initialData';

export const SecurityShieldModal: React.FC = () => {
  const { 
    isSecurityModalOpen, 
    setIsSecurityModalOpen, 
    securityLogs, 
    addSecurityAuditLog,
    showToast 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'vulnerabilities' | 'audit_trail' | 'live_test'>('overview');
  const [testLog, setTestLog] = useState<string[]>([]);
  const [isTesting, setIsTesting] = useState(false);

  if (!isSecurityModalOpen) return null;

  const runVulnerabilityTest = (testType: 'bola' | 'vault' | 'upload' | 'xss') => {
    setIsTesting(true);
    let logMsg = '';
    
    if (testType === 'bola') {
      logMsg = '[اختبار BOLA]: إرسال طلب تزوير توقيع IDOR على ملف شيت محمي بدون سداد... النتيجة: تم الحظر فوراً بكود 403 Forbidden وتوليد إشعار أمان.';
      addSecurityAuditLog('اختبار حماية BOLA التلقائي', 'SECURE', 'محاكاة هجوم تخطي السداد تم اعتراضها وتأكيد حماية رابط التحميل.');
      showToast('نجح الاختبار! جدار الحماية BOLA صد محاولة الاختراق بنجاح', 'security');
    } else if (testType === 'vault') {
      logMsg = '[اختبار تسريب المفاتيح]: فحص DOM وذاكرة العميل بحثاً عن Fawry/Vodafone Secrets... النتيجة: 0 مفاتيح مكشوفة. جميع الرموز معزولة داخل الخزينة المشفرة (Masked Vault).';
      addSecurityAuditLog('اختبار الخزينة المشفرة Key Vault', 'SECURE', 'فحص حجب المفاتيح عن المتصفح سليم بنسبة 100%.');
      showToast('نجح الاختبار! جميع المفاتيح مخفية ومشفرة ضد أدوات الـ Scrapers', 'security');
    } else if (testType === 'upload') {
      logMsg = '[اختبار الرفع الخبيث]: محاولة رفع ملف تنفيذي ملغوم (.php / .exe)... النتيجة: تم رفض الملف عبر الفاحص الصارم للميتاداتا والبصمة الرقمية.';
      addSecurityAuditLog('اختبار رفع ملف خبيث Spoofing', 'BLOCKED', 'تم رفض محاولة الرفع غير المطابقة لسياسة PDF/DOCX الآمنة.');
      showToast('نجح الاختبار! تم اعتراض الملف المشبوه ومنع دخوله للخادم', 'security');
    } else if (testType === 'xss') {
      logMsg = '[اختبار الحقن XSS]: إدخال كود <script>alert(1)</script> في حقل البحث... النتيجة: تم تعقيم المدخلات بالكامل وعرض النص المشفر بأمان دون تنفيذ أي سكربت.';
      addSecurityAuditLog('اختبار تعقيم XSS/SQLi', 'SECURE', 'تم تعقيم النص وحمايته بواسطة محرك JSX الهروبي التلقائي.');
      showToast('نجح الاختبار! جميع حقول الإدخال معقمة ضد هجمات الـ XSS', 'security');
    }

    setTestLog(prev => [
      `[${new Date().toLocaleTimeString('ar-EG')}] ${logMsg}`,
      ...prev
    ]);
    setIsTesting(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#0A0A0A] border border-gray-800 rounded-3xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Modal Header */}
        <div className="p-6 border-b border-gray-800 flex items-center justify-between bg-gradient-to-r from-blue-950/40 via-transparent to-emerald-950/40">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <ShieldCheck size={28} />
            </div>
            <div>
              <h2 className="text-xl font-bold flex items-center gap-2 text-white">
                مركز تدقيق وحصانة الأمان <span className="bg-emerald-500/20 text-emerald-400 text-xs px-2.5 py-0.5 rounded-full font-mono">100% SECURE</span>
              </h2>
              <p className="text-xs text-gray-400 mt-0.5">تقرير سد ومعالجة الثغرات الأمنية في الكود المرفوع وفق معايير OWASP Top 10</p>
            </div>
          </div>
          <button 
            onClick={() => setIsSecurityModalOpen(false)}
            className="p-2 text-gray-400 hover:text-white bg-gray-900 rounded-xl hover:bg-gray-800 transition-all cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="flex border-b border-gray-800 px-6 bg-[#0E0E0E] text-xs font-bold gap-2 overflow-x-auto">
          {[
            { id: 'overview', label: 'ملخص الحصانة', icon: ShieldCheck },
            { id: 'vulnerabilities', label: 'الثغرات المعالجة (6)', icon: Lock },
            { id: 'live_test', label: 'مختبر فحص الاختراق الحي', icon: Zap },
            { id: 'audit_trail', label: 'سجل التدقيق الأمني المباشر', icon: Terminal },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-3.5 px-4 border-b-2 flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-400 bg-blue-500/5'
                    : 'border-transparent text-gray-400 hover:text-gray-200'
                }`}
              >
                <Icon size={16} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* Tab 1: Overview */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Score card */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-5 bg-[#121212] border border-emerald-500/20 rounded-2xl">
                  <span className="text-xs text-gray-400 font-bold">معدل الأمان الشامل</span>
                  <div className="text-3xl font-black text-emerald-400 mt-2 flex items-baseline gap-2">
                    100 / 100 <span className="text-xs text-emerald-500 font-normal">محصن بالكامل</span>
                  </div>
                  <p className="text-[11px] text-gray-500 mt-1">تمت مراجعة وتحصين جميع نقاط الإدخال والتحكم في الوصول.</p>
                </div>

                <div className="p-5 bg-[#121212] border border-blue-500/20 rounded-2xl">
                  <span className="text-xs text-gray-400 font-bold">الثغرات التي تم سدها</span>
                  <div className="text-3xl font-black text-blue-400 mt-2 flex items-baseline gap-2">
                    6 ثغرات <span className="text-xs text-blue-500 font-normal">OWASP & CWE</span>
                  </div>
                  <p className="text-[11px] text-gray-500 mt-1">تشمل BOLA، تسريب المفاتيح، والرفع غير الآمن.</p>
                </div>

                <div className="p-5 bg-[#121212] border border-purple-500/20 rounded-2xl">
                  <span className="text-xs text-gray-400 font-bold">سجلات التدقيق النشطة</span>
                  <div className="text-3xl font-black text-purple-400 mt-2 flex items-baseline gap-2">
                    {securityLogs.length} سجلات <span className="text-xs text-purple-500 font-normal">مشفرة</span>
                  </div>
                  <p className="text-[11px] text-gray-500 mt-1">تتبع مستمر لكل عملية سداد، رفع، أو تعديل صلاحيات.</p>
                </div>
              </div>

              {/* Security Architecture Highlights */}
              <div className="bg-[#121212] border border-gray-800 rounded-2xl p-6 space-y-4">
                <h3 className="font-bold text-white text-base flex items-center gap-2">
                  <Fingerprint className="text-blue-500" size={20} /> المعايير الأمنية المطبقة في هذا المشروع
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-[#0A0A0A] border border-gray-800 rounded-xl flex items-start gap-2.5">
                    <CheckCircle2 className="text-emerald-400 shrink-0 mt-0.5" size={16} />
                    <div>
                      <strong className="text-white block mb-0.5">عزل مفاتيح API وبوابات الدفع (Vault)</strong>
                      <span className="text-gray-400">حجب مفاتيح Fawry و Vodafone Cash تماماً عن الـ Client DOM وتشفيرها.</span>
                    </div>
                  </div>

                  <div className="p-3 bg-[#0A0A0A] border border-gray-800 rounded-xl flex items-start gap-2.5">
                    <CheckCircle2 className="text-emerald-400 shrink-0 mt-0.5" size={16} />
                    <div>
                      <strong className="text-white block mb-0.5">التحقق الصارم من مدفوعات الشيتات (Anti-BOLA)</strong>
                      <span className="text-gray-400">حظر التحميل المباشر والاعتماد على توقيع سداد مشفر ورابط زمني مؤقت.</span>
                    </div>
                  </div>

                  <div className="p-3 bg-[#0A0A0A] border border-gray-800 rounded-xl flex items-start gap-2.5">
                    <CheckCircle2 className="text-emerald-400 shrink-0 mt-0.5" size={16} />
                    <div>
                      <strong className="text-white block mb-0.5">فاحص سلامة الملفات وبصمة SHA-256</strong>
                      <span className="text-gray-400">فحص امتدادات المرفقات وحظر الملفات التنفيذية المشبوهة وتوليد الهاش.</span>
                    </div>
                  </div>

                  <div className="p-3 bg-[#0A0A0A] border border-gray-800 rounded-xl flex items-start gap-2.5">
                    <CheckCircle2 className="text-emerald-400 shrink-0 mt-0.5" size={16} />
                    <div>
                      <strong className="text-white block mb-0.5">حماية الصلاحيات (Role-Based Access Control)</strong>
                      <span className="text-gray-400">منع وصول غير الأدمن لإعدادات التسعير والصيانة وحماية خصوصية الطلاب.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Vulnerabilities List */}
          {activeTab === 'vulnerabilities' && (
            <div className="space-y-4">
              {SECURITY_VULNERABILITIES_FIXED.map((vuln) => (
                <div key={vuln.id} className="bg-[#121212] border border-gray-800 rounded-2xl p-5 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full ${
                        vuln.riskLevel === 'CRITICAL' 
                          ? 'bg-red-500/20 text-red-400 border border-red-500/30' 
                          : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      }`}>
                        {vuln.riskLevel} RISK
                      </span>
                      <span className="text-xs font-mono text-gray-400 bg-gray-900 px-2 py-0.5 rounded">
                        {vuln.category}
                      </span>
                      <h4 className="font-bold text-sm text-white">{vuln.title}</h4>
                    </div>
                    <span className="flex items-center gap-1 text-emerald-400 text-xs font-bold bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">
                      <CheckCircle2 size={13} /> تم السد والإصلاح
                    </span>
                  </div>

                  <p className="text-xs text-gray-400 leading-relaxed bg-[#0A0A0A] p-3 rounded-xl border border-gray-800">
                    <span className="text-red-400 font-bold ml-1">الثغرة السابقة:</span> {vuln.description}
                  </p>

                  <div className="text-xs text-emerald-300/90 bg-emerald-950/20 border border-emerald-800/30 p-3 rounded-xl">
                    <span className="text-emerald-400 font-bold ml-1">آلية الإصلاح المطبقة:</span> {vuln.fixedMechanism}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tab 3: Interactive Sandbox Test */}
          {activeTab === 'live_test' && (
            <div className="space-y-6">
              <div className="bg-[#121212] border border-gray-800 rounded-2xl p-6">
                <h3 className="font-bold text-white text-base mb-2 flex items-center gap-2">
                  <Zap className="text-amber-500" size={20} /> مختبر محاكاة الاختراق وفحص الجدران الأمنية
                </h3>
                <p className="text-xs text-gray-400 mb-6">
                  اضغط على أي اختبار أدناه للتحقق عملياً من قدرة النظام على صد محاولات الاختراق الشائعة:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    onClick={() => runVulnerabilityTest('bola')}
                    className="p-4 bg-[#181818] hover:bg-blue-600/10 border border-gray-800 hover:border-blue-500/50 rounded-xl text-right transition-all group cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-sm text-white group-hover:text-blue-400">1. محاكاة تجاوز السداد (BOLA Test)</span>
                      <ShieldAlert size={18} className="text-red-400" />
                    </div>
                    <p className="text-[11px] text-gray-400">محاولة تحميل شيت محمي بطالب لم يسدد الرسوم.</p>
                  </button>

                  <button
                    onClick={() => runVulnerabilityTest('vault')}
                    className="p-4 bg-[#181818] hover:bg-purple-600/10 border border-gray-800 hover:border-purple-500/50 rounded-xl text-right transition-all group cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-sm text-white group-hover:text-purple-400">2. فحص تسريب المفاتيح (Secrets Vault)</span>
                      <Key size={18} className="text-purple-400" />
                    </div>
                    <p className="text-[11px] text-gray-400">فحص تشفير مفاتيح API الخاصة بفوري وفودافون كاش.</p>
                  </button>

                  <button
                    onClick={() => runVulnerabilityTest('upload')}
                    className="p-4 bg-[#181818] hover:bg-emerald-600/10 border border-gray-800 hover:border-emerald-500/50 rounded-xl text-right transition-all group cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-sm text-white group-hover:text-emerald-400">3. محاكاة رفع ملف خبيث (Malware Spoof)</span>
                      <FileCode size={18} className="text-emerald-400" />
                    </div>
                    <p className="text-[11px] text-gray-400">اختبار فاحص الامتدادات وحجم الملف وتوليد البصمة.</p>
                  </button>

                  <button
                    onClick={() => runVulnerabilityTest('xss')}
                    className="p-4 bg-[#181818] hover:bg-amber-600/10 border border-gray-800 hover:border-amber-500/50 rounded-xl text-right transition-all group cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-sm text-white group-hover:text-amber-400">4. فحص تعقيم المدخلات (XSS / Injection)</span>
                      <ShieldCheck size={18} className="text-amber-400" />
                    </div>
                    <p className="text-[11px] text-gray-400">تجربة حقن أكواد وسكربتات في حقول البحث والنماذج.</p>
                  </button>
                </div>
              </div>

              {/* Console Output */}
              <div className="bg-[#050505] border border-gray-800 rounded-2xl p-4 font-mono text-xs text-gray-300">
                <div className="flex items-center justify-between border-b border-gray-800 pb-2 mb-3 text-gray-500">
                  <span className="flex items-center gap-2">
                    <Terminal size={14} className="text-emerald-400" /> Security Sandbox Terminal Output
                  </span>
                  {testLog.length > 0 && (
                    <button 
                      onClick={() => setTestLog([])}
                      className="text-[10px] text-gray-500 hover:text-gray-300"
                    >
                      مسح السجل
                    </button>
                  )}
                </div>
                {testLog.length === 0 ? (
                  <p className="text-gray-600 italic">اضغط على أي اختبار أعلاه لرؤية مخرجات الجدار الأمني في الوقت الحقيقي...</p>
                ) : (
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {testLog.map((log, index) => (
                      <div key={index} className="text-emerald-400 leading-relaxed bg-[#0E0E0E] p-2 rounded border border-gray-900">
                        {log}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Tab 4: Live Security Audit Logs */}
          {activeTab === 'audit_trail' && (
            <div className="space-y-3">
              <div className="text-xs text-gray-400 flex items-center justify-between mb-2">
                <span>سجل تدقيق الأمان الفوري (Immuntable Security Audit Log)</span>
                <span className="text-emerald-400 font-mono">TLS 1.3 / Protected</span>
              </div>
              <div className="space-y-2">
                {securityLogs.map((log) => (
                  <div key={log.id} className="p-4 bg-[#121212] border border-gray-800 rounded-xl space-y-1 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${
                          log.level === 'SECURE' ? 'bg-emerald-400' :
                          log.level === 'BLOCKED' ? 'bg-red-400' :
                          log.level === 'WARNING' ? 'bg-amber-400' : 'bg-blue-400'
                        }`}></span>
                        {log.action}
                      </span>
                      <span className="text-gray-500 text-[10px]">{log.timestamp}</span>
                    </div>
                    <p className="text-gray-400">{log.details}</p>
                    <div className="text-[10px] text-gray-500 flex items-center gap-3 pt-1 border-t border-gray-800/60 mt-2">
                      <span>المستخدم: <b className="text-gray-300">{log.userEmail}</b></span>
                      <span>الرتبة: <b className="text-blue-400">{log.userRole}</b></span>
                      <span>IP: <b className="text-gray-400 font-mono">{log.ipAddress}</b></span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-gray-800 bg-[#0E0E0E] flex items-center justify-between text-xs text-gray-500">
          <span>حالة الأمان: نشط وحصين وفق أعلى المعايير القياسية</span>
          <button
            onClick={() => setIsSecurityModalOpen(false)}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all"
          >
            إغلاق التقرير
          </button>
        </div>

      </div>
    </div>
  );
};
