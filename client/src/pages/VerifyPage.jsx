import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import CandidateCard from '../components/CandidateCard';

function VerifyPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 p-6">
      <div className="max-w-3xl mx-auto pt-12">
        <button
          onClick={() => navigate("/")}
          className="mb-8">
          <FaArrowLeft className="w-4 h-4 mr-2" />
          Back
        </button>
        <div className="text-center mb-8">
          <h1 className="text-4xl mb-3">Candidate Verification</h1>
          <p className="text-muted-foreground">Enter candidate details for AI-powered verification and trust scoring</p>
        </div>
        <CandidateCard />
        <div className='mt-8 space-y-3'>
        <p className='text-sm text-muted-foreground text-center'>What we'll analyze:</p>
        <div className="grid md:grid-cols-3 gap-4 text-center">
            <div className="text-sm">
                <div className='text-foreground'>Trust Score</div>
                <div className='text-muted-foreground text-xs'>Overall Credibility rating</div>
            </div>
            <div className="text-sm">
                <div className='text-foreground'>GitHub Activity</div>
                <div className='text-muted-foreground text-xs'>Contribution patterns</div>
            </div>
            <div className="text-sm">
                <div className='text-foreground'>Red Flags</div>
                <div className='text-muted-foreground text-xs'>Potential concerns</div>
            </div>
        </div>
      </div>
      </div>
    </div>
  );
}

export default VerifyPage;
