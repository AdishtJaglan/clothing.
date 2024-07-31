import { useState, useEffect } from "react";
import { products as data } from "../data";

const ProductCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [itemsPerView, setItemsPerView] = useState(3);

  const organizedData = [
    ...data
      .filter((item) => item.name.toLowerCase().includes("shirt"))
      .slice(0, 3),
    ...data
      .filter((item) => item.name.toLowerCase().includes("shorts"))
      .slice(0, 3),
    ...data
      .filter((item) => item.name.toLowerCase().includes("cap"))
      .slice(0, 3),
  ];

  const totalItems = organizedData.length;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        let nextIndex = prevIndex + direction;
        if (nextIndex >= totalItems - itemsPerView) {
          setDirection(-1);
          nextIndex = totalItems - itemsPerView;
        } else if (nextIndex < 0) {
          setDirection(1);
          nextIndex = 0;
        }
        return nextIndex;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [direction, totalItems, itemsPerView]);

  const handleDotClick = (index) => {
    setCurrentIndex(index * itemsPerView);
    setDirection(1);
  };

  return (
    <div className="mx-auto w-full max-w-6xl rounded-lg p-4 sm:w-5/6 sm:p-6 lg:w-2/3">
      <div className="relative overflow-hidden rounded-lg">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
          }}
        >
          {organizedData.map((item, index) => (
            <div
              key={index}
              className={`w-full flex-shrink-0 p-2 sm:w-1/2 sm:p-3 lg:w-1/3`}
            >
              <div className="overflow-hidden rounded-xl bg-gray-50 transition-all duration-300 hover:shadow-lg dark:bg-gray-800">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-48 w-full object-contain sm:h-56 lg:h-64"
                />
                <div className="p-3 sm:p-4">
                  <h3 className="mb-2 text-base font-semibold text-gray-800 dark:text-gray-300 sm:text-lg">
                    {item.name}
                  </h3>
                  <p className="font-bold text-gray-600 dark:text-gray-400">
                    ${item.price.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 flex justify-center sm:mt-6">
        {Array.from({ length: Math.ceil(totalItems / itemsPerView) }).map(
          (_, index) => (
            <button
              key={index}
              className={`mx-2 h-2 w-2 rounded-full transition-all duration-300 sm:h-3 sm:w-3 ${
                Math.floor(currentIndex / itemsPerView) === index
                  ? "bg-gray-600"
                  : "bg-white hover:bg-gray-600 dark:bg-gray-200"
              }`}
              onClick={() => handleDotClick(index)}
            ></button>
          ),
        )}
      </div>
    </div>
  );
};

export default ProductCarousel;
