import { Users, BarChart3, MapPin, CreditCard, TrendingUp } from "lucide-react"
import { useAuth } from "../contexts/AuthContext" // Adjust path as needed

export default function Sidebar({ currentPage, onNavigate }) {
  const { user } = useAuth()
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: BarChart3 },
    { id: "collaborateurs", label: "Collaborateurs", icon: Users },
    { id: "direction", label: "Direction", icon: MapPin },
    { id: "frais", label: "Frais", icon: CreditCard },
    { id: "statistique", label: "Statistique", icon: TrendingUp },
  ]

  return (
    <div className="flex flex-col h-screen w-64 bg-white shadow-sm">
      <div className="p-6">
        <h1 className="text-xl font-bold text-blue-600">Espace Équipe</h1>
      </div>

      <nav className="flex-grow mt-6 overflow-y-auto">
        <div className="px-6 py-2">
          <span className="text-sm font-medium text-gray-500">Collaborateurs</span>
        </div>

        <div className="mt-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = currentPage === item.id

            return (
              <div
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex items-center px-6 py-3 cursor-pointer transition-colors ${
                  isActive
                    ? "text-blue-600 bg-blue-50 border-r-2 border-blue-600"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <Icon className="w-5 h-5 mr-3" />
                <span className={isActive ? "font-medium" : ""}>{item.label}</span>
              </div>
            )
          })}
        </div>
      </nav>

      {/* User profile section pinned at bottom */}
      {user && (
        <div className="mt-auto p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
                {/* User initials */}
                {user.prenom?.charAt(0)}{user.nom?.charAt(0)}
              </div>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-gray-900 truncate">
                {user.prenom} {user.nom}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {user.role} • {user.email}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
