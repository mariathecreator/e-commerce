import { useState, useRef, useEffect } from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import api from "../global/Axios";

const Body = () => {
  const scrollRef = useRef({});
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // Fetch products from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/api/products");
        setProducts(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const scroll = (category, direction) => {
    const scrollCategory = scrollRef.current[category];
    if (scrollCategory) {
      const scrollAmount = 300;
      scrollCategory.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const categories = [
    ...new Map(
      products.map((item) => [item.category._id, item.category])
    ).values(),
  ];

  return (
    <div className="bg-white w-full h-auto px-4 md:px-10 py-10">
      <h1 className="font-bold text-2xl md:text-3xl text-center mb-8">
        New Arrivals
      </h1>

      {categories.map((category, index) => (
        <div key={index} className="relative my-10">
          <h2 className="font-bold text-xl md:text-2xl uppercase text-center mb-6">
            {category.name}
          </h2>

          {/* Scroll Buttons (hidden on small screens) */}
          <button
            onClick={() => scroll(category._id, "left")}
            className="hidden md:block absolute left-0 top-1/2 transform -translate-y-1/2 
                       bg-white p-2 rounded-full shadow hover:bg-gray-100 z-10"
          >
            <IoChevronBack size={24} className="text-black" />
          </button>

          <button
            onClick={() => scroll(category._id, "right")}
            className="hidden md:block absolute right-0 top-1/2 transform -translate-y-1/2 
                       bg-white p-2 rounded-full shadow hover:bg-gray-100 z-10"
          >
            <IoChevronForward size={24} className="text-black" />
          </button>

          {/* Product Row */}
          <div
            ref={(el) => (scrollRef.current[category._id] = el)}
            className="flex gap-5 overflow-x-auto scroll-smooth no-scrollbar px-4 md:px-10"
          >
            {products
              .filter((item) => item.category.name === category.name)
              .map((item) => (
                <div
                  key={item._id}
                  className="min-w-[160px] sm:min-w-[200px] md:min-w-[220px] bg-white 
                             rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-2 
                             border border-gray-100 transition-all duration-300 flex-shrink-0"
                  onClick={() => navigate(`/home/itemcard/${item._id}`)}
                >
                  {/* Product Image */}
                  <div className="w-full h-40 sm:h-52 md:h-64 bg-gray-50 flex items-center justify-center rounded-t-2xl overflow-hidden">
                    <img
                      src={`http://localhost:3000/uploads/${item.image}`}
                      alt={item.name}
                      className="max-h-full max-w-full object-contain transition-transform duration-300 hover:scale-105"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="p-4 text-center">
                    <h4 className="font-semibold text-base md:text-lg text-gray-800 truncate">
                      {item.name}
                    </h4>
                    <div className="flex flex-col items-center justify-center gap-1 mt-2">
                      <h5 className="text-lg font-bold text-black">${item.price}</h5>
                      <p className="text-sm text-gray-500">{item.brand}</p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Body;
