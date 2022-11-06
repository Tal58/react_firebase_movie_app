import React, { useEffect } from "react";
import {ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./Home.css"

function Home() {
  localStorage.clear();
  
  const notify = () => toast(' ♘ Welcome to Movie App!!!', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    });;
    useEffect(()=>{
      notify()
    })
   
  return (
    <div className="Home col-md-12 col-sm-8">
      <h1>Welcome to Movie App</h1>
      <h3>Please login or if you don't have any account please register</h3>
      <ToastContainer />
    </div>
  );
}

export default Home;
