import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { HomePage } from './components/HomePage';
import { LoginPage } from './components/LoginPage';
import { SignUp } from './components/SignUp';
import { TeacherDashboard } from './components/TeacherDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { AdminSubscriptionLogs } from './components/AdminSubscriptionLogs';
import { SystemSettings } from './components/SystemSettings';
import { StudentProfile } from './components/StudentProfile';
import { TeacherDirectory } from './components/TeacherDirectory';
import { PricingPlans } from './components/PricingPlans';
import { SecurityShieldModal } from './components/SecurityShieldModal';
import { PaymentModal } from './components/PaymentModal';
import { MaintenanceScreen } from './components/MaintenanceScreen';
import { ShieldCheck, CheckCircle, AlertCircle, Info, ShieldAlert } from 'lucide-react';

const MainLayout: React.FC = () => {
  const { activePage, currentUser, systemSettings, toastMessage, dir, t, language } = useApp();

  // Handle maintenance mode
  const showMaintenance = systemSettings.maintenanceMode && currentUser?.role !== 'admin';

  return (
    <div 
      dir={dir} 
      className={`min-h-screen bg-[#050505] text-gray-100 flex flex-col selection:bg-blue-600 selection:text-white ${
        language === 'ar' ? 'font-sans' : 'font-sans'
      }`}
    >
      {/* Top Navbar */}
      <Navbar />

      {/* Main Routed Content */}
      <main className="flex-1">
        {showMaintenance ? (
          <MaintenanceScreen />
        ) : (
          <>
            {activePage === 'home' && <HomePage />}
            {activePage === 'directory' && <TeacherDirectory />}
            {activePage === 'login' && <LoginPage />}
            {activePage === 'signup' && <SignUp />}
            {activePage === 'teacher_dashboard' && <TeacherDashboard />}
            {activePage === 'admin_dashboard' && <AdminDashboard />}
            {activePage === 'admin_logs' && <AdminSubscriptionLogs />}
            {activePage === 'system_settings' && <SystemSettings />}
            {activePage === 'student_profile' && <StudentProfile />}
            {activePage === 'pricing' && <PricingPlans />}
          </>
        )}
      </main>

      {/* Global Modals */}
      <SecurityShieldModal />
      <PaymentModal />

      {/* Global Toast Notification */}
      {toastMessage && (
        <div 
          className={`fixed bottom-6 z-50 animate-bounce ${dir === 'rtl' ? 'left-6' : 'right-6'}`} 
          dir={dir}
        >
          <div className={`px-4 py-3 rounded-2xl shadow-2xl border flex items-center gap-2.5 text-xs sm:text-sm font-bold backdrop-blur-md ${
            toastMessage.type === 'success' 
              ? 'bg-emerald-950/90 text-emerald-300 border-emerald-500/40' 
              : toastMessage.type === 'error'
              ? 'bg-red-950/90 text-red-300 border-red-500/40'
              : toastMessage.type === 'security'
              ? 'bg-blue-950/90 text-blue-300 border-blue-500/40'
              : 'bg-gray-900/90 text-gray-200 border-gray-700'
          }`}>
            {toastMessage.type === 'success' && <CheckCircle size={18} className="text-emerald-400 shrink-0" />}
            {toastMessage.type === 'error' && <AlertCircle size={18} className="text-red-400 shrink-0" />}
            {toastMessage.type === 'security' && <ShieldCheck size={18} className="text-blue-400 shrink-0" />}
            {toastMessage.type === 'info' && <Info size={18} className="text-gray-400 shrink-0" />}
            <span>{toastMessage.text}</span>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-gray-900 bg-[#080808] py-6 px-4 text-center text-xs text-gray-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <ShieldCheck size={16} className="text-emerald-500" />
            <span>{t.footerRights}</span>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-gray-600">
            <span>{t.footerSecurity}</span>
            <span>•</span>
            <span>{t.footerEncryption}</span>
            <span>•</span>
            <span>{t.footerVersion}</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
