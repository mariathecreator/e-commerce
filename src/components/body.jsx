import React, { useRef, useEffect, useState } from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import axios from "axios";
import all_product from "../assets/Assets/Frontend_Assets/all_product";
import api from "../global/Axios";


const Body = () => {
    const scrollRef = useRef({})
    const [products, setProducts] = useState([])
   useEffect(()=>{
   api.get("/products")
   },[])

    const scroll = (category,direction) => {
        const scrollcategory= scrollRef.current[category];

        if (scrollcategory) {
            const scrollAmount = 300
            scrollcategory.scrollBy(
                { left: direction === "left" ? -scrollAmount : scrollAmount, behavior: "smooth" }
            )
        }
    }
    const categories = [...new Set(all_product.map((item) => item.category))]
    return (
        <div className="bg-white w-auto h-auto">
            <div>
                <h1 className="font-bold text-3xl pt-5 text-center">New Arrivals</h1>
            </div>

            {categories.map((category, index) => (
                <div key={index} className="relative my-10">
                    <h2 className="font-bold text-2xl pt-5 mb-6 uppercase text-center">{category}</h2>



                    {/* Scroll buttons */}
                    <button
                        onClick={() => scroll(category,"left")}
                        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100 z-10"
                    >
                        <IoChevronBack size={24} className="text-black" />
                    </button>

                    <button
                        onClick={() => scroll(category,"right")}
                        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-50 p-2 rounded-full shadow hover:bg-gray-100 z-10"
                    >
                        <IoChevronForward size={24} className="text-black" />
                    </button>

                    <div
                        ref={(el)=>(scrollRef.current[category]=el)}
                        className="flex gap-6 overflow-x-auto snap-center scroll-smooth no-scrollbar px-10"
                    >
                       {all_product
  .filter((item) => item.category === category)
  .map((item, i) => (
    <div
      key={i}
      className="min-w-[220px] bg-white  rounded-2xl shadow-sm 
                 hover:shadow-xl hover:-translate-y-2 hover:border-gray-300 
                 transition-all duration-300 flex-shrink-0"
    >
      {/* Image */}
      <div className="w-full h-64 bg-gray-50 flex items-center justify-center rounded-t-2xl overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="max-h-full max-w-full object-contain transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Product Info */}
      <div className="p-4 text-center">
        <h4 className="font-semibold text-lg text-gray-800 truncate">
          {item.name}
        </h4>
        <div className="flex items-center justify-center gap-2 mt-2">
          <h5 className="text-xl font-bold text-black">${item.new_price}</h5>
          
        </div>

        {/* Hover Button */}
        <button
          className="mt-4 w-full py-2 bg-black text-white rounded-xl 
                     opacity-0 group-hover:opacity-100 transition-all duration-300"
        >
          Add to Cart
        </button>
      </div>
    </div>
  ))}

                    </div>

                </div>
            ))}
        </div>
    )
}
export default Body;