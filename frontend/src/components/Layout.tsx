import { Outlet } from "react-router-dom";
import Header from "./Header";
import { Toaster } from "react-hot-toast";
// import Slider from "./Slider";

const Layout = () => {
  return (
    <div>
      <Toaster />
      <Header />
      <main>
        {/* <Slider /> */}
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
