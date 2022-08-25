import React from 'react'
import { Link, NavLink } from 'react-router-dom'

const Products = () => {
  const navStyle = ({isActive}) =>{
    return{
      color : isActive ? '#6c7ae0' : '',
      position : isActive ? 'relative' : '',
    }
  }
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
    </div>
    </div>
  )
}

export default Products
