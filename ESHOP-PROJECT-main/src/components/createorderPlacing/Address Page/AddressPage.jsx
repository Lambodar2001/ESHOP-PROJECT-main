
import React, { useEffect, useState } from 'react';
import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import { Box } from '@mui/material';
import './AddressPage.css';
import { useNavigate } from 'react-router-dom';





const useStyles = {
    root: {
        width: 340,
        margin: 20,
    },
    media: {
        height: 200,
    },
    content: {
        height: 150,
        overflow: 'auto',
    },
};

export default function AddressPage() {

    const navigate = useNavigate();
    const [error, setError] = useState(null);

    const [addressData, setaddressData] = useState([{

        name : '',
        contactNumber : '',
        city : '',
        street : '',
        state: '',
        address: '',
        zipCode: ''
    }])

    var auth = localStorage.getItem('AUTH_TOKEN');
    console.log('token is=',auth);

    useEffect(() => {
        if(!auth) {
            navigate('/sign-in');
        }
        else{
            console.log("success");
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
   

    const saveAddress = () =>{
        
        fetch('http://localhost:3001/api/v1/addresses', {
            method:'POST',
            headers: {
                'Content-Type' : 'application/json',
                "Authorization": auth
            },
            body: JSON.stringify(addressData)
        }).then(response => response.json())
        .then((data) => {
            alert(`Success! Data saved with id:${data}`)
        }).catch((err)=>{
            setError(err);
        })
    }

    const handleInputChange = (e) => {
        setaddressData((prevData) =>({
            ...prevData,
            [e.target.name]: e.target.value,
        }))

    }

    return (
        <>
            <div className='form-container'>
                <Card className={useStyles.root}>
                        <CardContent className={useStyles.content}>
                            <Box display="flex" flexDirection='column' justifyContent="space-between" alignItems="center">
                                <Typography gutterBottom variant="h5" component="h2" fontWeight='bolder'>
                                   Fill Details
                                </Typography>
                                <form>
                                    <label htmlFor='name'>Name</label>
                                    <input type='text' name='name' value={addressData.name} placeholder='Enter your name'  onChange={handleInputChange} />
                                    <label htmlFor='contactNumber'>Contact No</label>
                                    <input type='text' name='contactNumber' value={addressData.contactNumber} placeholder='Enter your no...'  onChange={handleInputChange}/>
                                    <label htmlFor='street'>Street</label>
                                    <input type='text' name='street' value={addressData.street} placeholder='Enter your street' onChange={handleInputChange} />
                                    <label htmlFor='state'>State</label>
                                    <input type='text' name='state' value={addressData.state} placeholder='Enter your state' onChange={handleInputChange} />
                                    <label htmlFor='address'>Address</label>
                                    <input type='text' name='addres' value={addressData.address} placeholder='Enter your address' onChange={handleInputChange} />
                                    <label htmlFor='zipCode'>Postal Code</label>
                                    <input type='number' name='zipCode' value={addressData.zipCode} placeholder='Postal-code'  onChange={handleInputChange}/>
                                </form>
                                {error && <p>{error}</p>}
                            </Box>
                        </CardContent>
                    <CardActions>
                       <Button size = 'small' variant='containe' color="primary" onClick={saveAddress}>
                        Save
                       </Button>
                    </CardActions>
                </Card>
            </div>
        </>
    )
}
