import { useLocation } from "react-router-dom";
import { FaArrowLeft, FaBriefcase, FaChartLine, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";

function ResultPage() {
  const navigate = useNavigate();
  const { state } = useLocation();


  // ✅ Handle missing state OR error returned from server
  if (!state || state.error) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl text-red-500 mb-2">Analysis Failed</h1>
        <p className="text-gray-600">{state?.error || "No data available. Please upload a resume first."}</p>
        <button onClick={() => navigate("/job-seeker/upload")} className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg">
          Try Again
        </button>
      </div>
    </div>
  );
}
console.log(state);

  return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 p-6">
      <div className="max-w-7xl mx-auto pt-6 pb-12">
      <button 
        variant="ghost"
        onClick={() => navigate("/")}
        className="mb-8">
        <FaArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
      </button>
      <div className="mb-8">
        <h1 className="text-4xl mb-2">Resume Analysis Result</h1>
        <p className="text-muted-foreground">AI-powered insights to help you improve your resume</p>
      </div>
      <div className="bg-white/80 backdrop-blur-sm p-8 rounded-lg shadow-md">
      <div className="flex items-start justify-between mb-6">
        <div>
        <h2 className="text-xl mb-2">ATS Compatibility Score</h2>
        <p className="text-sm text-muted-foreground">How well your resume passes Applicant Tracking Systems</p>
        </div>
        <div className="text-right">
          <div className="text-5xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {state.ats_score}%
          </div>
          <div className="text-sm text-muted-foreground">out of 100</div>
        </div>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3 mt-4">
        <div
          className="bg-gradient-to-r from-blue-600 to-purple-600 h-3 rounded-full"
          style={{ width: `${state.ats_score}%` }}
        />
      </div>
        <p className="mt-4 text-sm text-muted-foreground">
          {state.ats_score >= 80
            ? "Great job! Your resume is highly compatible with ATS."
            : state.ats_score >= 50
            ? "Not bad, but there's room for improvement to pass ATS."
            : "Your resume may struggle to pass ATS. Consider optimizing it."}
        </p>
    </div>
    <div className="grid md:grid-cols-2 gap-6 mb-6">
      <div className="p-6 bg-white/80 backdrop-blur-sm">
        <div className="flex items-center mb-4">
          <FaCheckCircle className="w-5 h-5 text-green-600 mr-2" />
          <h2 className="text-xl">Skills Detected</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {state.skills_detected?.map((skill, index) => (
            <div key={index} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
              {skill}
            </div>
          ))}
        </div>
      </div>
      <div className="p-6 bg-white/80 backdrop-blur-sm">
        <div className="flex items-center mb-4">
          <FaExclamationTriangle className="w-5 h-5 text-orange-600 mr-2" />
          <h2 className="text-xl">Recommended Skills to Add</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {state.recommended_skills?.map((skill, index) => (
            <div key={index} className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">
              {skill}
            </div>
          ))}
        </div>
      </div>
    </div>
    <div className="p-6 mb-6 bg-white/80 backdrop-blur-sm">
      <div className="flex items-center mb-4">
        <FaChartLine className="w-5 h-5 text-blue-600 mr-2" />
        <h2 className="text-xl">Improvement Suggestions</h2>
      </div>
      <ul className="space-y-3">
        {state.improvement_suggestions?.map((suggestion, index) => (
          <li key={index} className="flex items-start">
            <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0">
              {index + 1}
            </div>
            <span className="text-foreground">{suggestion}</span>
          </li>
        ))}
      </ul>
    </div>
    <div className="p-6 bg-white/80 backdrop-blur-sm">
      <div className="flex items-center mb-6">
        <FaBriefcase className="w-5 h-5 text-purple-600 mr-2" />
        <h2 className="text-xl">Top Job Matches</h2>
      </div>
      <div className="grid gap-4">
        {state.job_matches?.map((job, index) => (
          <div key={index} className="flex items-center justify-between p-4 rounded-xl border border-border hover:border-purple-200 hover:bg-purple-50/50 transition-all cursor-pointer">
            <div>
            <h3 className="mb-1">{job.title}</h3>
            <p className="text-sm text-muted-foreground">{job.company}</p>
            </div>
            <div className="text-right">
              <div className="text-2xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                {job.match_score}%
              </div>
              <div className="text-xs text-muted-foreground">match</div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
    </div>
  );
}

export default ResultPage;