# 🤖 AI CV Analysis & Resume Intelligence Platform

An advanced, AI-powered resume analysis tool that helps job seekers optimize their resumes for ATS (Applicant Tracking Systems) and provides recruiters with deep insights into candidate profiles. Built with the **MERN Stack** and powered by **Groq AI (Llama 3.3)** for lightning-fast analysis.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/Frontend-React.js-blue)
![Node](https://img.shields.io/badge/Backend-Node.js-green)
![AI](https://img.shields.io/badge/AI-Groq%20Llama%203.3-orange)

---

## 🌟 Key Features

### 📄 For Job Seekers
- **ATS Score Analysis**: Get a compatibility score out of 100.
- **Skills Detection**: Automatically extracts technical and soft skills from your PDF.
- **Improvement Suggestions**: AI-driven tips to make your resume stand out.
- **Job Matching**: Recommends job roles based on your experience and skills.

### 🔍 For Recruiters
- **Candidate Verification**: Analyze candidate trust scores.
- **GitHub Activity Analysis**: Evaluate technical contributions.
- **Red Flag Detection**: Identify potential gaps or issues in profiles.

---

## 🛠️ Tech Stack

- **Frontend**: React.js, Tailwind CSS, Lucide Icons
- **Backend**: Node.js, Express.js
- **Database**: MongoDB Atlas
- **AI Engine**: Groq SDK (Llama 3.3 70B Model)
- **PDF Parsing**: pdf-parse

---

## 🚀 Getting Started

### Prerequisites
- Node.js installed
- A Groq API Key (Free from [console.groq.com](https://console.groq.com))
- MongoDB Atlas connection string

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ashishjha1304/ai-cv-analysis.git
   cd ai-cv-analysis
   ```

2. **Setup Backend**
   ```bash
   cd server
   npm install
   ```
   Create a `.env` file in the `server` folder:
   ```env
   MONGO_URI=your_mongodb_uri
   PORT=5000
   GROQ_API_KEY=your_groq_api_key
   ```

3. **Setup Frontend**
   ```bash
   cd ../client
   npm install
   npm start
   ```

---

## 📸 Screenshots

| Home Page | Analysis Result |
| :---: | :---: |
| ![Home](https://raw.githubusercontent.com/ashishjha1304/ai-cv-analysis/main/screenshots/home.png) | ![Result](https://raw.githubusercontent.com/ashishjha1304/ai-cv-analysis/main/screenshots/result.png) |

---

## 👤 Author

**Ashish Jha**
- GitHub: [@ashishjha1304](https://github.com/ashishjha1304)
- Email: [ashishjha1304@outlook.com](mailto:ashishjha1304@outlook.com)

---

## 📄 License
This project is licensed under the MIT License.
