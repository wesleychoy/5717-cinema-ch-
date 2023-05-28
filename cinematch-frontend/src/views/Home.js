import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/Home.css";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

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

function Home() {
  const [value, setValue] = React.useState(2);
  
  return (
    <div className="home">
      <div className="headerContainer">
        <h1> WELCOME TO CINEMA+CH ! </h1>
        <Link to="/">
            <button> SIGN OUT </button>
        </Link>
        <h1> cinema+ch </h1>
        <p> SAY GOODBYE TO ENDLESS MOVIE-SEARCHING ! </p>
        <h1> Rate Previously Watched Movies</h1>
        <Autocomplete
          disablePortal
          id="movie-search"
          options={films}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Movie" />}
        />
        <Box
          sx={{
            '& > legend': { mt: 3 },
          }}
        >
          <Typography component="legend">Rating</Typography>
          <Rating
            name="simple-controlled"
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          />
        </Box>
      </div>
    </div>
  );
}

export default Home

