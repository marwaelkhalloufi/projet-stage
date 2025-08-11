import { useState } from "react"
 import axios from "axios"
import { useAuth } from "../contexts/AuthContext"

export default function TraitementDesFrais() {
  const [direction, setDirection] = useState("")
  const [mois, setMois] = useState("")
  const [annee, setAnnee] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)
  const { token } = useAuth()

  // Create Axios instance with base URL and headers
  const api = axios.create({
    baseURL: "http://localhost:8000/api",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  })

  const handleTraitement = async () => {
    setLoading(true)
    setError(null)
    setSuccess(false)
    
    try {
      const response = await api.post("/frais-missions", {
        direction,
        mois,
        annee
      })

      console.log('Frais traités avec succès:', response.data)
      setSuccess(true)
    } catch (error) {
      console.error('Erreur:', error)
      setError(error.response?.data?.message || error.message || 'Erreur lors du traitement des frais')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full bg-blue-700 p-8">
      <h1 className="text-white text-2xl font-bold mb-8">Traitement des Frais</h1>

      <div className="bg-gray-300 p-8 rounded-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center mb-8">
          {/* Direction Row */}
          <div className="bg-blue-600 text-white text-center py-3 rounded-full text-lg font-semibold">Direction</div>
          <input
            type="text"
            placeholder="Insérer"
            value={direction}
            onChange={(e) => setDirection(e.target.value)}
            className="bg-blue-600 text-white placeholder-white py-3 px-6 rounded-full text-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
          />

          {/* Mois Row */}
          <div className="bg-blue-600 text-white text-center py-3 rounded-full text-lg font-semibold">Mois</div>
          <select
            value={mois}
            onChange={(e) => setMois(e.target.value)}
            className="bg-blue-600 text-white py-3 px-6 rounded-full text-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            <option value="">Sélectionner un mois</option>
            <option value="Janvier">Janvier</option>
            <option value="Février">Février</option>
            {/* Add all months */}
          </select>

          {/* Année Row */}
          <div className="bg-blue-600 text-white text-center py-3 rounded-full text-lg font-semibold">Année</div>
          <select
            value={annee}
            onChange={(e) => setAnnee(e.target.value)}
            className="bg-blue-600 text-white py-3 px-6 rounded-full text-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            <option value="">Sélectionner une année</option>
            <option value="2023">2023</option>
            <option value="2024">2024</option>
            {/* Add more years */}
          </select>
        </div>

        <button
          onClick={handleTraitement}
          disabled={loading || !direction || !mois || !annee}
          className={`bg-blue-600 text-white py-3 px-12 rounded-full text-lg font-semibold block mx-auto hover:bg-blue-700 transition-colors ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {loading ? 'Traitement en cours...' : 'Traiter'}
        </button>

        {error && (
          <div className="mt-4 text-red-600 text-center">
            {error}
          </div>
        )}

        {success && (
          <div className="mt-4 text-green-600 text-center">
            Traitement effectué avec succès!
          </div>
        )}
      </div>

      <h2 className="text-white text-xl font-bold mt-12 mb-6">Informations sur le traitement</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-gray-800 font-semibold">Direction sélectionnée:</p>
          <p className="text-gray-600 text-sm">{direction || "Aucune direction sélectionnée"}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-gray-800 font-semibold">Mois sélectionné:</p>
          <p className="text-gray-600 text-sm">{mois || "Aucun mois sélectionné"}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-gray-800 font-semibold">Année sélectionnée:</p>
          <p className="text-gray-600 text-sm">{annee || "Aucune année sélectionnée"}</p>
        </div>
      </div>
    </div>
  )
}