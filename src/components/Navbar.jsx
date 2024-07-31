import { useState } from "react";
import { Link } from "react-router-dom";
import { FiShoppingCart, FiHeart, FiSearch, FiMenu, FiX } from "react-icons/fi";
import PropTypes from "prop-types";
import { products } from "../data";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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

  return (
    <>
      <nav className="bg-gray-200 p-4 md:p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-evenly gap-6">
            <h2 className="text-2xl font-bold tracking-tighter md:text-4xl">
              clothing.
            </h2>

            <div className="mt-3 hidden items-center space-x-6 md:flex">
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
              <FiShoppingCart className="h-6 w-6 cursor-pointer" />
            </Link>
            <FiHeart className="h-6 w-6 cursor-pointer" />
          </div>

          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <FiX className="h-6 w-6" />
            ) : (
              <FiMenu className="h-6 w-6" />
            )}
          </button>
        </div>

        {isMenuOpen && (
          <div className="mt-4 md:hidden">
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
            </div>
          </div>
        )}
      </nav>

      {isDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-11/12 max-w-lg rounded-lg bg-white p-6 shadow-lg">
            <button
              className="absolute right-2 top-2 text-gray-500 hover:text-gray-700"
              onClick={closeDialog}
            >
              <FiX className="mr-4 mt-4 h-6 w-6" />
            </button>
            <h3 className="mb-4 text-lg font-bold">Search Results</h3>
            {searchResults.length > 0 ? (
              <div className="space-y-4">
                {searchResults.map((product) => (
                  <div
                    key={product.name}
                    className="flex items-center space-x-4 rounded-lg border border-gray-200 p-3 shadow-sm"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-16 w-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <p className="text-base font-medium">{product.name}</p>
                      <p className="text-sm text-gray-500">
                        {product.category}
                      </p>
                      <p className="text-lg font-bold">${product.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No products found.</p>
            )}
            <div className="mt-4 flex justify-end">
              <button
                className="rounded-lg bg-gray-300 px-4 py-2 text-sm font-bold text-gray-800 hover:bg-gray-400"
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
      className={`group flex items-center rounded-full bg-gray-50 p-2 transition-all duration-300 hover:bg-white ${
        mobile ? "mt-4" : "w-full"
      }`}
    >
      <FiSearch
        className="ml-2 h-5 w-5 cursor-pointer"
        onClick={handleSearch}
      />
      <input
        className="ml-2 w-full bg-gray-50 text-black outline-none transition-all duration-300 hover:bg-white group-hover:bg-white"
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
