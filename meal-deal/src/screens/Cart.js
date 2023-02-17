import React, { useState } from "react";
import { getCart, resetCart } from "../services/cartService";

import "../styles/auth.css";

function Cart(props) {
  const [cart, setCart] = useState({})

  async function getCartData(){
    let cartdata= await getCart(1);
    setCart(cartdata);
  }
  getCartData()
  console.log(cart);
  resetCart(1);
  return (
    <h1>{cart.totalPrice}</h1>
  );
}

export default Cart;
