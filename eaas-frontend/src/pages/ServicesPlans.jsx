import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth.js';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/common/Navbar.jsx';
import LoadingSpinner from '../components/common/LoadingSpinner.jsx';
import { subscriptionService } from '../services/subscriptionService.js';
import { Check, CloudLightning } from 'lucide-react';

const plans = [
  {
    id: 'basic',
    name: 'Solar Starter',
    price: 49,
    capacity: '3kW Solar Panel Array',
    features: [
      'Zero upfront hardware cost',
      'Basic consumption monitoring',
      'Standard grid net-metering',
      'Fault repair within 48h'
    ],
  },
  {
    id: 'pro',
    name: 'Hybrid Freedom',
    price: 89,
    capacity: '5kW Solar + 5kWh Battery',
    features: [
      'All Starter features',
      'Power outage backup (4 hrs)',
      'Advanced savings analytics',
      'Priority support (24h fix)',
      'Carbon offset certificates'
    ],
    recommended: true
  },
  {
    id: 'max',
    name: 'Grid Independent',
    price: 149,
    capacity: '10kW Solar + 13.5kWh Battery',
    features: [
      'Complete energy autonomy capability',
      'Whole-home backup',
      'Smart load management',
      'EV Charger integration included',
      'Proactive maintenance AI'
    ]
  }
];

const ServicesPlans = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [currentPlanId, setCurrentPlanId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.userId) {
      navigate('/login');
      return;
    }
    loadCurrentSubscription();
  }, [user]);

  const loadCurrentSubscription = async () => {
    if (!user?.userId) return;
    
    try {
      setLoading(true);
      const subscriptions = await subscriptionService.getUserSubscriptions(user.userId);
      if (subscriptions && subscriptions.length > 0) {
        // Map subscription plan_type to plan id
        const planType = subscriptions[0].plan_type || subscriptions[0].plan_name?.toLowerCase();
        if (planType?.includes('starter') || planType?.includes('basic')) {
          setCurrentPlanId('basic');
        } else if (planType?.includes('hybrid') || planType?.includes('pro')) {
          setCurrentPlanId('pro');
        } else if (planType?.includes('independent') || planType?.includes('max')) {
          setCurrentPlanId('max');
        } else {
          // Default to pro if plan type doesn't match
          setCurrentPlanId('pro');
        }
      }
    } catch (error) {
      console.error('Error loading subscription:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubscribe = (planId) => {
    if (planId === currentPlanId) return;
    navigate('/onboarding');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <LoadingSpinner size="lg" />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Energy Freedom</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Stop paying for unpredictable utility bills. Subscribe to a plan that gives you hardware, maintenance, and software in one monthly fee.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan) => {
              const isSelected = currentPlanId === plan.id;
              return (
                <div 
                  key={plan.id}
                  className={`
                    relative rounded-2xl border bg-white transition-all duration-200
                    ${isSelected ? 'ring-2 ring-brand-500 shadow-xl scale-105 z-10' : 'border-gray-200 hover:shadow-lg hover:border-brand-200'}
                  `}
                >
                  {plan.recommended && !isSelected && (
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-brand-500 text-white px-4 py-1 rounded-full text-xs font-bold tracking-wide uppercase">
                      Most Popular
                    </div>
                  )}
                  {isSelected && (
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-900 text-white px-4 py-1 rounded-full text-xs font-bold tracking-wide uppercase flex items-center">
                      <Check className="w-3 h-3 mr-1" /> Current Plan
                    </div>
                  )}

                  <div className="p-8">
                    <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                    <div className="mt-4 flex items-baseline">
                      <span className="text-4xl font-bold text-gray-900">${plan.price}</span>
                      <span className="ml-2 text-gray-500">/month</span>
                    </div>
                    <p className="mt-2 text-sm text-brand-600 font-medium bg-brand-50 inline-block px-2 py-1 rounded">
                      {plan.capacity}
                    </p>

                    <ul className="mt-8 space-y-4">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <Check className="w-5 h-5 text-brand-500 shrink-0 mr-3" />
                          <span className="text-gray-600 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <button
                      onClick={() => handleSubscribe(plan.id)}
                      disabled={isSelected}
                      className={`
                        mt-8 w-full py-3 px-4 rounded-lg font-medium transition-colors
                        ${isSelected 
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                          : 'bg-brand-600 text-white hover:bg-brand-700 shadow-lg shadow-brand-500/30'}
                      `}
                    >
                      {isSelected ? 'Active Plan' : 'Subscribe Now'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-16 bg-white rounded-xl border border-gray-200 p-8 flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-6 mb-6 md:mb-0">
              <div className="bg-blue-50 p-4 rounded-full">
                <CloudLightning className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-gray-900">Need a custom enterprise solution?</h4>
                <p className="text-gray-500">We offer bespoke microgrid setups for housing societies and industrial parks.</p>
              </div>
            </div>
            <button 
              onClick={() => navigate('/support')}
              className="text-blue-600 font-bold hover:text-blue-700 border border-blue-200 px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors"
            >
              Contact Sales
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ServicesPlans;

