import React, { useState, useEffect } from "react";
// import { getCart } from "../services/cartService";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

import "../styles/auth.css";
import axios from "axios";

function Cart(props) {
  const [cart, setCart] = useState({});
  const [items, setItems] = useState([]);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const userId= localStorage.getItem("userId") || -1;
  if(userId>-1)
    setLoggedIn(true);


  useEffect(() => {
      axios.get(`http://localhost:8080/cart/${userId}`)
      .then((respnse) => {
        setCart(respnse.data);
        setItems(respnse.data.items);
      })
  }, [])
  
  console.log(cart);

  const handleQuant= async (index, add)=>{
    console.log(cart.items[index]);
    let total= cart.totalPrice
    if(add){
      items[index].quantity+=1;
      total+=items[index].price;
    }
    else{
      items[index].quantity-=1;
      total-=items[index].price;
      if(items[index].quantity===0){
        items.splice(index,1);
      }
    }
    let newCartItems={...cart, items: items};
    let newCart={...newCartItems, totalPrice: total};
    setCart(newCart);
    await fetch(`http://localhost:8080/cart/add/${cart.userId}`,{
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(cart)
    });
  }

  return (
    <div className="container">
      {items.length>0?(
      <><h2>Ordering from {cart.vendorName}</h2><br /><Table striped>
          <thead>
            <tr>
              <th>Item</th>
              <th>Price</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr>
                <td>{item.subscription}</td>
                <td>{item.price}</td>
                <td>
                  <Button variant="outline-danger" size="sm" onClick={() => handleQuant(index, false)}>-</Button>
                  {item.quantity}
                  <Button variant="outline-success" size="sm" onClick={() => handleQuant(index, true)}>+</Button></td>
              </tr>
            ))}
          </tbody>
        </Table>
        <h3>Total: ${cart.totalPrice}</h3></>
      ):(
        <h2>Cart Empty...</h2>
      )}
    </div>
  );
}

export default Cart;
