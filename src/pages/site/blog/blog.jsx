import React, { useContext, useEffect, useState } from 'react'
import MainContext from '../../../context/context';
import './blog.scss'
import axios from 'axios';
const Blog = () => {
    const {   loading, setLoading } = useContext(MainContext);
    const [blog,setBlog]=useState([])
    useEffect(() => {
      setLoading(true);
      axios.get('http://localhost:3000/Blog')
        .then(res => {
            setBlog(res.data);
            console.log(res.data)
          setLoading(false);
        })
        .catch(err => {
          console.log(err);
          setLoading(false);
        });
    }, [setLoading]);
  return (
        <div className='container'>
            
             {blog.map(item => (
                            <div key={item.id} className="blog-main row mb-4">
                           <div className="col-6">
                           <div className="blog">{item.Title}</div>        
                            <div className="blog">{item.subtitle}</div>  
                            <div className="blog">{item.Description}</div>  
                            <div className="blog">{item.CreateTime}</div>  
                            <div className="blog">{item.Viuse}</div>  
                            
                           </div>
                           <div className="col-6">
                            <img width={"400px"} height={"400px"} src={item.Image} alt="" />
                           </div>
                            </div>        
            ))}
        </div>
  )
}

export default Blog