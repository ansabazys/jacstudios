import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="p-5 flex">
      <Link className="text-2xl font-black w-full flex  tracking-tighter italic">
        JAC
      </Link>
      <Link className="">
        logout
      </Link>
    </header>
  );
};

export default Header;
