
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import.meta.env.VITE_API_URL

const AddExperience = () => {
  const navigate = useNavigate();
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [rounds, setRounds] = useState([{ roundName: "", description: "" }]);
  const [questions, setQuestions] = useState([
    { questionText: "", type: "DSA", difficulty: "Easy" },
  ]);
  const [advice, setAdvice] = useState("");
  const [description, setDescription] = useState("");


  const handleAddRound = () => {
    setRounds([...rounds, { roundName: "", description: "" }]);
  };

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      { questionText: "", type: "DSA", difficulty: "Easy" },
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const experienceData = {
      company,
      role,
      location,
      date,
       description,
      rounds,
      questions,
      advice,
    };

    try {
      const token = localStorage.getItem("token");
      await axios.post(`${import.meta.env.VITE_API_URL}/api/experience`, experienceData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Experience submitted successfully!");
      navigate("/explore");
    } catch (err) {
      toast.error(err.response?.data?.message || "Error submitting experience");
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-center text-indigo-900 mb-6">
        Add Interview Experience
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-8 bg-white p-6 shadow-lg rounded-lg"
      >
        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            type="text"
            placeholder="Company Name *"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            required
            className="input"
          />
          <input
            type="text"
            placeholder="Role *"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
            className="input"
          />
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="input"
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="input"
          />
        </div>

        {/* Rounds Section */}
        <div>
          <h2 className="text-xl font-semibold text-indigo-800 mb-2">
            Rounds
          </h2>
          {rounds.map((round, index) => (
            <div key={index} className="mb-4 space-y-2">
              <input
                type="text"
                placeholder={`Round ${index + 1} Name`}
                value={round.roundName}
                onChange={(e) =>
                  setRounds(
                    rounds.map((r, i) =>
                      i === index ? { ...r, roundName: e.target.value } : r
                    )
                  )
                }
                className="input"
              />
              <textarea
                placeholder="Description"
                value={round.description}
                onChange={(e) =>
                  setRounds(
                    rounds.map((r, i) =>
                      i === index ? { ...r, description: e.target.value } : r
                    )
                  )
                }
                className="input h-24"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddRound}
            className="btn-secondary"
          >
            + Add Round
          </button>
        </div>

        {/* Questions Section */}
        <div>
          <h2 className="text-xl font-semibold text-indigo-800 mb-2">
            Questions Asked
          </h2>
          {questions.map((q, index) => (
            <div key={index} className="mb-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <textarea
                placeholder="Question"
                value={q.questionText}
                onChange={(e) =>
                  setQuestions(
                    questions.map((item, i) =>
                      i === index
                        ? { ...item, questionText: e.target.value }
                        : item
                    )
                  )
                }
                className="input md:col-span-2 h-20"
              />
              <select
                value={q.type}
                onChange={(e) =>
                  setQuestions(
                    questions.map((item, i) =>
                      i === index ? { ...item, type: e.target.value } : item
                    )
                  )
                }
                className="input"
              >
                <option>DSA</option>
                <option>HR</option>
                <option>System Design</option>
                <option>Behavioral</option>
              </select>
              <select
                value={q.difficulty}
                onChange={(e) =>
                  setQuestions(
                    questions.map((item, i) =>
                      i === index
                        ? { ...item, difficulty: e.target.value }
                        : item
                    )
                  )
                }
                className="input"
              >
                <option>Easy</option>
                <option>Medium</option>
                <option>Hard</option>
              </select>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddQuestion}
            className="btn-secondary"
          >
            + Add Question
          </button>
        </div>
        <div>
  <h2 className="text-xl font-semibold text-indigo-800 mb-2">
    Experience Summary / Description *
  </h2>
  <textarea
    required
    placeholder="Describe the overall experience..."
    value={description}
    onChange={(e) => setDescription(e.target.value)}
    className="input h-24"
  />
</div>


        {/* Submit */}
        <button type="submit" className="btn-primary w-full">
          Submit Experience
        </button>
      </form>
    </div>
  );
};

export default AddExperience;
