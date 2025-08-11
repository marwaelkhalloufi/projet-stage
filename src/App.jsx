import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Componnent/Layout';
import Login from './Login';
import CreationForm from './CreateAccountForm';
import ProtectedRoute from './Componnent/ProtectedRoute';
import Dashboard from './Dashboard/Dashboard';
import MissionManagement from './MissionManagement';
 

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Layout />}>
            <Route  element={<Home />} />
            <Route index  element={<Login />} />
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