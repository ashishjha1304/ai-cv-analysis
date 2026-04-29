import { FaUpload, FaCheckCircle } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

function UploadCard() {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type === "application/pdf") {
        setSelectedFile(file);
        setError("");
      } else {
        setError("Please upload a PDF file.");
      }
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type === "application/pdf") {
        setSelectedFile(file);
        setError("");
      } else {
        setError("Please upload a PDF file.");
      }
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("resume", selectedFile);

    try {
      const response = await fetch(`${API_URL}/api/upload-resume`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        navigate("/job-seeker/result", { state: data });
      } else {
        setError(data.error || "Something went wrong.");
      }
    } catch (err) {
      setError("Server connection failed. Is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <div
        className={`relative group p-8 rounded-3xl border-2 border-dashed transition-all duration-300
        ${dragActive 
          ? "border-violet-500 bg-violet-500/5" 
          : "dark:border-slate-800 border-slate-200 dark:bg-slate-900/50 bg-white"}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 mb-4 rounded-2xl bg-gradient-to-br from-violet-500 to-blue-500 
            flex items-center justify-center text-white shadow-lg shadow-violet-500/20">
            <FaUpload className="w-8 h-8" />
          </div>
          
          <h3 className="text-xl font-bold dark:text-white text-slate-900 mb-2">
            {selectedFile ? selectedFile.name : "Upload your Resume"}
          </h3>
          <p className="dark:text-slate-400 text-slate-500 mb-6 max-w-xs">
            Drag and drop your PDF here, or click to browse files from your computer.
          </p>

          <input
            type="file"
            className="hidden"
            id="file-upload"
            accept=".pdf"
            onChange={handleChange}
          />
          
          <label
            htmlFor="file-upload"
            className="px-8 py-3 rounded-xl bg-violet-500 hover:bg-violet-600 text-white 
              font-semibold transition-all cursor-pointer shadow-lg shadow-violet-500/25 active:scale-95"
          >
            {selectedFile ? "Change File" : "Choose File"}
          </label>
        </div>
      </div>

      {error && (
        <div className="mt-4 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-medium">
          {error}
        </div>
      )}

      {selectedFile && !loading && (
        <button
          onClick={handleUpload}
          className="w-full mt-6 py-4 rounded-2xl bg-gradient-to-r from-violet-600 to-blue-600 
            text-white font-bold text-lg shadow-xl shadow-violet-600/20 hover:scale-[1.02] transition-all"
        >
          Analyze Resume
        </button>
      )}

      {loading && (
        <div className="w-full mt-6 p-4 rounded-2xl glass flex items-center justify-center gap-3">
          <div className="w-5 h-5 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
          <span className="font-semibold dark:text-white text-slate-900">Processing with AI...</span>
        </div>
      )}
    </div>
  );
}

export default UploadCard;