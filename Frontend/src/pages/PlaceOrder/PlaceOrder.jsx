import React, { useContext, useState, useEffect } from "react";
import "./PlaceOrder.css";
import { ChewsterContext } from "../../context/ChewsterContext.jsx";

const PlaceOrder = () => {
  const { calcCartTotal, deliveryFee, token, food_list, cartItems, BASE_URL } =
    useContext(ChewsterContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const handleOnChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <form action="" className="order-wrapper">
      <div className="order-left">
        <p className="title">Order Delivery Information</p>
        <div className="order-input-fields">
          <input
            name="firstName"
            onChange={handleOnChange}
            value={data.firstName}
            type="text"
            placeholder="First Name"
          />
          <input
            name=" lastName"
            onChange={handleOnChange}
            value={data.lastName}
            type="text"
            placeholder="Last Name"
          />
        </div>
        <input
          name="email"
          onChange={handleOnChange}
          value={data.email}
          type="email"
          placeholder="Email"
        />
        <input
          name="street"
          onChange={handleOnChange}
          value={data.street}
          type="text"
          placeholder="Street Address"
        />
        <div className="order-input-fields">
          <input
            name="city"
            onChange={handleOnChange}
            value={data.city}
            type="text"
            placeholder="City"
          />
          <input
            name="state"
            onChange={handleOnChange}
            value={data.state}
            type="text"
            placeholder="State"
          />
        </div>
        <div className="order-input-fields">
          <input
            name="country"
            onChange={handleOnChange}
            value={data.country}
            type="text"
            placeholder="Zip Code"
          />
          <input type="text" placeholder="Country" />
        </div>
        <input
          name="phone"
          onChange={handleOnChange}
          value={data.phone}
          type="text"
          placeholder="Phone Number"
        />
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
              <p>${calcCartTotal() == 0 ? 0 : deliveryFee.toFixed(2)}</p>{" "}
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>
                $
                {calcCartTotal === 0
                  ? 0
                  : (calcCartTotal() + deliveryFee).toFixed(2)}
              </b>{" "}
            </div>
            <button>Proceed to Payment</button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
