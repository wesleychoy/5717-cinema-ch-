import { useState, useEffect }  from 'react';
import SearchIcon from "../assets/SearchIcon.png";
import FilmIcon from "../components/FilmIcon";
import "../styles/Movies.css";
const API_URL = "http://www.omdbapi.com/?i=tt3896198&apikey=d974252a";


const Movies = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [films, setFilms] = useState([]);
    const searchFilms = async (title) => { 
        const response = await fetch(`${API_URL}&s=${title}`); 
        const data = response.json().then(value=> {
            console.log(value);
            setFilms(value.Search);
        });
    }

    const handleKeyDown = (event) => {
        if (event.key == "Enter") {
            searchFilms(searchTerm);
        }
    }
    useEffect(() => { }, [searchTerm]);
    
    return (
        <div className='Movies'>
            <div className='genres'>
                <button>
                    Action
                </button>
                <button>
                    Adult
                </button>
                <button>
                    Adventure
                </button>
                <button>
                    Animation
                </button>
                <button>
                    Biography
                </button>
                <button>
                    Comedy
                </button>
                <button>
                    Documentary
                </button>
                <button>
                    Drama
                </button>
                <button>
                    Fantasy
                </button>
                <button>
                    History
                </button>
                <button>
                    Horror
                </button>
                <button>
                    Musical
                </button>
                <button>
                    Mystery
                </button>
                <button>
                    Romance
                </button>
                <button>
                    Sci-Fi
                </button>
                <button>
                    Sport
                </button>
                <button>
                    Fantasy
                </button>
                <button>
                    Thriller
                </button>
                <button>
                    War
                </button>
                <button>
                    Western
                </button>
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
                {films?.length > 0 
                    ? (
                        <div className = "container">
                            {films.map((film) => (
                                <FilmIcon film={film} />
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
