import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllMovies } from "../action/api-helpers";
import MovieItem from "./Movies/MovieItem";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    getAllMovies()
      .then((data) => setMovies(data.movies))
      .catch((err) => console.log(err));
  }, []);
  return (
    <Box width={"100%"} height="100%" margin="auto" marginTop={2}>

      {/* <Box margin={"auto"} width="80%" height={"40vh"} padding={2}>
        <img
          src={movies[0]?.posterUrl}
          alt="Brahmastra"
          width={"100%"}
          height={"100%"}
          LinkComponent={Link}
          to={`/booking/${movies[0]?._id}`}
        /> 
           </Box>*/}
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        height={'40vh'}>
        {/* {movies?.slice(0, 4).map((movie) => (
          <div>
            <img src={movie.posterUrl} alt={movie.title} />
            <p>{movie.title}</p>
          </div>
        ))} */}

        <Box margin={"auto"} width="100%" height={"40vh"} padding={2}>
          <img src="https://assets-in.bmscdn.com/promotions/cms/creatives/1702972896237_frides.jpg" alt="" height={'100%'} />
        </Box>
        <Box margin={"auto"} width="100%" height={"40vh"} padding={2}>
          <img src="https://th.bing.com/th/id/OIP.AFj2q3WHz7LmcEvEldCQZAHaDa?rs=1&pid=ImgDetMain" alt="" height={'100%'} />
        </Box>
        <Box margin={"auto"} width="100%" height={"40vh"} padding={2}>
          <img src="https://ambianceiq.com/wp-content/uploads/2021/07/movie-banner-1024x398.png" alt="" height={'100%'} />
        </Box>
      </Carousel>

      <Box padding={5} margin="auto">
        <Typography variant="h4" textAlign={"center"}>
          Latest Releases
        </Typography>
      </Box>
      <Box
        margin={"auto"}
        display="flex"
        width="80%"
        justifyContent={"center"}
        alignItems="center"
        flexWrap="wrap"
      >
        {movies &&
          movies
            .slice(0, 4)
            .map((movie, index) => (
              <MovieItem
                id={movie._id}
                title={movie.title}
                posterUrl={movie.posterUrl}
                releaseDate={movie.releaseDate}
                key={index}
              />
            ))}
      </Box>
      <Box display="flex" padding={5} margin="auto">
        <Button
          LinkComponent={Link}
          to="/movies"
          variant="outlined"
          sx={{ margin: "auto", color: "#2b2d42" }}
        >
          View All Movies
        </Button>
      </Box>
    </Box>
  );
};

export default HomePage;
