import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import ProductCarousel from "../components/ProductCarousel";

export default function Home() {
  return (
    <div className="dark:bg-gray-900 flex min-h-screen flex-col bg-gray-200">
      <Navbar />
      <main className="dark:text-gray-400 flex flex-grow flex-col items-center justify-center p-4 sm:p-6">
        <h1 className="m-4 mt-0 p-2 text-center text-3xl font-bold tracking-tighter sm:m-6 sm:p-3 sm:text-4xl">
          Welcome to clothing.
        </h1>
        <p className="m-4 block w-full text-center text-base font-light sm:m-6 sm:w-2/3 sm:text-lg">
          Explore our curated collection of stylish{" "}
          <span className="font-semibold tracking-tighter">clothing</span>,
          designed to elevate your wardrobe. Shop the latest trends and timeless
          pieces, delivered straight to your door.
        </p>
        <Link to="/catalog">
          <button className="dark:text-gray-400 dark:border-gray-400 dark:hover:text-gray-700 m-4 mb-0 w-28 rounded-lg border-2 border-white p-2 text-sm font-bold text-gray-700 transition duration-300 hover:bg-gray-50 sm:m-6 sm:p-3">
            Shop Now
          </button>
        </Link>
        <ProductCarousel />
      </main>
    </div>
  );
}
