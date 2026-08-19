import React, { useState } from 'react';
import { User, Mail, Lock, UserCircle, ShieldCheck, ArrowRight, BookOpen, GraduationCap } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { UserRole } from '../types';

export const SignUp: React.FC = () => {
  const { signup, setActivePage, systemSettings, t, dir, language } = useApp();
  const [role, setRole] = useState<UserRole>('teacher');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [subjectOrGrade, setSubjectOrGrade] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !password.trim()) {
      return;
    }

    signup({
      name: name.trim(),
      email: email.trim(),
      role,
      subject: role === 'teacher' ? (subjectOrGrade || (language === 'ar' ? 'الرياضيات - المرحلة الثانوية' : 'Mathematics - High School')) : undefined,
      grade: role === 'student' ? (subjectOrGrade || (language === 'ar' ? 'الصف الثالث الثانوي' : 'Grade 12 / Senior')) : undefined,
    });
  };

  return (
    <div className="min-h-[85vh] bg-[#050505] flex items-center justify-center p-4 sm:p-6 font-sans" dir={dir}>
      <div className="max-w-md w-full bg-[#0A0A0A] border border-gray-800 rounded-[2.5rem] p-8 sm:p-10 shadow-2xl">
        <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold mb-2">
          <ShieldCheck size={16} /> {t.securityProtected}
        </div>
        <h2 className="text-3xl font-black mb-2 text-white">{t.signupTitle}</h2>
        <p className="text-gray-500 text-xs mb-8">{t.signupSubtitle}</p>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Role Choice */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <button 
              type="button" 
              onClick={() => setRole('teacher')}
              className={`flex flex-col items-center gap-2 p-4 border-2 rounded-2xl transition-all cursor-pointer ${
                role === 'teacher' 
                  ? 'border-blue-600 bg-blue-600/10 text-white' 
                  : 'border-gray-800 bg-transparent text-gray-500 hover:border-gray-700'
              }`}
            >
              <UserCircle className={role === 'teacher' ? 'text-blue-500' : 'text-gray-500'} size={28} />
              <span className="text-xs font-bold">{t.imTeacher}</span>
            </button>

            <button 
              type="button" 
              onClick={() => setRole('student')}
              className={`flex flex-col items-center gap-2 p-4 border-2 rounded-2xl transition-all cursor-pointer ${
                role === 'student' 
                  ? 'border-emerald-600 bg-emerald-600/10 text-white' 
                  : 'border-gray-800 bg-transparent text-gray-500 hover:border-gray-700'
              }`}
            >
              <GraduationCap className={role === 'student' ? 'text-emerald-500' : 'text-gray-500'} size={28} />
              <span className="text-xs font-bold">{t.imStudent}</span>
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs text-gray-400 font-bold block mb-1.5">{t.fullName}</label>
              <input 
                type="text" 
                placeholder={t.fullName} 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#161616] border border-gray-800 rounded-xl py-3 px-4 outline-none focus:border-blue-500 text-sm text-white" 
                required
              />
            </div>

            <div>
              <label className="text-xs text-gray-400 font-bold block mb-1.5">{t.emailLabel}</label>
              <input 
                type="email" 
                placeholder="example@mail.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#161616] border border-gray-800 rounded-xl py-3 px-4 outline-none focus:border-blue-500 text-sm text-white" 
                required
              />
            </div>

            <div>
              <label className="text-xs text-gray-400 font-bold block mb-1.5">{t.passwordLabel}</label>
              <input 
                type="password" 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#161616] border border-gray-800 rounded-xl py-3 px-4 outline-none focus:border-blue-500 text-sm text-white font-mono" 
                required
              />
            </div>

            <div>
              <label className="text-xs text-gray-400 font-bold block mb-1.5">
                {role === 'teacher' ? t.subjectOrGradeTeacher : t.subjectOrGradeStudent}
              </label>
              <input 
                type="text" 
                placeholder={role === 'teacher' ? (language === 'ar' ? 'مثال: الرياضيات - الثانوية العامة' : 'e.g. Mathematics - High School') : (language === 'ar' ? 'مثال: الصف الثالث الثانوي' : 'e.g. Grade 12 / Senior')}
                value={subjectOrGrade}
                onChange={(e) => setSubjectOrGrade(e.target.value)}
                className="w-full bg-[#161616] border border-gray-800 rounded-xl py-3 px-4 outline-none focus:border-blue-500 text-sm text-white" 
              />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 py-3.5 rounded-xl font-bold text-sm text-white shadow-lg shadow-blue-600/20 transition-all cursor-pointer mt-2"
          >
            {t.signupSubmit}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-gray-500">
          {t.alreadyHaveAccount}{' '}
          <button 
            type="button"
            onClick={() => setActivePage('login')}
            className="text-blue-500 cursor-pointer font-bold hover:underline"
          >
            {t.login}
          </button>
        </p>
      </div>
    </div>
  );
};
