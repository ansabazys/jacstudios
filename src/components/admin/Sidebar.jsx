import {
  DashboardCircleIcon,
  DashboardCircleSettingsIcon,
  PackageIcon,
  Settings01Icon,
  ShippingTruck01Icon,
  UserIcon,
} from "hugeicons-react";
import React from "react";
import { logOut } from "../../api/auth";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

const Sidebar = () => {

  const {logout} = useAuth()

  return (
    <div className="p-10 border-r border-black/20 w-full max-w-xs  flex justify-between flex-col  h-full">
      <div className="flex flex-col gap-5">
        <div className="flex gap-2">
          <DashboardCircleIcon />
          <Link to={"/admin/dashboard"}>Dashboard</Link>
        </div>
        <div className="flex gap-2">
          <DashboardCircleSettingsIcon />
          <Link to={"/admin/category"}>Category</Link>
        </div>
        <div className="flex gap-2">
          <PackageIcon />
          <Link to={"/admin/products"}>Products</Link>
        </div>
        <div className="flex gap-2">
          <ShippingTruck01Icon />
          <Link to={"/admin/orders"}>Orders</Link>
        </div>
        <div className="flex gap-2">
          <UserIcon />
          <Link to={"/admin/users"}>Users</Link>
        </div>
      </div>

      <div className="">
        {/* <div className="flex gap-2">
          <Settings01Icon />
          <h1>Settings</h1>
        </div> */}
        <div className="flex gap-2">
          <button onClick={logout}>LogOut</button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
