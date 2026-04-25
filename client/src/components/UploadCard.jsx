import { FaFileAlt, FaUpload } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function UploadCard() {
    const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
    }
  };

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
      }
    }
  };

const handleUpload = async () => {
  if (!selectedFile) return;

  const formData = new FormData();
  formData.append("resume", selectedFile);

  try {
    navigate("/job-seeker/processing");

    console.log("Sending request...");

    const res = await fetch("http://localhost:5000/api/upload-resume", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    console.log("Data:", data);

    // ✅ Check if server returned an error
    if (data.error) {
      alert("Analysis failed: " + data.error);
      navigate("/job-seeker/upload");
      return;
    }

    navigate("/job-seeker/result", { state: data });

  } catch (error) {
    console.log("Upload error:", error);
    alert("Could not connect to server. Make sure backend is running on port 5000.");
    navigate("/job-seeker/upload");
  }
};

  return (
    <div className="p-8 bg-white/80 backdrop-blur-sm">
      <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${
              dragActive
                ? "border-blue-500 bg-blue-50/50"
                : "border-border hover:border-blue-300"
            }`}
          >
      <input
              type="file"
              accept=".pdf"
              onChange={handleFileSelect}
              className="hidden"
              id="file-upload"
            />
      {selectedFile ? (
              <div className="flex flex-col items-center space-y-4">
                <div className="p-4 rounded-full bg-green-100">
                  <FaFileAlt className="w-12 h-12 text-green-600" />
                </div>
                <div>
                  <p className="text-lg mb-1">{selectedFile.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                <label
                  htmlFor="file-upload"
                  className="text-sm text-blue-600 hover:text-blue-700 cursor-pointer underline"
                >
                  Choose a different file
                </label>
              </div>
            ) : (
              <div className="flex flex-col items-center space-y-4">
                <div className="p-4 rounded-full bg-blue-100">
                  <FaUpload className="w-12 h-12 text-blue-600" />
                </div>
                <div>
                  <label
                    htmlFor="file-upload"
                    className="text-lg cursor-pointer text-blue-600 hover:text-blue-700"
                  >
                    Click to upload
                  </label>
                  <span className="text-lg text-muted-foreground"> or drag and drop</span>
                </div>
                <p className="text-sm text-muted-foreground">PDF files only (Max 10MB)</p>
              </div>
            )}
          </div>

          <div className="mt-8">
            <button
              onClick={handleUpload}
              disabled={!selectedFile}
              className="w-full h-12 text-base bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            >
              Analyze Resume
            </button>
          </div>
    </div>
  );
}

export default UploadCard;