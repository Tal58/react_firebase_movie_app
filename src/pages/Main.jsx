import React, { useEffect, useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {CiFaceFrown} from "react-icons/ci"
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import {ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./Main.css";
function Main() {
  const navigate = useNavigate();
  const [genre, setGenre] = useState();
  const [genreObj, setGenreObj] = useState();
  const [movies, setMovies] = useState();
  const [searchInfo, setSearchInfo] = useState();
  const [genreType, setGenreType] = useState();
  const average = [5, 6, 7, 8, 9];
  const [avrg, setAvrg] = useState();


  const notify = () => toast(`♟️ ${localStorage?.getItem("name")===null ?  "": localStorage?.getItem("name") } Welcome to application main page!`, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    });

  const getData = async () => {
    const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=5b1f480ba22462cc082ded7c7d622ba5&language=en-US`;

    try {
      const data = await axios(url);
      setGenre(data);
      setGenreObj(data["data"]["genres"]);
    } catch (error) {
      console.log(error);
    }

  };

  const getData2 = async () => {
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=5b1f480ba22462cc082ded7c7d622ba5&language=en-US`;

    try {
      const data = await axios(url);
      setMovies(data);
      console.log(movies);
    } catch (error) {
      console.log(error);
    }
  };

  
 
  

  const getGenre = async (e) => {
    e.preventDefault();
    console.log(genreType);
    let genreId = genreObj?.filter((item) => item["name"] === genreType);
    console.log(genreId[0]);
    console.log(typeof searchInfo);
    console.log(genreId[0]?.id);


    const finalUrl = `https://api.themoviedb.org/3/discover/movie?api_key=5b1f480ba22462cc082ded7c7d622ba5&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&vote_average.gte=${avrg}&with_genres=${genreId[0]?.id}`;
    try {
      const data = await axios(finalUrl);
      setMovies(data);
      console.log(genreType);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
   
    const notify = () => toast(`♟️${localStorage?.getItem("name")===null ?  "": localStorage?.getItem("name") } You searched ${genreType} type over than ${avrg} ratings ;)`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });;
      notify()
      genreId = "";
      setAvrg("");
      setGenreType("");
  };
  console.log(genre);
  console.log(movies);
  console.log();

  useEffect(() => {
    getData();
    getData2();
    notify();
  }, []);

  async function search(e) {
    e.preventDefault();
    const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=5b1f480ba22462cc082ded7c7d622ba5&query=${searchInfo}`;
    console.log(searchInfo);
    try {
      const data = await axios(searchUrl);
      setMovies(data);
      console.log(movies);
    } catch (error) {
      console.log(error);
    }
    const notify = () => toast(`♟️${localStorage?.getItem("name")===null ?  "": localStorage?.getItem("name") } You searched ${searchInfo} keyword ;)`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
      notify()
    setSearchInfo("");
  }
  console.log(movies);

    
    return { genre } && (
        
      <div className="movieTrack">
        <Form className="row-md-7 gap-2 comboForm">
          <div className="formLeft col-md-2">
          <Form.Control
            placeholder="Search for keywords"
            value={searchInfo}
            onChange={(e) => setSearchInfo(e.target.value)}
            onKeyDown={(e) => {
              if (e.code === "Enter") {
                search()
               
              }
            }}
          />
          <Button
          type="submit"
            variant="outline-secondary"
            id="button-addon2"
            onClick={search}
          >
            Search
          </Button>
          </div>
          <div className="formRight col-md-3">
          <Form.Select 
            aria-label="Default select example"
            onClick={(e) => setGenreType(e.target.value)}
          >
            <option>Genres</option>
            {genre?.data?.genres?.map((genre, key) => (
              <option key={key}>{genre["name"]}</option>
            ))}
          </Form.Select>
          <Form.Select
            aria-label="Default select example"
            onClick={(e) => setAvrg(e.target.value)}
          >
            <option>Average Rating</option>
            {average.map((avg, key) => (
              <option key={key}>{avg}</option>
            ))}
          </Form.Select>
          <Button variant="outline-secondary" onClick={getGenre} className="Button">
            Search for genre and average rating
          </Button>
          </div>
         
        </Form>
        <div className="cards col-md-12">
          {movies?.data?.results.map((movie, key) => {
            const movieDetail = movie;
            return (
              <Card key={key} className={"onecard col-md-3"}>
                {movie["backdrop_path"] !== null && (
                  <Card.Img
                    variant="top"
                    src={`https://image.tmdb.org/t/p/w1280${movie["backdrop_path"]}`}
                  />
                )} {movie["backdrop_path"] === null && movie["poster_path"] !== null && (
                  <Card.Img
                    variant="top"
                    src={`https://image.tmdb.org/t/p/w1280${movie["poster_path"]}`}
                  />
                )}
                {movie["backdrop_path"] === null && movie["poster_path"] ===null && (
                  <>
                   <h1>Sorry for No Image</h1>
                  <h1><CiFaceFrown /></h1>
                  </>
                 
                )}
                <Card.Body className="cardBody">
                  <div className="cardDesc">
                    <Card.Title>{movie["original_title"]}</Card.Title>
                    <Card.Text>Average vote: {movie["vote_average"]}</Card.Text>
                    <Card.Text>Release Date: {movie["release_date"]}</Card.Text>
                    <Button
                      variant="primary"
                      onClick={() =>
                        navigate(`/moviedetail/${movie["id"]}`, {
                          state: movieDetail,
                        })
                      }
                    >
                      View More
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            );
          })}
        </div>
        <ToastContainer />
      </div>
     
    )
}

export default Main;
