import React, { useState } from 'react';
import { 
  Search, 
  Star, 
  BookOpen, 
  ChevronLeft, 
  ShieldCheck, 
  Users, 
  Award,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const TeacherDirectory: React.FC = () => {
  const { 
    users, 
    setSelectedTeacherId, 
    setActivePage, 
    currentUser,
    studySheets,
    showToast,
    t,
    dir,
    language
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');

  const teachers = users.filter(u => u.role === 'teacher');

  const teacherDirectoryData = teachers.map((tItem, idx) => {
    const ratings = ['4.9', '4.8', '4.7', '4.95', '4.85'];
    const studentCount = ['1,240', '850', '920', '1,560', '710'];
    const sheetsCount = studySheets.filter(s => s.teacherId === tItem.id).length;

    return {
      ...tItem,
      rating: ratings[idx % ratings.length],
      students: studentCount[idx % studentCount.length],
      sheetsCount: sheetsCount > 0 ? sheetsCount : 3,
    };
  });

  const filteredTeachers = teacherDirectoryData.filter(tItem => 
    tItem.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (tItem.subject && tItem.subject.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleEnterRoom = (teacherId: string, teacherName: string) => {
    setSelectedTeacherId(teacherId);
    setActivePage('teacher_dashboard');
    showToast(language === 'ar' ? `جاري فتح غرفة: ${teacherName}` : `Opening room for ${teacherName}`, 'info');
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white p-4 sm:p-6 lg:p-10 font-sans" dir={dir}>
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between md:items-center gap-6 border-b border-gray-800 pb-8">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs px-2.5 py-0.5 rounded-full font-bold">
                {t.verifiedTeacher}
              </span>
              <span className="text-emerald-400 text-xs flex items-center gap-1 font-mono">
                <ShieldCheck size={14} /> Verified Educators
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black">{t.directoryTitle}</h1>
            <p className="text-gray-400 text-xs sm:text-sm mt-1">
              {t.directorySubtitle}
            </p>
          </div>

          <div className="relative w-full md:w-96">
            <Search className={`absolute ${dir === 'rtl' ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 text-gray-500`} size={18} />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchTeacherPlaceholder} 
              className={`w-full bg-[#0A0A0A] border border-gray-800 rounded-xl py-3 ${dir === 'rtl' ? 'pr-11 pl-4' : 'pl-11 pr-4'} text-xs sm:text-sm text-white outline-none focus:border-blue-500 transition-all`} 
            />
          </div>
        </header>

        {/* Teachers Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTeachers.map((teacher) => (
            <div 
              key={teacher.id} 
              className="bg-[#0A0A0A] border border-gray-800 hover:border-blue-500/50 p-6 rounded-[2rem] hover:scale-[1.02] transition-all group cursor-pointer shadow-xl flex flex-col justify-between"
              onClick={() => handleEnterRoom(teacher.id, teacher.name)}
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-16 h-16 bg-gradient-to-tr from-gray-800 to-gray-700 rounded-2xl flex items-center justify-center text-2xl font-bold group-hover:from-blue-600 group-hover:to-blue-500 transition-all text-white shadow-lg">
                    {teacher.name[3] || teacher.name[0]}
                  </div>
                  <span className="bg-emerald-500/10 text-emerald-400 text-[10px] font-bold px-2.5 py-1 rounded-full border border-emerald-500/20 flex items-center gap-1">
                    <ShieldCheck size={12} /> {language === 'ar' ? 'غرفة نشطة' : 'Active Room'}
                  </span>
                </div>

                <h3 className="text-xl font-bold mb-1 text-white group-hover:text-blue-400 transition-colors">
                  {teacher.name}
                </h3>
                <p className="text-blue-400 text-xs mb-4 font-bold">
                  {teacher.subject || (language === 'ar' ? 'مادة تعليمية متخصصة' : 'Specialized Subject')}
                </p>

                <div className="flex items-center gap-4 text-xs text-gray-400 mb-6 bg-[#121212] p-3 rounded-xl border border-gray-800/80">
                  <span className="flex items-center gap-1 font-bold text-amber-400">
                    <Star size={14} className="fill-amber-400 text-amber-400" /> {teacher.rating}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Users size={14} className="text-blue-400" /> {teacher.students} {language === 'ar' ? 'طالب' : 'Students'}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <BookOpen size={14} className="text-purple-400" /> {teacher.sheetsCount} {language === 'ar' ? 'شيت' : 'Sheets'}
                  </span>
                </div>
              </div>

              <button 
                className="w-full bg-[#141414] group-hover:bg-blue-600 text-gray-200 group-hover:text-white py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
              >
                {t.enterRoom} <ChevronLeft size={16} className={dir === 'ltr' ? 'rotate-180' : ''} />
              </button>
            </div>
          ))}
        </div>

        {/* Promotional Footer Banner */}
        <div className="bg-gradient-to-r from-blue-950/40 via-[#0A0A0A] to-purple-950/40 border border-gray-800 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className={`space-y-2 ${dir === 'rtl' ? 'text-center md:text-right' : 'text-center md:text-left'}`}>
            <h3 className={`text-xl font-bold text-white flex items-center gap-2 ${dir === 'rtl' ? 'justify-center md:justify-start' : 'justify-center md:justify-start'}`}>
              <Sparkles className="text-blue-400" size={20} /> {language === 'ar' ? 'هل أنت مدرس وترغب في فتح غرفتك التعليمية الخاصة؟' : 'Are you a teacher looking to launch your private room?'}
            </h3>
            <p className="text-xs text-gray-400">
              {language === 'ar' ? 'انضم لأكثر من 1,200 مدرس واستفد من نظام إدارة الشيتات، المصروفات، وبوابات الدفع المحمية.' : 'Join 1,200+ top educators with integrated fee settlements and encrypted sheets protection.'}
            </p>
          </div>
          <button
            onClick={() => setActivePage('pricing')}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-lg shadow-blue-600/30 transition-all cursor-pointer whitespace-nowrap"
          >
            {t.pricing}
          </button>
        </div>

      </div>
    </div>
  );
};
