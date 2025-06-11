export default function Navbar() {
    return (
        <nav className="w-full bg-white shadow-md py-4 px-6 flex justify-between items-center fixed top-0 left-0 right-0 z-50">
          <h1 className="text-2xl font-bold">My Website</h1>
          <ul className="hidden md:flex gap-6">
            <li><a href="#" className="text-gray-700 hover:text-black">Home</a></li>
            <li><a href="#" className="text-gray-700 hover:text-black">Services</a></li>
            <li><a href="#" className="text-gray-700 hover:text-black">Contact</a></li>
          </ul>
          <button className="md:hidden text-gray-700">☰</button>
        </nav>
      );
  }