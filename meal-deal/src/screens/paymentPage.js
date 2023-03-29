import React, { useState } from "react";
import "../styles/paymentScreen.css";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const PaymentForm = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [cardDetails, setCardDetails] = useState("");
  const [cvv, setCvv] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform validation
    let errors = {};
    if (!cardDetails) {
      errors.cardDetails = "Card details are required";
    }
    if (!cvv) {
      errors.cvv = "CVV is required";
    }
    if (!expiryDate) {
      errors.expiryDate = "Expiry date is required";
    }
    if (!deliveryAddress) {
      errors.deliveryAddress = "Delivery address is required";
    }
    // setErrors(errors);
    // if (Object.keys(errors).length === 0) {
    //     fetch('https://example.com/api/payment', {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json'
    //       },
    //       body: JSON.stringify({
    //         cardDetails,
    //         cvv,
    //         expiryDate,
    //         deliveryAddress
    //       })
    //     })
    // Submit form if there are no errors
    if (Object.keys(errors).length === 0) {
      alert("Payment Successful!");
      // Code to submit form goes here
      navigate(`/confirm/${params.id}`);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="container">
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12 card p-4">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="cardDetails">Card number</label>
                <input
                  type="text"
                  id="cardDetails"
                  className="form-control mb-2"
                  placeholder="Card number"
                  value={cardDetails}
                  onChange={(e) => setCardDetails(e.target.value)}
                />
                {errors.cardDetails && (
                  <span className="error">{errors.cardDetails}</span>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="cvv">CVV</label>
                <input
                  type="text"
                  id="cvv"
                  className="form-control mb-2"
                  placeholder="CVV"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                />
                {errors.cvv && <span className="error">{errors.cvv}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="expiryDate">Expiry Date</label>
                <input
                  type="text"
                  id="expiryDate"
                  className="form-control mb-2"
                  placeholder="Expiry Date"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                />
                {errors.expiryDate && (
                  <span className="error">{errors.expiryDate}</span>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="deliveryAddress">Delivery Address</label>
                <input
                  type="text"
                  id="deliveryAddress"
                  className="form-control mb-2"
                  placeholder="Delivery address"
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                />
                {errors.deliveryAddress && (
                  <span className="error">{errors.deliveryAddress}</span>
                )}
              </div>
              <button className="btn btn-primary mt-3" type="submit">
                Pay
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;
