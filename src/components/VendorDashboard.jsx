import React, { useState } from 'react';
import SmartBundle from './SmartBundle'; // Import the new component

const texts = {
  title: { en: 'My Dashboard', hi: 'मेरा डैशबोर्ड' },
  welcome: { en: 'Welcome', hi: 'आपका स्वागत है' },
  stallType: { en: 'Stall Type', hi: 'स्टॉल का प्रकार' },
  logout: { en: 'Logout', hi: 'लॉग आउट' },
  subscriptionActive: { en: "You have an active subscription!", hi: "आपकी एक सक्रिय सदस्यता है!" },
};

export default function VendorDashboard({ user, language, handleLogout }) {
  // We'll use this state to track if a vendor has confirmed their bundle
  const [hasSubscription, setHasSubscription] = useState(false);

  const handleBundleConfirm = (bundle) => {
    console.log("Confirmed Bundle:", bundle);
    // In a real app, we would save this to the database
    // For now, we'll just update the UI
    setHasSubscription(true);
    alert("Bundle confirmed! Next, we'll show you suppliers.");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 font-sans">
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">{texts.title[language]}</h1>
          <button onClick={handleLogout} className="text-sm font-semibold text-indigo-600 hover:text-indigo-500">
            {texts.logout[language]}
          </button>
        </header>

        <main>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold text-gray-700">
              {texts.welcome[language]}, {user.phone_number}
            </h2>
            <p className="text-gray-500 mt-1">
              {texts.stallType[language]}: <span className="font-bold text-indigo-600">{user.stall_type}</span>
            </p>
          </div>

          {/* Conditional Rendering: Show bundle or success message */}
          {hasSubscription ? (
            <div className="mt-6 text-center p-8 bg-green-100 text-green-800 rounded-lg">
              <p className="text-lg font-semibold">{texts.subscriptionActive[language]}</p>
            </div>
          ) : (
            <SmartBundle user={user} language={language} onConfirm={handleBundleConfirm} />
          )}
        </main>
      </div>
    </div>
  );
} 