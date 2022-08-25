import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'

const Product = () => {
    let navigate = useNavigate();
    const navStyle = ({isActive}) =>{
        return{
          color : isActive ? '#6c7ae0' : '',
          position : isActive ? 'relative' : '',
        }
      }
      const [data, setData] = useState({
        id : '',
        pcid : '',
        name : '',
        description : '',
        specification : '',
        mrp : 0,
        price : 0,
        varieties : [],
        instock : 'Yes',
        isactive : 'Yes',
        image : ''
      })
      let [categories, setCategories] = useState([]);
      function handleChange(e){
        if(e.target.id === "image"){
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () =>{
              if(reader.result != null)
              {
                const newData = {...data};
                newData[e.target.id] = reader.result.toString();
                setData(newData);
              }
            }
        }
        else{
            const newData = {...data};
            newData[e.target.id] = e.target.value;
            setData(newData);
        }
      }

      function handleSubmit(e){
        axios.post("http://localhost:8081/product/save",{data:data}).then((res)=>{alert("Products entered successfull");navigate('/admin/products')})
      }
      useEffect(()=>{
        axios.post("http://localhost:8081/productcategory/list").then((res)=>{
          setCategories(res.data.data);
        })
      }, [])
  return (
    <div>
      <div className='container mt-5'>
       <div className='breadcrumbs'>
        <p className='bread'>
          <span> <NavLink style={navStyle}  to="/admin"> Admin </NavLink></span>/
          <span> <NavLink to='/admin/products'>Products </NavLink></span> / <span>Product</span>
          </p>
      </div>
      <h1 className='text-center'>Product</h1>
      <div className='container'>
        <div className='row'>
            <div className='col-lg-2'></div>
            <div className='col-lg-8'>
            <div className="form-group my-4">
                            <label htmlFor="name">Product Name</label>
                            <input type="text" className="form-control" value={data.name} onChange={(e)=>{handleChange(e)}}   id="name" aria-describedby="emailHelp" placeholder="Enter Product Name" />
                            <form>
                                <div className="form-group my-4">
                            <label htmlFor="pcid">Category</label>
                            <select className='form-control'onChange={(e)=>{handleChange(e)}} value={data.pcid} id='pcid'>
                                <option value=''>
                                    Category
                                </option> 
                                {
                                categories.map((category)=>{
                                    return(
                                        <option value={ category._id }>{ category.name }</option>
                                    )})
                               }      
                            </select>
                                <div className="form-group my-3">
                                    <label htmlFor="image">Image</label>
                                    <input type="file" accept="image/*" onChange={(e)=>{handleChange(e)}} className="form-control"  id="image" />
                                </div>
                                <div className='form-group my-4'>
                                <label htmlFor="description">Description</label>
                            <input type="text" className="form-control" value={data.description} onChange={(e)=>{handleChange(e)}}  id="description" aria-describedby="emailHelp" placeholder="Description" />
                            </div>
                            <div className='form-group my-4'>
                            <label htmlFor="specificatiion">Specification</label>
                            <input type="text" className="form-control " value={data.specification} onChange={(e)=>{handleChange(e)}}  id="specification" aria-describedby="emailHelp" placeholder="Specification" />
                            </div>
                            <div className='form-group my-4'>
                            <label htmlFor="name">Mrp</label>
                            <input type="text" className="form-control" value={data.mrp} onChange={(e)=>{handleChange(e)}}   id="mrp" aria-describedby="emailHelp" placeholder="mrp" />
                            </div>
                            <div className='form-group my-4'>
                            <label htmlFor="price">Price</label>
                            <input type="text" className="form-control " value={data.price} onChange={(e)=>{handleChange(e)}}  id="price" aria-describedby="emailHelp" placeholder="Enter Product Name" />
                            </div>
                        </div>
                        <Link to="" onClick={(e)=>{handleSubmit(e)}} className="btn btn-primary">Save</Link>
                            </form>
                        </div>
            </div>
        </div>
      </div>
      </div>
    </div>
  )
}

export default Product
