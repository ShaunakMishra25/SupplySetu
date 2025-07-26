import { useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';

const texts = {
  title: { en: 'Welcome to SupplySetu', hi: 'सप्लाईसेतु में आपका स्वागत है' },
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
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
      <div className="absolute top-4 right-4">
        <button onClick={() => setLanguage(l => l === 'hi' ? 'en' : 'hi')} className="bg-white text-indigo-600 font-semibold py-2 px-4 border rounded-md shadow-sm">
          {texts.toggleLang[language]}
        </button>
      </div>
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-900">{texts.title[language]}</h1>
        <form onSubmit={handleLogin} className="mt-8 space-y-6">
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">{texts.mobileLabel[language]}</label>
            <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="1122334455" required className="mt-1 block w-full px-4 py-3 border-gray-300 rounded-md shadow-sm"/>
          </div>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <button type="submit" disabled={loading} className="w-full bg-indigo-600 text-white font-bold py-3 rounded-md hover:bg-indigo-700 disabled:bg-indigo-400">
            {loading ? '...' : texts.loginButton[language]}
          </button>
        </form>
      </div>
    </div>
  );
} 