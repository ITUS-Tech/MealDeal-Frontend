import { useState } from "react";

import "../styles/login.css";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!email) {
      setError("Email address is required.");
      setSuccessMessage(null);
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      setSuccessMessage(null);
    } else {
      // send reset password link to the email
      // add your own code here to send the email
      setSuccessMessage("Reset password link has been sent to your email.");
      setError(null);
    }
  };

  return (
    <div className="login-card">
      <h1>Reset Password</h1>
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
        <button className="btn btn-primary mx-auto" type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default ResetPassword;
