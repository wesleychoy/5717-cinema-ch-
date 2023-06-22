import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "../styles/Home.css";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Button } from '@mui/base';
import { auth, db } from '../utils/firebase';
import { doc, collection, deleteDoc, setDoc } from '@firebase/firestore';

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
  const [rating, setRating] = useState(0);
  const [movie, setMovie] = useState();

  const sendRating = async (e) => {
    e.preventDefault();
    const historyCollectionRef = collection(db, `users/${auth.currentUser.uid}/history`);
    try {
        await setDoc(doc(db, `users/${auth.currentUser.uid}/history`, `${movie}`), {
          movie: `${movie}`,
          rating: rating
        })
        await deleteDoc(doc(db, `users/${auth.currentUser.uid}/history`, "cinematch-dummy-doc"));
    } catch (error) {
      console.log(error)
    }
  }
  
  return (
    <div className="home">
      <div className="headerContainer">
        <h1> WELCOME TO CINEMA+CH ! </h1>
        <h1> cinema+ch </h1>
        <p> SAY GOODBYE TO ENDLESS MOVIE-SEARCHING ! </p>
        <h1> Rate Previously Watched Movies</h1>
        <Autocomplete
          disablePortal
          id="movie-search"
          options={films}
          sx={{ width: 300 }}
          onChange={(event, value) => {
            event.preventDefault();
            if (value) {
              setMovie(value.label);
            }
          }}
          renderInput={(params) => <TextField {...params} label="Input Movie"/>}
        />
        <Box
          sx={{
            '& > legend': { mt: 3 },
          }}
        >
          <Typography component="legend">Rating</Typography>
          <Rating
            name="simple-controlled"
            value={rating}
            onChange={(event, value) => {
              setRating(value);
            }}
          />
        </Box>
          <Button variant="contained" color="primary" onClick={sendRating}>Submit rating</Button>
      </div>
    </div>
  );
}

export default Home

