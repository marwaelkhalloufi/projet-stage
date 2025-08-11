import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Key, Eye, EyeOff } from 'lucide-react';
import loginlogo from './assets/loginlogo.png';
import { useAuth } from './contexts/AuthContext';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  
  const { login, loading, error, isAuthenticated, clearError } = useAuth();
  const navigate = useNavigate();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (error) clearError();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(formData.email, formData.password);
    
    if (result.success) {
      console.log('Login successful');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#595ACC] via-[#6B6BD6] to-[#595ACC] flex items-center justify-center p-6">
      <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-5xl flex flex-col md:flex-row overflow-hidden">
        
        {/* Côté gauche (Image) */}
        <div className="bg-gray-100 flex justify-center items-center p-12 md:w-1/2 w-full">
          <img src={loginlogo} alt="SmartTrack Logo" className="w-[320px] h-auto" />
        </div>

        {/* Côté droit (Formulaire) */}
        <div className="p-12 md:w-1/2 w-full bg-gray-200">
          <h2 className="text-4xl font-bold text-[#595ACC] mb-10 text-center">Welcome Back</h2>

          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Champ de connexion */}
            <div className="mb-8">
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-6 py-4 text-lg bg-transparent border-b-2 border-[#595ACC] focus:outline-none focus:border-[#4A4AB8] text-[#595ACC] placeholder-[#595ACC] font-medium"
                  disabled={loading}
                />
                <img
                  src="https://placehold.co/24x24/595ACC/FFFFFF?text=@"
                  alt="Email Icon"
                  className="absolute right-4 top-4 w-6 h-6 object-contain"
                  onError={(e) => { 
                    e.target.onerror = null; 
                    e.target.src="https://placehold.co/24x24/595ACC/FFFFFF?text=@" 
                  }}
                />
              </div>
            </div>

            {/* Champ de mot de passe */}
            <div className="mb-10">
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-6 py-4 text-lg bg-transparent border-b-2 border-[#595ACC] focus:outline-none focus:border-[#4A4AB8] text-[#595ACC] placeholder-[#595ACC] font-medium"
                  disabled={loading}
                />
                {showPassword ? (
                  <EyeOff
                    className="absolute right-4 top-4 w-6 h-6 text-[#595ACC] cursor-pointer"
                    onClick={() => setShowPassword(false)}
                  />
                ) : (
                  <Eye
                    className="absolute right-4 top-4 w-6 h-6 text-[#595ACC] cursor-pointer"
                    onClick={() => setShowPassword(true)}
                  />
                )}
              </div>
            </div>

            {/* Bouton de soumission */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#595ACC] hover:bg-[#4A4AB8] disabled:bg-gray-400 text-white text-lg font-semibold py-4 px-6 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none"
            >
              {loading ? 'Connexion en cours...' : 'Se connecter'}
            </button>
          </form>

          {/* Bouton "Gestion des Comptes" */}
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => navigate('/gestion-comptes')}
              className="text-[#595ACC] font-medium text-md hover:underline"
            >
              Gestion des Comptes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}