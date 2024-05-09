import React, { useEffect, useState } from 'react'
import './Home.scss'
import Cart from '../../../components/cart/cart';
import axios from 'axios';
import MainContext from "../../../context/context";
const HOME = () => {
  const [showCart, setShowCart] = useState([]);
  const [cartBasket, setCartBasket] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/products').then(res => setShowCart(res.data)).catch(err => console.log(err));
  },[showCart.length])
  useEffect(() => {
    setCartBasket(localStorage.getItem('cart')?JSON.parse(localStorage.getItem('cart')):[])
  },[cartBasket.length])
  return (
    <MainContext.Provider value={{setCartBasket, cartBasket}}>
    <div className='Home__page '>
      <div className="Home__page__banner">
        <div className="conrainer">
          <h1>Shop in style</h1>
          <h5>With this shop hompeage template</h5>
        </div>
      </div>
      <div className="Home__page__content">
        <div className="container">
          <div className="Home__page__content__cards row">
            {
              showCart.map((item) => <Cart key={item.id} item={item} />)
            }
          </div>
        </div>
      </div>
    </div>
    </MainContext.Provider>
  )
}

export default HOME