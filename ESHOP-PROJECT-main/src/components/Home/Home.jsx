import React from 'react'
import Header from '../../common/Header/Header'
import { useNavigate } from 'react-router-dom';
import './Home.css';
export default function Home() {

  const navigate = useNavigate();



  const handleClick = () => {
    navigate('/sign-in');
  }
  return (
    <>
      <Header />
      <div className='container'>
        <div className='main'>
          <h1>Welcome to ESHOP</h1>
          <p><span onClick={handleClick}>Click here</span> to Shop</p>
        </div>
      </div>
    </>

  )
}



