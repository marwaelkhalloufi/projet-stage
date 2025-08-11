import React from 'react';

export default function AccountManagement() {
  return (
    <div className="min-h-screen bg-[#1E1D94] flex flex-col items-center justify-center">
      {/* Titre */}
      <div className="bg-white text-black font-bold text-lg px-6 py-2 rounded-full mb-12 shadow-md">
        Gestion des Comptes
      </div>

      {/* Grid des boutons */}
      <div className="grid grid-cols-2 gap-10">
        <button className="bg-gray-200 hover:bg-gray-300 px-8 py-6 rounded font-bold shadow-md">
          Création
        </button>
        <button className="bg-gray-200 hover:bg-gray-300 px-8 py-6 rounded font-bold shadow-md">
          Modification du mot de passe
        </button>
        <button className="bg-gray-200 hover:bg-gray-300 px-8 py-6 rounded font-bold shadow-md">
          Suppression du compte
        </button>
        <button className="bg-gray-200 hover:bg-gray-300 px-8 py-6 rounded font-bold shadow-md">
          Consultation
        </button>
      </div>
    </div>
  );
}
