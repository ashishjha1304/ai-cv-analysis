import { FaBriefcase } from "react-icons/fa";

function RecruiterCard({onClick}) {
    return (
        <div className='p-8 cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 hover:border-blue-200 bg-white/80 backdrop-blur-sm group rounded-2xl'>
            <div className="flex flex-col items-center text-center space-y-4" onClick={onClick}>
                <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 text-white group-hover:from-purple-600 group-hover:to-purple-700 transition-all duration-300">
                    <FaBriefcase className="w-12 h-12" />
                </div>
                <div>
                    <h2 className="text-2xl mb-2">Recruiter</h2>
                    <p className="text-muted-foreground">Verify candidate profiles and get comprehensive trust scores with AI analysis</p>
                </div>
            </div>
        </div>
    )
}

export default RecruiterCard;