import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";

export const ChewsterContext = createContext(null);

const ChewsterContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});

  const addToCart = (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prevCartItems) => ({
        ...prevCartItems,
        [itemId]: 1,
      }));
    } else {
      setCartItems((prevCartItems) => ({
        ...prevCartItems,
        [itemId]: prevCartItems[itemId] + 1,
      }));
    }
  };

  const removeFromCart = (itemId) => {
    setCartItems((prevCartItems) => ({
      ...prevCartItems,
      [itemId]: prevCartItems[itemId] - 1,
    }));
  };

  useEffect(() => {
    console.log(cartItems);
  }, [cartItems]);

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
  };

  return (
    <ChewsterContext.Provider value={contextValue}>
      {props.children}
    </ChewsterContext.Provider>
  );
};

export default ChewsterContextProvider;
