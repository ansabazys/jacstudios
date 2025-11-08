import React, { useEffect, useState } from "react";
import { getProducts } from "../api/product";

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    const [data, err] = await getProducts();
    if (err) setError(err);
    if (data) setProducts(data.products);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return { products, loading, error};
};
