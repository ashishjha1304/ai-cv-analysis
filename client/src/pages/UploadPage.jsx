import UploadCard from '../components/UploadCard';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; 

function UploadPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 p-6">
       <div className="max-w-3xl mx-auto pt-12">
       <button 
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-8">
          <FaArrowLeft className="w-4 h-4 mr-2" />
          Back
        </button>
      <div className='text-center mb-8'>
      <h1 className='text-4xl mb-3'>Upload Your Resume</h1>
      <p className='text-muted-foreground'>Upload your resume in PDF format for AI-powered analysis</p>
      </div>  
        <UploadCard />
      <div className='mt-8 space-y-3'>
        <p className='text-sm text-muted-foreground text-center'>What we'll analyze:</p>
        <div className="grid md:grid-cols-3 gap-4 text-center">
            <div className="text-sm">
                <div className='text-foreground'>ATS Score</div>
                <div className='text-muted-foreground text-xs'>Compatibility rating</div>
            </div>
            <div className="text-sm">
                <div className='text-foreground'>Skills Detection</div>
                <div className='text-muted-foreground text-xs'>Identify your strengths</div>
            </div>
            <div className="text-sm">
                <div className='text-foreground'>Job Matching</div>
                <div className='text-muted-foreground text-xs'>Find best opportunities</div>
            </div>
        </div>
      </div>
      </div>
    </div>
  );
}

export default UploadPage;