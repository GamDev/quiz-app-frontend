import { useEffect, useState } from "react";
import type { UserInfo } from "../models/UserInfo";
import GridView from "../../Shared/components/GridView";
import UserService from "../services/UserService";

function Users() {
  const [users, setUsers] = useState<UserInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        const usersInfo = await UserService.getAllUsers();
        setUsers(usersInfo);
      } catch (err: any) {
        setError(err.message || "Failed to load users");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (loading) return <p className="mt-10 text-center">Loading users...</p>;
  if (error) return <p className="mt-10 text-center text-red-500">{error}</p>;
  const handleEdit = (user: UserInfo) => {
    // Navigate to edit page
    // navigate(`/admindashboard/users/${user.id}/edit`);
  };

  // Method to handle delete
  const handleDelete = async (user: UserInfo) => {
    if (!confirm(`Are you sure you want to delete ${user.fullName}?`)) return;

    try {
      //   await UserService.deleteUser(user.id);
      //   // Refresh the users table
      //   setUsers((prev) => prev.filter((u) => u.id !== user.id));
    } catch (err: any) {
      alert(err.message || "Failed to delete user");
    }
  };
  return (
    <main className="flex-1 flex justify-center items-center p-10">
      <div className="w-full max-w-5xl">
        <GridView
          data={users}
          onDelete={handleDelete}
          onEdit={handleEdit}
        ></GridView>
      </div>
    </main>
  );
}

export default Users;
