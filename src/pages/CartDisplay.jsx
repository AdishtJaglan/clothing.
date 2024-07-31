import { useState } from "react";
import { useCart } from "../CartContext";
import { FiMinus, FiPlus, FiTrash2, FiX } from "react-icons/fi";
import { IoChevronBackOutline } from "react-icons/io5";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function CartDisplay() {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);
  const navigate = useNavigate();

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity > 0) {
      updateQuantity(itemId, newQuantity);
    } else {
      removeFromCart(itemId);
    }
  };

  const handleProceedToCheckout = () => {
    setIsReceiptOpen(true);
  };

  const closeReceipt = () => {
    setIsReceiptOpen(false);
  };

  return (
    <div className="dark:bg-gray-900 dark min-h-screen bg-gray-200 transition-colors duration-300">
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <h2 className="dark:text-gray-300 mb-8 text-center text-4xl font-extrabold text-gray-800">
          Your Shopping Cart
        </h2>
        {cartItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="dark:bg-gray-800 flex flex-col items-center justify-center rounded-lg bg-white p-12 text-center shadow-lg"
          >
            <MdOutlineRemoveShoppingCart className="dark:text-gray-400 mb-12 h-auto w-[50px] text-gray-600" />
            <p className="dark:text-gray-300 mb-6 text-2xl text-gray-600">
              Your cart is empty.
            </p>
            <button
              onClick={() => navigate("/shop")}
              className="dark:bg-blue-500 dark:hover:bg-blue-600 rounded-full bg-blue-600 px-6 py-3 text-lg font-semibold text-white transition-colors duration-300 hover:bg-blue-700"
            >
              Start Shopping
            </button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="dark:bg-gray-800 overflow-hidden rounded-lg bg-white shadow-lg"
          >
            <ul className="dark:divide-gray-700 divide-y divide-gray-200">
              {cartItems.map((item) => (
                <motion.li
                  key={item.id}
                  className="dark:hover:bg-gray-700 flex flex-col items-center justify-between p-6 transition-colors duration-200 hover:bg-gray-50 md:flex-row"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="mx-4 flex w-full items-center justify-between space-x-4 md:justify-start md:space-x-6">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="dark:shadow-xl dark:bg-gray-600 h-24 w-24 rounded-lg object-cover shadow-md"
                    />
                    <div>
                      <h3 className="dark:text-gray-100 mb-1 text-xl font-semibold text-gray-800">
                        {item.name}
                      </h3>
                      <p className="dark:text-blue-400 text-lg font-medium text-blue-600">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 flex w-full items-center justify-between space-x-4 md:mt-0 md:w-auto md:justify-start">
                    <div className="dark:bg-gray-700 flex items-center rounded-full bg-gray-100">
                      <button
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity - 1)
                        }
                        className="dark:text-gray-300 dark:hover:bg-gray-600 rounded-full p-2 text-gray-600 transition-colors hover:bg-gray-200"
                      >
                        <FiMinus />
                      </button>
                      <span className="dark:text-gray-200 w-10 text-center text-lg font-semibold text-gray-800">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity + 1)
                        }
                        className="dark:text-gray-300 dark:hover:bg-gray-600 rounded-full p-2 text-gray-600 transition-colors hover:bg-gray-200"
                      >
                        <FiPlus />
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="dark:bg-red-900 dark:text-red-300 dark:hover:bg-red-800 rounded-full bg-red-100 p-2 text-red-500 transition-colors hover:bg-red-200"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </motion.li>
              ))}
            </ul>
            <div className="dark:bg-gray-700 bg-gray-50 p-8">
              <div className="mb-4 flex justify-between">
                <span className="dark:text-gray-300 text-xl text-gray-600">
                  Subtotal
                </span>
                <span className="dark:text-gray-100 text-xl font-semibold text-gray-800">
                  $
                  {cartItems
                    .reduce(
                      (total, item) => total + item.price * item.quantity,
                      0,
                    )
                    .toFixed(2)}
                </span>
              </div>
              <div className="dark:border-gray-600 border-t border-gray-200 pt-4">
                <div className="flex justify-between">
                  <span className="dark:text-gray-100 text-2xl font-bold text-gray-800">
                    Total
                  </span>
                  <span className="dark:text-blue-400 text-2xl font-bold text-blue-600">
                    $
                    {cartItems
                      .reduce(
                        (total, item) => total + item.price * item.quantity,
                        0,
                      )
                      .toFixed(2)}
                  </span>
                </div>
              </div>
              <button
                onClick={handleProceedToCheckout}
                className="dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-offset-gray-800 mt-8 w-full rounded-full bg-blue-600 py-4 text-lg font-semibold text-white transition-colors duration-300 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Proceed to Checkout
              </button>
            </div>
          </motion.div>
        )}
      </div>
      <button
        onClick={() => navigate(-1)}
        className="dark:text-gray-400 dark:hover:text-gray-100 group absolute left-4 top-20 flex items-center space-x-2 font-bold text-gray-600 transition-colors duration-300 hover:text-gray-800 sm:left-8 sm:top-24 md:left-12 md:top-28 lg:left-6 lg:top-36"
      >
        <IoChevronBackOutline className="h-5 w-5 transition duration-300 group-hover:-translate-x-2" />
        <span className="hidden sm:inline">Go Back</span>
      </button>

      {isReceiptOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="dark:bg-gray-800 relative w-11/12 max-w-md rounded-lg bg-white p-6 shadow-lg"
          >
            <button
              onClick={closeReceipt}
              className="dark:text-gray-400 dark:hover:text-gray-200 absolute right-4 top-4 text-gray-500 hover:text-gray-700"
            >
              <FiX className="h-6 w-6" />
            </button>
            <h3 className="dark:text-gray-300 mb-4 text-center text-2xl font-bold text-gray-800">
              Receipt
            </h3>
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="dark:border-gray-600 flex justify-between border-b border-dashed border-gray-300 pb-2"
                >
                  <span className="dark:text-gray-300 text-gray-600">
                    {item.name}
                  </span>
                  <span className="dark:text-gray-300 text-gray-600">
                    x{item.quantity}
                  </span>
                  <span className="dark:text-gray-100 text-gray-800">
                    ${item.price.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
            <div className="dark:border-gray-600 mt-6 border-t border-gray-300 pt-4">
              <div className="flex justify-between text-lg font-bold">
                <span className="dark:text-gray-100 text-gray-800">Total</span>
                <span className="dark:text-blue-400 text-blue-600">
                  $
                  {cartItems
                    .reduce(
                      (total, item) => total + item.price * item.quantity,
                      0,
                    )
                    .toFixed(2)}
                </span>
              </div>
            </div>
            <button
              onClick={closeReceipt}
              className="dark:bg-blue-500 dark:hover:bg-blue-600 mt-6 w-full rounded-lg bg-blue-600 py-3 text-lg font-semibold text-white transition-colors duration-300 hover:bg-blue-700"
            >
              Close
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
}
