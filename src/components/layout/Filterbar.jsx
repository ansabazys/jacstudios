import React, { useState } from "react";
import MenuModal from "../common/MenuModal";
import useWidth from "../../hooks/useWidth";
import { sortProductByPrice } from "../../api/product";

const Filterbar = ({ setProducts }) => {
  const SORT = ["Latest arrivals", "Price: Low to high", "Price: High to low"];

  const COLORS = [
    "all colors",
    "black",
    "blue",
    "brown",
    "burgundy",
    "gray",
    "green",
    "navy",
    "orange",
    "pink",
    "purple",
    "red",
    "tan",
    "white",
    "yellow",
  ];
  const [isOpen, setIsOpen] = useState(false);
  const width = useWidth();

  const fetchProducts = async (priceQuery = "") => {
    const [data, err] = await sortProductByPrice(priceQuery);
    setProducts(data);
  };

  const handleSearch = async (data) => {
    if (data === "Price: Low to high") {
      await fetchProducts("low");
    } else if (data === "Price: High to low") {
      await fetchProducts("high");
    } else {
      await fetchProducts();
    }
  };

  return (
    <div className="text-xs md:fixed right-0 md:mt-20 md:mr-13 p-5 md:p-0  order-2 md:order-3 w-1/2 md:w-fit top-0 shrink-0 h-full border-black/15 border-y md:border-0 border-l flex flex-col  gap-5">
      <div className="flex flex-col gap-3">
        <button
          onClick={() => {
            width < 768 && setIsOpen((prev) => !prev);
          }}
          className="text-center md:text-start"
        >
          SORT
        </button>

        {isOpen && (
          <MenuModal
            isMenuOpen={isOpen}
            setIsMenuOpen={setIsOpen}
            menuData={SORT}
            color={COLORS}
          />
        )}

        <ul className="md:flex hidden flex-col gap-1 items-start">
          {SORT.map((data, index) => (
            <button
              onClick={() => handleSearch(data)}
              key={index}
              className={`hover:underline cursor-pointer`}
            >
              {data}
            </button>
          ))}
        </ul>
      </div>

      {/* <div className="md:flex hidden flex-col  gap-3">
        <h1>COLORS</h1>
        <ul className="flex flex-col gap-1 items-start">
          {COLORS.map((data, index) => (
            <button
              key={index}
              className={`${
                data === "all colors" && "underline"
              } hover:underline  cursor-pointer`}
            >
              {data}
            </button>
          ))}
        </ul>
      </div> */}
    </div>
  );
};

export default Filterbar;
