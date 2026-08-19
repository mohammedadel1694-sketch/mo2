import React, { useState } from 'react';
import { Mail, Lock, ArrowRight, ShieldCheck, Eye, EyeOff, AlertCircle, KeyRound } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { UserRole } from '../types';

export const LoginPage: React.FC = () => {
  const { login, setActivePage, showToast, t, dir, language } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('teacher');
  const [showPassword, setShowPassword] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isLocked) {
      setErrorMessage(language === 'ar' ? 'تم قفل تسجيل الدخول مؤقتاً بسبب تكرار المحاولات الخاطئة (Rate Limit Active)' : 'Login temporarily locked due to failed attempts (Rate Limit Active)');
      return;
    }

    if (!email.trim()) {
      setErrorMessage(language === 'ar' ? 'يرجى إدخال البريد الإلكتروني' : 'Please enter your email address');
      return;
    }

    const result = login(email.trim(), selectedRole);
    if (!result.success) {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      if (newAttempts >= 5) {
        setIsLocked(true);
        setTimeout(() => setIsLocked(false), 30000); // 30 sec rate limit
        setErrorMessage(language === 'ar' ? 'تم تفعيل جدار الحماية ضد القوة الغاشمة (Brute-Force Guard): المحاولات مجمدة لـ 30 ثانية.' : 'Brute-force protection enabled: attempts frozen for 30s.');
      } else {
        setErrorMessage(language === 'ar' ? `بيانات الاعتماد غير صحيحة. المحاولة (${newAttempts}/5)` : `Invalid credentials. Attempt (${newAttempts}/5)`);
      }
    }
  };

  const fillDemoAccount = (role: UserRole) => {
    setSelectedRole(role);
    if (role === 'admin') {
      setEmail('admin@edushield.pro');
      setPassword('Admin@123456');
    } else if (role === 'teacher') {
      setEmail('ahmed.math@edushield.pro');
      setPassword('Teacher@123456');
    } else {
      setEmail('yassin.ibrahim@student.com');
      setPassword('Student@123456');
    }
    setErrorMessage('');
    showToast(language === 'ar' ? `تم ملء بيانات الحساب التجريبي كـ (${role})` : `Demo credentials filled for (${role})`, 'info');
  };

  return (
    <div className="min-h-[85vh] bg-[#050505] flex items-center justify-center p-4 sm:p-6 font-sans" dir={dir}>
      <div className="max-w-4xl w-full bg-[#0A0A0A] border border-gray-800 rounded-[2rem] overflow-hidden flex flex-col md:flex-row shadow-2xl">
        
        {/* Left Side: Visual */}
        <div className="md:w-1/2 bg-gradient-to-br from-blue-600 to-blue-800 p-8 sm:p-12 flex flex-col justify-between text-white relative overflow-hidden">
          <div className="relative z-10 space-y-4">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold border border-white/20">
              <ShieldCheck size={14} className="text-emerald-300" /> {t.securityProtected}
            </div>
            <h2 className="text-3xl sm:text-4xl font-black leading-tight">
              {language === 'ar' ? 'ابدأ رحلتك التعليمية الذكية اليوم.' : 'Start your secure learning journey today.'}
            </h2>
            <p className="text-blue-100 text-sm leading-relaxed">
              {language === 'ar' ? 'نظام متكامل لإدارة غرف المدرسين، الشيتات، والمصروفات مع أقصى حماية للبيانات.' : 'Comprehensive platform for managing classrooms, encrypted sheets, and payments.'}
            </p>
          </div>

          <div className="relative z-10 pt-8 border-t border-white/15">
            <p className="text-xs text-blue-200 mb-2 font-bold">{language === 'ar' ? 'تسجيل سريع للحسابات التجريبية:' : 'Quick Demo Credentials:'}</p>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => fillDemoAccount('admin')}
                className="text-xs bg-white/15 hover:bg-white/25 px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer"
              >
                {t.adminRole}
              </button>
              <button
                type="button"
                onClick={() => fillDemoAccount('teacher')}
                className="text-xs bg-white/15 hover:bg-white/25 px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer"
              >
                {t.teacherRole}
              </button>
              <button
                type="button"
                onClick={() => fillDemoAccount('student')}
                className="text-xs bg-white/15 hover:bg-white/25 px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer"
              >
                {t.studentRole}
              </button>
            </div>
          </div>

          <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
        </div>

        {/* Right Side: Form */}
        <div className="md:w-1/2 p-8 sm:p-12 flex flex-col justify-center">
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-white">{t.loginTitle}</h3>
            <p className="text-xs text-gray-500 mt-1">{t.loginSubtitle}</p>
          </div>

          {errorMessage && (
            <div className="mb-6 p-3.5 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-xs flex items-center gap-2">
              <AlertCircle size={16} className="shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5" dir={dir}>
            {/* Role Radio Group */}
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase mb-2 block tracking-wider">{t.accountType}</label>
              <div className="grid grid-cols-3 gap-2">
                {(['teacher', 'student', 'admin'] as UserRole[]).map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => fillDemoAccount(r)}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      selectedRole === r
                        ? 'border-blue-500 bg-blue-500/10 text-blue-400'
                        : 'border-gray-800 bg-[#121212] text-gray-400 hover:text-gray-200'
                    }`}
                  >
                    {r === 'teacher' ? t.teacherRole : r === 'student' ? t.studentRole : t.adminRole}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-500 uppercase mb-2 block tracking-widest">{t.emailLabel}</label>
              <div className="relative">
                <Mail className={`absolute ${dir === 'rtl' ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 text-gray-600`} size={18} />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@mail.com" 
                  className={`w-full bg-[#161616] border border-gray-800 rounded-xl py-3 ${dir === 'rtl' ? 'pr-12 pl-4' : 'pl-12 pr-4'} focus:border-blue-500 outline-none transition-all text-sm text-white`} 
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-500 uppercase mb-2 block tracking-widest">{t.passwordLabel}</label>
              <div className="relative">
                <Lock className={`absolute ${dir === 'rtl' ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 text-gray-600`} size={18} />
                <input 
                  type={showPassword ? "text" : "password"} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••" 
                  className={`w-full bg-[#161616] border border-gray-800 rounded-xl py-3 ${dir === 'rtl' ? 'pr-12 pl-12' : 'pl-12 pr-12'} focus:border-blue-500 outline-none transition-all text-sm text-white font-mono`} 
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute ${dir === 'rtl' ? 'left-4' : 'right-4'} top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-400 cursor-pointer`}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button 
              type="submit"
              disabled={isLocked}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-800 disabled:text-gray-600 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-600/20 cursor-pointer"
            >
              {t.loginSubmit}
              <ArrowRight size={18} className={dir === 'ltr' ? '' : 'rotate-180'} />
            </button>
          </form>

          <p className="mt-8 text-center text-xs text-gray-500">
            {t.noAccountYet}{' '}
            <button 
              type="button"
              onClick={() => setActivePage('signup')}
              className="text-blue-500 cursor-pointer font-bold hover:underline"
            >
              {t.signup}
            </button>
          </p>
        </div>

      </div>
    </div>
  );
};
