import { FiShoppingCart, FiHeart, FiSearch } from "react-icons/fi";

export default function Navbar() {
  return (
    <nav className="flex w-full items-center justify-between p-6 bg-gray-200">
      <div className="w-70 flex items-center justify-between gap-8">
        <h2 className="text-4xl font-bold tracking-tighter">clothing.</h2>
        <div className="flex items-end gap-6">
          <p className="relative cursor-pointer text-base font-semibold after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:scale-x-0 after:bg-black after:transition-transform after:duration-300 hover:after:scale-x-100">
            Home
          </p>
          <p className="relative cursor-pointer text-base font-semibold after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:scale-x-0 after:bg-black after:transition-transform after:duration-300 hover:after:scale-x-100">
            Store
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between gap-6">
        <div className="group flex w-full items-center justify-evenly rounded-full bg-gray-50 p-3 transition-all duration-300 hover:bg-white">
          <FiSearch className="h-auto w-6" />
          <input
            className="text-bold ml-3 w-full bg-gray-50 text-black outline-none transition-all duration-300 hover:bg-white group-hover:bg-white"
            placeholder="Search"
          />
        </div>
        <FiShoppingCart className="h-auto w-8 cursor-pointer" />
        <FiHeart className="h-auto w-8 cursor-pointer" />
      </div>
    </nav>
  );
}
