import React from 'react';
import { AlertTriangle, Wrench, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const MaintenanceScreen: React.FC = () => {
  const { switchRole } = useApp();

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-6 text-center font-sans" dir="rtl">
      <div className="max-w-md w-full bg-[#0A0A0A] border border-amber-500/30 rounded-3xl p-8 sm:p-10 shadow-2xl space-y-6">
        <div className="w-20 h-20 bg-amber-500/10 text-amber-400 rounded-3xl flex items-center justify-center mx-auto border border-amber-500/20 animate-pulse">
          <Wrench size={36} />
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-white">الموقع في وضع الصيانة والتحديث</h2>
          <p className="text-xs text-gray-400 leading-relaxed">
            نقوم حالياً بترقية خوادم المنصة وتطبيق تحسينات الأمان الدورية. سنعود للعمل بكامل طاقتنا خلال دقائق.
          </p>
        </div>

        <div className="bg-[#121212] border border-gray-800 p-4 rounded-2xl text-xs text-gray-400 text-right space-y-1">
          <div className="flex items-center gap-2 text-emerald-400 font-bold mb-1">
            <ShieldCheck size={16} /> بياناتك وشيتاتك في أمان تام
          </div>
          <p className="text-[11px] text-gray-500">تم حفظ كافة المعاملات والمستندات في الخزائن المشفرة.</p>
        </div>

        <div className="pt-2">
          <button
            onClick={() => switchRole('admin')}
            className="text-xs text-blue-400 hover:text-blue-300 font-bold underline cursor-pointer"
          >
            تسجيل دخول الأدمن لتجاوز وضع الصيانة
          </button>
        </div>
      </div>
    </div>
  );
};
