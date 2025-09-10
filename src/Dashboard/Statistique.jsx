import { useEffect, useState } from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts"

const formatMonth = (month) => month.substring(0, 3).toLowerCase()

export default function Statistique() {
  const [missionData, setMissionData] = useState([])
  const [fraisData, setFraisData] = useState([])
  const [dotationData, setDotationData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchStats() {
      try {
        setLoading(true)
        setError(null)
        // const res = await fetch("/api/statistics", {
        //   headers: {
        //     Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        //   },
        // })
        // if (!res.ok) throw new Error("Failed to fetch statistics")
        // const data = await res.json()

        // Example transform if needed, adapt according to your API data structure
        // Ensure each item: { month: string, value: number }
        // setMissionData(data.missions || [])
        // setFraisData(data.frais || [])
        // setDotationData(data.dotation || [])
      } catch (err) {
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
        </div>
        <div className="absolute left-0 right-0 bottom-0 h-1 bg-red-600 z-10"></div>
      </div>
    </div>
  )

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-600">
        Chargement des statistiques...
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6 text-center text-red-600">
        Erreur : {error}
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
          <StatChart title="Dotation" data={dotationData} height={180} />
        </div>
      </div>
    </div>
  )
}
