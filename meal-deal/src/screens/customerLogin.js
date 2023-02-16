import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "../styles/login.css"
import FormInput from "../common/formInput";


function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  function handleLogin(event) {
    event.preventDefault();
    // Add code here to handle the login attempt
  }

  return (
    <div className='card form-card shadow-lg'>
      <form onSubmit={handleLogin}>
      <h5 className="card-title mb-5">Customer Login</h5>
      <FormInput
              value={email}
              type="text"
              name="Email"
              onChange={event => setEmail(event.target.value)}
            />
        <FormInput
              value={password}
              type="password"
              name="Password"
              onChange={event => setPassword(event.target.value)}
            />
        <button type="submit">Login</button>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </form>
      <p><center>Don't have an account?</center></p>
      <h6 className="message">
        <center>
              Not a Customer?{" "}
              <Link className="pointer" to="/tiffin-vendor/login">
                Tiffin Vendor
              </Link>
              </center>
            </h6>
            <h6 className="message">
              <center>
              Not Registered?{" "}
              <Link className="pointer" to="/customer/register">
                Register
              </Link>
              </center>
            </h6>
    </div>
  );
}

export default LoginPage;
