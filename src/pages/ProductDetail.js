import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart, cartCount } = useCart(); // دریافت addToCart و cartCount
  const [showModal, setShowModal] = useState(false); // مدیریت نمایش modal
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product); // افزودن به سبد خرید
    setShowModal(true); // نمایش modal
    setTimeout(() => setShowModal(false), 2000); // بستن خودکار modal بعد از 2 ثانیه
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container product-detail">
      <div className="row">
        <div className="col-md-6">
          <video width="100%" height="auto" controls>
            <source src={"http://localhost:5000" + product.url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="col-md-6 product-info">
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p>Price: ${product.price}</p>
          <button onClick={handleAddToCart} className="btn btn-primary">
            اضافه به سبد خرید ({cartCount})
          </button>
          <button onClick={() => navigate("/cart")} className="btn btn-secondary">
            مشاهده سبد خرید
          </button>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <p>محصول به سبد خرید اضافه شد!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
