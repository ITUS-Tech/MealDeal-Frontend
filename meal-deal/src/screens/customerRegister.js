import React, { useState } from 'react';
import { Link } from "react-router-dom";
import '../styles/signup.css'
import FormInput from "../common/formInput";


function SignupForm() {
  const [fname, setFName] = useState('');
  const [lname, setLName] = useState('');
  const [phno, setPhno] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [type, setType] = useState('');

  
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    const validateEmail = (email) => {
      // Regex to validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };
  
    const validatePhone = (phno) => {
      // Regex to validate phone number format
      const phoneRegex = /^\d{10}$/;
      return phoneRegex.test(phno);
    };
  
      // Validate first name
      if (!fname) {
        setErrorMessage('Please enter your first name.');
        return;
      }
  
      // Validate last name
      if (!lname) {
        setErrorMessage('Please enter your last name.');
        return;
      }

      // Validate phone number
    if (!validatePhone(phno)) {
      setErrorMessage('Please enter a valid 10-digit phone number.');
      return;
    }

    // Validate email
    if (!validateEmail(email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    // if (!address(address)) {
    //   setErrorMessage('Please enter your Address.');
    //   return;
    // }

    if (!type) {
      setErrorMessage('Account type is required');
      return;
    }

    // Validate password
    if (password.length < 8) {
      setErrorMessage('Password must be at least 8 characters.');
      return;
    }

    // Check if password and confirm password match
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    const formData = {
      fname,
      lname,
      phno,
      email,
      address,
      type,
      password,
      confirmPassword
    };

     try {
       await fetch('http://localhost:8080/register', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json'
         },
         body: JSON.stringify(formData)
       }).then((response) => {
        if (response.ok) {
         return response.json();
        } else {
          setErrorMessage('Wrong with response!');
        }
       }).then((res) => {
        console.log(res.id, res.name);
        localStorage.setItem('userId', res.id);
          window.location.href = '/';
       });
     } catch (error) {
       setErrorMessage('Something went wrong, please try again later.');
     }
  };

  return (
    <div className='class login-card'>
    <h5 className="card-title m-3 text-center">Customer Register</h5>
    <form onSubmit={handleSubmit}>
      
      <FormInput
        value={fname}
        type="text"
        id="fname"
        name="First name"
        onChange={(event) => setFName(event.target.value)} required
      />
      <FormInput
        value={lname}
        type="text"
        id="lname"
        name="Last name"
        onChange={(event) => setLName(event.target.value)} required 
        />
      <FormInput
        value={phno}
        type="text"
        id="phno"
        name="Phone number"
        onChange={(event) => setPhno(event.target.value)} required 
        />
      <FormInput
        value={email}
        type="email"
        id="email"
        name="Email address"
        onChange={(event) => setEmail(event.target.value)} required 
        />
        <FormInput
        value={address}
        type="text"
        id="address"
        name="Address"
        onChange={(event) => setAddress(event.target.value)} required 
        />
      <div className='form-group'>
        <h6>Role:</h6>
        <div className='side-by-side'>
        <label htmlFor="vendor">Customer</label>&nbsp;&nbsp;
          <input class="form-check-input" type="radio" name="role" value="customer" checked={type === 'customer'} onChange={(event) => setType(event.target.value)} required />
        &nbsp;&nbsp;<label htmlFor="customer">Vendor</label>&nbsp;&nbsp;
          <input class="form-check-input" type="radio" name="role" value="vendor" checked={type === 'vendor'} onChange={(event) => setType(event.target.value)} required />
        </div>
      </div>
      <FormInput
            value={password}
            type="password"
            id="password"
            name="Password"
            onChange={(event) => setPassword(event.target.value)} required 
            />
      <FormInput
            value={confirmPassword}
            type="password"
            id="confirmPassword"
            name="Confirm Password"
            onChange={(event) => setConfirmPassword(event.target.value)} required 
            />
      {errorMessage && <div>{errorMessage}</div>}
      <button className='btn btn-primary d-flex' type="submit">Sign Up</button>
          <h6 className="card-title mt-3">
            <center>
            Already Registered?{" "}
            <Link className="pointer" to="/customer/login">
              Login
            </Link>
            </center>
          </h6>
    </form>
    </div>
  );
}
export default SignupForm;
