import React, { useContext, useState } from "react";
import "./PlaceOrder.css";
import { ChewsterContext } from "../../context/ChewsterContext.jsx";
import axios from "axios";

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

  const placeOrder = async (e) => {
    e.preventDefault();
    //restructure to fit api format
    let orderItems = [];
    food_list.forEach((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = { ...item, quantity: cartItems[item._id] };
        orderItems.push(itemInfo);
      }
    });

    let orderData = {
      address: data,
      items: orderItems,
      amount: calcCartTotal() + 2,
    };
    //send order obj to stripe function
    let response = await axios.post(
      BASE_URL + "/chewster-api/order/place",
      orderData,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    if (response.data.success) {
      const { session_url } = response.data;
      window.location.replace(session_url);
    } else {
      alert("Error");
    }
  };

  return (
    <form onSubmit={placeOrder} className="order-wrapper">
      <div className="order-left">
        <p className="title">Order Delivery Information</p>
        <div className="order-input-fields">
          <input
            name="firstName"
            onChange={handleOnChange}
            value={data.firstName}
            type="text"
            placeholder="First Name"
            required
          />
          <input
            name="lastName"
            onChange={handleOnChange}
            value={data.lastName}
            type="text"
            placeholder="Last Name"
            required
          />
        </div>
        <input
          name="email"
          onChange={handleOnChange}
          value={data.email}
          type="email"
          placeholder="Email"
          required
        />
        <input
          name="street"
          onChange={handleOnChange}
          value={data.street}
          type="text"
          placeholder="Street Address"
          required
        />
        <div className="order-input-fields">
          <input
            name="city"
            onChange={handleOnChange}
            value={data.city}
            type="text"
            placeholder="City"
            required
          />
          <input
            name="state"
            onChange={handleOnChange}
            value={data.state}
            type="text"
            placeholder="State"
            required
          />
        </div>
        <div className="order-input-fields">
          <input
            name="zipcode"
            onChange={handleOnChange}
            value={data.zipcode}
            type="text"
            placeholder="Zip Code"
            required
          />
          <input
            name="country"
            onChange={handleOnChange}
            value={data.country}
            type="text"
            placeholder="Country"
            required
          />
        </div>
        <input
          name="phone"
          onChange={handleOnChange}
          value={data.phone}
          type="text"
          placeholder="Phone Number"
          required
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
            <button type="submit">Proceed to Payment</button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
