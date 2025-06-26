import { Link } from "react-router-dom";
// import userImg from "../assets/profile-placeholder.png"; // Replace with real image path

const NavbarInternal = () => {
  return (
    <nav className="w-full bg-gradient-to-r from-purple-800 to-indigo-900 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        {/* Left: Logo */}
        <Link
          to="/"
          className="text-3xl sm:text-6xl font-extrabold tracking-tight text-white hover:text-pink-400"
        >
          Interview<span className="text-pink-400">Vault</span>
        </Link>

        {/* Center: Links */}
        

        {/* Right: Profile section */}
        <div className="flex items-center gap-3">
          {/* <Link
            to="/profile"
            className="hover:text-pink-300 font-medium transition"
          >
            Profile
          </Link> */}
          {/* <img
            src={userImg}
            alt="Profile"
            className="w-10 h-10 rounded-full border-2 border-white object-cover"
          /> */}
        </div>
      </div>
    </nav>
  );
};

export default NavbarInternal;
