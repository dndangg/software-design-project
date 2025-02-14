import React from "react";

const Home: React.FC = () => {
  return (
    <div className="bg-[#808977] flex items-center justify-center min-h-screen">
      {/* Main Content */}
      <div className="bg-[#f3e6d5] p-16 rounded-lg shadow-lg w-[95%] max-w-4xl border border-[#554f42]">
        <h1 className="text-center text-3xl font-bold text-[#2d2a26] font-serif">
          Welcome to the Volunteering Site!
        </h1>
      </div>
    </div>
  );
};

export default Home;