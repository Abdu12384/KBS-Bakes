import React from 'react'
import { Routes,Route } from 'react-router-dom'
import AdminLogin from '../Pages/Admin/AdminLoginPage'
import AdminLayout from '../Components/AdminComponents/AdminLayout'
import { AdminDashboard } from '../Pages/Admin/AdminDashboard'
import AdminProductsPage from '../Pages/Admin/AdminProductPage'
import { OrdersPage } from '../Pages/Admin/AdminOrdersPage'
import CustomerPanel from '../Pages/Admin/CustomerPanel'
function AdminRoute() {
  return (
   <Routes>
         <Route path='login' element={<AdminLogin/>}/>


         <Route path="/" element={<AdminLayout />} >
                <Route index element={<AdminDashboard />} />
                <Route path='dashboard' element={<AdminDashboard />} /> 
                <Route path="orders" element={<OrdersPage />} />
                <Route path="products" element={<AdminProductsPage />} />
                <Route path="customers" element={<CustomerPanel />} />
          </Route>
        {/* <Route path="logout" element={<Logout />} /> */}



   </Routes>
  )
}

export default AdminRoute
