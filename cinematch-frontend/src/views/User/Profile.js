import React, { useState, useEffect } from 'react';
import { collection, query, onSnapshot } from '@firebase/firestore';
import { db, auth } from '../../utils/firebase';
import ViewHistory from '../../components/ViewHistory';


function Profile() {
  const [history, setHistory] = useState([]);
  const currentUserUID = auth.currentUser.uid;
  const queryHistory = query(collection(db, "users", `${currentUserUID}`, "history"))
  useEffect(() => {
    onSnapshot(queryHistory, (snapshot) => {
      setHistory(snapshot.docs.map(doc => ({
          id: doc.id,
          item: doc.data()
      })))
    })
  }, []);

  return (
    <div>
      <h2> Movie Ratings </h2>
        <ul>
          {history.map(item => <ViewHistory key={item.id} arr={item} />)}
        </ul>
    </div>
  )
}
export default Profile
