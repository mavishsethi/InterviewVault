
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Explore = () => {
const [experiences, setExperiences] = useState([]);
const [searchQuery, setSearchQuery] = useState("");
const [selectedTag, setSelectedTag] = useState("");
useEffect(() => {
  const fetchExperiences = async () => {
    const res = await axios.get("http://localhost:5000/api/experience");
    setExperiences(res.data);
    setFilteredExperiences(res.data);
  };
  fetchExperiences();
}, []);

const [filteredExperiences, setFilteredExperiences] = useState([]);
const handleTagClick = (tag) => {
  setSelectedTag(tag);
  if (tag === "") {
    setFilteredExperiences(experiences); // no filter
  } else {
    const filtered = experiences.filter((exp) =>
      exp.tags.includes(tag)
    );
    setFilteredExperiences(filtered);
  }
};


  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/experience");
        setExperiences(res.data);
      } catch (err) {
        console.error("Error fetching experiences", err);
      }
    };

    fetchExperiences();
  }, []);

  // Optional: Filter by search
  const filtered = experiences.filter((exp) =>
    [exp.company, exp.role, exp.description]
      .join(" ")
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10 md:px-16">
      {/* Heading */}
      <h1 className="text-4xl font-bold text-center text-indigo-900 mb-6">
        🔍 Explore Interview Experiences
      </h1>

      {/* Search + Filters */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
        {/* Search */}
        <input
          type="text"
          placeholder="Search by company, role, or keyword..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full md:w-1/2 px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
        />

        {/* (Static) Filters UI - functional later */}
        <div className="flex flex-wrap gap-3">
  {["DSA", "HR", "System Design", "Behavioral"].map((tag, i) => (
    <button
      key={i}
      onClick={() => handleTagClick(tag)}
      className={`px-5 py-2 rounded-full transition ${
        selectedTag === tag
          ? "bg-purple-600 text-white"
          : "bg-purple-100 text-purple-700 hover:bg-purple-200"
      }`}
    >
      {tag}
    </button>
  ))}
  <button
    onClick={() => handleTagClick("")}
    className={`px-5 py-2 rounded-full transition ${
      selectedTag === ""
        ? "bg-gray-600 text-white"
        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
    }`}
  >
    Clear
  </button>
</div>

      </div>

      {/* Experience Cards */}
      <div className="grid md:grid-cols-1 gap-8">
        {filtered.length > 0 ? (
          filtered.map((exp) => (
            <div
              key={exp._id}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition"
            >
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-4xl font-bold text-indigo-800">{exp.company}</h2>
                <span className="text-xl text-gray-500">
                  {new Date(exp.date).toLocaleDateString("en-IN", {
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>

              <p className="text-gray-600 font-medium mb-1 text-xl">{exp.role}</p>
              <p className="text-gray-700 italic mb-3 text-xl">
                {exp.description.slice(0, 100)}...
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-3">
                {exp.tags?.map((tag, i) => (
                  <span
                    key={i}
                    className="bg-gray-200 text-sm text-gray-700 px-2 py-1 rounded"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Stats + CTA */}
              <div className="flex justify-between items-center">
                <div className="flex gap-4 text-sm text-gray-600">
                  <span>❤️ {exp.likes?.length || 0} likes</span>
                  <span>💬 {exp.comments?.length || 0} Comments</span>
                </div>
                <Link to={`/experience/${exp._id}`}>
                  <button className="mt-4 text-purple-600 font-semibold hover:underline">
                    Read More →
                  </button>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No experiences found.</p>
        )}
      </div>
    </div>
  );
};

export default Explore;
