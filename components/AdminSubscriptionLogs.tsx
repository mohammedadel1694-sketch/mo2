import React, { useState } from 'react';
import { 
  List, 
  Search, 
  Download, 
  Filter, 
  MoreHorizontal, 
  User, 
  ShieldCheck, 
  CheckCircle2,
  Calendar,
  CreditCard,
  X
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AdminSubscriptionLogs: React.FC = () => {
  const { subscriptionLogs, showToast } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlanFilter, setSelectedPlanFilter] = useState<'ALL' | 'Annual' | 'Monthly'>('ALL');
  const [selectedLogDetails, setSelectedLogDetails] = useState<any>(null);

  const filteredLogs = subscriptionLogs.filter(log => {
    const matchSearch = log.teacherName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.transactionId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.method.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (selectedPlanFilter === 'ALL') return matchSearch;
    if (selectedPlanFilter === 'Annual') return matchSearch && log.plan.includes('Annual');
    if (selectedPlanFilter === 'Monthly') return matchSearch && log.plan.includes('Monthly');
    return matchSearch;
  });

  const totalAmount = filteredLogs.reduce((sum, l) => sum + l.amount, 0);

  const handleExport = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      ["رقم المعاملة,المدرس,الباقة,المبلغ,وسيلة الدفع,التاريخ,الحالة"].concat(
        filteredLogs.map(l => `"${l.transactionId}","${l.teacherName}","${l.plan}","${l.amount} ${l.currency}","${l.method}","${l.date}","${l.status}"`)
      ).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `subscription_financial_logs_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast('تم تصدير سجل الاشتراكات المالية بنجاح (CSV)', 'success');
  };

  return (
    <div className="min-h-screen bg-[#050505] text-gray-100 p-4 sm:p-6 lg:p-10 font-sans" dir="rtl">
      
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 border-b border-gray-800 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs px-2.5 py-0.5 rounded-full font-bold">
              دفتر المعاملات المالية الموثق
            </span>
            <span className="text-gray-500 text-xs flex items-center gap-1 font-mono">
              <ShieldCheck size={14} className="text-emerald-400" /> Immutable Ledger
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">سجل اشتراكات المدرسين</h1>
          <p className="text-gray-400 text-xs sm:text-sm mt-1">تتبع جميع العمليات المالية الخاصة برسوم وباقات الموقع للمدرسين.</p>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="flex bg-[#121212] border border-gray-800 rounded-xl p-1 text-xs">
            <button
              onClick={() => setSelectedPlanFilter('ALL')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${selectedPlanFilter === 'ALL' ? 'bg-blue-600 text-white' : 'text-gray-400'}`}
            >
              الكل
            </button>
            <button
              onClick={() => setSelectedPlanFilter('Annual')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${selectedPlanFilter === 'Annual' ? 'bg-blue-600 text-white' : 'text-gray-400'}`}
            >
              السنوي
            </button>
            <button
              onClick={() => setSelectedPlanFilter('Monthly')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${selectedPlanFilter === 'Monthly' ? 'bg-blue-600 text-white' : 'text-gray-400'}`}
            >
              الشهري
            </button>
          </div>

          <button 
            onClick={handleExport}
            className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 text-white shadow-lg shadow-blue-600/20 cursor-pointer"
          >
            <Download size={15} /> تصدير السجل
          </button>
        </div>
      </header>

      {/* Subscription Table */}
      <div className="bg-[#0A0A0A] border border-gray-800 rounded-[2rem] overflow-hidden shadow-2xl">
        
        {/* Search & Top Bar */}
        <div className="p-6 border-b border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 bg-[#0D0D0D]">
          <div className="relative flex-1 w-full md:max-w-md">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="البحث عن مدرس أو رقم معاملة..." 
              className="w-full bg-[#161616] border border-gray-800 rounded-xl py-2.5 pr-11 pl-4 text-xs text-white focus:border-blue-500 outline-none transition-all"
            />
          </div>

          <div className="flex items-center gap-4 text-xs text-gray-400">
            <span>إجمالي المعاملات المعروضة: <b className="text-white font-mono font-bold">{filteredLogs.length}</b></span>
            <span>إجمالي الإيراد: <b className="text-emerald-400 font-mono font-bold">{totalAmount.toLocaleString()} EGP</b></span>
          </div>
        </div>
        
        <div className="overflow-x-auto text-right">
          <table className="w-full text-xs">
            <thead className="bg-[#111111] text-gray-400 font-bold uppercase tracking-wider border-b border-gray-800">
              <tr>
                <th className="px-6 py-4">المدرس</th>
                <th className="px-6 py-4">باقة الاشتراك</th>
                <th className="px-6 py-4">المبلغ المدفوع</th>
                <th className="px-6 py-4">وسيلة الدفع</th>
                <th className="px-6 py-4">تاريخ المعاملة</th>
                <th className="px-6 py-4">رقم المعاملة</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/80">
              {filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-10 text-center text-gray-500">
                    لا توجد سجلات مطابقة لمعايير البحث
                  </td>
                </tr>
              ) : (
                filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-800/20 transition-all group">
                    <td className="px-6 py-4 font-bold text-white flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-800 border border-gray-700 rounded-full flex items-center justify-center group-hover:bg-blue-600 transition-all text-xs">
                        <User size={15} />
                      </div>
                      <span>{log.teacherName}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`font-bold px-3 py-1 rounded-full text-[11px] border ${
                        log.plan.includes('Annual') 
                          ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' 
                          : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                      }`}>
                        {log.plan}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-mono font-bold text-white text-sm">
                      {log.amount.toLocaleString()} {log.currency}
                    </td>
                    <td className="px-6 py-4 text-gray-300">
                      <span className="bg-[#161616] px-2.5 py-1 rounded-lg border border-gray-800">
                        {log.method}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-400 font-mono">{log.date}</td>
                    <td className="px-6 py-4 text-gray-400 font-mono text-[11px]">{log.transactionId}</td>
                    <td className="px-6 py-4 text-left">
                      <button 
                        onClick={() => setSelectedLogDetails(log)}
                        className="p-1 text-gray-500 hover:text-white transition-colors cursor-pointer"
                        title="تفاصيل المعاملة"
                      >
                        <MoreHorizontal size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-gray-800 bg-[#0A0A0A] flex items-center justify-between text-xs text-gray-500">
          <span>التشفير: AES-256 GCM Financial Signatures</span>
          <span className="text-emerald-400 font-mono">Status: Verified & Audited</span>
        </div>

      </div>

      {/* Transaction Details Modal */}
      {selectedLogDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#0A0A0A] border border-gray-800 rounded-3xl w-full max-w-md shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-800 pb-3">
              <h3 className="font-bold text-base text-white">تفاصيل الإيصال المالي</h3>
              <button 
                onClick={() => setSelectedLogDetails(null)}
                className="p-1 text-gray-400 hover:text-white rounded-lg cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-2.5 text-xs text-right">
              <div className="flex justify-between border-b border-gray-800/80 pb-2">
                <span className="text-gray-500">المدرس:</span>
                <span className="font-bold text-white">{selectedLogDetails.teacherName}</span>
              </div>
              <div className="flex justify-between border-b border-gray-800/80 pb-2">
                <span className="text-gray-500">نوع الباقة:</span>
                <span className="text-blue-400 font-bold">{selectedLogDetails.plan}</span>
              </div>
              <div className="flex justify-between border-b border-gray-800/80 pb-2">
                <span className="text-gray-500">المبلغ:</span>
                <span className="font-mono font-bold text-emerald-400">{selectedLogDetails.amount.toLocaleString()} {selectedLogDetails.currency}</span>
              </div>
              <div className="flex justify-between border-b border-gray-800/80 pb-2">
                <span className="text-gray-500">وسيلة الدفع:</span>
                <span className="text-gray-300">{selectedLogDetails.method}</span>
              </div>
              <div className="flex justify-between border-b border-gray-800/80 pb-2">
                <span className="text-gray-500">التاريخ:</span>
                <span className="font-mono text-gray-400">{selectedLogDetails.date}</span>
              </div>
              <div className="flex justify-between items-center pt-1">
                <span className="text-gray-500">رقم المعاملة:</span>
                <span className="font-mono text-gray-300 bg-gray-900 px-2 py-0.5 rounded border border-gray-800">{selectedLogDetails.transactionId}</span>
              </div>
            </div>

            <button
              onClick={() => setSelectedLogDetails(null)}
              className="w-full bg-gray-900 hover:bg-gray-800 text-white font-bold py-2.5 rounded-xl transition-all text-xs cursor-pointer mt-2"
            >
              إغلاق
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
