function ProcessingPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
        <h2 className="mt-6 text-xl">Analyzing your resume...</h2>
        <p className="text-gray-500">This may take a few seconds</p>
      </div>
    </div>
  );
}

export default ProcessingPage;