const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-indigo-900 to-purple-900 text-white py-10 px-6 mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Branding */}
        <div>
          <h2 className="text-3xl font-extrabold text-white mb-3">
            Interview<span className="text-pink-400">Vault</span>
          </h2>
          <p className="text-gray-300 text-sm">
            A modern platform to share and explore real interview experiences. Built for job seekers, students, and professionals.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-3 text-pink-300">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><a href="/explore" className="hover:text-pink-400">Explore Experiences</a></li>
            <li><a href="/add" className="hover:text-pink-400">Add Experience</a></li>
            <li><a href="/login" className="hover:text-pink-400">Login</a></li>
            <li><a href="/signup" className="hover:text-pink-400">Sign Up</a></li>
          </ul>
        </div>

        {/* Contact / Social */}
        <div>
          <h3 className="text-xl font-semibold mb-3 text-pink-300">Connect</h3>
          <p className="text-sm text-gray-300 mb-2">
            Have questions or feedback? Reach out:
          </p>
          <p className="text-sm text-gray-200">📧 support@interviewvault.dev</p>
          <div className="mt-4 flex space-x-4">
            {/* Replace these with actual icons if needed */}
            <a href="#" className="hover:text-pink-400">LinkedIn</a>
            <a href="#" className="hover:text-pink-400">GitHub</a>
            <a href="#" className="hover:text-pink-400">Twitter</a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-10 border-t border-purple-700 pt-6 text-sm text-center text-gray-400">
        © {new Date().getFullYear()} InterviewVault. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
