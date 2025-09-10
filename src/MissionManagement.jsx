import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "./contexts/AuthContext"

// API Service
const API_BASE_URL = 'http://localhost:8000/api'

class MissionAPI {
  constructor() {
    this.baseURL = API_BASE_URL
    this.authToken = null
  }

  setAuthToken(token) {
    this.authToken = token
  }

  clearAuthToken() {
    this.authToken = null
  }

  async makeRequest(url, options = {}) {
  try {
    const fullUrl = `${this.baseURL}${url}`;
    
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...(this.authToken && { 'Authorization': `Bearer ${this.authToken}` }),
      ...options.headers,
    };

    const response = await fetch(fullUrl, {
      ...options,
      headers,
      credentials: 'include'
    });

    // Handle non-JSON responses
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error(`Expected JSON response, got ${contentType}`);
    }

    const data = await response.json();
    
    if (!response.ok) {
      const errorMessage = data.message || data.error || response.statusText;
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorMessage}`);
    }

    return data;
    
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}

  // Mission endpoints
  async getMissions() {
    return this.makeRequest('/missions')
  }

  async getMission(id) {
    return this.makeRequest(`/missions/${id}`)
  }

  async createMission(missionData) {
    return this.makeRequest('/missions', {
      method: 'POST',
      body: JSON.stringify(missionData),
    })
  }

  async updateMission(id, missionData) {
    return this.makeRequest(`/missions/${id}`, {
      method: 'PUT',
      body: JSON.stringify(missionData),
    })
  }

  async deleteMission(id) {
    return this.makeRequest(`/missions/${id}`, {
      method: 'DELETE',
    })
  }

  // Agent endpoints
  async getAgents() {
    return this.makeRequest('/agents')
  }

  // Vehicle endpoints  
  async getVehicules() {
    return this.makeRequest('/vehicules')
  }
}

export const missionAPI = new MissionAPI()

// UI Components
const navigationItems = [
  { id: "saisie", label: "SAISIE" },
  { id: "modification", label: "MODIFICATION" },
  { id: "consultation", label: "CONSULTATION" },
  { id: "suppression", label: "SUPPRESSION" },
]

const CustomSelect = ({ placeholder, options, value, onChange, className = "" }) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleSelect = (option) => {
    onChange(option.value)
    setIsOpen(false)
  }

  const selectedLabel = options.find(opt => opt.value === value)?.label || ''

  return (
    <div className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-3 py-2 text-left bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 flex justify-between items-center"
      >
        <span className={value ? "text-gray-900" : "text-gray-500"}>{selectedLabel || placeholder}</span>
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
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => handleSelect(option)}
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

const CustomInput = ({ placeholder, className = "", type = "text", value, onChange, ...props }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${className}`}
      {...props}
    />
  )
}

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

const MissionForm = ({ missionToEdit, onSaveSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    objet: missionToEdit?.objet || '',
    date_debut: missionToEdit?.date_debut || '',
    date_fin: missionToEdit?.date_fin || '',
    destination: missionToEdit?.destination || '',
    description: missionToEdit?.description || '',
    budget_prevu: missionToEdit?.budget_prevu || '',
    agent_id: missionToEdit?.agent_id || '',
    vehicule_id: missionToEdit?.vehicule_id || '',
    statut: missionToEdit?.statut || 'planifie',
  })
  const [agents, setAgents] = useState([])
  const [vehicules, setVehicules] = useState([])
  const [loading, setLoading] = useState(false)
  const [loadingData, setLoadingData] = useState(true)
  const [error, setError] = useState('')
  const { token } = useAuth()

  useEffect(() => {
    if (token) {
      missionAPI.setAuthToken(token)
      fetchAgentsAndVehicules()
    }
  }, [token])

  const fetchAgentsAndVehicules = async () => {
  try {
    setLoadingData(true);
    const [agentsResponse, vehiculesResponse] = await Promise.all([
      missionAPI.getAgents(),
      missionAPI.getVehicules()
    ]);

    // Check the response structure
    if (agentsResponse && agentsResponse.success) {
      setAgents(agentsResponse.data || []);
    } else {
      console.error('Invalid agents response:', agentsResponse);
      setError('Format de réponse invalide pour les agents');
    }
if (Array.isArray(vehiculesResponse)) {
  setVehicules(vehiculesResponse);
} else if (vehiculesResponse && vehiculesResponse.success) {
  setVehicules(vehiculesResponse.data || []);
} else {
  console.error('Invalid vehicules response:', vehiculesResponse);
  setError('Format de réponse invalide pour les véhicules');
}

  } catch (err) {
    console.error('Error fetching data:', err);
    setError('Erreur lors du chargement des données: ' + err.message);
  } finally {
    setLoadingData(false);
  }
};

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const submitData = {
        ...formData,
        agent_id: parseInt(formData.agent_id),
        vehicule_id: parseInt(formData.vehicule_id),
        budget_prevu: parseFloat(formData.budget_prevu) || 0
      }

      if (missionToEdit) {
        await missionAPI.updateMission(missionToEdit.id, submitData)
      } else {
        await missionAPI.createMission(submitData)
      }
      onSaveSuccess()
    } catch (err) {
      setError(err.message || 'Une erreur est survenue')
    } finally {
      setLoading(false)
    }
  }

  if (loadingData) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 max-w-lg mx-auto">
        <div className="text-center py-8">
          <p className="text-gray-600">Chargement des données...</p>
        </div>
      </div>
    )
  }

  // Prepare agent options
  const agentOptions = agents.map(agent => ({
    value: agent.id.toString(),
    label: `${agent.nom_prenom} (${agent.matricule})`
  }))

  // Prepare vehicule options
  const vehiculeOptions = vehicules.map(vehicule => ({
    value: vehicule.id.toString(),
    label: `${vehicule.immatriculation} - ${vehicule.marque} ${vehicule.modele}`
  }))

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-0 max-w-lg mx-auto">
      <div className="bg-purple-100 text-center py-3 mb-0 rounded-t-lg">
        <h2 className="text-lg font-semibold text-gray-800">GESTION DES MISSIONS</h2>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-4">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <div>
          <label className="block text-blue-600 font-medium mb-2">Objet:</label>
          <CustomInput 
            name="objet"
            placeholder="Mission de contrôle..." 
            value={formData.objet}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block text-blue-600 font-medium mb-2">Date début:</label>
          <div className="relative">
            <CustomInput 
              type="date"
              name="date_debut"
              value={formData.date_debut}
              onChange={handleChange}
              className="pr-10"
              required
            />
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
            <CustomInput 
              type="date"
              name="date_fin"
              value={formData.date_fin}
              onChange={handleChange}
              className="pr-10"
              required
            />
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
          <label className="block text-blue-600 font-medium mb-2">Destination:</label>
          <CustomSelect
            placeholder="Sélectionner une destination"
            value={formData.destination}
            onChange={(value) => handleSelectChange('destination', value)}
            options={[
              { value: "Rabat", label: "Rabat" },
              { value: "Fès", label: "Fès" },
              { value: "Meknès", label: "Meknès" },
              { value: "Taza", label: "Taza" },
              { value: "Oujda", label: "Oujda" },
              { value: "Casablanca", label: "Casablanca" },
              { value: "Marrakech", label: "Marrakech" },
            ]}
          />
        </div>

        <div>
          <label className="block text-blue-600 font-medium mb-2">Description:</label>
          <textarea
            name="description"
            placeholder="Description détaillée de la mission..."
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-blue-600 font-medium mb-2">Budget prévu (MAD):</label>
          <CustomInput 
            type="number"
            step="0.01"
            name="budget_prevu"
            placeholder="0.00" 
            value={formData.budget_prevu}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-blue-600 font-medium mb-2">Agent:</label>
          <CustomSelect
            placeholder="Sélectionner un agent"
            value={formData.agent_id}
            onChange={(value) => handleSelectChange('agent_id', value)}
            options={agentOptions}
          />
          {agentOptions.length === 0 && (
            <p className="text-sm text-gray-500 mt-1">Aucun agent disponible</p>
          )}
        </div>

        <div>
          <label className="block text-blue-600 font-medium mb-2">Véhicule:</label>
          <CustomSelect
            placeholder="Sélectionner un véhicule"
            value={formData.vehicule_id}
            onChange={(value) => handleSelectChange('vehicule_id', value)}
            options={vehiculeOptions}
          />
          {vehiculeOptions.length === 0 && (
            <p className="text-sm text-gray-500 mt-1">Aucun véhicule disponible</p>
          )}
        </div>

        <div>
          <label className="block text-blue-600 font-medium mb-2">Statut:</label>
          <CustomSelect
            placeholder="Sélectionner un statut"
            value={formData.statut}
            onChange={(value) => handleSelectChange('statut', value)}
            options={[
              { value: "planifie", label: "Planifié" },
              { value: "en_cours", label: "En cours" },
              { value: "termine", label: "Terminé" },
              { value: "annule", label: "Annulé" },
            ]}
          />
        </div>

        <div className="flex justify-end gap-3 mt-8 pt-4">
          <CustomButton 
            type="button" 
            variant="secondary" 
            onClick={onCancel}
            disabled={loading}
          >
            Annuler
          </CustomButton>
          <CustomButton 
            type="submit" 
            variant="primary"
            disabled={loading}
          >
            {loading ? 'En cours...' : 'Enregistrer'}
          </CustomButton>
        </div>
      </form>
    </div>
  )
}

const ModificationContent = () => {
  const [missionId, setMissionId] = useState("")
  const [missionToEdit, setMissionToEdit] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { token } = useAuth()

  useEffect(() => {
    if (token) {
      missionAPI.setAuthToken(token)
    }
  }, [token])

  const handleSearch = async () => {
    if (!missionId.trim()) return
    
    setLoading(true)
    setError('')
    
    try {
      const response = await missionAPI.getMission(missionId)
      
      if (response.success && response.data) {
        setMissionToEdit(response.data)
        setShowForm(true)
      } else {
        setError('Mission non trouvée')
      }
    } catch (err) {
      setError(err.message || 'Erreur lors de la recherche')
    } finally {
      setLoading(false)
    }
  }

  const handleSaveSuccess = () => {
    setShowForm(false)
    setMissionToEdit(null)
    setMissionId('')
    alert('Mission modifiée avec succès!')
  }

  const handleCancel = () => {
    setShowForm(false)
    setMissionToEdit(null)
    setMissionId('')
  }

  if (showForm && missionToEdit) {
    return (
      <MissionForm 
        missionToEdit={missionToEdit}
        onSaveSuccess={handleSaveSuccess}
        onCancel={handleCancel}
      />
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

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <div>
          <CustomInput
            placeholder="Entrez l'ID de mission à modifier"
            className="bg-white rounded-full text-center text-gray-500"
            value={missionId}
            onChange={(e) => setMissionId(e.target.value)}
          />
        </div>

        <div className="flex justify-center gap-4">
          <button
            onClick={handleSearch}
            disabled={loading || !missionId.trim()}
            className="bg-white hover:bg-gray-50 text-gray-800 font-medium py-2 px-8 rounded-full border border-gray-300 transition-colors disabled:opacity-50"
          >
            {loading ? 'Recherche...' : 'Rechercher'}
          </button>
          <button
            onClick={() => setMissionId('')}
            className="bg-white hover:bg-gray-50 text-gray-800 font-medium py-2 px-8 rounded-full border border-gray-300 transition-colors"
          >
            Annuler
          </button>
        </div>
      </div>
    </div>
  )
}

const ConsultationContent = () => {
  const [missionId, setMissionId] = useState("")
  const [missionDetails, setMissionDetails] = useState(null)
  const [showDetails, setShowDetails] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { token } = useAuth()

  useEffect(() => {
    if (token) {
      missionAPI.setAuthToken(token)
    }
  }, [token])

  const handleSearch = async () => {
    if (!missionId.trim()) return
    
    setLoading(true)
    setError('')
    
    try {
      const response = await missionAPI.getMission(missionId)
      
      if (response.success && response.data) {
        setMissionDetails(response.data)
        setShowDetails(true)
      } else {
        setError('Mission non trouvée')
      }
    } catch (err) {
      setError(err.message || 'Erreur lors de la recherche')
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    setShowDetails(false)
    setMissionDetails(null)
    setMissionId('')
  }

  if (showDetails && missionDetails) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-0 max-w-lg mx-auto">
        <div className="bg-blue-100 text-center py-3 mb-0 rounded-t-lg">
          <h2 className="text-lg font-semibold text-gray-800">DÉTAILS DE LA MISSION</h2>
        </div>

        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-blue-600 font-medium mb-2">ID Mission:</label>
              <p className="bg-gray-100 p-2 rounded">{missionDetails.id}</p>
            </div>
            <div>
              <label className="block text-blue-600 font-medium mb-2">Objet:</label>
              <p className="bg-gray-100 p-2 rounded">{missionDetails.objet}</p>
            </div>
            <div>
              <label className="block text-blue-600 font-medium mb-2">Date début:</label>
              <p className="bg-gray-100 p-2 rounded">{missionDetails.date_debut}</p>
            </div>
            <div>
              <label className="block text-blue-600 font-medium mb-2">Date fin:</label>
              <p className="bg-gray-100 p-2 rounded">{missionDetails.date_fin}</p>
            </div>
            <div>
              <label className="block text-blue-600 font-medium mb-2">Destination:</label>
              <p className="bg-gray-100 p-2 rounded">{missionDetails.destination}</p>
            </div>
            <div>
              <label className="block text-blue-600 font-medium mb-2">Agent:</label>
              <p className="bg-gray-100 p-2 rounded">
                {missionDetails.agent ? `${missionDetails.agent.nom_prenom} (${missionDetails.agent.matricule})` : 'N/A'}
              </p>
            </div>
            <div>
              <label className="block text-blue-600 font-medium mb-2">Véhicule:</label>
              <p className="bg-gray-100 p-2 rounded">
                {missionDetails.vehicule ? `${missionDetails.vehicule.immatriculation} - ${missionDetails.vehicule.marque}` : 'N/A'}
              </p>
            </div>
            <div>
              <label className="block text-blue-600 font-medium mb-2">Statut:</label>
              <p className="bg-gray-100 p-2 rounded">{missionDetails.statut}</p>
            </div>
            {missionDetails.budget_prevu && (
              <div>
                <label className="block text-blue-600 font-medium mb-2">Budget:</label>
                <p className="bg-gray-100 p-2 rounded">{missionDetails.budget_prevu} MAD</p>
              </div>
            )}
            {missionDetails.description && (
              <div className="col-span-2">
                <label className="block text-blue-600 font-medium mb-2">Description:</label>
                <p className="bg-gray-100 p-2 rounded">{missionDetails.description}</p>
              </div>
            )}
          </div>

          <div className="flex justify-end gap-3 mt-8 pt-4">
            <CustomButton 
              variant="secondary" 
              onClick={handleClose}
            >
              Fermer
            </CustomButton>
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

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <div>
          <CustomInput
            placeholder="Entrez l'ID de mission"
            className="bg-white rounded-full text-center text-gray-500"
            value={missionId}
            onChange={(e) => setMissionId(e.target.value)}
          />
        </div>

        <div className="flex justify-center gap-4">
          <button
            onClick={handleSearch}
            disabled={loading || !missionId.trim()}
            className="bg-white hover:bg-gray-50 text-gray-800 font-medium py-2 px-8 rounded-full border border-gray-300 transition-colors disabled:opacity-50"
          >
            {loading ? 'Recherche...' : 'Rechercher'}
          </button>
          <button
            onClick={() => setMissionId('')}
            className="bg-white hover:bg-gray-50 text-gray-800 font-medium py-2 px-8 rounded-full border border-gray-300 transition-colors"
          >
            Annuler
          </button>
        </div>
      </div>
    </div>
  )
}

const SuppressionContent = () => {
  const [missionId, setMissionId] = useState("")
  const [missionToDelete, setMissionToDelete] = useState(null)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const { token } = useAuth()

  useEffect(() => {
    if (token) {
      missionAPI.setAuthToken(token)
    }
  }, [token])

  const handleSearch = async () => {
    if (!missionId.trim()) return
    
    setLoading(true)
    setError('')
    
    try {
      const response = await missionAPI.getMission(missionId)
      
      if (response.success && response.data) {
        setMissionToDelete(response.data)
        setShowConfirmation(true)
      } else {
        setError('Mission non trouvée')
      }
    } catch (err) {
      setError(err.message || 'Erreur lors de la recherche')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!missionToDelete) return
    
    setLoading(true)
    setError('')
    
    try {
      await missionAPI.deleteMission(missionToDelete.id)
      setSuccess('Mission supprimée avec succès!')
      setShowConfirmation(false)
      setMissionToDelete(null)
      setMissionId('')
      
      setTimeout(() => setSuccess(''), 3000)
    } catch (err) {
      setError(err.message || 'Erreur lors de la suppression')
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    setShowConfirmation(false)
    setMissionToDelete(null)
    setMissionId('')
  }

  if (showConfirmation && missionToDelete) {
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
              Voulez-vous supprimer la mission ID : {missionToDelete.id} ?
            </p>
            <p className="text-pink-700 text-sm mb-2">
              Objet: {missionToDelete.objet}
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
            <button
              onClick={handleDelete}
              disabled={loading}
              className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-8 rounded-full transition-colors disabled:opacity-50"
            >
              {loading ? 'Suppression...' : 'Confirmer'}
            </button>
            <button
              onClick={handleCancel}
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

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
            {success}
          </div>
        )}

        <div>
          <CustomInput
            placeholder="Entrez l'ID de mission à supprimer"
            className="bg-white rounded-full text-center text-gray-500"
            value={missionId}
            onChange={(e) => setMissionId(e.target.value)}
          />
        </div>

        <div className="flex justify-center gap-4">
          <button
            onClick={handleSearch}
            disabled={loading || !missionId.trim()}
            className="bg-white hover:bg-gray-50 text-gray-800 font-medium py-2 px-8 rounded-full border border-gray-300 transition-colors disabled:opacity-50"
          >
            {loading ? 'Recherche...' : 'Rechercher'}
          </button>
          <button
            onClick={() => setMissionId('')}
            className="bg-white hover:bg-gray-50 text-gray-800 font-medium py-2 px-8 rounded-full border border-gray-300 transition-colors"
          >
            Annuler
          </button>
        </div>
      </div>
    </div>
  )
}

 
// Mission Index Component
export const MissionIndex = () => {
  const [missions, setMissions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('id')
  const [sortOrder, setSortOrder] = useState('asc')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)
  const { token } = useAuth()

  useEffect(() => {
    if (token) {
      missionAPI.setAuthToken(token)
      fetchMissions()
    }
  }, [token])

  const fetchMissions = async () => {
    try {
      setLoading(true)
      setError('')
      
      // Use your actual API call
      const response = await missionAPI.getMissions()
      
      if (response.success) {
        setMissions(response.data || [])
      } else {
        setError('Format de réponse invalide')
      }
    } catch (err) {
      console.error('Error fetching missions:', err)
      setError('Erreur lors du chargement des missions: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (missionId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette mission ?')) {
      try {
        await missionAPI.deleteMission(missionId)
        
        // Refresh the list after deletion
        setMissions(missions.filter(mission => mission.id !== missionId))
        alert('Mission supprimée avec succès!')
      } catch (err) {
        alert('Erreur lors de la suppression: ' + err.message)
      }
    }
  }
  const getStatusBadge = (status) => {
    const statusConfig = {
      planifie: { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Planifié' },
      en_cours: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'En cours' },
      termine: { bg: 'bg-green-100', text: 'text-green-800', label: 'Terminé' },
      annule: { bg: 'bg-red-100', text: 'text-red-800', label: 'Annulé' }
    }
    
    const config = statusConfig[status] || statusConfig.planifie
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        {config.label}
      </span>
    )
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR')
  }

  // Filter and sort missions
  const filteredMissions = missions.filter(mission =>
    mission.objet?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mission.destination?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mission.agent?.nom_prenom?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const sortedMissions = [...filteredMissions].sort((a, b) => {
    let aVal = a[sortBy]
    let bVal = b[sortBy]
    
    // Handle nested properties
    if (sortBy === 'agent_name') {
      aVal = a.agent?.nom_prenom || ''
      bVal = b.agent?.nom_prenom || ''
    }
    
    if (sortBy === 'vehicule_info') {
      aVal = a.vehicule?.immatriculation || ''
      bVal = b.vehicule?.immatriculation || ''
    }
    
    if (sortOrder === 'desc') {
      return bVal > aVal ? 1 : -1
    }
    return aVal > bVal ? 1 : -1
  })

  // Pagination
  const totalPages = Math.ceil(sortedMissions.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentMissions = sortedMissions.slice(startIndex, startIndex + itemsPerPage)

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-600 mt-2">Chargement des missions...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Header */}
      <div className="bg-blue-50 px-6 py-4 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">INDEX DES MISSIONS</h2>
          <div className="text-sm text-gray-600">
            Total: {missions.length} missions
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Rechercher par objet, destination ou agent..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="id">Trier par ID</option>
              <option value="objet">Trier par Objet</option>
              <option value="date_debut">Trier par Date début</option>
              <option value="destination">Trier par Destination</option>
              <option value="statut">Trier par Statut</option>
              <option value="agent_name">Trier par Agent</option>
            </select>
            <button
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="px-3 py-2 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {sortOrder === 'asc' ? '↑' : '↓'}
            </button>
          </div>
        </div>
      </div>

      {/* Missions Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Objet
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Dates
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Destination
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Agent
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Véhicule
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Statut
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Budget
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentMissions.map((mission) => (
              <tr key={mission.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  #{mission.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div className="max-w-xs truncate" title={mission.objet}>
                    {mission.objet}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div>
                    <div>{formatDate(mission.date_debut)}</div>
                    <div className="text-gray-400">→ {formatDate(mission.date_fin)}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {mission.destination}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {mission.agent ? (
                    <div>
                      <div className="font-medium">{mission.agent.nom_prenom}</div>
                      <div className="text-gray-500 text-xs">{mission.agent.matricule}</div>
                    </div>
                  ) : (
                    <span className="text-gray-400">Non assigné</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {mission.vehicule ? (
                    <div>
                      <div className="font-medium">{mission.vehicule.immatriculation}</div>
                      <div className="text-gray-500 text-xs">
                        {mission.vehicule.marque} {mission.vehicule.modele}
                      </div>
                    </div>
                  ) : (
                    <span className="text-gray-400">Non assigné</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusBadge(mission.statut)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {mission.budget_prevu ? `${mission.budget_prevu} MAD` : '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => alert(`Voir les détails de la mission #${mission.id}`)}
                      className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
                      title="Voir les détails"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => alert(`Modifier la mission #${mission.id}`)}
                      className="text-green-600 hover:text-green-900 p-1 rounded hover:bg-green-50"
                      title="Modifier"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDelete(mission.id)}
                      className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
                      title="Supprimer"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
          <div className="flex items-center justify-between">
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                Précédent
              </button>
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                Suivant
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Affichage <span className="font-medium">{startIndex + 1}</span> à{' '}
                  <span className="font-medium">
                    {Math.min(startIndex + itemsPerPage, sortedMissions.length)}
                  </span>{' '}
                  de <span className="font-medium">{sortedMissions.length}</span> résultats
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                  {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                    let page;
                    if (totalPages <= 5) {
                      page = i + 1;
                    } else if (currentPage <= 3) {
                      page = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      page = totalPages - 4 + i;
                    } else {
                      page = currentPage - 2 + i;
                    }
                    return (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                          page === currentPage
                            ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                            : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                        }`}
                      >
                        {page}
                      </button>
                    );
                  })}
                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Empty state */}
      {currentMissions.length === 0 && !loading && (
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">Aucune mission trouvée</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm ? 'Essayez de modifier votre recherche.' : 'Commencez par créer une nouvelle mission.'}
          </p>
        </div>
      )}
    </div>
  )
}

 


const MissionManagement = () => {
  const [activeSection, setActiveSection] = useState("saisie")
  const [activeTab, setActiveTab] = useState("mission")
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login')
    }
  }, [isAuthenticated, navigate])

  const renderContent = () => {
    switch (activeSection) {
      case "saisie":
        return <MissionForm 
                 onSaveSuccess={() => alert('Mission créée avec succès!')} 
                 onCancel={() => {}} 
               />
      case "modification":
        return <ModificationContent />
      case "consultation":
        return <ConsultationContent />
      case "suppression":
        return <SuppressionContent />
      default:
        return <MissionForm 
                 onSaveSuccess={() => alert('Mission créée avec succès!')} 
                 onCancel={() => {}} 
               />
    }
  }

  if (!isAuthenticated) {
    return <div>Redirection vers la page de connexion...</div>
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
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

      <div className="flex-1">
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
            <button
              onClick={() => setActiveTab("index")}
              className={`px-8 py-4 font-medium border-b-2 transition-colors ${
                activeTab === "index"
                  ? "border-blue-500 text-blue-600 bg-blue-50"
                  : "border-transparent text-gray-600 hover:text-gray-800"
              }`}
            >
              INDEX
            </button>
            <Link to='/dashboard'>
              <button
                className="px-8 py-4 font-medium border-b-2 border-transparent text-gray-600 hover:text-gray-800 transition-colors"
              >
                DASHBOARD
              </button>
            </Link>
          </div>
        </div>

        <div className="p-8">
          {activeTab === "mission" ? (
            renderContent()
          ) : (
            <MissionIndex />
          )}
        </div>
      </div>
    </div>
  )
}
 

export default MissionManagement