import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/login.css";
import FormInput from "../common/formInput";

function LoginPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    const validateEmail = (email) => {
      // Regex to validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    if (!validateEmail(email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    const formData = { email, password };

    try {
      console.log(formData);
      await fetch("http://mealdeal.herokuapp.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            setErrorMessage("Wrong with response!");
          }
        })
        .then((res) => {
          console.log(res);
          localStorage.setItem("userId", res);
          localStorage.setItem("isCustomer", true);
          window.location.href = "/";
        });
    } catch (error) {
      setErrorMessage("Something went wrong, please try again later.");
    }
  };

  return (
    <div className="bgImage">
      <div className="container">
        <div className="row">
        <div className="col-md-9 col-lg-9 col-sm-9">
            <p>Hello there</p>
          </div>
          <div className="col-lg-3 col-md-3 col-sm-3 card p-4">
            <form onSubmit={handleLogin}>
              <h5 className="card-title text-center mb-4">Customer Login</h5>

              <FormInput
                value={email}
                type="text"
                name="Email address"
                id="email"
                onChange={(event) => setEmail(event.target.value)}
              />

              <FormInput
                value={password}
                type="password"
                name="Password"
                id="password"
                onChange={(event) => setPassword(event.target.value)}
              />
              <button className="btn btn-primary mt-3" type="submit">
                Login
              </button>
              {errorMessage && (
                <div className="error-message">{errorMessage}</div>
              )}
            </form>
            <h6 className="message mt-3">
              <center>
                <Link to="/resetPassword">Forgot Password?</Link>
              </center>
            </h6>
            <h6 className="message mt-3">
              <center>
                Not a Customer?{" "}
                <Link className="pointer" to="/tiffin-vendor/login">
                  Tiffin Vendor
                </Link>
              </center>
            </h6>
            <h6 className="message mt-1">
              <center>
                Not Registered?{" "}
                <Link className="pointer" to="/customer/register">
                  Register
                </Link>
              </center>
            </h6>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;