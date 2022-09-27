import React from "react";
import { useCart } from "react-use-cart";

export default function Checkout() {
  const { items, emptyCart } = useCart();
  console.log(items);
  return (
    <div>
      This is cart <button onClick={() => emptyCart()}>empty cart</button>
    </div>
  );
}
