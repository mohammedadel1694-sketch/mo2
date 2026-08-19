import React from 'react';
import assistantLogo from '../assets/images/assistant_avatar_logo_1787000507838.jpg';
import { 
  ShieldCheck, 
  User, 
  LogOut, 
  LogIn, 
  UserPlus, 
  Settings, 
  BookOpen, 
  LayoutDashboard, 
  Users, 
  CreditCard, 
  Zap, 
  AlertTriangle,
  Lock,
  ChevronDown,
  Home,
  Globe,
  Languages
} from 'lucide-react';
import { useApp, ActivePage } from '../context/AppContext';
import { UserRole } from '../types';

export const Navbar: React.FC = () => {
  const { 
    currentUser, 
    activePage, 
    setActivePage, 
    logout, 
    switchRole, 
    systemSettings,
    setIsSecurityModalOpen,
    language,
    toggleLanguage,
    t,
    dir
  } = useApp();

  return (
    <header className="sticky top-0 z-40 bg-[#0A0A0A]/95 backdrop-blur-md border-b border-gray-800">
      {/* Maintenance Mode Banner */}
      {systemSettings.maintenanceMode && (
        <div className="bg-amber-500/10 border-b border-amber-500/20 text-amber-400 px-4 py-2 text-xs font-bold text-center flex items-center justify-center gap-2">
          <AlertTriangle size={15} />
          <span>{t.maintenanceNotice}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Platform Name */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setActivePage('home')}
              className={`flex items-center gap-3 group cursor-pointer ${dir === 'rtl' ? 'text-right' : 'text-left'}`}
            >
              <div className="relative w-12 h-12 rounded-2xl overflow-hidden shadow-lg shadow-blue-600/30 border-2 border-blue-500/40 group-hover:border-blue-400 group-hover:scale-105 transition-all bg-slate-900 flex items-center justify-center shrink-0">
                <img 
                  src={assistantLogo} 
                  alt="Personal Assistant Logo" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center"
                />
                <span className={`absolute bottom-0 ${dir === 'rtl' ? 'right-0' : 'left-0'} w-3 h-3 bg-emerald-500 border-2 border-[#0B0F17] rounded-full`}></span>
              </div>
              <div>
                <span className="text-xl font-black tracking-tight text-white flex items-center gap-2">
                  Personal <span className="text-blue-400">Assistant</span>
                  <span className="text-blue-500 text-xs px-2 py-0.5 bg-blue-500/10 border border-blue-500/30 rounded-full font-mono">PRO</span>
                </span>
                <p className="text-[11px] text-gray-400 font-medium">{t.brandTagline}</p>
              </div>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-[#121212] p-1.5 rounded-2xl border border-gray-800 text-sm">
            <button
              onClick={() => setActivePage('home')}
              className={`px-3.5 py-2 rounded-xl font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                activePage === 'home' 
                  ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-600/20' 
                  : 'text-gray-400 hover:text-white hover:bg-gray-800/40'
              }`}
            >
              <Home size={16} /> {t.home}
            </button>

            <button
              onClick={() => setActivePage('directory')}
              className={`px-3.5 py-2 rounded-xl font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                activePage === 'directory' 
                  ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-600/20' 
                  : 'text-gray-400 hover:text-white hover:bg-gray-800/40'
              }`}
            >
              <BookOpen size={16} /> {t.directory}
            </button>

            <button
              onClick={() => setActivePage('pricing')}
              className={`px-3.5 py-2 rounded-xl font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                activePage === 'pricing' 
                  ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-600/20' 
                  : 'text-gray-400 hover:text-white hover:bg-gray-800/40'
              }`}
            >
              <Zap size={16} /> {t.pricing}
            </button>

            {/* Teacher Specific Tab */}
            {currentUser?.role === 'teacher' && (
              <button
                onClick={() => setActivePage('teacher_dashboard')}
                className={`px-3.5 py-2 rounded-xl font-medium transition-all flex items-center gap-1.5 ${
                  activePage === 'teacher_dashboard' 
                    ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-600/20' 
                    : 'text-gray-400 hover:text-white hover:bg-gray-800/40'
                }`}
              >
                <LayoutDashboard size={16} /> {t.teacherRoom}
              </button>
            )}

            {/* Student Specific Tab */}
            {currentUser?.role === 'student' && (
              <button
                onClick={() => setActivePage('student_profile')}
                className={`px-3.5 py-2 rounded-xl font-medium transition-all flex items-center gap-1.5 ${
                  activePage === 'student_profile' 
                    ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-600/20' 
                    : 'text-gray-400 hover:text-white hover:bg-gray-800/40'
                }`}
              >
                <User size={16} /> {t.studentProfile}
              </button>
            )}

            {/* Admin Specific Tabs */}
            {currentUser?.role === 'admin' && (
              <>
                <button
                  onClick={() => setActivePage('admin_dashboard')}
                  className={`px-3.5 py-2 rounded-xl font-medium transition-all flex items-center gap-1.5 ${
                    activePage === 'admin_dashboard' 
                      ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-600/20' 
                      : 'text-gray-400 hover:text-white hover:bg-gray-800/40'
                  }`}
                >
                  <LayoutDashboard size={16} /> {t.adminDashboard}
                </button>
                <button
                  onClick={() => setActivePage('admin_logs')}
                  className={`px-3.5 py-2 rounded-xl font-medium transition-all flex items-center gap-1.5 ${
                    activePage === 'admin_logs' 
                      ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-600/20' 
                      : 'text-gray-400 hover:text-white hover:bg-gray-800/40'
                  }`}
                >
                  <CreditCard size={16} /> {t.subscriptions}
                </button>
                <button
                  onClick={() => setActivePage('system_settings')}
                  className={`px-3.5 py-2 rounded-xl font-medium transition-all flex items-center gap-1.5 ${
                    activePage === 'system_settings' 
                      ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-600/20' 
                      : 'text-gray-400 hover:text-white hover:bg-gray-800/40'
                  }`}
                >
                  <Settings size={16} /> {t.settings}
                </button>
              </>
            )}
          </nav>

          {/* User Controls, Language Switcher & Role Switcher */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Language Switcher Button */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#161616] hover:bg-[#222] border border-gray-700 hover:border-blue-500/50 text-gray-200 hover:text-white rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer group"
              title={language === 'ar' ? 'Switch to English' : 'التحويل إلى العربية'}
            >
              <Globe size={15} className="text-blue-400 group-hover:rotate-45 transition-transform" />
              <span className="font-semibold">{language === 'ar' ? 'English' : 'عربي'}</span>
              <span className="text-[10px] px-1 py-0.2 bg-blue-500/20 text-blue-300 rounded font-mono uppercase">
                {language === 'ar' ? 'EN' : 'AR'}
              </span>
            </button>

            {/* Quick Demo Role Switcher */}
            <div className="hidden sm:flex items-center gap-1 bg-[#161616] border border-gray-800 rounded-xl p-1 text-xs">
              <span className="text-gray-500 font-bold px-1.5">{t.testRole}</span>
              <button
                onClick={() => switchRole('admin')}
                className={`px-2 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                  currentUser?.role === 'admin' 
                    ? 'bg-purple-600 text-white shadow-sm' 
                    : 'text-gray-400 hover:text-white'
                }`}
                title="Super Admin"
              >
                {t.adminRole}
              </button>
              <button
                onClick={() => switchRole('teacher')}
                className={`px-2 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                  currentUser?.role === 'teacher' 
                    ? 'bg-blue-600 text-white shadow-sm' 
                    : 'text-gray-400 hover:text-white'
                }`}
                title="Teacher"
              >
                {t.teacherRole}
              </button>
              <button
                onClick={() => switchRole('student')}
                className={`px-2 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                  currentUser?.role === 'student' 
                    ? 'bg-emerald-600 text-white shadow-sm' 
                    : 'text-gray-400 hover:text-white'
                }`}
                title="Student"
              >
                {t.studentRole}
              </button>
            </div>

            {/* User Account / Auth Actions */}
            {currentUser ? (
              <div className="flex items-center gap-2 sm:gap-3">
                <div className={`hidden md:flex flex-col ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
                  <span className="text-xs font-bold text-gray-200">{currentUser.name}</span>
                  <span className="text-[10px] text-blue-400 font-mono">
                    {currentUser.role === 'admin' ? 'Super Admin' : currentUser.role === 'teacher' ? (language === 'ar' ? 'مدرس معتمد' : 'Verified Teacher') : (language === 'ar' ? 'طالب مسجل' : 'Enrolled Student')}
                  </span>
                </div>

                <button
                  onClick={logout}
                  className="p-2.5 bg-gray-900 hover:bg-red-500/10 text-gray-400 hover:text-red-400 border border-gray-800 rounded-xl transition-all cursor-pointer"
                  title={t.logout}
                >
                  <LogOut size={17} />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActivePage('login')}
                  className="px-3 py-1.5 text-xs sm:text-sm text-gray-300 hover:text-white font-bold cursor-pointer"
                >
                  {t.login}
                </button>
                <button
                  onClick={() => setActivePage('signup')}
                  className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md shadow-blue-600/20 transition-all cursor-pointer"
                >
                  {t.signup}
                </button>
              </div>
            )}

          </div>

        </div>
      </div>
    </header>
  );
};
