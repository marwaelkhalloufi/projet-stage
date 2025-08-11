// src/Login.jsx
// Ce fichier contient le composant de la page de connexion.
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Key } from 'lucide-react';
// Assurez-vous que le chemin './assets/loginlogo.png' est correct.
import loginlogo from './assets/loginlogo.png';
import { useAuth } from './contexts/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Gère la soumission du formulaire de connexion.
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(''); // Efface les erreurs précédentes

    try {
      await login(loginData, password); 
      navigate('/dashboard'); // Navigue vers le tableau de bord principal après une connexion réussie
    } catch (err) {
      setError(err.message || 'Identifiants invalides. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
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
                  type="text"
                  placeholder="Enter your login"
                  value={loginData}
                  onChange={(e) => setLoginData(e.target.value)}
                  className="w-full px-6 py-4 text-lg bg-transparent border-b-2 border-[#595ACC] focus:outline-none focus:border-[#4A4AB8] text-[#595ACC] placeholder-[#595ACC] font-medium"
                  disabled={isLoading}
                />
                <img
                  src="https://placehold.co/24x24/595ACC/FFFFFF?text=L"
                  alt="Login Icon"
                  className="absolute right-4 top-4 w-6 h-6 object-contain"
                  onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/24x24/595ACC/FFFFFF?text=L" }}
                />
              </div>
            </div>

            {/* Champ de mot de passe */}
            <div className="mb-10">
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-6 py-4 text-lg bg-transparent border-b-2 border-[#595ACC] focus:outline-none focus:border-[#4A4AB8] text-[#595ACC] placeholder-[#595ACC] font-medium"
                  disabled={isLoading}
                />
                <Key
                  className="absolute right-4 top-4 w-6 h-6 text-[#595ACC] cursor-pointer"
                  onClick={() => setShowPassword((prev) => !prev)}
                />
              </div>
            </div>

            {/* Bouton de soumission */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#595ACC] hover:bg-[#4A4AB8] disabled:bg-gray-400 text-white text-lg font-semibold py-4 px-6 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none"
            >
              {isLoading ? 'Connexion en cours...' : 'Se connecter'}
            </button>
          </form>

          {/* Bouton "Gestion des Comptes" */}
          <div className="mt-8 flex justify-center">
            <button
              // Utilise le chemin défini dans App.jsx
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
