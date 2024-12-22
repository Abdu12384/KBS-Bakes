import React, { useEffect, useState } from 'react';
import { ShoppingCart, MoreVertical, Calendar, User,X, CreditCard, Package, TrendingUp, CheckCircle, Clock, XCircle } from 'lucide-react';
import axioInstence from '../../utils/axioInstence';
import Pagination from '../Pagination';
// Status badge component
const StatusBadge = ({ status }) => {
  const getStatusStyles = () => {
    switch (status.toLowerCase()) {
      case 'in progress':
        return 'bg-orange-100 text-orange-700';
      case 'cancelled':
        return 'bg-red-100 text-red-700';
      case 'shipped':
        return 'bg-blue-100 text-blue-700';
      case 'delivered':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = () => {
    switch (status.toLowerCase()) {
      case 'pending':
        return <Clock className="w-4 h-4 mr-1" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4 mr-1" />;
      case 'shipped':
        return <Package className="w-4 h-4 mr-1" />;
      case 'delivered':
        return <CheckCircle className="w-4 h-4 mr-1" />;
      default:
        return null;
    }
  };

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center ${getStatusStyles()}`}>
      {getStatusIcon()}
      {status}
    </span>
  );
};




export function OrdersPage() {

  const [orders, setOrders] = useState([])
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5;

  const fetchOrderDetails = async() =>{
     try {

      const response = await axioInstence.get('/admin/orders-manage')
      
       setOrders(response.data)
       
     } catch (error) {
       console.log(error.response.data.message)
     }
  }

  useEffect(()=>{
    fetchOrderDetails()
  },[])

  const openPopup = (order) => {
    setSelectedOrder(order);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setSelectedOrder(null);
    setIsPopupOpen(false);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(orders.length / ordersPerPage);

  const handleCancelOrder = async (orderId) =>{
     try {
      const response = await axioInstence.patch(`/admin/orders/cancel/${orderId}`)
       if(response.status===200){
        setOrders((preveOrders) =>
        preveOrders.map((order) =>
        order._id === orderId ? {...order, status: 'cancelled'} : order
        )
        )

       }
     } catch (error) {
      console.error('Error cancelling order:', error.response?.data?.message || error.message);
     }
  }


  const handleStatusChange = async (newStatus) =>{
     try {
       const response = await axioInstence.patch(`/admin/orders/status/${selectedOrder._id}`,{status: newStatus})
       if(response.status === 200){
        
        setOrders((prevOrders)=>
        prevOrders.map((order) =>
         order._id === selectedOrder._id ? { ...order, status: newStatus} : order
        )
        )
       }
     } catch (error) {
      console.error('Error updating order status:', error.response?.data?.message );
     }
  }



console.log(orders);


  return (
    <div className="min-h-screen bg-cover bg-center relative" style={{backgroundImage: "url('/placeholder.svg?height=1080&width=1920')"}}>
      <div className="absolute inset-0  bg-opacity-50 backdrop-blur-sm"></div>
      
      <div className="relative min-h-screen flex flex-col">
        <div className="flex-1 p-4 md:p-6 lg:p-8">
          <div className="text-white w-full space-y-6 mt-16 lg:mt-0">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold flex items-center">
                <ShoppingCart className="w-8 h-8 mr-2" />
                Orders Dashboard
              </h2>
              <div className="bg-purple-600 text-white rounded-full p-2">
                <TrendingUp className="w-6 h-6" />
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {[
                { label: 'Total Orders', value: '100', icon: <ShoppingCart className="w-6 h-6" /> },
                { label: 'Completed', value: '85', icon: <CheckCircle className="w-6 h-6" /> },
                { label: 'Processing', value: '10', icon: <Clock className="w-6 h-6" /> },
                { label: 'Cancelled', value: '5', icon: <XCircle className="w-6 h-6" /> }
              ].map((stat, index) => (
                <div key={index} className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-4 flex items-center">
                  <div className="bg-purple-600 rounded-full p-2 mr-4">
                    {stat.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">{stat.label}</h3>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-2xl p-4 md:p-6">
              <div className="overflow-x-auto">
              <table className="w-full min-w-[800px]">
              <thead>
                <tr className="text-left border-b border-white border-opacity-20">
                  <th className="pb-4 px-4">Order ID</th>
                  <th className="pb-4 px-4">Product</th>
                  <th className="pb-4 px-4">Date</th>
                  <th className="pb-4 px-4">Customer</th>
                  <th className="pb-4 px-4">Total</th>
                  <th className="pb-4 px-4">Payment</th>
                  <th className="pb-4 px-4">Status</th>
                  <th className="pb-4 px-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentOrders.map((order) => (
                  <tr
                    key={order._id}
                    className="border-b border-white border-opacity-10 hover:bg-white hover:bg-opacity-5 transition-colors duration-200"
                  >
                    <td className="py-4 px-4">
                      <span className="text-blue-400 flex items-center">
                        <Package className="w-4 h-4 mr-1" />
                        #{order._id.slice(0, 8)}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={order.products[0]?.productId?.images[0]} // Displaying the first product's image
                          alt={order.products[0]?.productId?.productName || "Product Image"} // Alt text fallback
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div>
                          <p className="font-medium">
                            {order.products[0]?.productId?.productName || "N/A"}
                          </p>
                          {/* Optionally add additional info */}
                          {/* <p className="text-sm text-gray-300">{order.products[0]?.additionalInfo}</p> */}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(order.orderDate).toLocaleDateString()} {/* Formatting the date */}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="flex items-center">
                        <User className="w-4 h-4 mr-1" />
                        {order.userId?.fullName || "Unknown Customer"}
                      </span>
                    </td>
                    <td className="py-4 px-4 font-semibold">
                      ₹{order.totalPrice.toLocaleString()} {/* Formatting total price */}
                    </td>
                    <td className="py-4 px-4">
                      <span className="flex items-center">
                        <CreditCard className="w-4 h-4 mr-1" />
                        {order.paymentInfo || "N/A"}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                        <StatusBadge status={order.status} />
                      </td>
                    <td className="py-4 px-4">
                    <button
                            className="p-1 hover:bg-white hover:bg-opacity-10 rounded-full transition-colors duration-200"
                            aria-label="More options"
                            onClick={() => openPopup(order)}
                          >
                            <MoreVertical className="w-4 h-4" />
                          </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
              </div>
              <div className="mt-6">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {isPopupOpen && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Order Actions</h3>
              <button onClick={closePopup} className="text-gray-500 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <p className="font-medium">Order ID: #{selectedOrder._id.slice(0, 8)}</p>
                <p>Current Status: <StatusBadge status={selectedOrder.status} /></p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Change Status:</h4>
                <div className="grid grid-cols-2 gap-2">
                  {['pending', 'shipped', 'delivered'].map((status) => (
                    <button
                      key={status}
                      onClick={() => handleStatusChange(status)}
                      className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
              <button
                onClick={()=>handleCancelOrder(selectedOrder._id)}
                className="w-full px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
              >
                Cancel Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

