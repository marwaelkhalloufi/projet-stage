import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Componnent/Layout';
import Login from './Login';
import CreationForm from './CreateAccountForm';
import ProtectedRoute from './Componnent/ProtectedRoute';
import Dashboard from './Dashboard/Dashboard';
import MissionManagement from './MissionManagement';
import { AuthProvider } from './contexts/AuthContext';
 

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
           <Route index  element={<Login />} />
          <Route path="/" element={<Layout />}>
            <Route path="register" element={<CreationForm />} />
            
            {/* Protected Routes */}
            <Route path="dashboard" element={<ProtectedRoute />}>
              <Route index element={<Dashboard />} />
              <Route path="missions" element={<MissionManagement />} />
             
            </Route>
            
         
       
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;