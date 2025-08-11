import { useState } from "react"
import { Link } from "react-router-dom"

const navigationItems = [
  { id: "saisie", label: "SAISIE" },
  { id: "modification", label: "MODIFICATION" },
  { id: "consultation", label: "CONSULTATION" },
  { id: "suppression", label: "SUPPRESSION" },
]

// Custom Select Component
const CustomSelect = ({ placeholder, options, className = "" }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState("")

  return (
    <div className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-3 py-2 text-left bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 flex justify-between items-center"
      >
        <span className={selected ? "text-gray-900" : "text-gray-500"}>{selected || placeholder}</span>
        <svg
          className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                setSelected(option.label)
                setIsOpen(false)
              }}
              className="w-full px-3 py-2 text-left hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

// Custom Input Component
const CustomInput = ({ placeholder, className = "", type = "text", ...props }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${className}`}
      {...props}
    />
  )
}

// Custom Button Component
const CustomButton = ({ children, variant = "primary", className = "", ...props }) => {
  const baseClasses =
    "px-6 py-2 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2"
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500",
    secondary: "bg-gray-400 hover:bg-gray-500 text-white focus:ring-gray-500",
  }

  return (
    <button className={`${baseClasses} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  )
}

const MissionForm = () => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-0 max-w-lg mx-auto">
    <div className="bg-purple-100 text-center py-3 mb-0 rounded-t-lg">
      <h2 className="text-lg font-semibold text-gray-800">GESTION DES MISSIONS</h2>
    </div>

    <div className="p-6 space-y-4">
      <div>
        <label className="block text-blue-600 font-medium mb-2">Objet:</label>
        <CustomInput placeholder="Mission de contrôle..." />
      </div>

      <div>
        <label className="block text-blue-600 font-medium mb-2">Date début:</label>
        <div className="relative">
          <CustomInput placeholder="jj/mm/aaaa" className="pr-10" />
          <svg
            className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
      </div>

      <div>
        <label className="block text-blue-600 font-medium mb-2">Date fin:</label>
        <div className="relative">
          <CustomInput placeholder="jj/mm/aaaa" className="pr-10" />
          <svg
            className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
      </div>

      <div>
        <label className="block text-blue-600 font-medium mb-2">Trajet:</label>
        <CustomSelect
          placeholder="Sélectionner un trajet"
          options={[
            { value: "rabat", label: "Rabat" },
            { value: "fes", label: "Fes" },
            { value: "meknes", label: "Meknes " },
            { value: "taza", label: "taza" },
            { value: "ouajda", label: "Ouajda" },
          ]}
        />
      </div>

      <div>
        <label className="block text-blue-600 font-medium mb-2">Agents:</label>
        <CustomInput placeholder="Nom des agents..." />
      </div>

      <div>
        <label className="block text-blue-600 font-medium mb-2">Matricule:</label>
        <CustomSelect
          placeholder="Cliquer pour sélectionner des matricules"
          options={[
            { value: "mat001", label: "MAT001" },
            { value: "mat002", label: "MAT002" },
            { value: "mat003", label: "MAT003" },
          ]}
        />
      </div>

      <div className="flex justify-end gap-3 mt-8 pt-4">
        <CustomButton variant="secondary">Annuler</CustomButton>
        <CustomButton variant="primary">Enregistrer</CustomButton>
      </div>
    </div>
  </div>
)

const ModificationContent = () => {
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [missionNumber, setMissionNumber] = useState("")

  const handleOuiClick = () => {
    if (missionNumber.trim()) {
      setShowConfirmation(true)
    }
  }

  const handleNonClick = () => {
    setMissionNumber("")
    setShowConfirmation(false)
  }

  if (showConfirmation) {
    return (
      <div className="bg-gray-200 rounded-lg p-8 max-w-md mx-auto">
        <div className="text-center space-y-6">
          <div className="inline-block">
            <div className="bg-white border-2 border-gray-800 rounded-full px-6 py-2">
              <span className="text-gray-800 font-medium">Modification</span>
            </div>
          </div>

          <div className="bg-pink-100 border border-pink-300 rounded-lg p-4">
            <p className="text-pink-800 font-medium mb-2">Voulez-vous modifier la mission numéro : {missionNumber} ?</p>
            <div className="flex items-center justify-center text-pink-700 text-sm">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              Cette action modifiera les données
            </div>
          </div>

          <div className="flex justify-center gap-4">
            <button className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-8 rounded-full transition-colors">
              Confirmer
            </button>
            <button
              onClick={handleNonClick}
              className="bg-gray-400 hover:bg-gray-500 text-white font-medium py-2 px-8 rounded-full transition-colors"
            >
              Annuler
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-200 rounded-lg p-8 max-w-md mx-auto">
      <div className="text-center space-y-6">
        <div className="inline-block">
          <div className="bg-white border-2 border-gray-800 rounded-full px-6 py-2">
            <span className="text-gray-800 font-medium">Modification</span>
          </div>
        </div>

        <div>
          <CustomInput
            placeholder="Entrez le numéro de mission à modifier"
            className="bg-white rounded-full text-center text-gray-500"
            value={missionNumber}
            onChange={(e) => setMissionNumber(e.target.value)}
          />
        </div>

        <div className="flex justify-center gap-4">
          <button
            onClick={handleOuiClick}
            className="bg-white hover:bg-gray-50 text-gray-800 font-medium py-2 px-8 rounded-full border border-gray-300 transition-colors"
          >
            Oui
          </button>
          <button
            onClick={handleNonClick}
            className="bg-white hover:bg-gray-50 text-gray-800 font-medium py-2 px-8 rounded-full border border-gray-300 transition-colors"
          >
            Non
          </button>
        </div>
      </div>
    </div>
  )
}

const ConsultationContent = () => {
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [missionNumber, setMissionNumber] = useState("")

  const handleOuiClick = () => {
    if (missionNumber.trim()) {
      setShowConfirmation(true)
    }
  }

  const handleNonClick = () => {
    setMissionNumber("")
    setShowConfirmation(false)
  }

  if (showConfirmation) {
    return (
      <div className="bg-gray-200 rounded-lg p-8 max-w-md mx-auto">
        <div className="text-center space-y-6">
          <div className="inline-block">
            <div className="bg-white border-2 border-gray-800 rounded-full px-6 py-2">
              <span className="text-gray-800 font-medium">Consultation</span>
            </div>
          </div>

          <div className="bg-blue-100 border border-blue-300 rounded-lg p-4">
            <p className="text-blue-800 font-medium mb-2">
              Voulez-vous consulter la mission numéro : {missionNumber} ?
            </p>
            <div className="flex items-center justify-center text-blue-700 text-sm">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
              Affichage des détails de la mission
            </div>
          </div>

          <div className="flex justify-center gap-4">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-8 rounded-full transition-colors">
              Confirmer
            </button>
            <button
              onClick={handleNonClick}
              className="bg-gray-400 hover:bg-gray-500 text-white font-medium py-2 px-8 rounded-full transition-colors"
            >
              Annuler
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-200 rounded-lg p-8 max-w-md mx-auto">
      <div className="text-center space-y-6">
        <div className="inline-block">
          <div className="bg-white border-2 border-gray-800 rounded-full px-6 py-2">
            <span className="text-gray-800 font-medium">Consultation</span>
          </div>
        </div>

        <div>
          <CustomInput
            placeholder="Entrez le numéro de mission"
            className="bg-white rounded-full text-center text-gray-500"
            value={missionNumber}
            onChange={(e) => setMissionNumber(e.target.value)}
          />
        </div>

        <div className="flex justify-center gap-4">
          <button
            onClick={handleOuiClick}
            className="bg-white hover:bg-gray-50 text-gray-800 font-medium py-2 px-8 rounded-full border border-gray-300 transition-colors"
          >
            Oui
          </button>
          <button
            onClick={handleNonClick}
            className="bg-white hover:bg-gray-50 text-gray-800 font-medium py-2 px-8 rounded-full border border-gray-300 transition-colors"
          >
            Non
          </button>
        </div>
      </div>
    </div>
  )
}

const SuppressionContent = () => {
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [missionNumber, setMissionNumber] = useState("")

  const handleOuiClick = () => {
    if (missionNumber.trim()) {
      setShowConfirmation(true)
    }
  }

  const handleNonClick = () => {
    setMissionNumber("")
    setShowConfirmation(false)
  }

  if (showConfirmation) {
    return (
      <div className="bg-gray-200 rounded-lg p-8 max-w-md mx-auto">
        <div className="text-center space-y-6">
          <div className="inline-block">
            <div className="bg-white border-2 border-gray-800 rounded-full px-6 py-2">
              <span className="text-gray-800 font-medium">Suppression</span>
            </div>
          </div>

          <div className="bg-pink-100 border border-pink-300 rounded-lg p-4">
            <p className="text-pink-800 font-medium mb-2">
              Voulez-vous supprimer la mission numéro : {missionNumber} ?
            </p>
            <div className="flex items-center justify-center text-pink-700 text-sm">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              Cette action est irréversible
            </div>
          </div>

          <div className="flex justify-center gap-4">
            <button className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-8 rounded-full transition-colors">
              Confirmer
            </button>
            <button
              onClick={handleNonClick}
              className="bg-gray-400 hover:bg-gray-500 text-white font-medium py-2 px-8 rounded-full transition-colors"
            >
              Annuler
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-200 rounded-lg p-8 max-w-md mx-auto">
      <div className="text-center space-y-6">
        <div className="inline-block">
          <div className="bg-white border-2 border-gray-800 rounded-full px-6 py-2">
            <span className="text-gray-800 font-medium">Suppression</span>
          </div>
        </div>

        <div>
          <CustomInput
            placeholder="Entrez le numéro de mission à supprimer"
            className="bg-white rounded-full text-center text-gray-500"
            value={missionNumber}
            onChange={(e) => setMissionNumber(e.target.value)}
          />
        </div>

        <div className="flex justify-center gap-4">
          <button
            onClick={handleOuiClick}
            className="bg-white hover:bg-gray-50 text-gray-800 font-medium py-2 px-8 rounded-full border border-gray-300 transition-colors"
          >
            Oui
          </button>
          <button
            onClick={handleNonClick}
            className="bg-white hover:bg-gray-50 text-gray-800 font-medium py-2 px-8 rounded-full border border-gray-300 transition-colors"
          >
            Non
          </button>
        </div>
      </div>
    </div>
  )
}

export default function MissionManagement() {
  const [activeSection, setActiveSection] = useState("saisie")
  const [activeTab, setActiveTab] = useState("mission")

  const renderContent = () => {
    switch (activeSection) {
      case "saisie":
        return <MissionForm />
      case "modification":
        return <ModificationContent />
      case "consultation":
        return <ConsultationContent />
      case "suppression":
        return <SuppressionContent />
      default:
        return <MissionForm />
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-slate-700 text-white">
        <nav className="h-screen flex flex-col">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`flex-1 w-full flex items-center justify-center text-center px-6 hover:bg-slate-600 transition-colors border-b border-slate-600 ${
                activeSection === item.id ? "bg-slate-600 border-l-4 border-l-blue-400" : ""
              }`}
              style={{ height: "25%" }}
            >
              <span className="font-medium text-sm">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Header Tabs */}
        <div className="bg-white border-b border-gray-200">
          <div className="flex">
            <button
              onClick={() => setActiveTab("mission")}
              className={`px-8 py-4 font-medium border-b-2 transition-colors ${
                activeTab === "mission"
                  ? "border-blue-500 text-blue-600 bg-blue-50"
                  : "border-transparent text-gray-600 hover:text-gray-800"
              }`}
            >
              MISSION
            </button>
            <Link to='/missions'>
            </Link>
            <button
            
              className={`px-8 py-4 font-medium border-b-2 transition-colors `}
            >
              Dashboard
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-8">
          {activeTab === "mission" ? (
            renderContent()
          ) : (
            <div className="bg-white rounded-lg p-6 max-w-2xl mx-auto">
              <div className="bg-gray-200 text-center py-3 mb-6 rounded">
                <h2 className="text-lg font-semibold text-gray-800">INDEX DES MISSIONS</h2>
              </div>
              <div className="text-center py-12">
                <p className="text-gray-600">Contenu de l'index des missions</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
