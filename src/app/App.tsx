import Home from "../home/pages/Home";
import SignUp from "../auth/compoents/Signup";
import Login from "../auth/compoents/SignIn";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import LandingContent from "../home/components/LandingContent";

import Dashboard from "../users/pages/Dashboard";
import RoleGuard from "../Shared/guards/RoleGuard";
import AdminDashboard from "../admin/pages/AdminDashboard";
import Users from "../users/components/Users";

import { AuthProvider } from "./providers/AuthContext";
import QuizPage from "../quiz/pages/QuizPage";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route index element={<LandingContent />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="login" element={<Login />} />
          </Route>
          <Route
            path="/dashboard"
            element={
              <RoleGuard rolerequiredRole="User">
                <Dashboard></Dashboard>
              </RoleGuard>
            }
          />
          <Route
            path="/admindashboard/*"
            element={
              <RoleGuard rolerequiredRole="Admin">
                <AdminDashboard></AdminDashboard>
              </RoleGuard>
            }
          >
            <Route index element={<div>Admin Home / Dashboard</div>} />
            <Route path="users" element={<Users />} />
            <Route path="createQuiz" element={<QuizPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
