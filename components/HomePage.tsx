import React, { useState, useMemo } from 'react';
import assistantLogo from '../assets/images/assistant_avatar_logo_1787000507838.jpg';
import { 
  ShieldCheck, 
  BookOpen, 
  GraduationCap, 
  Users, 
  Zap, 
  ChevronLeft, 
  ChevronRight,
  FileText, 
  Calculator,
  Search,
  CheckCircle2,
  Receipt,
  QrCode,
  Smartphone,
  CreditCard,
  Sparkles,
  Lock,
  Download,
  ArrowUpRight,
  Eye,
  FileCheck,
  Award,
  Wallet,
  Clock,
  ExternalLink,
  Filter
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const HomePage: React.FC = () => {
  const { 
    setActivePage, 
    setSelectedTeacherId, 
    switchRole, 
    users, 
    studySheets, 
    openPaymentModal,
    t,
    dir,
    language
  } = useApp();

  // Search & Filter State
  const [searchSubject, setSearchSubject] = useState<string>('');
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState<string>('all');

  // Active Interactive Feature Tab
  const [activeFeatureTab, setActiveFeatureTab] = useState<'payments' | 'management' | 'automation'>('payments');

  const teachers = useMemo(() => users.filter(u => u.role === 'teacher'), [users]);
  const studentCount = 3840;
  const sheetCount = studySheets.length > 0 ? studySheets.length + 42 : 54;

  const subjects = [
    { id: 'all', name: language === 'ar' ? 'كافة المواد' : 'All Subjects', count: teachers.length },
    { id: 'physics', name: language === 'ar' ? 'الفيزياء' : 'Physics', count: 12 },
    { id: 'chemistry', name: language === 'ar' ? 'الكيمياء' : 'Chemistry', count: 9 },
    { id: 'arabic', name: language === 'ar' ? 'اللغة العربية' : 'Arabic', count: 14 },
    { id: 'math', name: language === 'ar' ? 'الرياضيات' : 'Mathematics', count: 16 },
    { id: 'biology', name: language === 'ar' ? 'الأحياء' : 'Biology', count: 8 },
    { id: 'english', name: language === 'ar' ? 'اللغة الإنجليزية' : 'English', count: 11 },
    { id: 'french', name: language === 'ar' ? 'اللغة الفرنسية' : 'French', count: 7 },
  ];

  const filteredTeachers = useMemo(() => {
    return teachers.filter(t => {
      const matchSubject = selectedSubjectFilter === 'all' || 
        (t.subject && t.subject.toLowerCase().includes(selectedSubjectFilter.toLowerCase())) ||
        (selectedSubjectFilter === 'physics' && t.subject?.includes('فيزياء')) ||
        (selectedSubjectFilter === 'chemistry' && t.subject?.includes('كيمياء')) ||
        (selectedSubjectFilter === 'arabic' && t.subject?.includes('عربي')) ||
        (selectedSubjectFilter === 'math' && t.subject?.includes('رياض')) ||
        (selectedSubjectFilter === 'biology' && t.subject?.includes('أحياء')) ||
        (selectedSubjectFilter === 'english' && (t.subject?.includes('إنجليزي') || t.subject?.includes('English')));

      const matchSearch = searchSubject === '' || 
        t.name.toLowerCase().includes(searchSubject.toLowerCase()) ||
        (t.subject && t.subject.toLowerCase().includes(searchSubject.toLowerCase()));

      return matchSubject && matchSearch;
    });
  }, [teachers, selectedSubjectFilter, searchSubject]);

  const ArrowIcon = dir === 'rtl' ? ChevronLeft : ChevronRight;

  return (
    <div className="min-h-screen bg-[#070A12] text-slate-100 font-sans selection:bg-teal-500/30 selection:text-teal-200 pb-20 relative overflow-hidden" dir={dir}>
      
      {/* Background Calm Ambient Atmosphere */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        {/* Soft Radial Ambient Lights in soothing slate/teal/indigo tones */}
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-b from-sky-500/10 via-teal-500/5 to-transparent blur-[140px] rounded-full animate-pulse-subtle" />
        <div className="absolute top-[35%] -left-32 w-[450px] h-[350px] bg-indigo-500/5 blur-[120px] rounded-full" />
        <div className="absolute top-[65%] -right-32 w-[500px] h-[400px] bg-teal-500/5 blur-[130px] rounded-full" />
        {/* Subtle grid pattern overlay */}
        <div 
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px)`,
            backgroundSize: '32px 32px'
          }}
        />
      </div>

      {/* 1. Serene Hero Section */}
      <section className="relative pt-10 sm:pt-14 pb-12 border-b border-slate-800/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center text-center space-y-7">
            
            {/* Assistant Animated Character Hero Badge with Floating Halo */}
            <div className="relative group cursor-pointer" onClick={() => setActivePage('directory')}>
              {/* Soothing Halo Glow */}
              <div className="absolute -inset-2 bg-gradient-to-r from-teal-500/40 via-sky-500/30 to-indigo-500/40 rounded-3xl blur-xl opacity-60 group-hover:opacity-100 transition duration-700"></div>
              
              <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-3xl overflow-hidden border border-slate-700/80 shadow-2xl bg-slate-900/90 animate-float">
                <img 
                  src={assistantLogo} 
                  alt="Personal Assistant" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                <div className="absolute bottom-2 inset-x-0 flex justify-center">
                  <span className="text-[10px] font-bold bg-slate-900/80 text-teal-300 px-2 py-0.5 rounded-full border border-teal-500/20 backdrop-blur-sm">
                    EduShield Pro
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Action Calm Glass Tiles */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 w-full max-w-3xl pt-2">
              <button
                onClick={() => setActivePage('directory')}
                className="p-4 bg-slate-900/70 hover:bg-slate-800/80 border border-slate-800 hover:border-teal-500/40 rounded-2xl transition-all duration-300 flex flex-col items-center justify-center gap-2.5 group shadow-lg cursor-pointer backdrop-blur-sm"
              >
                <div className="w-11 h-11 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 group-hover:bg-teal-500 group-hover:text-slate-950 transition-all">
                  <BookOpen size={20} />
                </div>
                <div className="text-center">
                  <span className="text-xs sm:text-sm font-bold text-white group-hover:text-teal-300 transition-colors block">
                    {t.directory}
                  </span>
                  <span className="text-[10px] text-slate-400 mt-0.5 block">
                    {language === 'ar' ? 'استعراض غرف المعلمين والمذكرات' : 'Explore teachers & materials'}
                  </span>
                </div>
              </button>

              <button
                onClick={() => setActivePage('pricing')}
                className="p-4 bg-slate-900/70 hover:bg-slate-800/80 border border-slate-800 hover:border-sky-500/40 rounded-2xl transition-all duration-300 flex flex-col items-center justify-center gap-2.5 group shadow-lg cursor-pointer backdrop-blur-sm"
              >
                <div className="w-11 h-11 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 group-hover:bg-sky-500 group-hover:text-slate-950 transition-all">
                  <Zap size={20} />
                </div>
                <div className="text-center">
                  <span className="text-xs sm:text-sm font-bold text-white group-hover:text-sky-300 transition-colors block">
                    {t.pricing}
                  </span>
                  <span className="text-[10px] text-slate-400 mt-0.5 block">
                    {language === 'ar' ? 'باقات ترخيص المعلمين بـ 150 ج.م' : 'Teacher plans starting 150 EGP'}
                  </span>
                </div>
              </button>

              <button
                onClick={() => switchRole('teacher')}
                className="p-4 bg-slate-900/70 hover:bg-slate-800/80 border border-slate-800 hover:border-indigo-500/40 rounded-2xl transition-all duration-300 flex flex-col items-center justify-center gap-2.5 group shadow-lg cursor-pointer backdrop-blur-sm"
              >
                <div className="w-11 h-11 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500 group-hover:text-slate-950 transition-all">
                  <GraduationCap size={20} />
                </div>
                <div className="text-center">
                  <span className="text-xs sm:text-sm font-bold text-white group-hover:text-indigo-300 transition-colors block">
                    {t.teacherRoom}
                  </span>
                  <span className="text-[10px] text-slate-400 mt-0.5 block">
                    {language === 'ar' ? 'إدارة الشيتات وطلاب الغرفة' : 'Manage sheets & student roster'}
                  </span>
                </div>
              </button>
            </div>

            {/* Quick Role Switcher Selector */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
              <span className="text-[11px] text-slate-500 font-medium px-1">
                {language === 'ar' ? 'التبديل السريع للمنظور:' : 'Quick view toggle:'}
              </span>
              <button
                onClick={() => switchRole('teacher')}
                className="bg-slate-900/90 hover:bg-teal-950/40 text-teal-300 border border-slate-800 hover:border-teal-500/40 px-3 py-1 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <GraduationCap size={13} /> {t.teacherRole}
              </button>
              <button
                onClick={() => switchRole('student')}
                className="bg-slate-900/90 hover:bg-sky-950/40 text-sky-300 border border-slate-800 hover:border-sky-500/40 px-3 py-1 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Users size={13} /> {t.studentRole}
              </button>
              <button
                onClick={() => switchRole('admin')}
                className="bg-slate-900/90 hover:bg-indigo-950/40 text-indigo-300 border border-slate-800 hover:border-indigo-500/40 px-3 py-1 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <ShieldCheck size={13} /> {t.adminRole}
              </button>
            </div>

            {/* 2. Teachers Promo Marquee Carousel */}
            <div className="pt-5 w-full max-w-5xl mx-auto">
              <div className="flex items-center justify-between px-2 mb-2 text-xs">
                <div className="flex items-center gap-2 text-slate-400 font-medium">
                  <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping" />
                  <span className="text-slate-200 font-semibold">{t.statTeachers}</span>
                  <span className="text-[10px] bg-teal-500/10 text-teal-300 px-2 py-0.5 rounded-full border border-teal-500/20">
                    {language === 'ar' ? 'غرف تعليمية نشطة' : 'Active Classrooms'}
                  </span>
                </div>
                <button
                  onClick={() => setActivePage('directory')}
                  className="text-teal-400 hover:text-teal-300 font-bold text-xs flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <span>{t.all} ({teachers.length})</span>
                  <ArrowIcon size={13} />
                </button>
              </div>

              {/* Infinite Scrolling Rail with Serene Slate Backdrop */}
              <div className="relative overflow-hidden rounded-2xl bg-slate-900/60 border border-slate-800/80 shadow-xl p-3 backdrop-blur-md">
                {/* Gradient Faders */}
                <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-[#070A12] to-transparent z-10" />
                <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-[#070A12] to-transparent z-10" />

                <div className="animate-marquee-infinite gap-3.5 items-center">
                  {[...teachers, ...teachers].map((teacher, index) => {
                    const teacherSheets = studySheets.filter(s => s.teacherId === teacher.id);
                    return (
                      <div
                        key={`${teacher.id}-${index}`}
                        onClick={() => {
                          setSelectedTeacherId(teacher.id);
                          setActivePage('directory');
                        }}
                        className="group flex-shrink-0 cursor-pointer bg-slate-900/90 hover:bg-slate-800/90 border border-slate-800 hover:border-teal-500/40 rounded-xl p-2.5 px-3.5 transition-all duration-300 hover:scale-[1.02] flex items-center gap-3 text-right shadow-sm"
                      >
                        {/* Teacher Avatar */}
                        <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-600/80 to-slate-800 flex items-center justify-center text-white font-bold text-sm shadow-md shrink-0 border border-teal-400/30">
                          {teacher.name.replace('أ. ', '').charAt(0)}
                          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-teal-400 border-2 border-slate-950 rounded-full" />
                        </div>

                        {/* Teacher Details */}
                        <div className="min-w-[120px]">
                          <div className="flex items-center gap-1.5">
                            <h4 className="text-xs font-bold text-white group-hover:text-teal-300 transition-colors whitespace-nowrap">
                              {teacher.name}
                            </h4>
                          </div>
                          <p className="text-[11px] text-teal-400/90 font-medium truncate max-w-[130px]">
                            {teacher.subject}
                          </p>
                          <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-0.5 font-mono">
                            <span className="text-slate-300">{teacherSheets.length} {t.statSheets}</span>
                          </div>
                        </div>

                        <div className="border-r border-slate-800 pr-2 hidden sm:flex items-center text-slate-500 group-hover:text-teal-400 transition-colors">
                          <ArrowIcon size={14} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Key Numbers & Platform Metrics (Calm Minimal Stat Cards) */}
      <section className="py-8 bg-slate-900/40 border-b border-slate-800/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            
            <div 
              onClick={() => setActivePage('directory')}
              className="p-4 sm:p-5 bg-slate-900/80 rounded-2xl border border-slate-800/80 hover:border-teal-500/40 hover:bg-slate-800/60 transition-all cursor-pointer group shadow-sm"
            >
              <div className="flex items-center justify-center gap-1.5 mb-1">
                <GraduationCap size={16} className="text-teal-400" />
                <p className="text-2xl sm:text-3xl font-black text-white font-mono group-hover:text-teal-300 transition-colors">
                  {teachers.length}+
                </p>
              </div>
              <p className="text-xs text-slate-400 font-medium">{t.statTeachers}</p>
              <p className="text-[10px] text-slate-500 mt-0.5">{language === 'ar' ? 'غرفة مجهزة' : 'Active Rooms'}</p>
            </div>

            <div 
              onClick={() => switchRole('student')}
              className="p-4 sm:p-5 bg-slate-900/80 rounded-2xl border border-slate-800/80 hover:border-sky-500/40 hover:bg-slate-800/60 transition-all cursor-pointer group shadow-sm"
            >
              <div className="flex items-center justify-center gap-1.5 mb-1">
                <Users size={16} className="text-sky-400" />
                <p className="text-2xl sm:text-3xl font-black text-sky-400 font-mono">
                  {studentCount.toLocaleString()}+
                </p>
              </div>
              <p className="text-xs text-slate-400 font-medium">{t.statStudents}</p>
              <p className="text-[10px] text-slate-500 mt-0.5">{language === 'ar' ? 'طالب مسجل' : 'Enrolled Students'}</p>
            </div>

            <div 
              onClick={() => setActivePage('directory')}
              className="p-4 sm:p-5 bg-slate-900/80 rounded-2xl border border-slate-800/80 hover:border-indigo-500/40 hover:bg-slate-800/60 transition-all cursor-pointer group shadow-sm"
            >
              <div className="flex items-center justify-center gap-1.5 mb-1">
                <FileText size={16} className="text-indigo-400" />
                <p className="text-2xl sm:text-3xl font-black text-indigo-400 font-mono">
                  {sheetCount}+
                </p>
              </div>
              <p className="text-xs text-slate-400 font-medium">{t.statSheets}</p>
              <p className="text-[10px] text-slate-500 mt-0.5">{language === 'ar' ? 'مذكرة وشيت محمي' : 'Protected Materials'}</p>
            </div>

            <div 
              className="p-4 sm:p-5 bg-slate-900/80 rounded-2xl border border-slate-800/80 hover:border-teal-500/40 hover:bg-slate-800/60 transition-all group shadow-sm"
            >
              <div className="flex items-center justify-center gap-1.5 mb-1">
                <ShieldCheck size={16} className="text-teal-400" />
                <p className="text-2xl sm:text-3xl font-black text-teal-400 font-mono">
                  100%
                </p>
              </div>
              <p className="text-xs text-slate-400 font-medium">{t.statSecurity}</p>
              <p className="text-[10px] text-slate-500 mt-0.5">{language === 'ar' ? 'حماية BOLA وSHA-256' : 'BOLA & SHA-256 Secure'}</p>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Subject Directory Selector Chips & Quick Teacher Directory Filter */}
      <section className="py-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-slate-800/60">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <BookOpen size={20} className="text-teal-400" />
              {language === 'ar' ? 'استعراض المواد وغرف المعلمين المتاحة' : 'Subject Categories & Educator Rooms'}
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              {language === 'ar' ? 'اختر المادة لتصفح المدرسين المعتمدين والمذكرات الدراسية المرفوعة' : 'Select a subject to explore certified teachers and study files'}
            </p>
          </div>

          {/* Quick Search Input */}
          <div className="relative w-full md:w-72">
            <input 
              type="text"
              value={searchSubject}
              onChange={(e) => setSearchSubject(e.target.value)}
              placeholder={language === 'ar' ? 'بحث عن مدرس أو مادة...' : 'Search teacher or subject...'}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500/60"
            />
            <Search size={14} className={`absolute ${dir === 'rtl' ? 'left-3' : 'right-3'} top-1/2 -translate-y-1/2 text-slate-500`} />
          </div>
        </div>

        {/* Subject Chips */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          {subjects.map((sub) => (
            <button
              key={sub.id}
              onClick={() => setSelectedSubjectFilter(sub.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer border ${
                selectedSubjectFilter === sub.id
                  ? 'bg-teal-500/20 text-teal-300 border-teal-500/40 shadow-sm'
                  : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white'
              }`}
            >
              <span>{sub.name}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-md font-mono ${
                selectedSubjectFilter === sub.id ? 'bg-teal-500/30 text-teal-200' : 'bg-slate-800 text-slate-400'
              }`}>
                {sub.count}
              </span>
            </button>
          ))}
        </div>

        {/* Filtered Teachers Grid (Compact & Sleek) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {filteredTeachers.slice(0, 6).map((teacher) => {
            const teacherSheets = studySheets.filter(s => s.teacherId === teacher.id);
            return (
              <div 
                key={teacher.id}
                onClick={() => {
                  setSelectedTeacherId(teacher.id);
                  setActivePage('directory');
                }}
                className="p-4 bg-slate-900/70 hover:bg-slate-800/80 border border-slate-800/80 hover:border-teal-500/40 rounded-2xl transition-all cursor-pointer group shadow-sm flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-slate-800 to-slate-700 border border-slate-700 flex items-center justify-center text-teal-300 font-bold text-sm shrink-0 group-hover:border-teal-500/40 transition-colors">
                    {teacher.name.replace('أ. ', '').charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-white group-hover:text-teal-300 transition-colors">
                      {teacher.name}
                    </h3>
                    <p className="text-[11px] text-teal-400/90 font-medium mt-0.5">{teacher.subject}</p>
                    <p className="text-[10px] text-slate-400 mt-1 font-mono">
                      {teacherSheets.length} {language === 'ar' ? 'مذكرات منشورة' : 'sheets published'}
                    </p>
                  </div>
                </div>

                <div className="p-2 rounded-xl bg-slate-950 text-slate-400 group-hover:text-teal-400 group-hover:bg-teal-950/40 transition-all">
                  <ExternalLink size={14} />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Interactive Core Platform Features (Tabbed Calm Showcase) */}
      <section className="py-12 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-slate-800/60">
        <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
          <h2 className="text-xl sm:text-2xl font-black text-white">
            {language === 'ar' ? 'ركائز المنظومة ومميزات الحماية الذكية' : 'Core Capabilities & Smart Protections'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            {language === 'ar' 
              ? 'حل متكامل صُمم خصيصاً ليمنح المدرس والطالب تجربة سلسة، آمنة ومريحة للأعصاب' 
              : 'End-to-end framework built for educators and students with peace of mind.'}
          </p>
        </div>

        {/* Feature Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8 bg-slate-900/80 p-1.5 rounded-2xl border border-slate-800 w-fit mx-auto">
          {[
            { id: 'payments', label: language === 'ar' ? 'بوابات الدفع المصرية' : 'Egyptian Payment Gateways', icon: Wallet },
            { id: 'management', label: language === 'ar' ? 'إدارة الاشتراكات والطلاب' : 'Roster & Fee Ledger', icon: Users },
            { id: 'automation', label: language === 'ar' ? 'الأتمتة والإشعارات الفورية' : 'Instant Alerts & Flow', icon: Zap },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFeatureTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeFeatureTab === tab.id
                  ? 'bg-teal-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <tab.icon size={14} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Feature Detail Showcase Card */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-xl">
          {activeFeatureTab === 'payments' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-bold">
                  <QrCode size={14} /> {language === 'ar' ? 'تغطية شاملة للبوابات المصرية' : 'All Egyptian Payment Channels'}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  {language === 'ar' ? 'سداد فوري ومباشر عبر فوري، محافظ الكاش، وإنستاباي' : 'Instant Payment Verification Across Egyptian Gateways'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {language === 'ar'
                    ? 'يستطيع الطالب السداد في ثوانٍ عبر كود فوري مخصص أو التحويل لمحفظة فودافون كاش أو إنستاباي، ليتم تأكيد العملية وتفعيل تحميل المذكرة آلياً.'
                    : 'Students pay seamlessly through merchant Fawry codes, mobile wallets (Vodafone/Orange/Etisalat/WE), or InstaPay IPN with immediate ledger confirmation.'}
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="px-3 py-1 bg-slate-950 border border-slate-800 rounded-lg text-xs text-sky-300 font-medium">Fawry Pay</span>
                  <span className="px-3 py-1 bg-slate-950 border border-slate-800 rounded-lg text-xs text-rose-300 font-medium">Vodafone Cash</span>
                  <span className="px-3 py-1 bg-slate-950 border border-slate-800 rounded-lg text-xs text-purple-300 font-medium">InstaPay IPN</span>
                  <span className="px-3 py-1 bg-slate-950 border border-slate-800 rounded-lg text-xs text-teal-300 font-medium">Meeza & Visa</span>
                </div>
              </div>

              {/* Visual Gateway Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col items-center justify-center text-center gap-2">
                  <QrCode className="text-sky-400" size={24} />
                  <span className="text-xs font-bold text-white">كود فوري (Fawry)</span>
                  <span className="text-[10px] text-slate-400 font-mono">Reference Code Engine</span>
                </div>
                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col items-center justify-center text-center gap-2">
                  <Smartphone className="text-rose-400" size={24} />
                  <span className="text-xs font-bold text-white">محافظ الكاش</span>
                  <span className="text-[10px] text-slate-400 font-mono">010 / 011 / 012 / 015</span>
                </div>
                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col items-center justify-center text-center gap-2">
                  <Zap className="text-purple-400" size={24} />
                  <span className="text-xs font-bold text-white">إنستاباي (InstaPay)</span>
                  <span className="text-[10px] text-slate-400 font-mono">Instant Bank Transfer</span>
                </div>
                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col items-center justify-center text-center gap-2">
                  <CreditCard className="text-teal-400" size={24} />
                  <span className="text-xs font-bold text-white">كروت الدفع وميزة</span>
                  <span className="text-[10px] text-slate-400 font-mono">3D Secure Gateway</span>
                </div>
              </div>
            </div>
          )}

          {activeFeatureTab === 'management' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-bold">
                  <Users size={14} /> {language === 'ar' ? 'إدارة السجلات والتحصيل' : 'Classroom & Fee Ledger'}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  {language === 'ar' ? 'متابعة دقيقة لحسابات كل طالب والمبالغ المحصلة' : 'Precise Financial Accounting for Each Educator'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {language === 'ar'
                    ? 'لوحة المعلم تمنحك كشف حساب فوري بكل طالب، عدد الشيتات المحملة، تاريخ السداد، وإمكانية تصدير التقارير إلى Excel بنقرة واحدة.'
                    : 'Educators get real-time tracking of each student, download logs, payment receipts, and one-click Excel/CSV export capabilities.'}
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => switchRole('teacher')}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer flex items-center gap-2"
                  >
                    <GraduationCap size={15} /> {language === 'ar' ? 'تجربة لوحة المعلم الآن' : 'Test Teacher Dashboard'}
                  </button>
                </div>
              </div>

              {/* Sample Roster Snippet */}
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2.5">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2 text-xs font-bold text-slate-300">
                  <span>{language === 'ar' ? 'سجل الطلاب الأخير' : 'Recent Student Ledger'}</span>
                  <span className="text-[10px] text-teal-400 font-mono">Live Sync</span>
                </div>
                {[
                  { name: 'أحمد محمود علي', sheet: 'شيت 4 - فيزياء كهربية', status: 'مسدد', amount: '150 ج.م' },
                  { name: 'مريم حسن عثمان', sheet: 'مذكرة المراجعة النهائية', status: 'مسدد', amount: '200 ج.م' },
                  { name: 'عمر طارق إبراهيم', sheet: 'شيت 3 - الكيمياء العضوية', status: 'مسدد', amount: '120 ج.م' },
                ].map((row, i) => (
                  <div key={i} className="p-2.5 bg-slate-900/80 rounded-xl border border-slate-800/80 flex items-center justify-between text-xs">
                    <div>
                      <p className="font-bold text-white">{row.name}</p>
                      <p className="text-[10px] text-slate-400">{row.sheet}</p>
                    </div>
                    <div className="text-left">
                      <span className="text-[10px] bg-teal-500/10 text-teal-300 border border-teal-500/20 px-2 py-0.5 rounded-full font-semibold">
                        {row.status}
                      </span>
                      <p className="text-[10px] font-mono text-slate-300 mt-0.5">{row.amount}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeFeatureTab === 'automation' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-teal-500/10 text-teal-400 border border-teal-500/20 text-xs font-bold">
                  <Zap size={14} /> {language === 'ar' ? 'أتمتة وإشعارات فورية' : 'Automated Notifications'}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  {language === 'ar' ? 'تنبيهات فورية لولي الأمر والمعلم فور إتمام السداد' : 'Real-time SMS & WhatsApp Transaction Confirmations'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {language === 'ar'
                    ? 'بمجرد تأكيد العملية عبر فوري أو المحافظ، يتم إصدار إشعار فوري برقم الإيصال وتفعيل صلاحية التحميل في حساب الطالب دون أي تدخل يدوي.'
                    : 'Automatic receipt dispatch and instant entitlement unlock the exact moment the gateway callback verifies the transaction.'}
                </p>
                <div className="flex items-center gap-2 text-xs text-teal-300 pt-2">
                  <CheckCircle2 size={16} />
                  <span>{language === 'ar' ? 'بدون انتظار أو مراجعة يدوية للإيصالات' : 'Zero manual wait time'}</span>
                </div>
              </div>

              {/* Sample Notification Card */}
              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
                <div className="flex items-center gap-3 p-3 bg-teal-950/30 border border-teal-500/20 rounded-xl">
                  <div className="p-2 bg-teal-500/20 text-teal-400 rounded-lg shrink-0">
                    <CheckCircle2 size={18} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-teal-200">تم تأكيد سداد الطالب بنجاح</p>
                    <p className="text-[10px] text-slate-400">إيصال رقم #EDU-88291 • تم إرسال رابط الشيت</p>
                  </div>
                </div>
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-[11px] text-slate-400">
                  تم إشعار المعلم برصيد التحصيل وتحديث إحصائيات الغرفة آلياً.
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action Serene Footer Banner */}
      <section className="mt-8 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-10 rounded-3xl bg-gradient-to-r from-teal-950/40 via-slate-900 to-indigo-950/40 border border-teal-500/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl backdrop-blur-md">
          <div className="space-y-2 text-center md:text-right">
            <h3 className="text-lg sm:text-2xl font-black text-white">
              {language === 'ar' ? 'جاهز لترقية غرفتك التعليمية وتأمين مذكراتك؟' : 'Ready to secure your educational room?'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
              {language === 'ar'
                ? 'انضم الآن لمئات المعلمين المعتمدين وابدأ في رفع المذكرات وتحصيل الرسوم بأمان ويسر تام.'
                : 'Join certified educators today and start distributing study sheets with peace of mind.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => setActivePage('pricing')}
              className="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-xl shadow-lg transition-all flex items-center gap-2 cursor-pointer"
            >
              <Zap size={15} /> {language === 'ar' ? 'بدء الاشتراك الآن' : 'Start Subscription'}
            </button>
            <button
              onClick={() => setActivePage('directory')}
              className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white text-xs font-bold rounded-xl transition-all flex items-center gap-2 cursor-pointer"
            >
              <BookOpen size={15} /> {language === 'ar' ? 'تصفح المدرسين' : 'Browse Teachers'}
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
