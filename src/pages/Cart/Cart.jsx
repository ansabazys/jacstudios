import React, { useState } from "react";
import CartItem from "../../components/cart/CartItem";
import Button from "../../components/common/Button";
import { useCart } from "../../context/CartContext";
import { createOrder } from "../../api/orders";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";

const Cart = () => {
  const { cart } = useCart();
  const { auth } = useAuth();

  const navigate = useNavigate();

  return (
    <div className="flex py-20 md:px-15 px-5  md:flex-nowrap flex-wrap-reverse text-xs gap-8 justify-evenly w-full">
      <div className="h-full w-full max-w-5xl  text-xs   flex flex-col items-center">
        <div className="max-w-5xl w-full flex flex-col gap-8 h-full">
          <h1>SHOPPING BAG</h1>
          <div className="flex text-black/50 justify-between border-b border-b-black/15 py-2">
            <h1>ITEM</h1>
            <h1>TOTAL</h1>
          </div>
        </div>

        {cart.items?.map((item) => (
          <CartItem key={item._id} item={item} />
        ))}

        <div className="flex flex-col gap-1 py-5 w-full">
          <div>
            <div className="flex w-full justify-between">
              <h1>Total</h1>
              <p>₹{cart.totalAmount}</p>
            </div>
            <div className="flex w-full justify-between">
              <h1>Shipping estimate</h1>
              <p>Calculated at Checkout</p>
            </div>
            <div className="flex w-full justify-between">
              <h1>Duties</h1>
              <p>Calculated at Checkout</p>
            </div>
          </div>
          <div className="flex w-full justify-between font-bold">
            <h1>Order Total</h1>
            <p>₹{cart.totalAmount}.00 INR</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col w-full md:w-fit  gap-3">
        <h1>LOGGED IN AS</h1>
        <div>
          <h1>{auth?.data?.email}</h1>
          <p className="text-black/50">
            Not your account? Sign in as another user.
          </p>
        </div>
        <Button
          onClick={() => cart.items.length > 0 && navigate("/checkout")}
          className={"w-full text-xs"}
          value={"PROCEED TO CHECKOUT"}
        />
      </div>
    </div>
  );
};

export default Cart;
