import React, { useState } from 'react';
import { 
  Users, 
  Wallet, 
  FileText, 
  Upload, 
  Download, 
  Search, 
  MoreVertical, 
  CheckCircle, 
  Clock, 
  Plus, 
  ArrowUpRight,
  ShieldCheck,
  FileCheck,
  X,
  Trash2,
  Lock,
  Eye,
  Sliders,
  DollarSign,
  TrendingUp,
  Receipt,
  QrCode,
  Smartphone,
  ExternalLink,
  Copy,
  CheckCircle2,
  Sparkles,
  Layers,
  Calendar,
  CreditCard,
  Calculator,
  Percent,
  Zap,
  BarChart3
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const TeacherDashboard: React.FC = () => {
  const { 
    currentUser, 
    studentFees, 
    studySheets, 
    uploadStudySheet, 
    deleteStudySheet, 
    downloadSheetSecurely,
    selectedTeacherId,
    openPaymentModal,
    showToast,
    setIsSecurityModalOpen
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [activeDashboardTab, setActiveDashboardTab] = useState<'overview' | 'calculator'>('overview');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [newSheetTitle, setNewSheetTitle] = useState('');
  const [newSheetSubject, setNewSheetSubject] = useState(currentUser?.subject || 'الرياضيات');
  const [newSheetGrade, setNewSheetGrade] = useState('الصف الثالث الثانوي');
  const [isPaidOnly, setIsPaidOnly] = useState(true);
  const [selectedFileName, setSelectedFileName] = useState('');
  const [selectedFileSize, setSelectedFileSize] = useState('2.1 MB');
  const [isScanningFile, setIsScanningFile] = useState(false);

  // Interactive Teacher Revenue & Profit Calculator State
  const [calcStudentsCount, setCalcStudentsCount] = useState<number>(180);
  const [calcSheetPrice, setCalcSheetPrice] = useState<number>(200);
  const [calcSheetsPerMonth, setCalcSheetsPerMonth] = useState<number>(4);
  const [calcPlan, setCalcPlan] = useState<'monthly' | 'annual'>('monthly');

  // Dynamic Calculated values
  const calcGrossMonthly = calcStudentsCount * calcSheetPrice;
  const calcPlatformFee = calcPlan === 'monthly' ? 150 : 125;
  const calcNetMonthly = Math.max(0, calcGrossMonthly - calcPlatformFee);
  const calcAnnualProjected = calcNetMonthly * 10; // 10 academic months
  const calcPaperlessSavings = calcStudentsCount * calcSheetsPerMonth * 15; // 15 EGP per printed physical sheet saved
  const calcMargin = calcGrossMonthly > 0 ? ((calcNetMonthly / calcGrossMonthly) * 100).toFixed(1) : '100';

  // Filter fees and sheets for this teacher
  const teacherId = currentUser?.role === 'teacher' ? currentUser.id : selectedTeacherId;
  const teacherFees = studentFees.filter(f => f.teacherId === teacherId || currentUser?.role === 'admin');
  const teacherSheets = studySheets.filter(s => s.teacherId === teacherId || currentUser?.role === 'admin');

  // Filtered students by search
  const filteredFees = teacherFees.filter(f => 
    f.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Stats calculations
  const totalPaidRevenue = teacherFees
    .filter(f => f.status === 'Paid')
    .reduce((sum, f) => sum + f.amount, 0);

  const paidStudentsCount = teacherFees.filter(f => f.status === 'Paid').length;
  const pendingStudentsCount = teacherFees.filter(f => f.status === 'Pending').length;

  const handleSimulatedFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file extension
      const validExtensions = ['pdf', 'docx', 'doc', 'png', 'zip'];
      const fileExt = file.name.split('.').pop()?.toLowerCase();

      if (!fileExt || !validExtensions.includes(fileExt)) {
        showToast('خطأ أمني: يسمح فقط برفع ملفات PDF, DOCX, PNG, ZIP المعتمدة.', 'error');
        return;
      }

      if (file.size > 10 * 1024 * 1024) {
        showToast('تنبيه: حجم الملف يتجاوز الحد الأقصى المسموح (10MB)', 'error');
        return;
      }

      setSelectedFileName(file.name);
      setSelectedFileSize(`${(file.size / (1024 * 1024)).toFixed(1)} MB`);
      if (!newSheetTitle) {
        setNewSheetTitle(file.name.replace(/\.[^/.]+$/, ""));
      }
    }
  };

  const handleSaveUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSheetTitle.trim()) {
      showToast('يرجى كتابة عنوان للشيت أو المذكرة', 'error');
      return;
    }

    setIsScanningFile(true);

    setTimeout(() => {
      uploadStudySheet({
        title: newSheetTitle.trim(),
        subject: newSheetSubject,
        grade: newSheetGrade,
        fileSize: selectedFileSize,
        isPaidOnly: isPaidOnly,
        teacherId: teacherId || currentUser?.id || 't1',
      });

      setIsScanningFile(false);
      setIsUploadModalOpen(false);
      setNewSheetTitle('');
      setSelectedFileName('');
      showToast('تم فحص وتوقيع الشيت بـ SHA-256 ونشره بنجاح', 'success');
    }, 1000);
  };

  const handleExportStudentsReport = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      ["اسم الطالب,الحالة,المبلغ,وسيلة الدفع,التاريخ"].concat(
        teacherFees.map(f => `"${f.studentName}","${f.status}","${f.amount} EGP","${f.paymentMethod || 'غير محدد'}","${f.paymentDate}"`)
      ).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `student_fees_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast('تم تصدير كشف حساب الطلاب (CSV) بنجاح', 'success');
  };

  return (
    <div className="min-h-screen bg-[#050505] text-gray-100 p-4 sm:p-6 lg:p-10 font-sans" dir="rtl">
      
      {/* 1. Header with Teacher Bio and Quick Actions */}
      <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 border-b border-gray-800 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs px-2.5 py-0.5 rounded-full font-bold">
              غرفة المعلم السحابية
            </span>
            <span className="text-emerald-400 text-xs flex items-center gap-1 font-mono">
              <ShieldCheck size={14} /> BOLA Protection Active
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            {currentUser?.role === 'teacher' ? currentUser.name : 'غرفة المعلم المعتمد'}
          </h1>
          <p className="text-gray-400 text-xs sm:text-sm mt-1">
            مساحة إدارة المذكرات، تحصيل الاشتراكات التلقائي، ومتابعة الطلاب المسددين.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setActiveDashboardTab(activeDashboardTab === 'calculator' ? 'overview' : 'calculator')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl transition-all text-xs font-bold cursor-pointer border ${
              activeDashboardTab === 'calculator'
                ? 'bg-emerald-600 text-white border-emerald-500 shadow-md shadow-emerald-600/30'
                : 'bg-[#161616] border-gray-800 text-emerald-400 hover:bg-emerald-950/30 hover:border-emerald-500/40'
            }`}
          >
            <Calculator size={15} /> حاسبة العوائد التقديرية
          </button>

          <button
            onClick={handleExportStudentsReport}
            className="flex items-center gap-2 bg-[#161616] border border-gray-800 hover:border-gray-700 px-3.5 py-2 rounded-xl hover:bg-gray-800 transition-all text-xs font-bold text-gray-300 hover:text-white cursor-pointer"
          >
            <Download size={15} /> تصدير كشف الطلاب (Excel / CSV)
          </button>

          <button
            onClick={() => {
              const pendingStudent = teacherFees.find(f => f.status === 'Pending');
              if (pendingStudent) {
                openPaymentModal({
                  type: 'student_fee',
                  itemTitle: `سداد اشتراك ${pendingStudent.studentName}`,
                  amount: pendingStudent.amount,
                  targetId: pendingStudent.id,
                });
              } else {
                showToast('جميع الطلاب الحاليين مسددين للرسوم بالفعل', 'info');
              }
            }}
            className="flex items-center gap-2 bg-emerald-950/40 border border-emerald-500/30 hover:border-emerald-500 text-emerald-400 px-3.5 py-2 rounded-xl transition-all text-xs font-bold cursor-pointer"
          >
            <CreditCard size={15} /> تسجيل سداد طالب
          </button>
          
          <button 
            onClick={() => setIsUploadModalOpen(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition-all text-xs font-bold shadow-lg shadow-blue-600/20 cursor-pointer"
          >
            <Upload size={15} /> رفع شيت / مذكرة جديدة
          </button>
        </div>
      </header>

      {/* 2. Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        
        <div className="bg-[#0A0A0A] border border-gray-800 p-5 rounded-2xl shadow-sm hover:border-gray-700 transition-all">
          <div className="flex justify-between items-start mb-3">
            <div className="p-2.5 bg-blue-500/10 rounded-xl text-blue-500">
              <Wallet size={20} />
            </div>
            <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full">
              +14% <ArrowUpRight size={11} />
            </span>
          </div>
          <p className="text-gray-400 text-[11px] font-bold uppercase tracking-wider">إجمالي الإيرادات المحصلة</p>
          <h3 className="text-xl font-black mt-1 text-white font-mono">{totalPaidRevenue.toLocaleString()} EGP</h3>
        </div>

        <div className="bg-[#0A0A0A] border border-gray-800 p-5 rounded-2xl shadow-sm hover:border-gray-700 transition-all">
          <div className="flex justify-between items-start mb-3">
            <div className="p-2.5 bg-emerald-500/10 rounded-xl text-emerald-400">
              <Users size={20} />
            </div>
            <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full font-bold">نشط ومسدد</span>
          </div>
          <p className="text-gray-400 text-[11px] font-bold uppercase tracking-wider">الطلاب المسددين</p>
          <h3 className="text-xl font-black mt-1 text-white">{paidStudentsCount} طالباً</h3>
        </div>

        <div className="bg-[#0A0A0A] border border-gray-800 p-5 rounded-2xl shadow-sm hover:border-gray-700 transition-all">
          <div className="flex justify-between items-start mb-3">
            <div className="p-2.5 bg-amber-500/10 rounded-xl text-amber-500">
              <Clock size={20} />
            </div>
            <span className="text-[10px] text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full font-bold">معلق</span>
          </div>
          <p className="text-gray-400 text-[11px] font-bold uppercase tracking-wider">دفعات قيد الانتظار</p>
          <h3 className="text-xl font-black mt-1 text-white">{pendingStudentsCount} دفعات</h3>
        </div>

        <div className="bg-[#0A0A0A] border border-gray-800 p-5 rounded-2xl shadow-sm hover:border-gray-700 transition-all">
          <div className="flex justify-between items-start mb-3">
            <div className="p-2.5 bg-purple-500/10 rounded-xl text-purple-400">
              <Lock size={20} />
            </div>
            <span className="text-[10px] text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-full font-bold font-mono">SHA-256</span>
          </div>
          <p className="text-gray-400 text-[11px] font-bold uppercase tracking-wider">مذكرات الغرفة المحمية</p>
          <h3 className="text-xl font-black mt-1 text-white">{teacherSheets.length} ملفات</h3>
        </div>

      </div>

      {/* 3. Dashboard Navigation Tabs */}
      <div className="flex items-center justify-between gap-3 mb-8 border-b border-gray-800/80 pb-4 flex-wrap">
        <div className="flex items-center gap-2 bg-[#101010] p-1.5 rounded-2xl border border-gray-800">
          <button
            onClick={() => setActiveDashboardTab('overview')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeDashboardTab === 'overview'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                : 'text-gray-400 hover:text-white hover:bg-gray-800/40'
            }`}
          >
            <Layers size={15} />
            <span>السجل والمدفوعات والمذكرات</span>
          </button>

          <button
            onClick={() => setActiveDashboardTab('calculator')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeDashboardTab === 'calculator'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-600/30'
                : 'text-gray-400 hover:text-white hover:bg-gray-800/40'
            }`}
          >
            <Calculator size={15} />
            <span>حاسبة الأرباح والعوائد التقديرية</span>
            <span className="px-1.5 py-0.5 text-[9px] bg-emerald-500/20 text-emerald-300 rounded-md font-mono font-bold">
              {calcNetMonthly.toLocaleString()} EGP/mo
            </span>
          </button>
        </div>

        {activeDashboardTab === 'calculator' && (
          <div className="text-xs text-emerald-400 flex items-center gap-1.5 font-medium">
            <Sparkles size={14} /> محاكاة أرباح واشتراكات المعلم بناءً على خطط المنصة
          </div>
        )}
      </div>

      {/* 4. Calculator View (Active Tab: calculator) */}
      {activeDashboardTab === 'calculator' && (
        <div className="space-y-8 animate-fadeIn">
          
          {/* Revenue KPI Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="bg-gradient-to-br from-[#0e1713] to-[#080d0b] border border-emerald-500/30 p-5 rounded-2xl space-y-2">
              <div className="flex items-center justify-between text-xs text-emerald-400">
                <span className="font-bold">صافي أرباحك الشهرية</span>
                <DollarSign size={16} />
              </div>
              <p className="text-2xl sm:text-3xl font-black text-white font-mono">
                {calcNetMonthly.toLocaleString()} <span className="text-xs font-normal text-gray-400">ج.م / شهر</span>
              </p>
              <div className="flex items-center justify-between text-[11px] text-emerald-400/80 pt-1 border-t border-emerald-500/20">
                <span>هامش ربح صافي:</span>
                <span className="font-mono font-bold">{calcMargin}%</span>
              </div>
            </div>

            <div className="bg-[#0A0A0A] border border-gray-800 p-5 rounded-2xl space-y-2">
              <div className="flex items-center justify-between text-xs text-blue-400">
                <span className="font-bold">إجمالي التحصيل الشهري (Gross)</span>
                <TrendingUp size={16} />
              </div>
              <p className="text-2xl sm:text-3xl font-black text-white font-mono">
                {calcGrossMonthly.toLocaleString()} <span className="text-xs font-normal text-gray-400">ج.م</span>
              </p>
              <div className="flex items-center justify-between text-[11px] text-gray-400 pt-1 border-t border-gray-800">
                <span>من إجمالي {calcStudentsCount} طالب</span>
                <span className="font-mono text-gray-300">{calcSheetPrice} ج.م/طالب</span>
              </div>
            </div>

            <div className="bg-[#0A0A0A] border border-gray-800 p-5 rounded-2xl space-y-2">
              <div className="flex items-center justify-between text-xs text-purple-400">
                <span className="font-bold">التوقعات السنوية (10 أشهر)</span>
                <Calendar size={16} />
              </div>
              <p className="text-2xl sm:text-3xl font-black text-white font-mono">
                {calcAnnualProjected.toLocaleString()} <span className="text-xs font-normal text-gray-400">ج.م</span>
              </p>
              <div className="flex items-center justify-between text-[11px] text-gray-400 pt-1 border-t border-gray-800">
                <span>الاشتراك السنوي للمنصة:</span>
                <span className="font-mono text-purple-300">
                  {calcPlan === 'annual' ? '1,500 ج.م' : `${calcPlatformFee * 10} ج.م`}
                </span>
              </div>
            </div>

            <div className="bg-[#0A0A0A] border border-gray-800 p-5 rounded-2xl space-y-2">
              <div className="flex items-center justify-between text-xs text-teal-400">
                <span className="font-bold">وفر تكاليف الطباعة والتصوير</span>
                <Zap size={16} />
              </div>
              <p className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">
                +{calcPaperlessSavings.toLocaleString()} <span className="text-xs font-normal text-gray-400">ج.م / شهر</span>
              </p>
              <div className="flex items-center justify-between text-[11px] text-gray-400 pt-1 border-t border-gray-800">
                <span>استبدال المذكرات الورقية بالـ DRM:</span>
                <span className="text-teal-300">توفير 100% هالك</span>
              </div>
            </div>
          </div>

          {/* Interactive Calculator Controllers & Scenarios */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Main Interactive Controls */}
            <div className="lg:col-span-2 bg-[#0A0A0A] border border-gray-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
              <div className="flex items-center justify-between border-b border-gray-800 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-xl">
                    <Sliders size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-white">إعدادات المحاكاة التقديرية</h3>
                    <p className="text-xs text-gray-500">حرك المؤشرات لضبط عدد الطلاب ومتوسط الاشتراكات</p>
                  </div>
                </div>

                <div className="flex items-center gap-1 bg-[#141414] p-1 rounded-xl border border-gray-800">
                  <button
                    onClick={() => setCalcPlan('monthly')}
                    className={`px-3 py-1 text-xs rounded-lg font-bold transition-all cursor-pointer ${
                      calcPlan === 'monthly' ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    شهري (150 ج.م)
                  </button>
                  <button
                    onClick={() => setCalcPlan('annual')}
                    className={`px-3 py-1 text-xs rounded-lg font-bold transition-all cursor-pointer ${
                      calcPlan === 'annual' ? 'bg-emerald-600 text-white shadow-sm' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    سنوي (1,500 ج.م)
                  </button>
                </div>
              </div>

              {/* Slider 1: Students Count */}
              <div className="space-y-2.5 bg-[#121212] p-4 sm:p-5 rounded-2xl border border-gray-800/80">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-gray-300 flex items-center gap-2">
                    <Users size={15} className="text-blue-400" /> عدد الطلاب الفعلي أو المستهدف
                  </span>
                  <div className="flex items-center gap-2">
                    <input 
                      type="number" 
                      min="10" 
                      max="3000" 
                      value={calcStudentsCount} 
                      onChange={(e) => setCalcStudentsCount(Math.max(1, Number(e.target.value)))}
                      className="w-20 bg-[#1a1a1a] border border-gray-700 rounded-lg px-2.5 py-1 text-center font-mono font-bold text-white text-xs outline-none focus:border-blue-500"
                    />
                    <span className="text-gray-400 text-xs">طالب</span>
                  </div>
                </div>
                <input 
                  type="range" 
                  min="20" 
                  max="1500" 
                  step="10"
                  value={calcStudentsCount}
                  onChange={(e) => setCalcStudentsCount(Number(e.target.value))}
                  className="w-full accent-blue-500 cursor-pointer h-2.5 bg-gray-950 rounded-lg"
                />
                <div className="flex justify-between text-[10px] text-gray-500 font-mono">
                  <span>20 طالب</span>
                  <span>500 طالب</span>
                  <span>1,000 طالب</span>
                  <span>1,500 طالب+</span>
                </div>
              </div>

              {/* Slider 2: Price Per Student */}
              <div className="space-y-2.5 bg-[#121212] p-4 sm:p-5 rounded-2xl border border-gray-800/80">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-gray-300 flex items-center gap-2">
                    <DollarSign size={15} className="text-emerald-400" /> متوسط سعر الاشتراك / المذكرة الشهرية
                  </span>
                  <div className="flex items-center gap-2">
                    <input 
                      type="number" 
                      min="20" 
                      max="2000" 
                      value={calcSheetPrice} 
                      onChange={(e) => setCalcSheetPrice(Math.max(0, Number(e.target.value)))}
                      className="w-24 bg-[#1a1a1a] border border-gray-700 rounded-lg px-2.5 py-1 text-center font-mono font-bold text-emerald-400 text-xs outline-none focus:border-emerald-500"
                    />
                    <span className="text-gray-400 text-xs">ج.م</span>
                  </div>
                </div>
                <input 
                  type="range" 
                  min="50" 
                  max="800" 
                  step="25"
                  value={calcSheetPrice}
                  onChange={(e) => setCalcSheetPrice(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer h-2.5 bg-gray-950 rounded-lg"
                />
                <div className="flex justify-between text-[10px] text-gray-500 font-mono">
                  <span>50 ج.م</span>
                  <span>200 ج.م</span>
                  <span>400 ج.م</span>
                  <span>800 ج.م</span>
                </div>
              </div>

              {/* Slider 3: Sheets per Month (for printing savings calculation) */}
              <div className="space-y-2.5 bg-[#121212] p-4 sm:p-5 rounded-2xl border border-gray-800/80">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-gray-300 flex items-center gap-2">
                    <FileText size={15} className="text-purple-400" /> عدد المذكرات والشيتات المرفوعة شهرياً
                  </span>
                  <span className="font-mono font-bold text-purple-300 text-xs bg-purple-950/60 px-3 py-1 rounded-lg border border-purple-500/30">
                    {calcSheetsPerMonth} شيتات / شهر
                  </span>
                </div>
                <input 
                  type="range" 
                  min="1" 
                  max="12" 
                  step="1"
                  value={calcSheetsPerMonth}
                  onChange={(e) => setCalcSheetsPerMonth(Number(e.target.value))}
                  className="w-full accent-purple-500 cursor-pointer h-2.5 bg-gray-950 rounded-lg"
                />
                <div className="flex justify-between text-[10px] text-gray-500 font-mono">
                  <span>1 شيت</span>
                  <span>4 شيتات (أسبوعي)</span>
                  <span>8 شيتات</span>
                  <span>12 شيت</span>
                </div>
              </div>

              {/* Formula & Policy Notice */}
              <div className="p-4 bg-[#141414] rounded-2xl border border-gray-800 flex items-start gap-3 text-xs text-gray-400">
                <ShieldCheck className="text-emerald-400 shrink-0 mt-0.5" size={18} />
                <div className="space-y-1">
                  <p className="font-bold text-gray-200">المنصة لا تخصم أي نسبة مئوية من مدفوعات طلابك</p>
                  <p className="text-[11px] text-gray-500 leading-relaxed">
                    تحصل على 100% من مبالغ الاشتراكات مباشرة لحساباتك (فوري، كاش، إنستاباي) دون أي استقطاع، مقابل رسوم ترخيص سيرفر ثابتة ({calcPlatformFee} ج.م فقط شهرياً).
                  </p>
                </div>
              </div>
            </div>

            {/* Presets & Financial Breakdown */}
            <div className="space-y-6">
              
              {/* Presets Card */}
              <div className="bg-[#0A0A0A] border border-gray-800 rounded-3xl p-6 space-y-4">
                <div className="flex items-center gap-2 text-white font-bold text-sm">
                  <Sparkles size={16} className="text-amber-400" />
                  <h4>نماذج محاكاة جاهزة وسريعة</h4>
                </div>

                <div className="space-y-2.5">
                  <button
                    onClick={() => {
                      setCalcStudentsCount(80);
                      setCalcSheetPrice(120);
                      setCalcSheetsPerMonth(4);
                      showToast('تم تطبيق نموذج: مجموعات السنتر المتوسطة', 'info');
                    }}
                    className="w-full p-3 bg-[#121212] hover:bg-gray-800/60 border border-gray-800 hover:border-gray-700 rounded-xl text-right transition-all cursor-pointer group"
                  >
                    <div className="flex justify-between items-center text-xs font-bold text-white group-hover:text-blue-400">
                      <span>🏫 مجموعات سنتر متوسطة</span>
                      <span className="font-mono text-emerald-400">9,450 ج.م/ش</span>
                    </div>
                    <p className="text-[10px] text-gray-500 mt-0.5">80 طالب • 120 ج.م للاشتراك • 4 شيتات</p>
                  </button>

                  <button
                    onClick={() => {
                      setCalcStudentsCount(250);
                      setCalcSheetPrice(180);
                      setCalcSheetsPerMonth(4);
                      showToast('تم تطبيق نموذج: معلم أونلاين نشط', 'info');
                    }}
                    className="w-full p-3 bg-[#121212] hover:bg-gray-800/60 border border-gray-800 hover:border-gray-700 rounded-xl text-right transition-all cursor-pointer group"
                  >
                    <div className="flex justify-between items-center text-xs font-bold text-white group-hover:text-emerald-400">
                      <span>🚀 معلم أونلاين نشط</span>
                      <span className="font-mono text-emerald-400">44,850 ج.م/ش</span>
                    </div>
                    <p className="text-[10px] text-gray-500 mt-0.5">250 طالب • 180 ج.م للاشتراك • 4 شيتات</p>
                  </button>

                  <button
                    onClick={() => {
                      setCalcStudentsCount(650);
                      setCalcSheetPrice(250);
                      setCalcSheetsPerMonth(6);
                      showToast('تم تطبيق نموذج: معلم الثانوية العامة والنخبة', 'info');
                    }}
                    className="w-full p-3 bg-[#121212] hover:bg-gray-800/60 border border-gray-800 hover:border-gray-700 rounded-xl text-right transition-all cursor-pointer group"
                  >
                    <div className="flex justify-between items-center text-xs font-bold text-white group-hover:text-purple-400">
                      <span>👑 معلم النخبة والثانوية العامة</span>
                      <span className="font-mono text-emerald-400">162,350 ج.م/ش</span>
                    </div>
                    <p className="text-[10px] text-gray-500 mt-0.5">650 طالب • 250 ج.م للاشتراك • 6 شيتات</p>
                  </button>
                </div>
              </div>

              {/* Financial Balance Summary Card */}
              <div className="bg-[#0A0A0A] border border-gray-800 rounded-3xl p-6 space-y-4">
                <h4 className="font-bold text-sm text-white flex items-center gap-2">
                  <BarChart3 size={16} className="text-blue-400" /> ملخص ميزانية الغرفة
                </h4>

                <div className="space-y-3 text-xs divide-y divide-gray-800/80">
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-gray-400">إجمالي مدفوعات الطلاب:</span>
                    <span className="font-mono font-bold text-white">{calcGrossMonthly.toLocaleString()} EGP</span>
                  </div>

                  <div className="flex justify-between items-center pt-2">
                    <span className="text-gray-400">رسوم السيرفر والمنصة:</span>
                    <span className="font-mono text-rose-400">-{calcPlatformFee} EGP</span>
                  </div>

                  <div className="flex justify-between items-center pt-2">
                    <span className="text-gray-400">وفر تكاليف الورق والطباعة:</span>
                    <span className="font-mono text-emerald-400">+{calcPaperlessSavings.toLocaleString()} EGP</span>
                  </div>

                  <div className="flex justify-between items-center pt-3 font-bold text-sm text-emerald-400">
                    <span>صافي العائد الشهري:</span>
                    <span className="font-mono text-base">{calcNetMonthly.toLocaleString()} EGP</span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => setActiveDashboardTab('overview')}
                    className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-blue-600/20"
                  >
                    <Layers size={14} /> العودة إلى سجل الطلاب والمذكرات
                  </button>
                </div>
              </div>

            </div>

          </div>

        </div>
      )}

      {/* 5. Main Grid: Student Payments Table + Study Sheets Showcase (Active Tab: overview) */}
      {activeDashboardTab === 'overview' && (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Payment & Student Table */}
        <div className="lg:col-span-2 bg-[#0A0A0A] border border-gray-800 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between">
          <div>
            <div className="p-5 border-b border-gray-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div>
                <h2 className="font-bold text-base text-white">سجل مدفوعات الطلاب المشتركين</h2>
                <p className="text-xs text-gray-500">تحديث فوري لعمليات الدفع عبر فوري وفودافون كاش والفيزا</p>
              </div>
              <div className="relative w-full sm:w-64">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="بحث عن طالب أو حالة..." 
                  className="w-full bg-[#121212] border border-gray-800 rounded-xl pr-9 pl-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500/60"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-right text-xs">
                <thead className="bg-[#111111] text-gray-400 font-bold uppercase border-b border-gray-800">
                  <tr>
                    <th className="px-5 py-3.5">اسم الطالب</th>
                    <th className="px-5 py-3.5">الحالة</th>
                    <th className="px-5 py-3.5">المبلغ</th>
                    <th className="px-5 py-3.5">وسيلة الدفع</th>
                    <th className="px-5 py-3.5">التاريخ</th>
                    <th className="px-5 py-3.5">إجراء</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800/80">
                  {filteredFees.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                        لا توجد سجلات مطابقة للبحث
                      </td>
                    </tr>
                  ) : (
                    filteredFees.map((student) => (
                      <tr key={student.id} className="hover:bg-gray-800/20 transition-colors">
                        <td className="px-5 py-4 font-bold text-white">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full bg-gray-800 flex items-center justify-center text-xs font-bold text-blue-400">
                              {student.studentName[0]}
                            </div>
                            <span>{student.studentName}</span>
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          {student.status === 'Paid' ? (
                            <span className="inline-flex items-center gap-1.5 text-emerald-400 text-[11px] font-bold bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                              <CheckCircle size={13} /> تم الدفع
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 text-amber-400 text-[11px] font-bold bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
                              <Clock size={13} /> معلق
                            </span>
                          )}
                        </td>
                        <td className="px-5 py-4 font-mono font-bold text-white">{student.amount.toLocaleString()} EGP</td>
                        <td className="px-5 py-4 text-gray-400">
                          {student.paymentMethod ? (
                            <span className="bg-gray-900 px-2 py-0.5 rounded text-[11px] border border-gray-800 text-gray-300">
                              {student.paymentMethod}
                            </span>
                          ) : (
                            <span className="text-gray-600">---</span>
                          )}
                        </td>
                        <td className="px-5 py-4 text-gray-500 font-mono">{student.paymentDate}</td>
                        <td className="px-5 py-4">
                          {student.status === 'Pending' ? (
                            <button
                              onClick={() => openPaymentModal({
                                type: 'student_fee',
                                itemTitle: `سداد رسوم ${student.studentName}`,
                                amount: student.amount,
                                targetId: student.id,
                              })}
                              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg text-xs font-bold transition-all shadow-sm cursor-pointer"
                            >
                              سداد الآن
                            </button>
                          ) : (
                            <span className="text-[10px] text-emerald-500 font-mono" title={student.receiptToken}>
                              ✓ مؤكد مشفر
                            </span>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="p-4 border-t border-gray-800 bg-[#0E0E0E] flex flex-wrap items-center justify-between text-xs text-gray-400 gap-2">
            <span>عدد الطلاب المسجلين بالغرفة: <b className="text-white">{teacherFees.length} طالب</b></span>
            <button 
              onClick={handleExportStudentsReport}
              className="text-blue-400 hover:underline font-bold cursor-pointer flex items-center gap-1"
            >
              <Download size={14} /> تنزيل التقرير
            </button>
          </div>
        </div>

        {/* Study Sheets Repository Section */}
        <div className="bg-[#0A0A0A] border border-gray-800 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="font-bold text-base text-white">مذكرات وشيتات الغرفة</h2>
                <p className="text-xs text-gray-500">حماية BOLA وعلامة مائية مائلة</p>
              </div>
              <button 
                onClick={() => setIsUploadModalOpen(true)}
                className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs transition-colors cursor-pointer"
                title="إضافة شيت جديد"
              >
                <Plus size={16} />
              </button>
            </div>

            <div className="space-y-3.5 max-h-[460px] overflow-y-auto">
              {teacherSheets.length === 0 ? (
                <div className="text-center py-10 text-gray-500 text-xs">
                  <FileText className="mx-auto mb-2 opacity-40" size={32} />
                  <p>لم يتم رفع شيتات أو مذكرات حتى الآن</p>
                </div>
              ) : (
                teacherSheets.map((file) => (
                  <div key={file.id} className="p-3.5 bg-[#121212] border border-gray-800/80 rounded-xl flex items-center justify-between hover:border-gray-700 transition-all">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-blue-500/10 text-blue-500 rounded-lg shrink-0">
                        <FileText size={18} />
                      </div>
                      <div>
                        <h4 className="font-bold text-xs text-white leading-snug">{file.title}</h4>
                        <div className="flex items-center gap-2 text-[10px] text-gray-400 mt-1">
                          <span>{file.fileSize}</span>
                          <span>•</span>
                          <span className="text-gray-500">{file.uploadedAt}</span>
                          {file.isPaidOnly && (
                            <span className="text-purple-400 font-bold bg-purple-500/10 px-1.5 py-0.5 rounded border border-purple-500/20">
                              مدفوع
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => downloadSheetSecurely(file.id, file.title)}
                        className="p-1.5 text-gray-400 hover:text-emerald-400 hover:bg-emerald-500/10 rounded-lg transition-colors cursor-pointer"
                        title="تحميل مشفر وموثق"
                      >
                        <Download size={15} />
                      </button>
                      
                      <button
                        onClick={() => deleteStudySheet(file.id)}
                        className="p-1.5 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
                        title="حذف الملف"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-gray-800/80 text-[10px] text-gray-500 flex items-center justify-between">
            <span className="flex items-center gap-1">
              <ShieldCheck size={13} className="text-emerald-400" />
              <span>تشفير SHA-256 ضد التعديل والتسريب</span>
            </span>
            <span className="font-mono text-purple-400">OWASP BOLA Guard</span>
          </div>
        </div>

      </div>
      )}

      {/* 6. Upload Modal Dialog */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#0A0A0A] border border-gray-800 rounded-3xl w-full max-w-lg shadow-2xl p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-gray-800 pb-4">
              <h3 className="font-bold text-lg text-white flex items-center gap-2">
                <Upload className="text-blue-500" size={20} /> رفع شيت / مذكرة جديدة للغرفة
              </h3>
              <button 
                onClick={() => setIsUploadModalOpen(false)}
                className="p-2 text-gray-400 hover:text-white rounded-lg cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveUpload} className="space-y-4">
              <div>
                <label className="text-xs text-gray-400 font-bold block mb-1.5">عنوان الملف / الدرس</label>
                <input 
                  type="text"
                  placeholder="مثال: شيت التفاضل والتكامل - الدرس الأول"
                  value={newSheetTitle}
                  onChange={(e) => setNewSheetTitle(e.target.value)}
                  className="w-full bg-[#141414] border border-gray-800 rounded-xl px-4 py-2.5 text-sm text-white focus:border-blue-500 outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-gray-400 font-bold block mb-1.5">المادة</label>
                  <input 
                    type="text"
                    value={newSheetSubject}
                    onChange={(e) => setNewSheetSubject(e.target.value)}
                    className="w-full bg-[#141414] border border-gray-800 rounded-xl px-4 py-2.5 text-sm text-white focus:border-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-400 font-bold block mb-1.5">الصف الدراسي</label>
                  <input 
                    type="text"
                    value={newSheetGrade}
                    onChange={(e) => setNewSheetGrade(e.target.value)}
                    className="w-full bg-[#141414] border border-gray-800 rounded-xl px-4 py-2.5 text-sm text-white focus:border-blue-500 outline-none"
                  />
                </div>
              </div>

              {/* File Selector */}
              <div>
                <label className="text-xs text-gray-400 font-bold block mb-1.5">اختر الملف من جهازك</label>
                <div className="relative border border-dashed border-gray-700 bg-[#121212] rounded-xl p-4 text-center">
                  <input 
                    type="file"
                    accept=".pdf,.docx,.doc,.png,.zip"
                    onChange={handleSimulatedFileUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  {selectedFileName ? (
                    <div className="flex items-center justify-center gap-2 text-emerald-400 text-xs font-bold">
                      <FileCheck size={16} />
                      <span>{selectedFileName} ({selectedFileSize})</span>
                    </div>
                  ) : (
                    <div className="text-xs text-gray-400">
                      <span>انقر لاختيار ملف (PDF أو DOCX)</span>
                      <p className="text-[10px] text-gray-600 mt-1">الحد الأقصى 10 ميجابايت مع فحص أمني تلقائي</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Access Policy Toggle */}
              <div className="bg-[#121212] border border-gray-800 p-3.5 rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-white block">حصرية الملف للطلاب المسددين فقط</span>
                  <span className="text-[11px] text-gray-500">حظر التحميل لغير المسددين وتطبيق سياسة BOLA</span>
                </div>
                <input 
                  type="checkbox"
                  checked={isPaidOnly}
                  onChange={(e) => setIsPaidOnly(e.target.checked)}
                  className="w-4 h-4 accent-blue-500 cursor-pointer"
                />
              </div>

              <button
                type="submit"
                disabled={isScanningFile}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-900 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                {isScanningFile ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>جاري الفحص الأمني وتوليد SHA-256...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck size={18} />
                    <span>فحص ونشر الشيت في الغرفة</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
