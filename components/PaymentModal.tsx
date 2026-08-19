import React, { useState } from 'react';
import { 
  X, 
  CreditCard, 
  Smartphone, 
  ShieldCheck, 
  CheckCircle2, 
  Copy, 
  Lock, 
  ArrowRight,
  Receipt,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const PaymentModal: React.FC = () => {
  const { 
    paymentModalData, 
    closePaymentModal, 
    payStudentFee, 
    subscribeTeacherPlan, 
    currentUser,
    showToast 
  } = useApp();

  const [paymentMethod, setPaymentMethod] = useState<'Fawry' | 'Vodafone Cash' | 'Credit Card'>('Fawry');
  const [fawryCode] = useState(() => Math.floor(10000000 + Math.random() * 90000000).toString());
  const [vodafoneNumber, setVodafoneNumber] = useState('');
  const [vodafoneOtp, setVodafoneOtp] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedReceipt, setCompletedReceipt] = useState<string | null>(null);

  if (!paymentModalData.isOpen) return null;

  const handleCopyFawry = () => {
    navigator.clipboard.writeText(fawryCode);
    showToast('تم نسخ كود فوري إلى الحافظة بنجاح', 'info');
  };

  const handleProcessPayment = () => {
    setIsProcessing(true);

    setTimeout(() => {
      if (paymentModalData.type === 'student_fee') {
        const result = payStudentFee(paymentModalData.targetId, paymentMethod);
        if (result.success) {
          setCompletedReceipt(result.receiptToken);
        }
      } else if (paymentModalData.type === 'teacher_plan') {
        if (paymentModalData.planName) {
          const methodArabic = paymentMethod === 'Fawry' ? 'فوري' : paymentMethod === 'Vodafone Cash' ? 'فودافون كاش' : 'بطاقة ائتمان';
          subscribeTeacherPlan(paymentModalData.targetId, paymentModalData.planName, methodArabic);
          setCompletedReceipt(`SUB-TX-${Date.now()}`);
        }
      }
      setIsProcessing(false);
    }, 1200);
  };

  const handleFinish = () => {
    setCompletedReceipt(null);
    closePaymentModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn" dir="rtl">
      <div className="bg-[#0A0A0A] border border-gray-800 rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="p-6 border-b border-gray-800 flex items-center justify-between bg-[#111111]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-500 flex items-center justify-center">
              <CreditCard size={20} />
            </div>
            <div>
              <h3 className="font-bold text-base text-white">بوابة الدفع الآمنة المشفرة</h3>
              <p className="text-xs text-gray-500 font-mono flex items-center gap-1">
                <Lock size={12} className="text-emerald-400" /> 256-Bit SSL Encrypted
              </p>
            </div>
          </div>
          <button 
            onClick={closePaymentModal}
            className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800 transition-all cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-6">
          
          {completedReceipt ? (
            /* Success Receipt View */
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-2 animate-bounce">
                <CheckCircle2 size={36} />
              </div>
              <h4 className="text-xl font-bold text-white">تم تأكيد عملية الدفع بنجاح!</h4>
              <p className="text-sm text-gray-400">
                تم استلام المبلغ وتوليد إيصال أمان رقمي مشفر وتم فتح الصلاحيات تلقائياً.
              </p>

              <div className="bg-[#141414] border border-gray-800 rounded-2xl p-4 text-xs space-y-2 text-right">
                <div className="flex justify-between border-b border-gray-800 pb-2">
                  <span className="text-gray-500">البيان:</span>
                  <span className="font-bold text-white">{paymentModalData.itemTitle}</span>
                </div>
                <div className="flex justify-between border-b border-gray-800 pb-2">
                  <span className="text-gray-500">المبلغ المدفوع:</span>
                  <span className="font-bold text-emerald-400 font-mono text-sm">{paymentModalData.amount.toLocaleString()} EGP</span>
                </div>
                <div className="flex justify-between border-b border-gray-800 pb-2">
                  <span className="text-gray-500">وسيلة الدفع:</span>
                  <span className="text-blue-400 font-bold">{paymentMethod}</span>
                </div>
                <div className="flex justify-between items-center pt-1">
                  <span className="text-gray-500">رمز التوثيق الرقمي (Receipt Hash):</span>
                  <span className="font-mono text-[10px] text-gray-300 bg-gray-900 px-2 py-1 rounded border border-gray-800">{completedReceipt}</span>
                </div>
              </div>

              <button
                onClick={handleFinish}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-emerald-600/20 transition-all cursor-pointer"
              >
                متابعة والرجوع للمنصة
              </button>
            </div>
          ) : (
            /* Checkout Form */
            <>
              {/* Item Summary */}
              <div className="bg-[#121212] border border-gray-800 p-4 rounded-2xl flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-gray-500 block uppercase">الخدمة المطلوبة</span>
                  <h4 className="font-bold text-sm text-white">{paymentModalData.itemTitle}</h4>
                </div>
                <div className="text-left">
                  <span className="text-xs text-gray-500 block">الإجمالي المطلوب</span>
                  <span className="text-xl font-black text-emerald-400 font-mono">
                    {paymentModalData.amount.toLocaleString()} EGP
                  </span>
                </div>
              </div>

              {/* Payment Methods Selection */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
                  اختر وسيلة السداد المفضلة:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('Fawry')}
                    className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                      paymentMethod === 'Fawry' 
                        ? 'border-blue-500 bg-blue-500/10 text-white' 
                        : 'border-gray-800 bg-[#121212] text-gray-400 hover:bg-gray-800/50'
                    }`}
                  >
                    <div className="w-7 h-7 bg-amber-500/20 text-amber-400 rounded-lg flex items-center justify-center font-bold text-xs">
                      F
                    </div>
                    <span className="text-xs font-bold">فوري Fawry</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('Vodafone Cash')}
                    className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                      paymentMethod === 'Vodafone Cash' 
                        ? 'border-red-500 bg-red-500/10 text-white' 
                        : 'border-gray-800 bg-[#121212] text-gray-400 hover:bg-gray-800/50'
                    }`}
                  >
                    <div className="w-7 h-7 bg-red-500/20 text-red-500 rounded-lg flex items-center justify-center font-bold text-xs">
                      V
                    </div>
                    <span className="text-xs font-bold">فودافون كاش</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('Credit Card')}
                    className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                      paymentMethod === 'Credit Card' 
                        ? 'border-purple-500 bg-purple-500/10 text-white' 
                        : 'border-gray-800 bg-[#121212] text-gray-400 hover:bg-gray-800/50'
                    }`}
                  >
                    <div className="w-7 h-7 bg-purple-500/20 text-purple-400 rounded-lg flex items-center justify-center font-bold text-xs">
                      <CreditCard size={14} />
                    </div>
                    <span className="text-xs font-bold">بطاقة بنكية</span>
                  </button>
                </div>
              </div>

              {/* Dynamic Payment Details */}
              {paymentMethod === 'Fawry' && (
                <div className="bg-[#121212] border border-blue-500/30 rounded-2xl p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400 font-bold">رقم مرجع فوري للدفع الفوري:</span>
                    <span className="text-[10px] text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">صالح لمدة 24 ساعة</span>
                  </div>
                  <div className="flex items-center justify-between bg-[#0A0A0A] border border-gray-800 p-3 rounded-xl">
                    <span className="font-mono text-xl font-black text-amber-400 tracking-wider">{fawryCode}</span>
                    <button
                      onClick={handleCopyFawry}
                      className="p-2 text-blue-400 hover:text-white bg-blue-600/10 hover:bg-blue-600 rounded-lg transition-all text-xs font-bold flex items-center gap-1"
                    >
                      <Copy size={14} /> نسخ
                    </button>
                  </div>
                  <p className="text-[11px] text-gray-400 leading-relaxed">
                    توجه لأي ماكينة فوري أو عبر تطبيق فوري باي وادفع على كود الخدمة <b>788 (EduShield)</b> باستخدام الرقم المرجعي أعلاه.
                  </p>
                </div>
              )}

              {paymentMethod === 'Vodafone Cash' && (
                <div className="bg-[#121212] border border-red-500/30 rounded-2xl p-4 space-y-3">
                  <div>
                    <label className="text-xs text-gray-400 font-bold block mb-1.5">رقم المحفظة الإلكترونية (فودافون كاش)</label>
                    <input
                      type="tel"
                      placeholder="010XXXXXXXX"
                      value={vodafoneNumber}
                      onChange={(e) => setVodafoneNumber(e.target.value)}
                      className="w-full bg-[#0A0A0A] border border-gray-800 rounded-xl px-4 py-2.5 text-sm focus:border-red-500 outline-none text-left font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 font-bold block mb-1.5">رمز التأكيد OTP المؤقت</label>
                    <input
                      type="password"
                      maxLength={6}
                      placeholder="••••••"
                      value={vodafoneOtp}
                      onChange={(e) => setVodafoneOtp(e.target.value)}
                      className="w-full bg-[#0A0A0A] border border-gray-800 rounded-xl px-4 py-2.5 text-sm focus:border-red-500 outline-none text-center font-mono tracking-widest"
                    />
                  </div>
                </div>
              )}

              {paymentMethod === 'Credit Card' && (
                <div className="bg-[#121212] border border-purple-500/30 rounded-2xl p-4 space-y-3">
                  <div>
                    <label className="text-xs text-gray-400 font-bold block mb-1.5">رقم البطاقة الائتمانية (Visa / Mastercard)</label>
                    <input
                      type="text"
                      placeholder="4000 1234 5678 9010"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full bg-[#0A0A0A] border border-gray-800 rounded-xl px-4 py-2.5 text-sm focus:border-purple-500 outline-none text-left font-mono"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-gray-400 font-bold block mb-1.5">تاريخ الانتهاء</label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="w-full bg-[#0A0A0A] border border-gray-800 rounded-xl px-4 py-2.5 text-sm focus:border-purple-500 outline-none text-center font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-400 font-bold block mb-1.5">رمز CVV</label>
                      <input
                        type="password"
                        maxLength={4}
                        placeholder="•••"
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        className="w-full bg-[#0A0A0A] border border-gray-800 rounded-xl px-4 py-2.5 text-sm focus:border-purple-500 outline-none text-center font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button
                onClick={handleProcessPayment}
                disabled={isProcessing}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {isProcessing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>جاري التحقق من التوقيع الرقمي والسداد...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck size={20} />
                    <span>تأكيد ودفع {paymentModalData.amount.toLocaleString()} EGP بأمان</span>
                  </>
                )}
              </button>
            </>
          )}

        </div>

      </div>
    </div>
  );
};
