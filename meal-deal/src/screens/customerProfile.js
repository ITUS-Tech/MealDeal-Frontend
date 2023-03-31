import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import "../styles/auth.css";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import ViewOrderHistory from "./viewOrderHistory";

function CustomerProfile(props) {
  const [user, setUser] = useState({});
  const [vendorDetails, setVendorDetails] = useState({});
  const [prices, setPrices] = useState({});
  const { userId, isLoggedIn, isCustomer } = props.user();

  useEffect(() => {
    fetch(`http://mealdeal.herokuapp.com/user/${userId}`)
      .then((response) => response.json())
      .then((data) => setUser(data));

    fetch(`http://mealdeal.herokuapp.com/vendor/${userId}`)
      .then((response) => response.json())
      .then((res) => {
        setVendorDetails(res);
        setPrices(res.prices);
        console.log(prices);
      });
  }, []);

  let navigate = useNavigate();

  return (
    <div className="container">
      <div className="mt-3">
        <h2 className="page--title mb-4">Your profile:</h2>
        <div className="card shadow-sm">
          <div className="card-content">
            {isLoggedIn && (
              <div className="row">
                <div className="col-sm-4">
                  <Table borderless>
                    <tbody>
                      <tr>
                        <td>
                          <b>First Name: </b>
                        </td>
                        <td>{user.fname}</td>
                      </tr>
                      <tr>
                        <td>
                          <b>Last Name: </b>
                        </td>
                        <td>{user.lname}</td>
                      </tr>
                      <tr>
                        <td>
                          <b>Email: </b>
                        </td>
                        <td>{user.email}</td>
                      </tr>
                      <tr>
                        <td>
                          <b>Address: </b>
                        </td>
                        <td>{user.address}</td>
                      </tr>
                      <tr>
                        <td>
                          <b>Phone: </b>
                        </td>
                        <td>{user.phno}</td>
                      </tr>
                    </tbody>
                  </Table>
                  <Button
                    variant="primary"
                    onClick={() => navigate("/editprofile")}
                  >
                    Edit Profile
                  </Button>
                </div>
                {isCustomer && (
                  <div className="col-md-4">
                    <ViewOrderHistory user={userId} />
                  </div>
                )}
                {!isCustomer && (
                  <div className="col-md-4 p-4 card">
                    <h2>Vendor Details:</h2>
                    <Table borderless>
                      <tbody>
                        <tr>
                          <td>
                            <b>Vendor Name: </b>
                          </td>
                          <td>{vendorDetails.vendorName}</td>
                        </tr>
                        <tr>
                          <td>
                            <b>Address: </b>
                          </td>
                          <td>{vendorDetails.address}</td>
                        </tr>
                        <tr>
                          <td>
                            <b>Image: </b>
                          </td>
                          <td>
                            <img
                              className="card-image vendor--card-img img-responsive"
                              src={vendorDetails.image}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <b>Menu: </b>
                          </td>
                          <td>
                            <pre>{vendorDetails.menu}</pre>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <b>Prices: </b>
                          </td>
                          <td>
                            {Object.keys(prices).map((key) => (
                              <p>
                                {key}: ${prices[key]}
                              </p>
                            ))}
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerProfile;
