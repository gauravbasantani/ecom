
import Header from "./components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Admin from "./components/Admin/Admin";
import Categories from "./components/Admin/Categories";
import Login from "./components/Login";
import Category from "./components/Admin/Category";
import Product from "./components/Admin/Product";
import Products from "./components/Admin/Products";

// import $ from 'jquery';


function App() {
  return (
    
    <BrowserRouter>
    <>
   
    <Header/>
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="about" element={<About />}/>
      <Route path="contact" element={<Contact />}/>    
      <Route path="login" element={<Login />}/>    

      <Route path="admin" element={<Admin/>}>
      <Route path="/admin/categories" element={<Categories/>}/>
      <Route path="/admin/category" element={<Category/>}/>
      <Route path="/admin/category/:id" element={<Category/>}/>
      <Route path="/admin/products/" element={<Products/>}/>
      <Route path="/admin/product/" element={<Product/>}/>
      <Route path="/admin/product/:id" element={<Product/>}/>
      </Route>
    </Routes>
    </>
    </BrowserRouter>
  );
}

export default App;
