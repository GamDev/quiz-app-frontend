import Home from "./Pages/Home";
import SignUp from "./Components/UI/Signup";
import Login from "./Components/UI/SignIn";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import LandingContent from "./Components/UI/LandingContent";
import PrivateRoute from "./Components/UI/PrivateRoute";
import Dashboard from "./Components/UI/dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<LandingContent />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="login" element={<Login />} />
      
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard></Dashboard>
            </PrivateRoute>
          }
        />
          </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
