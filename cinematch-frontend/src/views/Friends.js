import React, { useState, useEffect } from 'react';
import { TextField, Button } from '@mui/material';
import { db, auth } from '../utils/firebase';
import { collection, query, or, where, getDocs, onSnapshot, addDoc, and, doc, getDoc } from '@firebase/firestore';
import FriendRequest from '../components/FriendRequest';
import Friend from '../components/Friend';
import SearchBar from '../components/SearchBar';

function FriendsPage() {
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
    }, [input]);
    const sendFriendRequest = async (e) => {
        e.preventDefault();
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
            const queryReceiverUsername = query(collection(db, 'users'), where('username', '==', `${input}`));
            await getDocs(queryReceiverUsername).then((snapshot) => {
                if (snapshot.empty) {
                    throw new Error('No user found');
                } else {
                    snapshot.forEach((doc) => {
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
            <form>
                <TextField id="outlined-basic" label="Input Username" variant="outlined" style={{ margin: "0px 5px" }} size="small" value={input}
                    onChange={e => setInput(e.target.value)} />
                <Button variant="contained" color="primary" onClick={sendFriendRequest}>Send Request</Button>
            </form>
            {errorMessage && <div className="error"> {errorMessage} </div>}
            <ul>
                {friendRequests.map(item => <FriendRequest key={item.id} arr={item} />)}
            </ul>
            <h2> Friends List </h2>
            <ul>
                {friends.map(item => <Friend key={item.id} arr={item} />)}
            </ul>
            <SearchBar />
        </div>
    );
}
export default FriendsPage;