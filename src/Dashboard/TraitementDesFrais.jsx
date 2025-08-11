"use client"

import { useState } from "react"

export default function TraitementDesFrais() {
  const [direction, setDirection] = useState("")
  const [mois, setMois] = useState("")
  const [annee, setAnnee] = useState("")

  const handleTraitement = () => {
    // Traitement logic here
  }

  return (
    <div className="min-h-screen w-full bg-blue-700 p-8">
      <h1 className="text-white text-2xl font-bold mb-8">Traitement des Frais</h1>

      <div className="bg-gray-300 p-8 rounded-xl ">
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
          <input
            type="text"
            placeholder="Insérer"
            value={mois}
            onChange={(e) => setMois(e.target.value)}
            className="bg-blue-600 text-white placeholder-white py-3 px-6 rounded-full text-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
          />

          {/* Année Row */}
          <div className="bg-blue-600 text-white text-center py-3 rounded-full text-lg font-semibold">Année</div>
          <input
            type="text"
            placeholder="Insérer"
            value={annee}
            onChange={(e) => setAnnee(e.target.value)}
            className="bg-blue-600 text-white placeholder-white py-3 px-6 rounded-full text-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>

        <button
          onClick={handleTraitement}
          className="bg-blue-600 text-white py-3 px-12 rounded-full text-lg font-semibold block mx-auto hover:bg-blue-700 transition-colors"
        >
          Traiter
        </button>
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
