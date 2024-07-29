import Navbar from "../components/Navbar";
import ProductCarousel from "../components/ProductCarousel";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex h-auto w-full flex-col items-center justify-center bg-gray-200 p-6">
        <h1 className="m-6 mt-0 p-3 text-4xl font-bold tracking-tighter">
          Welcome to clothing.
        </h1>
        <p className="m-6 block w-2/3 text-center text-lg font-light">
          Explore our curated collection of stylish{" "}
          <span className="font-semibold tracking-tighter">clothing</span>,
          designed to elevate your wardrobe. Shop the latest trends and timeless
          pieces, delivered straight to your door.
        </p>
        <button className="m-6 mb-0 w-28 rounded-lg border-2 border-white p-3 text-sm font-bold text-gray-700 transition duration-300 hover:bg-gray-50">
          Shop Now
        </button>
        <ProductCarousel />
      </main>
    </>
  );
}
