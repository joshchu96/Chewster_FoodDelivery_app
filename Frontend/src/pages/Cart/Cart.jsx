import React, { useContext } from "react";
import "./Cart.css";
import { ChewsterContext } from "../../context/ChewsterContext";

const Cart = () => {
  const { cartItems, food_list, removeFromCart } = useContext(ChewsterContext);

  const calculateSubtotal = () => {
    return food_list.reduce((acc, item) => {
      return acc + item.price * (cartItems[item._id] || 0);
    }, 0);
  };

  const subtotal = calculateSubtotal();
  const deliveryFees = 3.99;
  const total = subtotal + deliveryFees;

  return (
    <div className="cart">
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
              <div key={index}>
                <div className="cart-items-title cart-items-item">
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
          return null;
        })}
      </div>
      <div className="cart-summary-container">
        <div className="cart-summary">
          <h2>Cart Summary</h2>
          <div>
            <div className="cart-summary-details">
              <p>Subtotal</p>
              <p>${subtotal.toFixed(2)}</p>
            </div>
          </div>
          <hr />
          <div>
            <div className="cart-summary-details">
              <p>Delivery Fees</p>
              <p>${deliveryFees.toFixed(2)}</p>
            </div>
          </div>
          <hr />
          <div>
            <div className="cart-summary-details">
              <b>Total</b>
              <b>${total.toFixed(2)}</b>
            </div>
            <button>PROCEED TO ORDER PAYMENT</button>
          </div>
        </div>
        <div className="cart-promo"></div>
      </div>
    </div>
  );
};

export default Cart;
