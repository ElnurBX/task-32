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
        const { count, ratings } = details.rating;
        const newCount = count + 1;
        const newRatings = [...ratings, number];
        const dataRet = {
            count: newCount,
            ratings: newRatings
        };
        setTimeout(() => {
            axios.put(`http://localhost:3000/products/${id}`, { ...details, rating: dataRet })
                .then(res => setDetails(res.data))
                .catch(err => console.log(err));
        }, 200);
    };
    
    const renderRatingStars = () => {
        let stars = [];
        if (details.rating && details.rating.count) {
            const totalRatings = details.rating.count;
            const averageRating = totalRatings > 0 ? details.rating.ratings.reduce((a, b) => a + b, 0) / totalRatings : 0;
            for (let index = 0; index < Math.round(averageRating); index++) {
                stars.push(<i key={index} className="fa-solid fa-star"></i>);
            }
            stars.push(<span className='pl-5 '>    (  {details.rating.count})</span>)
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
