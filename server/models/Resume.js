const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema(
  {
    filename: { type: String, required: true },
    ats_score: { type: Number, required: true },
    skills_detected: [{ type: String }],
    recommended_skills: [{ type: String }],
    improvement_suggestions: [{ type: String }],
    job_matches: [
      {
        title: String,
        company: String,
        match_score: Number,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Resume", resumeSchema);
