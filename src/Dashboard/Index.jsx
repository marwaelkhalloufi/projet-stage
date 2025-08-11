// Dashboard/Index.jsx
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
        return <Dashboard onNavigate={handleNavigate} currentPage={currentPage} />;
      case "collaborateurs":
        return <Collaborateurs onNavigate={handleNavigate} currentPage={currentPage} />;
      case "direction":
        return <Direction onNavigate={handleNavigate} currentPage={currentPage} />;
      case "frais":
        return <TraitementDesFrais onNavigate={handleNavigate} currentPage={currentPage} />;
      case "statistique":
        return <Statistique onNavigate={handleNavigate} currentPage={currentPage} />;
      default:
        return <Dashboard onNavigate={handleNavigate} currentPage={currentPage} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar currentPage={currentPage} onNavigate={handleNavigate} />
      {renderCurrentPage()}
    </div>
  );
}
