import React, { useState } from 'react';
import '../styles/paymentScreen.css';

const PaymentForm = () => {
  const [cardDetails, setCardDetails] = useState('');
  const [cvv, setCvv] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform validation
    let errors = {};
    if (!cardDetails) {
      errors.cardDetails = 'Card details are required';
    }
    if (!cvv) {
      errors.cvv = 'CVV is required';
    }
    if (!expiryDate) {
      errors.expiryDate = 'Expiry date is required';
    }
    if (!deliveryAddress) {
      errors.deliveryAddress = 'Delivery address is required';
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
      alert('Payment Successful!');
      // Code to submit form goes here
    }
  };

  return (
    <div className="PaymentForm">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="cardDetails">Card Details</label>
          <input
            type="text"
            id="cardDetails"
            value={cardDetails}
            onChange={(e) => setCardDetails(e.target.value)}
          />
          {errors.cardDetails && <span className="error">{errors.cardDetails}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="cvv">CVV</label>
          <input
            type="text"
            id="cvv"
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
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
          />
          {errors.expiryDate && <span className="error">{errors.expiryDate}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="deliveryAddress">Delivery Address</label>
          <input
            type="text"
            id="deliveryAddress"
            value={deliveryAddress}
            onChange={(e) => setDeliveryAddress(e.target.value)}
          />
          {errors.deliveryAddress && <span className="error">{errors.deliveryAddress}</span>}
        </div>
        <button type="submit">Pay</button>
      </form>
    </div>
  );
};

export default PaymentForm;
