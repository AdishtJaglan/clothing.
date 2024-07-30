import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";

function FilterSection({ title, options, activeFilter, onFilterChange }) {
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
                  type="radio"
                  className="form-radio h-5 w-5 text-blue-600"
                  checked={activeFilter === option}
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

export default function Filters() {
  const [activeFilter, setActiveFilter] = useState("");

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  return (
    <div className="mx-auto max-w-md p-6">
      <h2 className="mb-8 text-2xl font-bold text-gray-800">Refine Results</h2>

      <FilterSection
        title="Favorites"
        options={["liked"]}
        activeFilter={activeFilter}
        onFilterChange={handleFilterChange}
      />

      <FilterSection
        title="Product Type"
        options={["shorts", "shirts", "caps"]}
        activeFilter={activeFilter}
        onFilterChange={handleFilterChange}
      />

      <motion.button
        className="w-full rounded-lg bg-blue-600 px-4 py-3 text-lg font-semibold text-white transition-colors duration-200 hover:bg-blue-700 focus:outline-none"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => console.log("Apply filters")}
      >
        Apply Filters
      </motion.button>
    </div>
  );
}

FilterSection.propTypes = {
  title: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  activeFilter: PropTypes.string.isRequired,
  onFilterChange: PropTypes.func.isRequired,
};
