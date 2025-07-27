import React, { useState } from 'react';

const texts = {
  title: { en: 'Supplier Dashboard', hi: 'सप्लायर डैशबोर्ड' },
  subtitle: { en: 'Manage your business and track orders', hi: 'अपना व्यवसाय प्रबंधित करें और ऑर्डर ट्रैक करें' },
  logout: { en: 'Logout', hi: 'लॉग आउट' },
  productManagement: { en: 'Product Management', hi: 'उत्पाद प्रबंधन' },
  addProduct: { en: 'Add Product', hi: 'उत्पाद जोड़ें' },
  incomingOrders: { en: 'Incoming Orders', hi: 'आने वाले ऑर्डर' },
  deliverySchedule: { en: 'Delivery Schedule', hi: 'डिलीवरी शेड्यूल' },
  fresh: { en: 'Fresh', hi: 'ताजा' },
  blurred: { en: 'Blurred', hi: 'धुंधला' },
  lowQuality: { en: 'Low Quality', hi: 'कम गुणवत्ता' },
  stock: { en: 'Stock', hi: 'स्टॉक' },
  new: { en: 'New', hi: 'नया' },
  accept: { en: 'Accept', hi: 'स्वीकार करें' },
  decline: { en: 'Decline', hi: 'अस्वीकार करें' },
  update: { en: 'Update', hi: 'अपडेट करें' },
  today: { en: 'Today', hi: 'आज' },
  deliveries: { en: 'deliveries', hi: 'डिलीवरी' },
  clickToViewSchedule: { en: 'Click to view detailed schedule', hi: 'विस्तृत शेड्यूल देखने के लिए क्लिक करें' }
};

export default function SupplierDashboard({ user, language, handleLogout }) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  
  const [newProduct, setNewProduct] = useState({
    name: "",
    nameHindi: "",
    category: "",
    price: "",
    unit: "",
    stockLevel: "",
    description: "",
    descriptionHindi: "",
    imageUrl: "",
    freshnessStatus: "fresh"
  });

  // Mock products data
  const [products, setProducts] = useState([
    {
      id: "1",
      name: "Potatoes",
      nameHindi: "आलू",
      category: "perishable",
      price: "20.00",
      unit: "kg",
      stockLevel: 100,
      description: "Fresh farm potatoes",
      descriptionHindi: "ताज़े खेत के आलू",
      freshnessStatus: "fresh",
      imageUrl: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop"
    },
    {
      id: "2",
      name: "Green Chili",
      nameHindi: "हरी मिर्च",
      category: "perishable",
      price: "80.00",
      unit: "kg",
      stockLevel: 25,
      description: "Fresh green chilies",
      descriptionHindi: "ताज़ी हरी मिर्च",
      freshnessStatus: "fresh",
      imageUrl: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&h=300&fit=crop"
    },
    {
      id: "3",
      name: "Chaat Masala",
      nameHindi: "चाट मसाला",
      category: "non_perishable",
      price: "300.00",
      unit: "kg",
      stockLevel: 50,
      description: "Premium chaat masala blend",
      descriptionHindi: "प्रीमियम चाट मसाला मिश्रण",
      freshnessStatus: "blurred",
      imageUrl: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&h=300&fit=crop"
    }
  ]);

  // Mock orders data
  const [orders] = useState([
    {
      id: "ORD001",
      vendorName: "राम चाट स्टॉल",
      items: ["आलू 10kg", "हरी मिर्च 2kg"],
      total: "₹400",
      status: "new",
      date: "2024-01-26"
    },
    {
      id: "ORD002",
      vendorName: "श्याम जूस सेंटर",
      items: ["संतरे 15kg", "अनानास 5kg"],
      total: "₹800",
      status: "accepted",
      date: "2024-01-25"
    }
  ]);

  const getFreshnessColor = (status) => {
    switch (status) {
      case "fresh": return "bg-green-100 text-green-800";
      case "blurred": return "bg-amber-100 text-amber-800";
      case "low_quality": return "bg-red-100 text-red-800";
      default: return "bg-neutral-100 text-neutral-800";
    }
  };

  const getFreshnessIcon = (status) => {
    switch (status) {
      case "fresh": return "✅";
      case "blurred": return "⚠️";
      case "low_quality": return "❌";
      default: return "❓";
    }
  };

  const getCategoryColor = (category) => {
    return category === "perishable" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800";
  };

  const getCategoryText = (category) => {
    return category === "perishable" ? "Perishable" : "Non-Perishable";
  };

  const handleSubmitProduct = () => {
    if (editingProduct) {
      setProducts(products.map(p => p.id === editingProduct.id ? { ...newProduct, id: p.id } : p));
      setEditingProduct(null);
    } else {
      setProducts([...products, { ...newProduct, id: Date.now().toString() }]);
    }
    setNewProduct({
      name: "", nameHindi: "", category: "", price: "", unit: "", 
      stockLevel: "", description: "", descriptionHindi: "", imageUrl: "", freshnessStatus: "fresh"
    });
    setIsAddDialogOpen(false);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setNewProduct(product);
    setIsAddDialogOpen(true);
  };

  const handleDeleteProduct = (productId) => {
    setProducts(products.filter(p => p.id !== productId));
  };

  const handleOrderAction = (orderId, action) => {
    console.log(`${action} order ${orderId}`);
    // In real app, this would update the order status
  };

  return (
    <div className="min-h-screen bg-neutral-50 pb-20 md:pb-0">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div>
              <h1 className="text-2xl font-bold text-neutral-800">{texts.title[language]}</h1>
              <p className="text-neutral-600 text-sm">{texts.subtitle[language]}</p>
            </div>
            <button 
              onClick={handleLogout} 
              className="text-sm font-semibold text-neutral-600 hover:text-neutral-800 transition-colors"
            >
              {texts.logout[language]}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Product Management */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-neutral-800">{texts.productManagement[language]}</h2>
                <button
                  onClick={() => setIsAddDialogOpen(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {texts.addProduct[language]}
                </button>
              </div>

              <div className="space-y-4">
                {products.map(product => (
                  <div key={product.id} className="border border-neutral-200 rounded-lg p-4 hover:border-neutral-300 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <img 
                          src={product.imageUrl} 
                          alt={product.name}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div>
                          <h3 className="font-semibold text-neutral-800">{product.name}</h3>
                          <p className="text-neutral-600 text-sm">{product.nameHindi}</p>
                          <div className="flex gap-2 mt-1">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(product.category)}`}>
                              {getCategoryText(product.category)}
                            </span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getFreshnessColor(product.freshnessStatus)}`}>
                              {getFreshnessIcon(product.freshnessStatus)} {texts[product.freshnessStatus]?.[language] || product.freshnessStatus}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-neutral-800">₹{product.price}/{product.unit}</p>
                        <p className="text-sm text-neutral-600">{texts.stock[language]}: {product.stockLevel}</p>
                        <div className="flex gap-2 mt-2">
                          <button
                            onClick={() => handleEditProduct(product)}
                            className="text-blue-600 hover:text-blue-800 text-sm"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(product.id)}
                            className="text-red-600 hover:text-red-800 text-sm"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Incoming Orders */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-neutral-800 mb-4">{texts.incomingOrders[language]}</h3>
              <div className="space-y-3">
                {orders.map(order => (
                  <div key={order.id} className="border border-neutral-200 rounded-lg p-3">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-medium text-neutral-800">{order.vendorName}</p>
                        <p className="text-sm text-neutral-600">{order.items.join(', ')}</p>
                        <p className="text-sm font-semibold text-neutral-800">{order.total}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        order.status === 'new' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {texts[order.status]?.[language] || order.status}
                      </span>
                    </div>
                    {order.status === 'new' && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleOrderAction(order.id, 'accept')}
                          className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                        >
                          {texts.accept[language]}
                        </button>
                        <button
                          onClick={() => handleOrderAction(order.id, 'decline')}
                          className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                        >
                          {texts.decline[language]}
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery Schedule */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-neutral-800 mb-4">{texts.deliverySchedule[language]}</h3>
              <div className="text-center py-8">
                <div className="text-3xl font-bold text-blue-600 mb-2">5</div>
                <p className="text-neutral-600">{texts.deliveries[language]}</p>
                <p className="text-sm text-neutral-500 mt-2">{texts.clickToViewSchedule[language]}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add/Edit Product Dialog */}
      {isAddDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold text-neutral-800 mb-6">
              {editingProduct ? 'Edit Product' : 'Add Product'}
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Name (English)</label>
                <input
                  type="text"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Name (Hindi)</label>
                <input
                  type="text"
                  value={newProduct.nameHindi}
                  onChange={(e) => setNewProduct(prev => ({ ...prev, nameHindi: e.target.value }))}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Category</label>
                <select
                  value={newProduct.category}
                  onChange={(e) => setNewProduct(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select category</option>
                  <option value="perishable">Perishable</option>
                  <option value="non_perishable">Non-Perishable</option>
                </select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Price</label>
                  <input
                    type="number"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct(prev => ({ ...prev, price: e.target.value }))}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Unit</label>
                  <input
                    type="text"
                    value={newProduct.unit}
                    onChange={(e) => setNewProduct(prev => ({ ...prev, unit: e.target.value }))}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex gap-4 mt-8">
              <button
                onClick={() => setIsAddDialogOpen(false)}
                className="flex-1 px-4 py-3 border border-neutral-300 rounded-lg text-neutral-700 hover:bg-neutral-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitProduct}
                className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {editingProduct ? 'Update' : 'Add'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 