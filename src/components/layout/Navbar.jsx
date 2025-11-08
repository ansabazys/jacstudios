import {
  Bookmark02Icon,
  Menu01Icon,
  Search01Icon,
  ShoppingBag03Icon,
  UserIcon,
} from "hugeicons-react";

import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Modal from "../common/Modal";
import MenuModal from "../common/MenuModal";
import { useAuth } from "../../context/authContext";
import { useCart } from "../../context/CartContext";

const Navbar = () => {
  const params = Object.values(useParams());

  const [showSearch, setShowSearch] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cart } = useCart();

  const menuItems = ["SHOP ALL", "WHAT'S NEW", "HOT SALE", "MY ORDERS"];

  const { auth } = useAuth();

  return (
    <header className="flex z-20 backdrop-blur-3xl w-full justify-between fixed items-center  py-5 px-5 md:px-15">
      <section className="z-10 flex md:gap-8 justify-start gap-5 text-xs">
        <button
          className="cursor-pointer"
          onClick={() => setShowSearch((prev) => !prev)}
        >
          <span className="md:hidden">{<Search01Icon />}</span>
          <span className="hidden md:block">SEARCH</span>
        </button>
        <button>{/* <Bookmark02Icon /> */} WISHLIST</button>
        {showSearch && (
          <Modal setShowSearch={setShowSearch} showSearch={showSearch} />
        )}
      </section>

      <nav className="left-0 fixed  md:flex w-full justify-center  hidden">
        <ul className="flex tracking-tight  justify-center items-center gap-10 text-xs">
          <Link to={"/store"} className={`${params.includes("store") && "underline font-bold"}`}>SHOP ALL</Link>
          <Link>WHAT'S NEW</Link>
          <Link
            to={"/"}
            className="text-2xl font-black tracking-tighter italic"
          >
            JAC
          </Link>
          <Link>HOT SALE</Link>
          <Link to={"/orders"}>MY ORDERS</Link>
        </ul>
      </nav>

      <Link
        to={"/"}
        className="text-2xl fixed left-0   font-black w-full flex justify-center tracking-tighter italic md:hidden"
      >
        JAC
      </Link>

      <section className="flex z-10  md:gap-8  justify-end gap-5 text-xs">
        {auth.data ? (
          <Link to={"/account"} className="hidden md:flex">
            {/* <UserIcon /> */} ACCOUNT
          </Link>
        ) : (
          <Link to={"/login"} className="hidden md:flex">
            {/* <UserIcon /> */} LOGIN
          </Link>
        )}
        <button className="flex gap-1">
          {/* <ShoppingBag03Icon /> */} <Link to={"/cart"}>BAG</Link>
          <span>({cart?.items?.length || 0})</span>
        </button>

        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          {/* <Menu01Icon /> */} MENU
        </button>

        {isMenuOpen && (
          <MenuModal
            setIsMenuOpen={setIsMenuOpen}
            isMenuOpen={isMenuOpen}
            menuData={menuItems}
          />
        )}
      </section>
    </header>
  );
};

export default Navbar;
