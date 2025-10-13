import {useState, useRef, useEffect } from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import all_product from "../assets/Assets/Frontend_Assets/all_product";
import { useNavigate } from "react-router-dom";
import api from "../global/Axios";


const Body = () => {
   const scrollRef = useRef({})
      const [products, setProducts] = useState([])
      const navigate = useNavigate()
  
      useEffect(() => {
          const fetchData = async () => {
              try {
                  const res = await api.get("/api/products")
                  console.log(res.data);
                  console.log(res);
  
                  setProducts(res.data)
              }
              catch (err) {
                  console.error(err)
              }
          }
          fetchData()
      }, [])
  
      const scroll = (category, direction) => {
          const scrollcategory = scrollRef.current[category];
  
          if (scrollcategory) {
              const scrollAmount = 300
              scrollcategory.scrollBy(
                  { left: direction === "left" ? -scrollAmount : scrollAmount, behavior: "smooth" }
              )
          }
      }
      
      const categories = [...new Map(products.map((item) => [item.category._id, item.category])).values()]
  
  
      return (
          <div className="bg-white w-auto h-auto">
              <div>
                  <h1 className="font-bold text-3xl pt-5 text-center">New Arrivals</h1>
              </div>
  
              {categories.map((category, index) => (
                  <div key={index} className="relative my-10">
                      <h2 className="font-bold text-2xl pt-5 mb-6 uppercase text-center">{category.name}</h2>
  
  
  
                      {/* Scroll buttons */}
                      <button
                          onClick={() => scroll(category._id, "left")}
                          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100 z-10"
                      >
                          <IoChevronBack size={24} className="text-black" />
                      </button>
  
                      <button
                          onClick={() => scroll(category._id, "right")}
                          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-50 p-2 rounded-full shadow hover:bg-gray-100 z-10"
                      >
                          <IoChevronForward size={24} className="text-black" />
                      </button>
  
                      <div
                          ref={(el) => (scrollRef.current[category._id] = el)}
                          className="flex gap-6 overflow-x-auto snap-center scroll-smooth no-scrollbar px-10"
                      >
                          {products
                              .filter((item) => item.category.name === category.name)
                              .map((item) => (
                                  <div
                                      key={item._id}
                                      className=" max-w-[220px] bg-white  rounded-2xl shadow-sm 
                   hover:shadow-xl hover:-translate-y-2 hover:border-gray-300 
                   transition-all duration-300 flex-shrink-0"
                                      onClick={() => {
                                          console.log("Navigating to:", `/home/itemcard/${item._id}`);
                                          navigate('/login')
                                      }}
                                  >
  
                                      <div className="w-full h-64 bg-gray-50 flex items-center justify-center rounded-t-2xl overflow-hidden">
                                          <img
                                              src={`http://localhost:3000/uploads/${item.image}`}
                                              alt={item.name}
                                              className="max-h-full max-w-full object-contain transition-transform duration-300 hover:scale-105"
                                          />
                                      </div>
  
  
                                      <div className="p-4 text-center">
                                          <h4 className="font-semibold text-lg text-gray-800 truncate">
                                              {item.name}
                                          </h4>
                                          <div className="flex flex-col items-center justify-center gap-2 mt-2">
                                              <h5 className="text-xl font-bold text-black">${item.price}</h5>
                                              <h5 className="text-xl font-bold text-black">{item.brand}</h5>
  
                                          </div>
  
  
  
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