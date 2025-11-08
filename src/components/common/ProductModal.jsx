import React, { useEffect } from "react";
import InputBox from "./InputBox";
import Button from "./Button";
import { data } from "react-router-dom";

const ProductModal = ({
  categories,
  productData,
  setProductData,
  handleSubmit,
  setIsOpen,
}) => {
  console.log(productData.images[0]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    console.log()
    setProductData((prev) => ({ ...prev, images: [...e.target.files] }));
  };

  const handleSize = (size, e) => {
    const stock = Number(e.target.value);
    setProductData((prev) => {
      const exists = prev?.sizes?.find((s) => s.size === size);

      return {
        ...prev,
        sizes: exists
          ? prev?.sizes.map((s) => (s.size === size ? { ...s, stock } : s))
          : [...prev?.sizes, { size, stock }],
      };
    });
  };

  return (
    <div className=" w-full  flex absolute left-0 justify-center">
      <form
        className=" w-full bg-white p-5 border max-w-lg flex flex-col gap-5"
        onSubmit={(e) => handleSubmit(e, productData._id)}
      >
        <div className="w-full flex justify-end">
          <button
            className="text-xs"
            onClick={() => {
              setIsOpen((prev) => !prev);
              setProductData({
                title: "",
                description: "",
                images: [],
                price: 0,
                categoryId: "",
                sizes: [
                  { size: "S", stock: 0 },
                  { size: "M", stock: 0 },
                  { size: "L", stock: 0 },
                  { size: "XL", stock: 0 },
                ],
                stockStatus: "out of stock",
              });
            }}
          >
            CLOSE
          </button>
        </div>
        <div className="">
          <InputBox
            name="title"
            label="Title"
            defaultValue={productData.title}
            onChange={handleChange}
          />
        </div>
        <div className="">
          <InputBox
            name="price"
            label="Price"
            type="number"
            min="0"
            onChange={handleChange}
            defaultValue={productData.price}
          />
        </div>

        <div className="">
          <label htmlFor="">Description</label>
          <textarea
            className="border w-full p-2"
            rows={5}
            name="description"
            id=""
            onChange={handleChange}
            defaultValue={productData.description}
          ></textarea>
        </div>

        <div className="flex gap-5">
          <label htmlFor="">Category</label>
          <select
            name="categoryId"
            id=""
            className="border"
            onChange={handleChange}
            defaultValue={
              productData.categoryId.length > 0 ? productData.categoryId : ""
            }
          >
            <option value="" disabled>
              Select a category
            </option>

            {categories?.map((cate, key) => (
              <option key={key} value={cate._id}>
                {cate.title}
              </option>
            ))}
          </select>
        </div>

        <div>
          <h1>size</h1>
          {productData.sizes.map((data, key) => (
            <div key={key} className="flex items-center gap-5">
              <h1>{data.size}</h1>
              <input
                type="number"
                name=""
                id=""
                placeholder={data.stock}
                onChange={(e) => handleSize(data.size, e)}
                className="w-fit border-b outline-none"
              />
            </div>
          ))}
        </div>

        <img
          src={`${import.meta.env.VITE_IMAGE_URL}/${productData?.images[0]}`}
          className="w-20"
          alt="d"
        />
        <input type="file" multiple onChange={handleImageChange} />

        <Button type="submit" value="Add" />
      </form>
    </div>
  );
};

export default ProductModal;
