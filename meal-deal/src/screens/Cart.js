import React, { useState, useEffect } from "react";
// import { getCart } from "../services/cartService";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

import "../styles/auth.css";
import axios from "axios";

function Cart(props) {
  const navigate = useNavigate();
  const { userId, isLoggedIn, isCustomer } = props.user();
  const [cart, setCart] = useState({});
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
      .get(`https://mealdeal.herokuapp.com/cart/${userId}`)
      .then((respnse) => {
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
    await fetch(`http://mealdeal.herokuapp.com/cart/add/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cart),
    });
  };

  const handlePayment = async () => {
    let order = {
      userId: userId,
      vendorId: cart.vendorId,
      VendorName: cart.vendorName,
      plans: items,
      totalAmount: cart.totalPrice,
    };
    await fetch(`http://mealdeal.herokuapp.com/order/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    }).then((resonse) => {
      navigate(`/payment/${resonse.json()}`);
    });
  };

  return (
    <div className="container">
      <div className="row mt-3">
        {items.length > 0 ? (
          <div className="row">
            <h3 className="mb-4">Ordering from {cart.vendorName}</h3>
            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <div className="card shadow-sm">
                <div className="card--body">
                  <div className="card-content">
                    <Table>
                      <thead>
                        <tr>
                          <th className="align-middle">Subscription</th>
                          <th className="text-right align-middle">Price</th>
                          <th className="text-center">Quantity</th>
                        </tr>
                      </thead>
                      <tbody>
                        {items.map((item, index) => (
                          <tr>
                            <td className="align-middle">
                              {item.subscription}
                            </td>
                            <td className="text-right align-middle">
                              ${item.price}
                            </td>
                            <td className="text-center">
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
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-md-2 col-sm-12 col-xs-12">
              <div className="shadow-sm total--card">
                <div className="card-content">
                  <h5 className="text-center">Total: ${cart.totalPrice}</h5>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <h3 className="mb-4">Your Cart is Empty !!</h3>
        )}
      </div>
    </div>
  );
}

export default Cart;
