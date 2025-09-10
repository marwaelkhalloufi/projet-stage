import { useState, useEffect } from "react"
import axios from "axios"

export default function Direction() {
  // Direction form states
  const [sigle, setSigle] = useState("")
  const [designation, setDesignation] = useState("")
  const [type, setType] = useState("")
  const [directionId, setDirectionId] = useState(null)
  const [directions, setDirections] = useState([])

  // Agent form states
  const [matricule, setMatricule] = useState("")
  const [nomPrenom, setNomPrenom] = useState("")
  const [sigleAgent, setSigleAgent] = useState("")
  const [fonction, setFonction] = useState("")
  const [college, setCollege] = useState("")

  // Loading and message states
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  // Configure axios defaults
  const api = axios.create({
    baseURL: 'http://localhost:8000/api',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    withCredentials: true, // Important for CORS with credentials
  })

  // Add request interceptor to include auth token
  api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('auth_token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      console.log('Making request to:', config.baseURL + config.url, 'with headers:', config.headers)
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  // Add response interceptor for better error handling
  api.interceptors.response.use(
    (response) => {
      console.log('Response received:', response.status, response.data)
      return response
    },
    (error) => {
      console.error('API Error:', error.response || error.message)
      if (error.response?.status === 401) {
        setMessage("Session expirée. Veuillez vous reconnecter.")
        // Optionally redirect to login
      } else if (error.response?.status === 403) {
        setMessage("Accès non autorisé.")
      }
      return Promise.reject(error)
    }
  )

  // Fetch directions on component mount
  useEffect(() => {
    fetchDirections()
  }, [])

  const fetchDirections = async () => {
    try {
      console.log('Fetching directions...')
      const response = await api.get('/directions')
      console.log('Directions response:', response.data)
      setDirections(Array.isArray(response.data) ? response.data : [])
    } catch (error) {
      console.error("Error fetching directions:", error)
      setMessage(`Erreur lors du chargement des directions: ${error.response?.data?.message || error.message}`)
    }
  }

  const handleSaveDirection = async () => {
    if (!sigle || !designation || !type) {
      setMessage("Veuillez remplir tous les champs de la direction")
      return
    }

    setLoading(true)
    try {
      console.log('Creating direction:', { sigle, designation, type })
      
      const response = await api.post('/directions', {
        sigle,
        designation,
        type,
      })

      console.log('Direction created:', response.data)
      
      const newDirection = response.data
      setDirectionId(newDirection.id)
      setDirections([...directions, newDirection])
      setMessage("Direction créée avec succès!")
      
      // Clear form
      setSigle("")
      setDesignation("")
      setType("")
    } catch (error) {
      console.error("Direction creation error:", error)
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.errors ? 
                          Object.values(error.response.data.errors).flat().join(', ') :
                          error.message
      setMessage("Erreur: " + errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const handleSaveAgent = async () => {
    if (!matricule || !nomPrenom || !sigleAgent || !fonction || !college || !directionId) {
      setMessage("Veuillez remplir tous les champs et sélectionner une direction")
      return
    }

    setLoading(true)
    try {
      console.log('Creating agent:', { 
        matricule, 
        nom_prenom: nomPrenom, 
        sigle: sigleAgent, 
        fonction, 
        college, 
        direction_id: directionId 
      })
      
      const response = await api.post('/agents', {
        matricule,
        nom_prenom: nomPrenom,
        sigle: sigleAgent,
        fonction,
        college,
        direction_id: directionId,
      })

      console.log('Agent created:', response.data)
      
      setMessage("Agent créé avec succès!")
      
      // Clear form
      setMatricule("")
      setNomPrenom("")
      setSigleAgent("")
      setFonction("")
      setCollege("")
    } catch (error) {
      console.error("Agent creation error:", error)
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.errors ? 
                          Object.values(error.response.data.errors).flat().join(', ') :
                          error.message
      setMessage("Erreur: " + errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full bg-blue-700 p-8 flex flex-col gap-8">
        
       {message && (
        <div className={`p-4 rounded-lg text-white font-semibold ${
          message.includes("succès") ? "bg-green-600" : "bg-red-600"
        }`}>
          {message}
          <button 
            onClick={() => setMessage("")}
            className="ml-4 text-white hover:text-gray-200"
          >
            ×
          </button>
        </div>
      )}

      {/* Direction Form */}
      <div className="bg-white p-6 rounded-lg shadow-md w-full">
        <h1 className="text-gray-800 text-xl font-bold mb-6">Créer une Direction</h1>
        
        <div className="grid grid-cols-2 gap-4 items-center mb-8">
          {/* Sigle */}
          <div className="bg-gray-200 text-gray-700 text-center py-3 rounded-lg font-medium">Sigle</div>
          <input
            type="text"
            placeholder="Ex: DH"
            value={sigle}
            onChange={(e) => setSigle(e.target.value)}
            className="bg-gray-100 text-gray-800 placeholder-gray-500 py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
          />

          {/* Designation */}
          <div className="bg-gray-200 text-gray-700 text-center py-3 rounded-lg font-medium">Désignation</div>
          <input
            type="text"
            placeholder="Ex: contrôle de gestion et système d'information"
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
            className="bg-gray-100 text-gray-800 placeholder-gray-500 py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
          />

          {/* Type */}
          <div className="bg-gray-200 text-gray-700 text-center py-3 rounded-lg font-medium">Type</div>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="bg-gray-100 text-gray-800 py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            <option value="">Sélectionner le type</option>
            <option value="central">Central</option>
            <option value="régionale">Régionale</option>
            <option value="central/régionale">Central/Régionale</option>
          </select>
        </div>

        <button
          onClick={handleSaveDirection}
          disabled={loading}
          className="bg-green-600 text-white py-3 px-12 rounded-lg text-lg font-semibold block mx-auto hover:bg-green-700 transition-colors disabled:opacity-50"
        >
          {loading ? "Création..." : "Créer Direction"}
        </button>
      </div>

      {/* Agent Form */}
      <div className="bg-white p-6 rounded-lg shadow-md w-full">
        <h1 className="text-gray-800 text-xl font-bold mb-6">Créer un Agent</h1>
        
        {/* Direction Selection */}
        <div className="grid grid-cols-2 gap-4 items-center mb-4">
          <div className="bg-gray-200 text-gray-700 text-center py-3 rounded-lg font-medium">Direction</div>
          <select
            value={directionId || ""}
            onChange={(e) => setDirectionId(Number(e.target.value))}
            className="bg-gray-100 text-gray-800 py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            <option value="">Sélectionner une direction</option>
            {directions.map((dir) => (
              <option key={dir.id} value={dir.id}>
                {dir.sigle} - {dir.designation}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4 items-center mb-8">
          {/* Matricule */}
          <div className="bg-gray-200 text-gray-700 text-center py-3 rounded-lg font-medium">Matricule</div>
          <input
            type="text"
            placeholder="Entrez le matricule"
            value={matricule}
            onChange={(e) => setMatricule(e.target.value)}
            className="bg-gray-100 text-gray-800 placeholder-gray-500 py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
          />

          {/* Nom/Prenom */}
          <div className="bg-gray-200 text-gray-700 text-center py-3 rounded-lg font-medium">Nom/Prénom</div>
          <input
            type="text"
            placeholder="Entrez nom et prénom"
            value={nomPrenom}
            onChange={(e) => setNomPrenom(e.target.value)}
            className="bg-gray-100 text-gray-800 placeholder-gray-500 py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
          />

          {/* Sigle */}
          <div className="bg-gray-200 text-gray-700 text-center py-3 rounded-lg font-medium">Sigle</div>
          <input
            type="text"
            placeholder="Entrez le sigle"
            value={sigleAgent}
            onChange={(e) => setSigleAgent(e.target.value)}
            className="bg-gray-100 text-gray-800 placeholder-gray-500 py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
          />

          {/* Fonction */}
          <div className="bg-gray-200 text-gray-700 text-center py-3 rounded-lg font-medium">Fonction</div>
          <input
            type="text"
            placeholder="Entrez la fonction"
            value={fonction}
            onChange={(e) => setFonction(e.target.value)}
            className="bg-gray-100 text-gray-800 placeholder-gray-500 py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
          />

          {/* Collège */}
          <div className="bg-gray-200 text-gray-700 text-center py-3 rounded-lg font-medium">Collège</div>
          <input
            type="text"
            placeholder="Entrez le collège"
            value={college}
            onChange={(e) => setCollege(e.target.value)}
            className="bg-gray-100 text-gray-800 placeholder-gray-500 py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>

        <button
          onClick={handleSaveAgent}
          disabled={loading || !directionId}
          className="bg-blue-600 text-white py-3 px-12 rounded-lg text-lg font-semibold block mx-auto hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {loading ? "Création..." : "Créer Agent"}
        </button>
      </div>
    </div>
  )
}