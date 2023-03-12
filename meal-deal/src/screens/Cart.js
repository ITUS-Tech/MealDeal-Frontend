import React, { useState, useEffect } from "react";
// import { getCart } from "../services/cartService";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

import "../styles/auth.css";
import axios from "axios";

function Cart(props) {
  const [cart, setCart] = useState({});
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get(`https://mealdeal.herokuapp.com/cart/1`).then((respnse) => {
      setCart(respnse.data);
      setItems(respnse.data.items);
    });
  }, []);

  console.log(cart);

  const handleQuant = async (index, add) => {
    console.log(cart.items[index]);
    let total = cart.totalPrice;
    if (add) {
      items[index].quantity += 1;
      total += items[index].price;
    } else {
      items[index].quantity -= 1;
      total -= items[index].price;
      if (items[index].quantity === 0) {
        items.splice(index, 1);
      }
    }
    let newCartItems = { ...cart, items: items };
    let newCart = { ...newCartItems, totalPrice: total };
    setCart(newCart);
    await fetch(`http://mealdeal.herokuapp.com/cart/add/${cart.userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cart),
    });
  };

  return (
    <div className="container">
      {items.length > 0 ? (
        <>
          <div className="row mt-3">
            <h3 className="mb-4">Ordering from {cart.vendorName}</h3>
            <div className="col-md-12 col-lg-12 col-sm-12">
              <div className="card shadow-sm">
                <div className="card--body">
                  <div className="card-content">
                    <Table className="table">
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
                              <Button
                                className="reduce--quantity-btn"
                                variant="outline-danger"
                                size="lg"
                                onClick={() => handleQuant(index, false)}
                              >
                                -
                              </Button>
                              {item.quantity}
                              <Button
                              className="increase--quantity-btn"
                                variant="outline-success"
                                size="lg"
                                onClick={() => handleQuant(index, true)}
                              >
                                +
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                    <h5>Total: ${cart.totalPrice}</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>          
        </>
      ) : (
        <div className="row mt-3">
           <h3 className="mb-4">Your Cart is Empty !!</h3>
        </div>
      )}
    </div>
  );
}

export default Cart;
