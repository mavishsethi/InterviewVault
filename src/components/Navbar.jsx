
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react"; // install lucide-react 

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full bg-gradient-to-r from-purple-800 to-indigo-900 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7.9xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Left: Logo */}
        <Link
          to="/"
          className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white hover:text-pink-400"
        >
          Interview<span className="text-pink-400">Vault</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            to="/login"
            className="bg-white text-purple-800 font-bold px-4 py-1.5 rounded hover:bg-pink-200 transition"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="border border-white px-4 py-1.5 rounded hover:bg-white hover:text-purple-900 font-bold transition"
          >
            Sign Up
          </Link>
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-purple-900 px-4 py-3 space-y-3 text-center">
          <Link
            to="/login"
            className="block bg-white text-purple-800 font-bold px-4 py-2 rounded hover:bg-pink-200 transition"
            onClick={() => setMenuOpen(false)}
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="block border border-white px-4 py-2 rounded hover:bg-white hover:text-purple-900 font-bold transition"
            onClick={() => setMenuOpen(false)}
          >
            Sign Up
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
