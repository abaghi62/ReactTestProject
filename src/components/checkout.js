import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Checkout = () => {
  const { cart, setCart } = useCart(); // دسترسی به سبد خرید
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleOrder = async () => {
    if (cart.length === 0) {
      setError("سبد خرید شما خالی است!");
      return;
    }

    const orderData = {
      products: cart.map((item) => ({
        productId: item.id,
        quantity: 1, // مقدار پیش‌فرض برای تست
      })),
    };

    try {
      setLoading(true);
      const response = await axios.post("http://localhost:5000/api/orders", orderData);
      setCart([]); // سبد خرید را خالی می‌کنیم
      setLoading(false);
      navigate("/thank-you"); // هدایت به صفحه تایید خرید
    } catch (err) {
      console.error("خطا در ثبت سفارش:", err);
      setLoading(false);
      setError("خطایی رخ داده است. لطفاً دوباره تلاش کنید.");
    }
  };

  return (
    <div className="container checkout-page">
      <h2>تایید سفارش</h2>
      {error && <p className="text-danger">{error}</p>}
      <div className="row justify-content-center">
        {cart.map((product, index) => (
          <div key={index} className="col-md-6 my-3">
            <div className="card p-3">
              <h5>{product.title}</h5>
              <p>قیمت (تومان): {product.price}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-4">
        <button
          className="btn btn-success"
          onClick={handleOrder}
          disabled={loading}
        >
          {loading ? "در حال ثبت سفارش..." : "ثبت سفارش"}
        </button>
      </div>
    </div>
  );
};

export default Checkout;
