import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const ChewsterContext = createContext(null);

const ChewsterContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [food_list, setFood_List] = useState([]);

  const BASE_URL = "http://localhost:4000";
  const [token, setToken] = useState("");

  const addToCart = async (itemId) => {
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
    if (token) {
      try {
        const response = await axios.post(
          `${BASE_URL}/chewster-api/cart/add`,
          { itemId },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log("Backend response:", response.data); //testing backend where the problem with connecting middleware is
      } catch (error) {
        console.error("Error adding to cart:", error);
      }
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prevCartItems) => ({
      ...prevCartItems,
      [itemId]: prevCartItems[itemId] - 1,
    }));
    if (token) {
      try {
        const response = await axios.post(
          `${BASE_URL}/chewster-api/cart/remove`,
          { itemId },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log("Backend response:", response.data);
      } catch (error) {
        console.error("Error removing from cart:", error);
      }
    }
  };

  //calculate total cart amt
  const calcCartTotal = () => {
    let totalAmt = 0;
    for (let itemId in cartItems) {
      if (cartItems[itemId] > 0) {
        let itemDetail = food_list.find((food) => food._id === Number(itemId));

        if (itemDetail && typeof itemDetail.price === "number") {
          totalAmt += itemDetail.price * cartItems[itemId];
        } else {
          console.error(
            `Item ${itemId} not found in food_list or has invalid price`
          );
        }
      }
    }
    return totalAmt;
  };

  const deliveryFee = 2.99;

  const fetchFoodList = async () => {
    const response = await axios.get(BASE_URL + "/chewster-api/food/list");
    setFood_List(response.data.data);
  };

  const fetchUserCart = async (token) => {
    try {
      const response = await axios.get(`${BASE_URL}/chewster-api/cart/get`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.success) {
        setCartItems(response.data.cartData);
      }
    } catch (error) {
      console.error("Error fetching user cart:", error);
    }
  };
  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
        await fetchUserCart(storedToken);
      }
    }
    loadData();
  }, [token]);

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
