import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { Menu } from 'lucide-react';

function AdminLayout() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="relative min-h-screen">
      {/* Dark, semi-transparent backdrop with blur */}
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>

      {/* Content container */}
      <div className="relative z-10 flex min-h-screen">
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
        <div className="flex-1 flex flex-col overflow-hidden ">
          <header className={`fixed top transition-all  duration-300  z-50 p-4 ${isOpen?' left-[150px]':'left-4'} `}>
          <div
            className="relative cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="rounded-full overflow-hidden  border-purple-600 w-20 h-20">
              <img
                src="https://via.placeholder.com/150" // Replace with actual admin photo URL
                alt="Admin Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          </header>
          <main className="flex-1 overflow-x-hidden overflow-y-auto">
            <div className="container mx-auto px-6 py-8">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
