
import { Link } from "react-router-dom";
import { FileText, Search, HeartHandshake, Stars } from "lucide-react";
import interviewImage from "../assets/interview.PNG";

const Home = () => {
  return (
    <div className="bg-gray-50 min-h-screen pt-12 pb-20">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col-reverse lg:flex-row items-center justify-between gap-12">
        {/* Left: Headline & CTA */}
        <div className="flex-1 text-center lg:text-left">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
            Empower Your Prep with <br />
            <span className="text-purple-700">InterviewVault</span>
          </h1>
          <p className="text-gray-600 text-lg md:text-xl mb-10 max-w-xl">
            Share and explore real interview experiences from candidates like you. Learn what to expect and how to prepare better.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-6 justify-center lg:justify-start ">
            <Link
              to="/explore"
              className="bg-purple-700 text-white text-4xl font-semibold px-8 py-4 rounded-lg hover:bg-purple-800 transition shadow-lg"
            >
              🔍 Explore
            </Link>
            <Link
              to="/add"
              className="bg-pink-500 text-white text-4xl font-semibold px-8 py-4 rounded-lg hover:bg-pink-600 transition shadow-lg"
            >
              ✍️ Add Experience
            </Link>
          </div>
        </div>

        {/* Right: Placeholder Image */}
        <div className="flex-1">
         <img
  src={interviewImage}
  alt="Interview"
  className="w-full max-w-md mx-auto"
/>
        </div>
      </div>

      {/* Features Section */}
      <div className="mt-24 max-w-6xl mx-auto px-6 lg:px-0">
        <h2 className="text-5xl font-bold text-center text-gray-800 mb-12">
          🔍 What You Can Do on InterviewVault
        </h2>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 ">
          <FeatureCard
            icon={<FileText size={40} />}
            title="Detailed Logs"
            description="Round-wise interview breakdowns from real users."
          />
          <FeatureCard
            icon={<Search size={40} />}
            title="Smart Filtering"
            description="Search by company, role, difficulty, tags and more."
          />
          <FeatureCard
            icon={<HeartHandshake size={40} />}
            title="Interactive Community"
            description="Comment, ask follow-ups, and help others grow."
          />
          <FeatureCard
            icon={<Stars size={40} />}
            title="Save & Bookmark"
            description="Mark helpful posts and revisit them before interviews."
          />
        </div>
      </div>
    </div>
  );
};

// Reusable Feature Card
const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white rounded-xl p-6 text-left shadow-md border border-gray-100 hover:shadow-purple-300 transition">
    <div className="text-purple-600 mb-3">{icon}</div>
    <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default Home;