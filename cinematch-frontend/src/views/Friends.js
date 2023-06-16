import React, { useState } from 'react';
import { auth, db } from '../utils/firebase';
import { doc, setDoc } from '@firebase/firestore';

function Friends() {
    const [formValue, setFormValue] = useState('');

    const handleSubmitRequest = async () => {
        let data = {
            sender: `${auth.currentUser.uid}`,
            receiver: `${formValue}`,
            status:'pending'
        };
        console.log(data);
        try {
            await setDoc(doc(db, "friendRequests", `${auth.currentUser.uid}`), {
                sender: data.sender,
                receiver: data.receiver, 
                status: data.status
            }).then(() => {
                console.log("Friend Request logged in Firebase Firestore");
            });
            console.log("exit");
        } catch (error) {
            console.log(`There was an error: ${error}`);
        }
    };
    
  return (
    <div className='friends'>
        <div className='text'>
            <h1>hi</h1>
            <form onSubmit={handleSubmitRequest}>
                <input placeholder="input friend's username" value ={formValue} onChange={(e) => setFormValue(e.target.value)}></input>
                <button type = "submit">send</button>
            </form>
        </div>
    </div>
  );
}

export default Friends
