import React, { useEffect, useState } from "react";
import { data, useNavigate, useParams } from "react-router-dom";
import { FavouriteIcon } from "hugeicons-react";
import { getProducts } from "../../api/product";
import { getCategoryProducts } from "../../api/category";
import Pagination from "../common/Pagination";
import { usePage } from "../../context/PageContext";

const ProductGrid = ({ setProducts, products = [] }) => {
  const { id } = useParams();

  const { currentPage, setTotalPages } = usePage();

  const fetchProducts = async (categoryId) => {
    const response = categoryId
      ? getCategoryProducts(categoryId)
      : getProducts(currentPage);
    const [data, err] = await response;

    console.log(data)
    if (data) {
      setProducts(data.products);
      setTotalPages(data.totalPages);
    }
  };
  useEffect(() => {
    fetchProducts(id);
  }, [id, currentPage]);

  const navigate = useNavigate();

  return (
    <div className="flex flex-col  order-3 md:order-2 justify-center">
      <div className="  w-full  flex flex-wrap justify-center">
        {products?.map((product, index) => (
          <div
            key={index}
            className="relative w-[380px] text-center"
            onClick={() => navigate(`/store/${product._id}`)}
          >
            <div className="">
              <img
               src={product.image?.url}
                alt=""
              />
            </div>
            <div className="pt-2 pb-5 text-start">
              <h1 className="uppercase tracking-tighter">{product.title}</h1>
              <h1 className="text-sm font-semibold">
                <span>Rs.</span>
                {product.price}
              </h1>
            </div>
          </div>
        ))}
      </div>
      <Pagination />
    </div>
  );
};

export default ProductGrid;
