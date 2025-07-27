// AI Services for SupplySetu
// This file contains AI-powered features like freshness detection and bundle recommendations

// Smart bundle recommendations based on stall type and historical data
export function generateSmartBundles(stallType) {
  const bundles = {
    'Chaat': [
      {
        id: 'chaat-basic',
        name: 'Basic Chaat Bundle',
        nameHindi: 'बेसिक चाट बंडल',
        products: [
          {
            id: 'potato',
            name: 'Potatoes',
            nameHindi: 'आलू',
            category: 'perishable',
            quantity: 10,
            unit: 'kg',
            estimatedPrice: 200
          },
          {
            id: 'onion',
            name: 'Onions',
            nameHindi: 'प्याज',
            category: 'perishable',
            quantity: 5,
            unit: 'kg',
            estimatedPrice: 150
          },
          {
            id: 'chaat-masala',
            name: 'Chaat Masala',
            nameHindi: 'चाट मसाला',
            category: 'non_perishable',
            quantity: 1,
            unit: 'kg',
            estimatedPrice: 300
          },
          {
            id: 'green-chutney',
            name: 'Green Chutney Ingredients',
            nameHindi: 'हरी चटनी सामग्री',
            category: 'perishable',
            quantity: 2,
            unit: 'kg',
            estimatedPrice: 100
          }
        ],
        totalPrice: 750,
        deliveryFrequency: 'weekly',
        reasoning: 'Based on typical chaat stall requirements',
        reasoningHindi: 'चाट स्टॉल की सामान्य आवश्यकताओं के आधार पर'
      }
    ],
    'Juice': [
      {
        id: 'juice-basic',
        name: 'Fresh Juice Bundle',
        nameHindi: 'ताजा जूस बंडल',
        products: [
          {
            id: 'oranges',
            name: 'Oranges',
            nameHindi: 'संतरे',
            category: 'perishable',
            quantity: 15,
            unit: 'kg',
            estimatedPrice: 450
          },
          {
            id: 'pineapples',
            name: 'Pineapples',
            nameHindi: 'अनानास',
            category: 'perishable',
            quantity: 10,
            unit: 'piece',
            estimatedPrice: 300
          },
          {
            id: 'sugar',
            name: 'Sugar',
            nameHindi: 'चीनी',
            category: 'non_perishable',
            quantity: 10,
            unit: 'kg',
            estimatedPrice: 400
          },
          {
            id: 'ginger',
            name: 'Ginger',
            nameHindi: 'अदरक',
            category: 'perishable',
            quantity: 2,
            unit: 'kg',
            estimatedPrice: 120
          }
        ],
        totalPrice: 1270,
        deliveryFrequency: 'weekly',
        reasoning: 'Optimized for fresh juice production',
        reasoningHindi: 'ताजा जूस उत्पादन के लिए अनुकूलित'
      }
    ],
    'South Indian': [
      {
        id: 'south-indian-basic',
        name: 'South Indian Essentials',
        nameHindi: 'साउथ इंडियन आवश्यकताएं',
        products: [
          {
            id: 'rice',
            name: 'Rice',
            nameHindi: 'चावल',
            category: 'non_perishable',
            quantity: 25,
            unit: 'kg',
            estimatedPrice: 1000
          },
          {
            id: 'urad-dal',
            name: 'Urad Dal',
            nameHindi: 'उड़द दाल',
            category: 'non_perishable',
            quantity: 10,
            unit: 'kg',
            estimatedPrice: 800
          },
          {
            id: 'onion',
            name: 'Onions',
            nameHindi: 'प्याज',
            category: 'perishable',
            quantity: 15,
            unit: 'kg',
            estimatedPrice: 450
          },
          {
            id: 'sambar-masala',
            name: 'Sambar Masala',
            nameHindi: 'सांबर मसाला',
            category: 'non_perishable',
            quantity: 2,
            unit: 'kg',
            estimatedPrice: 400
          }
        ],
        totalPrice: 2650,
        deliveryFrequency: 'monthly',
        reasoning: 'Complete South Indian kitchen essentials',
        reasoningHindi: 'पूर्ण साउथ इंडियन रसोई आवश्यकताएं'
      }
    ],
    'Paratha': [
      {
        id: 'paratha-basic',
        name: 'Paratha Essentials',
        nameHindi: 'पराठा आवश्यकताएं',
        products: [
          {
            id: 'wheat-flour',
            name: 'Wheat Flour (Atta)',
            nameHindi: 'गेहूं का आटा',
            category: 'non_perishable',
            quantity: 25,
            unit: 'kg',
            estimatedPrice: 750
          },
          {
            id: 'potato',
            name: 'Potatoes',
            nameHindi: 'आलू',
            category: 'perishable',
            quantity: 15,
            unit: 'kg',
            estimatedPrice: 300
          },
          {
            id: 'onion',
            name: 'Onions',
            nameHindi: 'प्याज',
            category: 'perishable',
            quantity: 10,
            unit: 'kg',
            estimatedPrice: 300
          },
          {
            id: 'cooking-oil',
            name: 'Cooking Oil',
            nameHindi: 'खाना पकाने का तेल',
            category: 'non_perishable',
            quantity: 5,
            unit: 'litre',
            estimatedPrice: 500
          }
        ],
        totalPrice: 1850,
        deliveryFrequency: 'monthly',
        reasoning: 'Essential ingredients for paratha making',
        reasoningHindi: 'पराठा बनाने के लिए आवश्यक सामग्री'
      }
    ]
  };

  return bundles[stallType] || [];
}

// Simulate AI freshness detection based on image analysis
export async function analyzeImageFreshness(imageUrl) {
  // Simulate AI processing delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Mock AI analysis - in real implementation this would call a computer vision API
  const mockResults = [
    {
      status: 'fresh',
      confidence: 0.92,
      description: 'Products appear fresh with good color and texture',
      recommendations: ['Store in cool, dry place', 'Use within 3-5 days']
    },
    {
      status: 'moderate',
      confidence: 0.78,
      description: 'Products show some signs of aging but still good quality',
      recommendations: ['Use soon', 'Check for soft spots', 'Store properly']
    },
    {
      status: 'poor',
      confidence: 0.85,
      description: 'Products show significant deterioration',
      recommendations: ['Do not sell', 'Check storage conditions', 'Improve supply chain timing']
    }
  ];
  
  // Randomly select result for demo (in real app, this would be based on actual image analysis)
  return mockResults[Math.floor(Math.random() * mockResults.length)];
}

// Get seasonal bundle recommendations
export function getSeasonalBundles(stallType, season = 'winter') {
  const seasonalProducts = {
    'winter': {
      'Chaat': [
        { name: 'Sweet Potatoes', nameHindi: 'शकरकंद', quantity: 8, unit: 'kg', price: 240 },
        { name: 'Peanuts', nameHindi: 'मूंगफली', quantity: 3, unit: 'kg', price: 180 }
      ],
      'Juice': [
        { name: 'Carrots', nameHindi: 'गाजर', quantity: 12, unit: 'kg', price: 360 },
        { name: 'Beetroot', nameHindi: 'चुकंदर', quantity: 8, unit: 'kg', price: 320 }
      ]
    },
    'summer': {
      'Chaat': [
        { name: 'Cucumber', nameHindi: 'खीरा', quantity: 10, unit: 'kg', price: 200 },
        { name: 'Mint', nameHindi: 'पुदीना', quantity: 2, unit: 'kg', price: 160 }
      ],
      'Juice': [
        { name: 'Watermelon', nameHindi: 'तरबूज', quantity: 20, unit: 'kg', price: 400 },
        { name: 'Muskmelon', nameHindi: 'खरबूजा', quantity: 15, unit: 'kg', price: 450 }
      ]
    }
  };

  const products = seasonalProducts[season]?.[stallType] || [];
  
  if (products.length === 0) return [];

  return [{
    id: `seasonal-${season}-${stallType}`,
    name: `${season.charAt(0).toUpperCase() + season.slice(1)} Seasonal Bundle`,
    nameHindi: `${season === 'winter' ? 'सर्दी' : 'गर्मी'} का मौसमी बंडल`,
    products: products.map((product, index) => ({
      id: `seasonal-${index}`,
      name: product.name,
      nameHindi: product.nameHindi,
      category: 'perishable',
      quantity: product.quantity,
      unit: product.unit,
      estimatedPrice: product.price
    })),
    totalPrice: products.reduce((sum, product) => sum + product.price, 0),
    deliveryFrequency: 'weekly',
    reasoning: `Seasonal ${season} products for better variety`,
    reasoningHindi: `बेहतर विविधता के लिए ${season === 'winter' ? 'सर्दी' : 'गर्मी'} के मौसमी उत्पाद`
  }];
}

// Get personalized recommendations based on order history
export function getPersonalizedRecommendations(stallType, orderHistory = [], preferences = {}) {
  // Analyze order history to find patterns
  const frequentItems = orderHistory
    .flatMap(order => order.items || [])
    .reduce((acc, item) => {
      acc[item.name] = (acc[item.name] || 0) + 1;
      return acc;
    }, {});

  // Get top 3 most ordered items
  const topItems = Object.entries(frequentItems)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 3)
    .map(([name]) => name);

  // Create personalized bundle
  const personalizedProducts = topItems.map((itemName, index) => {
    const baseProducts = {
      'Potatoes': { nameHindi: 'आलू', quantity: 12, unit: 'kg', price: 240 },
      'Onions': { nameHindi: 'प्याज', quantity: 8, unit: 'kg', price: 240 },
      'Chaat Masala': { nameHindi: 'चाट मसाला', quantity: 1.5, unit: 'kg', price: 450 }
    };

    const product = baseProducts[itemName] || { nameHindi: itemName, quantity: 5, unit: 'kg', price: 200 };
    
    return {
      id: `personalized-${index}`,
      name: itemName,
      nameHindi: product.nameHindi,
      category: 'perishable',
      quantity: product.quantity,
      unit: product.unit,
      estimatedPrice: product.price
    };
  });

  return [{
    id: 'personalized-bundle',
    name: 'Personalized Bundle',
    nameHindi: 'व्यक्तिगत बंडल',
    products: personalizedProducts,
    totalPrice: personalizedProducts.reduce((sum, product) => sum + product.estimatedPrice, 0),
    deliveryFrequency: 'weekly',
    reasoning: 'Based on your order history and preferences',
    reasoningHindi: 'आपके ऑर्डर इतिहास और पसंद के आधार पर'
  }];
}

// Calculate optimal delivery schedule
export function calculateOptimalDelivery(bundle, vendorLocation) {
  const deliverySchedule = {
    perishable: {
      frequency: 'weekly',
      days: ['Monday', 'Wednesday', 'Friday'],
      time: '06:00 AM'
    },
    non_perishable: {
      frequency: 'monthly',
      days: ['First Monday of month'],
      time: '09:00 AM'
    }
  };

  const perishableItems = bundle.products.filter(item => item.category === 'perishable');
  const nonPerishableItems = bundle.products.filter(item => item.category === 'non_perishable');

  return {
    perishable: perishableItems.length > 0 ? deliverySchedule.perishable : null,
    non_perishable: nonPerishableItems.length > 0 ? deliverySchedule.non_perishable : null,
    estimatedDeliveryTime: '2-3 hours',
    routeOptimization: 'AI-optimized route for multiple deliveries'
  };
} 