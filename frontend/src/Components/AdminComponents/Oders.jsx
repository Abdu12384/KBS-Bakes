import React from 'react'

export function Orders() {
  return (
    <div className="text-white">
      <h2 className="text-2xl font-semibold mb-4">Orders</h2>
      <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-2xl p-6">
        <table className="w-full">
          <thead>
            <tr className="text-left">
              <th className="pb-3">Order ID</th>
              <th className="pb-3">Customer</th>
              <th className="pb-3">Total</th>
              <th className="pb-3">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2">#12345</td>
              <td className="py-2">John Doe</td>
              <td className="py-2">$99.99</td>
              <td className="py-2">Completed</td>
            </tr>
            <tr>
              <td className="py-2">#12346</td>
              <td className="py-2">Jane Smith</td>
              <td className="py-2">$149.99</td>
              <td className="py-2">Processing</td>
            </tr>
            <tr>
              <td className="py-2">#12347</td>
              <td className="py-2">Bob Johnson</td>
              <td className="py-2">$199.99</td>
              <td className="py-2">Shipped</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

