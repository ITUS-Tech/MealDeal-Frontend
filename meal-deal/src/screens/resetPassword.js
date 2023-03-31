import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/login.css";

const ResetPassword = () => {
  const [error, setError] = useState(null);
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate= useNavigate()
  const delay = ms => new Promise(
    resolve => setTimeout(resolve, ms)
  );
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!password) {
      setError("Password is required!");
      setSuccessMessage(null);
    } else if (password.length<8) {
      setError("Password should be atleast 8 characters!");
      setSuccessMessage(null);
    } else if(password!==password2) {
      setError("Passwords should match!");
      setSuccessMessage(null);
    } else {
      let forgotEmail= localStorage.getItem("forgotEmail");
      let body={
        email: forgotEmail,
        password
      }
      await fetch(`https://mealdeal.herokuapp.com/reset`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }).then(async () => {
        setSuccessMessage("Password changed!");
        setError(null);
        localStorage.removeItem("forgotEmail");
        await delay(2000);
        navigate("/customer/login");
      });
      
    }
  };

  return (
    <div className="login-card">
      <h1>Verify OTP</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <label htmlFor="password2">Repeat Password</label>
        <input
          type="password"
          id="password2"
          value={password2}
          onChange={(event) => setPassword2(event.target.value)}
        />
        {error && <div className="error">{error}</div>}
        {successMessage && <div className="success">{successMessage}</div>}
        <button className="btn btn-primary mx-auto" type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default ResetPassword;
