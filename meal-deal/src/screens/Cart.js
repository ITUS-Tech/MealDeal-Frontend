import React, { useState, useEffect } from "react";
// import { getCart } from "../services/cartService";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";

import "../styles/auth.css";
import axios from "axios";

function Cart(props) {
  const navigate = useNavigate();
  const { userId, isLoggedIn, isCustomer } = props.user();
  const [cart, setCart] = useState({});
  const [items, setItems] = useState([]);


  useEffect(() => {
      axios.get(`https://mealdeal.herokuapp.com/cart/${userId}`)
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
    await fetch(`http://mealdeal.herokuapp.com/cart/add/${userId}`,{
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(cart)
    });
  }

  const handlePayment= async () => {
    let order={
      userId: userId,
      vendorId: cart.vendorId,
      VendorName: cart.vendorName,
      plans: items  ,
      totalAmount: cart.totalPrice
    }
    await fetch(`http://mealdeal.herokuapp.com/order/add`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(order)
    }).then((resonse)=>{
      navigate(`/payment/${resonse.json()}`);
    });
    
  }

  return (
    <div className="container">
      {items.length>0?(
      <><h2>Ordering from {cart.vendorName}</h2><br /><Table striped>
          <thead>
            <tr>
              <th>Plan</th>
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
        <h3>Total: ${cart.totalPrice}</h3>
        <Button variant="info" size="sm" onClick={handlePayment}>Make Payment</Button></>
      ):(
        <h2>Cart Empty...</h2>
      )}
    </div>
  );
}

export default Cart;