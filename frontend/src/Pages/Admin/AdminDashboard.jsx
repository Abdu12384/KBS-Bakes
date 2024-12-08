

import { BarChart3, DollarSign, ShoppingBag, Users } from 'lucide-react';

export function AdminDashboard() {
  // Sample data - replace with your actual data
  const stats = [
    {
      title: "Total Sales",
      value: "₹59,467",
      icon: DollarSign,
      change: "+31.2%",
      changeType: "positive"
    },
    {
      title: "Total Orders",
      value: "28,085",
      icon: ShoppingBag,
      change: "+3.2%",
      changeType: "positive"
    },
    {
      title: "Total Customers",
      value: "39,645",
      icon: Users,
      change: "-0.21%",
      changeType: "negative"
    },
    {
      title: "Revenue",
      value: "₹44,148",
      icon: BarChart3,
      change: "+1.12%",
      changeType: "positive"
    }
  ];

  const revenueData = [
    { month: 'Jan', online: 4000, offline: 2400 },
    { month: 'Feb', online: 3000, offline: 1398 },
    { month: 'Mar', online: 2000, offline: 9800 },
    { month: 'Apr', online: 2780, offline: 3908 },
    { month: 'May', online: 1890, offline: 4800 },
    { month: 'Jun', online: 2390, offline: 3800 },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="relative overflow-hidden rounded-lg bg-white bg-opacity-10 backdrop-blur-lg p-6"
          >
            <dt>
              <div className="absolute rounded-md bg-purple-500 bg-opacity-20 p-3">
                <stat.icon className="h-6 w-6 text-purple-600" aria-hidden="true" />
              </div>
              <p className="ml-16 truncate text-sm font-medium text-gray-300">
                {stat.title}
              </p>
            </dt>
            <dd className="ml-16 flex items-baseline">
              <p className="text-2xl font-semibold text-white">{stat.value}</p>
              <p
                className={`ml-2 flex items-baseline text-sm font-semibold ${
                  stat.changeType === "positive" ? "text-green-400" : "text-red-400"
                }`}
              >
                {stat.change}
              </p>
            </dd>
          </div>
        ))}
      </div>

      {/* Revenue Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Monthly Revenue */}
        <div className="rounded-lg bg-white bg-opacity-10 backdrop-blur-lg p-6">
          <h3 className="text-lg font-medium text-white mb-4">Monthly Revenue</h3>
          <div className="h-[300px] w-full">
            {/* Replace with your preferred chart library */}
            <div className="flex h-full items-end space-x-2">
              {revenueData.map((data) => (
                <div key={data.month} className="flex-1">
                  <div className="relative h-full">
                    <div
                      className="absolute bottom-0 w-full bg-purple-600 rounded-t"
                      style={{ height: `${(data.online / 10000) * 100}%` }}
                    ></div>
                    <div
                      className="absolute bottom-0 w-full bg-purple-300 rounded-t opacity-50"
                      style={{ height: `${(data.offline / 10000) * 100}%` }}
                    ></div>
                  </div>
                  <div className="text-center mt-2 text-sm text-gray-300">
                    {data.month}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sales Distribution */}
        <div className="rounded-lg bg-white bg-opacity-10 backdrop-blur-lg p-6">
          <h3 className="text-lg font-medium text-white mb-4">Sales Distribution</h3>
          <div className="relative h-[300px]">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-48 w-48 rounded-full border-8 border-purple-600">
                <div className="relative h-full w-full">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">67%</div>
                      <div className="text-sm text-gray-300">Online Sales</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-lg font-semibold text-white">12%</div>
                <div className="text-sm text-gray-300">In-Store</div>
              </div>
              <div>
                <div className="text-lg font-semibold text-white">20%</div>
                <div className="text-sm text-gray-300">Phone Orders</div>
              </div>
              <div>
                <div className="text-lg font-semibold text-white">67%</div>
                <div className="text-sm text-gray-300">Online</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Customer Stats */}
      <div className="rounded-lg bg-white bg-opacity-10 backdrop-blur-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-white">Customer Overview</h3>
          <select className="bg-transparent text-white border border-gray-600 rounded-md px-2 py-1">
            <option value="weekly">This Week</option>
            <option value="monthly">This Month</option>
            <option value="yearly">This Year</option>
          </select>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">92,556</div>
            <div className="text-sm text-gray-300">Total Customers</div>
            <div className="text-xs text-green-400">+1.35% More than last month</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">53,812</div>
            <div className="text-sm text-gray-300">Active Customers</div>
            <div className="text-xs text-red-400">-0.17% Less than last month</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">40,008</div>
            <div className="text-sm text-gray-300">New Customers</div>
            <div className="text-xs text-green-400">+0.06% More than last month</div>
          </div>
        </div>
      </div>
    </div>
  );
}



