import React, { useState } from 'react'
import { BarChart3, Home, Image, LogOut, Package, Settings, ShoppingBag, ShoppingCart, Tag, Users, Cake, Menu, X } from 'lucide-react'
import { Dashboard } from '../../Components/AdminComponents/Dashboard'
import { Orders } from '../../Components/AdminComponents/Oders'
import { Products } from '../../Components/AdminComponents/Products'
import { Customers } from '../../Components/AdminComponents/Customer'

export default function AdminDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [activeComponent, setActiveComponent] = useState('Dashboard')

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const renderComponent = () => {
    switch (activeComponent) {
      case 'Dashboard':
        return <Dashboard />
      case 'Orders':
        return <Orders />
      case 'Products':
        return <Products />
      case 'Customers':
        return <Customers />
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="min-h-screen bg-cover bg-center relative" style={{backgroundImage: "url('/placeholder.svg?height=1080&width=1920')"}}>
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>
      
      {/* Main Content Area */}
      <div className="relative min-h-screen flex">
        {/* Sidebar */}
        <div className={`fixed top-0 left-0 h-full w-64 bg-white bg-opacity-10 backdrop-blur-md text-white p-6 space-y-4 transition-all duration-300 z-20 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="flex items-center justify-between gap-2 mb-8">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-white rounded-lg">
                <Cake className="w-6 h-6 text-purple-600" />
              </div>
              <span className="text-xl font-bold">Cake<span className="text-purple-400">Admin</span></span>
            </div>
            <button onClick={toggleSidebar} className="text-white focus:outline-none">
              <X className="w-6 h-6" />
            </button>
          </div>

          <nav className="space-y-2">
            <NavItem icon={<Home />} label="Dashboard" active={activeComponent === 'Dashboard'} onClick={() => setActiveComponent('Dashboard')} />
            <NavItem icon={<Tag />} label="Category" />
            <NavItem icon={<Package />} label="Product" active={activeComponent === 'Products'} onClick={() => setActiveComponent('Products')} />
            <NavItem icon={<ShoppingCart />} label="Orders" active={activeComponent === 'Orders'} onClick={() => setActiveComponent('Orders')} />
            <NavItem icon={<Users />} label="Customers" active={activeComponent === 'Customers'} onClick={() => setActiveComponent('Customers')} />
            <NavItem icon={<Image />} label="Banner" />
            <NavItem icon={<BarChart3 />} label="Coupons" />
            <NavItem icon={<Settings />} label="Settings" />
          </nav>

          <div className="pt-4 mt-auto">
            <NavItem icon={<LogOut />} label="Logout" />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8 overflow-auto transition-all duration-300 w-full">
          <div className="flex justify-between items-center mb-8">
            <button onClick={toggleSidebar} className="text-white focus:outline-none z-30">
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-4xl font-bold text-white">{activeComponent}</h1>
            <div className="flex items-center gap-4">
              <span className="text-white">02 Aug 2023</span>
            </div>
          </div>
          {renderComponent()}
        </div>
      </div>
    </div>
  )
}

function NavItem({ icon, label, active, onClick }) {
  return (
    <a
      href="#"
      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition duration-200 ${
        active ? 'bg-white bg-opacity-20' : 'hover:bg-white hover:bg-opacity-10'
      }`}
      onClick={(e) => {
        e.preventDefault()
        onClick && onClick()
      }}
    >
      {icon}
      <span>{label}</span>
    </a>
  )
}

