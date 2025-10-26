import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Search, RefreshCw, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext'; // Import your auth context
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom icons
const conformeIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,' + btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#10b981" width="40" height="40">
      <path d="M8 17a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM16 17a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/>
      <path d="M18.42 6.58A2 2 0 0 0 17 6H7a2 2 0 0 0-1.42.58L3 9.17V17h1a3 3 0 0 1 6 0h4a3 3 0 0 1 6 0h1V9.17l-2.58-2.59z"/>
    </svg>
  `),
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

const anomalieIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,' + btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#ef4444" width="40" height="40">
      <path d="M8 17a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM16 17a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/>
      <path d="M18.42 6.58A2 2 0 0 0 17 6H7a2 2 0 0 0-1.42.58L3 9.17V17h1a3 3 0 0 1 6 0h4a3 3 0 0 1 6 0h1V9.17l-2.58-2.59z"/>
    </svg>
  `),
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

function ChangeMapView({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
}

// Moroccan cities for fallback
const moroccanCities = {
  'casablanca': { lat: 33.5731, lng: -7.5898 },
  'rabat': { lat: 34.0209, lng: -6.8416 },
  'fès': { lat: 34.0333, lng: -5.0000 },
  'marrakech': { lat: 31.6295, lng: -7.9811 },
  'tanger': { lat: 35.7595, lng: -5.8340 },
  'agadir': { lat: 30.4278, lng: -9.5981 },
  'meknès': { lat: 33.8935, lng: -5.5473 },
};

export default function Map() {
  const API_BASE_URL = 'http://localhost:8000/api';
  const { user } = useAuth(); // Get user from auth context

  const [searchQuery, setSearchQuery] = useState('');
  const [vehicles, setVehicles] = useState([]);
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [mapCenter, setMapCenter] = useState([33.5731, -7.5898]);
  const [mapZoom, setMapZoom] = useState(6);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchVehiclesData();
  }, []);

  /**
   * Get authentication token from localStorage
   */
  const getAuthToken = () => {
    const token = localStorage.getItem('token') || localStorage.getItem('auth_token');
    return token;
  };

  /**
   * Fetch vehicles with tracking data from optimized endpoint
   */
  const fetchVehiclesData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const token = getAuthToken();
      
      if (!token) {
        setError('Vous devez être connecté pour voir la carte. Veuillez vous connecter.');
        setLoading(false);
        return;
      }

      // Use the optimized map-data endpoint with authentication
      const response = await fetch(`${API_BASE_URL}/vehicules/map-data`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      
      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Session expirée. Veuillez vous reconnecter.');
        }
        throw new Error('Failed to fetch vehicle data');
      }

      const data = await response.json();
      
      if (data.success && data.data && data.data.length > 0) {
        // Filter out vehicles without location data
        const vehiclesWithLocation = data.data.filter(v => 
          v.latitude !== null && v.longitude !== null
        );

        if (vehiclesWithLocation.length === 0) {
          setError('Aucune donnée de localisation disponible. Veuillez ajouter des données de tracking.');
          setVehicles([]);
          setFilteredVehicles([]);
        } else {
          setVehicles(vehiclesWithLocation);
          setFilteredVehicles(vehiclesWithLocation);
        }
      } else {
        setError('Aucun véhicule trouvé dans la base de données.');
        setVehicles([]);
        setFilteredVehicles([]);
      }
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching vehicles:', error);
      setError(error.message || 'Erreur de connexion au serveur. Vérifiez que votre API Laravel fonctionne.');
      setVehicles([]);
      setFilteredVehicles([]);
      setLoading(false);
    }
  };

  /**
   * Handle search
   */
  const handleSearch = (query) => {
    setSearchQuery(query);
    
    if (!query.trim()) {
      setFilteredVehicles(vehicles);
      setMapCenter([33.5731, -7.5898]);
      setMapZoom(6);
      return;
    }

    const searchLower = query.toLowerCase().trim();
    
    const filtered = vehicles.filter(vehicle => 
      (vehicle.ville && vehicle.ville.toLowerCase().includes(searchLower)) ||
      vehicle.immatriculation.toLowerCase().includes(searchLower) ||
      vehicle.marque.toLowerCase().includes(searchLower) ||
      vehicle.modele.toLowerCase().includes(searchLower) ||
      (vehicle.mission && vehicle.mission.destination && 
       vehicle.mission.destination.toLowerCase().includes(searchLower))
    );

    setFilteredVehicles(filtered);

    if (filtered.length > 0) {
      setMapCenter([filtered[0].latitude, filtered[0].longitude]);
      setMapZoom(12);
    } else if (moroccanCities[searchLower]) {
      const coords = moroccanCities[searchLower];
      setMapCenter([coords.lat, coords.lng]);
      setMapZoom(12);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setFilteredVehicles(vehicles);
    setMapCenter([33.5731, -7.5898]);
    setMapZoom(6);
  };

  const conformeCount = filteredVehicles.filter(v => v.etat === 'conforme').length;
  const anomalieCount = filteredVehicles.filter(v => v.etat === 'anomalie').length;
  const totalVehicles = filteredVehicles.length;

  if (loading) {
    return (
      <div className="w-full flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-700 font-medium">Chargement de la carte...</p>
          <p className="text-sm text-gray-500 mt-2">Récupération des données des véhicules</p>
        </div>
      </div>
    );
  }

  if (error || vehicles.length === 0) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md p-8 bg-white rounded-lg shadow-lg">
          <AlertCircle className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Aucune donnée disponible</h2>
          <p className="text-gray-600 mb-4">{error || 'Aucun véhicule avec données de localisation'}</p>
          <div className="space-y-2 text-left bg-gray-50 p-4 rounded mb-4">
            <p className="text-sm text-gray-700"><strong>Pour afficher les véhicules:</strong></p>
            <ol className="text-sm text-gray-600 list-decimal list-inside space-y-1">
              <li>Assurez-vous d'être connecté</li>
              <li>Exécutez: <code className="bg-gray-200 px-1 rounded">php artisan db:seed --class=TrackingSeeder</code></li>
              <li>Puis cliquez sur le bouton Actualiser</li>
            </ol>
          </div>
          <button
            onClick={fetchVehiclesData}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition mx-auto"
          >
            <RefreshCw className="w-5 h-5" />
            Actualiser
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="w-full bg-white shadow-sm border-b border-gray-200 p-4 z-10">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Carte des Véhicules</h1>
            <p className="text-sm text-gray-600 mt-1">Localisation et état en temps réel</p>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={fetchVehiclesData}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors border border-blue-200"
            >
              <RefreshCw className="w-4 h-4" />
              Actualiser
            </button>
            <div className="flex items-center gap-4 bg-gray-50 px-4 py-2 rounded-lg">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium text-gray-700">Conforme: {conformeCount}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-sm font-medium text-gray-700">Anomalie: {anomalieCount}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700">Total: {totalVehicles}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Rechercher par ville, immatriculation, marque ou modèle..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full pl-10 pr-20 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />
          {searchQuery && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 text-sm font-medium"
            >
              Effacer
            </button>
          )}
        </div>

        {/* Search Results */}
        {searchQuery && (
          <div className="mt-2 flex items-center justify-between">
            <span className="text-sm text-gray-600">
              {filteredVehicles.length} véhicule(s) trouvé(s)
            </span>
            {filteredVehicles.length === 0 && (
              <span className="text-sm text-orange-600">
                Aucun résultat pour cette recherche
              </span>
            )}
          </div>
        )}
      </div>

      {/* Map Container */}
      <div className="w-full flex-1 relative">
        <MapContainer
          center={mapCenter}
          zoom={mapZoom}
          style={{ height: '100%', width: '100%' }}
          className="z-0"
        >
          <ChangeMapView center={mapCenter} zoom={mapZoom} />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {filteredVehicles.map((vehicle) => (
            <Marker
              key={vehicle.id}
              position={[vehicle.latitude, vehicle.longitude]}
              icon={vehicle.etat === 'conforme' ? conformeIcon : anomalieIcon}
            >
              <Popup>
                <div className="p-3 min-w-[250px]">
                  <h3 className="font-bold text-lg mb-3 text-gray-900 border-b pb-2">
                    {vehicle.immatriculation}
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600 font-medium">Marque:</span>
                      <span className="text-gray-900">{vehicle.marque}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 font-medium">Modèle:</span>
                      <span className="text-gray-900">{vehicle.modele}</span>
                    </div>
                    {vehicle.ville && (
                      <div className="flex justify-between">
                        <span className="text-gray-600 font-medium">Ville:</span>
                        <span className="text-gray-900">{vehicle.ville}</span>
                      </div>
                    )}
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 font-medium">État:</span>
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        vehicle.etat === 'conforme' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {vehicle.etat === 'conforme' ? 'Conforme' : 'Anomalie'}
                      </span>
                    </div>
                    {vehicle.mission && (
                      <div className="mt-3 pt-2 border-t">
                        <p className="text-gray-600 font-medium mb-1">Mission en cours:</p>
                        <p className="text-sm text-gray-900">{vehicle.mission.objet}</p>
                        <p className="text-xs text-gray-600 mt-1">→ {vehicle.mission.destination}</p>
                      </div>
                    )}
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        {/* Legend */}
        <div className="absolute bottom-6 left-6 bg-white p-4 rounded-lg shadow-lg z-[1000] border border-gray-200">
          <h3 className="font-bold text-sm mb-3 text-gray-800">Légende</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-green-500 rounded-md shadow"></div>
              <span className="text-sm text-gray-700">Véhicule conforme</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-red-500 rounded-md shadow"></div>
              <span className="text-sm text-gray-700">Véhicule avec anomalie</span>
            </div>
          </div>
        </div>

        {/* No results message */}
        {filteredVehicles.length === 0 && searchQuery && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg z-[1000] text-center">
            <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-lg font-medium text-gray-800 mb-2">Aucun véhicule trouvé</p>
            <p className="text-sm text-gray-600">Essayez une autre recherche</p>
          </div>
        )}
      </div>
    </div>
  );
}