import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiHeart, FiShoppingCart, FiCheck } from "react-icons/fi";
import { IoChevronBackOutline } from "react-icons/io5";
import { motion } from "framer-motion";
import { products } from "../data";
import Navbar from "../components/Navbar";

export default function Product() {
  const [isLiked, setIsLiked] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const { id } = useParams();
  const navigate = useNavigate();
  const item = products[parseInt(id)];

  if (!item) {
    return <div>404! Item not found</div>;
  }

  return (
    <>
      <Navbar />
      <main className="relative min-h-screen bg-gray-200 py-20">
        <button
          onClick={() => navigate(-1)}
          className="group absolute left-36 top-12 flex items-center space-x-2 text-gray-700 transition hover:text-black"
        >
          <IoChevronBackOutline className="transition group-hover:-translate-x-1" />
          <span>Go Back</span>
        </button>
        <div className="container mx-auto px-4">
          <div className="bg-gray-200 lg:flex">
            <motion.div
              className="p-8 lg:w-1/2"
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
              className="flex flex-col justify-between p-8 lg:w-1/2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div>
                <h1 className="mb-4 text-4xl font-bold text-gray-800">
                  {item.name}
                </h1>
                <p className="mb-6 text-xl text-gray-600">{item.desc}</p>
                <p className="mb-4 text-3xl font-bold text-gray-800">
                  ${item.price.toFixed(2)}
                </p>
                <div className="mb-6 flex items-center">
                  <FiCheck className="mr-2 text-green-500" />
                  <span className="text-lg font-semibold text-green-500">
                    In Stock
                  </span>
                </div>
                <div className="mb-6 flex items-center">
                  <span className="mr-4 text-lg font-semibold">Quantity:</span>
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="rounded-full bg-gray-300 px-3 py-1 text-center text-xl font-bold"
                  >
                    -
                  </button>
                  <span className="mx-4 text-xl font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="rounded-full bg-gray-300 px-3 py-1 text-center text-xl font-bold"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="space-y-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full rounded-xl bg-blue-600 py-3 text-xl font-semibold text-white transition duration-300 hover:bg-blue-700"
                >
                  Buy Now
                </motion.button>
                <div className="flex space-x-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsLiked(!isLiked)}
                    className={`flex-1 rounded-xl py-3 text-xl font-semibold transition duration-300 ${
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
                    onClick={() => setIsInCart(!isInCart)}
                    className={`flex-1 rounded-xl py-3 text-xl font-semibold transition duration-300 ${
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
