import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

const Products = () => {
  const navStyle = ({isActive}) =>{
    return{
      color : isActive ? '#6c7ae0' : '',
      position : isActive ? 'relative' : '',
    }
  }
  const [datas, setData] = useState([]);
  function load(){
    axios.post("http://localhost:8081/product/list", {data:{pcid:""}}).then((res)=>{
      setData(res.data.data);
    })
  }
  function deleteproduct(e, id){
    e.preventDefault();
    axios.post("http://localhost:8081/product/delete", {data:{id:id}}).then((res)=>{
      load();
    })
  }
  useEffect(()=>{
    load();
    },[])
  
  return (
   <div>
      <div className='container mt-5'>
       <div className='breadcrumbs'>
        <p className='bread'>
          <span> <NavLink style={navStyle}  to="/admin"> Admin </NavLink></span>/
          <span>Categories</span> 
          </p>
      </div>
      <h1>Products</h1>
      <div className='text-right'>
      <Link to="/admin/product" className='btn btn-primary my-2'>Add Product</Link>
      </div>
      <table className='table table-bordered table-stripped'>
        <tr>
          <th>Action</th>
          <th>No.</th>
          <th>Name</th>
          <th>Image</th>
          <th>Varieties</th>
        </tr>
        {
          datas.map((data)=>{
            return(
              <>
              <tr>
                <td>
                <button><NavLink  to={"/admin/product/" + data._id } className='btn btn-primary' style={{ margin : "2px", backgroundColor:'primary'}}>Edit</NavLink></button>
                <NavLink to={"#"} onClick={(e)=>deleteproduct(e,data._id)} className='btn-danger' style={{ margin : "2px", backgroundColor:'danger'}}>Delete</NavLink>
                </td>
                <td>{data._id}</td>             
                <td>{data.name}</td>
                <td><img src={ "http://localhost:8081/" +data.imagepath} style={{ height:'80px' }} /></td>
                <td>
                  <button><Link className='btn btn-warning' to={"/administrator/product/varieties/" + data._id }>{data.varieties.length}</Link></button>
                </td>
                {/* <td><img src={ "http://localhost:8081/" + data.imagepath} style={{height:'70px'}} /></td> */}
              </tr>
              </>
            )
          })
        }
        </table>
     </div>
    </div>
  )
}

export default Products
