import React, { useState } from "react";
import { removeCartItem, updateCart } from "../../api/cart";
import { useCart } from "../../context/CartContext";
import { toast, ToastContainer } from "react-toastify";

const CartItem = ({ item }) => {
  const { setCart, cart } = useCart();
  const [quantity, setQuantity] = useState(item.quantity);
  console.log(item);

  const handleDelete = async () => {
    const [data, err] = await removeCartItem(item.productId._id);
    if (data) setCart(data);
  };

  const handleUpdate = async (id, qty) => {
    const { stock } = item.productId.sizes.find(
      (dt) => dt.size === item.selectedSize
    );
    if (qty <= stock) {
      const [data, err] = await updateCart(id, { quantity: qty });
      if (data) setCart(data);
    } else {
      toast(
        `You cannot add ${qty} items to your cart. Only ${stock} are in stock.`
      );
    }
  };

  return (
    <>
      <div className="flex text-[.65rem] md:text-xs w-full border-b border-black/15 justify-between max-w-5xl h-full">
        <div className="flex">
          <div className="">
            <img
              src={`${import.meta.env.VITE_IMAGE_URL}/${
                item?.productId?.images[0]
              }`}
              className="w-20 p-2"
              alt=""
            />
          </div>
          <div className="py-5 flex flex-col justify-between">
            <div>
              <h1>{item.productName}</h1>
              <p>Quantity: {item.quantity}</p>
              <p>SIZE: {item.selectedSize}</p>
            </div>
            <div className="underline">
              <p>Move to Wishlist</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between py-4 items-end">
          <h1>
            <span className="pr-1">Rs</span>
            {item.price} <span>INR</span>
          </h1>
          <div className="flex text-2xl">
            <button
              onClick={() => {
                const newQty = quantity > 0 ? quantity - 1 : 0;
                setQuantity(newQty);
                handleUpdate(item._id, newQty);
              }}
            >
              -
            </button>
            <h1>{item.quantity}</h1>
            <button
              onClick={() => {
                const newQty = quantity + 1;
                setQuantity(newQty);
                handleUpdate(item._id, newQty);
              }}
            >
              +
            </button>
          </div>
          <button onClick={handleDelete}>Remove</button>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default CartItem;
