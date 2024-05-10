import React, { useContext } from 'react';
import MainContext from '../../context/context';
import { Link } from 'react-router-dom';
const Cart = ({ item }) => {
    const { cartBasket, setCartBasket } = useContext(MainContext);

    
    const addBasket = () => {
        const existingItem = cartBasket.find((el) => el.item.id === item.id);

        if (existingItem) {
     
            const updatedCartBasket = cartBasket.map((el) =>
                el.item.id === item.id ? { ...el, count: el.count + 1 } : el
            );
            setCartBasket(updatedCartBasket);
            localStorage.setItem('cart', JSON.stringify(updatedCartBasket));
        } else {
           
            const newBasketItem = {
                count: 1,
                item: item
            };
            const updatedCartBasket = [...cartBasket, newBasketItem];
            setCartBasket(updatedCartBasket);
            localStorage.setItem('cart', JSON.stringify(updatedCartBasket));
        }
    };
    const renderRatingStars = () => {
        let stars = [];
        for (let index = 0; index < item.rating; index++) {
            stars.push(<i key={index} className="fa-solid fa-star"></i>);
        }
        return stars;
    };

    return (
        <div className='col-3 pl-5 pr-5 '>
            <div className="Home__page__content__cards__card">
                <img src={item.img} alt={item.title} />
                <div className="Home__page__content__cards__card__info">
                    <h3>{item.title}</h3>
                    {item.rating ? <span><div> {renderRatingStars()} </div></span> : ''}
                    <p>{item.price}</p>
                </div>
                <div className="Home__page__content__cards__card__button">
                    <button onClick={addBasket}>Shop Now</button>
                    <Link to={`details/${item.id}`}> <button >Details</button></Link>
                </div>
                {item.sale ? <span className='sale'>Sale</span> : ''}
            </div>
        </div>
    );
};

export default Cart;
