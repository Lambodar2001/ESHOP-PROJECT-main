import React, { useState } from 'react';
import { Stepper, Step, StepLabel, Button, Typography } from '@mui/material';
import { toast } from "react-toastify";
import Header from '../../common/Header/Header';
import ItemPreview from './ItemPreview';
import AddressPage from './Address Page/AddressPage';
import PaymentPage from './Payment pages/PaymentPage';





const CreateOrderPage = (props) => {
  const [activeStep, setActiveStep] = useState(0);
  const [address, setAddress] = React.useState("");

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleConfirmOrder = () => {
    // Perform API call to create the order
    // Use the /orders endpoint for order creation
    // You can replace the placeholder endpoint with your actual backend API endpoint
    fetch('http://localhost:3001/api/v1/orders', {
      method: 'POST',
      headers: {'Content-Type' : 'application/json',

    }

    })
      .then(data => {
        // Handle the API response as needed
        // Display the confirmation message
        toast.success(`Order placed successfully`);
        alert('Your order is confirmed.' + JSON.stringify(data));
      })
      .catch(error => {
        // Handle any errors that occurred during the API call
        console.log("sorry",error);
      });
  };
  function getSteps() {
    return ["Items", "Select Address", "Confirm Order"];
  }
  const step = getSteps();

  function getStepContent(activeStep, itemId, quantity, address, setAddress) {
    switch (activeStep) {
      case 0:
        return <ItemPreview id={itemId} quantity={quantity} />;
      case 1:
        return (
          <div>
            <Typography>Add Address: {address}</Typography>
            <AddressPage />

            {/* Add form or component for selecting address */}
            {/* Update the address state using setAddress */}
          </div>
        );
      case 2:
        return (
          <>
            <Typography>Payment</Typography>
            <PaymentPage />
          </>
        );
        case 3:
          return (
            <>
              <Typography>Payment</Typography>
              <ItemPreview />
              <AddressPage />
            </>
          );
      default:
        return 'Unknown step';
    }
  }


  return (
    <>
      <Header />
      <div style={{ marginTop: '30px' }}>

        <Stepper activeStep={activeStep}>
          {step.map((label, index) => (
            <Step key={index}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Typography>
          {getStepContent(activeStep, props.id, props.quantity, address, setAddress)}
        </Typography>
        <div>
          {activeStep !== 0 && (
            <Button onClick={() => setActiveStep(prevActiveStep => prevActiveStep - 1)}>Back</Button>
          )}
          {activeStep !== step.length - 1 ? (
            <Button variant="contained" color="primary" style={{ float: 'right', marginRight: '40px', padding: '10px' }} onClick={handleNext}>
             Next
            </Button>
          ) : (
            <Button variant="contained" color="primary" onClick={handleConfirmOrder}
              style={{ marginLeft: '85%' }}>
              Confirm Order
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default CreateOrderPage;