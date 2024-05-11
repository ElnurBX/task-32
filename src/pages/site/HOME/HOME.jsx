import React, { useContext, useEffect, useState } from 'react';
import './Home.scss';
import Cart from '../../../components/cart/cart';
import axios from 'axios';
import MainContext from '../../../context/context';
import Loading from '../../loading/Loading';

const HOME = () => {
  const { setCartBasket, loading, setLoading } = useContext(MainContext);
  const [showCart, setShowCart] = useState([]);
  const [sortCart, setSortCart] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:3000/products')
      .then(res => {
        setShowCart(res.data);
        setSortCart(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }, [ setSortCart, setLoading]);

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCartBasket(JSON.parse(storedCart));
    }
  }, [setCartBasket]);

  const sortedCart = (value) => {
    let sortedProducts = [];
    switch (value) {
      case "A-Z":
        sortedProducts = [...showCart].sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "Z-A":
        sortedProducts = [...showCart].sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "Low-High":
        sortedProducts = [...showCart].sort((a, b) => a.price - b.price);
        break;
      case "High-Low":
        sortedProducts = [...showCart].sort((a, b) => b.price - a.price);
        break;
      case "Sale":
        sortedProducts = [...showCart].filter(product => product.sale === true);
        break;
      case "noSale":
        sortedProducts = [...showCart].filter(product => product.sale === false);
        break;
      case "default":
        sortedProducts = [...showCart]
        break;

      case "Star":
          sortedProducts = [...showCart].sort((a, b) => {
            const avgRatingA = a.rating.count > 0 ? a.rating.ratings.reduce((acc, cur) => acc + cur, 0) / a.rating.count : 0;
            const avgRatingB = b.rating.count > 0 ? b.rating.ratings.reduce((acc, cur) => acc + cur, 0) / b.rating.count : 0;
            return avgRatingB - avgRatingA;
          });
          break;
        
      default:
        sortedProducts = showCart;
    }
    setSortCart(sortedProducts);
  }
  const searchCart=(value)=>{
    const filteredProducts = [...showCart].filter(product => product.title.toLowerCase().includes(value.toLowerCase()));
    setSortCart(filteredProducts);
  }
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
          <div className="Home__page__Filter d-flex mb-5 mt-5">
            <div className="Home__page__Filter__sort col-3 ">
              <select name="" id="" onChange={(e) => sortedCart(e.target.value)}>
                <option value="default">Default</option>
                <option value="A-Z">A-Z</option>
                <option value="Z-A">Z-A</option>
                <option value="Low-High">Low-High</option>
                <option value="High-Low">High-Low</option>
                <option value="Sale">Sale</option>
                <option value="noSale">No Sale</option>
                <option value="Star">Star</option>
              </select>
            </div>
            <div className="Home__page__Filter__search ">
              <form action="">
                <input type="text" onChange={(e) => searchCart(e.target.value)} />
              </form>
            </div>
          </div>
          <div className="Home__page__content__cards row">
            {loading ? (
              <Loading />
            ) : (
              sortCart.map((item) => (<Cart key={item.id} item={item} />))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HOME;
