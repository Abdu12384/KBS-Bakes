import React, { useEffect, useState } from 'react';
import { Search, Download, Edit, Trash, ChevronDown, DollarSign, ShoppingCart, Package, BarChart2, ChevronLeft, ChevronRight } from 'lucide-react';
import axioInstence from '../../utils/axioInstence';

const SaleReportPage = () => {
  const [timeFilter, setTimeFilter] = useState('All Time');

  const stats = [
    { title: 'Total Sales', value: '$12,500.00', icon: DollarSign, color: 'blue' },
    { title: 'Total Cost', value: '$11,345.22', icon: ShoppingCart, color: 'red' },
    { title: 'Products Sold', value: '6300', icon: Package, color: 'purple' },
    { title: 'Stock on Hand', value: '$3,90,890.00', icon: BarChart2, color: 'orange' }
  ];

   

  const [orderData, setOrderData]= useState([])
  const [filteredData, setFilteredData] = useState([]);


  const fetchOrderDetails = async()=>{
    try {
     const response = await axioInstence.get('/admin/orders-manage') 
     console.log(response);
     setOrderData(response.data)
    } catch (error) {
      console.log(error);
      
    }
  }

  useEffect(()=>{
   fetchOrderDetails()
  },[])

  const applyDateFilter = () => {
    const now = new Date();
    let startDate;

    if (timeFilter === 'Daily') {
      startDate = new Date(now.setHours(0, 0, 0, 0)); // Start of today
    } else if (timeFilter === 'Weekly') {
      const dayOfWeek = now.getDay();
      startDate = new Date(now.setDate(now.getDate() - dayOfWeek)); // Start of the week (Sunday)
    } else if (timeFilter === 'Monthly') {
      startDate = new Date(now.getFullYear(), now.getMonth(), 1); // Start of the month
    }

    if (timeFilter === 'All Time') {
      setFilteredData(orderData); // No filter applied
    } else {
      const filtered = orderData.filter(order => {
        const orderDate = new Date(order.orderDate);
        return orderDate >= startDate;
      });
      setFilteredData(filtered);
    }
  };

  useEffect(() => {
    applyDateFilter();
  }, [timeFilter, orderData]);


  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">Reports</h1>
        <div className="relative w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search by All"
            className="w-full sm:w-64 pl-10 pr-4 py-2 border rounded-lg"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center gap-4">
              <div className={`bg-${stat.color}-100 p-3 rounded-full`}>
                <stat.icon className={`h-6 w-6 text-${stat.color}-600`} />
              </div>
              <div>
                <p className="text-sm text-gray-600">{stat.title}</p>
                <p className={`text-xl font-bold text-${stat.color}-600`}>{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div className="relative w-full sm:w-auto">
          <select 
            className="appearance-none bg-white border rounded-lg pl-4 pr-10 py-2 w-full sm:w-auto"
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
          >
            <option>All Time</option>
            <option>Daily</option>
            <option>Weekly</option>
            <option>Monthly</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
        </div>
        <button className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg w-full sm:w-auto justify-center">
          <Download className="h-5 w-5" />
          Export
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order#</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total QTY</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredData.map((order) => (
              <tr key={order._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{order._id.slice(0, 8)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{order.products[0]?.productId?.productName }</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{order.products[0]?.quantity}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{new Date(order.orderDate).toLocaleDateString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{order.userId?.fullName}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    order.status === 'Done' ? 'bg-green-100 text-green-800' :
                    order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{order.totalPrice.toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex space-x-2">
                    <button className="text-gray-400 hover:text-gray-500">
                      <Edit className="h-5 w-5" />
                    </button>
                    <button className="text-gray-400 hover:text-gray-500">
                      <Trash className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="flex-1 flex justify-between sm:hidden">
            <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Previous
            </button>
            <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to <span className="font-medium">3</span> of{' '}
                <span className="font-medium">3</span> results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <span className="sr-only">Previous</span>
                  <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                </button>
                <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <span className="sr-only">Next</span>
                  <ChevronRight className="h-5 w-5" aria-hidden="true" />
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaleReportPage;

