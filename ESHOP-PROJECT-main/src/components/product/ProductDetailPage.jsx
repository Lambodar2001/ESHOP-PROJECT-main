import React, { useState, useEffect } from 'react';
import Header from '../../common/Header/Header';
import { Button } from '@mui/material';
import { CardActionArea } from '@mui/material';
import { Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import { Box, IconButton } from '@mui/material';
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

export default function ProductDetailPage(props) {

  const { id } = useParams();

  const [product, setProduct] = useState([]);

  useEffect(() => {
    fetchProduct(`${id}`);
  }, [id])

  const fetchProduct = (id) => {
    fetch(`http://localhost:3001/api/v1/products/${id}`, {
      method: 'GET',
      headers: { 'content-type': 'application/json' },
    })
      .then((response) => response.json())
      .then((data) => {
        setProduct(data);
      })
      .catch((err) => {
        console.log("Error fetching product details", err);
      });
  }


  if (!product) {
    return <div><Header />Loading...</div>;
  }

  return (
    <div>
      <Header />
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
              <Link to={`/createorder-page/${id}`}><Button size="small" variant="contained" color="primary" >
                continue
              </Button></Link>
            </Box>
            <IconButton onClick={props.onEdit}>Edit</IconButton>
            <IconButton onClick={props.onDelete}>
              Delete
            </IconButton>
          </CardActions>
        </Card>
      </div>
    </div>
  );
}

