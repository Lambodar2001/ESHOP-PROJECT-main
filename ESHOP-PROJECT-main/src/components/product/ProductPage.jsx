import React, { useState, useEffect } from 'react';
import Header from '../../common/Header/Header';
import { CardActionArea } from '@mui/material';
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import { Box, IconButton } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
// import ProductDetailPage from './ProductDetailPage';

//import css file
import './ProductPage.css';

// Move useStyles object outside the component function
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

export default function ProductPage(props) {

  // Fetch data from api call
  const [product, setProduct] = useState([]);

  const [isloggedIn, setisLoggedIn] = useState(false);

  const navigate = useNavigate();
 
 

  const fetchProduct = () => {
    fetch('http://localhost:3001/api/v1/products', {
      method: 'GET',
      headers: { 'content-type': 'application/json' },
    })
      .then((response) => response.json())
      .then((data) => {
        setProduct(data);
      })
      .catch((err) => {
        console.log("Error fetching products", err);
      });
  };

  useEffect(() => {
     fetchProduct();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isloggedIn) {
       navigate('/product-page');
    }
  }, [navigate, isloggedIn]);
  
  const  handleLogOut = () => {
    setisLoggedIn(false);
     localStorage.removeItem('AUTH_TOKEN');
     navigate('/sign-in');
  }
  const  handleLogin = () => {
    setisLoggedIn(true);
  }

  return (
    <div>
      <Header isLogin={handleLogin} handleLogOut = {handleLogOut} />
        <div className='main-containr'>
        {product.length > 0 &&
          product.map((product) => (
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
                  <Box display="flex" width="100%" justifyContent="space-between" alignItems="center">
                      <Link to={`/product-details/${product._id}`}><Button size="small" variant="contained" color="primary" >
                        Buy
                      </Button></Link>
                  </Box>
                  <IconButton onClick={props.onEdit}>Edit</IconButton>
                  <IconButton onClick={props.onDelete}>
                    Delete
                  </IconButton>
                </CardActions>
              </Card>
            </div>
          ))}
      </div>
    </div>
  );
}
