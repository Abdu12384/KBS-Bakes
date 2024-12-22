import React, { useEffect, useState } from 'react';
import { Home, MapPin, Truck, ChevronRight, CreditCard, Wallet, Building, ShieldCheck, Lock, DollarSign } from 'lucide-react';
import axioInstence from '../../utils/axioInstence';
import toast, { Toaster } from "react-hot-toast";
import { OrderAnimation } from '../../Components/cakeAnimation';

const paymentMethods = [
  { id: 'credit', name: 'Credit Card', icon: CreditCard },
  { id: 'paypal', name: 'PayPal', icon: Wallet },
  { id: 'cash', name: 'Cash on Delivery', icon: DollarSign },
];

const CheckoutPage = () => {

  const [savedAddress, setSavedAddress] = useState([])
  const [selectedAddress, setSelectedAddress] = useState(savedAddress[0]);
  const [selectedPayment, setSelectedPayment] = useState(paymentMethods[0].id);
  const [loading, setLoading] = useState(false)
   const [cartItems , setCartItems] = useState([])
   const [cartSummary, setCartSummary] = useState({
    subtotal: 0,
    total: 0,
    discount: 0
  });

   const fetchCartItem = async() =>{
       try {
         const response = await axioInstence.get('/user/cart/item') 
             console.log('jkhkjkjhkhkk',response);
             
          if(response.data && response.data.cartItems){
            console.log('ghghghgh',response.data.cartItems);
            
            setCartItems(response.data.cartItems)
          } 

          if(response.data.summary){
            setCartSummary(response.data.summary)
          } else{
             
             const subtotal = response.data.cartItems.reduce(
              (sum, item) => sum + (item.variantDetails.salePrice * item.quantity),
              0
             )
             setCartSummary({
              subtotal,
              total:subtotal,
              discount:0
             })
            }
       } catch (error) {
       toast.error(error.response?.data?.message || 'Failed to fetch cart items');
      console.error('Cart fetch error:', error);
       }
   }
   console.log(cartItems);

   const fechAddresses = async () =>{
     try {
       const response = await axioInstence.get('/user/address-details')
        if(response.data && response.data.length>0){
          setSavedAddress(response.data)

           setSelectedAddress(
            response.data.find(addr => addr.isDefault) || response.data[0]
           )
        }
     } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to fetch addresses');
     }
   }
   console.log('addree',savedAddress);
   

   useEffect(()=>{
     fetchCartItem()
     fechAddresses()
   },[])



   const handlePlaceOrder = async () => {
     
     if(!selectedAddress){
      toast.error('Please select a shipping address')
      return
     }
     if(!selectedPayment){
      toast.error('Please select a payment method');
      return;
     }


     const orderData = {
       address: selectedAddress,
       paymentMethods: selectedPayment,
       cartItems,
       cartSummary
     }
     console.log('ordedata',orderData);
     

     try {

     setLoading(true)
      const response = await axioInstence.post('/user/place-order',orderData)
       if(response.data){
        setTimeout(() => {
          toast.success(response.data.message)
          setLoading(false)
        }, 2000);
       }else{
        setLoading(false)
        toast.error('Failed to place order')
      }
    } catch (error) {
       setLoading(false)
      
      toast.error(error.response.data.message);
      console.error(error.response.data.message);

     }
   }



  const calculateTotal = () => {
    const subtotal = cartItems.reduce((sum, item) => sum + (item.variantDetails.salePrice * item.quantity), 0);
    const shippingCharge = subtotal < 1000 ? 50 : 0;
    return subtotal + shippingCharge;

  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {loading && <OrderAnimation/>}
            <Toaster position="top-right" reverseOrder={false}/>
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
                  {savedAddress.map(address => (
                    <div
                      key={address._id}
                      className={`border rounded-lg p-4 cursor-pointer transition-all ${
                        savedAddress._id === address._id
                          ? 'border-purple-500 bg-purple-50'
                          : 'hover:border-gray-400'
                      }`}
                      onClick={() => setSelectedAddress(address)}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-medium">{`${address.fullName} `}</p>
                          <p className="text-gray-600">{address.address}</p>
                          
                          <p className="text-gray-600">{`${address.city}, ${address.state} ${address.pincode}`}</p>
                          <p className="text-gray-600">{address.country}</p>
                        </div>
                        <div className="w-4 h-4 rounded-full border-2 border-purple-500 flex-shrink-0">
                          {selectedAddress._id === address._id && (
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
                  <p className="font-medium">₹50.00</p>
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
                      <label  className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                      <input type="text" id="cardNumber" className="w-full p-2 border rounded-md" placeholder="1234 5678 9012 3456" />
                    </div>
                    <div>
                      <label  className="block text-sm font-medium text-gray-700 mb-1">Name on Card</label>
                      <input type="text" id="cardName" className="w-full p-2 border rounded-md" placeholder="John Doe" />
                    </div>
                    <div>
                      <label  className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                      <input type="text" id="expiry" className="w-full p-2 border rounded-md" placeholder="MM/YY" />
                    </div>
                    <div>
                      <label  className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
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
                  <div key={item._id} className="flex gap-4">
                    <img
                      src={item.images[0]}
                      alt={item.productName}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h3 className="font-medium">{item.productName}</h3>
                        <p className="font-medium">₹{item.variantDetails.salePrice.toFixed(2)}</p>
                      </div>
                      <div className="text-sm text-gray-500">
                         <p>Size: {item.variantDetails.weight}</p>
                        {/* <p>Color: {item.color}</p>  */}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t mt-6 pt-6 space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">
                    ₹{cartItems.reduce((sum, item) => sum + (item.variantDetails.salePrice * item.quantity), 0).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className={`font-medium ${calculateTotal() - (cartItems.reduce((sum, item) => sum + (item.variantDetails.salePrice * item.quantity), 0)) > 0 ? 'text-red-600' : 'text-green-600'}`}>
                    {calculateTotal() - (cartItems.reduce((sum, item) => sum + (item.variantDetails.salePrice * item.quantity), 0)) > 0 
                      ? '₹50.00' 
                      : 'FREE'}
                  </span>               
                   </div>
                <div className="flex justify-between text-lg font-bold">
                  <span>Order total</span>
                  <span>₹{calculateTotal().toFixed(2)}</span>
                </div>
              </div>

              <button 
              className="w-full bg-purple-600 text-white rounded-lg py-4 mt-6 font-medium hover:bg-purple-700 transition-colors flex items-center justify-center"
              onClick={handlePlaceOrder}
              >
                <ShieldCheck className="w-5 h-5 mr-2" />
                Place Order
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

