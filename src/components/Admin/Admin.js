import React from 'react'
import { Outlet, useNavigate } from 'react-router';
import { NavLink } from 'react-router-dom';

const Admin = () => {
    const navStyle = ({isActive}) =>{
        return{
            color : isActive ? '#6c7ae0' : '',
            position : isActive ? 'relative' : '',
        }
    }
  let navigate = useNavigate();
  function logout(e){
    e.preventDefault();
    localStorage.clear();
    navigate("/");
  }
  return (
    <div className='mt-5'>
     <div className='container mt-5 py-2'>
        <div className="container-fluid">

        <div className="row my-3 ">
            <div className="col-lg-2 py-2" >
            <li><NavLink style={navStyle} className='nav-bar-link ' to="/admin/dashboard">Dashboard</NavLink></li>
			<li><NavLink style={navStyle} className='nav-bar-link' to="/admin/categories">Categories</NavLink></li>
			<li><NavLink style={navStyle} className='nav-bar-link' to="/admin/products">Products</NavLink></li>
		    <li className="cart"><NavLink style={navStyle} className='nav-bar-link' to="/admin/orders"> Orders</NavLink></li>
        <li><NavLink to='' onClick={(e)=>{logout(e)}}>Logout</NavLink></li>
            </div>
            <div className="col-lg-10">
             <Outlet/>
            </div>
        </div>
        
        </div>
    </div>
    </div>
  )
}

export default Admin
