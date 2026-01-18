import React from "react";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  const HandleHome = () => {
    navigate("/");
  };
  return (
    <header className="bg-gray-50 shadow-sm p-4 flex justify-between items-center">
      <h1
        onClick={HandleHome}
        className="text-2xl font-extrabold hover:cursor-pointer"
      >
        Quiz App
      </h1>

      <nav className="space-x-4">
        <button
          className="text-xl hover:cursor-pointer"
          onClick={() => navigate("/signup")}
        >
          Sign Up
        </button>
        <span>|</span>
        <button
          className="text-xl hover:cursor-pointer"
          onClick={() => navigate("/login")}
        >
          Login
        </button>
      </nav>
    </header>
  );
}

export default Header;
