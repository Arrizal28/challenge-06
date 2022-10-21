import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css"
import "./style/landingPage.css"
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Trailer from './Components/Trailer/Trailer'
import Header from './Components/Header/Header';

function Home(token, setToken) {
  const [hero, setHero] = useState([]);
  const [movies, setMovies] = useState([])

  const navigate = useNavigate();
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const fetchTrending = async () => {
    const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/trending/movie/day?api_key=${process.env.REACT_APP_TMDB_KEY}`);
    setHero(res.data.results);
  };

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/discover/movie`, {
      params: {
        api_key: process.env.REACT_APP_TMDB_KEY
      }
    }).then((response) => {
      setMovies(response.data.results)
    })
    fetchTrending();
  }, [])

    return (
        <div>
          <div>
          {!token?(
                      <>
                      <Header setMovies={setMovies}></Header>
                      </>
                    ) : (
                      <>
                      </>
                    )
                  }
            <Carousel>
              {hero.map((item) => {
                return (
                  <Carousel.Item className='myBG' key={item.id}>
                    <div
                      className="w-100 vh-100 d-flex flex-column justify-content-center align-items-center text-white brightimg" style={{backgroundImage: `url(${process.env.REACT_APP_IMG_ORI}/${item.backdrop_path })`, backgroundPosition: 'center', backgroundSize: 'cover'}}
                      >
                    </div>
                        <div className='textbox'>
                          <h1>{item.title}</h1>
                          <p>{item.overview}</p>
                          {/* <button className='rounded-pill btn-wt'>
                            <PlayCircleOutlineIcon/>
                            <span className='spanwt'>Watch Trailer</span>
                          </button> */}
                          <Trailer key={item.id} item={item} />
                        </div>
                  </Carousel.Item>
                )
              }).slice(0, 3)}
          </Carousel>
          </div>
          <div className="trending">
            <br />
              <h1 className="text-white">POPULAR MOVIE</h1>  
            <br />
          <Slider {...settings}>
            {movies.map((item) => (
              <div className="card">
                <div className="card-top">
                  <img
                    src={`${process.env.REACT_APP_IMG_PATH}/${item.poster_path}`} alt={"..."} className="images" title={item.title} onClick={(e) => {
                      e.preventDefault();
                      navigate(`details/${item.id}`)
                              }}
                  />
                </div>
              </div>
            ))}
          </Slider>
          </div>
        </div>
      )
}

export default Home