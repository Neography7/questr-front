import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { Flowbite } from 'flowbite-react';
import customTheme from "../libs/flowbite";

const Layout = () => {
  return (
    <Flowbite theme={{ theme: customTheme }}>
        <Navbar />
        <Outlet />
        <Footer />
    </Flowbite>
  )
};

export default Layout;