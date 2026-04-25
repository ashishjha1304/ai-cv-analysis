import { FaUserCircle } from "react-icons/fa";

function ResumeCard({onClick}){
    return(
        <div className='p-8 cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 hover:border-blue-200 bg-white/80 backdrop-blur-sm group rounded-2xl'>
            <div className="flex flex-col items-center text-center space-y-4" onClick={onClick}>
               <div className='p-4 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 text-white group-hover:from-blue-600 group-hover:to-blue-700 transition-all duration-300'>
                <FaUserCircle className='w-12 h-12'/>
               </div>
               <div>
                   <h2 className="text-2xl mb-2">Job Seeker</h2>
                   <p className="text-muted-foreground">Upload your resume and get AI-powered insights, skill gap analysis, and job matching</p>
                </div>
            </div>
        </div>
    );
}

export default ResumeCard;