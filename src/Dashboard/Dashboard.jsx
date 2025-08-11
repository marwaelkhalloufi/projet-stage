import { useState } from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  CartesianGrid,
  Tooltip,
} from "recharts"
import { BarChart3, CreditCard, MapPin, DollarSign } from 'lucide-react'

// Sample data for charts
const monthlyMissions = [
  { month: "Jan", missions: 8 },
  { month: "Fév", missions: 12 },
  { month: "Mars", missions: 15 },
  { month: "Avr", missions: 10 },
]

// Fix the status data to add up to 100%
const statusData = [
  { name: "Terminées", value: 35, color: "#3B82F6" },
  { name: "En cours", value: 35, color: "#10B981" },
  { name: "Annulées", value: 30, color: "#EF4444" },
]

const costData = [
  { month: 1, cost: 2000 },
  { month: 2, cost: 3000 },
  { month: 3, cost: 2500 },
  { month: 4, cost: 4000 },
  { month: 5, cost: 4500 },
]

const citiesData = [
  { city: "Rabat", visits: 85 },
  { city: "Meknès", visits: 70 },
  { city: "Fès", visits: 60 },
  { city: "Taza", visits: 55 },
  { city: "Oujda", visits: 45 },
]

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("dashboard")

  return (
    <div className="bg-gray-100 w-full">
      

      {/* Dashboard Content */}
      <div className="p-6">
        <h2 className="text-blue-600 font-bold text-xl mb-6">Dashboard</h2>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <BarChart3 className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Missions terminées</p>
                <p className="text-2xl font-bold text-gray-900">45</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <CreditCard className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total frais dépensés</p>
                <p className="text-2xl font-bold text-gray-900">15 000 DH</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <DollarSign className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total frais dépensés</p>
                <p className="text-2xl font-bold text-gray-900">15 000 DH</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <MapPin className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Villes visitées</p>
                <p className="text-2xl font-bold text-gray-900">6</p>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Missions par mois - Bar Chart */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Missions par mois</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyMissions}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Bar dataKey="missions" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Répartition par statut - Pie Chart - FIXED */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Répartition par statut</h3>
            <div className="h-64 flex items-center">
              <div className="w-1/2 relative h-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart width={200} height={200}>
                    <Pie
                      data={statusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="value"
                      startAngle={0}
                      endAngle={360}
                    >
                      {statusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}%`, 'Pourcentage']} />
                  </PieChart>
                </ResponsiveContainer>
                {/* Center text overlay */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className="text-2xl font-bold text-gray-800">35%</span>
                </div>
              </div>
              <div className="w-1/2 pl-4">
                <div className="space-y-3">
                  {statusData.map((item, index) => (
                    <div key={index} className="flex items-center text-sm">
                      <div 
                        className="w-3 h-3 rounded-full mr-2" 
                        style={{ backgroundColor: item.color }}
                      ></div>
                      <span className="text-gray-600">{item.name}</span>
                      <span className="ml-auto font-medium">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Coût total des missions - Line Chart */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Coût total des missions</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={costData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="cost"
                    stroke="#3B82F6"
                    strokeWidth={2}
                    dot={{ fill: "#3B82F6", strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Villes les plus visitées - Horizontal Bar Chart */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Villes les plus visitées</h3>
            <div className="space-y-4">
              {citiesData.map((city, index) => (
                <div key={index} className="flex items-center">
                  <span className="w-16 text-sm text-gray-600">{city.city}</span>
                  <div className="flex-1 mx-4">
                    <div className="bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${city.visits}%` }}></div>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-gray-700">{city.visits}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
