import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import loginlogo from './assets/loginlogo.png';

function ForgotPasswordForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Veuillez saisir votre adresse email');
      return;
    }

    if (!validateEmail(email)) {
      setError('Veuillez saisir une adresse email valide');
      return;
    }

    // Ici vous pouvez ajouter l'appel API pour réinitialiser le mot de passe
    console.log('Email de réinitialisation:', email);
    setIsSubmitted(true);
    
    // Simuler un délai pour l'envoi
    setTimeout(() => {
      alert(`Un email de réinitialisation a été envoyé à ${email}`);
      navigate('/login');
    }, 2000);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#595ACC] via-[#6B6BD6] to-[#595ACC] flex items-center justify-center p-6">
        <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-md p-12 text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-[#595ACC] mb-4">Email envoyé!</h2>
          <p className="text-gray-600 mb-6">
            Nous avons envoyé un lien de réinitialisation à votre adresse email.
          </p>
          <button
            onClick={() => navigate('/login')}
            className="bg-[#595ACC] hover:bg-[#4A4AB8] text-white font-semibold py-3 px-6 rounded-full transition-all duration-200"
          >
            Retour à la connexion
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#595ACC] via-[#6B6BD6] to-[#595ACC] flex items-center justify-center p-6">
      <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-5xl flex flex-col md:flex-row overflow-hidden">
        {/* Left Side (Image) */}
        <div className="bg-gray-100 flex justify-center items-center p-12 md:w-1/2 w-full">
          <img src={loginlogo} alt="Forgot Password" className="w-[320px] h-auto" />
        </div>

        {/* Right Side (Form) */}
        <div className="p-12 md:w-1/2 w-full bg-gray-200">
          <div className="flex items-center mb-8">
            <button
              onClick={() => navigate('/login')}
              className="mr-4 p-2 rounded-full hover:bg-gray-300 transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-[#595ACC]" />
            </button>
            <h2 className="text-4xl font-bold text-[#595ACC]">Mot de passe oublié</h2>
          </div>

          <div className="mb-8">
            <p className="text-gray-600 text-lg">
              Entrez votre adresse email et nous vous enverrons un lien pour réinitialiser votre mot de passe.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="relative">
              <input
                type="email"
                placeholder="Adresse email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError('');
                }}
                className={`w-full px-6 py-4 text-lg bg-transparent border-b-2 focus:outline-none focus:ring-0 text-[#595ACC] placeholder-[#595ACC] font-medium ${
                  error ? 'border-red-500' : 'border-[#595ACC] focus:border-[#4A4AB8]'
                }`}
              />
              <Mail className="absolute right-4 top-4 w-6 h-6 text-[#595ACC]" />
              {error && (
                <p className="text-red-500 text-sm mt-1">{error}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#595ACC] hover:bg-[#4A4AB8] text-white text-lg font-semibold py-4 px-6 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 mt-8"
            >
              Envoyer le lien de réinitialisation
            </button>
          </form>

          {/* Bottom Links */}
          <div className="mt-8 text-center">
            <p className="text-[#595ACC] font-medium">
              Vous vous souvenez de votre mot de passe?{' '}
              <button 
                onClick={() => navigate('/login')} 
                className="hover:underline font-semibold"
              >
                Se connecter
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPasswordForm;