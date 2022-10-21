import React from 'react'
import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react"
import axios from 'axios';
import { Container } from "react-bootstrap"
import { Navbar, Nav, Button} from "react-bootstrap"
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { BsStar } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import Trailer from './Components/Trailer/Trailer'

function Details() {
    const [moviess, setMoviess] = useState([]);
    const params = useParams(); 
    const navigate = useNavigate();
    
      useEffect(() => {
        if (params.id) {
          axios
            .get(`https://api.themoviedb.org/3/movie/${params.id}?api_key=2e7075dab68c21bf59927f68bf3e102d`)
            .then((response) => {
                console.log(response.data)
                setMoviess(response.data);
            });
        }
      }, [params.id]);

  return (
    <>
    <div className="hero d-flex flex-column justify-content-center brightimg"  style={{backgroundImage: `url(${process.env.REACT_APP_IMG_ORI}/${moviess.backdrop_path })`}}>
		</div>
    <div className='detailtext'>
                    <h1 className='text-white'>{moviess.title}</h1>
                    <br/>
                    <p>{moviess?.genres?.map((item) => item.name).join(', ')}</p>
                    <p>{moviess.overview}</p>
                    <p className='ratetext'>
                      <BsStar style={{ marginRight: '.5rem' }}/>{moviess.vote_average} / 10
                    </p>
                    {/* <button className='rounded-pill'>
                      <PlayCircleOutlineIcon/>
                      <span>Watch Trailer</span>
                    </button> */}
                    <Trailer key={moviess.id} item={moviess} />
                  </div>
    </>
  )
}

export default Details