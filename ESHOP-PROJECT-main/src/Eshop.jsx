import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignInDialog from './common/Header/Dialog/SignInDialog';
import SignUpDialog from './common/Header/Dialog/SignUpDialog';
import ProductPage from './components/product/ProductPage';
import ProductDetailPage from './components/product/ProductDetailPage';
import Home from './components/Home/Home';
import CreateOrderPage from './components/createorderPlacing/CreateOrderPage';


export default function Eshop() {
  
  const onBuy = () => {
    console.log("buy clicked");
    //  setShowProductDetails(true);
  };

  const [product, setProduct] = useState([]);
 

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
  
  // const id = '63b8ad33fcd0f71d2493a816';
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/sign-in" element={<SignInDialog />} />
          <Route exact path="/sign-up" element={<SignUpDialog />} />
          <Route exact path="/product-page" element={<ProductPage onBuy={onBuy} productlist = {fetchProduct} state = {product} />} />
            <Route exact path="/product-details/:id" element={<ProductDetailPage />} />
            <Route exact path="/createorder-page/:id" element={<CreateOrderPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}



