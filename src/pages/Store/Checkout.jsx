import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/common/Button";
import { useCart } from "../../context/CartContext";
import { createOrder } from "../../api/orders";
import { useAuth } from "../../context/AuthContext";
import { updateByUser, updateUser } from "../../api/user";

export const Checkout = () => {
  const { cart, setCart } = useCart();
  const navigate = useNavigate();
  const { auth } = useAuth();

  console.log(auth);

  const [address, setAddress] = useState({
    fullName: "",
    phoneNumber: 0,
    city: "",
    state: "",
    postalCode: "",
    addressLine: "",
  });

  useEffect(() => {
    if(auth.data) setAddress(auth.data.address)
  }, []);

  const handleChange = (e) => {
    setAddress((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };


  const handlePlaceOrder = async () => {
    const [data, err] = await createOrder({
      address: address,
      paymentMethod: "Cash on Delivery",
    });

    setCart("");
    console.log(err);
    if (data) navigate("/orders/confirm");
  };

  return (
    <div className="flex py-20 md:px-15 px-5 md:flex-nowrap flex-wrap-reverse text-xs gap-8 justify-evenly w-full">
      {/* Left section - Shipping and Payment */}
      <div className="w-full max-w-5xl flex flex-col gap-6">
        <h1 className="text-lg font-semibold">CHECKOUT</h1>

        {/* Contact Info */}
        <div className="flex flex-col gap-2 border-b border-black/15 pb-4">
          <h2 className="font-semibold">Contact Information</h2>
          <p className="text-black/70 text-sm">{auth.data.email}</p>
          <p className="text-xs text-black/50">
            Not your account? Sign in as another user.
          </p>
        </div>

        {/* Shipping Address */}
        <div className="flex flex-col gap-3 border-b border-black/15 pb-4">
          <h2 className="font-semibold">Shipping Address</h2>
          <div className="grid md:grid-cols-2 gap-2">
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              className="border border-black/15 px-3 py-2 rounded-md"
              onChange={handleChange}
              defaultValue={auth.data.address.fullName}
            />
            <input
              type="number"
              name="phoneNumber"
              placeholder="Phone Number"
              className="border border-black/15 px-3 py-2 rounded-md"
              onChange={handleChange}
              defaultValue={auth.data.address.phoneNumber}
            />
            <input
              type="text"
              name="addressLine"
              placeholder="Address Line 1"
              className="border border-black/15 px-3 py-2 rounded-md col-span-2"
              onChange={handleChange}
              defaultValue={auth.data.address.addressLine}
            />
            <input
              type="text"
              placeholder="City"
              name="city"
              className="border border-black/15 px-3 py-2 rounded-md"
              onChange={handleChange}
              defaultValue={auth.data.address.city}
            />
            <input
              type="text"
              placeholder="State"
              name="state"
              className="border border-black/15 px-3 py-2 rounded-md"
              onChange={handleChange}
              defaultValue={auth.data.address.state}
            />
            <input
              type="text"
              name="postalCode"
              placeholder="Postal Code"
              className="border border-black/15 px-3 py-2 rounded-md"
              onChange={handleChange}
              defaultValue={auth.data.address.postalCode}
            />
          </div>
        </div>

        {/* Payment Method */}
        <div className="flex flex-col gap-3 border-b border-black/15 pb-4">
          <h2 className="font-semibold">Payment Method</h2>
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2 text-sm">
              <input type="radio" name="payment" value="cod" defaultChecked />
              Cash on Delivery
            </label>
            <label className="flex items-center gap-2 text-sm opacity-50">
              <input disabled type="radio" name="payment" value="online" />
              Online Payment
            </label>
          </div>
        </div>

        <Button
          className={"w-full text-xs mt-3"}
          onClick={handlePlaceOrder}
          value={"PLACE ORDER"}
        />
      </div>

      {/* Right section - Order Summary */}
      <div className="flex flex-col w-full md:w-[350px] gap-3 border border-black/10 rounded-lg p-4">
        <h1 className="font-semibold text-sm border-b border-black/10 pb-2">
          ORDER SUMMARY
        </h1>

        <div className="flex flex-col gap-3 max-h-[250px] overflow-y-auto">
          {cart.items?.map((item) => (
            <div key={item._id} className="flex justify-between text-[.65rem]">
              <div className="flex gap-2 items-center">
                <img
                  src={`${import.meta.env.VITE_IMAGE_URL}/${
                    item?.productId?.images[0]
                  }`}
                  alt={item.productName}
                  className="w-12 h-12 object-cover rounded"
                />
                <div>
                  <p>{item.productName}</p>
                  <p className="text-black/50 text-[.6rem]">
                    Qty: {item.quantity}
                  </p>
                </div>
              </div>
              <p>₹{item.price}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-2 border-t border-black/10 pt-3 text-xs">
          <div className="flex justify-between">
            <p>Subtotal</p>
            <p>₹{cart.totalAmount}</p>
          </div>
          <div className="flex justify-between">
            <p>Shipping</p>
            <p>Free</p>
          </div>
          <div className="flex justify-between font-semibold">
            <p>Total</p>
            <p>₹{cart.totalAmount}.00 INR</p>
          </div>
        </div>
      </div>
    </div>
  );
};
