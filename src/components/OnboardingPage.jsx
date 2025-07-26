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
      await updateDoc(userDocRef, {
        stall_type: stallType
      });
      setUser({ ...user, stall_type: stallType });
    } catch (error) {
      console.error("Error updating stall type:", error);
      alert("Could not save your stall type. Please try again.");
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-4 font-sans">
      <div className="w-full max-w-lg mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-bold text-gray-800">
            {texts.welcome[language]}, {user.phone_number}!
          </h2>
          <button onClick={handleLogout} className="text-sm font-semibold text-indigo-600 hover:text-indigo-500">
             {texts.logout[language]}
          </button>
        </header>
        
        <main className="bg-white p-8 rounded-xl shadow-lg text-center">
          <h1 className="text-2xl font-bold text-gray-900">{texts.title[language]}</h1>
          <p className="text-gray-500 mt-2 mb-6">{texts.subtitle[language]}</p>
          
          <div className="grid grid-cols-2 gap-4">
            {Object.keys(texts.stalls).map((stallKey) => (
              <button
                key={stallKey}
                disabled={loading}
                onClick={() => handleStallSelect(stallKey)}
                className="p-6 bg-indigo-50 border-2 border-transparent rounded-lg text-indigo-800 font-bold text-lg hover:border-indigo-500 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition-colors"
              >
                {texts.stalls[stallKey][language]}
              </button>
            ))}
          </div>

          {loading && <p className="mt-4 text-gray-600 animate-pulse">{texts.saving[language]}</p>}
        </main>
      </div>
    </div>
  );
} 