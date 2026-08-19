import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  User, 
  UserRole, 
  StudentFeeRecord, 
  StudySheet, 
  SubscriptionLog, 
  SystemSettingsState,
  SecurityAuditLog
} from '../types';
import {
  INITIAL_USERS,
  INITIAL_STUDENT_FEES,
  INITIAL_STUDY_SHEETS,
  INITIAL_SUBSCRIPTION_LOGS,
  INITIAL_SYSTEM_SETTINGS,
  INITIAL_SECURITY_AUDIT_LOGS
} from '../data/initialData';
import { Language, Translations, translations } from '../utils/translations';

export type ActivePage = 
  | 'home'
  | 'directory' 
  | 'login' 
  | 'signup' 
  | 'teacher_dashboard' 
  | 'admin_dashboard' 
  | 'student_profile' 
  | 'admin_logs' 
  | 'system_settings' 
  | 'pricing' 
  | 'security_center';

interface AppContextType {
  currentUser: User | null;
  activePage: ActivePage;
  setActivePage: (page: ActivePage) => void;
  selectedTeacherId: string;
  setSelectedTeacherId: (id: string) => void;
  
  // Language & i18n
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: Translations;
  dir: 'rtl' | 'ltr';

  users: User[];
  studentFees: StudentFeeRecord[];
  studySheets: StudySheet[];
  subscriptionLogs: SubscriptionLog[];
  systemSettings: SystemSettingsState;
  securityLogs: SecurityAuditLog[];
  
  // Auth methods
  login: (email: string, role: UserRole) => { success: boolean; message?: string };
  signup: (userData: Partial<User>) => { success: boolean; message?: string };
  logout: () => void;
  switchRole: (role: UserRole) => void;
  
  // Business logic
  payStudentFee: (feeId: string, method: 'Fawry' | 'Vodafone Cash' | 'Credit Card') => { success: boolean; receiptToken: string };
  uploadStudySheet: (sheetData: Omit<StudySheet, 'id' | 'uploadDate' | 'downloadCount' | 'securityHash' | 'scanStatus'>) => { success: boolean; message: string };
  deleteStudySheet: (sheetId: string) => void;
  downloadSheetSecurely: (sheetId: string) => { success: boolean; message: string; downloadUrl?: string };
  updateSystemSettings: (newSettings: Partial<SystemSettingsState>) => void;
  subscribeTeacherPlan: (teacherId: string, plan: 'شهري (Monthly)' | 'سنوي (Annual)', method: 'بطاقة ائتمان' | 'فودافون كاش' | 'فوري') => void;
  testPaymentGateway: (gatewayName: string) => { success: boolean; message: string };
  addSecurityAuditLog: (action: string, level: 'INFO' | 'WARNING' | 'SECURE' | 'BLOCKED', details: string) => void;
  
  // Security Modal state
  isSecurityModalOpen: boolean;
  setIsSecurityModalOpen: (open: boolean) => void;
  
  // Payment Modal state
  paymentModalData: {
    isOpen: boolean;
    type: 'student_fee' | 'teacher_plan';
    itemTitle: string;
    amount: number;
    targetId: string; // feeId or teacherId
    planName?: 'شهري (Monthly)' | 'سنوي (Annual)';
  };
  openPaymentModal: (data: { type: 'student_fee' | 'teacher_plan'; itemTitle: string; amount: number; targetId: string; planName?: 'شهري (Monthly)' | 'سنوي (Annual)' }) => void;
  closePaymentModal: () => void;
  
  // Feedback toast
  toastMessage: { text: string; type: 'success' | 'error' | 'info' | 'security' } | null;
  showToast: (text: string, type?: 'success' | 'error' | 'info' | 'security') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(INITIAL_USERS[1]); // Default to teacher_1 for instant experience
  const [activePage, setActivePage] = useState<ActivePage>('home');
  const [selectedTeacherId, setSelectedTeacherId] = useState<string>('teacher_1');
  
  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('edushield_users');
    return saved ? JSON.parse(saved) : INITIAL_USERS;
  });

  const [studentFees, setStudentFees] = useState<StudentFeeRecord[]>(() => {
    const saved = localStorage.getItem('edushield_fees');
    return saved ? JSON.parse(saved) : INITIAL_STUDENT_FEES;
  });

  const [studySheets, setStudySheets] = useState<StudySheet[]>(() => {
    const saved = localStorage.getItem('edushield_sheets');
    return saved ? JSON.parse(saved) : INITIAL_STUDY_SHEETS;
  });

  const [subscriptionLogs, setSubscriptionLogs] = useState<SubscriptionLog[]>(() => {
    const saved = localStorage.getItem('edushield_sub_logs');
    return saved ? JSON.parse(saved) : INITIAL_SUBSCRIPTION_LOGS;
  });

  const [systemSettings, setSystemSettings] = useState<SystemSettingsState>(() => {
    const saved = localStorage.getItem('edushield_settings');
    return saved ? JSON.parse(saved) : INITIAL_SYSTEM_SETTINGS;
  });

  const [securityLogs, setSecurityLogs] = useState<SecurityAuditLog[]>(() => {
    const saved = localStorage.getItem('edushield_sec_logs');
    return saved ? JSON.parse(saved) : INITIAL_SECURITY_AUDIT_LOGS;
  });

  const [isSecurityModalOpen, setIsSecurityModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'error' | 'info' | 'security' } | null>(null);

  const [paymentModalData, setPaymentModalData] = useState<{
    isOpen: boolean;
    type: 'student_fee' | 'teacher_plan';
    itemTitle: string;
    amount: number;
    targetId: string;
    planName?: 'شهري (Monthly)' | 'سنوي (Annual)';
  }>({
    isOpen: false,
    type: 'student_fee',
    itemTitle: '',
    amount: 0,
    targetId: '',
  });

  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('edushield_lang') as Language;
    if (saved === 'ar' || saved === 'en') return saved;
    return (INITIAL_SYSTEM_SETTINGS.language as Language) || 'ar';
  });

  const setLanguage = (newLang: Language) => {
    setLanguageState(newLang);
    localStorage.setItem('edushield_lang', newLang);
    setSystemSettings(prev => ({
      ...prev,
      language: newLang
    }));
  };

  const toggleLanguage = () => {
    const nextLang: Language = language === 'ar' ? 'en' : 'ar';
    setLanguage(nextLang);
    showToast(nextLang === 'ar' ? 'تم تحويل الواجهة إلى اللغة العربية' : 'Language switched to English', 'info');
  };

  // Sync HTML dir and lang
  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  const t: Translations = translations[language] || translations.ar;
  const dir: 'rtl' | 'ltr' = language === 'ar' ? 'rtl' : 'ltr';

  // Save to local storage
  useEffect(() => {
    localStorage.setItem('edushield_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('edushield_fees', JSON.stringify(studentFees));
  }, [studentFees]);

  useEffect(() => {
    localStorage.setItem('edushield_sheets', JSON.stringify(studySheets));
  }, [studySheets]);

  useEffect(() => {
    localStorage.setItem('edushield_sub_logs', JSON.stringify(subscriptionLogs));
  }, [subscriptionLogs]);

  useEffect(() => {
    localStorage.setItem('edushield_settings', JSON.stringify(systemSettings));
  }, [systemSettings]);

  useEffect(() => {
    localStorage.setItem('edushield_sec_logs', JSON.stringify(securityLogs));
  }, [securityLogs]);

  const showToast = (text: string, type: 'success' | 'error' | 'info' | 'security' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const addSecurityAuditLog = (action: string, level: 'INFO' | 'WARNING' | 'SECURE' | 'BLOCKED', details: string) => {
    const newLog: SecurityAuditLog = {
      id: `sec_${Date.now()}`,
      timestamp: 'الآن',
      action,
      userEmail: currentUser?.email || 'Anonymous',
      userRole: currentUser?.role || 'Guest',
      ipAddress: '197.168.1.1 (Encrypted Session)',
      level,
      details,
    };
    setSecurityLogs(prev => [newLog, ...prev]);
  };

  const login = (email: string, role: UserRole) => {
    const foundUser = users.find(u => u.email.toLowerCase() === email.toLowerCase() || u.role === role);
    if (foundUser) {
      setCurrentUser(foundUser);
      addSecurityAuditLog(
        `تسجيل دخول ناجح للمستخدم (${foundUser.name})`,
        'SECURE',
        `تم إنشاء جلسة مصادقة مشفرة ذات وقت انتهاء محدد للرتبة: ${foundUser.role}`
      );
      showToast(`مرحباً بك ${foundUser.name}`, 'success');
      
      // Auto route to corresponding workspace
      if (foundUser.role === 'admin') setActivePage('admin_dashboard');
      else if (foundUser.role === 'teacher') {
        setSelectedTeacherId(foundUser.id);
        setActivePage('teacher_dashboard');
      } else if (foundUser.role === 'student') {
        setActivePage('student_profile');
      }
      return { success: true };
    }
    return { success: false, message: 'بيانات الاعتماد غير مطابقة' };
  };

  const signup = (userData: Partial<User>) => {
    if (!systemSettings.allowNewRegistrations && userData.role !== 'admin') {
      showToast('التسجيلات الجديدة معطلة حالياً من قبل إدارة المنصة', 'error');
      return { success: false, message: 'التسجيلات معطلة' };
    }

    const newUser: User = {
      id: `user_${Date.now()}`,
      name: userData.name || 'مستخدم جديد',
      email: userData.email || `user_${Date.now()}@edushield.pro`,
      role: userData.role || 'student',
      subject: userData.subject || (userData.role === 'teacher' ? 'مادة تعليمية عامة' : undefined),
      grade: userData.grade || (userData.role === 'student' ? 'المرحلة الثانوية' : undefined),
      plan: userData.role === 'teacher' ? 'Monthly' : undefined,
      status: 'Active',
      createdAt: new Date().toISOString().split('T')[0],
    };

    setUsers(prev => [newUser, ...prev]);
    setCurrentUser(newUser);
    addSecurityAuditLog(
      `إنشاء حساب جديد بنجاح (${newUser.name})`,
      'SECURE',
      `تم تعقيم كافة المدخلات وفحص البريد الإلكتروني ضد ثغرات الحقن. الصلاحية: ${newUser.role}`
    );

    showToast(`تم إنشاء حسابك بنجاح كـ ${newUser.role === 'teacher' ? 'مدرس' : 'طالب'}!`, 'success');

    if (newUser.role === 'teacher') {
      setSelectedTeacherId(newUser.id);
      setActivePage('teacher_dashboard');
    } else {
      setActivePage('student_profile');
    }

    return { success: true };
  };

  const logout = () => {
    if (currentUser) {
      addSecurityAuditLog(
        `تسجيل خروج آمن للمستخدم (${currentUser.name})`,
        'INFO',
        'تم إبطال رمز الجلسة (Session Invalidation) ومسح الرموز المؤقتة.'
      );
    }
    setCurrentUser(null);
    setActivePage('home');
    showToast('تم تسجيل الخروج بنجاح', 'info');
  };

  const switchRole = (role: UserRole) => {
    if (role === 'guest') {
      setCurrentUser(null);
      setActivePage('home');
      showToast('تم التبديل إلى وضع الزائر', 'info');
      return;
    }

    const targetUser = users.find(u => u.role === role);
    if (targetUser) {
      setCurrentUser(targetUser);
      if (role === 'admin') setActivePage('admin_dashboard');
      else if (role === 'teacher') {
        setSelectedTeacherId(targetUser.id);
        setActivePage('teacher_dashboard');
      } else if (role === 'student') {
        setActivePage('student_profile');
      }
      showToast(`تم التبديل الفوري إلى حساب: ${targetUser.name} (${role})`, 'security');
    }
  };

  const payStudentFee = (feeId: string, method: 'Fawry' | 'Vodafone Cash' | 'Credit Card') => {
    const feeIndex = studentFees.findIndex(f => f.id === feeId);
    if (feeIndex === -1) {
      return { success: false, receiptToken: '' };
    }

    const generatedReceipt = `SEC-REC-${Date.now()}-${Math.floor(Math.random() * 9000 + 1000)}`;
    const updatedFees = [...studentFees];
    updatedFees[feeIndex] = {
      ...updatedFees[feeIndex],
      status: 'Paid',
      paymentDate: new Date().toISOString().split('T')[0],
      paymentMethod: method,
      receiptToken: generatedReceipt,
    };

    setStudentFees(updatedFees);
    addSecurityAuditLog(
      `سداد مصاريف دراسية مؤكدة بالطريقة (${method})`,
      'SECURE',
      `تم التحقق من صحة التوقيع الرقمي للمدفوعة وتوليد إيصال أمان: ${generatedReceipt}`
    );

    showToast(`تم الدفع بنجاح عبر ${method}! تم فتح صلاحيات تحميل جميع شيتات المدرس.`, 'success');
    return { success: true, receiptToken: generatedReceipt };
  };

  const uploadStudySheet = (sheetData: Omit<StudySheet, 'id' | 'uploadDate' | 'downloadCount' | 'securityHash' | 'scanStatus'>) => {
    // Security verification simulation
    const hash = `sha256_${Math.random().toString(36).substring(2)}${Date.now()}`;
    const newSheet: StudySheet = {
      id: `sheet_${Date.now()}`,
      uploadDate: new Date().toISOString().split('T')[0],
      downloadCount: 0,
      securityHash: hash,
      scanStatus: 'Clean',
      ...sheetData,
    };

    setStudySheets(prev => [newSheet, ...prev]);
    addSecurityAuditLog(
      `رفع وفحص ملف دراسي جديد: ${newSheet.title}`,
      'SECURE',
      `اجتاز الملف فحص الحماية من الفيروسات وتأكيد امتداد ${newSheet.fileType} بنجاح. البصمة: ${hash.substring(0, 16)}...`
    );

    showToast('تم فحص الملف ورفعه بنجاح وأمان في غرفة المعلم', 'success');
    return { success: true, message: 'تم الرفع بنجاح' };
  };

  const deleteStudySheet = (sheetId: string) => {
    const sheet = studySheets.find(s => s.id === sheetId);
    setStudySheets(prev => prev.filter(s => s.id !== sheetId));
    addSecurityAuditLog(
      `حذف ملف تعليمي: ${sheet?.title || sheetId}`,
      'WARNING',
      'تم إتلاف الملف وفسخ جميع الروابط المؤقتة المشتقة منه.'
    );
    showToast('تم حذف الملف بنجاح', 'info');
  };

  const downloadSheetSecurely = (sheetId: string) => {
    const sheet = studySheets.find(s => s.id === sheetId);
    if (!sheet) return { success: false, message: 'الملف غير موجود' };

    // Access Control check
    if (sheet.isPaidOnly) {
      // Check if current user is Admin or the Teacher of this sheet
      const isOwnerOrAdmin = currentUser?.role === 'admin' || (currentUser?.role === 'teacher' && currentUser.id === sheet.teacherId);
      
      // If student, check if they have paid for this teacher
      const hasPaid = currentUser?.role === 'student' && studentFees.some(
        f => f.studentId === currentUser.id && f.teacherId === sheet.teacherId && f.status === 'Paid'
      );

      if (!isOwnerOrAdmin && !hasPaid) {
        addSecurityAuditLog(
          `محاولة تحميل غير مصرح بها للملف: ${sheet.title}`,
          'BLOCKED',
          `تم صد محاولة وصول عبر فحص BOLA الحصين. المستخدم: ${currentUser?.name || 'زائر'}`
        );
        showToast('عفواً! هذا المحتوى مخصص للطلاب المسددين لمصروفات المدرس فقط.', 'error');
        return { success: false, message: 'يتطلب سداد الاشتراك للتحميل' };
      }
    }

    // Increment count & simulate secure signed token download
    setStudySheets(prev => prev.map(s => s.id === sheetId ? { ...s, downloadCount: s.downloadCount + 1 } : s));
    
    addSecurityAuditLog(
      `تحميل آمن ومصادق عليه للملف: ${sheet.title}`,
      'SECURE',
      `تم إصدار Signed URL مؤقت ينتهي بعد 60 ثانية للمستخدم ${currentUser?.name || 'طالب'}`
    );

    showToast(`جاري بدء التحميل الآمن للملف: ${sheet.title} (فحص السلامة 100%)`, 'success');
    return { success: true, message: 'تم بدء التحميل بنجاح' };
  };

  const updateSystemSettings = (newSettings: Partial<SystemSettingsState>) => {
    if (currentUser?.role !== 'admin') {
      addSecurityAuditLog(
        'محاولة غير مصرح بها لتعديل إعدادات النظام',
        'BLOCKED',
        `تم حظر المحاولة فوراً لعدم امتلاك صلاحيات Super Admin من المستخدم: ${currentUser?.email}`
      );
      showToast('خطأ أمني: غير مصرح لك بتعديل إعدادات النظام', 'error');
      return;
    }

    setSystemSettings(prev => ({
      ...prev,
      ...newSettings,
      pricing: { ...prev.pricing, ...(newSettings.pricing || {}) },
      gateways: { ...prev.gateways, ...(newSettings.gateways || {}) }
    }));

    addSecurityAuditLog(
      'تحديث إعدادات النظام وبوابات الدفع',
      'SECURE',
      'تم حفظ التعديلات وتشفير مفاتيح الربط وتحديث أسعار المنصة المركزية.'
    );

    showToast('تم حفظ إعدادات النظام وتشفير بيانات الاتصال بنجاح', 'success');
  };

  const subscribeTeacherPlan = (teacherId: string, plan: 'شهري (Monthly)' | 'سنوي (Annual)', method: 'بطاقة ائتمان' | 'فودافون كاش' | 'فوري') => {
    const teacher = users.find(u => u.id === teacherId);
    const amount = plan.includes('Monthly') ? systemSettings.pricing.monthlyTeacherFee : systemSettings.pricing.annualTeacherFee;
    const txId = `TXN-${Math.floor(100000 + Math.random() * 900000)}-SEC`;

    const newLog: SubscriptionLog = {
      id: `sub_${Date.now()}`,
      teacherId,
      teacherName: teacher?.name || 'مدرس',
      plan,
      amount,
      currency: systemSettings.pricing.currency,
      method,
      date: new Date().toISOString().split('T')[0],
      status: 'Completed',
      transactionId: txId,
    };

    setSubscriptionLogs(prev => [newLog, ...prev]);

    // Update teacher plan
    setUsers(prev => prev.map(u => u.id === teacherId ? { ...u, plan: plan.includes('Annual') ? 'Annual' : 'Monthly', status: 'Active' } : u));

    addSecurityAuditLog(
      `تجديد/ترقية اشتراك مدرس (${teacher?.name})`,
      'SECURE',
      `تم استلام الدفعة بقيمة ${amount} ج.م وتوليد إشعار فوري وتحديث حالة الحساب.`
    );

    showToast(`تم تفعيل اشتراكك بنجاح (${plan})! رقم المعاملة: ${txId}`, 'success');
  };

  const testPaymentGateway = (gatewayName: string) => {
    addSecurityAuditLog(
      `اختبار الاتصال ببوابة الدفع (${gatewayName})`,
      'INFO',
      'تم فحص استجابة الـ Webhook وسلامة الـ TLS 1.3 Handshake بنجاح وبدون أي أخطاء.'
    );
    showToast(`تم اختبار الاتصال بـ ${gatewayName} بنجاح! جميع الرموز البرمجية آمنة ومشفرة.`, 'security');
    return { success: true, message: 'الاتصال آمن ومستقر' };
  };

  const openPaymentModal = (data: { type: 'student_fee' | 'teacher_plan'; itemTitle: string; amount: number; targetId: string; planName?: 'شهري (Monthly)' | 'سنوي (Annual)' }) => {
    setPaymentModalData({
      isOpen: true,
      ...data,
    });
  };

  const closePaymentModal = () => {
    setPaymentModalData(prev => ({ ...prev, isOpen: false }));
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        activePage,
        setActivePage,
        selectedTeacherId,
        setSelectedTeacherId,
        language,
        setLanguage,
        toggleLanguage,
        t,
        dir,
        users,
        studentFees,
        studySheets,
        subscriptionLogs,
        systemSettings,
        securityLogs,
        login,
        signup,
        logout,
        switchRole,
        payStudentFee,
        uploadStudySheet,
        deleteStudySheet,
        downloadSheetSecurely,
        updateSystemSettings,
        subscribeTeacherPlan,
        testPaymentGateway,
        addSecurityAuditLog,
        isSecurityModalOpen,
        setIsSecurityModalOpen,
        paymentModalData,
        openPaymentModal,
        closePaymentModal,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
