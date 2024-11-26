import React from "react"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserRoute from "./Routes/UserRoute";
import PageNotFount from "./Pages/PageNotFount/PageNotFount";
function App() {

  return (
      <Router>
          <Routes>
              <Route path="/" element={<h1>HOME page</h1>}/>

              
              {/* User routes */}
             <Route path="/user/*" element={<UserRoute/>}/>
             <Route path="*" element={<PageNotFount/>} />

          </Routes>
      </Router>
  )
}

export default App
