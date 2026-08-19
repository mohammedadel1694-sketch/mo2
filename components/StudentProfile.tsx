import React, { useState } from 'react';
import { 
  User, 
  CreditCard, 
  FileDown, 
  CheckCircle, 
  Clock, 
  BookOpen, 
  ShieldCheck, 
  Download,
  AlertCircle,
  FileText,
  Lock,
  X
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const StudentProfile: React.FC = () => {
  const { 
    currentUser, 
    studentFees, 
    studySheets, 
    downloadSheetSecurely, 
    openPaymentModal,
    setActivePage,
    setSelectedTeacherId,
    showToast 
  } = useApp();

  const [isSheetsModalOpen, setIsSheetsModalOpen] = useState(false);
  const [selectedTeacherForSheets, setSelectedTeacherForSheets] = useState<string | null>(null);

  // Student specific records
  const studentId = currentUser?.id || 'student_1';
  const myFees = studentFees.filter(f => f.studentId === studentId);

  const totalPaid = myFees
    .filter(f => f.status === 'Paid')
    .reduce((sum, f) => sum + f.amount, 0);

  const totalPending = myFees
    .filter(f => f.status === 'Pending')
    .reduce((sum, f) => sum + f.amount, 0);

  const totalCombined = totalPaid + totalPending;
  const paidPercentage = totalCombined > 0 ? Math.round((totalPaid / totalCombined) * 100) : 100;

  // Paid teacher IDs
  const paidTeacherIds = myFees.filter(f => f.status === 'Paid').map(f => f.teacherId);
  const accessibleSheets = studySheets.filter(s => !s.isPaidOnly || paidTeacherIds.includes(s.teacherId));

  const handleOpenSheetsForTeacher = (teacherId: string) => {
    setSelectedTeacherForSheets(teacherId);
    setIsSheetsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-gray-100 p-4 sm:p-6 lg:p-12 font-sans" dir="rtl">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Profile Header */}
        <div className="bg-[#0A0A0A] border border-gray-800 rounded-[2rem] p-6 sm:p-8 flex flex-col md:flex-row items-center gap-6 shadow-xl relative overflow-hidden">
          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-tr from-blue-600 to-blue-500 rounded-3xl flex items-center justify-center text-3xl font-black text-white shadow-lg shadow-blue-600/30 shrink-0">
            {currentUser?.name ? currentUser.name[0] : 'ي'}
          </div>

          <div className="text-center md:text-right flex-1 space-y-1">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
              <h1 className="text-2xl font-bold text-white">{currentUser?.name || 'ياسين إبراهيم'}</h1>
              <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-0.5 rounded-full text-xs font-bold flex items-center gap-1">
                <ShieldCheck size={13} /> حساب طالب موثق
              </span>
            </div>
            <p className="text-gray-400 text-xs sm:text-sm">
              {currentUser?.grade || 'طالب بالصف الثالث الثانوي - علمي رياضة'}
            </p>
            <div className="flex flex-wrap gap-2 mt-3 justify-center md:justify-start">
              <span className="bg-gray-900 border border-gray-800 text-gray-400 px-3 py-1 rounded-xl text-xs font-mono">
                ID: #{currentUser?.id || '48291'}
              </span>
              <span className="bg-blue-600/10 text-blue-400 border border-blue-500/20 px-3 py-1 rounded-xl text-xs font-bold">
                اشتراك العام الدراسي 2026/2027
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-2 w-full md:w-auto">
            <button 
              onClick={() => setActivePage('directory')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-bold text-xs transition-all shadow-md shadow-blue-600/20 cursor-pointer text-center"
            >
              + الاشتراك مع مدرس جديد
            </button>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Payment Status & Quick Stats */}
          <div className="space-y-6">
            
            <div className="bg-[#0A0A0A] border border-gray-800 p-6 rounded-2xl shadow-sm">
              <h3 className="text-gray-400 text-xs font-bold uppercase mb-4 tracking-widest flex items-center gap-2">
                <CreditCard size={16} className="text-blue-500" /> حالة المصروفات الدراسية
              </h3>
              <div className="space-y-3.5">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">تم سداده:</span>
                  <span className="font-mono font-bold text-emerald-400">{totalPaid.toLocaleString()} EGP</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">متبقي غير مسدد:</span>
                  <span className="font-mono font-bold text-amber-400">{totalPending.toLocaleString()} EGP</span>
                </div>
                <div className="w-full bg-gray-900 h-2.5 rounded-full overflow-hidden border border-gray-800">
                  <div 
                    className="bg-emerald-500 h-full transition-all duration-500 rounded-full" 
                    style={{ width: `${paidPercentage}%` }}
                  ></div>
                </div>
                <p className="text-[10px] text-gray-500 text-center">
                  نسبة السداد: <b className="text-white">{paidPercentage}%</b> من إجمالي الدروس المسجلة
                </p>
              </div>
            </div>
            
            <div className="bg-[#0A0A0A] border border-gray-800 p-6 rounded-2xl shadow-sm">
              <h3 className="text-gray-400 text-xs font-bold uppercase mb-3 tracking-widest flex items-center gap-2">
                <BookOpen size={16} className="text-purple-400" /> الشيتات والمذكرات المتاحة
              </h3>
              <p className="text-2xl font-black text-white font-mono">{accessibleSheets.length} ملفاً</p>
              <p className="text-xs text-gray-500 mt-1">شيتات مفحوصة ومصرح لك بتحميلها بأمان.</p>
              <button 
                onClick={() => {
                  setSelectedTeacherForSheets(null);
                  setIsSheetsModalOpen(true);
                }}
                className="w-full mt-4 bg-gray-900 hover:bg-gray-800 text-white py-2.5 rounded-xl text-xs font-bold transition-all border border-gray-800 cursor-pointer"
              >
                عرض وتحميل جميع الشيتات
              </button>
            </div>

          </div>

          {/* Payment History Table */}
          <div className="lg:col-span-2 bg-[#0A0A0A] border border-gray-800 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between">
            <div>
              <div className="p-5 border-b border-gray-800 flex justify-between items-center bg-[#0E0E0E]">
                <div>
                  <h3 className="font-bold text-base text-white">تاريخ المدفوعات والاشتراك مع المدرسين</h3>
                  <p className="text-xs text-gray-500">حالة الشيتات تفتح تلقائياً بمجرد إتمام السداد</p>
                </div>
                <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                  حماية BOLA نشطة
                </span>
              </div>

              <div className="overflow-x-auto text-xs">
                <table className="w-full text-right">
                  <thead className="bg-[#121212] text-gray-400 font-bold uppercase border-b border-gray-800">
                    <tr>
                      <th className="px-6 py-3.5">المدرس</th>
                      <th className="px-6 py-3.5">المادة</th>
                      <th className="px-6 py-3.5">المبلغ</th>
                      <th className="px-6 py-3.5">الحالة</th>
                      <th className="px-6 py-3.5">تحميل الشيتات</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800/80">
                    {myFees.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                          لم تقم بالتسجيل مع أي مدرس بعد.{' '}
                          <button 
                            onClick={() => setActivePage('directory')}
                            className="text-blue-400 underline font-bold"
                          >
                            تصفح المدرسين
                          </button>
                        </td>
                      </tr>
                    ) : (
                      myFees.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-800/20 transition-all">
                          <td className="px-6 py-4 font-bold text-white">
                            <div className="flex items-center gap-2">
                              <div className="w-7 h-7 bg-gray-800 rounded-full flex items-center justify-center text-blue-400 font-bold text-[11px]">
                                {item.teacherName[3] || item.teacherName[0]}
                              </div>
                              <span>{item.teacherName}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-gray-400">{item.subject}</td>
                          <td className="px-6 py-4 font-mono font-bold text-white">{item.amount.toLocaleString()} {item.currency}</td>
                          <td className="px-6 py-4">
                            {item.status === 'Paid' ? (
                              <span className="inline-flex items-center gap-1 font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20 text-[11px]">
                                <CheckCircle size={13} /> تم السداد
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 font-bold text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20 text-[11px]">
                                <Clock size={13} /> معلق
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4">
                            {item.status === 'Paid' ? (
                              <button
                                onClick={() => handleOpenSheetsForTeacher(item.teacherId)}
                                className="flex items-center gap-1 text-blue-400 hover:text-blue-300 font-bold bg-blue-500/10 hover:bg-blue-500/20 px-3 py-1 rounded-lg transition-all cursor-pointer"
                              >
                                <FileDown size={14} /> فتح الشيتات
                              </button>
                            ) : (
                              <button
                                onClick={() => openPaymentModal({
                                  type: 'student_fee',
                                  itemTitle: `سداد مصروفات مادة ${item.subject} - ${item.teacherName}`,
                                  amount: item.amount,
                                  targetId: item.id,
                                })}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg font-bold transition-all shadow-sm cursor-pointer"
                              >
                                سداد الآن
                              </button>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="p-4 border-t border-gray-800 bg-[#0E0E0E] flex items-center justify-between text-xs text-gray-500">
              <span>الإيصالات موثقة بالكامل برقم أمان مشفر</span>
              <span className="text-emerald-400 font-mono">Verified Student Access</span>
            </div>
          </div>

        </div>

      </div>

      {/* Sheets Library Modal */}
      {isSheetsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#0A0A0A] border border-gray-800 rounded-3xl w-full max-w-2xl shadow-2xl p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-gray-800 pb-3">
              <div>
                <h3 className="font-bold text-base text-white flex items-center gap-2">
                  <BookOpen className="text-blue-500" size={18} /> مكتبة الشيتات والمواد التعليمية المتاحة
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">الملفات مفحوصة ومحمية بـ Signed URL فوري</p>
              </div>
              <button 
                onClick={() => setIsSheetsModalOpen(false)}
                className="p-1 text-gray-400 hover:text-white rounded-lg cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto">
              {studySheets
                .filter(s => !selectedTeacherForSheets || s.teacherId === selectedTeacherForSheets)
                .map((sheet) => {
                  const hasPaidTeacher = paidTeacherIds.includes(sheet.teacherId);
                  const isLocked = sheet.isPaidOnly && !hasPaidTeacher;

                  return (
                    <div 
                      key={sheet.id}
                      className="p-3.5 bg-[#121212] border border-gray-800 rounded-xl flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2.5 rounded-lg ${isLocked ? 'bg-gray-800 text-gray-500' : 'bg-red-500/10 text-red-400'}`}>
                          {isLocked ? <Lock size={18} /> : <FileText size={18} />}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-xs text-white">{sheet.title}</h4>
                            {sheet.isPaidOnly ? (
                              <span className={`text-[9px] px-1.5 py-0.2 rounded ${isLocked ? 'bg-amber-500/10 text-amber-400' : 'bg-emerald-500/10 text-emerald-400'}`}>
                                {isLocked ? 'يتطلب سداد' : 'مدفوع ومتاح'}
                              </span>
                            ) : (
                              <span className="text-[9px] bg-blue-500/10 text-blue-400 px-1.5 py-0.2 rounded">
                                معاينة مجانية
                              </span>
                            )}
                          </div>
                          <p className="text-[10px] text-gray-500 mt-0.5">
                            المدرس: {sheet.teacherName} • الحجم: {sheet.fileSize} • {sheet.fileType}
                          </p>
                        </div>
                      </div>

                      <div>
                        {isLocked ? (
                          <button
                            onClick={() => {
                              setIsSheetsModalOpen(false);
                              const feeRecord = myFees.find(f => f.teacherId === sheet.teacherId);
                              if (feeRecord) {
                                openPaymentModal({
                                  type: 'student_fee',
                                  itemTitle: `سداد مصروفات مادة ${sheet.subject} - ${sheet.teacherName}`,
                                  amount: feeRecord.amount,
                                  targetId: feeRecord.id,
                                });
                              }
                            }}
                            className="bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-all cursor-pointer"
                          >
                            سداد لفتح الملف
                          </button>
                        ) : (
                          <button
                            onClick={() => downloadSheetSecurely(sheet.id)}
                            className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 transition-all cursor-pointer"
                          >
                            <Download size={14} /> تحميل
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>

            <div className="p-3 border-t border-gray-800 text-center">
              <button
                onClick={() => setIsSheetsModalOpen(false)}
                className="text-xs text-gray-400 hover:text-white font-bold"
              >
                إغلاق المكتبة
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
