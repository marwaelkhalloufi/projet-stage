import { useState } from "react"

export default function Direction() {
  // State for Agent form inputs
  const [matricule, setMatricule] = useState("")
  const [nomPrenom, setNomPrenom] = useState("")
  const [sigleAgent, setSigleAgent] = useState("")
  const [fonction, setFonction] = useState("")
  const [college, setCollege] = useState("")

  const handleSaveAgent = () => {
    // Logic to save agent data
    console.log({ matricule, nomPrenom, sigleAgent, fonction, college })
    alert("Agent data saved (simulated)!")
  }

  return (
    <div className="min-h-screen w-full bg-blue-700 p-8 flex flex-col gap-8">
      {/* Direction (Partie 1) */}
      <div className="bg-white  p-6 rounded-lg shadow-md  w-full">
        <h1 className="text-gray-800 text-xl font-bold mb-6">Direction</h1>
        <div className="bg-gray-200 p-4 rounded-lg mb-6">
          <span className="text-gray-700 font-medium">Direction</span>
        </div>
        <button className="bg-blue-600 text-white py-2 px-6 rounded-full text-lg font-semibold mb-8 hover:bg-blue-700 transition-colors">
          Direction
        </button>

        <div className="bg-gray-400 p-6 rounded-lg grid grid-cols-2 gap-4">
          <div className="bg-blue-600 text-white text-center py-3 rounded-full text-lg font-semibold">Sigle</div>
          <div className="bg-blue-600 text-white text-center py-3 rounded-full text-lg">DH</div>

          <div className="bg-blue-600 text-white text-center py-3 rounded-full text-lg font-semibold">designation</div>
          <div className="bg-blue-600 text-white text-center py-3 rounded-full text-lg">
            contrôle de gestion et système d'information
          </div>

          <div className="bg-blue-600 text-white text-center py-3 rounded-full text-lg font-semibold">type</div>
          <div className="bg-blue-600 text-white text-center py-3 rounded-full text-lg">central/Régionale</div>
        </div>
      </div>

      {/* Agent (Partie 2) */}
      <div className="bg-white p-6 rounded-lg shadow-md  w-full">
        <h1 className="text-gray-800 text-xl font-bold mb-6">Agent</h1>
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
          <div className="bg-gray-200 text-gray-700 text-center py-3 rounded-lg font-medium">Nom/Prenom</div>
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
          className="bg-blue-600 text-white py-3 px-12 rounded-lg text-lg font-semibold block mx-auto hover:bg-blue-700 transition-colors"
        >
          Enregistrer
        </button>
      </div>
    </div>
  )
}
