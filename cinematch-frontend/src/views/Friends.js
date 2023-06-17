import React, { useState, useEffect } from 'react';
import { TextField, Button } from '@mui/material';
import { db, auth } from '../utils/firebase';
import { collection, query, or, where, getDocs, onSnapshot, addDoc, serverTimestamp } from '@firebase/firestore';
import FriendRequest from '../components/FriendRequest';

function FriendsPage() {
    const currentUserUID = auth.currentUser.uid;
    const queryRequestList = query(collection(db, 'friendRequests'),
        or(where('sender', '==', `${currentUserUID}`),
           where('receiver', '==', `${currentUserUID}`)
        )
    );
    const [friendRequests, setFriendRequests] = useState([]);
    const [input, setInput] = useState('');
    useEffect(() => {
        onSnapshot(queryRequestList, (snapshot) => {
            setFriendRequests(snapshot.docs.map(doc => ({
                id: doc.id,
                item: doc.data()
            })))
        })
    }, [input]);
    const sendFriendRequest = async (e) => {
        e.preventDefault();
        let data = {
            sender: `${currentUserUID}`,
            receiver: 'null',
            receiverUsername: 'null',
            status: 'pending',
            timestamp: serverTimestamp()
        }
        const queryUsername = query(collection(db, 'users'), where('username', '==', `${input}`));
        const queryUsernameSnapshot = await getDocs(queryUsername);
        queryUsernameSnapshot.forEach((doc) => {
            data.receiver = doc.id;
        });
        await addDoc(collection(db, 'friendRequests'), {
            sender: data.sender,
            receiver: data.receiver,
            receiverUsername: `${input}`,
            status: data.status,
            timestamp: data.timestamp
        }).then(() => {
            console.log('Friend Request sent!');
            setInput('')
        })
    };
    return (
        <div className="friends">
            <h2> Friend Requests List </h2>
            <form>
                <TextField id="outlined-basic" label="Input Username" variant="outlined" style={{ margin: "0px 5px" }} size="small" value={input}
                    onChange={e => setInput(e.target.value)} />
                <Button variant="contained" color="primary" onClick={sendFriendRequest}>Send Request</Button>
            </form>
            <ul>
                {friendRequests.map(item => <FriendRequest key={item.id} arr={item} />)}
            </ul>
        </div>
    );
}
export default FriendsPage;