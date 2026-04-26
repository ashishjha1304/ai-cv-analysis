import UploadCard from '../components/UploadCard';
import { useNavigate } from 'react-router-dom';
import { FaFilePdf, FaBolt, FaShieldAlt, FaBriefcase } from 'react-icons/fa';

const highlights = [
  { icon: FaBolt,       label: 'ATS Score',      desc: 'Compatibility rating',      color: 'text-violet-500', bg: 'dark:bg-violet-500/10 bg-violet-50' },
  { icon: FaShieldAlt,  label: 'Skills Analysis', desc: 'Identify your strengths',   color: 'text-blue-500',   bg: 'dark:bg-blue-500/10 bg-blue-50' },
  { icon: FaBriefcase,  label: 'Job Matching',    desc: 'Find best opportunities',   color: 'text-emerald-500',bg: 'dark:bg-emerald-500/10 bg-emerald-50' },
];

function UploadPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen dark:bg-[#080818] bg-slate-50 transition-colors duration-300 px-6 pt-28 pb-16">

      {/* Ambient */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="orb orb-purple w-96 h-96 top-10 -left-32" />
        <div className="orb orb-blue w-72 h-72 bottom-20 right-10" style={{ animationDelay: '3s' }} />
      </div>

      <div className="relative max-w-2xl mx-auto">

        {/* Badge */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium
            dark:bg-violet-500/10 dark:border-violet-500/30 dark:text-violet-300
            bg-violet-50 border border-violet-200 text-violet-700">
            <FaFilePdf className="w-3 h-3" />
            Job Seeker · Resume Analysis
          </div>
        </div>

        {/* Heading */}
        <div className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold dark:text-white text-slate-900 mb-4 leading-tight">
            Upload Your
            <span className="gradient-text"> Resume</span>
          </h1>
          <p className="dark:text-slate-400 text-slate-600 text-lg">
            Get AI-powered ATS scoring, skill gap analysis, and job matches in seconds.
          </p>
        </div>

        {/* Upload Card */}
        <UploadCard />

        {/* What we analyze */}
        <div className="mt-10">
          <p className="text-center text-sm font-medium dark:text-slate-500 text-slate-400 mb-5 uppercase tracking-widest">
            What we'll analyze
          </p>
          <div className="grid grid-cols-3 gap-4">
            {highlights.map(({ icon: Icon, label, desc, color, bg }) => (
              <div key={label} className={`glass rounded-2xl p-4 text-center ${bg} border border-transparent`}>
                <div className={`${color} flex justify-center mb-2`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className={`text-sm font-semibold ${color}`}>{label}</div>
                <div className="text-xs dark:text-slate-500 text-slate-500 mt-1">{desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Privacy note */}
        <p className="text-center text-xs dark:text-slate-600 text-slate-400 mt-8">
          🔒 Your resume is analyzed and immediately deleted. We never store your data.
        </p>
      </div>
    </div>
  );
}

export default UploadPage;