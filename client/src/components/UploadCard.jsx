import { FaUpload, FaCheckCircle } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

function UploadCard() {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [fileError, setFileError] = useState("");

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    setFileError("");
    if (file && file.type === "application/pdf") {
      if (file.size > 10 * 1024 * 1024) { setFileError("File too large. Maximum 10MB."); return; }
      setSelectedFile(file);
    } else if (file) {
      setFileError("Only PDF files are accepted.");
    }
  };

  const handleDrag = (e) => {
    e.preventDefault(); e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault(); e.stopPropagation();
    setDragActive(false); setFileError("");
    if (e.dataTransfer.files?.[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type === "application/pdf") {
        if (file.size > 10 * 1024 * 1024) { setFileError("File too large. Maximum 10MB."); return; }
        setSelectedFile(file);
      } else { setFileError("Only PDF files are accepted."); }
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    const formData = new FormData();
    formData.append("resume", selectedFile);
    navigate("/job-seeker/processing");
    try {
      const res = await fetch(`${API_URL}/api/upload-resume`, { method: "POST", body: formData });
      const data = await res.json();
      if (data.error) { alert("Analysis failed: " + data.error); navigate("/job-seeker/upload"); return; }
      navigate("/job-seeker/result", { state: data });
    } catch (error) {
      alert("Could not connect to server. Make sure backend is running.");
      navigate("/job-seeker/upload");
    }
  };

  return (
    <div className="glass rounded-3xl p-6 sm:p-8 dark:border-white/10 border border-white/60 shadow-xl">
      {/* Dropzone */}
      <div
        onDragEnter={handleDrag} onDragLeave={handleDrag}
        onDragOver={handleDrag} onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-2xl p-10 text-center transition-all duration-300 cursor-pointer
          ${dragActive
            ? 'border-violet-500 dark:bg-violet-500/10 bg-violet-50 scale-[1.01]'
            : selectedFile
              ? 'border-emerald-500 dark:bg-emerald-500/5 bg-emerald-50'
              : 'dark:border-slate-700 border-slate-200 dark:hover:border-violet-500/60 hover:border-violet-300'
          }`}
      >
        <input type="file" accept=".pdf" onChange={handleFileSelect} className="hidden" id="file-upload" />

        {selectedFile ? (
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center">
              <FaCheckCircle className="w-8 h-8 text-emerald-500" />
            </div>
            <div>
              <p className="font-semibold dark:text-white text-slate-800 text-lg">{selectedFile.name}</p>
              <p className="text-sm dark:text-slate-400 text-slate-500 mt-1">
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB · PDF
              </p>
            </div>
            <label htmlFor="file-upload"
              className="text-sm text-violet-600 dark:text-violet-400 hover:underline cursor-pointer font-medium">
              Choose a different file
            </label>
          </div>
        ) : (
          <label htmlFor="file-upload" className="flex flex-col items-center gap-4 cursor-pointer">
            <div className="w-16 h-16 rounded-2xl bg-violet-100 dark:bg-violet-500/20 flex items-center justify-center
              group-hover:scale-110 transition-transform">
              <FaUpload className="w-7 h-7 text-violet-600 dark:text-violet-400" />
            </div>
            <div>
              <p className="text-lg font-semibold dark:text-white text-slate-700">
                <span className="text-violet-600 dark:text-violet-400">Click to upload</span> or drag & drop
              </p>
              <p className="text-sm dark:text-slate-500 text-slate-400 mt-1">PDF files only · Max 10MB</p>
            </div>
          </label>
        )}
      </div>

      {fileError && (
        <p className="mt-3 text-sm text-red-500 text-center font-medium">{fileError}</p>
      )}

      <button
        onClick={handleUpload}
        disabled={!selectedFile}
        className="btn-shine mt-6 w-full h-14 rounded-2xl font-semibold text-base
          bg-gradient-to-r from-violet-600 to-blue-600 text-white
          disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none
          hover:from-violet-500 hover:to-blue-500
          shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50
          transition-all duration-300 hover:-translate-y-0.5"
      >
        {selectedFile ? '⚡ Analyze My Resume' : 'Upload a PDF to continue'}
      </button>
    </div>
  );
}

export default UploadCard;