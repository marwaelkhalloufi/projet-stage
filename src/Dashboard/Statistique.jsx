import { useEffect, useState } from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts"

// Assuming you have a similar API setup as your mission API
const API_BASE_URL = 'http://localhost:8000/api'

class StatisticsAPI {
  constructor() {
    this.baseURL = API_BASE_URL
    this.authToken = null
  }

  setAuthToken(token) {
    this.authToken = token
  }

  async makeRequest(url, options = {}) {
    try {
      const fullUrl = `${this.baseURL}${url}`
      
      const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...(this.authToken && { 'Authorization': `Bearer ${this.authToken}` }),
        ...options.headers,
      }

      const response = await fetch(fullUrl, {
        ...options,
        headers,
        credentials: 'include'
      })

      const contentType = response.headers.get('content-type')
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error(`Expected JSON response, got ${contentType}`)
      }

      const data = await response.json()
      
      if (!response.ok) {
        const errorMessage = data.message || data.error || response.statusText
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorMessage}`)
      }

      return data
      
    } catch (error) {
      console.error('Statistics API request failed:', error)
      throw error
    }
  }

  async getStatistics() {
    return this.makeRequest('/statistics')
  }
}

export const statisticsAPI = new StatisticsAPI()

const formatMonth = (month) => {
  if (!month) return ''
  return month.substring(0, 3).toLowerCase()
}

export default function Statistique() {
  const [missionData, setMissionData] = useState([])
  const [fraisData, setFraisData] = useState([])
  const [dotationData, setDotationData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Get auth token from localStorage or your auth context
  const getAuthToken = () => {
    return localStorage.getItem('auth_token') || localStorage.getItem('token')
  }

  useEffect(() => {
    async function fetchStats() {
      try {
        setLoading(true)
        setError(null)
        
        const token = getAuthToken()
        if (token) {
          statisticsAPI.setAuthToken(token)
        }

        const data = await statisticsAPI.getStatistics()
        
        // Transform the data to ensure consistent structure
        const transformData = (rawData) => {
          if (!Array.isArray(rawData)) return []
          
          return rawData.map(item => ({
            month: item.month || '',
            value: Number(item.value || 0)
          }))
        }

        setMissionData(transformData(data.missions || []))
        setFraisData(transformData(data.frais || []))
        
        // If you have dotation data from your API, add it here
        // For now, setting empty array since it's not in your controller
        setDotationData([])
        
      } catch (err) {
        console.error('Error fetching statistics:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    
    fetchStats()
  }, [])

  const StatChart = ({ title, data, height = 200 }) => (
    <div className="mb-8">
      <h3 className="text-lg font-semibold text-blue-700 mb-4">{title}</h3>
      <div className="relative" style={{ height: `${height}px` }}>
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-600 z-10"></div>
        <div className="h-full">
          {data && data.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                margin={{ top: 5, right: 30, left: 20, bottom: 30 }}
              >
                <CartesianGrid vertical={false} stroke="#f0f0f0" />
                <XAxis
                  dataKey="month"
                  tickFormatter={formatMonth}
                  axisLine={{ stroke: "#DC2626", strokeWidth: 2 }}
                  tick={{ fontSize: 12 }}
                />
                <YAxis hide />
                <Bar dataKey="value" fill="#3B82F6" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              <div className="text-center">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <p className="mt-2">Aucune donnée disponible</p>
              </div>
            </div>
          )}
        </div>
        <div className="absolute left-0 right-0 bottom-0 h-1 bg-red-600 z-10"></div>
      </div>
    </div>
  )

  if (loading) {
    return (
      <div className="bg-gray-100 w-full min-h-screen">
        <div className="p-6">
          <h2 className="text-blue-600 font-bold text-xl mb-6">Statistique</h2>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-gray-600 mt-4">Chargement des statistiques...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-gray-100 w-full min-h-screen">
        <div className="p-6">
          <h2 className="text-blue-600 font-bold text-xl mb-6">Statistique</h2>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-center py-12">
              <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg">
                <h3 className="font-medium mb-2">Erreur de chargement</h3>
                <p className="text-sm">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                  Réessayer
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-100 w-full min-h-screen">
      {/* Main Content */}
      <div className="p-6">
        <h2 className="text-blue-600 font-bold text-xl mb-6">Statistique</h2>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <StatChart title="Mission" data={missionData} height={180} />
          <StatChart title="Frais" data={fraisData} height={180} />
          {dotationData.length > 0 && (
            <StatChart title="Dotation" data={dotationData} height={180} />
          )}
        </div>
        
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Total Missions</h3>
            <p className="text-3xl font-bold text-blue-600">
              {missionData.reduce((sum, item) => sum + item.value, 0)}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Total Frais</h3>
            <p className="text-3xl font-bold text-green-600">
              {fraisData.reduce((sum, item) => sum + item.value, 0).toLocaleString('fr-FR')} MAD
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Mois Actuel</h3>
            <p className="text-3xl font-bold text-purple-600">
              {new Date().toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}