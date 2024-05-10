import React, { useContext, useEffect, useState } from 'react';
import './Header.scss';
import { Link } from 'react-router-dom';
import MainContext from '../../../context/context';

const Header = () => {
    const [modal, setModal] = useState(false);
    const {cartBasket, setCartBasket} = useContext(MainContext); 

    const updateLocalStorage = (updatedCartBasket) => {
        localStorage.setItem('cart', JSON.stringify(updatedCartBasket));
        setCartBasket(updatedCartBasket);
    };

    const incricentCount = (id) => {
        const updatedCartBasket = cartBasket.map(item => {
            if (item.item.id === id) {
                return { ...item, count: item.count + 1 };
            }
            return item;
        });
        updateLocalStorage(updatedCartBasket);
    };

    const decricentCount = (id) => {
        const updatedCartBasket = cartBasket.map(item => {
            if (item.item.id === id) {
                if (item.count > 1) {
                    return { ...item, count: item.count - 1 };
                } else {
                    return null;
                }
            }
            return item;
        }).filter(item => item !== null);

        updateLocalStorage(updatedCartBasket);
    };

    return (
        <header className='header__site'>
            <div className="container">
                <div className="row">
                    <div className="col-2 header__site__logo">
                        <h1>Start Bootstrap</h1>
                    </div>
                    <div className="col-8 header__site__menu">
                        <nav>
                            <ul>
                                <li><Link to='/'>Home</Link></li>
                                <li><Link to='/'>About</Link></li>
                            </ul>
                        </nav>
                        <div className="dropdown">
                            <button className="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Shop
                            </button>
                            <ul className="dropdown-menu">
                                <li><Link className="dropdown-item" to="#">Action</Link></li>
                                <li><Link className="dropdown-item" to="#">Another action</Link></li>
                                <li><Link className="dropdown-item" to="#">Something else here</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-2 basket__logo">
                        <button onClick={() => setModal(!modal)}>
                            <i className="fa-solid fa-cart-shopping"></i>
                            Cart <span>{cartBasket.length}</span>
                        </button>
                        <div className={modal ? 'modal__basket active__basket' : 'modal__basket'}>
                            <ul>
                                {cartBasket.map(item => (
                                    <li key={item.item.id}>
                                        {item.item.title}
                                        <div className="counter">
                                            <button onClick={() => decricentCount(item.item.id)}> - </button>
                                            {item.count}
                                            <button onClick={() => incricentCount(item.item.id)}> + </button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
