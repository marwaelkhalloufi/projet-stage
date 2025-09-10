import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Componnent/Layout';
import Login from './Login';
import CreationForm from './CreateAccountForm';
import ProtectedRoute from './Componnent/ProtectedRoute';
import Dashboard from './Dashboard/Dashboard';
import MissionManagement from './MissionManagement';
import { AuthProvider } from './contexts/AuthContext';
import Collaborateurs from './Dashboard/Collaborateurs';
import Direction from './Dashboard/Direction';
import TraitementDesFrais from './Dashboard/TraitementDesFrais';
import Statistique from './Dashboard/Statistique';
 
function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public routes */}
          <Route index element={<Login />} />
          <Route path="register" element={<CreationForm />} />

          {/* Protected dashboard routes */}
          <Route path="dashboard" element={<ProtectedRoute />}>
            <Route element={<Layout />}>
              {/* Dashboard main page */}
              <Route index element={<Dashboard />} />
              {/* Other dashboard pages */}
              <Route path="collaborateurs" element={<Collaborateurs />} />
              <Route path="direction" element={<Direction />} />
              <Route path="traitementDesFrais" element={<TraitementDesFrais />} />
              <Route path="statistique" element={<Statistique />} />
            </Route>
                
           <Route path="missions" element={<MissionManagement />} />


          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;


