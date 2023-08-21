

import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import { CardActionArea } from '@mui/material';
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import { Box } from '@mui/material';
import { Link, useParams } from 'react-router-dom';



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

export default function ItemPreview(props) {

    const { id } = useParams();    // get Id from URL
    const [product, setProduct] = useState([]);    //handle data from API call

    const [quantity, setQuantity] = useState(1);
    const [price, setPrice] = useState(product.price);
    const Buttons = styled.div`
       display: flex;
       justify-content: space-between;
      `
    const handleDecrease = () => {
        if (quantity === 1) {
            alert(`Hello,
                   Buy minimum 1 product!`)
        } else {
            setQuantity(quantity - 1);
            setPrice(price * (quantity - 1));
        }
    }

    const handleIncrease = () => {
        if (quantity === 5) {
            alert(`Hello,
            You Buy Maximum 5 product at a time!`)
        } else {
            setQuantity(quantity + 1);
            setPrice(price * (quantity + 1));
        }
    }

    const fetchSingleProduct = (id) => {

        fetch(`http://localhost:3001/api/v1/products/${id}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).then(response => response.json())
            .then((data) => {
                setProduct(data);
            }).catch((err) => {
                console.log("Error in fetching single Product", err);
            })
    }

    useEffect(() => {
        fetchSingleProduct(`${id}`)
    }, [id])

    return (
        <div className='main-containr'>
            <div className='card-containr'>
                <Card className={useStyles.root} key={product._id}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            alt={product.name}
                            style={{ height: 200 }}
                            src={product.imageURL}
                            title={product.name}
                        />
                        <CardContent className={useStyles.content}>
                            <Box display="flex" justifyContent="space-between" alignItems="center">
                                <Typography gutterBottom variant="h6" component="h2">
                                    {product.name}
                                </Typography>
                                <Typography gutterBottom variant="h6" component="h2">
                                    {"Rs. " + product.price}
                                </Typography>
                            </Box>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {product.description}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Buttons>
                            <Link to={`/product-details/${id}`}> <Button size="small" variant="contained" color="primary" >
                                Back
                            </Button></Link>
                            <div>
                                <button style={
                                    {
                                        background: 'red', color: '#fff', fontWeight: 'bolder', border: 'none', cursor: 'pointer', width: '35px', marginLeft: '120px'
                                    }
                                } onClick={handleDecrease}><i className="fa-sharp fa-solid fa-minus"></i></button>
                                <span style={
                                    { margin: 10, color: '#000', fontWeight: 'bold', fontSize: '20xp' }
                                }>{quantity}</span>
                                <button style={
                                    {
                                        background: 'green', color: '#fff', fontWeight: 'bolder', border: 'none', cursor: 'pointer', width: '35px'
                                    }
                                } onClick={handleIncrease}><i className="fa-sharp fa-solid fa-plus"></i></button>
                            </div>
                        </Buttons>
                    </CardActions>
                </Card>
            </div>
        </div>

    )
}
