import React, { useState } from 'react';
import SmartBundle from './SmartBundle';
import DeliveryCalendar from './DeliveryCalendar';
import ComplaintCenter from './ComplaintCenter';
import BundleRecommendation from './BundleRecommendation';
import MobileBottomNav from './MobileBottomNav';
import NotificationToast from './NotificationToast';

const texts = {
  title: { en: 'Vendor Dashboard', hi: 'वेंडर डैशबोर्ड' },
  welcome: { en: 'Welcome', hi: 'आपका स्वागत है' },
  stallType: { en: 'Stall Type', hi: 'स्टॉल का प्रकार' },
  logout: { en: 'Logout', hi: 'लॉग आउट' },
  subscriptionActive: { en: "You have an active subscription!", hi: "आपकी एक सक्रिय सदस्यता है!" },
  quickActions: { en: 'Quick Actions', hi: 'त्वरित कार्य' },
  deliveryCalendar: { en: 'Delivery Calendar', hi: 'डिलीवरी कैलेंडर' },
  complaints: { en: 'Complaints', hi: 'शिकायतें' },
  backToDashboard: { en: 'Back to Dashboard', hi: 'डैशबोर्ड पर वापस' },
  aiSmartBundle: { en: 'AI Smart Bundle', hi: 'AI स्मार्ट बंडल' },
  monthlyMaterials: { en: 'Monthly materials recommendation', hi: 'मासिक सामग्री अनुशंसा' },
  orders: { en: 'Orders', hi: 'ऑर्डर' },
  profile: { en: 'Profile', hi: 'प्रोफाइल' },
  // Original repository texts
  vendorDashboard: { en: 'Vendor Dashboard', hi: 'वेंडर डैशबोर्ड' },
  perishablesWeekly: { en: 'Perishables (Weekly)', hi: 'नाशवान (साप्ताहिक)' },
  nonPerishablesMonthly: { en: 'Non-Perishables (Monthly)', hi: 'गैर-नाशवान (मासिक)' },
  totalEstimatedCost: { en: 'Total Estimated Cost:', hi: 'कुल अनुमानित लागत:' },
  customizeBundle: { en: 'Customize Bundle', hi: 'बंडल को कस्टमाइज़ करें' },
  tomorrow: { en: 'Tomorrow', hi: 'कल' },
  vegetables: { en: 'Vegetables', hi: 'सब्जियां' },
  confirmed: { en: 'Confirmed', hi: 'पुष्टि की गई' },
  spices: { en: 'Spices', hi: 'मसाले' },
  pending: { en: 'Pending', hi: 'लंबित' },
  viewFullCalendar: { en: 'View Full Calendar', hi: 'पूरा कैलेंडर देखें' },
  pauseDelivery: { en: 'Pause Delivery', hi: 'डिलीवरी रोकें' },
  pauseDescription: { en: 'Pause deliveries due to illness or closure', hi: 'बीमारी या बंद होने के कारण डिलीवरी रोकें' },
  oneDay: { en: '1 Day', hi: '1 दिन' },
  threeDays: { en: '3 Days', hi: '3 दिन' },
  oneWeek: { en: '1 Week', hi: '1 सप्ताह' },
  customDuration: { en: 'Custom Duration', hi: 'कस्टम अवधि' },
  complaintCenter: { en: 'Complaint Center', hi: 'शिकायत केंद्र' },
  reportDeliveryIssues: { en: 'Report delivery issues', hi: 'डिलीवरी की समस्याओं की रिपोर्ट करें' },
  open: { en: 'Open', hi: 'खुला' },
  resolved: { en: 'Resolved', hi: 'हल किया गया' },
  newComplaint: { en: 'New Complaint', hi: 'नई शिकायत' }
};

export default function VendorDashboard({ user, language, handleLogout, setLanguage }) {
  const [hasSubscription, setHasSubscription] = useState(false);
  const [currentView, setCurrentView] = useState('dashboard');
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [quantities, setQuantities] = useState({
    "potatoes": 10,
    "onions": 5,
    "greenChili": 1,
    "semolina": 5,
    "chaatMasala": 500,
    "oil": 2,
  });

  const handleBundleConfirm = (bundle) => {
    console.log("Confirmed Bundle:", bundle);
    setHasSubscription(true);
    setToast({
      show: true,
      message: language === 'hi' ? 'बंडल पुष्टि की गई! आपका आर्डर जल्द ही प्रोसेस होगा।' : 'Bundle confirmed! Your order will be processed soon.',
      type: 'success'
    });
    
    setTimeout(() => {
      setToast({ show: false, message: '', type: 'success' });
    }, 3000);
  };

  const adjustQuantity = (product, delta) => {
    setQuantities(prev => ({
      ...prev,
      [product]: Math.max(0, (prev[product] || 0) + delta)
    }));
  };

  const bundleItems = [
    { key: "potatoes", nameHi: "आलू", nameEn: "Potatoes", unit: "kg", category: "perishable" },
    { key: "onions", nameHi: "प्याज", nameEn: "Onions", unit: "kg", category: "perishable" },
    { key: "greenChili", nameHi: "हरी मिर्च", nameEn: "Green Chili", unit: "kg", category: "perishable" },
    { key: "semolina", nameHi: "सूजी", nameEn: "Semolina", unit: "kg", category: "non-perishable" },
    { key: "chaatMasala", nameHi: "चाट मसाला", nameEn: "Chaat Masala", unit: "g", category: "non-perishable" },
    { key: "oil", nameHi: "तेल", nameEn: "Oil", unit: "L", category: "non-perishable" },
  ];

  const perishableItems = bundleItems.filter(item => item.category === "perishable");
  const nonPerishableItems = bundleItems.filter(item => item.category === "non-perishable");

  const renderDashboard = () => (
    <div className="space-y-8">
      {/* AI Smart Bundle Recommendation */}
      <div className="bg-white card-shadow-lg rounded-xl overflow-hidden">
        <div className="p-6 border-b border-neutral-200">
          <div className="flex items-center">
            <div className="bg-blue-600 rounded-lg p-3 mr-4">
              <div className="text-white text-xl">🤖</div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-neutral-800">{texts.aiSmartBundle[language]}</h3>
              <p className="text-neutral-600 text-sm">{texts.monthlyMaterials[language]}</p>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Perishables */}
            <div className="bg-green-50 rounded-xl p-6 border border-green-200">
              <h4 className="font-semibold text-green-800 mb-4 flex items-center">
                <span className="mr-2">📅</span>
                {texts.perishablesWeekly[language]}
              </h4>
              <div className="space-y-3">
                {perishableItems.map((item) => (
                  <div key={item.key} className="flex justify-between items-center">
                    <span className="text-green-800">
                      {item.nameHi}
                    </span>
                    <div className="flex items-center">
                      <button
                        className="w-8 h-8 rounded-full bg-green-200 text-green-800 hover:bg-green-300 border border-green-300 flex items-center justify-center"
                        onClick={() => adjustQuantity(item.key, -1)}
                      >
                        <span className="text-sm font-bold">-</span>
                      </button>
                      <span className="mx-3 font-medium min-w-[60px] text-center">
                        {quantities[item.key]} {item.unit}
                      </span>
                      <button
                        className="w-8 h-8 rounded-full bg-green-200 text-green-800 hover:bg-green-300 border border-green-300 flex items-center justify-center"
                        onClick={() => adjustQuantity(item.key, 1)}
                      >
                        <span className="text-sm font-bold">+</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Non-Perishables */}
            <div className="bg-amber-50 rounded-xl p-6 border border-amber-200">
              <h4 className="font-semibold text-amber-800 mb-4 flex items-center">
                <span className="mr-2">📦</span>
                {texts.nonPerishablesMonthly[language]}
              </h4>
              <div className="space-y-3">
                {nonPerishableItems.map((item) => (
                  <div key={item.key} className="flex justify-between items-center">
                    <span className="text-amber-800">
                      {item.nameHi}
                    </span>
                    <div className="flex items-center">
                      <button
                        className="w-8 h-8 rounded-full bg-amber-200 text-amber-800 hover:bg-amber-300 border border-amber-300 flex items-center justify-center"
                        onClick={() => adjustQuantity(item.key, -1)}
                      >
                        <span className="text-sm font-bold">-</span>
                      </button>
                      <span className="mx-3 font-medium min-w-[60px] text-center">
                        {quantities[item.key]} {item.unit}
                      </span>
                      <button
                        className="w-8 h-8 rounded-full bg-amber-200 text-amber-800 hover:bg-amber-300 border border-amber-300 flex items-center justify-center"
                        onClick={() => adjustQuantity(item.key, 1)}
                      >
                        <span className="text-sm font-bold">+</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-neutral-800">
              {texts.totalEstimatedCost[language]}{" "}
              <span className="text-primary">₹2,450</span>
            </span>
            <div className="flex gap-2">
              <button 
                onClick={() => setCurrentView('bundle-recommendation')}
                className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
              >
                <span>✨</span>
                AI बंडल सुझाव
              </button>
              <button className="bg-primary hover:bg-emerald-600 text-white px-4 py-2 rounded-lg">
                {texts.customizeBundle[language]}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Delivery Calendar */}
        <div className="bg-white card-shadow-lg rounded-xl overflow-hidden">
          <div className="p-6 border-b border-neutral-200">
            <div className="flex items-center">
              <div className="bg-blue-100 rounded-lg p-3 mr-3">
                <span className="text-blue-600 text-xl">📅</span>
              </div>
              <span className="font-semibold text-neutral-800">{texts.deliveryCalendar[language]}</span>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <div>
                  <div className="font-medium text-green-800">{texts.tomorrow[language]}</div>
                  <div className="text-sm text-green-600">{texts.vegetables[language]}</div>
                </div>
                <span className="bg-green-600 text-white px-2 py-1 rounded-full text-xs">
                  {texts.confirmed[language]}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-amber-50 rounded-lg">
                <div>
                  <div className="font-medium text-amber-800">15 जन</div>
                  <div className="text-sm text-amber-600">{texts.spices[language]}</div>
                </div>
                <span className="bg-amber-600 text-white px-2 py-1 rounded-full text-xs">
                  {texts.pending[language]}
                </span>
              </div>
            </div>
            <button 
              onClick={() => setCurrentView('calendar')}
              className="w-full mt-4 text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              {texts.viewFullCalendar[language]}
            </button>
          </div>
        </div>

        {/* Pause Delivery */}
        <div className="bg-white card-shadow-lg rounded-xl overflow-hidden">
          <div className="p-6 border-b border-neutral-200">
            <div className="flex items-center">
              <div className="bg-orange-100 rounded-lg p-3 mr-3">
                <span className="text-orange-600 text-xl">⏸️</span>
              </div>
              <span className="font-semibold text-neutral-800">{texts.pauseDelivery[language]}</span>
            </div>
          </div>
          <div className="p-6">
            <p className="text-neutral-600 mb-4 text-sm">
              {texts.pauseDescription[language]}
            </p>
            <div className="space-y-2">
              <button className="w-full text-left p-2 border border-neutral-200 rounded text-sm hover:bg-neutral-50">
                {texts.oneDay[language]}
              </button>
              <button className="w-full text-left p-2 border border-neutral-200 rounded text-sm hover:bg-neutral-50">
                {texts.threeDays[language]}
              </button>
              <button className="w-full text-left p-2 border border-neutral-200 rounded text-sm hover:bg-neutral-50">
                {texts.oneWeek[language]}
              </button>
              <button className="w-full text-left p-2 border border-neutral-200 rounded text-sm text-blue-600 hover:bg-neutral-50">
                {texts.customDuration[language]}
              </button>
            </div>
          </div>
        </div>

        {/* Complaint Center */}
        <div className="bg-white card-shadow-lg rounded-xl overflow-hidden">
          <div className="p-6 border-b border-neutral-200">
            <div className="flex items-center">
              <div className="bg-red-100 rounded-lg p-3 mr-3">
                <span className="text-red-600 text-xl">⚠️</span>
              </div>
              <span className="font-semibold text-neutral-800">{texts.complaintCenter[language]}</span>
            </div>
          </div>
          <div className="p-6">
            <p className="text-neutral-600 mb-4 text-sm">
              {texts.reportDeliveryIssues[language]}
            </p>
            <div className="space-y-2">
              <div className="flex justify-between items-center p-2 bg-red-50 rounded">
                <span className="text-sm text-red-800">#C001</span>
                <span className="bg-red-200 text-red-800 px-2 py-1 rounded-full text-xs">
                  {texts.open[language]}
                </span>
              </div>
              <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                <span className="text-sm text-green-800">#C002</span>
                <span className="bg-green-200 text-green-800 px-2 py-1 rounded-full text-xs">
                  {texts.resolved[language]}
                </span>
              </div>
            </div>
            <button 
              onClick={() => setCurrentView('complaints')}
              className="w-full mt-4 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg"
            >
              {texts.newComplaint[language]}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderOrders = () => (
    <div className="bg-white card-shadow-lg rounded-xl p-6">
      <h2 className="text-xl font-semibold text-neutral-800 mb-6">{texts.orders[language]}</h2>
      <div className="text-center py-12">
        <div className="text-4xl mb-4">📦</div>
        <p className="text-neutral-500 text-lg">Orders feature coming soon!</p>
      </div>
    </div>
  );

  const renderProfile = () => (
    <div className="bg-white card-shadow-lg rounded-xl p-6">
      <h2 className="text-xl font-semibold text-neutral-800 mb-6">{texts.profile[language]}</h2>
      <div className="space-y-4">
        <div className="flex justify-between items-center p-4 bg-neutral-50 rounded-lg">
          <span className="font-medium text-neutral-700">Phone Number</span>
          <span className="text-neutral-600">{user.phone_number}</span>
        </div>
        <div className="flex justify-between items-center p-4 bg-neutral-50 rounded-lg">
          <span className="font-medium text-neutral-700">Stall Type</span>
          <span className="text-neutral-600">{user.stall_type}</span>
        </div>
        <div className="flex justify-between items-center p-4 bg-neutral-50 rounded-lg">
          <span className="font-medium text-neutral-700">Role</span>
          <span className="text-neutral-600">{user.role}</span>
        </div>
      </div>
    </div>
  );

  const renderCalendar = () => (
    <DeliveryCalendar user={user} language={language} handleLogout={handleLogout} />
  );

  const renderComplaints = () => (
    <ComplaintCenter user={user} language={language} handleLogout={handleLogout} />
  );

  const renderBundleRecommendation = () => (
    <BundleRecommendation 
      user={user} 
      language={language} 
      onBack={() => setCurrentView('dashboard')} 
    />
  );

  const getCurrentContent = () => {
    switch (currentView) {
      case 'dashboard':
        return renderDashboard();
      case 'orders':
        return renderOrders();
      case 'calendar':
        return renderCalendar();
      case 'complaints':
        return renderComplaints();
      case 'bundle-recommendation':
        return renderBundleRecommendation();
      case 'profile':
        return renderProfile();
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 pb-20 md:pb-0">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              {currentView !== 'dashboard' && (
                <button
                  onClick={() => setCurrentView('dashboard')}
                  className="text-accent hover:text-accent/80 font-medium flex items-center gap-2"
                >
                  <span>←</span>
                  <span>{texts.backToDashboard[language]}</span>
                </button>
              )}
              <h1 className="text-2xl font-bold text-neutral-800">
                {texts.vendorDashboard[language]}
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={handleLogout} 
                className="text-sm font-semibold text-neutral-600 hover:text-neutral-800 transition-colors"
              >
                {texts.logout[language]}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {getCurrentContent()}
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav 
        currentView={currentView} 
        setCurrentView={setCurrentView} 
        language={language} 
      />

      {/* Notification Toast */}
      <NotificationToast 
        show={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ show: false, message: '', type: 'success' })}
      />
    </div>
  );
} 