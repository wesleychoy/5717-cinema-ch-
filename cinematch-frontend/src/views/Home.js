import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "../styles/Home.css";
import { Alert, Box, Backdrop, TextField, OutlinedInput, Typography, Rating, CircularProgress, Card, Stack, InputAdornment, Divider } from '@mui/material';
import { Button } from '@mui/base';
import { auth, db } from '../utils/firebase';
import { doc, collection, deleteDoc, setDoc, getDoc } from '@firebase/firestore';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { List, ListItem, ListItemButton, ListItemAvatar, ListItemText } from '@mui/material';
import { border } from '@mui/system';

const API_URL = `https://moviesdatabase.p.rapidapi.com/titles`;

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'f2319095f6msh2adb468b1c2ccc2p14e768jsnbcddf91e7698',
		'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
	}
};

function Home() {
  const [currentUserDoc, setCurrentUserDoc] = useState();
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
  useEffect(() => { 
    const fetchUser = async () => {
      await getDoc(doc(db, 'users', `${auth.currentUser.uid}`)).then((doc) => {
        setCurrentUserDoc(doc.data());
      })
    }
    
    fetchUser();
  }, [searchTerm]);

  return (
    <Stack container direction={'column'} spacing={2} alignItems={'center'} sx={{ my: 1, p: 3 }}>
      <Typography variant='h1' color={'black'} textTransform={'uppercase'} sx={{ fontFamily: 'Roboto', fontSize: 40, fontWeight: 'bold' }}>Welcome {currentUserDoc ? currentUserDoc.username : (<CircularProgress/>)}</Typography>
      <Typography variant='subtitle1' color={'black'} sx={{ fontStyle: 'italic' }}>Never second guess again</Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', p: 0 }}>
        <TextField
          id="search-field"
          type='text'
          label='Search Movies'
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchRoundedIcon />
              </InputAdornment>
            ),
          }}
          variant='outlined'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
          sx={{
            borderRadius: '36px',
            width: 500
          }}
        />
      </Box>
      {films?.length > 0 ? (
        <Stack container direction={'column'} alignItems={'center'}>
          <Typography variant='subtitle1' color={'black'}>Selected</Typography>
            <Typography variant='subtitle1' color={'black'} sx={{ fontWeight: 'bold' }}>{selectedFilm ? selectedFilm.originalTitleText.text : 'EMPTY'}</Typography>
            <Rating
            value={rating}
            onChange={(event, value) => {
              setRating(value);
            }}
            sx={{
              paddingBottom: 1
            }}
          />
          <Button variant="contained" color="primary" onClick={sendRating}>Submit rating</Button>
          <Divider orientation='horizontal' flexItem sx={{ p: 0.5}} />
          {films.map((film) => (
              <ListItem key={film.id} component="div" disablePadding>
                <ListItemButton>
                  <ListItemText  onClick={() => setSelectedFilm(film)} primary={`${film.originalTitleText.text}`} sx={{ color: 'black'}}/>
                </ListItemButton>
              </ListItem>
          ))}
        </Stack>
      ) : (
        <Alert severity='info'>Search for a film to give it a rating</Alert>
      )}
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={message.length > 0}
        onClick={handleCloseBackdrop}
      >
        <Alert severity='success'>{message}</Alert>
      </Backdrop>
      </Stack>
  );
  // return (
  //   <div className="home">
  //     <div className="headerContainer">
  //       <h1> WELCOME, {currentUserDoc ? currentUserDoc.username : (<CircularProgress/>)}! </h1>
  //       {/* <h1> cinema+ch </h1> */}
  //       <p> SAY GOODBYE TO ENDLESS MOVIE-SEARCHING ! </p>
  //       <h1> Rate Previously Watched Movies</h1>
  //       <div className='search'>
  //           <input 
  //               placeholder='Search for Movies'
  //               value={searchTerm}
  //               onChange={(e) => setSearchTerm(e.target.value)}
  //               onKeyDown={handleKeyDown}
  //           />
  //           <img
  //               src={SearchIcon}
  //               alt="search"
  //               onClick={() => searchFilms(searchTerm)}
  //           /> 
  //       </div>
  //       <div>
          // {films?.length > 0 ? (
          //   <div className = "container">
          //     <Typography>Selected - {selectedFilm ? selectedFilm.originalTitleText.text : 'EMPTY'}</Typography>
          //     {films.map((film) => (
          //         <ListItem key={film.id} component="div" disablePadding>
          //           <ListItemButton>
          //             <ListItemText onClick={() => setSelectedFilm(film)} primary={`${film.originalTitleText.text}`}/>
          //           </ListItemButton>
          //       </ListItem>
          //     ))}
  //           </div>
  //         ) : (
  //           <div/>
  //         )}
  //       </div>
  //       <Box
  //         sx={{
  //           '& > legend': { mt: 3 },
  //         }}
  //       >
  //         <Typography color='black' component="legend">Rating</Typography>
          // <Rating
          //   name="simple-controlled"
          //   value={rating}
          //   onChange={(event, value) => {
          //     setRating(value);
          //   }}
          // />
  //       </Box>
  //         <Button variant="contained" color="primary" onClick={sendRating}>Submit rating</Button>
          // <Backdrop
          //     sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          //     open={message.length > 0}
          //     onClick={handleCloseBackdrop}
          // >
          //     <Alert severity='success'>{message}</Alert>
          // </Backdrop>
  //     </div>
  //   </div>
  // );
}

export default Home

