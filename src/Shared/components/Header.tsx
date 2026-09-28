import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AuthService from "../../auth/services/AuthService";
import { useAuth } from "../../app/providers/AuthContext";

function Header() {
  const { isAuthenticated, user } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const handleHome = async () => {
    if (!isAuthenticated) {
      navigate("/");
      return;
    }

    if (user?.role == "Admin") {
      navigate("/admindashboard");
      return;
    }

    if (user?.role == "User") {
      navigate("/dashboard");
      return;
    }

    navigate("/");
  };

  return (
    <header className="bg-gray-50 shadow-sm p-4 flex justify-between items-center">
      <h1
        onClick={handleHome}
        className="text-2xl font-extrabold hover:cursor-pointer"
      >
        Quiz App
      </h1>

      {!isAuthenticated && (
        <nav className="space-x-4">
          {location.pathname !== "/signup" && (
            <button
              className="text-xl hover:cursor-pointer"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </button>
          )}
          {location.pathname === "/" && <span>|</span>}

          {location.pathname !== "/login" && (
            <button
              className="text-xl hover:cursor-pointer"
              onClick={() => navigate("/login")}
            >
              {" "}
              Login
            </button>
          )}
        </nav>
      )}
    </header>
  );
}

export default Header;
