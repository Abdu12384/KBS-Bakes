import React from "react"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserRoute from "./Routes/UserRoute";
import PageNotFount from "./Pages/PageNotFount/PageNotFount";
import AdminRoute from "./Routes/AdminRoute";
function App() {

  return (
      <Router>
          <Routes>
              <Route path="/" element={<h1>HOME page</h1>}/>

              
              {/* User routes */}
             <Route path="/user/*" element={<UserRoute/>}/>
             <Route path="*" element={<PageNotFount/>} />


              {/* Admin route */}
             <Route path="/admin/*" element={<AdminRoute/>}/>
          </Routes>
      </Router>
  )
}

export default App
