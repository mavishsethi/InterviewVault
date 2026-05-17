
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import.meta.env.VITE_API_URL

const ExperienceDetail = () => {
  const { id } = useParams();
  const [experience, setExperience] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState("");

  useEffect(() => {
    fetchExperience();
  }, [id]);

  const fetchExperience = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/experience/${id}`);
      setExperience(res.data);
    } catch (err) {
      console.error("Error fetching experience:", err);
      toast.error("Failed to fetch experience.");
    } finally {
      setLoading(false);
    }
  };

  const handleCommentSubmit = async () => {
    if (!comment.trim()) return;
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/experience/${id}/comment`, {
        user: "Anonymous", // Replace with logged-in user's name if available
        text: comment,
      });
      toast.success("Comment added!");
      setComment("");
      fetchExperience(); // refresh experience with new comment
    } catch (err) {
      toast.error("Failed to post comment.");
    }
  };

  const handleLike = async () => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/experience/${id}/like`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    // Update local like count
   setExperience((prev) => ({
      ...prev,
      likes: new Array(res.data.likes).fill("liked"), // this just fakes an array to match length
    }));
  } catch (err) {
    console.error("Error liking experience:", err);
  }
};

if (loading) {
  return <p className="text-center py-20">Loading experience...</p>;
}

if (!experience) {
  return <p className="text-center py-20 text-red-600">Experience not found.</p>;
}

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl p-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-purple-800">
            {experience.company} – {experience.role}
          </h1>
          <p className="text-gray-600 text-xl mt-1">
            {experience.location} |{" "}
            {new Date(experience.date).toLocaleDateString("en-IN", {
              month: "short",
              year: "numeric",
            })}
          </p>
        </div>

        {/* Description */}
        <div className="mb-6">
          <h2 className="text-3xl font-semibold text-indigo-700 mb-2">Experience Summary</h2>
          <p className="text-gray-700 text-xl">{experience.description}</p>
        </div>

        {/* Rounds */}
        {experience.rounds?.length > 0 && (
          <div className="mb-8">
            <h2 className="text-4xl font-semibold text-pink-600 mb-3">Interview Rounds</h2>
            <ul className="space-y-5">
              {experience.rounds.map((round, index) => (
                <li key={index}>
                  <h3 className="font-bold text-purple-700 text-2xl">{round.roundName}</h3>
                  <p className="text-gray-700 text-xl">{round.description}</p>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Questions */}
        {experience.questions?.length > 0 && (
          <div className="mb-8">
            <h2 className="text-4xl font-semibold text-pink-600 mb-3">Questions Asked</h2>
            <ul className="space-y-4">
              {experience.questions.map((q, index) => (
                <li
                  key={index}
                  className="p-4 bg-gray-100 rounded-lg border-l-4 border-purple-600"
                >
                  <p className="text-gray-800">
                    <span className="font-bold text-purple-700">{q.type}:</span>{" "}
                    {q.questionText}
                  </p>
                  <p className="text-sm text-gray-500">Difficulty: {q.difficulty}</p>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Likes */}
        <div className="mb-8 flex items-center gap-3">
          <p className="text-gray-600">❤️ {experience.likes?.length || 0} likes</p>

          <button
            onClick={handleLike}
            className="text-sm bg-pink-100 hover:bg-pink-200 text-pink-700 px-3 py-1 rounded"
          >
            + Like
          </button>
        </div>

        {/* Comments */}
        <div>
          <h2 className="text-xl font-semibold text-pink-600 mb-3">Comments</h2>
          <ul className="space-y-3 mb-4">
            {experience.comments?.map((c, i) => (
              <li key={i} className="bg-gray-100 p-3 rounded-md">
                <span className="font-bold">{c.user}</span>: {c.text}
              </li>
            ))}
          </ul>

          <textarea
            rows="3"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full p-3 border rounded-md focus:ring-purple-500 focus:outline-none"
            placeholder="Add your comment..."
          ></textarea>
          <button
            className="mt-3 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
            onClick={handleCommentSubmit}
          >
            Post Comment
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExperienceDetail;
