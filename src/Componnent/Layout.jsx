import { Outlet } from 'react-router-dom';
import Sidebar from '../Dashboard/Sidebar';

const Layout = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default Layout;