import { FaUser } from 'react-icons/fa';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CandidateCard() {
  const navigate = useNavigate();

  const [candidateName, setCandidateName] = useState("");
  const [githubUrl, setGithubUrl] = useState("");

  const handleVerify = async (e) => {
    e.preventDefault(); 

    if (!candidateName || !githubUrl) return;

    // go to loading page
    navigate("/recruiter/processing");

    try {
      const res = await fetch("http://localhost:5000/api/verify-candidate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: candidateName,
          github: githubUrl,
        }),
      });

      const data = await res.json();

      // go to result page
      navigate("/recruiter/result", { state: data });

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-8 bg-white/80 backdrop-blur-sm">
      <form onSubmit={handleVerify} className="space-y-6">

        <div className="space-y-2">
          <label htmlFor="candidate-name" className="flex items-center">
            <FaUser className="w-4 h-4 mr-2" />
            Candidate Name
          </label>

          <input
            type="text"
            id="candidate-name"
            placeholder="Enter candidate's full name"
            value={candidateName}
            onChange={(e) => setCandidateName(e.target.value)}
            className="h-12"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="github-url" className='flex items-center'>GitHub Profile URL</label>

          <input
            id="github-url"
            type="url"
            placeholder="https://github.com/username"
            value={githubUrl}
            onChange={(e) => setGithubUrl(e.target.value)}
            className="h-12"
            required
          />

          <p className="text-sm text-muted-foreground">
            We'll analyze their contributions, activity, and code quality
          </p>
        </div>

        <button
          type="submit"
          className="w-full h-12 text-base bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800"
        >
          Verify Candidate
        </button>

      </form>
    </div>
  );
}

export default CandidateCard;