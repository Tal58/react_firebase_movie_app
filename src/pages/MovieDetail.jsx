import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import {ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./MovieDetail.css";

function MovieDetail() {
  const navigate = useNavigate();
  const { state: movieDetail } = useLocation();
  const notify = () => toast(`♟️${localStorage?.getItem("name")===null ?  "": localStorage?.getItem("name")} Here you can find more details about ${movieDetail["original_title"]} ;)`, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    });
    useEffect(()=>{
      notify()
    })
 
  console.log(movieDetail);
  return (
    <div className="movieCombo">
      <div className="movieDetail">
    
        <h2><b>{movieDetail["original_title"]}</b></h2>
        <p><b>Release Date:</b>{" "}{movieDetail["release_date"]}</p>
        <p><b>Average Vote:</b>{" "}{movieDetail["vote_average"]}</p>
        <p><b>Popularity:</b>{" "}{movieDetail["popularity"]}</p>
        <p>
        <b>Overview:</b>{" "}{movieDetail["overview"]}
        </p>
        <Button variant="success" onClick={()=>navigate(-1)}>Back</Button>
    
      </div>

{movieDetail["poster_path"]!==null && <img src={`https://image.tmdb.org/t/p/w1280${movieDetail["poster_path"]}`}  className="img-rounded poster" alt="Cinque Terre" />}
<ToastContainer />
    </div>
  );
}

export default MovieDetail;
