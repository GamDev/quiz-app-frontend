import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../Services/AuthService";
import type { UserInfo } from "../../Models/UserInfo";

function Dashboard() {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const loadUser = async () => {
      try {
        const currentUser = await AuthService.getUserInfo();
        setUser(currentUser);
      } catch (err) {
        // Token invalid or expired
        setError("Session expired. Please login again.");
        AuthService.logout();
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [navigate]);

  const handleLogout = async () => {
    
   AuthService.logout();
   navigate("/login");
  };

  if (loading) {
    return <p className="text-center mt-10">Loading dashboard...</p>;
  }

  if (error) {
    return <p className="text-center mt-10 text-red-500">{error}</p>;
  }

  return (
    <div className="w-full max-w-4xl bg-white shadow-lg rounded-2xl p-8">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>

      {user && (
        <div className="mb-6">
          <p>
            <strong>User ID:</strong> {user.id}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
        </div>
      )}

      <button
        onClick={handleLogout}
        className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-500 transition"
      >
        Logout
      </button>
    </div>
  );
}

export default Dashboard;
