import React, { useContext } from "react";
import "./PlaceOrder.css";
import { ChewsterContext } from "../../context/ChewsterContext";

const PlaceOrder = () => {
  const { calcCartTotal, deliveryFee } = useContext(ChewsterContext);

  return (
    <form action="" className="order-wrapper">
      <div className="order-left">
        <p className="title">Order Delivery Information</p>
        <div className="order-input-fields">
          <input type="text" placeholder="First Name" />
          <input type="text" placeholder="Last Name" />
        </div>
        <input type="email" placeholder="Email" />
        <input type="text" placeholder="Address" />
        <div className="order-input-fields">
          <input type="text" placeholder="City" />
          <input type="text" placeholder="State" />
        </div>
        <div className="order-input-fields">
          <input type="text" placeholder="Zip Code" />
          <input type="text" placeholder="Country" />
        </div>
        <input type="text" placeholder="Phone Number" />
      </div>
      <div className="order-right">
        <div className="cart-total-wrapper">
          <div className="cart-total">
            <h2>Cart Summary</h2>
            <div className="cart-total-details">
              <p>Total before Fees</p>
              <p>${calcCartTotal()}</p>{" "}
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${deliveryFee.toFixed(2)}</p>{" "}
              {/* Ensure deliveryFee is a number */}
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${(calcCartTotal() + deliveryFee).toFixed(2)}</b>{" "}
            </div>
            <button>PROCEED TO PAYMENT</button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
