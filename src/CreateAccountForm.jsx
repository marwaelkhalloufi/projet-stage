import React, { useState } from 'react';

export default function CreationForm() {
  const [formData, setFormData] = useState({
    nomUtilisateur: '',
    email: '',
    typeProfil: '',
    motDePasse: '',
    confirmationMotDePasse: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    // Vérification que les mots de passe correspondent
    if (formData.motDePasse !== formData.confirmationMotDePasse) {
      alert('Les mots de passe ne correspondent pas');
      return;
    }
    
    // Vérification que tous les champs sont remplis
    if (!formData.nomUtilisateur || !formData.email || !formData.typeProfil || !formData.motDePasse) {
      alert('Veuillez remplir tous les champs');
      return;
    }
    
    console.log('Données du formulaire:', formData);
    alert('Compte créé avec succès !');
  };

  const customBlue = '#1E6CB0';

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{backgroundColor: customBlue}}>
      <div className="p-8 w-full max-w-md" style={{backgroundColor: customBlue}}>
        <div className="space-y-6">
          {/* Titre */}
          <div className="text-center mb-8">
            <h1 className="bg-white px-8 py-3 rounded-full text-lg font-semibold inline-block" style={{color: customBlue}}>
              Création des comptes
            </h1>
          </div>

          {/* Nom utilisateur */}
          <div className="grid grid-cols-2 gap-4 items-center">
            <label className="bg-white px-4 py-3 rounded text-sm font-medium" style={{color: customBlue}}>
              Nom utilisateure
            </label>
            <input
              type="text"
              name="nomUtilisateur"
              value={formData.nomUtilisateur}
              onChange={handleInputChange}
              className="bg-white px-4 py-3 rounded border-none outline-none focus:ring-2"
              style={{'--tw-ring-color': customBlue}}
              placeholder=""
            />
          </div>

          {/* Email */}
          <div className="grid grid-cols-2 gap-4 items-center">
            <label className="bg-white px-4 py-3 rounded text-sm font-medium" style={{color: customBlue}}>
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="bg-white px-4 py-3 rounded border-none outline-none focus:ring-2"
              style={{'--tw-ring-color': customBlue}}
              placeholder=""
            />
          </div>

          {/* Type de Profil */}
          <div className="grid grid-cols-2 gap-4 items-center">
            <label className="bg-white px-4 py-3 rounded text-sm font-medium" style={{color: customBlue}}>
              Type de Profil
            </label>
            <select
              name="typeProfil"
              value={formData.typeProfil}
              onChange={handleInputChange}
              className="bg-white px-4 py-3 rounded border-none outline-none focus:ring-2"
              style={{'--tw-ring-color': customBlue}}
            >
              <option value="">Sélectionner...</option>
              <option value="administrateur">Administrateur</option>
              <option value="gestion">Gestion</option>
              <option value="consultation">Consultation</option>
            </select>
          </div>

          {/* Mot de Passe */}
          <div className="grid grid-cols-2 gap-4 items-center">
            <label className="bg-white px-4 py-3 rounded text-sm font-medium" style={{color: customBlue}}>
              Mot de Passe
            </label>
            <input
              type="password"
              name="motDePasse"
              value={formData.motDePasse}
              onChange={handleInputChange}
              className="bg-white px-4 py-3 rounded border-none outline-none focus:ring-2"
              style={{'--tw-ring-color': customBlue}}
              placeholder=""
            />
          </div>

          {/* Confirmation Mot de Passe */}
          <div className="grid grid-cols-2 gap-4 items-center">
            <label className="bg-white px-4 py-3 rounded text-sm font-medium text-xs leading-tight" style={{color: customBlue}}>
              Confirmation de Mot de Passe
            </label>
            <input
              type="password"
              name="confirmationMotDePasse"
              value={formData.confirmationMotDePasse}
              onChange={handleInputChange}
              className="bg-white px-4 py-3 rounded border-none outline-none focus:ring-2"
              style={{'--tw-ring-color': customBlue}}
              placeholder=""
            />
          </div>

          {/* Bouton Enregistrer */}
          <div className="text-center mt-8">
            <button
              onClick={handleSubmit}
              className="bg-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2"
              style={{color: customBlue, '--tw-ring-color': customBlue}}
            >
              Enregistrer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}