import { createContext, useState, useContext, useEffect } from "react";
import api from "../../global/Axios"; 


const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);

  
  const fetchCart = async () => {
    try {
      const res = await api.get("/api/user/viewcart", { withCredentials: true });
      setCartItems(res.data.items || []);
      setCartTotal(res.data.total || 0);

     
      localStorage.setItem("cartItems", JSON.stringify(res.data.items || []));
      localStorage.setItem("cartTotal", res.data.total || 0);
    } catch (err) {
      console.error("Error fetching cart:", err);
    }
  };

  
  const addToCart = async (itemId) => {
    try {
      await api.post("/api/user/addtocart", { productId: itemId }, { withCredentials: true });
      await fetchCart(); 
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  };

  
  const updateQuantity = async (productId, newQty) => {
    try {
      await api.put("/api/user/updatecart", { productId, quantity: newQty }, { withCredentials: true });
      await fetchCart(); 
    } catch (err) {
      console.error("Error updating quantity:", err);
    }
  };


  const removeFromCart = async (productId) => {
    try {
      await api.delete(`/api/user/removecart/${productId}`, { withCredentials: true });
      await fetchCart();
    } catch (err) {
      console.error("Error removing from cart:", err);
    }
  };


  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartTotal,
        fetchCart,
        addToCart,
        updateQuantity,
        removeFromCart,
        setCartItems,
        setCartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);


const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [query, setQuery] = useState("");
  return (
    <SearchContext.Provider value={{ query, setQuery }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);
