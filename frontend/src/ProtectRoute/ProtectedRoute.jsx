
// import { Navigate, Outlet } from 'react-router-dom';
// import { useSelector } from 'react-redux';



// const LoginProtectedRoute = () => {

//   const {isAuthenticated,role} = useSelector((state) => state.auth);

 
//   if (isAuthenticated && role === 'user') {
//       console.log(role);
      
//     return <Navigate to="/user/home" replace />;
//   }


//   return <Outlet />;
// };



// const ProtectedRoute = () => {
//   const {isAuthenticated,role} = useSelector((state) => state.auth);

 
//   if (!isAuthenticated && !role === 'user') {
//     return <Navigate to="/user/login" replace />;
//   }

  
//   return <Outlet />;
// };




// const AdminProtectRoute = () => {

//   const {isAuthenticated} = useSelector((state) => state.auth);

 
//   if (!isAuthenticated) {
//     return <Navigate to="/admin/login" replace />;
//   }

//   return <Outlet />;
// };

// const AdminProtectRouteLogin= () => {
//   const { isAuthenticated, role } = useSelector((state) => state.auth);

  
//   if (isAuthenticated && role === 'admin') {
//     return <Navigate to="/admin" replace />;
//   }

//   return <Outlet />;
// };


// export{ ProtectedRoute,LoginProtectedRoute, AdminProtectRoute,AdminProtectRouteLogin}



import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';



const LoginProtectedRoute = () => {

  const {isAuthenticated} = useSelector((state) => state.user);

 
  if (isAuthenticated) {
      console.log(role);
      
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
