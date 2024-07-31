import { useState } from "react";
import { Link } from "react-router-dom";
import { FiShoppingCart, FiHeart, FiSearch, FiMenu, FiX } from "react-icons/fi";
import PropTypes from "prop-types";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
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
          <SearchBar />
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
          <SearchBar mobile />
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

function SearchBar({ mobile }) {
  return (
    <div
      className={`group flex items-center rounded-full bg-gray-50 p-2 transition-all duration-300 hover:bg-white ${mobile ? "mt-4" : "w-full"}`}
    >
      <FiSearch className="ml-2 h-5 w-5" />
      <input
        className="ml-2 w-full bg-gray-50 text-black outline-none transition-all duration-300 hover:bg-white group-hover:bg-white"
        placeholder="Search"
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
};
