import { useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';

const texts = {
  title: { en: 'Welcome to SupplySetu', hi: 'सप्लाईसेतु में आपका स्वागत है' },
  subtitle: { en: 'Connect with suppliers and manage your business', hi: 'सप्लायर्स से जुड़ें और अपना व्यवसाय प्रबंधित करें' },
  mobileLabel: { en: 'Enter Test Mobile Number', hi: 'टेस्ट मोबाइल नंबर दर्ज करें' },
  loginButton: { en: 'Login', hi: 'लॉग इन करें' },
  error: { en: 'User not found.', hi: 'उपयोगकर्ता नहीं मिला।' },
  toggleLang: { en: 'हिन्दी', hi: 'English' }
};

export default function LoginPage({ setUser, language, setLanguage }) {
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("phone_number", "==", phone));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        throw new Error("User not found");
      }

      const userData = querySnapshot.docs[0].data();
      const userId = querySnapshot.docs[0].id;
      setUser({ ...userData, id: userId });

    } catch (err) {
      setError(texts.error[language]);
      console.error("Login Error:", err);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex flex-col justify-center items-center p-4">
      

      {/* Main Login Card */}
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 border border-neutral-200">
        {/* Logo/Branding */}
        <div className="text-center mb-8">
          <div className="bg-gradient-to-r from-green-500 to-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <div className="text-white text-2xl font-bold">SS</div>
          </div>
          <h1 className="text-3xl font-bold text-neutral-800 mb-2">{texts.title[language]}</h1>
          <p className="text-neutral-600">{texts.subtitle[language]}</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="phone" className="block text-sm font-semibold text-neutral-700 mb-2">
              {texts.mobileLabel[language]}
            </label>
            <input 
              type="tel" 
              id="phone"
              value={phone} 
              onChange={(e) => setPhone(e.target.value)} 
              placeholder="1122334455" 
              required 
              className="w-full px-4 py-4 border border-neutral-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
            />
          </div>
          
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-red-600 text-sm text-center">{error}</p>
            </div>
          )}
          
          <button 
            type="submit" 
            disabled={loading} 
            className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-bold py-4 rounded-xl hover:from-green-600 hover:to-green-700 disabled:from-green-300 disabled:to-green-400 transition-all duration-200 text-lg shadow-lg hover:shadow-xl disabled:shadow-none"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Loading...
              </div>
            ) : (
              texts.loginButton[language]
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-sm text-neutral-500">
            {language === 'hi' ? 'Test Number: 1122334455' : 'Test Number: 1122334455'}
          </p>
        </div>
      </div>
    </div>
  );
} 