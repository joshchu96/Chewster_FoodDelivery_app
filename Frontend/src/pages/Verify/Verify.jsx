import { useContext, useEffect } from "react";
import { ChewsterContext } from "../../context/ChewsterContext.jsx";
import "./Verify.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

const Verify = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  //get values from url.
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  const { BASE_URL } = useContext(ChewsterContext);
  const navigate = useNavigate();

  const verifyPayment = async () => {
    const response = await axios.post(BASE_URL + "/chewster-api/order/verify", {
      success,
      orderId,
    });
    if (response.data.success) {
      navigate("/myOrders");
    } else {
      navigate("/");
    }
  };

  //load verify payment func when page loads
  useEffect(() => {
    verifyPayment();
  }, []);

  return (
    <div className="verify">
      <div className="spinner"></div>
    </div>
  );
};

export default Verify;
