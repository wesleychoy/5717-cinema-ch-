import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import "../styles/Recommendations.css";
import Placeholder1 from "../assets/movieposters/BatmanBegins.jpeg"
import Placeholder2 from "../assets/movieposters/TheDarkKnightRises.jpeg"
import Placeholder3 from "../assets/movieposters/DarkKnight.jpeg"
import Placeholder4 from "../assets/movieposters/InfinityWar.jpeg"
import Placeholder5 from "../assets/movieposters/BabyDriver.jpeg"
import Placeholder6 from "../assets/movieposters/TheGreenMile.jpeg"
import Placeholder7 from "../assets/movieposters/TheBigShort.jpeg"
import Placeholder8 from "../assets/movieposters/Minions.jpeg"


//Import Swiper 
import "swiper/css";
import "swiper/css/pagination";
import 'swiper/css/navigation';
import { Pagination, Navigation } from "swiper";

const API_URL = `https://moviesdatabase.p.rapidapi.com/titles`;

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'f2319095f6msh2adb468b1c2ccc2p14e768jsnbcddf91e7698',
		'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
	}
};


const Recommendations = () => {
  const [movieName, setMovieName] = useState('');
  const [recommendedTitles, setRecommendedTitles] = useState([]);
  const [films, setFilms] = useState([]);

  const getMovieRecommendations = async (title) => {
      const response = await fetch(`http://127.0.0.1:5000/api/recommendations/${title}`);
      const data = response.json().then(value=> {
        console.log(value.movies);
        setRecommendedTitles(value.movies);
    });
  };

  const fetchPopularMovies = async () => {
    const response = await fetch(`${API_URL}?titleType=movie&list=top_rated_english_250&endYear=2023&limit=9`, options);
    const data = await response.json();
    console.log(data);
    setFilms(data.results);
  };

  useEffect(() => {
    fetchPopularMovies();
  }, []);

  return (
    <div className='Recommendations'>
      <div className='AttributeRecommendations'>
        <h1>Get Recommendations Based On What You Watched!</h1>
        <input type="text" value={movieName} onChange={(e) => setMovieName(e.target.value)} />
        <button onClick={() => getMovieRecommendations(movieName)}>Get Recommendations</button>
        {recommendedTitles.length > 0 ? (
          <ul>
            {recommendedTitles.map((movie) => (
              <li key={movie}>{movie}</li>
            ))}
          </ul>
        ) : (
          <p>No recommendations found.</p>
        )}
      </div>
      <div className='sliders'>
        <h1>Most Popular Movies</h1>
        <div className='PopularCategory'>
          <Swiper
            modules={[Pagination, Navigation]}
            slidesPerView={3}
            spaceBetween={10}
            navigation
            pagination={{
              clickable: true,
            }}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log('slide change')}
          >
            {films.map(film => (
              <SwiperSlide key={film.id}>
                <img src={film.primaryImage?.url ? film.primaryImage.url : "https://placehold.co/900x1378?text=No+Poster"} alt={film.originalTitleText.text} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Recommendations;