import { Alert, Backdrop, Card, Stack, Typography } from '@mui/material';
import { useState, useEffect }  from 'react';
import SearchIcon from "../assets/SearchIcon.png";
import FilmIcon from "../components/FilmIcon";
import "../styles/Movies.css";

const API_URL = `https://moviesdatabase.p.rapidapi.com/titles`;

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'f2319095f6msh2adb468b1c2ccc2p14e768jsnbcddf91e7698',
		'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
	}
};

const Movies = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [films, setFilms] = useState([]);
    const [success, setSuccess] = useState(false);

    const searchFilms = async (title) => { 
        const response = await fetch(`${API_URL}/search/title/${title}?endYear=2023&titleType=movie&limit=50`, options); 
        const data = response.json().then(value=> {
            console.log(value);
            setFilms(value.results);
        });
    }

    const fetchAllMovies = async () => {
        const response = await fetch(`${API_URL}?titleType=movie&list=top_rated_english_250&endYear=2023&limit=50`, options);
        const data = await response.json();
        console.log(data);
        setFilms(data.results);
      };
    
    const filterByGenre = async (genre) => {
        const response = await fetch(`${API_URL}?genre=${genre}&titleType=movie&list=most_pop_movies&endYear=2023&limit=50`, options);
        const data = response.json().then(value=> {
            console.log(value);
            setFilms(value.results);
        });
    }

    const handleCloseBackdrop = () => {
        setSuccess(false);
    }

    const handleKeyDown = (event) => {
        if (event.key == "Enter") {
            searchFilms(searchTerm);
        }
    }
    //useEffect(() => { }, [searchTerm]);
    useEffect(() => {
        fetchAllMovies();
      }, []);
    
    return (
        <div className='Movies'>
            <div className='genres'>
                <button onClick={() => filterByGenre('Action')}>Action</button>
                <button onClick={() => filterByGenre('Adventure')}>Adventure</button>
                <button onClick={() => filterByGenre('Animation')}>Animation</button>
                <button onClick={() => filterByGenre('Biography')}>Biography</button>
                <button onClick={() => filterByGenre('Comedy')}>Comedy</button>
                <button onClick={() => filterByGenre('Crime')}>Crime</button>
                <button onClick={() => filterByGenre('Documentary')}>Documentary</button>
                <button onClick={() => filterByGenre('Drama')}>Drama</button>
                <button onClick={() => filterByGenre('Fantasy')}>Fantasy</button>
                <button onClick={() => filterByGenre('History')}>History</button>
                <button onClick={() => filterByGenre('Horror')}>Horror</button>
                <button onClick={() => filterByGenre('Mystery')}>Mystery</button>
                <button onClick={() => filterByGenre('Romance')}>Romance</button>
                <button onClick={() => filterByGenre('Sci-Fi')}>Sci-Fi</button>
                <button onClick={() => filterByGenre('Sport')}>Sport</button>
                <button onClick={() => filterByGenre('Thriller')}>Thriller</button>
                <button onClick={() => filterByGenre('War')}>War</button>
                <button onClick={() => filterByGenre('Western')}>Western</button>
            </div>
            <div className='catalogue'>
                <h1> Movies Catalogue </h1>
                <div className='search'>
                    <input 
                        placeholder='Search for Movies'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <img
                        src={SearchIcon}
                        alt="search"
                        onClick={() => searchFilms(searchTerm)}
                    /> 
                </div>
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={success}
                    onClick={handleCloseBackdrop}
                >
                    <Alert severity='success'>Recommendation sent!</Alert>
                </Backdrop>
                <Stack direction={'row'} sx={{ my: 2, width: 400 }} spacing={2}>
                    <Alert severity='info'>Long press on a movie to recommend it to your friends!</Alert>
                </Stack>
                {films?.length > 0 
                    ? (
                        <div className = "container">
                            {films.map((film) => (
                                <FilmIcon film={film} setSuccess={setSuccess}/>
                            ))}
                        </div>
                    ) : (
                        <div className='empty'>
                            <h2>No Movies Found</h2>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default Movies;
