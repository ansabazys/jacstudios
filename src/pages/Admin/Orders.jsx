import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { getUsers, updateUser } from "../../api/user";
import {
  getOrdersAdmin,
  updateOrder,
  updateOrderAdmin,
} from "../../api/orders";

const Orders = () => {
  const columns = ["order id", "email", "time", "status", "price", "payment method", "actions"];
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const [data, err] = await getOrdersAdmin();
    if (data) setOrders(data);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  console.log(orders);

  const handleCancel = async (orderId) => {
    const [data, err] = await updateOrderAdmin(orderId, {
      orderStatus: "canceled",
    });
    console.log(err);
    if (data) toast("Order canceled successfully");
    fetchOrders();
  };

  const handleComplete = async (orderId) => {
    const [data, err] = await updateOrderAdmin(orderId, {
      orderStatus: "completed",
    });

    if (data) toast("Order completed!");
    fetchOrders();
  };

  return (
    <div className="p-5">
      <div className="flex w-full justify-between ">
        <h1>Users</h1>
        <button onClick={() => setIsOpen((prev) => !prev)}>add</button>
      </div>

      <div className="mt-10 ">
        <table className="w-full">
          <thead>
            <tr className="grid border-black/20 grid-cols-7  border-x border-t p-5 border-b place-items-center">
              {columns.map((col, key) => (
                <th key={key}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {orders.map((data) => {
              return (
                <tr
                  key={data._id}
                  className="grid border-b border-black/20 border-x grid-cols-7 p-5 place-items-center"
                >
                  <td>{data._id}</td>
                  <td>{data.userId.email}</td>
                  <td>{new Date(data.createdAt).toLocaleString()}</td>
                  <td>{data.orderStatus}</td>
                  <td>{data.totalAmount}</td>
                  <td>{data.paymentMethod}</td>

                  <td className="flex gap-5">
                    {data.orderStatus === "canceled" || data.orderStatus === "completed"  ? (
                      <button className="border px-5 rounded-sm border-yellow-400">
                        view
                      </button>
                    ) : null}
                    {data.orderStatus === "pending" && (
                      <div className="flex gap-5">
                        <button
                          onClick={() => handleCancel(data._id)}
                          className="border px-5 rounded-sm border-yellow-400"
                        >
                          cancel
                        </button>
                        <button
                          onClick={() => handleComplete(data._id)}
                          className="border px-5 rounded-sm border-yellow-400"
                        >
                          complete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <ToastContainer />
      </div>
    </div>
  );
};

export default Orders;
