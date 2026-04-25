const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const verifyCandidate = async (req, res) => {
  try {
    const { name, github } = req.body;

    const prompt = `
    Analyze this candidate:

    Name: ${name}
    GitHub: ${github}

    Give:
    - Trust score out of 100
    - Strengths
    - Weaknesses
    - Red flags
    - Final verdict
    `;

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a hiring assistant." },
        { role: "user", content: prompt },
      ],
    });

    const result = response.choices[0].message.content;

    res.json({ result });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error verifying candidate" });
  }
};

module.exports = { verifyCandidate };