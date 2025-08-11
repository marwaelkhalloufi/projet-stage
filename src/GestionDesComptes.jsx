import { useState } from "react"
import { FileText, Trash2, Key, Users } from "lucide-react"; // Added Users icon

export default function GestionDesComptes() {
  const [activeTab, setActiveTab] = useState("creation") // State to manage active tab

  // State for "Création d'un compte" form
  const [creationNomUtilisateur, setCreationNomUtilisateur] = useState("")
  const [creationEmail, setCreationEmail] = useState("")
  const [creationTypeProfil, setCreationTypeProfil] = useState("")
  const [creationMotDePasse, setCreationMotDePasse] = useState("")
  const [creationConfirmationMotDePasse, setCreationConfirmationMotDePasse] = useState("")

  // State for "Suppression d'un compte" form
  const [deleteNomUtilisateur, setDeleteNomUtilisateur] = useState("")
  const [deleteConfirmationText, setDeleteConfirmationText] = useState("")

  // State for "Modification du mot de passe" form
  const [modificationNomUtilisateur, setModificationNomUtilisateur] = useState("")
  const [ancienMotDePasse, setAncienMotDePasse] = useState("")
  const [nouveauMotDePasse, setNouveauMotDePasse] = useState("")
  const [confirmerNouveauMotDePasse, setConfirmerNouveauMotDePasse] = useState("")

  // State for "Consultation des comptes" search
  const [searchTermConsultation, setSearchTermConsultation] = useState("")

  // Sample data for "Consultation des comptes"
  const allAccounts = [
    {
      id: 1,
      nom: "Marwa Elkhaloufi",
      email: "marwa.elkhaloufi@example.com",
      profil: "Gestion",
      dateCreation: "2024-01-15",
    },
    {
      id: 2,
      nom: "Chaymae Alaoui Chrif",
      email: "chaymae.alaoui@example.com",
      profil: "Gestion",
      dateCreation: "2024-02-10",
    },
    {
      id: 3,
      nom: "Dounia Jemmali",
      email: "dounia.jemmali@example.com",
      profil: "Consultation",
      dateCreation: "2024-03-05",
    },
    {
      id: 4,
      nom: "Youssef El Amrani",
      email: "youssef.elamrani@example.com",
      profil: "Gestion",
      dateCreation: "2024-04-20",
    },
  ]

  const filteredConsultationAccounts = allAccounts.filter(
    (account) =>
      account.nom.toLowerCase().includes(searchTermConsultation.toLowerCase()) ||
      account.email.toLowerCase().includes(searchTermConsultation.toLowerCase()),
  )

  const handleCreationSubmit = () => {
    e.preventDefault()
    if (creationMotDePasse !== creationConfirmationMotDePasse) {
      alert("Les mots de passe ne correspondent pas.")
      return
    }
    console.log({
      nomUtilisateur: creationNomUtilisateur,
      email: creationEmail,
      typeProfil: creationTypeProfil,
      motDePasse: creationMotDePasse,
    })
    alert("Compte créé avec succès (simulé)!")
    // Reset form
    setCreationNomUtilisateur("")
    setCreationEmail("")
    setCreationTypeProfil("")
    setCreationMotDePasse("")
    setCreationConfirmationMotDePasse("")
  }

  const handleDeleteSubmit = () => {
    e.preventDefault()
    if (deleteConfirmationText.toUpperCase() !== "SUPPRIMER") {
      alert("Veuillez taper 'SUPPRIMER' pour confirmer.")
      return
    }
    console.log(`Suppression de l'utilisateur: ${deleteNomUtilisateur}`)
    alert(`Compte ${deleteNomUtilisateur} supprimé (simulé)!`)
    // Reset form
    setDeleteNomUtilisateur("")
    setDeleteConfirmationText("")
  }

  const handleModificationSubmit = () => {
    e.preventDefault()
    // Add actual password modification logic here
    if (nouveauMotDePasse !== confirmerNouveauMotDePasse) {
      alert("Les nouveaux mots de passe ne correspondent pas.")
      return
    }
    console.log({
      modificationNomUtilisateur,
      ancienMotDePasse,
      nouveauMotDePasse,
    })
    alert("Mot de passe modifié avec succès (simulé)!")
    // Reset form
    setModificationNomUtilisateur("")
    setAncienMotDePasse("")
    setNouveauMotDePasse("")
    setConfirmerNouveauMotDePasse("")
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case "creation":
        return (
          <>
            <h3 className="text-xl font-semibold text-gray-800 mb-8 flex items-center justify-center">
              <FileText className="w-6 h-6 mr-2 text-blue-600" />
              Création d'un compte
            </h3>
            <form onSubmit={handleCreationSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="creationNomUtilisateur" className="block text-sm font-medium text-gray-700 mb-2">
                    Nom utilisateur
                  </label>
                  <input
                    type="text"
                    id="creationNomUtilisateur"
                    value={creationNomUtilisateur}
                    onChange={(e) => setCreationNomUtilisateur(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="creationEmail" className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="creationEmail"
                    value={creationEmail}
                    onChange={(e) => setCreationEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="creationTypeProfil" className="block text-sm font-medium text-gray-700 mb-2">
                  Type de Profil
                </label>
                <select
                  id="creationTypeProfil"
                  value={creationTypeProfil}
                  onChange={(e) => setCreationTypeProfil(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 appearance-none bg-white pr-8"
                  required
                >
                  <option value="">Sélectionner...</option>
                  <option value="Admin">Administrateur</option>
                  <option value="Direction">Direction</option>
                  <option value="Collaborateur">Collaborateur</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="creationMotDePasse" className="block text-sm font-medium text-gray-700 mb-2">
                    Mot de Passe
                  </label>
                  <input
                    type="password"
                    id="creationMotDePasse"
                    value={creationMotDePasse}
                    onChange={(e) => setCreationMotDePasse(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="creationConfirmationMotDePasse"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Confirmation Mot de Passe
                  </label>
                  <input
                    type="password"
                    id="creationConfirmationMotDePasse"
                    value={creationConfirmationMotDePasse}
                    onChange={(e) => setCreationConfirmationMotDePasse(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                    required
                  />
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold block mx-auto hover:bg-blue-700 transition-colors shadow-md"
                >
                  Créer le compte
                </button>
              </div>
            </form>
          </>
        )
      case "modification":
        return (
          <>
            <h3 className="text-xl font-semibold text-gray-800 mb-8 flex items-center justify-center">
              <Key className="w-6 h-6 mr-2 text-blue-600" />
              Modification du mot de passe
            </h3>
            <form onSubmit={handleModificationSubmit} className="space-y-6">
              <div>
                <label htmlFor="modificationNomUtilisateur" className="block text-sm font-medium text-gray-700 mb-2">
                  Nom utilisateur
                </label>
                <input
                  type="text"
                  id="modificationNomUtilisateur"
                  value={modificationNomUtilisateur}
                  onChange={(e) => setModificationNomUtilisateur(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                  required
                />
              </div>
              <div>
                <label htmlFor="ancienMotDePasse" className="block text-sm font-medium text-gray-700 mb-2">
                  Ancien mot de passe
                </label>
                <input
                  type="password"
                  id="ancienMotDePasse"
                  value={ancienMotDePasse}
                  onChange={(e) => setAncienMotDePasse(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="nouveauMotDePasse" className="block text-sm font-medium text-gray-700 mb-2">
                    Nouveau mot de passe
                  </label>
                  <input
                    type="password"
                    id="nouveauMotDePasse"
                    value={nouveauMotDePasse}
                    onChange={(e) => setNouveauMotDePasse(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="confirmerNouveauMotDePasse" className="block text-sm font-medium text-gray-700 mb-2">
                    Confirmer nouveau mot de passe
                  </label>
                  <input
                    type="password"
                    id="confirmerNouveauMotDePasse"
                    value={confirmerNouveauMotDePasse}
                    onChange={(e) => setConfirmerNouveauMotDePasse(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                    required
                  />
                </div>
              </div>
              <div className="pt-4">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold block mx-auto hover:bg-blue-700 transition-colors shadow-md"
                >
                  Modifier le mot de passe
                </button>
              </div>
            </form>
          </>
        )
      case "suppression":
        return (
          <>
            <h3 className="text-xl font-semibold text-gray-800 mb-8 flex items-center justify-center">
              <Trash2 className="w-6 h-6 mr-2 text-red-600" />
              Suppression d'un compte
            </h3>
            <form onSubmit={handleDeleteSubmit} className="space-y-6">
              <div>
                <label htmlFor="deleteNomUtilisateur" className="block text-sm font-medium text-gray-700 mb-2">
                  Nom utilisateur à supprimer
                </label>
                <input
                  type="text"
                  id="deleteNomUtilisateur"
                  value={deleteNomUtilisateur}
                  onChange={(e) => setDeleteNomUtilisateur(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                  required
                />
              </div>
              <div>
                <p className="text-sm text-red-600 mb-2">Tapez "SUPPRIMER" pour confirmer</p>
                <input
                  type="text"
                  id="deleteConfirmationText"
                  value={deleteConfirmationText}
                  onChange={(e) => setDeleteConfirmationText(e.target.value)}
                  className="w-full px-4 py-3 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300"
                  placeholder="SUPPRIMER"
                  required
                />
              </div>
              <div className="pt-4">
                <button
                  type="submit"
                  className="bg-red-600 text-white px-8 py-3 rounded-lg font-semibold block mx-auto hover:bg-red-700 transition-colors shadow-md"
                >
                  Supprimer le compte
                </button>
              </div>
            </form>
          </>
        )
      case "consultation":
        return (
          <>
            <h3 className="text-xl font-semibold text-gray-800 mb-8 flex items-center justify-center">
              <Users className="w-6 h-6 mr-2 text-blue-600" />
              Consultation des comptes
            </h3>
            <div className="mb-6">
              <label htmlFor="searchConsultation" className="sr-only">
                Rechercher un utilisateur
              </label>
              <input
                type="text"
                id="searchConsultation"
                placeholder="Nom ou email..."
                value={searchTermConsultation}
                onChange={(e) => setSearchTermConsultation(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>
            <p className="text-gray-700 font-semibold mb-4">
              Utilisateurs trouvés ({filteredConsultationAccounts.length})
            </p>
            <div className="space-y-4">
              {filteredConsultationAccounts.length > 0 ? (
                filteredConsultationAccounts.map((account) => (
                  <div key={account.id} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 text-sm">
                      <div>
                        <span className="font-semibold">Nom:</span> {account.nom}
                      </div>
                      <div>
                        <span className="font-semibold">Email:</span> {account.email}
                      </div>
                      <div>
                        <span className="font-semibold">Profil:</span> {account.profil}
                      </div>
                      <div>
                        <span className="font-semibold">Créé le:</span> {account.dateCreation}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">Aucun utilisateur trouvé.</div>
              )}
            </div>
          </>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center">
      {/* Top "Gestion des comptes" button */}
      <div className="mb-8">
        <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold shadow-md">
          Gestion des comptes
        </button>
      </div>

      {/* Action buttons (Tabs) */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        <button
          onClick={() => setActiveTab("creation")}
          className={`border border-blue-600 text-blue-600 px-6 py-2 rounded-lg transition-colors ${
            activeTab === "creation" ? "bg-blue-50" : "bg-white hover:bg-blue-50"
          }`}
        >
          Création d'un compte
        </button>
        <button
          onClick={() => setActiveTab("modification")}
          className={`border border-blue-600 text-blue-600 px-6 py-2 rounded-lg transition-colors ${
            activeTab === "modification" ? "bg-blue-50" : "bg-white hover:bg-blue-50"
          }`}
        >
          Modification du mot de passe
        </button>
        <button
          onClick={() => setActiveTab("suppression")}
          className={`border border-blue-600 text-blue-600 px-6 py-2 rounded-lg transition-colors ${
            activeTab === "suppression" ? "bg-blue-50" : "bg-white hover:bg-blue-50"
          }`}
        >
          Suppression d'un compte
        </button>
        <button
          onClick={() => setActiveTab("consultation")}
          className={`border border-blue-600 text-blue-600 px-6 py-2 rounded-lg transition-colors ${
            activeTab === "consultation" ? "bg-blue-50" : "bg-white hover:bg-blue-50"
          }`}
        >
          Consultation des comptes
        </button>
      </div>

      {/* Dynamic Content Card */}
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl">{renderTabContent()}</div>
    </div>
  )
}
