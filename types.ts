export type UserRole = 'admin' | 'teacher' | 'student' | 'guest';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
  subject?: string;
  grade?: string;
  plan?: 'Monthly' | 'Annual' | 'Free';
  status: 'Active' | 'Pending' | 'Expired' | 'Suspended';
  createdAt: string;
}

export interface StudentFeeRecord {
  id: string;
  studentId: string;
  studentName: string;
  teacherId: string;
  teacherName: string;
  subject: string;
  amount: number;
  currency: string;
  status: 'Paid' | 'Pending' | 'Overdue';
  paymentDate: string;
  paymentMethod?: 'Fawry' | 'Vodafone Cash' | 'Credit Card' | 'Cash';
  receiptToken?: string;
}

export interface StudySheet {
  id: string;
  teacherId: string;
  teacherName: string;
  title: string;
  subject: string;
  grade: string;
  fileSize: string;
  fileType: string;
  uploadDate: string;
  downloadCount: number;
  isPaidOnly: boolean;
  securityHash: string; // Simulated SHA-256 integrity hash
  scanStatus: 'Clean' | 'Scanning' | 'Suspicious';
}

export interface SubscriptionLog {
  id: string;
  teacherId: string;
  teacherName: string;
  plan: 'شهري (Monthly)' | 'سنوي (Annual)';
  amount: number;
  currency: string;
  method: 'بطاقة ائتمان' | 'فودافون كاش' | 'فوري';
  date: string;
  status: 'Completed' | 'Refunded' | 'Failed';
  transactionId: string;
}

export interface PaymentGatewayConfig {
  fawryMerchantId: string;
  fawrySecurityKeyMasked: string;
  vodafoneWalletNumber: string;
  vodafoneApiSecretMasked: string;
  isFawryActive: boolean;
  isVodafoneActive: boolean;
  isStripeActive: boolean;
  isTestMode: boolean;
}

export interface SystemPricing {
  monthlyTeacherFee: number;
  annualTeacherFee: number;
  currency: string;
}

export interface SystemSettingsState {
  pricing: SystemPricing;
  language: 'ar' | 'en';
  maintenanceMode: boolean;
  allowNewRegistrations: boolean;
  autoEmailInvoices: boolean;
  autoSmsReminders: boolean;
  strictAccessControl: boolean;
  antiTamperValidation: boolean;
  gateways: PaymentGatewayConfig;
}

export interface SecurityAuditLog {
  id: string;
  timestamp: string;
  action: string;
  userEmail: string;
  userRole: string;
  ipAddress: string;
  level: 'INFO' | 'WARNING' | 'SECURE' | 'BLOCKED';
  details: string;
}

export interface SecurityVulnerabilityItem {
  id: string;
  title: string;
  category: string;
  riskLevel: 'CRITICAL' | 'HIGH' | 'MEDIUM';
  description: string;
  fixedMechanism: string;
  status: 'RESOLVED' | 'ACTIVE';
}
