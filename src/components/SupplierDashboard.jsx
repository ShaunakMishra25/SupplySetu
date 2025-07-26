import React from 'react';

const texts = {
  title: { en: 'Supplier Dashboard', hi: 'आपूर्तिकर्ता डैशबोर्ड' },
  welcome: { en: 'Welcome', hi: 'आपका स्वागत है' },
  logout: { en: 'Logout', hi: 'लॉग आउट' },
  comingSoon: { en: 'Supplier features coming soon!', hi: 'आपूर्तिकर्ता सुविधाएं जल्द ही आ रही हैं!' }
};

export default function SupplierDashboard({ user, language, handleLogout }) {
  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 font-sans">
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">{texts.title[language]}</h1>
          <button onClick={handleLogout} className="text-sm font-semibold text-indigo-600 hover:text-indigo-500">
            {texts.logout[language]}
          </button>
        </header>

        <main className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold text-gray-700">
            {texts.welcome[language]}, {user.phone_number}
          </h2>
          
          <div className="mt-8 text-center p-8 bg-gray-50 rounded-lg">
            <p className="text-lg text-gray-600">{texts.comingSoon[language]}</p>
          </div>
        </main>
      </div>
    </div>
  );
} 