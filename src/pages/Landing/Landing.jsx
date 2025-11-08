import React, { useEffect, useState } from "react";
import Hero from "./Hero";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import { motion } from "framer-motion";
import { useProducts } from "../../hooks/useProducts";
import { useNavigate } from "react-router-dom";
import { getCategories } from "../../api/category";
import clothing from '../../assets/clothing.avif'
import bag from '../../assets/bag.avif'
import shoe from '../../assets/shoe.avif'
import accessories from '../../assets/accessories.avif'

const Landing = () => {

  const [categories, setCategories] = useState([])
  const {products} = useProducts()
  const navigate = useNavigate()


  const catImages = [clothing, accessories, bag, shoe]
  

  useEffect(() => {
    (async () => {
      const [data, err] = await getCategories()
      if(data) setCategories(data)
    })()
  },[])

  return (
    <div className="w-full flex flex-col  bg-white text-black">
      <Navbar />
      <Hero />

      <section className="py-20 px-6 md:px-20 ">
        <motion.h2
          className="text-2xl md:text-4xl font-bold mb-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Featured Collection
        </motion.h2>

        <div className="overflow-x-scroll scrollbar-hide flex w-full">
          {products.map((col, i) => (
            <motion.div
              key={i}
              className="relative shrink-0 overflow-hidden group"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => navigate(`/store/${col._id}`)}
            >
              <img
                src={`${import.meta.env.VITE_IMAGE_URL}/${col.images[0]}`}
                alt={col.title}
                className="w-[380px] shrink-0 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all">
                <h3 className="text-lg font-semibold tracking-wider">
                  {col.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

 
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-4xl font-bold mb-10">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((cat, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className="relative overflow-hidden  cursor-pointer"
                onClick={() => navigate(`/category/${cat._id}`)}
              >
                <img
                  src={catImages[i]}
                  alt={cat.title}
                  className="w-full h-56 object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white font-semibold text-lg">
                  {cat.title }
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 px-6 md:px-20 bg-black text-white text-center">
        <motion.h2
          className="text-2xl md:text-3xl font-semibold mb-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        >
          Stay in the Loop
        </motion.h2>
        <p className="mb-8 text-white/70">
          Get exclusive offers, style tips, and early access to drops.
        </p>
        <form className="flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-3 rounded-full border border-white text-white w-full outline-none"
          />
          <button
            type="submit"
            className="bg-white text-black font-medium px-6 py-3 rounded-full hover:bg-gray-200 transition"
          >
            Subscribe
          </button>
        </form>
      </section>

      <Footer />
    </div>
  );
};

export default Landing;
