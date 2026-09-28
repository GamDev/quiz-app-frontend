import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import AuthService from "../../auth/services/AuthService";
import { useAuth } from "../../app/providers/AuthContext";

interface SidebarItem {
  label: string;
  path?: string;
  children?: SidebarItem[];
}

interface SidebarProps {
  isOpen: boolean;
}

const sidebarItems: SidebarItem[] = [
  { label: "Dashboard", path: "/admin" },
  {
    label: "Quiz Management",
    children: [
      { label: "All Quizzes", path: "/admin/quizzes" },
      { label: "Create Quiz", path: "/admindashboard/CreateQuiz" },
    ],
  },
  { label: "Users", path: "/admindashboard/users" },
  { label: "Settings", path: "/admin/settings" },
];

const AdminSidebar = ({ isOpen }: SidebarProps) => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth();

  const toggleMenu = (label: string) => {
    setOpenMenu((prev) => (prev === label ? null : label));
  };

  const handleLogout = async () => {
    try {
      AuthService.logout();
    } finally {
      setIsAuthenticated(false);
      navigate("/login");
    }
  };

  return (
    <aside
      className={`fixed top-17.5 bottom-16 left-0 w-64
      bg-gray-50 border-r border-gray-200
      flex flex-col justify-between
      transform transition-transform duration-300
      ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
    >
      <div className="p-4">
        <h1 className="text-xl font-bold text-gray-800 mb-6">Admin Panel</h1>

        <nav className="space-y-1">
          {sidebarItems.map((item) => (
            <div key={item.label}>
              {/* Parent */}
              {item.children ? (
                <button
                  onClick={() => toggleMenu(item.label)}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-md font-bold
             text-gray-800 hover:bg-purple-50 transition"
                >
                  <span
                    className={`transition-transform ${
                      openMenu === item.label ? "rotate-90" : ""
                    }`}
                  >
                    ▶
                  </span>
                  <span>{item.label}</span>
                </button>
              ) : (
                <NavLink
                  to={item.path!}
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded-md transition font-bold
                    ${
                      isActive
                        ? "bg-purple-600 text-white"
                        : "text-gray-800 hover:bg-purple-50"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              )}

              {/* Children */}
              {item.children && openMenu === item.label && (
                <div className="ml-4 mt-1 space-y-1">
                  {item.children.map((child) => (
                    <NavLink
                      key={child.path}
                      to={child.path!}
                      className={({ isActive }) =>
                        `block px-3 py-2 rounded-md text-sm transition
                        ${
                          isActive
                            ? "bg-purple-600 text-white"
                            : "text-gray-700 hover:bg-purple-50"
                        }`
                      }
                    >
                      {child.label}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>

      <button
        onClick={handleLogout}
        className="m-4 bg-purple-600 hover:bg-purple-500
        text-white py-2 rounded-md transition"
      >
        Logout
      </button>
    </aside>
  );
};

export default AdminSidebar;
