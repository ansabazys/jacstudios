import { Cancel01Icon } from "hugeicons-react";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { Link, useParams } from "react-router-dom";
import { AccountSidebar } from "../layout/Sidebar";

const MenuModal = ({ setIsMenuOpen, isMenuOpen, menuData, color }) => {

  return (
    <AnimatePresence mode="wait">
      {isMenuOpen && (
        <motion.div
          key="menuModal"
          className="fixed z-10 h-full overflow-scroll top-0 left-0 w-full bg-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
        >
          <div className="flex justify-between p-5">
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <Link className="text-2xl font-black absolute tracking-tighter italic md:hidden">
                JAC
              </Link>
            </motion.div>
            <button onClick={() => setIsMenuOpen((prev) => !prev)}>
              <Cancel01Icon />
            </button>
          </div>

          <div className="p-5">
            <ul className="font-semibold flex flex-col gap-2   text-start tracking-tight text-3xl">
              {menuData.map((data, index) => (
                <li key={index} className="uppercase">
                  {data}
                </li>
              ))}
            </ul>
          </div>
          {color && (
            <div className="p-5">
              <ul className="flex flex-col gap-2   text-start tracking-tight text-2xl">
                <li className="text-3xl font-semibold">COLORS</li>
                {color.map((data, index) => (
                  <li key={index}>{data}</li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <AccountSidebar
              className={"p-5 text-3xl font-semibold tracking-tight"}
              ulClassName={"text-2xl font-medium"}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MenuModal;
