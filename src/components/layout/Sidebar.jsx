import React, { useEffect, useState } from "react";
import useWidth from "../../hooks/useWidth";
import MenuModal from "../common/MenuModal";
import { logOut } from "../../api/Auth";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getCategories } from "../../api/category";

export const Sidebar = () => {
  const [categories, setCategories] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const width = useWidth();

  useEffect(() => {
    (async () => {
      const [data, err] = await getCategories();
      if (data) setCategories(data);
    })();
  }, []);

  const navigate = useNavigate();
  const { id } = useParams();


  return (
    <div className="w-1/2 p-5 left-0 md:ml-15 md:fixed md:p-0 h-full md:w-fit md:border-0 md:h-fit order-1 border-y border-black/15">
      <div className="text-xs  h-full flex justify-center text-center md:items-start flex-col gap-4 row-start-1 col-start-1">
        <button
          className=""
          onClick={() => {
            width < 768 && setIsOpen((prev) => !prev);
          }}
        >
          CATEGORIES
        </button>

        {isOpen && (
          <MenuModal
            isMenuOpen={isOpen}
            setIsMenuOpen={setIsOpen}
            menuData={categories}
          />
        )}

        <ul className="md:flex hidden flex-col gap-1 ">
          {categories.map((data, index) => (
            <button
              key={data._id}
              onClick={() => navigate(`/category/${data._id}`)}
              className={`text-start hover:underline uppercase cursor-pointer ${
                id == data._id && "underline"
              }`}
            >
              {data.title}
            </button>
          ))}
        </ul>
      </div>
    </div>
  );
};

export const AccountSidebar = ({ className, ulClassName }) => {
  const { auth, setAuth, logout } = useAuth();

  return (
    <div className={`flex flex-col gap-5 ${className}`}>
      <h1>ACCOUNT</h1>

      <ul className={ulClassName}>
        <li className="cursor-pointer">Account details</li>
        <li className="cursor-pointer">Addresses</li>
        <li className="cursor-pointer" onClick={logout}>
          Logout
        </li>
      </ul>
    </div>
  );
};
