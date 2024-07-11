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

  //calculate total cart amt
  const calcCartTotal = () => {
    let totalAmt = 0;
    for (let item in cartItems) {
      if (cartItems[item] > 0) {
        let itemDetail = food_list.find((food) => food._id === item);
        totalAmt += itemDetail.price * cartItems[item];
      }
    }
    return totalAmt;
  };

  const deliveryFee = 2.99;

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    calcCartTotal,
    deliveryFee,
  };

  return (
    <ChewsterContext.Provider value={contextValue}>
      {props.children}
    </ChewsterContext.Provider>
  );
};

export default ChewsterContextProvider;
