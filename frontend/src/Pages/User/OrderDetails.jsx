import React, { useState, useEffect } from 'react';
import { ShoppingBag, ChevronRight, Search, MapPin } from 'lucide-react';
import axioInstance from '../../utils/axioInstence';
import OrderTrackingUI from '../../Components/UserComponents/TrackingOrder';
import toast, { Toaster } from "react-hot-toast";
import NavBar from '../../Components/Navbar';
import { format } from 'date-fns';
import { fetchUserOrders ,cancelOrder, cancelProduct, requestReturn } from '../../services/authService';
import ConfirmationPopup from '../../Components/ConformButton';

const OrdersListPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showReturnOptions, setShowReturnOptions] = useState(false);
  const [returnReason, setReturnReason] = useState({});
  const [selectedProduct, setSelectedProduct] = useState('')
  const [showCancelOrderConfirmation, setShowCancelOrderConfirmation] = useState(false);
  const [showCancelProductConfirmation, setShowCancelProductConfirmation] = useState(false);
  const [showReturnConfirmation, setShowReturnConfirmation] = useState(false);
  const [orderToCancel, setOrderToCancel] = useState(null);
  const [productToCancel, setProductToCancel] = useState(null);
  const [productToReturn, setProductToReturn] = useState(null);




  useEffect(() => {
    const fetchOrders = async () => {
        try {
            setIsLoading(true);
            const data = await fetchUserOrders(); 
            
            if (Array.isArray(data)) {
                setOrders(data);
            } else {
                setError('Invalid response format');
            }
        } catch (error) {
            console.error('Error fetching orders:', error);
            setError('Failed to fetch orders');
            toast.error('Failed to fetch orders'); 
        } finally {
            setIsLoading(false);
        }
    };

    fetchOrders();
}, []);
  console.log(orders);
  console.log('selected order',selectedOrder);
  
  

  const fetchOrderDetails = async (orderId) => {
    try {
      const response = await axioInstance.get(`/user/order-details/${orderId}`);
      setSelectedOrder(response.data);
      console.log(response.data);
      
    } catch (error) {
      console.error('Error fetching order details:', error);
      setError('Failed to fetch order details');
    }
  };


  const filteredOrders = orders.filter(order => 
    order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.orderDate.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered': return 'text-green-600';
      case 'shipped': return 'text-blue-600';
      case 'pending': return 'text-yellow-600';
      case 'cancelled': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };


  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading orders...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-600">
        <p>{error}</p>
      </div>
    );
  }




 const handleCancelOrderClick = (event, orderId) => {
    event.preventDefault();
    setOrderToCancel(orderId);
    setShowCancelOrderConfirmation(true);
  };

  const handleCancelOrder = async () => {
    try {
        const response = await cancelOrder(orderToCancel); 
        toast.success(response.message);

        setOrders((prevOrders) =>
            prevOrders.map(order =>
                order._id === orderToCancel ? { ...order, status: 'cancelled' } : order
            )
        );
        setSelectedOrder(null);
    } catch (error) {
        console.error('Error canceling order:', error);
        toast.error(error.response?.data?.message || 'Failed to cancel order');
        setError('Failed to cancel order');
    }
};




const handleCancelProductClick = (productId) => {
  setProductToCancel(productId);
  setShowCancelProductConfirmation(true);
};

const handleCancelProduct = async () => {
  try {
      const response = await cancelProduct(selectedOrder._id, productToCancel); 

      if (response.success) {
          toast.success(response.message);
          fetchOrderDetails(selectedOrder._id); 
      } else {
          toast.error(response.message || 'Failed to cancel product');
      }
  } catch (error) {
      toast.error('Error canceling product');
      console.error(error);
  }
};



  const handleReasonChange = (productId, value) => {
    setReturnReason((prev) => ({
      ...prev,
      [productId]: value,
    }));
  };





  const handleReturnClick = (productId) => {
    setProductToReturn(productId);
    setShowReturnOptions(true);
  };

  const handleConformReturn = async (productId) => {
    const reason = returnReason[productId];
    if (!reason) {
        toast.error("Please provide a reason for the return.");
        return;
    }

    try {
        const response = await requestReturn(selectedOrder._id, productToReturn, reason); 
        console.log('Return request response:', response);

        if (response) {
            toast.success(response.message);
            setShowReturnOptions(false);
            setSelectedProduct(null);
            setReturnReason({}); 
        }
    } catch (error) {
        console.error('Return request error:', error);
        toast.error(error.response?.data?.message || 'Failed to request return');
    }
};


   const statusColors = {
    pending: "text-yellow-500",
    completed: "text-green-500",
    failed: "text-red-500",
    refunded: "text-blue-500"
  };

  return (
    <>
      <NavBar/>
    <div className="min-h-screen bg-white py-8 px-4 sm:px-6 lg:px-8">
    <Toaster position="top-right" reverseOrder={false}/>
      <div className="max-w-7xl mx-auto">
        <div className="border-b border-gray-200 pb-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Your Orders</h1>
        </div>

        <div className="mb-6 relative">
          <input
            type="text"
            placeholder="Search orders..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
        </div>

        <div className="grid md:grid-cols-[1fr_2fr] gap-6">
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <div 
                key={order._id} 
                className={`border border-gray-200 rounded-lg p-4 flex items-center justify-between hover:shadow-md transition-shadow cursor-pointer ${selectedOrder?._id === order._id ? 'bg-gray-100' : ''}`}
                onClick={() => fetchOrderDetails(order._id)}
              >
                <div className="flex items-center gap-4">
                  <ShoppingBag className="text-gray-600" size={24} />
                  <div>
                    <p className="font-semibold text-lg text-gray-900">#{order._id.slice(0,8)}</p>
                    <p className="text-sm text-gray-600">
                    {format(new Date(order.orderDate), 'MMMM d, yyyy')} 
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-semibold text-lg text-gray-900">₹{order.totalPrice.toFixed(2)}</p>
                    <span className={`text-sm font-medium ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                  <ChevronRight className="text-gray-400" size={20} />
                </div>
              </div>
            ))}
          </div>

          {selectedOrder && (
            <div>
              <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                <div className="flex justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900">Order Details</h2>
                    <p className="text-sm text-gray-600">Order #{selectedOrder._id.slice(0,8)}</p>
                    <p className="text-sm text-gray-600">
                    OrderDate :{format(new Date(selectedOrder.orderDate), 'MMMM d, yyyy')} 
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-900">₹{selectedOrder.totalPrice.toFixed(2)}</p>
                    <span className={` font-bold text-lg ${getStatusColor(selectedOrder.status)}`}>
                      {selectedOrder.status}
                    </span>
                  </div>
                </div>
                <OrderTrackingUI orders={selectedOrder}/>
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-4">Products</h3>
                  {selectedOrder.products.map((product, index) => (
                    <div key={index} className="flex items-center justify-between mb-4 pb-4 border-b">
                      <div className="flex items-center gap-4">
                        <img
                          src={product.productId?.images[0]}
                          alt={product.productId?.productName}
                          className="w-16 h-16 rounded object-cover"
                        />
                        <div>
                          <p className="font-medium">{product.productId?.productName}</p>
                          <p className="text-sm text-gray-600">Quantity: {product?.quantity}</p>
                          {product.returnRequest && (
                              <p className={`text-sm font-medium ${
                                product.returnRequest.status === 'approved' ? 'text-green-600' :
                                product.returnRequest.status === 'pending' ? 'text-yellow-600' :
                                'text-red-600'
                              }`}>
                                Return {product.returnRequest.status}
                              </p>
                            )}
                        </div>
                        <div className>
                          <p>Payment Status</p>
                          <p className={`${statusColors[product?.paymentStatus] || "text-gray-500"} font-bold`}>
                              {product?.paymentStatus}
                            </p>                       
                         </div>
                      </div>
                      <div className="text-right">
                      {selectedOrder.status.toLowerCase() === "delivered" &&
                      !product.isCanceled &&
                      (!product.returnRequest || product.returnRequest.status !== "approved") && ( 
                          <span className="text-green-500 font-bold text-lg font-semibold">delivered</span> 
                      )}
                       
                        {product.returnRequest && product.returnRequest.status === 'approved' && (
                          <p className="text-sm text-green-600">Amount Refunded</p>
                        )}
                      </div>
                      {product.isCanceled ? ( 
                            <span className="text-red-500 font-semibold font-bold text-lg">Canceled</span> 
                          ) : (
                            selectedOrder.status.toLowerCase() !== 'delivered' && (
                              <button
                                className="mt-4 bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
                                onClick={() => handleCancelProductClick(product.productId._id)}
                              >
                                Cancel
                              </button>
                            )
                          )}

                  {selectedOrder.status.toLowerCase() === "delivered" &&
                      !product.isCanceled &&
                      (!product.returnRequest || product.returnRequest.status !== "approved") && ( 
                        <button
                          className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                          onClick={() => {
                            setShowReturnOptions(true);
                            setSelectedProduct(product.productId._id);
                          }}
                        >
                          Return
                        </button>
                      )}
                       
                    </div>
                  ))}
                </div>

                

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white shadow-lg rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-gray-800 border-b pb-3 mb-4">
                      Shipping Address
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="bg-blue-100 p-2 rounded-full">
                          <MapPin className="w-6 h-6 text-blue-600" />
                        </div>
                        <p className="font-medium text-lg text-gray-900">
                          {selectedOrder?.shippingAddressId?.fullName}
                        </p>
                      </div>
                      <div className="pl-10 text-gray-600 space-y-2">
                        <p className="text-sm">{selectedOrder?.shippingAddressId?.address}</p>
                        <p className="text-sm">
                          {selectedOrder?.shippingAddressId?.city}, {selectedOrder?.shippingAddressId?.state}{" "}
                          {selectedOrder?.shippingAddressId?.postalCode}
                        </p>
                        <p className="text-sm">
                          <span className="font-medium">Phone:</span> {selectedOrder?.shippingAddressId?.mobile}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white shadow-lg rounded-lg p-6">
                      <h3 className="text-xl font-semibold text-gray-800 border-b pb-3 mb-4">Order Summary</h3>
                      <div className="space-y-4">
                        <div className="flex justify-between text-gray-600">
                          <p className="font-medium">Payment Method</p>
                          <p className="font-medium">₹{selectedOrder?.paymentInfo}</p>
                        </div>
                        <div className="flex justify-between text-gray-600">
                          <p className="font-medium">Subtotal</p>
                          <p className="font-medium">₹{selectedOrder?.subtotal?.toFixed(2)}</p>
                        </div>
                        <div className="flex justify-between text-gray-600">
                          <p className="font-medium">Discount</p>
                          <p className={`font-medium ${selectedOrder.discount ? 'text-green-500' : 'text-gray-600'}`}>
                            ₹{selectedOrder.discount ? selectedOrder?.discount?.toFixed(2) : 0}
                          </p>
                        </div>
                        <div className="flex justify-between text-gray-600">
                          <p className="font-medium">Shipping</p>
                          <p className="font-medium">₹{selectedOrder?.shippingCost?.toFixed(2)}</p>
                        </div>
                        <div className="flex justify-between text-gray-600">
                          <p className="font-medium">GST ({selectedOrder?.gstRate}%)</p>
                          <p className="font-medium">₹{selectedOrder?.gstAmount?.toFixed(2)}</p>
                        </div>
                        <div className="flex justify-between text-gray-900 font-bold text-lg border-t pt-4">
                        <p>Total</p>
                        <p>₹{selectedOrder.totalPrice.toFixed(2)}</p>
                    </div>{selectedOrder && (

                      <div className="order-status">
                      {selectedOrder.status.toLowerCase() === 'cancelled' ? ( 
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4" role="alert">
                          <strong className="font-bold">Order Canceled!</strong>
                          <span className="block sm:inline"> This order has been canceled successfully.</span>
                        </div>
                      ) : (

                        selectedOrder.status.toLowerCase() !== 'delivered' && 
                        selectedOrder.products.some(product => !product.isCanceled) && (
                          <button
                            className="mt-4 bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
                            onClick={(event) => handleCancelOrderClick(event, selectedOrder._id)}
                          >
                            Cancel Order
                          </button>
                        )
                      )}
                    </div>
                      )}
                      </div>
                      
                  </div>
                </div>
                     {showReturnOptions && selectedOrder.status.toLowerCase() === 'delivered' && (
                        <div className="mt-4 border rounded p-4 ">
                          <textarea
                            className="w-full border rounded p-2"
                            placeholder="Enter the reason for return..."
                            value={returnReason[selectedProduct] || ""}
                            onChange={(e) =>
                              handleReasonChange(selectedProduct, e.target.value)
                            }
                          ></textarea>
                          <button
                            className="mt-2 mr-2 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
                            onClick={() => handleReturnClick(selectedProduct)}
                          >
                            Confirm Return
                          </button>
                          <button 
                            className="mt-4 bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
                            onClick={()=>{
                              setShowReturnOptions(false)
                              setSelectedProduct(null);
                              setReturnReason({});
                            }}
                          >
                            Cancel 
                          </button>
                          
                        </div>
                      )}
              </div>
            </div>
          )}
        </div>
        {showCancelOrderConfirmation && (
          <ConfirmationPopup
            message="Are you sure you want to cancel this order?"
            onConfirm={() => {
              handleCancelOrder();
              setShowCancelOrderConfirmation(false);
            }}
            onCancel={() => {
              setShowCancelOrderConfirmation(false);
              setOrderToCancel(null);
            }}
          />
        )}

        {showCancelProductConfirmation && (
          <ConfirmationPopup
            message="Are you sure you want to cancel this product?"
            onConfirm={() => {
              handleCancelProduct();
              setShowCancelProductConfirmation(false);
            }}
            onCancel={() => {
              setShowCancelProductConfirmation(false);
              setProductToCancel(null);
            }}
          />
        )}

         {showReturnConfirmation && (
          <ConfirmationPopup
            message="Are you sure you want to return this product?"
            onConfirm={() => {
              handleConformReturn();
              setShowReturnConfirmation(false);
            }}
            onCancel={() => {
              setShowReturnConfirmation(false);
              setProductToReturn(null);
              setReturnReason({});
            }}
          />
        )}

        
      </div>
    </div>
    </>
  );
};

export default OrdersListPage;



