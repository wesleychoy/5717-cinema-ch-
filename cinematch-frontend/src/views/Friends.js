import React, { useState, useEffect } from 'react';
import { TextField, Button } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { db, auth } from '../utils/firebase';
import { collection, query, or, where, getDocs, onSnapshot, addDoc, and, doc, getDoc } from '@firebase/firestore';
import FriendRequest from '../components/FriendRequest';
import Friend from '../components/Friend';
import "../styles/Friend.css";

function Friends() {
    const currentUserUID = auth.currentUser.uid;
    const queryRequestList = query(collection(db, 'friendRequests'), and (
        where('status', '==', 'pending'), 
        or(where('sender', '==', `${currentUserUID}`),
           where('receiver', '==', `${currentUserUID}`))
        )
    );
    const queryFriendsList = query(collection(db, 'friendRequests'), and(
        where('status', '==', 'accepted'), 
        or(where('sender', '==', `${currentUserUID}`),
        where('receiver', '==', `${currentUserUID}`))
        )
    );
    const [friendRequests, setFriendRequests] = useState([]);
    const [friends, setFriends] = useState([]);
    const [input, setInput] = useState('');
    const [users, setUsers] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    useEffect(() => {
        onSnapshot(queryRequestList, (snapshot) => {
            setFriendRequests(snapshot.docs.map(doc => ({
                id: doc.id,
                item: doc.data()
            })))
        })
        onSnapshot(queryFriendsList, (snapshot) => {
            setFriends(snapshot.docs.map(doc => ({
                id: doc.id,
                item: doc.data()
            })))
        })
        const fetchUsers = async () => {
            const querySnapshot = await getDocs(collection(db, "users"))
            setUsers(querySnapshot.docs.map(doc => ({
                label: doc.data().username
            })))
        };
        fetchUsers();
    }, [input]);
    const sendFriendRequest = async (e) => {
        e.preventDefault();
        console.log(input);
        try {
            let data = {
                sender: `${currentUserUID}`,
                receiver: 'null',
                receiverUsername: 'null',
                senderUsername: 'null',
                status: 'pending'
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
                        friendRequests.forEach((request) => {
                            if ((doc.id == request.item.receiver && request.item.sender == currentUserUID) || (doc.id == request.item.sender && request.item.receiver == currentUserUID)) {
                                throw new Error('Request already exists!')
                            }
                        })
                        friends.forEach((friend) => {
                            if ((doc.id == friend.item.receiver && friend.item.sender == currentUserUID) || (doc.id == friend.item.sender && friend.item.receiver == currentUserUID)) {
                                throw new Error('Friendship already exists!')
                            }
                        })
                        data.receiver = doc.id;
                    });
                }
            }).then(() => {
                addDoc(collection(db, 'friendRequests'), {
                    sender: data.sender,
                    receiver: data.receiver,
                    receiverUsername: `${input}`,
                    senderUsername: data.senderUsername,
                    status: data.status
                })
            }).then(() => {
                console.log('Friend Request sent!');
                setInput('')
            });
        } catch (error) {
            setErrorMessage(`${error}`);
        }
    };
    
    return (
        <div className="friends">
            <h2> Friend Requests List </h2>
            <Autocomplete
                disablePortal
                id="outlined-basic"
                options={users}
                sx={{ width: 300 }}
                onChange={(event, value) => {
                    event.preventDefault();
                    if (value) {
                        setInput(value.label)}
                    }
                }
                renderInput={(params) => <TextField {...params} label="Input Username"/>}
                />
                <Button variant="contained" color="primary" onClick={sendFriendRequest}>Send Request</Button>
            {errorMessage && <div className="error"> {errorMessage} </div>}
            <ul>
                {friendRequests.map(item => <FriendRequest key={item.id} arr={item} />)}
            </ul>
            <h2> Friends List </h2>
            <ul>
                {friends.map(item => <Friend key={item.id} arr={item} />)}
            </ul>
        </div>
    );
}

export default Friends;