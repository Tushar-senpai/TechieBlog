function Error404() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1c1b5a] via-[#0f122c] to-[#0f0d1f] text-white relative overflow-hidden">
      {/* Particles */}
      <div className="absolute inset-0">
        {[...Array(12)].map((_, i) => (
          <span
            key={i}
            className="absolute w-1.5 h-1.5 bg-white/60 rounded-full blur-sm"
            style={{
              top: `${Math.random() * 90 + 5}%`,
              left: `${Math.random() * 90 + 5}%`,
              filter: `blur(${Math.floor(Math.random() * 4) + 3}px)`,
            }}
          ></span>
        ))}
      </div>

      {/* Main Content */}
      <main className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center font-cursive">
        <h1 className="text-4xl font-normal text-shadow-lg shadow-[#c3d168a2]">
          Page Not Found!
        </h1>
        <div className="mt-8">
          <span className="text-7xl text-shadow-lg shadow-[#c3d168a2]">4</span>
          <span className="inline-block relative w-24 h-24 mx-4 bg-gradient-to-b from-[#f9ffd2] to-[#ecff70] rounded-full shadow-lg shadow-[#e7f1a3a2]">
            <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-16 border-2 border-white rounded-full border-t-0 border-b-4"></span>
            <span className="absolute top-1/2 left-1/2 w-1 h-1 bg-[#124] rounded-full transform -translate-x-1/2 -translate-y-1/2 origin-[40px_0] animate-spin"></span>
          </span>
          <span className="text-7xl text-shadow-lg shadow-[#c3d168a2]">4</span>
        </div>
        <p className="mt-12 text-lg text-shadow-lg shadow-[#c3d168a2]">
          We are unable to find the page
          <br />
          you're looking for.
        </p>
        <div className="mt-8">
          <button className="px-6 py-2 bg-[#118d2c] text-white rounded-full shadow-lg shadow-[#e1f17859] hover:bg-[#0f7a25] transition-colors">
            Back to Home Page
          </button>
        </div>
      </main>
    </div>
  );
};

export default Error404;
