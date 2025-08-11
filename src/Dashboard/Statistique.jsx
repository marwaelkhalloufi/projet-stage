"use client"

import { useState } from "react"
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, CartesianGrid } from "recharts"

// Sample data for all months
const months = [
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Août",
  "Septembre",
  "Octobre",
  "Novembre",
  "Décembre",
]

// Sample data for Mission chart
const missionData = [
  { month: "Janvier", value: 12 },
  { month: "Février", value: 15 },
  { month: "Mars", value: 18 },
  { month: "Avril", value: 10 },
  { month: "Mai", value: 14 },
  { month: "Juin", value: 11 },
  { month: "Juillet", value: 10 },
  { month: "Août", value: 10 },
  { month: "Septembre", value: 12 },
  { month: "Octobre", value: 11 },
  { month: "Novembre", value: 11 },
  { month: "Décembre", value: 12 },
]

// Sample data for Frais chart
const fraisData = [
  { month: "Janvier", value: 8 },
  { month: "Février", value: 12 },
  { month: "Mars", value: 7 },
  { month: "Avril", value: 8 },
  { month: "Mai", value: 8 },
  { month: "Juin", value: 7 },
  { month: "Juillet", value: 6 },
  { month: "Août", value: 8 },
  { month: "Septembre", value: 7 },
  { month: "Octobre", value: 9 },
  { month: "Novembre", value: 8 },
  { month: "Décembre", value: 8 },
]

// Sample data for Dotation chart
const dotationData = [
  { month: "Janvier", value: 5 },
  { month: "Février", value: 5 },
  { month: "Mars", value: 5 },
  { month: "Avril", value: 6 },
  { month: "Mai", value: 5 },
  { month: "Juin", value: 6 },
  { month: "Juillet", value: 5 },
  { month: "Août", value: 5 },
  { month: "Septembre", value: 6 },
  { month: "Octobre", value: 5 },
  { month: "Novembre", value: 5 },
  { month: "Décembre", value: 5 },
]

// Custom tick formatter to abbreviate month names
const formatMonth = (month) => {
  return month.substring(0, 3).toLowerCase()
}

export default function Statistique() {
  const [activeTab, setActiveTab] = useState("statistique")

  // Custom chart component to avoid repetition
  const StatChart = ({ title, data, height = 200 }) => (
    <div className="mb-8">
      <h3 className="text-lg font-semibold text-blue-700 mb-4">{title}</h3>
      <div className="relative" style={{ height: `${height}px` }}>
        {/* Red vertical line */}
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-600 z-10"></div>

        {/* Chart container */}
        <div className="h-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 30 }}>
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

        {/* Red horizontal line */}
        <div className="absolute left-0 right-0 bottom-0 h-1 bg-red-600 z-10"></div>
      </div>
    </div>
  )

  return (
    <div className="bg-gray-100 w-full">
      {/* Header Tabs */}
      <div className="bg-white border-b">
        <div className="flex">
          <div
            className={`px-8 py-4 font-bold cursor-pointer ${
              activeTab === "espace" ? "text-blue-700 border-b-2 border-blue-700" : "text-gray-700"
            }`}
            onClick={() => setActiveTab("espace")}
          >
            Espace Équipe
          </div>
          <div
            className={`px-8 py-4 font-bold cursor-pointer ${
              activeTab === "collaborateurs" ? "text-blue-700 border-b-2 border-blue-700" : "text-gray-700"
            }`}
            onClick={() => setActiveTab("collaborateurs")}
          >
            Collaborateurs
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        <h2 className="text-blue-600 font-bold text-xl mb-6">Statistique</h2>

        <div className="bg-white rounded-lg shadow-sm p-6">
          {/* Mission Chart */}
          <StatChart title="Mission" data={missionData} height={180} />

          {/* Frais Chart */}
          <StatChart title="Frais" data={fraisData} height={180} />

          {/* Dotation Chart */}
          <StatChart title="Dotation" data={dotationData} height={180} />
        </div>
      </div>
    </div>
  )
}
