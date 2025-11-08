import React, { useEffect, useState } from "react";
import { getCategories } from "../../api/category";
import { toast, ToastContainer } from "react-toastify";
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "../../api/product";
import ProductModal from "../../components/common/productModal";

const Products = () => {
  const columns = [
    "images",
    "title",
    "description",
    "category",
    "stock",
    "views",
    "sizes",
    "actions",
  ];
  const [productData, setProductData] = useState({
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
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("title", productData.title);
    formData.append("description", productData.description);
    formData.append("price", productData.price);
    formData.append("categoryId", productData.categoryId);
    formData.append("stockStatus", productData.stockStatus);

    productData.images?.map((img) => {
      formData.append("images", img);
    });

    formData.append("sizes", JSON.stringify(productData.sizes));

    const [data, err] = await createProduct(formData);

    if (data) {
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
      setIsOpen(false);
      fetchProducts();
      toast("Product created", { autoClose: 1000 });
    }
  };

  const handleUpdate = async (e, id) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("title", productData.title);
    formData.append("description", productData.description);
    formData.append("price", productData.price);
    formData.append("categoryId", productData.categoryId);
    formData.append("stockStatus", productData.stockStatus);

    formData.append("sizes", JSON.stringify(productData.sizes));

    productData.images.map((item) => {
      formData.append("images", item);
    });

    const [data, err] = await updateProduct(formData, id);
    if (data) {
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
      setIsEditOpen(false);
      fetchProducts();
      toast("Product updated", { autoClose: 1000 });
    }
  };

  const handleDelete = async (id, categoryId) => {
    console.log(categoryId);
    const [data, err] = await deleteProduct(id, categoryId);
    console.log(data);
    if (data) {
      toast("Category deleted successfully", { autoClose: 1000 });
      const [data, err] = await getProducts();
      if (!data) {
        return setProducts([]);
      }

      fetchProducts();
    }
  };

  const fetchProducts = async () => {
    const [data, err] = await getProducts();
    if (data) setProducts(data.products);
  };

  const fetchCategories = async () => {
    const [data, err] = await getCategories();
    if (data) setCategories(data);
  };

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  return (
    <div className="p-5 h-screen overflow-y-scroll">
      <div className="flex w-full justify-between ">
        <h1>PRODUCTS</h1>
        <button
          className="border px-8 bg-black text-white py-1"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          add
        </button>
      </div>

      {isOpen && (
        <ProductModal
          categories={categories}
          productData={productData}
          setProductData={setProductData}
          handleSubmit={handleSubmit}
          setIsOpen={setIsOpen}
        />
      )}

      {isEditOpen && (
        <ProductModal
          setIsOpen={setIsEditOpen}
          setProductData={setProductData}
          productData={productData}
          handleSubmit={handleUpdate}
          categories={categories}
        />
      )}

      <div className="mt-10 ">
        <table className="w-full">
          <thead>
            <tr className="grid border-black/20 grid-cols-8  border-x border-t p-5 border-b place-items-center">
              {columns.map((col, key) => (
                <th key={key}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {products.map((data) => (
              <tr
                key={data._id}
                className="grid border-b border-black/20 border-x grid-cols-8 p-5 place-items-center"
              >
                <td>
                  <img
                    className="w-15"
                    src={`${import.meta.env.VITE_IMAGE_URL}/${data.images[0]}`}
                    alt=""
                  />
                </td>
                <td>{data.title}</td>
                <td>{data.description}</td>
                {categories.map((item) => {
                  if (item._id === data.categoryId) {
                    return <td key={item._id}>{item.title}</td>;
                  }
                })}
                <td>{data.stockStatus}</td>
                <td>{data.views}</td>

                <td className="flex gap-2 flex-wrap">
                  {data?.sizes.map((item, key) => (
                    <div key={key} className="border flex gap-2 px-2">
                      <p>{item.size}:</p>
                      <p>{item.stock}</p> 
                    </div>
                  ))}
                </td>

                <td className="flex gap-5">
                  <button
                    onClick={() => {
                      setProductData(data);
                      setIsEditOpen(!isEditOpen);
                    }}
                    className="border px-5 rounded-sm border-yellow-400"
                  >
                    edit
                  </button>
                  <button
                    onClick={() => handleDelete(data._id, data.categoryId)}
                    className="border px-5 rounded-sm border-red-600"
                  >
                    delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <ToastContainer />
      </div>
    </div>
  );
};

export default Products;
