import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/common/Button";
import { motion } from "framer-motion";
import { Tick01Icon } from "hugeicons-react";
import Confetti from "react-confetti";

const OrderConfirm = () => {
  const navigate = useNavigate();


  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="flex flex-col items-center justify-center h-[90lvh] text-center px-5"
    >
   
        <Confetti
          className="w-full h-full"
          numberOfPieces={250}
          recycle={false}
          gravity={0.15}
        />


      <div className="max-w-md flex flex-col items-center gap-5 border border-black/10  p-10 shadow-sm">
        <Tick01Icon />
        <h1 className="text-lg font-semibold">Order Confirmed 🎉</h1>
        <p className="text-black/60 text-sm">
          Thank you for your purchase! Your order has been successfully placed.
          You’ll receive a confirmation email shortly with your order details.
        </p>

        <div className="flex flex-col gap-3 w-full mt-3">
          <Button
            value={"VIEW MY ORDERS"}
            onClick={() => navigate("/orders")}
          />
          <button className="border text-sm py-2" onClick={() => navigate("/")}>
            CONTINUE SHOPPING
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default OrderConfirm;
