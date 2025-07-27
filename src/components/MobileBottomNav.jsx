import React from 'react';

const texts = {
  home: { en: 'Home', hi: 'होम' },
  orders: { en: 'Orders', hi: 'ऑर्डर' },
  calendar: { en: 'Calendar', hi: 'कैलेंडर' },
  profile: { en: 'Profile', hi: 'प्रोफाइल' }
};

export default function MobileBottomNav({ currentView, setCurrentView, language }) {
  const navItems = [
    { 
      id: 'dashboard', 
      icon: '🏠', 
      label: texts.home[language] 
    },
    { 
      id: 'orders', 
      icon: '📦', 
      label: texts.orders[language] 
    },
    { 
      id: 'calendar', 
      icon: '📅', 
      label: texts.calendar[language] 
    },
    { 
      id: 'profile', 
      icon: '👤', 
      label: texts.profile[language] 
    }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 md:hidden z-40">
      <div className="flex justify-around py-2">
        {navItems.map((item) => {
          const isActive = currentView === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={`flex flex-col items-center py-2 px-4 transition-colors ${
                isActive ? "text-blue-600" : "text-neutral-600"
              }`}
            >
              <span className="text-xl mb-1">{item.icon}</span>
              <span className="text-xs">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
} 