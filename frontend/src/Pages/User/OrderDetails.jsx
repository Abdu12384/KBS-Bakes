import React, { useState, useEffect } from 'react';
import { ShoppingBag, ChevronRight, Search, MapPin } from 'lucide-react';
import axioInstance from '../../utils/axioInstence';
import OrderTrackingUI from '../../Components/UserComponents/TrackingOrder';
import toast, { Toaster } from "react-hot-toast";

const OrdersListPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setIsLoading(true);
        const response = await axioInstance.get('/user/orders');
        
        if (Array.isArray(response.data)) {
          setOrders(response.data);
        } else {
          setError('Invalid response format');
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
        setError('Failed to fetch orders');
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);
  console.log(orders);
  

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


  const handleCancelOrder = async (event,orderId) => {
    event.preventDefault();
    // const confirmCancel = window.confirm("Are you sure you want to cancel this order?");
    // if (!confirmCancel) return;
    try {
      const response = await axioInstance.post(`/user/cancel-order/${orderId}`);
      toast.success(response.data.message)
      
      setOrders((prevOrders) => 
        prevOrders.map(order => 
          order._id === orderId ? { ...order, status: 'cancelled' } : order
        )
      );
      setSelectedOrder(null);
      
    } catch (error) {
      console.error('Error canceling order:', error);
      toast.error(error.response.data.message)
      setError('Failed to cancel order');
    }
  };




  return (
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
                    <p className="font-semibold text-lg text-gray-900">{order._id}</p>
                    <p className="text-sm text-gray-600">{order.orderDate}</p>
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
                    <p className="text-sm text-gray-600">Order #{selectedOrder._id}</p>
                    <p className="text-sm text-gray-600">Ordered on {selectedOrder.orderDate}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-900">₹{selectedOrder.totalPrice.toFixed(2)}</p>
                    <span className={`text-sm font-medium ${getStatusColor(selectedOrder.status)}`}>
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
                          src={product.productId.images[0]}
                          alt={product.productId.productName}
                          className="w-16 h-16 rounded object-cover"
                        />
                        <div>
                          <p className="font-medium">{product.productId.productName}</p>
                          <p className="text-sm text-gray-600">Quantity: {product.quantity}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        {/* <p className="font-semibold">${(product.price * product.quantity).toFixed(2)}</p> */}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Shipping Address</h3>
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="w-5 h-5 text-gray-600" />
                      <p className="font-medium">{selectedOrder.shippingAddressId.fullName}</p>
                    </div>
                    <p className="text-sm text-gray-600">{selectedOrder.shippingAddressId.address}</p>
                    <p className="text-sm text-gray-600">
                      {selectedOrder.shippingAddressId.city}, 
                      {selectedOrder.shippingAddressId.state} 
                      {selectedOrder.shippingAddressId.postalCode}
                    </p>
                    <p className="text-sm text-gray-600">Phone: {selectedOrder.shippingAddressId.mobile}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <p>Subtotal</p>
                        <p>₹{selectedOrder?.subtotal?.toFixed(2)}</p>
                      </div>
                      <div className="flex justify-between">
                        <p>Shipping</p>
                        <p>${selectedOrder.shippingCost.toFixed(2)}</p>
                      </div>
                      <div className="flex justify-between font-semibold">
                        <p>Total</p>
                        <p>₹{selectedOrder.totalPrice.toFixed(2)}</p>
                    </div>{selectedOrder && (
                        <div>
                          {/* Existing order details code... */}
                          <button 
                            className="mt-4 bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
                            onClick={(event) => handleCancelOrder(event, selectedOrder._id)}
                          >
                            Cancel Order
                          </button>
                        </div>
                      )}
                      </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
      </div>
    </div>
  );
};

export default OrdersListPage;



