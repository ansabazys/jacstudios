import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const UserLayout = ({children}) => {
  return (
    <div className="h-screen flex flex-col scrollbar-hide justify-between">
      <Navbar />
      <main className="">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default UserLayout;
