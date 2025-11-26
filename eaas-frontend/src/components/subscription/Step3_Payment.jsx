import { useState } from 'react';
import { subscriptionService } from '../../services/subscriptionService.js';
import { ShieldCheck, Clock, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import RazorpayMock from '../payment/RazorpayMock.jsx';

const Step3_Payment = ({ formData, onBack }) => {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [error, setError] = useState('');
  const [subscriptionCreated, setSubscriptionCreated] = useState(false);
  const navigate = useNavigate();

  const planDetails = {
    1: { name: 'Basic Solar', price: 99, features: ['5kW Solar System', 'Basic Monitoring', 'Email Support'] },
    2: { name: 'Solar + Battery', price: 149, features: ['5kW Solar + 10kWh Battery', 'Real-time Monitoring', 'Priority Support'] },
    3: { name: 'Premium', price: 199, features: ['10kW Solar + 20kWh Battery', 'AI-Powered Analytics', '24/7 Dedicated Support'] },
  };

  const selectedPlan = planDetails[formData.selectedPlan] || planDetails[1];

  const handlePaymentClick = async () => {
    if (!formData.selectedPlan) {
      setError('Please go back and select a plan');
      return;
    }

    try {
      setError('');
      
      // Create subscription first
      await subscriptionService.createSubscription({
        plan_id: formData.selectedPlan,
        address: formData.address,
        monthly_bill: parseFloat(formData.monthlyBill),
      });
      
      setSubscriptionCreated(true);
      setShowPaymentModal(true);
    } catch (error) {
      console.error('Error creating subscription:', error);
      setError(error.response?.data?.error || 'Error creating subscription. Please try again.');
    }
  };

  const handlePaymentSuccess = (paymentDetails) => {
    console.log('Payment successful:', paymentDetails);
    // Wait a moment then redirect to dashboard
    setTimeout(() => {
      navigate('/dashboard');
    }, 500);
  };

  const handlePaymentClose = () => {
    setShowPaymentModal(false);
    if (subscriptionCreated) {
      // If subscription was created but payment modal closed, still go to dashboard
      navigate('/dashboard');
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-2">Complete Your Subscription</h2>
      <p className="text-gray-600 mb-8">Review your plan and proceed to payment</p>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}

      {/* Order Summary Card */}
      <div className="bg-white border rounded-xl shadow-sm overflow-hidden mb-6">
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-6 py-4">
          <h3 className="text-white font-semibold">Order Summary</h3>
        </div>
        
        <div className="p-6">
          {/* Selected Plan */}
          <div className="flex justify-between items-start mb-6 pb-6 border-b">
            <div>
              <p className="font-semibold text-lg text-gray-900">{selectedPlan.name}</p>
              <p className="text-sm text-gray-500">Monthly Subscription</p>
              <ul className="mt-3 space-y-1">
                {selectedPlan.features.map((feature, i) => (
                  <li key={i} className="text-sm text-gray-600 flex items-center">
                    <Zap className="w-3 h-3 text-primary-500 mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-gray-900">₹{selectedPlan.price}</p>
              <p className="text-sm text-gray-500">/month</p>
            </div>
          </div>

          {/* Installation Info */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex items-start">
              <Clock className="w-5 h-5 text-primary-600 mr-3 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900">Installation Schedule</p>
                <p className="text-sm text-gray-600">Our team will contact you within 48 hours to schedule installation</p>
              </div>
            </div>
          </div>

          {/* Service Address */}
          {formData.address && (
            <div className="mb-6">
              <p className="text-sm font-medium text-gray-700 mb-1">Service Address</p>
              <p className="text-gray-600">{formData.address}</p>
            </div>
          )}

          {/* Price Breakdown */}
          <div className="space-y-3 mb-6">
            <div className="flex justify-between text-gray-600">
              <span>Monthly Plan Fee</span>
              <span>₹{selectedPlan.price}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Installation Fee</span>
              <span className="text-green-600">FREE</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>GST (18%)</span>
              <span>₹{Math.round(selectedPlan.price * 0.18)}</span>
            </div>
            <div className="h-px bg-gray-200" />
            <div className="flex justify-between font-semibold text-lg">
              <span>Total Due Today</span>
              <span className="text-primary-600">₹{Math.round(selectedPlan.price * 1.18)}</span>
            </div>
          </div>

          {/* Security Badge */}
          <div className="flex items-center justify-center py-3 bg-green-50 rounded-lg mb-6">
            <ShieldCheck className="w-5 h-5 text-green-600 mr-2" />
            <span className="text-sm text-green-700">Secure payment powered by Razorpay</span>
          </div>

          {/* Demo Notice */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-blue-800">
              <strong>Demo Mode:</strong> This is a simulated payment. No actual charges will be made. 
              Use test card <code className="bg-blue-100 px-1 rounded">4242 4242 4242 4242</code>
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between">
        <button
          type="button"
          onClick={onBack}
          className="btn btn-secondary"
        >
          Back
        </button>
        <button
          type="button"
          onClick={handlePaymentClick}
          className="btn btn-primary px-8"
        >
          Pay ₹{Math.round(selectedPlan.price * 1.18)} →
        </button>
      </div>

      {/* Razorpay Mock Modal */}
      <RazorpayMock
        isOpen={showPaymentModal}
        onClose={handlePaymentClose}
        amount={Math.round(selectedPlan.price * 1.18)}
        description={`${selectedPlan.name} - Monthly Subscription`}
        onSuccess={handlePaymentSuccess}
        merchantName="EaaS Energy Services"
      />
    </div>
  );
};

export default Step3_Payment;
