import { Users, BarChart3, MapPin, CreditCard, TrendingUp, Map, LogOut } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { NavLink, useLocation } from "react-router-dom";

export default function Sidebar() {
  const { user, logout } = useAuth();
  const location = useLocation();

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: BarChart3, to: "/dashboard" },
    { id: "collaborateurs", label: "Collaborateurs", icon: Users, to: "/dashboard/collaborateurs" },
    { id: "direction", label: "Direction", icon: MapPin, to: "/dashboard/direction" },
    { id: "frais", label: "Frais", icon: CreditCard, to: "/dashboard/traitementDesFrais" },
    { id: "statistique", label: "Statistique", icon: TrendingUp, to: "/dashboard/statistique" },
    { id: "map", label: "Carte", icon: Map, to: "/dashboard/map" },
  ];

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
          {menuItems.map(({ id, label, icon: Icon, to }) => {
            const isActive =
              location.pathname === to || location.pathname.startsWith(to + "/");
            return (
              <NavLink
                key={id}
                to={to}
                className={`flex items-center px-6 py-3 transition-colors ${
                  isActive
                    ? "text-blue-600 bg-blue-50 border-r-2 border-blue-600"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <Icon className="w-5 h-5 mr-3" />
                <span className={isActive ? "font-medium" : ""}>{label}</span>
              </NavLink>
            );
          })}
        </div>
      </nav>

      {user && (
        <div className="mt-auto p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center space-x-3 mb-3">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
                {user.prenom?.charAt(0)}
                {user.nom?.charAt(0)}
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

          {/* Logout button */}
          <button
            onClick={logout}
            className="cursor-pointer flex items-center w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Déconnexion
          </button>
        </div>
      )}
    </div>
  );
}