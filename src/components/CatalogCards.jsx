import { useState } from "react";
import { IoCartOutline, IoCartSharp } from "react-icons/io5";
import { FiHeart } from "react-icons/fi";
import { products as dataset } from "../data";
import PropTypes from "prop-types";

function CatalogCard({ name, price, image }) {
  const [cartIcon, setCartIcon] = useState(false);
  const [heartVisibility, setHeartVisibility] = useState(false);
  const [heartIconClick, setHeartIconClick] = useState(false);

  return (
    <div
      onMouseEnter={() => setHeartVisibility(true)}
      onMouseLeave={() => setHeartVisibility(false)}
      className="relative mb-3 flex h-full w-auto flex-col items-center justify-evenly rounded-xl bg-gray-50 p-3"
    >
      {heartVisibility || heartIconClick ? (
        <FiHeart
          onClick={() => setHeartIconClick(!heartIconClick)}
          className={`absolute right-0 top-0 m-6 mt-8 h-auto w-6 cursor-pointer ${heartIconClick ? "text-red-600" : ""}`}
        />
      ) : (
        ""
      )}
      <div>
        <img src={image} className="h-auto w-36 object-contain" />
      </div>
      <div className="flex w-full items-end justify-between p-3">
        <div className="flex w-full flex-col items-start justify-center">
          <p className="text-xl font-bold text-gray-800">{name}</p>
          <p className="text-lg font-light text-gray-600">${price}</p>
        </div>
        {!cartIcon ? (
          <IoCartOutline
            className="h-auto w-8 cursor-pointer"
            onMouseEnter={() => setCartIcon(!cartIcon)}
          />
        ) : (
          <IoCartSharp
            className="h-auto w-8 cursor-pointer"
            onMouseLeave={() => setCartIcon(!cartIcon)}
          />
        )}
      </div>
    </div>
  );
}

export default function CatalogCards() {
  return (
    <section className="mb-4 grid h-auto w-full grid-cols-3 gap-6 bg-gray-200">
      {dataset.map((data, index) => (
        <CatalogCard
          key={index}
          name={data.name}
          price={data.price}
          image={data.image}
          liked={data.liked}
        />
      ))}
    </section>
  );
}

CatalogCard.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  liked: PropTypes.bool,
};
