import React, { useContext } from "react";
import "./Cart.css";
import { ChewsterContext } from "../../context/ChewsterContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const {
    cartItems,
    food_list,
    removeFromCart,
    addToCart,
    calcCartTotal,
    deliveryFee,
    BASE_URL,
  } = useContext(ChewsterContext);

  const navigate = useNavigate();

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total Price</p>
        </div>
        <br />
        <hr />
        {food_list.map((item, idx) => {
          if (cartItems[item._id] && cartItems[item._id] > 0) {
            return (
              <div key={idx}>
                <div className="cart-items-title cart-items-item">
                  <img src={`${BASE_URL}/food-images/` + item.image} />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <div className="item-counter-wrapper">
                    <span
                      onClick={() => removeFromCart(item._id)}
                      className="cart-minus-btn"
                    >
                      -
                    </span>
                    <span className="num">{cartItems[item._id]}</span>
                    <span
                      onClick={() => addToCart(item._id)}
                      className="cart-add-btn"
                    >
                      +
                    </span>
                  </div>

                  <p>${item.price * cartItems[item._id]}</p>
                </div>
                <hr />
              </div>
            );
          }
        })}
      </div>
      <div className="cart-total-wrapper">
        <div className="cart-total">
          <h2>Cart Summary</h2>
          <div className="cart-total-details">
            <p>Total before Fees</p>
            <p>${calcCartTotal()}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <p>Delivery Fee</p>
            <p>${calcCartTotal() === 0 ? 0 : deliveryFee}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <b>Total</b>
            <b>
              $
              {calcCartTotal === 0
                ? 0
                : (calcCartTotal() + deliveryFee).toFixed(2)}
            </b>
          </div>
          <button onClick={() => navigate("/order")}>
            Proceed to Checkout
          </button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>Enter Promo Code Here</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder="promo code" />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
