import { useEffect, useState } from "react";
import type { UserInfo } from "../../users/models/UserInfo";
import UserService from "../../users/services/UserService";
import AdminSidebar from "../compoents/AdminSidebar";
import Header from "../../Shared/components/Header";
import { Outlet } from "react-router-dom";
import Footer from "../../Shared/components/Footer";

function AdminDashboard() {
  return (
    <div className="bg-white flex flex-col min-h-screen w-screen">
      <Header />

      <div className="flex flex-1">
        {/* Sidebar */}
        {<AdminSidebar isOpen={true} />}

        {/* Main content */}
        <main className="flex flex-1  justify-center items-start ">
          {/* Nested routes like Users will render here */}
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
}
export default AdminDashboard;
