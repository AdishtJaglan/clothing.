import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiHeart, FiShoppingCart, FiCheck } from "react-icons/fi";
import { IoChevronBackOutline } from "react-icons/io5";
import { motion } from "framer-motion";
import { products } from "../data";
import { useCart } from "../CartContext.js";
import Navbar from "../components/Navbar";

export default function Product() {
  const [isLiked, setIsLiked] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  const { id } = useParams();
  const item = products.find((product) => product.id === parseInt(id));

  const { cartItems, addToCart, removeFromCart } = useCart();
  const isInCart = cartItems.some((cartItem) => cartItem.id === parseInt(id));

  if (!item) {
    return <div>404! Item not found</div>;
  }

  const handleCartClick = () => {
    if (isInCart) {
      removeFromCart(parseInt(id));
    } else {
      addToCart({
        id: parseInt(id),
        name: item.name,
        price: item.price,
        image: item.image,
        quantity: quantity,
      });
    }
  };
  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
    if (isInCart) {
      removeFromCart(parseInt(id));
      addToCart({
        id: parseInt(id),
        name: item.name,
        price: item.price,
        image: item.image,
        quantity: newQuantity,
      });
    }
  };

  return (
    <>
      <Navbar />
      <main className="relative min-h-screen bg-gray-200 py-8 sm:py-12 md:py-16 lg:py-20">
        <button
          onClick={() => navigate(-1)}
          className="group absolute left-4 top-0 flex items-center space-x-2 font-bold text-gray-600 transition-colors duration-300 hover:text-gray-800 sm:left-8 sm:top-20 md:left-16 md:top-12 lg:left-22 lg:top-16"
        >
          <IoChevronBackOutline className="h-6 w-6 transition duration-300 group-hover:-translate-x-1 sm:group-hover:-translate-x-2" />
          <span className="hidden sm:inline">Go Back</span>
        </button>
        <div className="container mx-auto px-4">
          <div className="bg-gray-200 lg:flex">
            <motion.div
              className="p-4 sm:p-6 md:p-8 lg:w-1/2"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <img
                src={item.image}
                alt={item.name}
                className="h-full w-full rounded-2xl bg-white object-cover shadow-lg"
              />
            </motion.div>
            <motion.div
              className="flex flex-col justify-between p-4 sm:p-6 md:p-8 lg:w-1/2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div>
                <h1 className="mb-2 text-2xl font-bold text-gray-800 sm:mb-4 sm:text-3xl md:text-4xl">
                  {item.name}
                </h1>
                <p className="mb-4 text-base text-gray-600 sm:mb-6 sm:text-lg md:text-xl">
                  {item.desc}
                </p>
                <p className="mb-2 text-2xl font-bold text-blue-600 sm:mb-4 sm:text-3xl">
                  ${item.price.toFixed(2)}
                </p>
                <div className="mb-4 flex items-center sm:mb-6">
                  <FiCheck className="mr-2 text-green-500" />
                  <span className="text-base font-semibold text-green-500 sm:text-lg">
                    In Stock
                  </span>
                </div>
                <div className="mb-4 flex items-center sm:mb-6">
                  <span className="mr-4 text-base font-semibold sm:text-lg">
                    Quantity:
                  </span>
                  <button
                    onClick={() =>
                      handleQuantityChange(Math.max(1, quantity - 1))
                    }
                    className="rounded-full bg-gray-300 px-2 py-1 text-center text-lg font-bold sm:px-3 sm:text-xl"
                  >
                    -
                  </button>
                  <span className="mx-4 text-lg font-semibold sm:text-xl">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(quantity + 1)}
                    className="rounded-full bg-gray-300 px-2 py-1 text-center text-lg font-bold sm:px-3 sm:text-xl"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="space-y-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full rounded-xl bg-blue-600 py-2 text-lg font-semibold text-white transition duration-300 hover:bg-blue-700 sm:py-3 sm:text-xl"
                >
                  Buy Now
                </motion.button>
                <div className="flex space-x-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsLiked(!isLiked)}
                    className={`flex-1 rounded-xl py-2 text-base font-semibold transition duration-300 sm:py-3 sm:text-lg md:text-xl ${
                      isLiked
                        ? "border-2 border-pink-600 bg-pink-100 text-pink-600"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-300"
                    }`}
                  >
                    <FiHeart className="mr-2 inline-block" />
                    {isLiked ? "Liked" : "Like"}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleCartClick}
                    className={`flex-1 rounded-xl py-2 text-base font-semibold transition duration-300 sm:py-3 sm:text-lg md:text-xl ${
                      isInCart
                        ? "border-2 border-green-600 bg-green-100 text-green-600"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-300"
                    }`}
                  >
                    <FiShoppingCart className="mr-2 inline-block" />
                    {isInCart ? "In Cart" : "Add to Cart"}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </>
  );
}
