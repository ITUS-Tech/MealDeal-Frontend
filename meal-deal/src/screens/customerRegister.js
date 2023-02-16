import React, { useState } from 'react';
import '../styles/signup.css'


function SignupForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [accountType, setAccountType] = useState('');

  
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
  
    const validatePhone = (phone) => {
      // Regex to validate phone number format
      const phoneRegex = /^\d{10}$/;
      return phoneRegex.test(phone);
    };
  
      // Validate first name
      if (!firstName) {
        setErrorMessage('Please enter your first name.');
        return;
      }
  
      // Validate last name
      if (!lastName) {
        setErrorMessage('Please enter your last name.');
        return;
      }

      // Validate phone number
    if (!validatePhone(phone)) {
      setErrorMessage('Please enter a valid 10-digit phone number.');
      return;
    }

    // Validate email
    if (!validateEmail(email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    if (!accountType) {
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
      firstName,
      lastName,
      phone,
      email,
      accountType,
      password,
      confirmPassword
    };

     try {
       const response = await fetch('http://localhost:49840/customer/register', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json'
         },
         body: JSON.stringify(formData)
       });

       if (response.ok) {
         // Sign up successful, redirect to home page
         window.location.href = '/';
       } else {
         setErrorMessage('Something went wrong, please try again later.');
       }
     } catch (error) {
       setErrorMessage('Something went wrong, please try again later.');
     }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div  className='body'>
        <label htmlFor="firstName">First Name:</label>
        <input type="text" id="firstName" value={firstName} onChange={(event) => setFirstName(event.target.value)} required />
      </div>
      <div>
        <label htmlFor="lastName">Last Name:</label>
        <input type="text" id="lastName" value={lastName} onChange={(event) => setLastName(event.target.value)} required />
      </div>
      <div>
        <label htmlFor="phone">Phone No:</label>
        <input type="text" id="phone" value={phone} onChange={(event) => setPhone(event.target.value)} required />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
      </div>
      <div>
          <label>Role:</label>
          <div>
          <label htmlFor="vendor">Vendor</label>
            <input type="radio" name="role" value="customer" checked={accountType === 'customer'} onChange={(event) => setAccountType(event.target.value)} required />
            <label htmlFor="customer">Customer</label>
            <input type="radio" name="role" value="vendor" checked={accountType === 'vendor'} onChange={(event) => setAccountType(event.target.value)} required />
          </div>
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" value={password} onChange={(event) => setPassword(event.target.value)} required />
      </div>
      <div>
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input type="password" id="confirmPassword" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} required />
      </div>
      {errorMessage && <div>{errorMessage}</div>}
      <button type="submit">Sign Up</button>
    </form>
  );
}
export default SignupForm;
