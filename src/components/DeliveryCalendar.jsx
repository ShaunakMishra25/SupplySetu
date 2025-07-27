import React, { useState } from 'react';

const texts = {
  title: { en: 'Delivery Calendar', hi: 'डिलीवरी कैलेंडर' },
  back: { en: 'Back', hi: 'वापस' },
  noDeliveries: { en: 'No deliveries scheduled', hi: 'कोई डिलीवरी निर्धारित नहीं' },
  status: {
    confirmed: { en: 'Confirmed', hi: 'पुष्टि की गई' },
    pending: { en: 'Pending', hi: 'लंबित' },
    inTransit: { en: 'In Transit', hi: 'परिवहन में' },
    delivered: { en: 'Delivered', hi: 'पहुंचाया गया' }
  },
  type: {
    perishable: { en: 'Perishable', hi: 'नाशवान' },
    nonPerishable: { en: 'Non-Perishable', hi: 'गैर-नाशवान' }
  },
  legend: { en: 'Legend', hi: 'चिह्न' }
};

const monthNames = {
  en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  hi: ["जनवरी", "फरवरी", "मार्च", "अप्रैल", "मई", "जून", "जुलाई", "अगस्त", "सितंबर", "अक्टूबर", "नवंबर", "दिसंबर"]
};

const dayNames = {
  en: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  hi: ["रवि", "सोम", "मंगल", "बुध", "गुरु", "शुक्र", "शनि"]
};

export default function DeliveryCalendar({ user, language, handleLogout }) {
  const [currentDate, setCurrentDate] = useState(new Date());

  // Mock delivery data
  const deliveries = {
    3: [{ type: "perishable", status: "confirmed", supplier: "राम सप्लायर्स" }],
    10: [{ type: "perishable", status: "confirmed", supplier: "राम सप्लायर्स" }],
    15: [{ type: "non-perishable", status: "pending", supplier: "श्याम स्टोर्स" }],
    17: [{ type: "perishable", status: "confirmed", supplier: "राम सप्लायर्स" }],
    24: [{ type: "perishable", status: "confirmed", supplier: "राम सप्लायर्स" }],
    31: [{ type: "perishable", status: "in-transit", supplier: "राम सप्लायर्स" }],
  };

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const navigateMonth = (direction) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const getDeliveryForDay = (day) => {
    return deliveries[day] || [];
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed": return "bg-green-100 text-green-800";
      case "pending": return "bg-amber-100 text-amber-800";
      case "in-transit": return "bg-blue-100 text-blue-800";
      case "delivered": return "bg-neutral-100 text-neutral-800";
      default: return "bg-neutral-100 text-neutral-800";
    }
  };

  const getTypeIcon = (type) => {
    return type === "perishable" ? "🥬" : "📦";
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);

  return (
    <div className="min-h-screen bg-neutral-50 pb-20 md:pb-0">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-neutral-800">{texts.title[language]}</h1>
            <button onClick={handleLogout} className="text-sm font-semibold text-neutral-600 hover:text-neutral-800 transition-colors">
              {texts.logout[language]}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white card-shadow-lg rounded-xl p-6">
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-8">
            <button 
              onClick={() => navigateMonth('prev')}
              className="p-3 hover:bg-neutral-100 rounded-lg transition-colors"
            >
              <span className="text-xl">←</span>
            </button>
            <h2 className="text-2xl font-bold text-neutral-800">
              {monthNames[language][currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
            <button 
              onClick={() => navigateMonth('next')}
              className="p-3 hover:bg-neutral-100 rounded-lg transition-colors"
            >
              <span className="text-xl">→</span>
            </button>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-2 mb-6">
            {dayNames[language].map(day => (
              <div key={day} className="p-3 text-center text-sm font-semibold text-neutral-600 bg-neutral-50 rounded-lg">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2">
            {/* Empty cells for first day offset */}
            {Array.from({ length: firstDay }, (_, i) => (
              <div key={`empty-${i}`} className="h-24 bg-neutral-50 rounded-lg"></div>
            ))}

            {/* Calendar days */}
            {Array.from({ length: daysInMonth }, (_, i) => {
              const day = i + 1;
              const dayDeliveries = getDeliveryForDay(day);
              
              return (
                <div key={day} className="h-24 border border-neutral-200 rounded-lg p-2 relative hover:border-neutral-300 transition-colors">
                  <div className="text-sm font-semibold text-neutral-700 mb-1">{day}</div>
                  
                  {dayDeliveries.map((delivery, index) => (
                    <div key={index} className="text-xs p-1 rounded mb-1">
                      <div className="flex items-center gap-1">
                        <span className="text-lg">{getTypeIcon(delivery.type)}</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(delivery.status)}`}>
                          {texts.status[delivery.status]?.[language] || delivery.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="mt-8 p-6 bg-neutral-50 rounded-xl">
            <h3 className="font-semibold text-lg text-neutral-800 mb-4">{texts.legend[language]}</h3>
            <div className="grid grid-cols-2 gap-6 text-sm">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🥬</span>
                <div>
                  <div className="font-medium">{texts.type.perishable[language]}</div>
                  <div className="text-neutral-600">Weekly delivery</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">📦</span>
                <div>
                  <div className="font-medium">{texts.type.nonPerishable[language]}</div>
                  <div className="text-neutral-600">Monthly delivery</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 