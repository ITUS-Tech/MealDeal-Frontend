import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/login.css";

const CheckOTP = () => {
  const [error, setError] = useState(null);
  const [otp, setOtp] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate= useNavigate()
  const delay = ms => new Promise(
    resolve => setTimeout(resolve, ms)
  );
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!otp) {
      setError("A 6 digit OTP is required.");
      setSuccessMessage(null);
    } else if (!otp.length===6) {
      setError("Please enter a 6 digit OTP.");
      setSuccessMessage(null);
    } else {
      let forgotEmail= localStorage.getItem("forgotEmail");
      let body={
        email: forgotEmail,
        otp
      }
      await fetch(`https://mealdeal.herokuapp.com/check`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }).then(res => res.json()).then( async (data) =>{
        if(data===0){
            setSuccessMessage("OTP Verified !");
            setError(null);
            await delay(2000);
            navigate("/reset");
        }
      });
      
    }
  };

  return (
    <div className="login-card">
      <h1>Verify OTP</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="otp">Email Address</label>
        <input
          type="text"
          id="otp"
          value={otp}
          onChange={(event) => setOtp(event.target.value)}
        />
        {error && <div className="error">{error}</div>}
        {successMessage && <div className="success">{successMessage}</div>}
        <button className="btn btn-primary mx-auto" type="submit">Confirm OTP</button>
      </form>
    </div>
  );
};

export default CheckOTP;
