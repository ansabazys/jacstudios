import React, { useEffect, useState } from "react";
import PopUpModel from "../../components/common/PopUpModel";
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategoryProducts,
  updateCategory,
} from "../../api/category";
import { toast, ToastContainer } from "react-toastify";

const Category = () => {
  const columns = ["name", "description", "products", "time", "actions"];
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    id: "",
  });
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleSubmit = async () => {
    const [data, err] = await createCategory(formData);
    console.log(data);
    if (data) {
      setFormData({ title: "", description: "" });
      toast("Category created successfully", { autoClose: 1000 });
      setCategories((prev) => [...prev, data.category]);
      setIsOpen((prev) => !prev);
    }
  };

  const handleUpdate = async (id) => {
    const [data, err] = await updateCategory(formData, id);
    console.log(data);
    if (data) {
      setFormData({ title: "", description: "", id: "" });
      toast("Category updated successfully", { autoClose: 1000 });
      const [data, err] = await getCategories();
      setCategories(data);
      setIsEditOpen((prev) => !prev);
    }
  };

  const handleDelete = async (id) => {
    const [data, err] = await deleteCategory(id);
    console.log(data);
    if (data) {
      toast("Category deleted successfully", { autoClose: 1000 });
      const [data, err] = await getCategories();
      setCategories(data);
    }

    if (err) toast(err.message);
  };

  const fetchCategories = async () => {
    const [data, err] = await getCategories();
    if (data) setCategories(data);
  };

  const fetchCategoryProducts = async () => {
    const [data, err] = await getCategoryProducts();
    if (data) setProducts(data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="p-5">
      <div className="flex w-full justify-between ">
        <h1>categories</h1>
        <button onClick={() => setIsOpen((prev) => !prev)}>add</button>
      </div>

      {isOpen && (
        <PopUpModel
          setIsOpen={setIsOpen}
          setFormData={setFormData}
          formData={formData}
          handleSubmit={handleSubmit}
        />
      )}

      {isEditOpen && (
        <PopUpModel
          setIsOpen={setIsEditOpen}
          setFormData={setFormData}
          formData={formData}
          handleSubmit={handleUpdate}
        />
      )}

      <div className="mt-10 ">
        <table className="w-full">
          <thead>
            <tr className="grid border-black/20 grid-cols-5 border-x border-t p-5 border-b place-items-center">
              {columns.map((col, key) => (
                <th key={col}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {categories.map((data, key) => (
              <tr
                key={data._id}
                className="grid border-b border-black/20 border-x grid-cols-5 p-5 place-items-center"
              >
                <td>{data.title}</td>
                <td>{data.description}</td>
                <td>{data.productsCount}</td>
                <td>{data.createdAt.toLocaleString()}</td>
                <td className="flex gap-5">
                  <button
                    onClick={() => {
                      setFormData({
                        title: data.title,
                        description: data.description,
                        id: data._id,
                      });
                      setIsEditOpen(!isEditOpen);
                    }}
                    className="border px-5 rounded-sm border-yellow-400"
                  >
                    edit
                  </button>
                  <button
                    onClick={() => handleDelete(data._id)}
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

export default Category;
