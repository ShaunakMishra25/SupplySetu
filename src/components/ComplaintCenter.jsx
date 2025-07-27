import React, { useState } from 'react';

const texts = {
  title: { en: 'Complaint Center', hi: 'शिकायत केंद्र' },
  newComplaint: { en: 'New Complaint', hi: 'नई शिकायत' },
  submit: { en: 'Submit', hi: 'जमा करें' },
  cancel: { en: 'Cancel', hi: 'रद्द करें' },
  complaintTitle: { en: 'Complaint Title', hi: 'शिकायत का शीर्षक' },
  description: { en: 'Description', hi: 'विवरण' },
  orderId: { en: 'Order ID', hi: 'ऑर्डर आईडी' },
  status: {
    open: { en: 'Open', hi: 'खुला' },
    inProgress: { en: 'In Progress', hi: 'प्रगति में' },
    resolved: { en: 'Resolved', hi: 'समाधान' },
    closed: { en: 'Closed', hi: 'बंद' }
  },
  noComplaints: { en: 'No complaints yet', hi: 'अभी तक कोई शिकायत नहीं' },
  yourComplaints: { en: 'Your Complaints', hi: 'आपकी शिकायतें' },
  response: { en: 'Response', hi: 'जवाब' },
  logout: { en: 'Logout', hi: 'लॉग आउट' }
};

export default function ComplaintCenter({ user, language, handleLogout }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newComplaint, setNewComplaint] = useState({
    title: "",
    description: "",
    orderId: ""
  });

  // Mock complaints data
  const complaints = [
    {
      id: "C001",
      title: "देर से डिलिवरी",
      description: "आलू की डिलिवरी दो घंटे देर से आई",
      status: "open",
      createdAt: "2024-01-26T10:00:00Z",
      orderId: "ORD001",
      response: null
    },
    {
      id: "C002", 
      title: "खराब गुणवत्ता",
      description: "प्याज की गुणवत्ता अच्छी नहीं थी",
      status: "resolved",
      createdAt: "2024-01-25T14:30:00Z",
      orderId: "ORD002",
      response: "माफी चाहते हैं। अगली डिलिवरी में बेहतर गुणवत्ता का ध्यान रखेंगे।"
    },
    {
      id: "C003",
      title: "गलत मात्रा",
      description: "5kg चाट मसाला ऑर्डर किया था, केवल 3kg मिला",
      status: "inProgress",
      createdAt: "2024-01-24T09:15:00Z",
      orderId: "ORD003",
      response: "समस्या की जांच की जा रही है।"
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "open": return "bg-red-100 text-red-800";
      case "inProgress": return "bg-amber-100 text-amber-800";
      case "resolved": return "bg-green-100 text-green-800";
      case "closed": return "bg-neutral-100 text-neutral-800";
      default: return "bg-neutral-100 text-neutral-800";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "open": return "⚠️";
      case "inProgress": return "⏳";
      case "resolved": return "✅";
      case "closed": return "✅";
      default: return "💬";
    }
  };

  const getStatusText = (status) => {
    return texts.status[status]?.[language] || status;
  };

  const handleSubmitComplaint = () => {
    console.log("New complaint:", newComplaint);
    alert("Complaint submitted successfully!");
    setNewComplaint({ title: "", description: "", orderId: "" });
    setIsDialogOpen(false);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString(language === 'hi' ? 'hi-IN' : 'en-US');
  };

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
        <div className="space-y-6">
          {/* New Complaint Button */}
          <div className="bg-white card-shadow-lg rounded-xl p-6">
            <button
              onClick={() => setIsDialogOpen(true)}
              className="w-full btn-accent text-lg font-semibold py-4 rounded-xl hover:scale-[1.02] transition-transform"
            >
              {texts.newComplaint[language]}
            </button>
          </div>

          {/* Complaints List */}
          <div className="bg-white card-shadow-lg rounded-xl p-6">
            <h2 className="text-xl font-semibold text-neutral-800 mb-6">{texts.yourComplaints[language]}</h2>
            
            {complaints.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-4xl mb-4">📝</div>
                <p className="text-neutral-500 text-lg">{texts.noComplaints[language]}</p>
              </div>
            ) : (
              <div className="space-y-4">
                {complaints.map(complaint => (
                  <div key={complaint.id} className="border border-neutral-200 rounded-xl p-6 hover:border-neutral-300 transition-colors">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="font-semibold text-lg text-neutral-800">{complaint.title}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(complaint.status)}`}>
                        {getStatusIcon(complaint.status)} {getStatusText(complaint.status)}
                      </span>
                    </div>
                    
                    <p className="text-neutral-600 mb-4 text-base">{complaint.description}</p>
                    
                    <div className="text-sm text-neutral-500 mb-4">
                      Order ID: <span className="font-medium">{complaint.orderId}</span> • {formatDate(complaint.createdAt)}
                    </div>
                    
                    {complaint.response && (
                      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <p className="text-sm font-medium text-blue-800 mb-2">{texts.response[language]}:</p>
                        <p className="text-sm text-blue-700">{complaint.response}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* New Complaint Dialog */}
        {isDialogOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-md">
              <h2 className="text-xl font-semibold text-neutral-800 mb-6">{texts.newComplaint[language]}</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    {texts.complaintTitle[language]}
                  </label>
                  <input
                    type="text"
                    value={newComplaint.title}
                    onChange={(e) => setNewComplaint(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder={language === 'hi' ? 'शिकायत का शीर्षक दर्ज करें' : 'Enter complaint title'}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    {texts.description[language]}
                  </label>
                  <textarea
                    value={newComplaint.description}
                    onChange={(e) => setNewComplaint(prev => ({ ...prev, description: e.target.value }))}
                    rows={4}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder={language === 'hi' ? 'विवरण दर्ज करें' : 'Enter description'}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    {texts.orderId[language]}
                  </label>
                  <input
                    type="text"
                    value={newComplaint.orderId}
                    onChange={(e) => setNewComplaint(prev => ({ ...prev, orderId: e.target.value }))}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder={language === 'hi' ? 'ऑर्डर आईडी दर्ज करें' : 'Enter order ID'}
                  />
                </div>
              </div>
              
              <div className="flex gap-4 mt-8">
                <button
                  onClick={() => setIsDialogOpen(false)}
                  className="flex-1 px-4 py-3 border border-neutral-300 rounded-lg text-neutral-700 hover:bg-neutral-50 transition-colors font-medium"
                >
                  {texts.cancel[language]}
                </button>
                <button
                  onClick={handleSubmitComplaint}
                  className="flex-1 px-4 py-3 btn-accent rounded-lg font-medium"
                >
                  {texts.submit[language]}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 