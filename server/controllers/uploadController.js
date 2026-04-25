const OpenAI = require("openai");
const fs = require("fs");
const pdfParse = require("pdf-parse");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

exports.uploadResume = async (req, res) => {
  try {
    // ✅ check file
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const filePath = req.file.path;

    // ✅ read PDF
    const dataBuffer = fs.readFileSync(filePath);
    let pdfData;

try {
  pdfData = await pdfParse(dataBuffer);
} catch (err) {
  console.log("PDF PARSE ERROR:", err.message);
  return res.status(400).json({
    error: "Unable to read this PDF. Please upload a proper resume file.",
  });
}
    const resumeText = pdfData.text;

    if (!resumeText || resumeText.length < 20) {
      return res.status(400).json({ error: "Invalid resume content" });
    }

    console.log("EXTRACTED TEXT:", resumeText.substring(0, 200));

    // 🔥 AI CALL
    const aiResponse = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are an expert ATS resume analyzer. Always return ONLY valid JSON. No explanation.",
        },
        {
          role: "user",
          content: `
Analyze the following resume and return ONLY JSON.

Format:
{
  "ats_score": number,
  "skills_detected": string[],
  "recommended_skills": string[],
  "improvement_suggestions": string[],
  "job_matches": [
    {
      "title": string,
      "company": string,
      "match_score": number
    }
  ]
}

Resume:
${resumeText}
          `,
        },
      ],
    });

    // ✅ SAFE PARSING (IMPORTANT FIX)
    let raw = aiResponse.choices[0].message.content;

    console.log("RAW AI RESPONSE:", raw);

    const jsonMatch = raw.match(/{[\s\S]*}/);

    if (!jsonMatch) {
      return res.status(500).json({ error: "Invalid AI response format" });
    }

    const result = JSON.parse(jsonMatch[0]);

    console.log("FINAL RESULT:", result);

    res.json(result);

  } catch (err) {
    console.log("ERROR:", err);
    res.status(500).json({ error: "AI processing failed" });
  }
};