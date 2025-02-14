import React, { useState } from "react";
import Link from "next/link";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Logging in with:", { email, password });
  };

  return (
    <div className="bg-[#808977] flex items-center justify-center min-h-screen">
      {/* Login Box */}
      <div className="bg-[#e4dbcf] p-16 rounded-lg shadow-lg w-[95%] max-w-4xl border border-[#554f42]">
        <h1 className="text-center text-3xl font-bold mb-6 text-[#2d2a26] font-serif">
          Welcome to Volunteering!
        </h1>

        <form onSubmit={handleLogin} className="flex flex-col">
          {/* Email Field */}
          <label className="text-[#2d2a26] font-semibold mb-2 text-lg">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border border-[#554f42] w-full p-4 text-lg rounded-md bg-[#f9f6f1] focus:outline-none focus:ring-2 focus:ring-[#554f42]"
          />

          {/* Password Field */}
          <label className="text-[#2d2a26] font-semibold mt-4 mb-2 text-lg">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border border-[#554f42] w-full p-4 text-lg rounded-md bg-[#f9f6f1] focus:outline-none focus:ring-2 focus:ring-[#554f42]"
          />

          {/* Login Button */}
          <button
            type="submit"
            className="bg-[#3d3f32] text-white w-full py-4 text-lg rounded-md mt-6 font-semibold shadow-md hover:bg-[#2d2f26] transition"
          >
            Login
          </button>
        </form>

        {/* Sign up Link */}
        <p className="text-center mt-6 text-lg text-[#2d2a26]">
          Don’t have an account?
          <br />
          <Link href="/signup" className="text-[#3d3f32] font-bold hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;