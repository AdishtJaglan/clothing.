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
    <div className="min-h-screen bg-gray-200">
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <h2 className="mb-8 text-center text-4xl font-extrabold text-gray-800">
          Your Shopping Cart
        </h2>
        {cartItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center rounded-lg bg-white p-12 text-center shadow-lg"
          >
            <MdOutlineRemoveShoppingCart className="mb-12 h-auto w-[50px]" />
            <p className="mb-6 text-2xl text-gray-600">Your cart is empty.</p>
            <button
              onClick={() => navigate("/shop")}
              className="rounded-full bg-blue-600 px-6 py-3 text-lg font-semibold text-white transition-colors duration-300 hover:bg-blue-700"
            >
              Start Shopping
            </button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="overflow-hidden rounded-lg bg-white shadow-lg"
          >
            <ul className="divide-y divide-gray-200">
              {cartItems.map((item) => (
                <motion.li
                  key={item.id}
                  className="flex flex-col items-center justify-between p-6 transition-colors duration-200 hover:bg-gray-50 md:flex-row"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="mx-4 flex w-full items-center justify-between space-x-4 md:justify-start md:space-x-6">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-24 w-24 rounded-lg object-cover shadow-md"
                    />
                    <div>
                      <h3 className="mb-1 text-xl font-semibold text-gray-800">
                        {item.name}
                      </h3>
                      <p className="text-lg font-medium text-blue-600">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 flex w-full items-center justify-between space-x-4 md:mt-0 md:w-auto md:justify-start">
                    <div className="flex items-center rounded-full bg-gray-100">
                      <button
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity - 1)
                        }
                        className="rounded-full p-2 text-gray-600 transition-colors hover:bg-gray-200"
                      >
                        <FiMinus />
                      </button>
                      <span className="w-10 text-center text-lg font-semibold">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity + 1)
                        }
                        className="rounded-full p-2 text-gray-600 transition-colors hover:bg-gray-200"
                      >
                        <FiPlus />
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="rounded-full bg-red-100 p-2 text-red-500 transition-colors hover:bg-red-200"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </motion.li>
              ))}
            </ul>
            <div className="bg-gray-50 p-8">
              <div className="mb-4 flex justify-between">
                <span className="text-xl text-gray-600">Subtotal</span>
                <span className="text-xl font-semibold text-gray-800">
                  $
                  {cartItems
                    .reduce(
                      (total, item) => total + item.price * item.quantity,
                      0,
                    )
                    .toFixed(2)}
                </span>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between">
                  <span className="text-2xl font-bold text-gray-800">
                    Total
                  </span>
                  <span className="text-2xl font-bold text-blue-600">
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
                className="mt-8 w-full rounded-full bg-blue-600 py-4 text-lg font-semibold text-white transition-colors duration-300 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Proceed to Checkout
              </button>
            </div>
          </motion.div>
        )}
      </div>
      <button
        onClick={() => navigate(-1)}
        className="group absolute left-4 top-20 flex items-center space-x-2 font-bold text-gray-600 transition-colors duration-300 hover:text-gray-800 sm:left-8 sm:top-24 md:left-12 md:top-28 lg:left-6 lg:top-36"
      >
        <IoChevronBackOutline className="h-5 w-5" />
        <span className="hidden sm:inline">Go Back</span>
      </button>

      {isReceiptOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="relative w-11/12 max-w-md rounded-lg bg-white p-6 shadow-lg"
          >
            <button
              onClick={closeReceipt}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
            >
              <FiX className="h-6 w-6" />
            </button>
            <h3 className="mb-4 text-center text-2xl font-bold">Receipt</h3>
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between border-b border-dashed border-gray-300 pb-2"
                >
                  <span className="text-gray-600">{item.name}</span>
                  <span className="text-gray-600">x{item.quantity}</span>
                  <span className="text-gray-800">
                    ${item.price.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-6 border-t border-gray-300 pt-4">
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>
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
              className="mt-6 w-full rounded-lg bg-blue-600 py-3 text-lg font-semibold text-white transition-colors duration-300 hover:bg-blue-700"
            >
              Close
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
}
