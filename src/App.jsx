import { useState } from 'react';
import LoginPage from './components/LoginPage';
import OnboardingPage from './components/OnboardingPage';
import VendorDashboard from './components/VendorDashboard';
import SupplierDashboard from './components/SupplierDashboard';
import LanguageToggle from './components/LanguageToggle';

export default function App() {
  const [user, setUser] = useState(null);
  const [language, setLanguage] = useState('hi');

  const handleLogout = () => setUser(null);

  return (
    <div className="relative">
      {/* Global Language Toggle - only show when user is logged in */}
      {user && <LanguageToggle language={language} setLanguage={setLanguage} />}
      
      {!user ? (
        <LoginPage setUser={setUser} language={language} setLanguage={setLanguage} />
      ) : user.role === 'vendor' && !user.stall_type ? (
        <OnboardingPage user={user} setUser={setUser} language={language} handleLogout={handleLogout} />
      ) : user.role === 'vendor' ? (
        <VendorDashboard user={user} language={language} handleLogout={handleLogout} setLanguage={setLanguage} />
      ) : user.role === 'supplier' ? (
        <SupplierDashboard user={user} language={language} handleLogout={handleLogout} />
      ) : (
        <LoginPage setUser={setUser} language={language} setLanguage={setLanguage} />
      )}
    </div>
  );
}
