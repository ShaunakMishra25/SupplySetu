import { useState } from 'react';
import LoginPage from './components/LoginPage';
import OnboardingPage from './components/OnboardingPage';
import VendorDashboard from './components/VendorDashboard';
import SupplierDashboard from './components/SupplierDashboard';

export default function App() {
  const [user, setUser] = useState(null);
  const [language, setLanguage] = useState('hi');

  const handleLogout = () => setUser(null);

  if (!user) {
    return <LoginPage setUser={setUser} language={language} setLanguage={setLanguage} />;
  }

  if (user.role === 'vendor' && !user.stall_type) {
    return <OnboardingPage user={user} setUser={setUser} language={language} handleLogout={handleLogout} />;
  }

  if (user.role === 'vendor') {
    return <VendorDashboard user={user} language={language} handleLogout={handleLogout} />;
  }

  if (user.role === 'supplier') {
    return <SupplierDashboard user={user} language={language} handleLogout={handleLogout} />;
  }

  return <LoginPage setUser={setUser} language={language} setLanguage={setLanguage} />;
}
