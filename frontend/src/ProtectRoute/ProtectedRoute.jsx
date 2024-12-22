

import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';



const LoginProtectedRoute = () => {

  const {isAuthenticated} = useSelector((state) => state.user);

 
  if (isAuthenticated) {

      
    return <Navigate to="/user/home" replace />;
  }


  return <Outlet />;
};



const ProtectedRoute = () => {
  const {isAuthenticated} = useSelector((state) => state.user);

 
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  
  return <Outlet />;
};




const AdminProtectRoute = () => {

  const {isAuthenticated} = useSelector((state) => state.admin);

 
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
};

const AdminProtectRouteLogin= () => {
  const { isAuthenticated } = useSelector((state) => state.admin);

  
  if (isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  return <Outlet />;
};

export{ ProtectedRoute,LoginProtectedRoute, AdminProtectRoute,AdminProtectRouteLogin}
