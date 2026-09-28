import { createContext, useContext, useEffect, useState } from "react";
import AuthService from "../../auth/services/AuthService";
import type { UserInfo } from "../../users/models/UserInfo";

interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  user: UserInfo | null;
  setUser: React.Dispatch<React.SetStateAction<UserInfo | null>>;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(
    AuthService.isAuthenticated(),
  );
  const [user, setUser] = useState<UserInfo | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const restoreUser = async () => {
      if (!AuthService.isAuthenticated()) {
        setIsInitializing(false);
        return;
      }

      try {
        const user = await AuthService.getUserInfo();

        setUser(user);
        setIsAuthenticated(true);
      } catch {
        await AuthService.logout();

        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setIsInitializing(false);
      }
    };

    restoreUser();
  }, []);
  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, user, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}
function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}
export { AuthProvider, useAuth };
export default AuthContext;
