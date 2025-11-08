import React, { useState } from "react";

import Filterbar from "../../components/layout/Filterbar";
import ProductGrid from "../../components/layout/ProductGrid";
import { Sidebar } from "../../components/layout/Sidebar";

const Store = () => {
  const [products, setProducts] = useState([]);

  return (
    <div className="flex md:flex-nowrap flex-wrap  justify-center md:px-15 py-18  items-start">
      <Sidebar />
      <ProductGrid setProducts={setProducts} products={products} />
      <Filterbar setProducts={setProducts} />
    </div>
  );
};

export default Store;
