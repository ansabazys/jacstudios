import React, { useEffect, useState } from "react";
import { getProduct } from "../../api/product";
import { useNavigate, useParams } from "react-router-dom";
import InputBox from "../common/InputBox";
import Button from "../common/Button";
import { useAuth } from "../../context/authContext";
import { addToCart } from "../../api/cart";
import { useCart } from "../../context/CartContext";
import { toast, ToastContainer } from "react-toastify";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [selectedSize, setSelectedSize] = useState("");
  const [error, setError] = useState("");

  const { auth } = useAuth();
  const navigate = useNavigate();

  const { setCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      const [data, err] = await getProduct(id);
      if (data) {
        const checkStock = data.sizes.every((dt) => dt.stock === 0);
        if(checkStock) setError("Out of stock")

        setProduct(data);
      }
    };
    fetchProduct();
  }, []);

  const handleSubmit = async () => {
    if (!auth.data) navigate("/login");
    if (!selectedSize) return setError("Please select a size");

    const [data, err] = await addToCart(product._id, {
      size: selectedSize,
    });

    console.log(data);

    if (data) {
      setCart(data.data);
      toast("Product added to bag", { autoClose: 200 });
    }
  };

  return (
    <div className="py-20 px-15">
      <div className="flex">
        <div className="w-1/2 ">
          {product?.images?.map((item) => (
            <img src={`${import.meta.env.VITE_IMAGE_URL}/${item}`} alt="" />
          ))}
        </div>
        <div className="w-1/2 flex-col gap-8 items-center py-20 flex">
          <div className="w-full max-w-sm leading-5">
            <h1 className="tracking-tight uppercase">{product.title}</h1>
            <p className="font-semibold">
              <span className="pr-1">Rs</span>
              {product.price}.00
            </p>
            <p className="text-sm">MRP inclusive of all taxes</p>
          </div>

          <div className="w-full max-w-sm">
            <div className="flex border-l border-black/15 justify-between ">
              {product.sizes?.map((item, index) => (
                <button
                  key={index}
                  disabled={item.stock < 1}
                  onClick={() => setSelectedSize(item.size)}
                  className={`px-5  py-3 text-center ${
                    item.stock < 1 && "opacity-30"
                  } flex w-full border-y border-e  ${
                    selectedSize == item.size
                      ? "border border-black"
                      : "border-black/15"
                  } justify-center cursor-pointer`}
                >
                  <span>{item.size}</span>
                  <span>{item.stock}</span>
                </button>
              ))}
            </div>
            {error && <p className="text-xs pt-2 text-red-400">{error}</p>}
          </div>

          <Button
            value="add"
            onClick={handleSubmit}
            className={"w-full max-w-sm"}
          />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ProductDetails;
