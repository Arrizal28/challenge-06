import React from 'react'
import { Card, Container, Row, Col, Image } from "react-bootstrap"
import { useSearchParams, Link } from 'react-router-dom';
import { useEffect, useState} from 'react'
import axios from 'axios'

function SearchResult() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('keywords');
    const [movies, setMovies] = useState([]);

    useEffect (() => {
        axios
            .get(`${process.env.REACT_APP_API_SEARCH}=${query}`)
            .then((response) => {
                setMovies(response.data.results);
            });
    })

    return (
        <div>
          <Container>
            <br />
            <br />
            <br />
            <br />
            <h1 className="text-white">Result For {query} </h1>
            <br />
            <Row>
            {movies.map((item, index) => {
                return (
                    <Col md={4} className="movieWrapper" id="trending" key={index}>
                        <Link to={`/Details/${item.id}`}>
                            <Card className="movieImage">
                            <Image src={`${process.env.REACT_APP_IMG_PATH}/${item.poster_path}`} alt={"..."} className="images"/>
                            </Card>
                        </Link>
                    </Col>
                )
            }) }
            </Row>
          </Container>
        </div>
      )
}

export default SearchResult