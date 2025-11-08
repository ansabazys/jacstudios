import React, { useEffect, useState } from "react";
import { getProducts } from "../../api/product";
import DashbordCard from "../../components/admin/DashbordCard";
import { getCategories } from "../../api/category";
import { getUsers } from "../../api/user";
import { getOrders, getOrdersAdmin, getTotalRevenue } from "../../api/orders";
import { Navigate, useNavigate } from "react-router-dom";
import OrdersChart from "../../components/layout/OrdersChart";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(null);

  const navigate = useNavigate()

  const fetchProducts = async () => {
    const response = await getProducts();
    const [data, err] = response;
    if (data) setProducts(data.products);
  };

  const fetchCategories = async () => {
    const response = await getCategories();
    const [data, err] = response;
    if (data) setCategories(data);
  };

  const fetchUsers = async () => {
    const response = await getUsers();
    const [data, err] = response;
    if (data) setUsers(data);
  };

  const fetchOrders = async () => {
    const response = await getOrdersAdmin();
    const [data, err] = response;
    if (data) setOrders(data);
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
