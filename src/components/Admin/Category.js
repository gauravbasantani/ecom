import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate, useParams } from 'react-router-dom'

const Category = () => {
    let navigate = useNavigate();
    const [data, setData] = useState({
        id :'',
        name : '',
        srno : '',
        image : '',
        })
        let { id } = useParams();
        useEffect(()=>{
            if(id !== null){
                axios.post("http://localhost:8081/productcategory/get",{data:{id : id}}).then((res)=>{
                    const newData = {...data}
                    newData["id"] = res.data.data._id;
                    newData["name"] = res.data.data.name;
                    newData["srno"] = res.data.data.srno;
                    setData(newData);

                })
            }
        })
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
        e.preventDefault();
        axios.post("http://localhost:8081/productcategory/save",{data:{
            id : data.id === null ? '' : data.id,
            name : data.name,
            srno : data.srno,
            image : data.image,
        }}).then(res=>{console.log(res.data.data);
            navigate('/admin/categories');
        
        })
    }
  return (
    <div>
       <div className='breadcrumbs'>
                <p className='bread'>
                    <span> <NavLink to="/admin"> Administrator </NavLink></span>/
                    <span><NavLink to="/admin/categories"> Categories </NavLink></span> /<span>category</span>
                </p>
            </div>
            <h1 className='text-center my-3 display-4'>Category</h1>
            <div className='container'>
                <div className='row'>
                    <div className='col-lg-2'></div>
                    <div className='col-lg-8'>
                    <div className="form-group my-4">
                            <label htmlFor="name">Product Name</label>
                            <input type="text" className="form-control" value={data.name} onChange={(e)=>{handleChange(e)}} id="name" aria-describedby="emailHelp" placeholder="Enter Product Name" />
                            <form>
                                <div className="form-group my-3">
                                    <label htmlFor="image">Image</label>
                                    <input type="file" accept="image/*"onChange={(e)=>{handleChange(e)}} className="form-control"  id="image" />
                                </div>
                                <div className="form-group my-4">
                            <label htmlFor="srno">Sr No</label>
                            <input className="form-control" value={data.srno} onChange={(e)=>{handleChange(e)}} type="number" min="1"  id="srno"  />
                        </div>
                        <Link to="" onClick={(e)=>{handleSubmit(e)}} className="btn btn-primary">Save</Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
    </div>
  )
}

export default Category
