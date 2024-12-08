

import React from 'react';
import { ShoppingCart } from 'lucide-react';

export function OrdersPage() {
  return (
    <div className="min-h-screen bg-cover bg-center relative" style={{backgroundImage: "url('/placeholder.svg?height=1080&width=1920')"}}>
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>
      
      {/* Main Content */}
      <div className="relative min-h-screen flex flex-col lg:flex-row">
        {/* Main Content */}
        <div className="flex-1">
          <div className="p-4 md:p-6 lg:p-8">
            <div className="text-white w-full space-y-6 mt-16 lg:mt-0">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">Orders</h2>
                <div className="bg-purple-600 text-white rounded-full p-2">
                  <ShoppingCart className="w-6 h-6" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {['Total Orders', 'Completed', 'Processing', 'Cancelled'].map((status, index) => (
                  <div key={index} className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-4">
                    <h3 className="text-lg font-semibold mb-2">{status}</h3>
                    <p className="text-2xl font-bold">{Math.floor(Math.random() * 1000)}</p>
                  </div>
                ))}
              </div>

              <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-2xl p-4 md:p-6 overflow-x-auto">
                <table className="w-full min-w-[640px]">
                  <thead>
                    <tr className="text-left">
                      <th className="pb-3 px-2">Order ID</th>
                      <th className="pb-3 px-2">Customer</th>
                      <th className="pb-3 px-2">Total</th>
                      <th className="pb-3 px-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { id: '#12345', customer: 'John Doe', total: '$99.99', status: 'Completed' },
                      { id: '#12346', customer: 'Jane Smith', total: '$149.99', status: 'Processing' },
                      { id: '#12347', customer: 'Bob Johnson', total: '$79.99', status: 'Shipped' },
                      { id: '#12348', customer: 'Alice Brown', total: '$199.99', status: 'Pending' },
                      { id: '#12349', customer: 'Charlie Davis', total: '$59.99', status: 'Completed' },
                    ].map((order) => (
                      <tr key={order.id} className="border-t border-white border-opacity-20">
                        <td className="py-2 px-2">{order.id}</td>
                        <td className="py-2 px-2">{order.customer}</td>
                        <td className="py-2 px-2">{order.total}</td>
                        <td className="py-2 px-2">{order.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
