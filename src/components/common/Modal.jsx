import React, { useEffect, useState } from "react";
import { searchProducts } from "../../api/product";
import { data, Link } from "react-router-dom";

const Modal = ({ setShowSearch }) => {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const delay = setTimeout(() => {
      if (query) handleSearch();
    }, 400);
    return () => clearTimeout(delay);
  }, [query]);

  const handleSearch = async () => {
    const [data, err] = await searchProducts({ q: query });
    if (data) setProducts(data);
  };


  return (
    <div className="absolute left-0  w-full top-0 backdrop-blur-2xl  h-screen">
      <div className="bg-white w-1/3 flex flex-col gap-10  p-10 h-screen pr-15">
        <form action="" className="flex border-b">
          <input
            type="text"
            className=" w-full text-lg py-1 outline-none"
            placeholder="search"
            name=""
            id=""
            onChange={(e) => setQuery(e.target.value)}
          />
          <button onClick={() => setShowSearch((prev) => !prev)}>close</button>
        </form>

        {/* {!products.length > 0 && (
          <div className="text-sm uppercase">
            <h1 className="font-semibold pb-2">Popular searches</h1>
            <Link>Flannel overshirt</Link>
          </div>
        )} */}

        {products.map(data => (
          <div key={data._id}>
            <Link className="uppercase" onClick={() => setShowSearch(prev => !prev)} to={`/store/${data._id}`}>{data.title}</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Modal;
