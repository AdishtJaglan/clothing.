import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import CatalogCards from "../components/CatalogCards";

export default function Catalog() {
  const [filters, setFilters] = useState({ liked: false, category: [] });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setIsSidebarOpen(false);
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-200">
      <Navbar />
      <main className="flex-grow">
        <div className="flex">
          <aside
            className={`fixed inset-y-0 left-0 z-20 w-64 transform bg-gray-200 p-4 transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${
              isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <Sidebar onFilterChange={handleFilterChange} />
          </aside>
          <div className="flex-grow">
            <button
              className="fixed bottom-4 left-4 z-30 h-auto w-14 rounded-full bg-blue-600 p-2 text-white md:hidden"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              {isSidebarOpen ? "✕" : "☰"}
            </button>
            <CatalogCards filters={filters} />
          </div>
        </div>
      </main>
    </div>
  );
}
