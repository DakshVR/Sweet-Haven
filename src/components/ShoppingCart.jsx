import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, checkout } from "../redux/cartSlice";
import { increaseStock } from "../redux/productSlice";
import CartItem from "./CartItem";

import "../styling/styles.css";

function ShoppingCart() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const [isVisible, setIsVisible] = useState(false);

  const handleRemoveFromCart = (productId, quantity) => {
    dispatch(removeFromCart(productId));
    dispatch(increaseStock({ productId, quantity }));
  };

  const handleCheckout = () => {
    dispatch(checkout());
  };

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="shopping-cart">
      <button onClick={toggleVisibility}>Cart ({cart.length})</button>
      {isVisible && (
        <div>
          <h2>Shopping Cart</h2>
          {cart.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onRemove={() => handleRemoveFromCart(item.id, item.quantity)}
            />
          ))}
          <button className="checkout-button" onClick={handleCheckout}>
            Checkout
          </button>
        </div>
      )}
    </div>
  );
}

export default ShoppingCart;
