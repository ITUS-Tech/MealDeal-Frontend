import React, { useState, useEffect } from "react";
// import { getCart } from "../services/cartService";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

import "../styles/auth.css";
import axios from "axios";

function Cart(props) {
  const [cart, setCart] = useState({});
  const [items, setItems] = useState([]);


  useEffect(() => {
      axios.get(`http://localhost:8080/cart/1`)
      .then((respnse) => {
        setCart(respnse.data);
        setItems(respnse.data.items);
      })
  }, [])
  
  console.log(cart);

  // async function getCartData(){
  //   let cartdata= await getCart(1);
  //   setCart(cartdata);
  // }
  // getCartData()
  //resetCart(1);
  return (
    <div className="container"><h2>Ordering from {cart.vendorName}</h2>
    <br/>
    <Table striped>
      <thead>
        <tr>
          <th>Item</th>
          <th>Price</th>
          <th>Quantity</th>
        </tr>
      </thead>
      <tbody>
        {items.map(item=>(
          <tr>
            <td>{item.itemName}</td>
            <td>{item.price}</td>  
            <td><Button variant="outline-danger" size="sm">-</Button> {item.quantity} <Button variant="outline-success">+</Button></td>
          </tr>
        ))}
      </tbody>
      <h4>Total: ${cart.totalPrice}</h4>
    </Table>
    </div>
  );
}

export default Cart;
