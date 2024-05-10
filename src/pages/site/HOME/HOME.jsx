import React, { useContext, useEffect, useState } from 'react';
import './Home.scss';
import Cart from '../../../components/cart/cart';
import axios from 'axios';
import MainContext from '../../../context/context';
import Loading from '../../loading/Loading';

const HOME = () => {
  const {  setCartBasket, loading, setLoading } = useContext(MainContext);
  const [showCart, setShowCart] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:3000/products')
      .then(res => {
        setShowCart(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }, [setLoading]);


  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCartBasket(JSON.parse(storedCart));
    }
  }, [setCartBasket]);

  return (
    <div className='Home__page '>
      <div className="Home__page__banner">
        <div className="container">
          <h1>Shop in style</h1>
          <h5>With this shop homepage template</h5>
        </div>
      </div>
      <div className="Home__page__content">
        <div className="container">
          <div className="Home__page__content__cards row">
            {loading ? (
              <Loading /> 
            ) : (
              showCart.map((item) => (
                <Cart key={item.id} item={item} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HOME;
