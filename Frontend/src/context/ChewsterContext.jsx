import { createContext, useEffect, useState } from "react";

//import { food_list } from "../assets/assets";

export const ChewsterContext = createContext(null);

const ChewsterContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const BASE_URL = "http://localhost:4000";
  const [token, setToken] = useState("");
  const [food_list, setFood_list] = useState([]);

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

  const fetchFoodList = async () => {
    const response = await axios.get(BASE_URL + "/chewster-api/food/list");
    setFood_list(response.data.data);
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }

    async function loadData() {
      await fetchFoodList();
    }
    loadData();
  }, []);

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    calcCartTotal,
    deliveryFee,
    BASE_URL,
    token,
    setToken,
  };

  return (
    <ChewsterContext.Provider value={contextValue}>
      {props.children}
    </ChewsterContext.Provider>
  );
};

export default ChewsterContextProvider;
