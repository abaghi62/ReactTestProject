import React from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, removeFromCart } = useCart(); // دسترسی به سبد خرید و تابع حذف
  const { user } = useAuth(); // دسترسی به اطلاعات لاگین کاربر
  const navigate = useNavigate();

  const handleRemove = (productId) => {
    removeFromCart(productId); // حذف محصول از سبد خرید
  };

  const handleCheckout = () => {
    if (!user) {
      // اگر کاربر لاگین نشده بود، هدایت به صفحه لاگین
      navigate("/login");
    } else {
      // در غیر این صورت هدایت به صفحه نهایی کردن خرید
      navigate("/checkout");
    }
  };

  return (
    <div className="container cart-page">
      <h2>سبد خرید شما</h2>
      {cart.length === 0 ? (
        <p>سبد خرید شما خالی است.</p>
      ) : (
        <>
          <div className="row justify-content-center">
            {cart.map((product, index) => (
              <div key={index} className="col-md-6 my-3">
                <div className="card p-3">
                  <h5>{product.title}</h5>
                  <p>قیمت (تومان): {product.price}</p>
                  <p>{product.description}</p>
                  <button
                    className="btn btn-danger btn-sm mt-2"
                    onClick={() => handleRemove(product.id)}
                  >
                    حذف از سبد خرید
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-4">
            <button
              className="btn btn-primary"
              onClick={handleCheckout} // عملکرد دکمه نهایی کردن خرید
            >
              نهایی کردن خرید
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
