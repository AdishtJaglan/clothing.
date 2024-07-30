import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiHeart } from "react-icons/fi";
import { products as dataset } from "../data";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

function CatalogCard({ name, price, image, liked, id }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(liked);
  const navigate = useNavigate();

  const handleCardClick = (id) => {
    navigate(`/catalog/${id}`);
  };

  return (
    <motion.div
      className="relative overflow-hidden rounded-xl transition-shadow hover:shadow-xl"
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 300 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-square bg-gray-100">
        <img src={image} alt={name} className="h-full w-full object-fill" />
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
                className="rounded-full bg-white px-6 py-2 font-semibold text-gray-800 shadow-md"
                onClick={() => handleCardClick(id)}
              >
                Quick View
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="bg-white p-4">
        <h3 className="mb-2 text-lg font-semibold text-gray-800">{name}</h3>
        <p className="text-xl font-bold text-gray-900">${price.toFixed(2)}</p>
      </div>
      <div className="absolute right-2 top-2 flex flex-col space-y-2">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsLiked(!isLiked)}
          className={`rounded-full p-2 ${
            isLiked ? "bg-red-500 text-white" : "bg-white text-gray-800"
          }`}
        >
          <FiHeart className="h-6 w-6" />
        </motion.button>
      </div>
    </motion.div>
  );
}

export default function CatalogCards() {
  return (
    <section className="">
      <div className="container mx-auto mt-6 p-4">
        <h2 className="mb-8 text-2xl font-bold text-gray-900">
          Catalog ({dataset.length} items)
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {dataset.map((data, index) => (
            <CatalogCard
              key={index}
              id={index}
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
