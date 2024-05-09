import React,{useState,useEffect} from 'react'
import './dashboord.scss'
import axios from 'axios'
import { Link } from 'react-router-dom'
const Dashboard = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/products")
      .then((res) => setProducts(res.data))
      .catch((error) => console.error('Error fetching products:', error));
  }, [products]);
  const deletePost=(id)=>{
    axios.delete(`http://localhost:3000/products/${id}`).catch((error) => console.error('Error fetching products:', error));
  }
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
            <th scope="col">edit</th>
            <th scope="col">delete</th>
          </tr>
        </thead>
        <tbody>
        {products.map((product, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td><img src={product.img} width={"60px"} height={"50px"} alt="" /></td>
              <td>{product.title}</td>
              <td>{product.price}</td>
              <td>{product.sale ? "true" : "False"}</td>
              <td>{product.discount}</td>
              <td>{product.rating}</td>
              <td><Link to={`/admin/add/${product.id}`} > <button className='btn btn-primary'>edit</button>  </Link></td>
              <td><button className='btn btn-danger' onClick={()=>deletePost(product.id)}>delete</button></td>
              
            </tr>
          ))}        
        </tbody>
        </table>
    </div>
  )
}

export default Dashboard