import React from "react";
import "../styling/styles.css";

function CartItem({ item, onRemove }) {
  return (
    <div className="cart-item">
      <h3>{item.name}</h3>
      <p>${item.price} per unit</p>
      <p>Quantity: {item.quantity}</p>
      <p>Total: ${(item.quantity * item.price).toFixed(2)}</p>
      <button onClick={() => onRemove(item.id)}>Remove</button>
    </div>
  );
}

export default CartItem;
