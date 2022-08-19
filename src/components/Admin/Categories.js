import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

const Categories = () => {
  const navStyle = ({isActive}) =>{
    return{
      color : isActive ? '#6c7ae0' : '',
      position : isActive ? 'relative' : '',
    }
  }
  const [categories, setCategories] = useState([]);
   function load(){
    axios.post("http://localhost:8081/productcategory/list").then((res)=>{setCategories(res.data.data); console.log(res.data)})
   }

  useEffect((e)=>{
    load();
  },[])

  function deleteCategory(e,id){
    e.preventDefault();
    axios.post("http://localhost:8081/productcategory/get",{data:{id:id}}).then(res=>load())
  }

  return (
    <div className='container'>
       <div className='breadcrumbs'>
        <p className='bread'>
          <span> <NavLink style={navStyle}  to="/admin"> Admin </NavLink></span>/
          <span>Categories</span> 
          </p>
      </div>
      <h1>Categories</h1>
      <div className='text-right'>
      <Link to="/admin/category" className='btn btn-primary'>Add Category</Link>
      </div>
      <table className='table table-bordered table-stripped'>
        <tr>
          <th>Action</th>
          <th>No.</th>
          <th>Name</th>
          <th>Image</th>
        </tr>
     
          {categories.map((d)=>{
            return(
              <>
              <tr>
              <td>
                <NavLink  to={"/admin/category/" + d._id } className='btn btn-primary' style={{ margin : "2px", backgroundColor:'primary'}}>Edit</NavLink>
                <NavLink to='' onClick={(e)=>deleteCategory(e,d._id)} className='btn-danger' style={{ margin : "2px", backgroundColor:'danger'}}>Delete</NavLink>              </td>
              <td>
                {d.srno}
              </td>
              <td>{d.name}</td>
              <td><img src={ "http://localhost:8081/" + d.imagepath} style={{height:'70px'}}/></td>
              </tr>
              </>
            )
          })}

      </table>

      
       
    </div>
  )
}

export default Categories;
