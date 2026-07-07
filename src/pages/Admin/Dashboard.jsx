import React, { useEffect, useState } from "react";
import { getProducts } from "../../api/product";
import DashbordCard from "../../components/admin/DashbordCard";
import { getCategories } from "../../api/category";
import { getUsers } from "../../api/user";
import { getOrders, getOrdersAdmin, getTotalRevenue } from "../../api/orders";
import { Navigate, useNavigate } from "react-router-dom";
import OrdersChart from "../../components/layout/OrdersChart";

const Dashboard = () => {
  const [products, setProducts] = useState(0);
  const [categories, setCategories] = useState(0);
  const [users, setUsers] = useState(0);
  const [orders, setOrders] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);

  const navigate = useNavigate()

  const fetchProducts = async () => {
    const response = await getProducts();
    const [data, err] = response;
  if (data) setProducts(data.totalCount);
  };



  const fetchCategories = async () => {
    const response = await getCategories();
    const [data, err] = response;
    if (data) setCategories(data);
  };

  const fetchUsers = async () => {
    const response = await getUsers();
    const [data, err] = response;
    if (data) setUsers(data.totalCount);
  };

  const fetchOrders = async () => {
    const response = await getOrdersAdmin();
    const [data, err] = response;
    if (data) setOrders(data.ordersCount);
  };

  const fetchTotalRevenue = async () => {
    const response = await getTotalRevenue();
    const [data, err] = response;
    if (data) setTotalRevenue(data[0].totalRevenue);
  };


  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchUsers();
    fetchOrders();
    fetchTotalRevenue();
   
  }, []);


  


  return (
    <div className="p-15 flex flex-col gap-5">
      <div className="flex gap-5">
        <DashbordCard data={products} title="products" onClick={() => navigate("/admin/products")} />
        <DashbordCard data={users} title="users" onClick={() => navigate("/admin/users")} />
        <DashbordCard data={orders} title="orders" onClick={() => navigate("/admin/orders")} />
        <DashbordCard data={totalRevenue} title="total Revenue" />
      </div>

      <div>
       <OrdersChart />
      </div>
    </div>
  );
};

export default Dashboard;
