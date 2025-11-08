import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "../../components/common/Button";

const OrderCancel = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="flex flex-col items-center justify-center h-[80lvh] text-center px-5"
    >
      <div className="max-w-md flex flex-col items-center gap-5 border border-black/10 rounded-2xl p-10 shadow-sm bg-white/70 backdrop-blur">
        {/* ❌ Icon */}
        {/* <XCircle className="w-20 h-20 text-red-500" /> */}

        <h1 className="text-lg font-semibold text-red-500">Order Cancelled</h1>

        <p className="text-black/60 text-sm">
          Your order has been successfully cancelled. We're sorry to see you go
          — if you’d like, you can continue shopping or view your other orders
          below.
        </p>

        <div className="flex flex-col gap-3 w-full mt-5">
          <Button
            value={"VIEW OTHER ORDERS"}
            className={"text-xs w-full"}
            onClick={() => navigate("/orders")}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default OrderCancel;
