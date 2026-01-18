import { useState } from "react";
import AuthService from "../../Services/AuthService";
import { useNavigate } from "react-router-dom";
import type { RegisterRequest } from "../../Models/RegisterRequest";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const navigate = useNavigate();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleLogin = () => navigate("/login");

  const handleSignup = async () => {
    setError(null);
    setSuccess(null);

    if (!email || !emailRegex.test(email)) {
      setError(!email ? "Email is required." : "Please enter a valid email address.");
      return;
    }

    if (!password || password.length < 6) {
      setError(!password ? "Password is required." : "Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    try {
      const registerRequest: RegisterRequest = { email, password };
      const authResponse =   await AuthService.Register(registerRequest);
      setSuccess("Account created successfully!");
      setEmail("");
      setPassword("");

      setTimeout(() => navigate("/login"), 1000);
    } catch (err: any) {
      setError(err.response.data.message || "Failed to create user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-lg p-10">
      <h1 className="text-4xl font-bold text-center mb-2">Sign Up</h1>
      <p className="text-gray-600 text-center mb-8">
        Create your account to get started
      </p>

      <div className="space-y-5">
        <input
          type="email"
          placeholder="Email address"
          value={email}
          disabled={loading}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none disabled:bg-gray-100"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          disabled={loading}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none disabled:bg-gray-100"
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}
        {success && <p className="text-green-600 text-sm">{success}</p>}

        <button
          onClick={handleSignup}
          disabled={loading}
          className="w-full py-3 text-lg font-semibold bg-purple-600 text-white rounded-lg hover:bg-purple-500 transition disabled:opacity-50"
        >
          {loading ? "Creating..." : "Sign Up"}
        </button>
      </div>

      <p className="mt-6 text-center text-gray-600">
        Already have an account?{" "}
        <span
          onClick={handleLogin}
          className="text-purple-600 hover:underline cursor-pointer font-medium"
        >
          Login
        </span>
      </p>
    </div>
  );
}

export default SignUp;
