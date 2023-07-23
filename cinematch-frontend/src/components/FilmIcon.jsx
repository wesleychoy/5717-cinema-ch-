import React, { useEffect } from 'react';
import { Autocomplete, autocompleteClasses, Button, Popover, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useLongPress } from 'use-long-press';
import { collection, query, or, where, getDocs, onSnapshot, and, doc, getDoc, addDoc } from '@firebase/firestore';
import { db, auth } from '../utils/firebase';

const FilmIcon = ({ film }) => {
    const [friends, setFriends] = useState([]);
    const [friendships, setFriendships] = useState([]);
    const [input, setInput] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const [showRecommend, setShowRecommend] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const toggleShowRecommend = () => {
        setShowRecommend(!showRecommend);
    }
    const bind = useLongPress(() => {
        console.log('Long pressed!');
        toggleShowRecommend();
    });

    const currentUserUID = auth.currentUser.uid;

    const queryFriendsList = query(collection(db, 'friendRequests'), and(
        where('status', '==', 'accepted'), 
        or(where('sender', '==', `${currentUserUID}`),
        where('receiver', '==', `${currentUserUID}`))
        )
    );

    useEffect(() => {
        const fetchData = async () => {
            await getDocs(queryFriendsList).then((snapshot) => {
                console.log(snapshot);
                setFriendships(snapshot.docs.map(doc => ({
                    id: doc.id,
                    item: doc.data()
                })))
            })
        }

        fetchData();
    }, []);

    const sendRecommendation = async (e) => {
        e.preventDefault();
        try {
            let data = {
                film: film,
                sender: `${currentUserUID}`,
                receiver: 'null',
                receiverUsername: 'null',
                senderUsername: 'null' 
            }
            const currentUserDocRef = doc(db, 'users', `${currentUserUID}`);
            await getDoc(currentUserDocRef).then((doc) => {
                data.senderUsername = doc.data().username;
            })
            const queryReceiverUsername = query(collection(db, 'users'), where('username', '==' , `${input}`));
            await getDocs(queryReceiverUsername).then((snapshot) => {
                setErrorMessage('')
                if (snapshot.empty) {
                    throw new Error('No user found');
                } else {
                    snapshot.forEach((doc) => {
                        if (doc.id == currentUserUID) {
                            throw new Error('Cannot send request to yourself!')
                        }
                        data.receiver = doc.id;
                    });
                }
            }).then(() => {
                addDoc(collection(db, 'friendRecommendations'), {
                    film: data.film,
                    sender: data.sender,
                    receiver: data.receiver,
                    receiverUsername: `${input}`,
                    senderUsername: data.senderUsername
                })
            }).then(() => {
                console.log('Recommendation Sent!');
                setInput('');
                handleClose();
            });
        } catch (error) {
            setErrorMessage(`${error}`);
        }
    };

    return (
        <div className='film' {...bind()}>
            <div>
                <p>{film.releaseYear.year}</p>
            </div>
            {showRecommend && (
                <Button
                    variant='contained'
                    color='info'
                    sx={{
                        top: 10,
                        right: 10,
                        zIndex: 9,
                        position: 'absolute'
                    }}
                    onClick={handleClick}
                >
                    Recommend
                </Button>
            )}
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <Autocomplete
                disablePortal
                id="outlined-basic"
                options={
                    friendships.map(friendship => friendship.item.receiver == currentUserUID ? friendship.item.senderUsername : friendship.item.receiverUsername)
                }
                sx={{ width: 300, height: 300 }}
                onChange={(event, value) => {
                    event.preventDefault();
                    if (value) {
                        setInput(value);
                    }
                }}
                renderInput={(params) => <TextField {...params} label="Input Friend's Username"/>}
                />
                <Button variant="contained" color="primary" onClick={sendRecommendation}>Send Recommendation</Button>
            {errorMessage && <div className="error"> {errorMessage} </div>}
            </Popover>
            <div>
                <img src={film.primaryImage?.url ? film.primaryImage.url : "https://placehold.co/900x1378?text=No+Poster"} alt={film.originalTitleText.text} />
            </div>
            
            <div>
                <h3>{film.originalTitleText.text}</h3>
            </div>
        </div>
    );
}

export default FilmIcon;