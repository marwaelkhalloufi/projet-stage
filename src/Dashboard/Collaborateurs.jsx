"use client"

import { useState } from "react"
import { User, ChevronLeft, ChevronRight } from "lucide-react"

export default function Collaborateurs() {
  const [status, setStatus] = useState("actif")
  const [currentMonth, setCurrentMonth] = useState("Juin")
  const [currentYear, setCurrentYear] = useState(2025)

  const handleMonthChange = () => {
    // Simple month navigation logic for demonstration
    // In a real app, you'd handle actual date objects
    if (direction === "prev") {
      // Decrement month, handle year change
    } else {
      // Increment month, handle year change
    }
  }

  return (
    <div className="min-h-screen w-full bg-blue-700 p-8">
      {/* Top Header / Filter Section */}
      <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between flex-wrap gap-4 mb-8">
        <div className="flex items-center gap-3">
          <User className="w-6 h-6 text-blue-600" />
          <h1 className="text-xl font-semibold text-gray-800">Collaborateurs</h1>
          <div className="flex items-center gap-1">
            <button onClick={() => handleMonthChange("prev")} className="p-1 rounded-full hover:bg-gray-100">
              <ChevronLeft className="w-4 h-4 text-gray-600" />
            </button>
            <button onClick={() => handleMonthChange("next")} className="p-1 rounded-full hover:bg-gray-100">
              <ChevronRight className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-gray-700 font-medium">Statut</span>
          <div className="flex bg-gray-200 rounded-full p-1">
            <button
              onClick={() => setStatus("actif")}
              className={`px-4 py-1 rounded-full text-sm font-medium transition-colors ${
                status === "actif" ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-300"
              }`}
            >
              actif
            </button>
            <button
              onClick={() => setStatus("inactif")}
              className={`px-4 py-1 rounded-full text-sm font-medium transition-colors ${
                status === "inactif" ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-300"
              }`}
            >
              inactif
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-gray-700 font-medium">Mois:</span>
          <div className="flex items-center gap-1">
            <button onClick={() => handleMonthChange("prev")} className="p-1 rounded-full hover:bg-gray-100">
              <ChevronLeft className="w-4 h-4 text-gray-600" />
            </button>
            <span className="text-gray-800 font-medium">{`${currentMonth}.${currentYear}`}</span>
            <button onClick={() => handleMonthChange("next")} className="p-1 rounded-full hover:bg-gray-100">
              <ChevronRight className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="grid grid-cols-5 text-left bg-blue-100 text-gray-700 font-semibold py-3 px-4 rounded-t-lg">
          <div>Objet</div>
          <div>Date début</div>
          <div>Date fin</div>
          <div>Trajet</div>
          <div>Moyen</div>
        </div>
        <div className="py-12 text-center text-gray-500">Aucune donnée disponible</div>
      </div>

      {/* Performances Section */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="bg-blue-100 text-gray-700 font-semibold py-3 px-4 rounded-t-lg mb-4">Performances</div>
        <div className="space-y-4">
          <div className="flex justify-between items-center px-4 py-2 border-b border-gray-200 last:border-b-0">
            <span className="text-gray-800">Nombre de Mission</span>
            <span className="text-gray-800 font-semibold">3</span>
          </div>
          <div className="flex justify-between items-center px-4 py-2">
            <span className="text-gray-800">Nombre de Jours</span>
            <span className="text-gray-800 font-semibold">10</span>
          </div>
        </div>
      </div>
    </div>
  )
}
