import React from 'react'
import { DollarSign, ShoppingCart, Users, TrendingUp, CheckCircle, Package, Activity } from 'lucide-react'
import { MetricCard, StatCard, TopSellingItem } from './Cards'

export function Dashboard() {
  return (
    <div className="w-full space-y-6">
      {/* Top Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <MetricCard
          title="Revenue"
          value="$59,467"
          change="High"
          changeValue="+31.5%"
          bgColor="bg-purple-600"
          icon={<DollarSign className="w-5 h-5" />}
        />
        <MetricCard
          title="Orders"
          value="1,843"
          change="High"
          changeValue="+28.4%"
          bgColor="bg-teal-500"
          icon={<ShoppingCart className="w-5 h-5" />}
        />
        <MetricCard
          title="Customers"
          value="28,085"
          change="Low"
          changeValue="+0.21%"
          bgColor="bg-blue-600"
          icon={<Users className="w-5 h-5" />}
        />
      </div>

      {/* Revenue Highlight */}
      <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-xl font-semibold text-white">Revenue Tracker</h3>
          <TrendingUp className="w-5 h-5 text-white" />
        </div>
        <div className="text-white">
          <div className="text-3xl font-bold mb-1">$40,008</div>
          <div className="text-green-300 text-xs">+6.35% increase from last month</div>
          <div className="mt-2 h-32 relative overflow-hidden rounded-lg">
            <div className="absolute inset-0 flex items-end">
              <div className="w-full h-full relative">
                <div className="absolute inset-0 bg-gradient-to-t from-purple-500/30 to-transparent rounded-lg"></div>
                <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                  <path d="M0,50 Q25,30 50,50 T100,50" fill="none" stroke="rgba(167,139,250,0.5)" strokeWidth="2" />
                  <path d="M0,50 Q25,20 50,50 T100,50" fill="none" stroke="rgba(167,139,250,1)" strokeWidth="2" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Charts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold text-white">Top Selling Cakes</h3>
            <button className="text-gray-400 hover:text-white">•••</button>
          </div>
          <div className="space-y-2">
            <TopSellingItem name="Chocolate Delight" sales="234" />
            <TopSellingItem name="Strawberry Dream" sales="187" />
            <TopSellingItem name="Vanilla Bliss" sales="156" />
            <TopSellingItem name="Red Velvet Magic" sales="142" />
          </div>
        </div>

        <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold text-white">Order Statistics</h3>
            <button className="text-gray-400 hover:text-white">•••</button>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <StatCard title="Total Orders" value="1,843" icon={<ShoppingCart className="w-4 h-4" />} />
            <StatCard title="Completed" value="1,305" icon={<CheckCircle className="w-4 h-4" />} />
            <StatCard title="Pending" value="390" icon={<Package className="w-4 h-4" />} />
            <StatCard title="Cancelled" value="148" icon={<Activity className="w-4 h-4" />} />
          </div>
        </div>
      </div>
    </div>
  )
}

