import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/common/Button";
import { motion } from "framer-motion";
import { getOrders, updateOrder } from "../../api/orders";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      const [data, err] = await getOrders();
      console.log(data);
      if (data) setOrders(data);
    };
    fetchOrders();
  }, []);

  const handleCancel = async (orderId) => {
    const [data, err] = await updateOrder(orderId, { orderStatus: "canceled" });
    if (data) {
      navigate(`/orders/${orderId}`);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="flex flex-col items-center py-20 md:px-15 px-5 text-xs"
    >
      <div className="w-full max-w-5xl flex flex-col gap-8">
        <h1 className="text-lg font-semibold">MY ORDERS</h1>

        {orders.length === 0 ? (
          <div className="text-center text-black/50 py-10">
            <p>You have no orders yet.</p>
            <Button
              className={"text-xs mt-3"}
              value={"CONTINUE SHOPPING"}
              onClick={() => navigate("/")}
            />
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className="border border-black/10  p-5 flex flex-col gap-4 "
              >
                <div className="flex flex-wrap justify-between items-center border-b border-black/10 pb-2">
                  <h2 className="font-semibold text-sm">
                    Order #{order._id.slice(-6)}
                  </h2>
                  <p className="text-black/50 text-[0.65rem]">
                    Placed on {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>

                {/* Items list */}
                <div className="flex flex-col gap-3">
                  {order.items.map((item) => (
                    <div
                      key={item._id}
                      className="flex justify-between border-b border-black/10 pb-2"
                    >
                      <div className="flex gap-3 items-center">
                        {/* <img
                          src={`${import.meta.env.VITE_IMAGE_URL}/${item.productId?.images[0]}`}
                          alt={item.productName}
                          className="w-12 h-12 object-cover rounded"
                        /> */}
                        <div>
                          <p className="font-medium">{item.productName}</p>
                          <p className="text-black/50 text-[0.65rem]">
                            Qty: {item.quantity} | Size: {item.selectedSize}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <p>₹{item.price}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Status */}
                <div className="flex justify-between items-center pt-3 text-xs">
                  <span
                    className={`px-3 py-1 rounded-full text-white ${
                      order.orderStatus === "Delivered"
                        ? "bg-green-500"
                        : order.status === "Pending"
                        ? "bg-yellow-500"
                        : "bg-gray-400"
                    }`}
                  >
                    {order.orderStatus}
                  </span>

                  {order.orderStatus === "pending" && (
                    <Button
                      className={"text-xs px-3 py-1"}
                      value={"CANCEL"}
                      onClick={() => handleCancel(order._id)}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Order;
