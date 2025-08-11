import { useEffect, useRef, useState } from "react"
import { Search, Mic } from "lucide-react"

const carMarkers = [
  {
    id: 1,
    lat: 33.5731,
    lng: -7.5898,
    color: "#ef4444",
    city: "Casablanca",
    type: "sedan",
    available: false,
    price: 45,
    model: "Toyota Camry",
    year: 2022,
    photos: [
      "/placeholder.svg?height=300&width=400&text=Toyota+Camry+Front",
      "/placeholder.svg?height=300&width=400&text=Toyota+Camry+Interior",
      "/placeholder.svg?height=300&width=400&text=Toyota+Camry+Side",
    ],
    specifications: {
      engine: "2.5L 4-Cylinder",
      transmission: "Automatique CVT",
      fuel: "Essence",
      consumption: "7.8L/100km",
      seats: 5,
      doors: 4,
      airConditioning: true,
      gps: true,
    },
    features: [
      "Climatisation automatique",
      "GPS intégré",
      "Bluetooth",
      "Caméra de recul",
      "Régulateur de vitesse",
      "Sièges chauffants",
    ],
    description: "Berline confortable et économique, parfaite pour les trajets urbains et les longs voyages.",
    rating: 4.5,
    reviews: 28,
  },
  {
    id: 2,
    lat: 34.0209,
    lng: -6.8416,
    color: "#ef4444",
    city: "Rabat",
    type: "suv",
    available: false,
    price: 65,
    model: "Honda CR-V",
    year: 2023,
    photos: [
      "/placeholder.svg?height=300&width=400&text=Honda+CR-V+Front",
      "/placeholder.svg?height=300&width=400&text=Honda+CR-V+Interior",
      "/placeholder.svg?height=300&width=400&text=Honda+CR-V+Cargo",
    ],
    specifications: {
      engine: "1.5L Turbo",
      transmission: "Automatique CVT",
      fuel: "Essence",
      consumption: "8.2L/100km",
      seats: 5,
      doors: 5,
      airConditioning: true,
      gps: true,
    },
    features: [
      "Traction intégrale",
      "Système multimédia Honda SENSING",
      "Caméra 360°",
      "Toit ouvrant panoramique",
      "Sièges en cuir",
      "Chargeur sans fil",
    ],
    description: "SUV spacieux et polyvalent, idéal pour les familles et les aventures en plein air.",
    rating: 4.7,
    reviews: 42,
  },
  {
    id: 3,
    lat: 34.0181,
    lng: -5.0078,
    color: "#ef4444",
    city: "Fez",
    type: "compact",
    available: false,
    price: 35,
    model: "Nissan Micra",
    year: 2021,
    photos: [
      "/placeholder.svg?height=300&width=400&text=Nissan+Micra+Front",
      "/placeholder.svg?height=300&width=400&text=Nissan+Micra+Interior",
      "/placeholder.svg?height=300&width=400&text=Nissan+Micra+Side",
    ],
    specifications: {
      engine: "1.0L 3-Cylinder",
      transmission: "Manuelle 5 vitesses",
      fuel: "Essence",
      consumption: "5.4L/100km",
      seats: 5,
      doors: 5,
      airConditioning: true,
      gps: false,
    },
    features: [
      "Climatisation manuelle",
      "Radio Bluetooth",
      "Direction assistée",
      "Vitres électriques",
      "Verrouillage centralisé",
    ],
    description: "Voiture compacte économique, parfaite pour la conduite en ville et le stationnement facile.",
    rating: 4.2,
    reviews: 15,
  },
  {
    id: 4,
    lat: 31.6295,
    lng: -7.9811,
    color: "#22c55e",
    city: "Marrakesh",
    type: "luxury",
    available: true,
    price: 120,
    model: "BMW 5 Series",
    year: 2023,
    photos: [
      "/placeholder.svg?height=300&width=400&text=BMW+5+Series+Front",
      "/placeholder.svg?height=300&width=400&text=BMW+5+Series+Interior",
      "/placeholder.svg?height=300&width=400&text=BMW+5+Series+Dashboard",
    ],
    specifications: {
      engine: "2.0L Turbo",
      transmission: "Automatique 8 vitesses",
      fuel: "Essence",
      consumption: "9.1L/100km",
      seats: 5,
      doors: 4,
      airConditioning: true,
      gps: true,
    },
    features: [
      "Système iDrive",
      "Sièges en cuir Nappa",
      "Système audio Harman Kardon",
      "Éclairage d'ambiance",
      "Assistance au stationnement",
      "Régulateur de vitesse adaptatif",
      "Toit ouvrant électrique",
    ],
    description: "Berline de luxe offrant un confort exceptionnel et des performances remarquables.",
    rating: 4.9,
    reviews: 67,
  },
  {
    id: 5,
    lat: 35.1681,
    lng: -5.2685,
    color: "#22c55e",
    city: "Tetouan",
    type: "sedan",
    available: true,
    price: 50,
    model: "Volkswagen Jetta",
    year: 2022,
    photos: [
      "/placeholder.svg?height=300&width=400&text=VW+Jetta+Front",
      "/placeholder.svg?height=300&width=400&text=VW+Jetta+Interior",
      "/placeholder.svg?height=300&width=400&text=VW+Jetta+Trunk",
    ],
    specifications: {
      engine: "1.4L TSI",
      transmission: "Automatique DSG",
      fuel: "Essence",
      consumption: "6.9L/100km",
      seats: 5,
      doors: 4,
      airConditioning: true,
      gps: true,
    },
    features: [
      "Système d'infodivertissement",
      "Apple CarPlay/Android Auto",
      "Caméra de recul",
      "Capteurs de stationnement",
      "Éclairage LED",
      "Volant multifonction",
    ],
    description: "Berline élégante combinant style européen et fiabilité, idéale pour tous types de trajets.",
    rating: 4.4,
    reviews: 31,
  },
  {
    id: 7,
    lat: 35.7595,
    lng: -5.834,
    color: "#22c55e",
    city: "Tangier",
    type: "suv",
    available: true,
    price: 70,
    model: "Hyundai Tucson",
    year: 2023,
    photos: [
      "/placeholder.svg?height=300&width=400&text=Hyundai+Tucson+Front",
      "/placeholder.svg?height=300&width=400&text=Hyundai+Tucson+Interior",
      "/placeholder.svg?height=300&width=400&text=Hyundai+Tucson+Cargo",
    ],
    specifications: {
      engine: "1.6L Turbo Hybrid",
      transmission: "Automatique 6 vitesses",
      fuel: "Hybride",
      consumption: "6.2L/100km",
      seats: 5,
      doors: 5,
      airConditioning: true,
      gps: true,
    },
    features: [
      "Système hybride",
      "Écran tactile 10.25 pouces",
      "Système audio Bose",
      "Caméra 360°",
      "Sièges ventilés",
      "Chargement sans fil",
      "Hayon électrique",
    ],
    description: "SUV hybride moderne offrant efficacité énergétique et technologie avancée.",
    rating: 4.6,
    reviews: 38,
  },
  {
    id: 8,
    lat: 33.2316,
    lng: -8.5007,
    color: "#ef4444",
    city: "El Jadida",
    type: "luxury",
    available: false,
    price: 150,
    model: "Mercedes C-Class",
    year: 2023,
    photos: [
      "/placeholder.svg?height=300&width=400&text=Mercedes+C-Class+Front",
      "/placeholder.svg?height=300&width=400&text=Mercedes+C-Class+Interior",
      "/placeholder.svg?height=300&width=400&text=Mercedes+C-Class+Dashboard",
    ],
    specifications: {
      engine: "2.0L Turbo",
      transmission: "Automatique 9G-TRONIC",
      fuel: "Essence",
      consumption: "8.8L/100km",
      seats: 5,
      doors: 4,
      airConditioning: true,
      gps: true,
    },
    features: [
      "Système MBUX",
      "Sièges en cuir AMG",
      "Système audio Burmester",
      "Éclairage d'ambiance 64 couleurs",
      "Assistance à la conduite",
      "Toit ouvrant panoramique",
      "Suspension adaptative",
    ],
    description: "Berline de luxe allemande offrant le summum du raffinement et de la technologie.",
    rating: 4.8,
    reviews: 54,
  },
].filter((car) => car.color === "#ef4444" || car.color === "#22c55e")

export default function CarMapService() {
  const mapRef = useRef(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [map, setMap] = useState(null)
  const [markers, setMarkers] = useState([])

  useEffect(() => {
    if (typeof window !== "undefined" && mapRef.current && !map) {
      import("leaflet").then((L) => {
        delete L.Icon.Default.prototype._getIconUrl
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
          iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
          shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
        })

        const mapInstance = L.map(mapRef.current).setView([32.0, -6.0], 6)

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "© OpenStreetMap contributors",
        }).addTo(mapInstance)

        setMap(mapInstance)
      })
    }

    return () => {
      if (map) {
        map.remove()
      }
    }
  }, [])

  useEffect(() => {
    if (map) {
      markers.forEach((marker) => map.removeLayer(marker))

      import("leaflet").then((L) => {
        const createCarIcon = (color) => {
          const carSvg = `
            <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
              <g transform="translate(5, 8)">
                <rect x="2" y="8" width="26" height="12" rx="2" fill="${color}" stroke="#000" strokeWidth="1"/>
                <rect x="6" y="4" width="18" height="8" rx="1" fill="${color}" stroke="#000" strokeWidth="1"/>
                <circle cx="8" cy="22" r="3" fill="#333" stroke="#000" strokeWidth="1"/>
                <circle cx="22" cy="22" r="3" fill="#333" stroke="#000" strokeWidth="1"/>
                <circle cx="8" cy="22" r="1.5" fill="#666"/>
                <circle cx="22" cy="22" r="1.5" fill="#666"/>
                <rect x="10" y="6" width="4" height="3" fill="#87ceeb" stroke="#000" strokeWidth="0.5"/>
                <rect x="16" y="6" width="4" height="3" fill="#87ceeb" stroke="#000" strokeWidth="0.5"/>
              </g>
            </svg>
          `

          return L.divIcon({
            html: carSvg,
            className: "car-marker",
            iconSize: [40, 40],
            iconAnchor: [20, 35],
          })
        }

        const newMarkers = carMarkers.map((car) => {
          const marker = L.marker([car.lat, car.lng], {
            icon: createCarIcon(car.color),
          }).addTo(map)
          return marker
        })

        setMarkers(newMarkers)
      })
    }
  }, [map])

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim() && map) {
      const foundCar = carMarkers.find(
        (car) =>
          car.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
          car.model.toLowerCase().includes(searchQuery.toLowerCase()),
      )

      if (foundCar) {
        map.setView([foundCar.lat, foundCar.lng], 10)
      }
    }
  }

  return (
    <div className="relative w-full h-screen">
      {/* Map Container */}
      <div ref={mapRef} className="w-full h-full" />

      {/* Search Bar Overlay */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-[1000] w-full max-w-md px-4">
        <form onSubmit={handleSearch} className="relative">
          <div className="relative flex items-center bg-white rounded-full shadow-lg border border-gray-200">
            <button
              type="submit"
              className="absolute left-2 z-10 h-8 w-8 rounded-full flex items-center justify-center hover:bg-gray-100"
              aria-label="Search"
            >
              <Search className="h-4 w-4 text-gray-600" />
            </button>

            <input
              type="text"
              placeholder="Recherche"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-12 py-3 text-lg border-0 rounded-full focus:outline-none focus:ring-0 bg-transparent w-full"
            />

            <button
              type="button"
              className="absolute right-2 h-8 w-8 rounded-full flex items-center justify-center hover:bg-gray-100"
              aria-label="Voice search"
            >
              <Mic className="h-4 w-4 text-gray-600" />
            </button>
          </div>
        </form>
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 z-[1000] bg-white rounded-lg shadow-lg p-3 border border-gray-200">
        <h3 className="font-semibold text-sm mb-2">Légende</h3>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-500 rounded"></div>
            <span className="text-xs">Anomalie</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded"></div>
            <span className="text-xs">Conforme</span>
          </div>
        </div>
      </div>
    </div>
  )
}
