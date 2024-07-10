import React, { useContext } from "react";
import "./Cart.css";
import { ChewsterContext } from "../../context/ChewsterContext";

const Cart = () => {
  const { cartItems, food_list, removeFromCart } = useContext(ChewsterContext);
  return (
    <div className="'cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total Price</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <div>
                <div key={index} className="cart-items-title cart-items-item">
                  <img src={item.image} alt="picture of food in cart" />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>${item.price * cartItems[item._id]}</p>
                  <p
                    onClick={() => {
                      removeFromCart(item._id);
                    }}
                    className="x"
                  >
                    x
                  </p>
                </div>
                <hr />
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default Cart;
