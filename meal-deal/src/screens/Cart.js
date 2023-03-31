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
<<<<<<< HEAD
    if(!isCustomer){
      alert("Please login to access cart");
      navigate("/customer/login");
    }
    else{
      axios.get(`https://mealdeal.herokuapp.com/cart/${userId}`)
      .then((respnse) => {
        setCart(respnse.data);
        setItems(respnse.data.items);
      })
  }}, []);
  
=======
    axios
      .get(`https://mealdeal.herokuapp.com/cart/${userId}`)
      .then((respnse) => {
        setCart(respnse.data);
        setItems(respnse.data.items);
      });
  }, []);

>>>>>>> main
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
    await fetch(`http://mealdeal.herokuapp.com/cart/edit/${userId}`, {
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
      vendorName: cart.vendorName,
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
      {items.length > 0 ? (
        <div className="mt-3">
          <h3 className="mb-4 page--title">Ordering from {cart.vendorName}</h3>
          <div className="card shadow-sm">
            <div className="card-content">
              <div className="row">
                <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12">
                  <div className="vendor-subscription--card">
                    <h5 className="mb-4 text-center">Shopping cart</h5>
                    <Table className="table mt-5">
                      <thead>
                        <tr>
                          <th className="text-center">Subscription</th>
                          <th className="text-right">Price</th>
                          <th className="text-center">Starts on</th>
                          <th className="text-center">Ends on</th>
                          <th className="text-center">Quantity</th>
                        </tr>
                      </thead>
                      <tbody>
                        {items.map((item, index) => (
                          <tr>
                            <td className="text-center">{item.subscription}</td>
                            <td className="text-right">${item.price}</td>
                            <td className="text-center">{item.startDate}</td>
                            <td className="text-center">{item.endDate}</td>
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
                <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                  
                    <h5 className="mb-4 text-center">Cart total</h5>
                    <table className="table mt-5">
                      <tbody>
                        <tr>
                          <td>
                            <b>Total</b>
                          </td>
                          <td className="text-right">
                            <b>${cart.totalPrice}</b>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="text-right">
                      <Button onClick={handlePayment}>Proceed to Pay</Button>
                    </div>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="row mt-3">
          <h3 className="mb-4">Your Cart is Empty !!</h3>
        </div>
      )}
    </div>
  );
}

export default Cart;
