
import { Link } from 'react-router-dom';
import { Cake, LayoutDashboard, ShoppingCart, Package, List, Tag, Image, Users, Settings,LogOut} from 'lucide-react';

function Sidebar({ isOpen }) {
  const menuItems = [
    { icon: LayoutDashboard, name: 'Dashboard', path: '/admin/dashboard' },
    { icon: List, name: 'Category', path: '/admin/category'},
    { icon: Package, name: 'Products', path: '/admin/products' },
    { icon: ShoppingCart, name: 'Orders', path: '/admin/orders' },
    { icon: Tag, name: 'Coupon', path: '/admin/coupon' },
    { icon: Image, name: 'Banner', path: '/admin/banner' },
    { icon: Users, name: 'Customer', path: '/admin/customers' },
    { icon: Settings, name: 'Settings', path: '/admin/settings' },
  ];

  return (
    <>
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full z-40 w-64 bg-white bg-opacity-10 backdrop-blur-md text-white p-6 space-y-4 transition-all duration-300 ease-in-out transform
           ${isOpen ? 'translate-x-0' : '-translate-x-full' } transition-sidebar`}
      >
        <div className="flex items-center justify-between gap-2 mb-10">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-white rounded-lg">
              <Cake className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-xl font-bold">Admin</span>
          </div>
       
        </div>

        <nav>
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="flex items-center gap-2 p-2 mt-5 rounded transition duration-150 ease-in-out hover:bg-white hover:bg-opacity-10"

            >
              <item.icon className="w-5 h-5" />
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>
        <div className="absolute bottom-4 w-full px-6">
          <button
            
            className="flex items-center gap-2 p-2 w-full text-red-600 rounded-lg transition duration-150 ease-in-out hover:bg-white hover:bg-opacity-10 "
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>


      </div>
    </>
  );
}

export default Sidebar;
