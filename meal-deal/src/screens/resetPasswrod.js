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
    <div className="d-flex justify-content-center align-items-center">
      <div className="container">
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col-lg-3 col-md-3 card p-4 shadow-sm">
          <h5 className="card-title mb-4 text-center">Reset Password</h5>
            <form onSubmit={handleSubmit}>
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                className="form-control mb-2"
                placeholder="Email address"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
              {error && <div className="error">{error}</div>}
              {successMessage && (
                <div className="success">{successMessage}</div>
              )}
              <button className="btn btn-primary mt-3" type="submit">
                Reset Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
