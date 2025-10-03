import { createContext, useState, useContext } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {

    const [cartItems, setCartItems] = useState([]);
    
    const addtocart = (item) => {
        setCartItems((prev) => {
            const existing = prev.find(i => i._id === item._id);
            if (existing) {
                return prev.map(i =>
                    i._id === item._id ? { ...i, quantity: (i.quantity || 1) + 1 } : i
                );
            }
            return [...prev, { ...item, quantity: 1 }];
        });
    };

    return (
        <CartContext.Provider value={{ cartItems, addtocart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);


const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
    const [query, setQuery] = useState("")
    return (
        <SearchContext.Provider value={{ query, setQuery }}>
            {children}
        </SearchContext.Provider>
    );
};

export const useSearch = () => useContext(SearchContext)