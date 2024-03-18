import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { reduceStock } from "../redux/productSlice";

import "../styling/styles.css";

function ProductItem({ product }) {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  const handleAddToCart = () => {
    if (quantity > product.inStock) {
      setErrorMessage("Quantity exceeds available stock!");
      return;
    }

    dispatch(addToCart({ ...product, quantity }));
    dispatch(reduceStock({ productId: product.id, quantity }));
    setQuantity(0);
    setErrorMessage("");
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 0) {
      if (value > product.inStock) {
        setErrorMessage("Quantity exceeds available stock!");
      } else {
        setErrorMessage("");
      }
      setQuantity(value);
    }
  };

  return (
    <div className="product-card">
      <div className="product-image-container">
        <img
          src={product.photoUrl}
          alt={product.name}
          className="product-image"
        />
      </div>
      <div className="product-details">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-price">${product.price}</p>
        <p className="product-stock">In stock: {product.inStock}</p>
        <div className="product-actions">
          <input
            type="number"
            value={quantity}
            onChange={handleQuantityChange}
          />
          <button
            onClick={handleAddToCart}
            disabled={product.inStock === 0 || quantity > product.inStock}
          >
            {product.inStock === 0 ? "Out of Stock" : "Add to Cart"}
          </button>
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    </div>
  );
}

export default ProductItem;
