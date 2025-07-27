import { useState } from 'react';
import { db } from '../firebaseConfig';
import { doc, updateDoc } from 'firebase/firestore';

const texts = {
  welcome: { en: 'Welcome', hi: 'आपका स्वागत है' },
  title: { en: 'What type of stall do you run?', hi: 'आप किस तरह का स्टॉल चलाते हैं?' },
  subtitle: { en: 'Select one to get started.', hi: 'शुरू करने के लिए एक चुनें।'},
  stalls: { 
    'Chaat': { en: 'Chaat', hi: 'चाट' },
    'Juice': { en: 'Juice', hi: 'जूस' },
    'South Indian': { en: 'South Indian', hi: 'साउथ इंडियन' },
    'Paratha': { en: 'Paratha', hi: 'पराठा' } 
  },
  saving: { en: 'Saving...', hi: 'सेव किया जा रहा है...' },
  logout: { en: 'Logout', hi: 'लॉग आउट' }
};

export default function OnboardingPage({ user, setUser, language, handleLogout }) {
  const [loading, setLoading] = useState(false);

  const handleStallSelect = async (stallType) => {
    if (!user) return;
    setLoading(true);
    const userDocRef = doc(db, "users", user.id);
    try {
      await updateDoc(userDocRef, { stall_type: stallType });
      setUser({ ...user, stall_type: stallType });
    } catch (error) {
      console.error("Error updating stall type:", error);
      alert("Could not save your stall type. Please try again.");
    }
    setLoading(false);
  };

  const stallIcons = {
    'Chaat': '🥘',
    'Juice': '🥤',
    'South Indian': '🍛',
    'Paratha': '🥟'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex flex-col items-center p-4 font-sans">
      <div className="w-full max-w-2xl mx-auto">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-neutral-200 rounded-t-2xl">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-neutral-800">
                {texts.welcome[language]}, {user.phone_number}!
              </h2>
              <button 
                onClick={handleLogout} 
                className="text-sm font-semibold text-neutral-600 hover:text-neutral-800 transition-colors"
              >
                {texts.logout[language]}
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-b-2xl shadow-2xl p-8 text-center border border-neutral-200">
          {/* Logo/Branding */}
          <div className="mb-8">
            <div className="bg-gradient-to-r from-green-500 to-blue-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <div className="text-white text-3xl font-bold">SS</div>
            </div>
            <h1 className="text-3xl font-bold text-neutral-800 mb-3">{texts.title[language]}</h1>
            <p className="text-neutral-600 text-lg">{texts.subtitle[language]}</p>
          </div>

          {/* Stall Selection Grid */}
          <div className="grid grid-cols-2 gap-6 mb-8">
            {Object.keys(texts.stalls).map((stallKey) => (
              <button 
                key={stallKey} 
                disabled={loading} 
                onClick={() => handleStallSelect(stallKey)}
                className="p-8 bg-gradient-to-br from-neutral-50 to-neutral-100 border-2 border-neutral-200 rounded-2xl text-neutral-800 font-bold text-xl hover:border-green-400 hover:from-green-50 hover:to-green-100 focus:outline-none focus:ring-4 focus:ring-green-200 disabled:opacity-50 transition-all duration-200 group"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                  {stallIcons[stallKey]}
                </div>
                <div className="font-semibold">{texts.stalls[stallKey][language]}</div>
              </button>
            ))}
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center space-x-2 text-neutral-600">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-green-600"></div>
              <span className="text-lg">{texts.saving[language]}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 