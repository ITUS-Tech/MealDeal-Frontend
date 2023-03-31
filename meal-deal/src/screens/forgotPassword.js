import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/login.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate= useNavigate()
  const delay = ms => new Promise(
    resolve => setTimeout(resolve, ms)
  );
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email) {
      setError("Email address is required.");
      setSuccessMessage(null);
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      setSuccessMessage(null);
    } else {
      await fetch(`https://mealdeal.herokuapp.com/forgot`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({email}),
      }).then(async () => {
          setSuccessMessage("Reset password link has been sent to your email if it exists.");
          setError(null);
          localStorage.setItem("forgotEmail",email);
          await delay(3000);
          navigate("/checkotp");
      });
      
    }


    // const msg = {
    //   to: email,
    //   from: 'your-email@example.com',
    //   subject: 'Reset your password',
    //   html: `<p>Click this <a href="https://your-app.com/reset-password/${email}">link</a> to reset your password.</p>`,
    // };
    
    // sgMail.send(msg)
    //   .then(() => {
    //     setSuccessMessage("Reset password link has been sent to your email.");
    //     setError(null);
    //   })
    //   .catch((error) => {
    //     setError("Failed to send reset password email. Please try again later.");
    //     setSuccessMessage(null);
    //   });
  };

  return (
    <div className="login-card">
      <h1>Forgot Password</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email Address</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        {error && <div className="error">{error}</div>}
        {successMessage && <div className="success">{successMessage}</div>}
        <button className="btn btn-primary mx-auto" type="submit">Send OTP</button>
      </form>
    </div>
  );
};

export default ForgotPassword;
