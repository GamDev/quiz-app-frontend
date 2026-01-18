import { useNavigate } from "react-router-dom";

function LandingContent() {
  const navigate = useNavigate();

  return (
    <div className="max-w-2xl text-center">
      <h1 className="text-4xl font-extrabold mb-4">
        Welcome to Quiz App
      </h1>

      <p className="text-gray-600 mb-8">
        Test your knowledge, challenge yourself, and track your progress.
        Sign up to get started or log in if you already have an account.
      </p>

      <div className="flex justify-center gap-4">
        <button
          onClick={() => navigate("/signup")}
          className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-500 transition"
        >
          Sign Up
        </button>

        <button
          onClick={() => navigate("/login")}
          className="px-6 py-3 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition"
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default LandingContent;
