import React, { useState } from 'react';
import { Home, MapPin, Truck, ChevronRight, CreditCard, Wallet, Building, ShieldCheck, Lock, DollarSign } from 'lucide-react';

const savedAddresses = [
  {
    id: 1,
    firstName: 'Jessica',
    lastName: 'Cruz',
    address: '971 S Broadway',
    apt: '119F-3',
    city: 'Trenton',
    state: 'New Jersey',
    country: 'United States',
    postalCode: '08611',
    isDefault: true
  },
  {
    id: 2,
    firstName: 'Jessica',
    lastName: 'Cruz',
    address: '456 Pine Street',
    apt: '2B',
    city: 'Trenton',
    state: 'New Jersey',
    country: 'United States',
    postalCode: '08611',
    isDefault: false
  }
];

const cartItems = [
  {
    id: 1,
    name: 'Crop Top',
    price: 44.90,
    size: '36',
    color: 'White',
    image: '/placeholder.svg?height=80&width=80'
  },
  {
    id: 2,
    name: 'Raffia box bag',
    price: 65.90,
    size: 'OS',
    color: 'Natural',
    image: '/placeholder.svg?height=80&width=80'
  }
];

const paymentMethods = [
  { id: 'credit', name: 'Credit Card', icon: CreditCard },
  { id: 'paypal', name: 'PayPal', icon: Wallet },
  { id: 'cash', name: 'Cash on Delivery', icon: DollarSign },
];

const CheckoutPage = () => {
  const [selectedAddress, setSelectedAddress] = useState(savedAddresses[0]);
  const [selectedPayment, setSelectedPayment] = useState(paymentMethods[0].id);

  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price, 0);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Home className="w-4 h-4" />
          <span>Home</span>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900">Checkout</span>
        </div>

        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Shipping Info & Payment */}
          <div className="lg:col-span-2 space-y-8">
            {/* Shipping Info */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-purple-600" />
                Shipping info
              </h2>

              <div className="space-y-4">
                <h3 className="font-medium">Select delivery address</h3>
                <div className="space-y-4">
                  {savedAddresses.map(address => (
                    <div
                      key={address.id}
                      className={`border rounded-lg p-4 cursor-pointer transition-all ${
                        selectedAddress.id === address.id
                          ? 'border-purple-500 bg-purple-50'
                          : 'hover:border-gray-400'
                      }`}
                      onClick={() => setSelectedAddress(address)}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-medium">{`${address.firstName} ${address.lastName}`}</p>
                          <p className="text-gray-600">{address.address}</p>
                          {address.apt && (
                            <p className="text-gray-600">
                              <Building className="w-4 h-4 inline mr-1 text-gray-400" />
                              Apt {address.apt}
                            </p>
                          )}
                          <p className="text-gray-600">{`${address.city}, ${address.state} ${address.postalCode}`}</p>
                          <p className="text-gray-600">{address.country}</p>
                        </div>
                        <div className="w-4 h-4 rounded-full border-2 border-purple-500 flex-shrink-0">
                          {selectedAddress.id === address.id && (
                            <div className="w-2 h-2 m-0.5 rounded-full bg-purple-500" />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Delivery Options */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Truck className="w-5 h-5 text-purple-600" />
                Delivery options
              </h2>

              <div className="border rounded-lg p-4 cursor-pointer bg-purple-50 border-purple-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Standard</p>
                    <p className="text-gray-600">7-14 business days</p>
                  </div>
                  <p className="font-medium">$5.00</p>
                </div>
              </div>
            </div>

            {/* Payment Options */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-purple-600" />
                Payment method
              </h2>

              <div className="space-y-4">
                {paymentMethods.map(method => (
                  <div
                    key={method.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${
                      selectedPayment === method.id
                        ? 'border-purple-500 bg-purple-50'
                        : 'hover:border-gray-400'
                    }`}
                    onClick={() => setSelectedPayment(method.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <method.icon className="w-6 h-6 text-purple-600" />
                        <p className="font-medium">{method.name}</p>
                      </div>
                      <div className="w-4 h-4 rounded-full border-2 border-purple-500 flex-shrink-0">
                        {selectedPayment === method.id && (
                          <div className="w-2 h-2 m-0.5 rounded-full bg-purple-500" />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {selectedPayment === 'credit' && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                      <input type="text" id="cardNumber" className="w-full p-2 border rounded-md" placeholder="1234 5678 9012 3456" />
                    </div>
                    <div>
                      <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">Name on Card</label>
                      <input type="text" id="cardName" className="w-full p-2 border rounded-md" placeholder="John Doe" />
                    </div>
                    <div>
                      <label htmlFor="expiry" className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                      <input type="text" id="expiry" className="w-full p-2 border rounded-md" placeholder="MM/YY" />
                    </div>
                    <div>
                      <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                      <input type="text" id="cvv" className="w-full p-2 border rounded-md" placeholder="123" />
                    </div>
                  </div>
                </div>
              )}

              {selectedPayment === 'cash' && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">
                    You will pay for your order when it is delivered. Please have the exact amount ready.
                  </p>
                </div>
              )}

              <div className="mt-4 flex items-center text-sm text-gray-500">
                <Lock className="w-4 h-4 mr-2" />
                <span>Your payment info is stored securely</span>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-6">
              <h2 className="text-xl font-semibold mb-6">Order summary</h2>

              <div className="space-y-4">
                {cartItems.map(item => (
                  <div key={item.id} className="flex gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="font-medium">${item.price.toFixed(2)}</p>
                      </div>
                      <div className="text-sm text-gray-500">
                        <p>Size: {item.size}</p>
                        <p>Color: {item.color}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t mt-6 pt-6 space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${calculateTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-green-600 font-medium">FREE</span>
                </div>
                <div className="flex justify-between text-lg font-bold">
                  <span>Order total</span>
                  <span>${calculateTotal().toFixed(2)}</span>
                </div>
              </div>

              <button className="w-full bg-purple-600 text-white rounded-lg py-4 mt-6 font-medium hover:bg-purple-700 transition-colors flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 mr-2" />
                Complete Order
              </button>

              <p className="text-xs text-gray-500 text-center mt-4">
                By placing your order, you agree to our Terms of Service and Privacy Policy
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;

