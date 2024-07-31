import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiHeart, FiShoppingCart } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../CartContext";
import { products as dataset } from "../data";
import PropTypes from "prop-types";

function CatalogCard({ name, price, image, liked, id }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(liked);
  const [isInCart, setIsInCart] = useState(false);
  const navigate = useNavigate();
  const { addToCart, cartItems, removeFromCart } = useCart();

  useEffect(() => {
    setIsInCart(cartItems.some((item) => item.id === id));
  }, [cartItems, id]);

  const handleCardClick = (id) => {
    navigate(`/catalog/${id}`);
  };

  const handleToggleCart = () => {
    if (isInCart) {
      removeFromCart(id);
    } else {
      addToCart({ id, name, price, image, quantity: 1 });
    }
    setIsInCart(!isInCart);
  };

  return (
    <motion.div
      className="relative overflow-hidden rounded-xl transition-shadow hover:shadow-xl"
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 300 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="dark:bg-gray-700 relative aspect-square bg-gray-100">
        <img src={image} alt={name} className="h-full w-full object-cover" />
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40"
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="dark:bg-gray-300 rounded-full bg-white px-4 py-2 text-sm font-semibold text-gray-800 shadow-md sm:px-6 sm:text-base"
                onClick={() => handleCardClick(id)}
              >
                Quick View
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="dark:bg-gray-800 bg-white p-4">
        <h3 className="dark:text-gray-200 mb-2 text-base font-semibold text-gray-800 sm:text-lg">
          {name}
        </h3>
        <p className="dark:text-blue-400 text-lg font-bold text-blue-600 sm:text-xl">
          ${price.toFixed(2)}
        </p>
      </div>
      <div className="absolute right-2 top-2 flex flex-col space-y-2">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsLiked(!isLiked)}
          className={`rounded-full p-2 ${
            isLiked
              ? "dark:bg-pink-900 dark:text-pink-300 bg-red-500 text-white"
              : "dark:bg-gray-500 dark:text-gray-200 bg-white text-gray-800"
          }`}
        >
          <FiHeart className="h-5 w-5 sm:h-6 sm:w-6" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleToggleCart}
          className={`rounded-full p-2 ${
            isInCart
              ? "dark:bg-green-900 dark:text-green-300 bg-green-500 text-white"
              : "dark:bg-gray-500 dark:text-gray-200 bg-white text-gray-800"
          }`}
        >
          <FiShoppingCart className="h-5 w-5 sm:h-6 sm:w-6" />
        </motion.button>
      </div>
    </motion.div>
  );
}

export default function CatalogCards({ filters }) {
  const [filteredProducts, setFilteredProducts] = useState(dataset);

  useEffect(() => {
    let newFilteredProducts = dataset;

    if (filters.liked) {
      newFilteredProducts = newFilteredProducts.filter(
        (product) => product.liked,
      );
    }

    if (filters.category && filters.category.length > 0) {
      newFilteredProducts = newFilteredProducts.filter((product) =>
        filters.category.includes(product.category),
      );
    }

    setFilteredProducts(newFilteredProducts);
  }, [filters]);

  return (
    <section className="p-4">
      <div className="container mx-auto mt-6">
        <h2 className="dark:text-gray-400 mb-8 text-xl font-bold text-gray-900 sm:text-2xl">
          Catalog ({filteredProducts.length} items)
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((data) => (
            <CatalogCard
              key={data.id}
              id={data.id}
              name={data.name}
              price={data.price}
              image={data.image}
              liked={data.liked}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

CatalogCard.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  liked: PropTypes.bool,
  id: PropTypes.number.isRequired,
};

CatalogCards.propTypes = {
  filters: PropTypes.object,
};
