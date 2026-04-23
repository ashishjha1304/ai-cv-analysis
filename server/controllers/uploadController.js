const uploadResume = async (req, res) => {
  try {
    console.log("File received:", req.file);

    // Fake AI delay (2 sec)
    setTimeout(() => {
      res.json({
        score: 78,
        skills: ["JavaScript", "React", "Node.js", "Python", "SQL"],
        missingSkills: ["Kubernetes", "GraphQL", "System Design", "CI/CD"],
        suggestions: [
          "Add quantifiable achievements",
          "Improve ATS keywords",
          "Add professional summary",
          "Expand technical skills",
          "Include GitHub links"
        ],
        jobs: [
          { role: "Senior Frontend Developer", match: 92 },
          { role: "Full Stack Engineer", match: 85 }
        ]
      });
    }, 2000);

  } catch (err) {
    res.status(500).json({ message: "Error uploading file" });
  }
};

module.exports = { uploadResume };