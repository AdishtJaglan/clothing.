import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FiShoppingCart,
  FiHeart,
  FiSearch,
  FiMenu,
  FiX,
  FiMoon,
  FiSun,
} from "react-icons/fi";
import PropTypes from "prop-types";
import { products } from "../data";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleSearch = () => {
    const results = products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    setSearchResults(results);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setSearchQuery("");
    setSearchResults([]);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <>
      <nav className="bg-gray-200 p-4 dark:bg-gray-900 md:p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-evenly gap-6">
            <h2 className="text-2xl font-bold tracking-tighter dark:text-gray-400 md:text-4xl">
              clothing.
            </h2>

            <div className="mt-3 hidden items-center space-x-6 dark:text-gray-400 md:flex">
              <NavLink to="/home">Home</NavLink>
              <NavLink to="/catalog">Store</NavLink>
            </div>
          </div>

          <div className="hidden items-center space-x-6 md:flex">
            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              handleSearch={handleSearch}
            />
            <Link to="/cart">
              <FiShoppingCart className="h-6 w-6 cursor-pointer dark:text-gray-400" />
            </Link>
            <FiHeart className="h-9 w-9 cursor-pointer dark:text-gray-400" />
            <button
              onClick={toggleDarkMode}
              className="text-gray-800 dark:text-gray-200"
            >
              {isDarkMode ? (
                <FiSun className="h-6 w-6 cursor-pointer dark:text-gray-400" />
              ) : (
                <FiMoon className="h-6 w-6 cursor-pointer dark:text-gray-400" />
              )}
            </button>
          </div>

          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <FiX className="h-6 w-6 dark:text-gray-400" />
            ) : (
              <FiMenu className="h-6 w-6 dark:text-gray-400" />
            )}
          </button>
        </div>

        {isMenuOpen && (
          <div className="mt-4 dark:text-gray-400 md:hidden">
            <SearchBar
              mobile
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              handleSearch={handleSearch}
            />
            <NavLink to="/home" mobile>
              Home
            </NavLink>
            <NavLink to="/catalog" mobile>
              Store
            </NavLink>
            <div className="mt-4 flex justify-center space-x-6">
              <Link to="/cart">
                <FiShoppingCart className="h-6 w-6 cursor-pointer" />
              </Link>
              <FiHeart className="h-6 w-6 cursor-pointer" />
              <button
                onClick={toggleDarkMode}
                className="text-gray-800 dark:text-gray-400"
              >
                {isDarkMode ? (
                  <FiSun className="h-6 w-6 cursor-pointer" />
                ) : (
                  <FiMoon className="h-6 w-6 cursor-pointer" />
                )}
              </button>
            </div>
          </div>
        )}
      </nav>

      {isDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-11/12 max-w-lg rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
            <button
              className="absolute right-2 top-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              onClick={closeDialog}
            >
              <FiX className="mr-4 mt-4 h-6 w-6" />
            </button>
            <h3 className="mb-4 text-lg font-bold text-gray-800 dark:text-gray-300">
              Search Results
            </h3>
            {searchResults.length > 0 ? (
              <div className="space-y-4">
                {searchResults.map((product) => (
                  <div
                    key={product.name}
                    className="flex items-center space-x-4 rounded-lg border border-gray-200 p-3 shadow-sm dark:border-gray-700 dark:bg-gray-700"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-16 w-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <p className="text-base font-medium text-gray-800 dark:text-gray-200">
                        {product.name}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {product.category}
                      </p>
                      <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
                        ${product.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 dark:text-gray-400">
                No products found.
              </p>
            )}
            <div className="mt-4 flex justify-end">
              <button
                className="rounded-lg bg-gray-300 px-4 py-2 text-sm font-bold text-gray-800 hover:bg-gray-400 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500"
                onClick={closeDialog}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function NavLink({ to, children, mobile }) {
  const baseClasses = "relative cursor-pointer text-base font-semibold";
  const desktopClasses =
    "after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:scale-x-0 after:bg-black after:transition-transform after:duration-300 hover:after:scale-x-100";
  const mobileClasses = "block py-2 text-center";

  return (
    <p className={`${baseClasses} ${mobile ? mobileClasses : desktopClasses}`}>
      <Link to={to}>{children}</Link>
    </p>
  );
}

function SearchBar({ mobile, searchQuery, setSearchQuery, handleSearch }) {
  return (
    <div
      className={`group flex items-center rounded-full bg-gray-50 p-2 transition-all duration-300 hover:bg-white dark:bg-gray-400 dark:hover:bg-gray-500 ${
        mobile ? "mt-4" : "w-full"
      }`}
    >
      <FiSearch
        className="ml-2 h-5 w-5 cursor-pointer dark:text-gray-200"
        onClick={handleSearch}
      />
      <input
        className="ml-2 w-full bg-gray-50 text-black outline-none transition-all duration-300 hover:bg-white group-hover:bg-white dark:bg-gray-400 dark:text-gray-800 dark:placeholder-gray-200 dark:group-hover:bg-gray-500"
        placeholder="Search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
}

NavLink.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  mobile: PropTypes.bool,
};

SearchBar.propTypes = {
  mobile: PropTypes.bool,
  searchQuery: PropTypes.string.isRequired,
  setSearchQuery: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired,
};
