import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import "../styles/auth.css";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

function CustomerProfile(props) {
  const [user, setUser] = useState({});
  const { userId, isLoggedIn, isCustomer } = props.user();
  fetch(`http://mealdeal.herokuapp.com/user/${userId}`)
    .then((response) => response.json())
    .then((data) => setUser(data));

  let navigate = useNavigate();

  return (
    <div className="container">
      <div className="row mt-3">
        <h3 className="mb-4">Your profile:</h3>
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card--body">
              <div className="card-content">
                <ul class="list-unstyled">
                  <li class="list-item text-muted">
                    First Name: <b>{user.fname}</b>
                  </li>
                  <li class="list-item text-muted">
                    Last Name: <b>{user.lname}</b>
                  </li>
                  <li class="list-item text-muted">
                    Email: <b>{user.email}</b>
                  </li>
                  <li class="list-item text-muted">
                    Address: <b>{user.address}</b>
                  </li>
                  <li class="list-item text-muted">
                    Phone: <b>{user.phno}</b>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="row">
            <div className="col-md-3">
              <Button
                className="mt-3 mb-3"
                variant="primary"
                onClick={() => navigate("/editprofile")}
              >
                Edit Profile
              </Button>
            </div>
            <div className="col-md-4">
              <Button
                className="mt-3 mb-3"
                variant="primary" onClick={() => navigate("/order-history")} 
              >
                View Past Orders
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerProfile;
