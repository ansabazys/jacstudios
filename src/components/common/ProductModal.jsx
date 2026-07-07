import React from "react";
import InputBox from "./InputBox";
import Button from "./Button";

const initialState = {
  title: "",
  description: "",
  image: null,
  price: 0,
  categoryId: "",
  sizes: [
    { size: "S", stock: 0 },
    { size: "M", stock: 0 },
    { size: "L", stock: 0 },
    { size: "XL", stock: 0 },
  ],
  stockStatus: "out of stock",
};

const ProductModal = ({
  categories,
  productData,
  setProductData,
  handleSubmit,
  setIsOpen,
}) => {
  const handleChange = (e) => {
    const { name, value } = e.target;

    setProductData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setProductData((prev) => ({
      ...prev,
      image: e.target.files[0],
    }));
  };

  const handleSize = (size, e) => {
    const stock = Number(e.target.value);

    setProductData((prev) => ({
      ...prev,
      sizes: prev.sizes.map((item) =>
        item.size === size ? { ...item, stock } : item,
      ),
    }));
  };

  return (
    <div className="absolute left-0 flex w-full justify-center">
      <form
        className="flex w-full max-w-lg flex-col gap-5 border bg-white p-5"
        onSubmit={(e) => handleSubmit(e, productData._id)}
      >
        <div className="flex justify-end">
          <button
            type="button"
            className="text-xs"
            onClick={() => {
              setIsOpen(false);
              setProductData(initialState);
            }}
          >
            CLOSE
          </button>
        </div>

        <InputBox
          name="title"
          label="Title"
          value={productData.title}
          onChange={handleChange}
        />

        <InputBox
          name="price"
          label="Price"
          type="number"
          min="0"
          value={productData.price}
          onChange={handleChange}
        />

        <div>
          <label>Description</label>

          <textarea
            className="w-full border p-2"
            rows={5}
            name="description"
            value={productData.description}
            onChange={handleChange}
          />
        </div>

        <div className="flex gap-5">
          <label>Category</label>

          <select
            name="categoryId"
            className="border"
            value={productData.categoryId}
            onChange={handleChange}
          >
            <option value="">Select Category</option>

            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.title}
              </option>
            ))}
          </select>
        </div>

        <div>
          <h2 className="mb-2 font-semibold">Sizes</h2>

          {productData.sizes.map((item) => (
            <div key={item.size} className="mb-2 flex items-center gap-4">
              <span className="w-8">{item.size}</span>

              <input
                type="number"
                min="0"
                value={item.stock}
                onChange={(e) => handleSize(item.size, e)}
                className="border-b outline-none"
              />
            </div>
          ))}
        </div>

        {/* Image Preview */}
        {productData.image && (
          <img
            src={
              productData.image instanceof File
                ? URL.createObjectURL(productData.image)
                : productData.image.url
            }
            alt="Product"
            className="h-24 w-24 rounded object-cover"
          />
        )}

        <input type="file" accept="image/*" onChange={handleImageChange} />

        <Button type="submit" value={productData._id ? "Edit" : "Add"} />
      </form>
    </div>
  );
};

export default ProductModal;
