import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";

function FilterSection({ title, options, activeFilters, onFilterChange }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="mb-6">
      <motion.button
        className="flex w-full items-center justify-between rounded-lg bg-gray-100 px-4 py-3 text-lg font-semibold text-gray-800 transition-colors duration-200 hover:bg-gray-300 focus:outline-none"
        onClick={() => setIsExpanded(!isExpanded)}
        whileTap={{ scale: 0.98 }}
      >
        <span>{title}</span>
        <motion.span
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          ▼
        </motion.span>
      </motion.button>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-2 space-y-2"
          >
            {options.map((option) => (
              <label
                key={option}
                className="flex cursor-pointer items-center space-x-3 rounded-md px-4 py-2 transition-colors duration-200 hover:bg-gray-100"
              >
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-blue-600"
                  checked={activeFilters.includes(option)}
                  onChange={() => onFilterChange(option)}
                />
                <span className="capitalize text-gray-700">{option}</span>
              </label>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Sidebar({ onFilterChange }) {
  const [activeFilters, setActiveFilters] = useState([]);

  const handleFilterChange = (filter) => {
    setActiveFilters((prev) => {
      if (prev.includes(filter)) {
        return prev.filter((f) => f !== filter);
      } else {
        return [...prev, filter];
      }
    });
  };

  const applyFilters = () => {
    const filters = {
      liked: activeFilters.includes("liked"),
      category: activeFilters.filter((f) =>
        ["shorts", "shirt", "cap"].includes(f),
      ),
    };
    onFilterChange(filters);
  };

  return (
    <div className="h-full overflow-y-auto">
      <h2 className="mb-8 text-2xl font-bold text-gray-800">Refine Results</h2>

      <FilterSection
        title="Favorites"
        options={["liked"]}
        activeFilters={activeFilters}
        onFilterChange={handleFilterChange}
      />

      <FilterSection
        title="Product Type"
        options={["shorts", "shirt", "cap"]}
        activeFilters={activeFilters}
        onFilterChange={handleFilterChange}
      />

      <motion.button
        className="w-full rounded-lg bg-blue-600 px-4 py-3 text-lg font-semibold text-white transition-colors duration-200 hover:bg-blue-700 focus:outline-none"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={applyFilters}
      >
        Apply Filters
      </motion.button>
    </div>
  );
}

FilterSection.propTypes = {
  title: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  activeFilters: PropTypes.array.isRequired,
  onFilterChange: PropTypes.func.isRequired,
};

Sidebar.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
};
