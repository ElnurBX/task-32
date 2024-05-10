import React, { useEffect, useState } from 'react';
import './details.scss';
import { useParams } from 'react-router';
import axios from 'axios';

const Details = () => {
    const { id } = useParams();
    const [details, setDetails] = useState({});
    
    useEffect(() => {
        axios.get(`http://localhost:3000/products/${id}`)
            .then(res => {
                setDetails(res.data);
                console.log(res.data);
            })
            .catch(err => console.log(err));
    }, [id]);
    
    const newReting = (number) => {
        setTimeout(() => {
            axios.put(`http://localhost:3000/products/${id}`, { ...details, rating: number })
                .then(res => setDetails(res.data))
                .catch(err => console.log(err));
        }, 200);
    };

    const renderRatingStars = () => {
        let stars = [];
        for (let index = 0; index < details.rating; index++) {
            stars.push(<i key={index} className="fa-solid fa-star"></i>);
        }
        return stars;
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-4">
                    <img src={details.img} width="100%" alt="" />
                </div>
                <div className="col-8">
                    <h3>{details.title}</h3>
                    <h3>
                        <del>{details.price}</del>
                    </h3>
                    <div>
                        Add Rating
                        <div className='addRating'>
                            <button type="button" onClick={() => newReting(1)}>
                                <i className="fa-regular fa-star"></i>
                            </button>
                            <button type="button" onClick={() => newReting(2)}>
                                <i className="fa-regular fa-star"></i>
                            </button>
                            <button type="button" onClick={() => newReting(3)}>
                                <i className="fa-regular fa-star"></i>
                            </button>
                            <button type="button" onClick={() => newReting(4)}>
                                <i className="fa-regular fa-star"></i>
                            </button>
                            <button type="button" onClick={() => newReting(5)}>
                                <i className="fa-regular fa-star"></i>
                            </button>
                        </div>
                    </div>
                    <div> {renderRatingStars()} </div>
                </div>
            </div>
        </div>
    );
};

export default Details;
