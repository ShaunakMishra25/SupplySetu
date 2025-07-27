import React, { useState, useEffect } from 'react';
import NotificationToast from './NotificationToast';
import { generateSmartBundles, getSeasonalBundles } from '../lib/aiServices';

const texts = {
  title: { en: 'Smart Bundle Recommendations', hi: 'स्मार्ट बंडल सिफारिशें' },
  aiPowered: { en: 'AI Powered', hi: 'AI द्वारा संचालित' },
  aiInsights: { en: 'AI Smart Recommendation', hi: 'AI स्मार्ट रिकमेंडेशन' },
  aiDescription: { en: 'Our AI suggests these bundles based on your stall type, season, and market trends. These bundles will help increase your sales and reduce costs.', hi: 'हमारा AI आपके स्टॉल टाइप, मौसम, और बाज़ार के ट्रेंड्स को देखकर ये बंडल सुझा रहा है। ये बंडल आपकी बिक्री बढ़ाने और कॉस्ट कम करने में मदद करेंगे।' },
  moreProfit: { en: '30% More Profit', hi: '30% ज़्यादा प्रॉफिट' },
  bestSelling: { en: 'Best Selling Items', hi: 'बेस्ट सेलिंग आइटम्स' },
  optimizedDelivery: { en: 'Optimized Delivery', hi: 'ऑप्टिमाइज़्ड डिलिवरी' },
  aiSuggestion: { en: 'AI Suggestion:', hi: 'AI सुझाव:' },
  quickSpoil: { en: 'Quick Spoil', hi: 'जल्दी खराब' },
  longLasting: { en: 'Long Lasting', hi: 'लंबे समय तक' },
  customize: { en: 'Customize', hi: 'कस्टमाइज़ करें' },
  order: { en: 'Order', hi: 'ऑर्डर करें' },
  cancel: { en: 'Cancel', hi: 'रद्द करें' },
  noRecommendations: { en: 'No recommendations available', hi: 'कोई सिफारिश उपलब्ध नहीं' },
  noRecommendationsDesc: { en: 'Complete your profile so AI can provide better suggestions.', hi: 'अपनी प्रोफाइल को कंप्लीट करें ताकि AI बेहतर सुझाव दे सके।' },
  updateProfile: { en: 'Update Profile', hi: 'प्रोफाइल अपडेट करें' },
  loadingTitle: { en: 'AI is finding the best bundles for you...', hi: 'AI आपके लिए सबसे अच्छे बंडल ढूंढ रहा है...' },
  loadingDesc: { en: 'Based on your stall type and business needs', hi: 'आपके स्टॉल टाइप और बिज़नेस की ज़रूरतों के आधार पर' },
  backToDashboard: { en: 'Back to Dashboard', hi: 'डैशबोर्ड पर वापस' }
};

export default function BundleRecommendation({ user, language, onBack }) {
  const [toast, setToast] = useState({ show: false, message: "" });
  const [recommendations, setRecommendations] = useState([]);
  const [selectedBundle, setSelectedBundle] = useState(null);
  const [customQuantities, setCustomQuantities] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadRecommendations = async () => {
      setIsLoading(true);
      
      // Simulate AI processing time
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Get the user's stall type
      const stallType = user?.stall_type || 'Chaat';
      
      // Generate smart bundles
      const smartBundles = generateSmartBundles(stallType);
      const seasonalBundles = getSeasonalBundles(stallType, 'winter'); // Current season
      
      // Combine and deduplicate
      const allBundles = [...smartBundles, ...seasonalBundles.slice(0, 1)];
      setRecommendations(allBundles);
      setIsLoading(false);
    };

    loadRecommendations();
  }, [user]);

  const adjustQuantity = (productId, delta) => {
    setCustomQuantities(prev => ({
      ...prev,
      [productId]: Math.max(0, (prev[productId] || 0) + delta)
    }));
  };

  const getCustomTotal = (bundle) => {
    if (!selectedBundle || selectedBundle.id !== bundle.id) return bundle.totalPrice;
    
    return bundle.products.reduce((total, product) => {
      const customQty = customQuantities[product.id] || product.quantity;
      const unitPrice = product.estimatedPrice / product.quantity;
      return total + (customQty * unitPrice);
    }, 0);
  };

  const handleSelectBundle = (bundle) => {
    setSelectedBundle(bundle);
    // Initialize custom quantities with default values
    const initialQuantities = {};
    bundle.products.forEach(product => {
      initialQuantities[product.id] = product.quantity;
    });
    setCustomQuantities(initialQuantities);
  };

  const handleOrderBundle = (bundle) => {
    setToast({ 
      show: true, 
      message: `बंडल "${bundle.nameHindi}" ऑर्डर किया गया! आपका आर्डर जल्द ही प्रोसेस होगा।` 
    });
    
    // Here you would normally send the order to the backend
    setTimeout(() => {
      onBack();
    }, 2000);
  };

  const getFrequencyBadge = (frequency) => {
    const colors = {
      daily: 'bg-blue-100 text-blue-800',
      weekly: 'bg-green-100 text-green-800',
      monthly: 'bg-amber-100 text-amber-800'
    };
    
    const labels = {
      daily: 'रोज़ाना',
      weekly: 'साप्ताहिक',
      monthly: 'मासिक'
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[frequency] || colors.weekly}`}>
        <span className="mr-1">⏰</span>
        {labels[frequency] || labels.weekly}
      </span>
    );
  };

  const getCategoryBadge = (category) => {
    return category === 'perishable' ? (
      <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
        <span className="mr-1">🚚</span>
        जल्दी खराब
      </span>
    ) : (
      <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
        लंबे समय तक
      </span>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-50 pb-20 md:pb-0">
        <div className="bg-white shadow-sm border-b border-neutral-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <button
                  onClick={onBack}
                  className="mr-4 p-2 hover:bg-neutral-100 rounded-lg"
                >
                  <span>←</span>
                </button>
                <h1 className="text-2xl font-bold text-neutral-800">
                  स्मार्ट बंडल सिफारिशें
                </h1>
              </div>
            </div>
          </div>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <div className="text-6xl mb-4 animate-pulse">🧠</div>
            <h3 className="text-lg font-semibold text-neutral-600 mb-2">
              {texts.loadingTitle[language]}
            </h3>
            <p className="text-neutral-500">
              {texts.loadingDesc[language]}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 pb-20 md:pb-0">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={onBack}
                className="mr-4 p-2 hover:bg-neutral-100 rounded-lg"
              >
                <span>←</span>
              </button>
              <h1 className="text-2xl font-bold text-neutral-800">
                {texts.title[language]}
              </h1>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-amber-500">✨</span>
              <span className="text-sm text-neutral-600">{texts.aiPowered[language]}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* AI Insights Banner */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-6 mb-8">
          <div className="flex items-start">
            <div className="text-3xl mr-4 mt-1">🧠</div>
            <div>
              <h3 className="font-semibold text-blue-800 mb-2">{texts.aiInsights[language]}</h3>
              <p className="text-blue-700 text-sm mb-3">
                {texts.aiDescription[language]}
              </p>
              <div className="flex items-center gap-4 text-xs text-blue-600">
                <span className="flex items-center gap-1">
                  <span>📈</span>
                  {texts.moreProfit[language]}
                </span>
                <span className="flex items-center gap-1">
                  <span>⭐</span>
                  {texts.bestSelling[language]}
                </span>
                <span className="flex items-center gap-1">
                  <span>⏰</span>
                  {texts.optimizedDelivery[language]}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bundle Recommendations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {recommendations.map((bundle) => (
            <div key={bundle.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold mb-1">{bundle.nameHindi}</h3>
                    <p className="text-emerald-100 text-sm">{bundle.name}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">₹{Math.round(getCustomTotal(bundle))}</div>
                    {getFrequencyBadge(bundle.deliveryFrequency)}
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                {/* AI Reasoning */}
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4">
                  <h4 className="font-semibold text-amber-800 text-sm mb-1 flex items-center gap-1">
                    <span>✨</span>
                    {texts.aiSuggestion[language]}:
                  </h4>
                  <p className="text-amber-700 text-sm">{bundle.reasoningHindi}</p>
                </div>
                
                {/* Products List */}
                <div className="space-y-3 mb-6">
                  {bundle.products.map((product) => (
                    <div key={product.id} className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-neutral-800">{product.nameHindi}</span>
                          {getCategoryBadge(product.category)}
                        </div>
                        <p className="text-sm text-neutral-600">{product.name}</p>
                        <p className="text-xs text-neutral-500">
                          ₹{product.estimatedPrice} / {product.quantity} {product.unit}
                        </p>
                      </div>
                      
                      {/* Quantity Adjuster (only for selected bundle) */}
                      {selectedBundle?.id === bundle.id && (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => adjustQuantity(product.id, -1)}
                            className="h-6 w-6 p-0 border border-neutral-300 rounded hover:bg-neutral-100 flex items-center justify-center"
                          >
                            <span className="text-sm">-</span>
                          </button>
                          <span className="w-8 text-center text-sm font-medium">
                            {customQuantities[product.id] || product.quantity}
                          </span>
                          <button
                            onClick={() => adjustQuantity(product.id, 1)}
                            className="h-6 w-6 p-0 border border-neutral-300 rounded hover:bg-neutral-100 flex items-center justify-center"
                          >
                            <span className="text-sm">+</span>
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                
                {/* Action Buttons */}
                <div className="flex gap-3">
                  {selectedBundle?.id === bundle.id ? (
                    <>
                      <button
                        onClick={() => setSelectedBundle(null)}
                        className="flex-1 px-4 py-2 border border-neutral-300 rounded-lg hover:bg-neutral-50"
                      >
                        {texts.cancel[language]}
                      </button>
                      <button
                        onClick={() => handleOrderBundle(bundle)}
                        className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg"
                      >
                        <span className="mr-2">🛒</span>
                        {texts.order[language]}
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleSelectBundle(bundle)}
                        className="flex-1 px-4 py-2 border border-neutral-300 rounded-lg hover:bg-neutral-50"
                      >
                        {texts.customize[language]}
                      </button>
                      <button
                        onClick={() => handleOrderBundle(bundle)}
                        className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg"
                      >
                        <span className="mr-2">🛒</span>
                        {texts.order[language]}
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {recommendations.length === 0 && (
          <div className="bg-white rounded-xl shadow-lg text-center py-12">
            <div className="text-5xl mb-4">🧠</div>
            <h3 className="text-lg font-semibold text-neutral-600 mb-2">
              {texts.noRecommendations[language]}
            </h3>
            <p className="text-neutral-500 mb-6">
              {texts.noRecommendationsDesc[language]}
            </p>
            <button onClick={onBack} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
              {texts.updateProfile[language]}
            </button>
          </div>
        )}
      </div>

      <NotificationToast
        show={toast.show}
        message={toast.message}
        onClose={() => setToast({ show: false, message: "" })}
      />
    </div>
  );
} 