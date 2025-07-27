import React, { useState, useMemo } from 'react';

// This is our "AI" Rule Engine. We can add prices here later.
const bundleRules = {
  "Chaat": [
    { id: 1, name: { en: 'Potatoes', hi: 'आलू' }, quantity: 10, unit: 'kg', category: 'perishable' },
    { id: 2, name: { en: 'Onions', hi: 'प्याज' }, quantity: 5, unit: 'kg', category: 'perishable' },
    { id: 3, name: { en: 'Green Chillies', hi: 'हरी मिर्च' }, quantity: 1, unit: 'kg', category: 'perishable' },
    { id: 4, name: { en: 'Semolina', hi: 'सूजी' }, quantity: 5, unit: 'kg', category: 'non-perishable' },
    { id: 5, name: { en: 'Chaat Masala', hi: 'चाट मसाला' }, quantity: 0.5, unit: 'kg', category: 'non-perishable' },
    { id: 14, name: { en: 'Cooking Oil', hi: 'तेल' }, quantity: 2, unit: 'L', category: 'non-perishable' },
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
  title: { en: "AI Smart Bundle Recommendations", hi: "AI स्मार्ट बंडल अनुशंसाएं" },
  subtitle: { en: "Monthly materials for", hi: "के लिए मासिक सामग्री" },
  perishables: { en: "Perishables (Weekly)", hi: "नाशवान (साप्ताहिक)" },
  non_perishables: { en: "Non-Perishables (Monthly)", hi: "गैर-नाशवान (मासिक)" },
  totalCost: { en: "Total Estimated Cost:", hi: "कुल अनुमानित लागत:" },
  customize: { en: "Customize Bundle", hi: "बंडल को कस्टमाइज़ करें" },
  confirm: { en: "Confirm & Subscribe", hi: "पुष्टि करें और सब्सक्राइब करें" },
};

export default function SmartBundle({ user, language, onConfirm }) {
  const initialBundle = useMemo(() => bundleRules[user.stall_type] || [], [user.stall_type]);
  const [bundle, setBundle] = useState(initialBundle);

  const handleQuantityChange = (productId, amount) => {
    setBundle(currentBundle =>
      currentBundle.map(item =>
        item.id === productId
          ? { ...item, quantity: Math.max(0, item.quantity + amount) }
          : item
      ).filter(item => item.quantity > 0) // Optional: remove item if quantity is 0
    );
  };

  const perishables = bundle.filter(item => item.category === 'perishable');
  const nonPerishables = bundle.filter(item => item.category === 'non-perishable');

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
        <div className="flex justify-between items-start mb-6">
            <div>
                <h2 className="text-xl font-bold text-gray-800">{texts.title[language]}</h2>
                <p className="text-gray-500">{texts.subtitle[language]} {user.stall_type}</p>
            </div>
            <div className="flex items-center gap-2">
                <button className="px-4 py-2 text-sm font-semibold text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100">✨ {texts.customize[language]}</button>
            </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
            {/* Perishables Card */}
            <div className="bg-green-50/50 p-4 rounded-xl border border-green-200">
                <h3 className="font-semibold text-green-800 mb-4">{texts.perishables[language]}</h3>
                <div className="space-y-3">
                    {perishables.map(item => (
                        <ItemRow key={item.id} item={item} language={language} onQuantityChange={handleQuantityChange} />
                    ))}
                </div>
            </div>

            {/* Non-Perishables Card */}
            <div className="bg-amber-50/50 p-4 rounded-xl border border-amber-200">
                <h3 className="font-semibold text-amber-800 mb-4">{texts.non_perishables[language]}</h3>
                <div className="space-y-3">
                    {nonPerishables.map(item => (
                        <ItemRow key={item.id} item={item} language={language} onQuantityChange={handleQuantityChange} />
                    ))}
                </div>
            </div>
        </div>
        
        <div className="flex justify-between items-center mt-6 pt-6 border-t">
            <div>
                <span className="text-gray-600">{texts.totalCost[language]}</span>
                <span className="text-2xl font-bold text-gray-900 ml-2">₹2,450</span> 
                {/* Note: The cost is hardcoded for now. We can make it dynamic later if we have time. */}
            </div>
            <button onClick={() => onConfirm(bundle)} className="px-6 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 shadow-lg">
                {texts.confirm[language]}
            </button>
        </div>
    </div>
  );
}

// A new sub-component to keep the main component clean
function ItemRow({ item, language, onQuantityChange }) {
    return (
        <div className="flex justify-between items-center">
            <span className="font-medium text-gray-700">{item.name[language]}</span>
            <div className="flex items-center gap-3 bg-white border rounded-lg p-1">
                <button onClick={() => onQuantityChange(item.id, -1)} className="w-7 h-7 rounded-md text-xl font-bold hover:bg-gray-100">-</button>
                <span className="w-20 text-center font-semibold text-sm">{item.quantity} {item.unit}</span>
                <button onClick={() => onQuantityChange(item.id, 1)} className="w-7 h-7 rounded-md text-xl font-bold hover:bg-gray-100">+</button>
            </div>
        </div>
    );
} 