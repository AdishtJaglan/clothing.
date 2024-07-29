import { FiShoppingCart, FiHeart, FiSearch } from "react-icons/fi";

export default function Navbar() {
  return (
    <nav className="flex w-full items-center justify-between p-6">
      <div className="flex w-70 items-center justify-between gap-8">
        <h2 className="text-4xl font-black">clothes.</h2>
        <div className="flex items-end gap-6">
          <p className="cursor-pointer text-base font-semibold hover:underline">
            Home
          </p>
          <p className="cursor-pointer text-base font-semibold hover:underline">
            Store
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between gap-6">
        <div className="group flex w-full items-center justify-evenly rounded-full bg-gray-100 p-3 transition-all duration-300 hover:bg-gray-200">
          <FiSearch className="h-auto w-6" />
          <input
            className="text-bold ml-3 w-full bg-gray-100 text-black outline-none transition-all duration-300 hover:bg-gray-200 group-hover:bg-gray-200"
            placeholder="Search"
          />
        </div>
        <FiShoppingCart className="h-auto w-8 cursor-pointer" />
        <FiHeart className="h-auto w-8 cursor-pointer" />
      </div>
    </nav>
  );
}
