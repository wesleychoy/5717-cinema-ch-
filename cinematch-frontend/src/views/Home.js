import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "../styles/Home.css";
import { Alert, Backdrop, Typography, Rating, Box } from '@mui/material';
import { Button } from '@mui/base';
import { auth, db } from '../utils/firebase';
import { doc, collection, deleteDoc, setDoc } from '@firebase/firestore';
import SearchIcon from "../assets/SearchIcon.png";
import { List, ListItem, ListItemButton, ListItemAvatar, ListItemText } from '@mui/material';

const API_URL = `https://moviesdatabase.p.rapidapi.com/titles`;

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'f2319095f6msh2adb468b1c2ccc2p14e768jsnbcddf91e7698',
		'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
	}
};

function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState(0);
  const [selectedFilm, setSelectedFilm] = useState();
  const [films, setFilms] = useState([]);
  
  const timeout = async (delay) => {
    return new Promise( res => setTimeout(res, delay) );
  } 

  const searchFilms = async (title) => { 
    const response = await fetch(`${API_URL}/search/title/${title}?endYear=2023&titleType=movie`, options); 
    const data = response.json().then(value=> {
        console.log(value);
        setFilms(value.results);
    });
}

  const sendRating = async (e) => {
    e.preventDefault();
    try {
        await setDoc(doc(db, `users/${auth.currentUser.uid}/history`, `${selectedFilm.originalTitleText.text}`), {
          film: selectedFilm,
          rating: rating
        })
        await deleteDoc(doc(db, `users/${auth.currentUser.uid}/history`, "cinematch-dummy-doc")).then(async () => {
          setMessage('Rating submitted!');
          await timeout(1500).then(() => {
            setMessage('');
          })
        })

    } catch (error) {
      console.log(error)
    }
  }

  const handleCloseBackdrop = () => {
    setMessage('');
  }

  const handleKeyDown = (event) => {
    if (event.key == "Enter") {
        searchFilms(searchTerm);
    }
  }
  useEffect(() => { }, [searchTerm]);
  
  return (
    <div className="home">
      <div className="headerContainer">
        <h1> WELCOME TO CINEMA+CH ! </h1>
        <h1> cinema+ch </h1>
        <p> SAY GOODBYE TO ENDLESS MOVIE-SEARCHING ! </p>
        <h1> Rate Previously Watched Movies</h1>
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
        <div>
          {films?.length > 0 ? (
            <div className = "container">
              <Typography>Selected - {selectedFilm ? selectedFilm.originalTitleText.text : 'EMPTY'}</Typography>
              {films.map((film) => (
                  <ListItem key={film.id} component="div" disablePadding>
                    <ListItemButton>
                      <ListItemText onClick={() => setSelectedFilm(film)} primary={`${film.originalTitleText.text}`}/>
                    </ListItemButton>
                </ListItem>
              ))}
            </div>
          ) : (
            <div/>
          )}
        </div>
        <Box
          sx={{
            '& > legend': { mt: 3 },
          }}
        >
          <Typography color='black' component="legend">Rating</Typography>
          <Rating
            name="simple-controlled"
            value={rating}
            onChange={(event, value) => {
              setRating(value);
            }}
          />
        </Box>
          <Button variant="contained" color="primary" onClick={sendRating}>Submit rating</Button>
          <Backdrop
              sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={message.length > 0}
              onClick={handleCloseBackdrop}
          >
              <Alert severity='success'>{message}</Alert>
          </Backdrop>
      </div>
    </div>
  );
}

export default Home

