import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const films = [
    { label: 'Once Upon A Time In Hollywood'},
    { label: 'The Dark Knight'},
    { label: 'Interstellar'},
    { label: 'Fight Club'},
    { label: 'Wolf of Wall Street'},
    { label: 'Catch Me If You Can'},
    { label: 'Avengers'},
    { label: 'Iron Man 1'},
    { label: 'Iron Man 2'},
    { label: 'Iron Man 3'},
    { label: 'The Amazing Spiderman'},
    { label: 'Goodfellas'},
    { label: 'Saving Private Ryan'},
    { label: 'Back to the Future'},
    { label: 'Whiplash'},
    { label: 'Alien'},
    { label: 'WALL·E'},
    { label: 'The Dark Knight Rises'},
    { label: 'Inglourious Basterds'},
    { label: 'Toy Story 1'},
    { label: 'Toy Story 2'},
    { label: 'Toy Story 3'},
];

function Movies() {
  return (
    <div className='Movies'>
        <div className='catalogue'>
        <button>
            Horror
        </button>
        <button>
            Comedy
        </button>
        <button>
            Thriller
        </button>
        <button>
            Family
        </button>
        <button>
            Action
        </button>
        <button>
            Asian
        </button>
        <button>
            Hollywood
        </button>
        <button>
            Sci-Fi
        </button>
        <button>
            Anime
        </button>
        <h1> Movies Catalogue </h1>
        <h1> Search Movies</h1>
        <Autocomplete
          disablePortal
          id="movie-catalogue"
          options={films}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Movie" />}
        />
        </div>
    </div>
  );
}

export default Movies
