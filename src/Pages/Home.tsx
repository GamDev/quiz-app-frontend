import { Outlet, useLocation } from "react-router-dom";
import Footer from "../Components/Layouts/Footer";
import Header from "../Components/Layouts/Header";


function Home() {
  
  return (
    <div className="bg-white flex flex-col min-h-screen w-screen">
      <Header />
      <main className="flex flex-1  justify-center items-center ">
        <Outlet />
      </main>
      <Footer></Footer>
    </div>
  );
}
export default Home;
