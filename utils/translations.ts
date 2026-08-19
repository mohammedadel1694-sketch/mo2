export type Language = 'ar' | 'en';

export interface Translations {
  // Common & Navigation
  brandName: string;
  brandTagline: string;
  home: string;
  directory: string;
  pricing: string;
  teacherRoom: string;
  studentProfile: string;
  adminDashboard: string;
  subscriptions: string;
  settings: string;
  login: string;
  signup: string;
  logout: string;
  testRole: string;
  adminRole: string;
  teacherRole: string;
  studentRole: string;
  securityProtected: string;
  securityLogsBtn: string;
  maintenanceNotice: string;
  langSwitchLabel: string;
  footerRights: string;
  footerSecurity: string;
  footerEncryption: string;
  footerVersion: string;

  // Actions & General
  save: string;
  cancel: string;
  delete: string;
  edit: string;
  view: string;
  download: string;
  payNow: string;
  subscribeNow: string;
  search: string;
  filter: string;
  all: string;
  status: string;
  actions: string;
  date: string;
  amount: string;
  currency: string;
  active: string;
  pending: string;
  paid: string;
  overdue: string;
  clean: string;
  safe: string;
  cleanScan: string;
  loading: string;
  success: string;
  error: string;
  close: string;

  // Home Page
  heroBadge: string;
  heroTitle1: string;
  heroTitleHighlight: string;
  heroTitle2: string;
  heroDescription: string;
  startTeacherRoom: string;
  browseTeachers: string;
  exploreFeatures: string;
  statTeachers: string;
  statStudents: string;
  statSheets: string;
  statSecurity: string;
  
  featuresTitle: string;
  featuresSubtitle: string;
  tabTeachers: string;
  tabStudents: string;
  tabAdmins: string;
  
  calcTitle: string;
  calcSubtitle: string;
  calcStudentsLabel: string;
  calcPriceLabel: string;
  calcGrossRevenue: string;
  calcPlatformFee: string;
  calcNetMonthly: string;
  calcAnnualProfit: string;
  
  securityDemoTitle: string;
  securityDemoSubtitle: string;
  watermarkDemoLabel: string;
  watermarkDesc: string;
  
  fawryVerificationTitle: string;
  fawryVerificationSubtitle: string;
  verifyCodePlaceholder: string;
  verifyBtn: string;
  
  faqTitle: string;
  faqSubtitle: string;

  // Directory
  directoryTitle: string;
  directorySubtitle: string;
  searchTeacherPlaceholder: string;
  filterSubject: string;
  filterGrade: string;
  enterRoom: string;
  verifiedTeacher: string;
  
  // Pricing
  pricingTitle: string;
  pricingSubtitle: string;
  monthlyPlanTitle: string;
  monthlyPlanDesc: string;
  annualPlanTitle: string;
  annualPlanDesc: string;
  mostPopular: string;
  freeTrialNote: string;
  perMonth: string;
  perYear: string;
  savingsBadge: string;

  // Teacher Dashboard
  teacherDashTitle: string;
  teacherDashSubtitle: string;
  totalStudents: string;
  collectedFees: string;
  pendingFees: string;
  uploadedSheetsCount: string;
  uploadNewSheet: string;
  studentFeesTable: string;
  sheetsVault: string;
  shareRoomLink: string;
  copyLinkSuccess: string;

  // Student Profile
  studentTitle: string;
  studentSubtitle: string;
  myTeachers: string;
  pendingPayments: string;
  studyMaterials: string;
  receiptNumber: string;

  // Admin Dashboard
  adminTitle: string;
  adminSubtitle: string;
  platformRevenue: string;
  activeSubscriptions: string;
  systemHealth: string;
  blockedAttacks: string;
  recentLogs: string;

  // System Settings
  settingsTitle: string;
  settingsSubtitle: string;
  pricingSettings: string;
  languageSettings: string;
  maintenanceMode: string;
  paymentGateways: string;
  saveSettingsSuccess: string;

  // Login & Sign Up
  loginTitle: string;
  loginSubtitle: string;
  emailLabel: string;
  passwordLabel: string;
  selectRole: string;
  noAccount: string;
  haveAccount: string;
  createAccountTitle: string;
  createAccountSubtitle: string;
  fullNameLabel: string;
  phoneLabel: string;
}

export const translations: Record<Language, Translations> = {
  ar: {
    // Common & Navigation
    brandName: 'Personal Assistant',
    brandTagline: 'منصة الغرف والمساعد التعليمي الذكي',
    home: 'الرئيسية',
    directory: 'دليل المدرسين',
    pricing: 'خطط الاشتراك',
    teacherRoom: 'غرفة المعلم',
    studentProfile: 'ملف الطالب',
    adminDashboard: 'لوحة الأدمن',
    subscriptions: 'الاشتراكات',
    settings: 'الإعدادات',
    login: 'دخول',
    signup: 'حساب جديد',
    logout: 'تسجيل الخروج',
    testRole: 'تجربة الرتبة:',
    adminRole: 'أدمن',
    teacherRole: 'معلم',
    studentRole: 'طالب',
    securityProtected: 'الأمان: 100% محصن',
    securityLogsBtn: 'سجل الثغرات',
    maintenanceNotice: 'تنبيه: وضع الصيانة مفعل حالياً من لوحة الأدمن. الزوار العاديون محجوبون عن التعديلات.',
    langSwitchLabel: 'English',
    footerRights: 'منصة Personal Assistant - منصة الغرف والمساعد التعليمي الذكي',
    footerSecurity: 'نظام الحماية: OWASP Top 10 Compliant',
    footerEncryption: 'تشفير بوابات الدفع: AES-256',
    footerVersion: 'النسخة 2.5.0',

    // Actions & General
    save: 'حفظ التعديلات',
    cancel: 'إلغاء',
    delete: 'حذف',
    edit: 'تعديل',
    view: 'عرض',
    download: 'تحميل فوري آمن',
    payNow: 'دفع الرسوم الآن',
    subscribeNow: 'ترقية واشتراك الآن',
    search: 'بحث...',
    filter: 'تصفية',
    all: 'الكل',
    status: 'الحالة',
    actions: 'الإجراءات',
    date: 'التاريخ',
    amount: 'المبلغ',
    currency: 'ج.م',
    active: 'نشط',
    pending: 'قيد الانتظار',
    paid: 'مدفوع ومؤكد',
    overdue: 'متأخر',
    clean: 'نظيف ومفحوص',
    safe: 'آمن تماماً',
    cleanScan: 'فحص الحماية: سليم وخالٍ من الفيروسات',
    loading: 'جاري التحميل...',
    success: 'تم بنجاح',
    error: 'حدث خطأ',
    close: 'إغلاق',

    // Home Page
    heroBadge: 'الجيل القادم من منصات المساعدين والمدرسين',
    heroTitle1: 'امتلك غرفتك التعليمية بأعلى درجات',
    heroTitleHighlight: 'الأمان والتحصيل المالي',
    heroTitle2: 'بلا وساطة وبلا تسريب لمذكراتك',
    heroDescription: 'منظومة سحابية رائدة تجمع بين إدارة فصول المدرسين، تحصيل اشتراكات ومصاريف الطلاب عبر فوري وفودافون كاش، وحماية فائقة للشيتات والمذكرات بواسطة العلامة المائية المشفرة.',
    startTeacherRoom: 'أنشئ غرفتك التعليمية الآن',
    browseTeachers: 'تصفح نخبة المعلمين المعتمدين',
    exploreFeatures: 'اكتشف كافة المميزات',
    statTeachers: 'مدرس معتمد',
    statStudents: 'طالب نشط',
    statSheets: 'شيت ومذكرة محمية',
    statSecurity: 'حماية ضد التسريب والاختراق',
    
    featuresTitle: 'مميزات المنظومة المصممة خصيصاً لاحتياجاتك',
    featuresSubtitle: 'حل متكامل يغطي إدارة المحتوى، الأمان الرقمي، والمحاسبة الآلية بدون تعقيد',
    tabTeachers: 'للمعلمين والمحاضرين',
    tabStudents: 'للطلاب وأولياء الأمور',
    tabAdmins: 'للإدارة والسناتر',
    
    calcTitle: 'حاسبة الأرباح والعوائد التقديرية للمعلم',
    calcSubtitle: 'احسب صافي أرباحك الشهرية والسنوية عند اشتراكك في باقة المعلم وإدارة طلابك معنا',
    calcStudentsLabel: 'عدد الطلاب المسجلين في مجموعاتك:',
    calcPriceLabel: 'متوسط اشتراك الطالب الشهري:',
    calcGrossRevenue: 'إجمالي دخل الطلاب شهرياً:',
    calcPlatformFee: 'تكلفة باقة المنصة الثابتة:',
    calcNetMonthly: 'صافي أرباحك الشهرية التقريبية:',
    calcAnnualProfit: 'صافي العائد السنوي المتوقع:',
    
    securityDemoTitle: 'محاكي العلامة المائية الذكية لمنع تسريب المذكرات',
    securityDemoSubtitle: 'تختم كل صفحة تلقائياً ببيانات الطالب ورقم هاتفه وكود التتبع المشفر فور الضغط على التحميل',
    watermarkDemoLabel: 'جرب إدخال بيانات طالب لمعاينة الختم المشفر:',
    watermarkDesc: 'حتى لو قام الطالب بتصوير الشاشة أو طباعة الملف، يظهر اسمه ورقمه المشفر بوضوح مما يمنع التسريب.',
    
    fawryVerificationTitle: 'محاكي التحقق من إيصالات فوري وفودافون كاش',
    fawryVerificationSubtitle: 'فحص فوري لصحة عمليات الدفع ومنع التلاعب بالإيصالات عبر خوارزمية HMAC-SHA256',
    verifyCodePlaceholder: 'أدخل كود العملية (مثال: FAWRY-7829-4109)...',
    verifyBtn: 'تحقق من صحة الإيصال',
    
    faqTitle: 'الأسئلة الأكثر شيوعاً',
    faqSubtitle: 'إجابات شاملة حول غرف المدرسين، الدفع، والأمان',

    // Directory
    directoryTitle: 'دليل نخبة المعلمين والمحاضرين',
    directorySubtitle: 'تصفح قائمة المعلمين المعتمدين، انضم لغرفهم الدراسية، واطلع على المذكرات والشيتات الرسمية',
    searchTeacherPlaceholder: 'ابحث باسم المدرس، المادة أو المرحلة الدراسية...',
    filterSubject: 'تصفية حسب المادة',
    filterGrade: 'المرحلة الدراسية',
    enterRoom: 'دخول غرفة المعلم والشيتات',
    verifiedTeacher: 'معلم معتمد وموثق',

    // Pricing
    pricingTitle: 'خطط اشتراك شفافة للمعلمين والمؤسسات',
    pricingSubtitle: 'استثمر في غرفتك التعليمية وحصّل اشتراكات طلابك بدون عمولات خفية',
    monthlyPlanTitle: 'الباقة الشهرية (Pro)',
    monthlyPlanDesc: 'مثالية للمعلمين المستقلين الراغبين في الانطلاق وتجربة المنظومة بمرونة تامة.',
    annualPlanTitle: 'الباقة السنوية الاحترافية (Enterprise)',
    annualPlanDesc: 'الخيار الأفضل لكبار المعلمين والسناتر للحصول على أقصى أداء مع توفير هائل.',
    mostPopular: 'الأكثر توفيراً وشعبية',
    freeTrialNote: 'ضمان استرجاع لمدة 14 يوماً مع دعم فني متواصل 24/7',
    perMonth: '/ شهرياً',
    perYear: '/ سنوياً',
    savingsBadge: 'وفر شهرين مجاناً',

    // Teacher Dashboard
    teacherDashTitle: 'لوحة إدارة غرفة المعلم والمحتوى',
    teacherDashSubtitle: 'متابعة تحصيل اشتراكات الطلاب، رفع المذكرات المشفرة، وإدارة الغرفة التعليمية',
    totalStudents: 'إجمالي الطلاب المسجلين',
    collectedFees: 'المبالغ المحصلة',
    pendingFees: 'مستحقات قيد الدفع',
    uploadedSheetsCount: 'المذكرات المحمية',
    uploadNewSheet: 'رفع مذكرة / شيت جديد',
    studentFeesTable: 'سجل تحصيل مدفوعات الطلاب',
    sheetsVault: 'خزينة الشيتات والمذكرات المحمية',
    shareRoomLink: 'مشاركة رابط غرفتي مع الطلاب',
    copyLinkSuccess: 'تم نسخ رابط الغرفة التعليمية بنجاح!',

    // Student Profile
    studentTitle: 'ملفي التعليمي والشيتات المحملة',
    studentSubtitle: 'متابعة المجموعات الدراسية المسجل بها، سداد الاشتراكات، وتحميل المذكرات الموثقة',
    myTeachers: 'المدرسون المشترك معهم',
    pendingPayments: 'رسوم بانتظار السداد',
    studyMaterials: 'المذكرات والشيتات المتاحة للتحميل',
    receiptNumber: 'رقم الإيصال المشفر',

    // Admin Dashboard
    adminTitle: 'لوحة التحكم والإدارة العامة (Super Admin)',
    adminSubtitle: 'مراقبة أداء المنظومة، الاشتراكات الفعالة، وسجلات الأمان والحماية المركزية',
    platformRevenue: 'إجمالي إيرادات المنصة',
    activeSubscriptions: 'الاشتراكات النشطة',
    systemHealth: 'حالة الخوادم والأمان',
    blockedAttacks: 'محاولات الاختراق المحجوبة',
    recentLogs: 'أحدث سجلات التدقيق الأمني',

    // System Settings
    settingsTitle: 'إعدادات النظام وخزينة بوابات الدفع',
    settingsSubtitle: 'التحكم في أسعار باقات المعلمين، وضع الصيانة، ومفاتيح API المشفرة',
    pricingSettings: 'تسعير باقات اشتراك المدرسين',
    languageSettings: 'لغة النظام الافتراضية',
    maintenanceMode: 'وضع الصيانة وإيقاف الوصول العام',
    paymentGateways: 'إعدادات بوابات الدفع الإلكتروني (فوري / فودافون كاش)',
    saveSettingsSuccess: 'تم حفظ جميع إعدادات النظام وتحديث الخزينة بنجاح',

    // Login & Sign Up
    loginTitle: 'تسجيل الدخول إلى Personal Assistant',
    loginSubtitle: 'أدخل بيانات حسابك للمتابعة إلى غرفتك التعليمية أو لوحتك الخاصة',
    emailLabel: 'البريد الإلكتروني',
    passwordLabel: 'كلمة المرور',
    selectRole: 'اختر نوع الحساب / الرتبة',
    noAccount: 'ليس لديك حساب بعد؟',
    haveAccount: 'لديك حساب بالفعل؟',
    createAccountTitle: 'إنشاء حساب جديد في المنظومة',
    createAccountSubtitle: 'انضم كمعلم لإنشاء غرفتك التعليمية أو كطالب لمتابعة دروسك وشيتاتك',
    fullNameLabel: 'الاسم بالكامل',
    phoneLabel: 'رقم الهاتف (لإشعارات فودافون وفوري)',
  },

  en: {
    // Common & Navigation
    brandName: 'Personal Assistant',
    brandTagline: 'Smart Educational Rooms & Assistant Platform',
    home: 'Home',
    directory: 'Teacher Directory',
    pricing: 'Pricing Plans',
    teacherRoom: 'Teacher Room',
    studentProfile: 'Student Profile',
    adminDashboard: 'Admin Panel',
    subscriptions: 'Subscriptions',
    settings: 'Settings',
    login: 'Login',
    signup: 'Sign Up',
    logout: 'Logout',
    testRole: 'Role Demo:',
    adminRole: 'Admin',
    teacherRole: 'Teacher',
    studentRole: 'Student',
    securityProtected: 'Security: 100% Hardened',
    securityLogsBtn: 'Audit Logs',
    maintenanceNotice: 'Notice: Maintenance mode is currently active by Super Admin. Public visitors are restricted.',
    langSwitchLabel: 'عربي',
    footerRights: 'Personal Assistant Platform - Smart Educational Rooms & Management',
    footerSecurity: 'Security Framework: OWASP Top 10 Compliant',
    footerEncryption: 'Payment Gateway Encryption: AES-256',
    footerVersion: 'Version 2.5.0',

    // Actions & General
    save: 'Save Changes',
    cancel: 'Cancel',
    delete: 'Delete',
    edit: 'Edit',
    view: 'View',
    download: 'Secure Download',
    payNow: 'Pay Fees Now',
    subscribeNow: 'Upgrade & Subscribe',
    search: 'Search...',
    filter: 'Filter',
    all: 'All',
    status: 'Status',
    actions: 'Actions',
    date: 'Date',
    amount: 'Amount',
    currency: 'EGP',
    active: 'Active',
    pending: 'Pending',
    paid: 'Paid & Verified',
    overdue: 'Overdue',
    clean: 'Clean & Verified',
    safe: 'Fully Safe',
    cleanScan: 'Security Scan: Clean & Malware-free',
    loading: 'Loading...',
    success: 'Success',
    error: 'An error occurred',
    close: 'Close',

    // Home Page
    heroBadge: 'Next-Gen Educational Assistant Platform',
    heroTitle1: 'Host Your Educational Room With Utmost',
    heroTitleHighlight: 'Security & Direct Revenue',
    heroTitle2: 'Zero Intermediaries & Zero Material Leaks',
    heroDescription: 'A premier cloud infrastructure bringing together teacher room management, student fee collection via Fawry & Vodafone Cash, and bulletproof sheet protection through encrypted watermarking.',
    startTeacherRoom: 'Launch Your Room Now',
    browseTeachers: 'Browse Certified Teachers',
    exploreFeatures: 'Explore All Features',
    statTeachers: 'Certified Teachers',
    statStudents: 'Active Students',
    statSheets: 'Protected Study Sheets',
    statSecurity: 'Leak & Intrusion Shield',
    
    featuresTitle: 'Tailor-Made Features For Modern Education',
    featuresSubtitle: 'An all-in-one suite covering digital content protection, automated accounting, and room management',
    tabTeachers: 'For Teachers & Tutors',
    tabStudents: 'For Students & Parents',
    tabAdmins: 'For Admins & Centers',
    
    calcTitle: 'Interactive Teacher Revenue Calculator',
    calcSubtitle: 'Calculate your projected net monthly and annual income with a fixed platform subscription',
    calcStudentsLabel: 'Enrolled students in your batches:',
    calcPriceLabel: 'Average monthly fee per student:',
    calcGrossRevenue: 'Total gross student revenue:',
    calcPlatformFee: 'Fixed platform subscription fee:',
    calcNetMonthly: 'Your estimated net monthly profit:',
    calcAnnualProfit: 'Projected annual net profit:',
    
    securityDemoTitle: 'Smart Watermark Anti-Leak Simulator',
    securityDemoSubtitle: 'Every sheet page is dynamically stamped with student name, verified phone, and encrypted tracking code',
    watermarkDemoLabel: 'Enter student info to test real-time watermarking:',
    watermarkDesc: 'Even if a student takes a screenshot or prints the document, their identity and encrypted trace are embedded.',
    
    fawryVerificationTitle: 'Fawry & Vodafone Cash Receipt Verifier',
    fawryVerificationSubtitle: 'Instant validation against forged receipts using HMAC-SHA256 digital signature verification',
    verifyCodePlaceholder: 'Enter transaction code (e.g. FAWRY-7829-4109)...',
    verifyBtn: 'Verify Receipt Authenticity',
    
    faqTitle: 'Frequently Asked Questions',
    faqSubtitle: 'Everything you need to know about rooms, payments, and security',

    // Directory
    directoryTitle: 'Certified Teachers & Instructors Directory',
    directorySubtitle: 'Browse top educators, join their interactive rooms, and access official verified study materials',
    searchTeacherPlaceholder: 'Search by teacher name, subject, or grade level...',
    filterSubject: 'Filter by Subject',
    filterGrade: 'Grade Level',
    enterRoom: 'Enter Teacher Room & Materials',
    verifiedTeacher: 'Certified & Verified Educator',

    // Pricing
    pricingTitle: 'Transparent Pricing For Teachers & Centers',
    pricingSubtitle: 'Invest in your independent teaching brand with zero hidden transaction commissions',
    monthlyPlanTitle: 'Pro Monthly Plan',
    monthlyPlanDesc: 'Ideal for individual tutors starting their independent digital room with full flexibility.',
    annualPlanTitle: 'Enterprise Annual Plan',
    annualPlanDesc: 'The ultimate choice for established educators & learning centers with maximal cost savings.',
    mostPopular: 'Most Popular & Best Value',
    freeTrialNote: '14-day money-back guarantee with dedicated 24/7 technical support',
    perMonth: '/ month',
    perYear: '/ year',
    savingsBadge: 'Save 2 Months Free',

    // Teacher Dashboard
    teacherDashTitle: 'Teacher Room & Content Management',
    teacherDashSubtitle: 'Track student fee settlements, upload encrypted sheets, and manage class access',
    totalStudents: 'Total Enrolled Students',
    collectedFees: 'Collected Fees',
    pendingFees: 'Pending Fees',
    uploadedSheetsCount: 'Protected Materials',
    uploadNewSheet: 'Upload New Study Sheet',
    studentFeesTable: 'Student Fee Settlement Ledger',
    sheetsVault: 'Encrypted Study Sheets Vault',
    shareRoomLink: 'Share Room Link With Students',
    copyLinkSuccess: 'Teacher room link copied to clipboard successfully!',

    // Student Profile
    studentTitle: 'My Learning Center & Downloaded Sheets',
    studentSubtitle: 'View enrolled teacher groups, settle monthly dues, and download authenticated study notes',
    myTeachers: 'Enrolled Teachers',
    pendingPayments: 'Pending Due Invoices',
    studyMaterials: 'Available Study Materials',
    receiptNumber: 'Encrypted Receipt #',

    // Admin Dashboard
    adminTitle: 'Super Admin Overview & Master Control',
    adminSubtitle: 'Monitor platform-wide health, active subscriptions, and real-time security audit trails',
    platformRevenue: 'Total Platform Revenue',
    activeSubscriptions: 'Active Subscriptions',
    systemHealth: 'Server Health & Uptime',
    blockedAttacks: 'Blocked Cyber Attacks',
    recentLogs: 'Real-Time Security Audit Logs',

    // System Settings
    settingsTitle: 'System Configuration & Payment Vault',
    settingsSubtitle: 'Configure teacher subscription fees, maintenance status, and encrypted API credentials',
    pricingSettings: 'Teacher Subscription Pricing',
    languageSettings: 'System Language',
    maintenanceMode: 'Maintenance Mode (Lockdown)',
    paymentGateways: 'Electronic Payment Gateways (Fawry / Vodafone Cash)',
    saveSettingsSuccess: 'All system settings and payment vault updated successfully',

    // Login & Sign Up
    loginTitle: 'Sign In to Personal Assistant',
    loginSubtitle: 'Enter your credentials to access your educational room or dashboard',
    emailLabel: 'Email Address',
    passwordLabel: 'Password',
    selectRole: 'Select Account Role',
    noAccount: "Don't have an account yet?",
    haveAccount: 'Already have an account?',
    createAccountTitle: 'Create New Account',
    createAccountSubtitle: 'Join as a teacher to launch your room or as a student to access lessons and materials',
    fullNameLabel: 'Full Name',
    phoneLabel: 'Phone Number (for SMS & Payment notifications)',
  }
};
