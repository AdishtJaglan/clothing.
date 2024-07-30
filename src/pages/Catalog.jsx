import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import CatalogCards from "../components/CatalogCards";

export default function Catalog() {
  const [filters, setFilters] = useState({ liked: false, type: [] });

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <>
      <Navbar />
      <main className="bg-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5">
          <aside className="hidden bg-gray-200 p-4 md:col-span-1 md:block">
            <Sidebar onFilterChange={handleFilterChange} />
          </aside>
          <section className="col-span-1 md:col-span-3 lg:col-span-4">
            <CatalogCards filter={filters} />
          </section>
        </div>
      </main>
    </>
  );
}
