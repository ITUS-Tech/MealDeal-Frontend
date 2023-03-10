import React, { useState } from "react";
import Table from 'react-bootstrap/Table';
import "../styles/auth.css";
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";

function CustomerProfile(props) {
  
  const [user, setUser] = useState({});
  fetch("http://mealdeal.herokuapp.com/user/1")
  .then((response) => response.json())
  .then((data) => setUser(data));

  let navigate = useNavigate();

  return (
    <div className="container">
      <h2>Your profile:</h2>
      <Table borderless>
      <tbody>
        <tr>
        <td><b>First Name: </b></td>
        <td>{user.fname}</td>
        </tr>
        <tr>
        <td><b>Last Name: </b></td>
        <td>{user.lname}</td>
        </tr>
        <tr>
        <td><b>Email: </b></td>
        <td>{user.email}</td>
        </tr>
        <tr>
        <td><b>Address: </b></td>
        <td>{user.address}</td>
        </tr>
        <tr>
        <td><b>Phone: </b></td>
        <td>{user.phno}</td>
        </tr>
        <tr>
          <center>
            <Button variant="primary" onClick={() => navigate('/editprofile')}>Edit Profile</Button>
          </center>
        </tr>
        <tr>
          <center>
            <Button variant="primary" /* onClick={() => navigate('/')} */>View Past Orders</Button>
          </center>
        </tr>
      </tbody>
      </Table>
    </div>
  );
}

export default CustomerProfile;