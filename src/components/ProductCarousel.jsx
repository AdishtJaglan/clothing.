import { useState, useEffect } from "react";
import { products as data } from "../data";

const ProductCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

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
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        let nextIndex = prevIndex + direction;
        if (nextIndex >= totalItems - 2) {
          setDirection(-1);
          nextIndex = totalItems - 3;
        } else if (nextIndex < 0) {
          setDirection(1);
          nextIndex = 0;
        }
        return nextIndex;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [direction, totalItems]);

  const handleDotClick = (index) => {
    setCurrentIndex(index * 3);
    setDirection(1);
  };

  return (
    <div className="mx-auto w-2/3 max-w-6xl rounded-lg p-6">
      <div className="relative overflow-hidden rounded-lg">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * (100 / 3)}%)` }}
        >
          {organizedData.map((item, index) => (
            <div key={index} className="w-1/3 flex-shrink-0 p-3">
              <div className="overflow-hidden rounded-xl bg-gray-50 transition-all duration-300 hover:shadow-lg">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-64 w-full object-contain"
                />
                <div className="p-4">
                  <h3 className="mb-2 text-lg font-semibold text-gray-800">
                    {item.name}
                  </h3>
                  <p className="font-bold text-gray-600">
                    ${item.price.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-6 flex justify-center">
        {[0, 1, 2].map((index) => (
          <button
            key={index}
            className={`mx-2 h-3 w-3 rounded-full transition-all duration-300 ${
              Math.floor(currentIndex / 3) === index
                ? "bg-gray-600"
                : "bg-white hover:bg-gray-600"
            }`}
            onClick={() => handleDotClick(index)}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default ProductCarousel;
