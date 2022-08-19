import axios from 'axios';

import React, { useState } from 'react'

const Login = () => {
    const [data, setData] = useState({
        email:'',
        password:'',
    })
    function handleChange(e){
        e.preventDefault();
        let newData = {...data}
        newData[e.target.id] = e.target.value
        setData(newData)

    }
    function handleSubmit(e){
        e.preventDefault();
        axios.post("http://localhost:8081/user/login",{data:{
          email : data.email,
          password : data.password}
        }).then((res)=>{console.log(res.data)})
    }
  return (
    <div className='mt-5 py-5 '>
      <div className='container'>
      <h1 className='text-center'>Login</h1>
        <div className='row mx-auto'>
            <div className='col-lg-6 mx-auto my-3 py-2'>
                <input type='email' name='email' className='form-control my-2' id='email' value={data.email} onChange={(e)=>handleChange(e)} placeholder='Enter Email' ></input>
                <input type='password' name='password' className='form-control my-2' onChange={(e)=>handleChange(e)} id='password'  value={data.password} placeholder='Enter Password' ></input>
                <button className='btn btn-primary ' id='login' onClick={(e)=>{handleSubmit(e)}} > Login</button>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Login
