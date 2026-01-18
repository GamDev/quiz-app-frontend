import { useNavigate } from "react-router-dom";
import { useState } from "react";
import type { LoginRequest } from "../../Models/LoginRequest";
import AuthService from "../../Services/AuthService";

function SignIn() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  const handleSignIn = async () => {
    setError("");
   
  
    if (!email || !emailRegex.test(email)) {
      setError(
        !email ? "Email is required." : "Please enter a valid email address."
      );
      return;
    }

    if (!password || password.length < 6) {
      setError(
        !password
          ? "Password is required."
          : "Password must be at least 6 characters."
      );
      
      return;
    }
     setLoading(true);
    const loginRequest: LoginRequest = { email, password };
    try {
      const authResponse = await AuthService.Login(loginRequest);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };
  const handleSignup = () => {
    navigate("/signup");
  };

  return (
    <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-lg p-10">
      <h1 className="text-4xl font-bold text-center mb-2">Sign In</h1>
      <p className="text-gray-600 text-center mb-8">
        Welcome back! Please login to your account
      </p>

      <div className="space-y-5">
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          onClick={handleSignIn}
          disabled={loading}
          className="w-full py-3 text-lg font-semibold bg-purple-600 text-white rounded-lg hover:bg-purple-500 transition"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </div>

      <p className="mt-6 text-center text-gray-600">
        Don’t have an account?{" "}
        <span
          onClick={handleSignup}
          className="text-purple-600 hover:underline cursor-pointer font-medium"
        >
          Sign Up
        </span>
      </p>
    </div>
  );
}

export default SignIn;
