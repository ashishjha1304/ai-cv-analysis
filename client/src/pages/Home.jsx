import React from 'react';
import {useNavigate} from 'react-router-dom';
import ResumeCard from '../components/ResumeCard';
import RecruiterCard from '../components/RecruiterCard';

function Home(){
    const navigate = useNavigate();
    const goToUpload = () => {
      navigate("/job-seeker/upload");   
   };

  const goToVerify = () => {
  navigate("/recruiter/verify");   
};

    return(
        <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 flex items-center justify-center p-6'>
            <div className='w-full max-w-4xl'>
            <div className='text-center mb-12'>
            <h1 className='text-5xl tracking-tight mb-4 bg-gradient-to-r from-slate-900 via-blue-900 to-purple-900 bg-clip-text text-transparent'>AI Career Intelligence Platform</h1>
            <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>Analyze your resume, identify skill gaps, and verify candidates using AI</p>
            </div>
            <div className='grid md:grid-cols-2 gap-6'>
            <ResumeCard onClick={goToUpload} />
            <RecruiterCard onClick={goToVerify} />
            </div>
            </div>
        </div>
    )
}

export default Home;
