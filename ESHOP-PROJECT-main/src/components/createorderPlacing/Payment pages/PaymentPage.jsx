import React, { useState } from 'react';
import './PaymentPage.css';

const PaymentPage = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCVV] = useState('');

  const handlePayment = () => {
    // Perform payment processing logic
    // You can replace this with your actual payment processing code or API call

    // Example: Display payment success message
    console.log('Payment successful');
  };

  const handleCardNumberChange = (e) => {
    setCardNumber(e.target.value);
  };

  const handleExpiryDateChange = (e) => {
    setExpiryDate(e.target.value);
  };

  const handleCVVChange = (e) => {
    setCVV(e.target.value);
  };

  return (
    <div className='paymentPage'>
      <h2>Payment Page</h2>
      <form onSubmit={handlePayment}>
        <div>
          <label htmlFor="cardNumber">Card Number:</label>
          <input type="text" id="cardNumber" placeholder='enter card number' value={cardNumber} onChange={handleCardNumberChange} style={{marginLeft: '10px'}} required/>
        </div>
        <div>
          <label htmlFor="expiryDate">Expiry Date:</label>
          <input type="text" id="expiryDate" placeholder='enter expiry date' value={expiryDate} onChange={handleExpiryDateChange} style={{marginLeft: '20px'}} required/>
        </div>
        <div>
          <label htmlFor="cvv">CVV:</label>
          <input type="text" id="cvv" placeholder='enter cvv' value={cvv} onChange={handleCVVChange} style={{marginLeft: '80px'}} required/>
        </div>
      </form>
    </div>
  );
};

export default PaymentPage;
