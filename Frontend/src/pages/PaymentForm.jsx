/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";
import { useSelector,useDispatch } from "react-redux";

const PaymentForm = ({ address, cartData, authData }) => {
  const cart = cartData.cartItems;

  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const generateCartItems = (carts) => {
    return carts.map((cart) => ({
      product:cart._id,
      quantity:cart.cartQuantity,
      frontView:cart.frontView,
    }));
  }
  const handlePayment = async (payment_method) => {
    console.log('esewa')
    const url = "https://digitalkirana-server.vercel.app/api/create";
    const data = {
      amount: cartData.cartTotalAmount,
      products: generateCartItems(cart),
      payment_method,
      costumerEmail: authData.user.email,
      address: address,
    };

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(url, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        const responseData = response.data;
        console.log(responseData);
        if (responseData.payment_method === "esewa") {
          esewaCall(responseData.formData);
        }
      } else {
        setError(`Failed to fetch: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      setError(`Error during fetch: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const esewaCall = (formData) => {
    console.log(formData);
    const path = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";

    const form = document.createElement("form");
    form.setAttribute("method", "POST");
    form.setAttribute("action", path);

    for (const key in formData) {
      const hiddenField = document.createElement("input");
      hiddenField.setAttribute("type", "hidden");
      hiddenField.setAttribute("name", key);
      hiddenField.setAttribute("value", formData[key]);
      form.appendChild(hiddenField);
    }

    document.body.appendChild(form);
    form.submit();
    const clearCartItem = () => {
        dispatch()
    }
  };

  return (
    <div className="w-[100vw] flex flex-col justify-center items-center mt-[5vh]">
      {error && <p className="text-red-600">{error}</p>}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <button
          style={{ padding: "16px 16px", backgroundColor: "white", color: "black", borderRadius: "12px", cursor:"pointer", border:"1px solid green"}}
          onClick={() => handlePayment("esewa")}
        >
          Pay Through Esewa
        </button>
      )}
    </div>
  );
}

export default PaymentForm;
