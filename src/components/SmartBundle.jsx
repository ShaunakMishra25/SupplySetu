import React, { useState, useMemo } from 'react';

// --- This is our "AI" Rule Engine ---
// It recommends products based on stall type.
const bundleRules = {
  "Chaat": [
    { id: 1, name: { en: 'Potatoes', hi: 'आलू' }, quantity: 20, unit: 'kg', category: 'perishable' },
    { id: 2, name: { en: 'Onions', hi: 'प्याज' }, quantity: 10, unit: 'kg', category: 'perishable' },
    { id: 3, name: { en: 'Tomatoes', hi: 'टमाटर' }, quantity: 5, unit: 'kg', category: 'perishable' },
    { id: 4, name: { en: 'Chickpeas (raw)', hi: 'काबुली चना' }, quantity: 5, unit: 'kg', category: 'non-perishable' },
    { id: 5, name: { en: 'Chaat Masala', hi: 'चाट मसाला' }, quantity: 1, unit: 'kg', category: 'non-perishable' },
  ],
  "Juice": [
    { id: 6, name: { en: 'Oranges', hi: 'संतरे' }, quantity: 15, unit: 'kg', category: 'perishable' },
    { id: 7, name: { en: 'Pineapples', hi: 'अनानास' }, quantity: 10, unit: 'piece', category: 'perishable' },
    { id: 8, name: { en: 'Sugar', hi: 'चीनी' }, quantity: 10, unit: 'kg', category: 'non-perishable' },
    { id: 9, name: { en: 'Ginger', hi: 'अदरक' }, quantity: 2, unit: 'kg', category: 'perishable' },
  ],
  "South Indian": [
    { id: 10, name: { en: 'Rice', hi: 'चावल' }, quantity: 25, unit: 'kg', category: 'non-perishable' },
    { id: 11, name: { en: 'Urad Dal', hi: 'उड़द दाल' }, quantity: 10, unit: 'kg', category: 'non-perishable' },
    { id: 2, name: { en: 'Onions', hi: 'प्याज' }, quantity: 15, unit: 'kg', category: 'perishable' },
    { id: 3, name: { en: 'Tomatoes', hi: 'टमाटर' }, quantity: 10, unit: 'kg', category: 'perishable' },
    { id: 12, name: { en: 'Sambar Masala', hi: 'सांबर मसाला' }, quantity: 2, unit: 'kg', category: 'non-perishable' },
  ],
   "Paratha": [
    { id: 13, name: { en: 'Wheat Flour (Atta)', hi: 'गेहूं का आटा' }, quantity: 25, unit: 'kg', category: 'non-perishable' },
    { id: 1, name: { en: 'Potatoes', hi: 'आलू' }, quantity: 15, unit: 'kg', category: 'perishable' },
    { id: 2, name: { en: 'Onions', hi: 'प्याज' }, quantity: 10, unit: 'kg', category: 'perishable' },
    { id: 14, name: { en: 'Cooking Oil', hi: 'खाना पकाने का तेल' }, quantity: 5, unit: 'litre', category: 'non-perishable' },
  ],
};

const texts = {
  title: { en: "AI Recommended Monthly Bundle", hi: "AI-अनुशंसित मासिक बंडल" },
  subtitle: { en: "Based on your stall type. Adjust quantities as needed.", hi: "आपके स्टॉल प्रकार के आधार पर। आवश्यकतानुसार मात्रा समायोजित करें।" },
  perishable: { en: "Perishables (Weekly Delivery)", hi: "नाशवान (साप्ताहिक डिलीवरी)" },
  non_perishable: { en: "Non-Perishables (Monthly Delivery)", hi: "गैर-नाशवान (मासिक डिलीवरी)" },
  confirm: { en: "Confirm & Find Suppliers", hi: "पुष्टि करें और सप्लायर खोजें" },
};

export default function SmartBundle({ user, language, onConfirm }) {
  const recommendedBundle = useMemo(() => bundleRules[user.stall_type] || [], [user.stall_type]);
  const [bundle, setBundle] = useState(recommendedBundle);

  const handleQuantityChange = (productId, amount) => {
    setBundle(currentBundle =>
      currentBundle.map(item =>
        item.id === productId
          ? { ...item, quantity: Math.max(0, item.quantity + amount) }
          : item
      )
    );
  };

  const perishables = bundle.filter(item => item.category === 'perishable');
  const nonPerishables = bundle.filter(item => item.category === 'non-perishable');

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg mt-6">
      <h2 className="text-xl font-bold text-gray-800">{texts.title[language]}</h2>
      <p className="text-gray-500 mt-1 mb-6">{texts.subtitle[language]}</p>

      {/* Perishables Section */}
      <div className="mb-6">
        <h3 className="font-semibold text-lg text-green-700 mb-3">{texts.perishable[language]}</h3>
        <div className="space-y-3">
          {perishables.map(item => (
            <div key={item.id} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
              <span className="font-medium text-gray-700">{item.name[language]}</span>
              <div className="flex items-center gap-3">
                <button onClick={() => handleQuantityChange(item.id, -1)} className="w-8 h-8 rounded-full bg-gray-200 text-lg font-bold hover:bg-gray-300">-</button>
                <span className="w-16 text-center font-semibold">{item.quantity} {item.unit}</span>
                <button onClick={() => handleQuantityChange(item.id, 1)} className="w-8 h-8 rounded-full bg-gray-200 text-lg font-bold hover:bg-gray-300">+</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Non-Perishables Section */}
      <div>
        <h3 className="font-semibold text-lg text-blue-700 mb-3">{texts.non_perishable[language]}</h3>
        <div className="space-y-3">
          {nonPerishables.map(item => (
             <div key={item.id} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
              <span className="font-medium text-gray-700">{item.name[language]}</span>
              <div className="flex items-center gap-3">
                <button onClick={() => handleQuantityChange(item.id, -1)} className="w-8 h-8 rounded-full bg-gray-200 text-lg font-bold hover:bg-gray-300">-</button>
                <span className="w-16 text-center font-semibold">{item.quantity} {item.unit}</span>
                <button onClick={() => handleQuantityChange(item.id, 1)} className="w-8 h-8 rounded-full bg-gray-200 text-lg font-bold hover:bg-gray-300">+</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <button onClick={() => onConfirm(bundle)} className="w-full mt-8 bg-indigo-600 text-white font-bold py-3 rounded-md hover:bg-indigo-700">
        {texts.confirm[language]}
      </button>
    </div>
  );
} 