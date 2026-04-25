import { useLocation } from "react-router-dom";

function RecruiterResultPage() {
  const location = useLocation();
  const data = location.state;

  return (
    <div className="p-10">
      <h1 className="text-3xl mb-6">Verification Result</h1>

      <pre className="bg-gray-100 p-4 rounded">
        {data?.result}
      </pre>
    </div>
  );
}

export default RecruiterResultPage;