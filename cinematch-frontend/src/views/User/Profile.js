import React, { useState, useEffect } from 'react';
import { collection, query, onSnapshot } from '@firebase/firestore';
import { db, auth } from '../../utils/firebase';
import ViewHistory from '../../components/ViewHistory';
import { Stack } from '@mui/system';
import { Typography } from '@mui/material';


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
    <Stack container direction={'column'} spacing={2} sx={{ my: 1, p: 3 }}>
      <Typography variant='h4' color={'black'}>History</Typography>
      <Stack container direction={'column'} spacing={2}>
        <Stack direction={'row'} justifyContent='left' spacing={2}>
          {history.map(item => item.id === 'cinematch-dummy-doc' ? (
            <Typography color={'black'}>RATE A MOVIE AT THE FRONT PAGE TO GET STARTED!</Typography>
            ) : (
            <ViewHistory key={item.id} arr={item} />
            )
          )}
        </Stack>  
      </Stack>
    </Stack>
  )
}
export default Profile
