import { useState } from "react";
import Dashboard from "./Dashboard";
import Collaborateurs from "./Collaborateurs";
import Sidebar from "./Sidebar";
import TraitementDesFrais from "./TraitementDesFrais";
import Statistique from "./statistique";
import Direction from "./Direction";

export default function Index() {
  const [currentPage, setCurrentPage] = useState("dashboard");

  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <Dashboard />;
      case "collaborateurs":
        return <Collaborateurs />;
      case "direction":
        return <Direction />;
      case "frais":
        return <TraitementDesFrais />;
      case "statistique":
        return <Statistique />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar - fixed width */}
      <div className="w-64 flex-shrink-0">
        <Sidebar currentPage={currentPage} onNavigate={handleNavigate} />
      </div>
      
      {/* Main content area - takes remaining space */}
      <div className="flex-1 overflow-auto p-6">
        {renderCurrentPage()}
      </div>
    </div>
  );
}