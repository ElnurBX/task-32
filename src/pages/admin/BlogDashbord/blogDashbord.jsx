import React, { useEffect, useState, useContext } from 'react';
import '../dashbord/dashboord.scss';
import axios from 'axios';
import Loading from '../../loading/Loading';
import MainContext from '../../../context/context';

const BlogDashboord = () => {
  const [Blog, setBlog] = useState([]);
  const { loading, setLoading } = useContext(MainContext);


  useEffect(() => {
    setLoading(true);
    axios.get("http://localhost:3000/Blog")
      .then((res) => {
        setBlog(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        setLoading(false);
      });
  }, [setLoading]);


  const deletePost = (id) => {
    axios.delete(`http://localhost:3000/Blog/${id}`)
      .then(() => {
        
        const updatedProducts = Blog.filter(product => product.id !== id);
        setBlog(updatedProducts);
      })
      .catch((error) => {
        console.error('Error deleting product:', error);
      });
  };

  return (
    <div className='dashboard'>
      <table className="table table-success table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">img</th>
            <th scope="col">title</th>
            <th scope="col">price</th>
            <th scope="col">sale</th>
            <th scope="col">discount</th>
            <th scope="col">star</th>
            <th scope="col">delete</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <Loading />
          ) : (
            Blog.map((Blog, index) => (
              <tr key={Blog.id}>
                <th scope="row">{index + 1}</th>
                <td><img src={Blog.Image} width={"60px"} height={"50px"} alt="" /></td>
                <td>{Blog.Title}</td>
                <td>{Blog.subtitle}</td>
                <td>{Blog.CreateTime}</td>
                <td>{Blog.Description}</td>
                <td>{Blog.Viuse}</td>
                <td>
                  <button className='btn btn-danger' onClick={() => deletePost(Blog.id)}>delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BlogDashboord;
