import React, { useContext } from 'react';
import MainContext from '../../context/context';

const Cart = ({ item }) => {
    const { cartBasket, setCartBasket } = useContext(MainContext);

    // Sepete ürün ekleme fonksiyonu
    const addBasket = () => {
        const existingItem = cartBasket.find((el) => el.item.id === item.id);

        if (existingItem) {
            // Sepette zaten mevcut olan ürünü güncelle
            const updatedCartBasket = cartBasket.map((el) =>
                el.item.id === item.id ? { ...el, count: el.count + 1 } : el
            );
            setCartBasket(updatedCartBasket);
            localStorage.setItem('cart', JSON.stringify(updatedCartBasket));
        } else {
            // Sepete yeni bir ürün ekleme
            const newBasketItem = {
                count: 1,
                item: item
            };
            const updatedCartBasket = [...cartBasket, newBasketItem];
            setCartBasket(updatedCartBasket);
            localStorage.setItem('cart', JSON.stringify(updatedCartBasket));
        }
    };

    return (
        <div className='col-3 pl-5 pr-5 '>
            <div className="Home__page__content__cards__card">
                <img src={item.img} alt={item.title} />
                <div className="Home__page__content__cards__card__info">
                    <h3>{item.title}</h3>
                    {item.rating ? <span>{item.rating}</span> : ''}
                    <p>{item.price}</p>
                </div>
                <div className="Home__page__content__cards__card__button">
                    <button onClick={addBasket}>Shop Now</button>
                </div>
                {item.sale ? <span className='sale'>Sale</span> : ''}
            </div>
        </div>
    );
};

export default Cart;
