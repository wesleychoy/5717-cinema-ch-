import React, { useState, useEffect } from 'react';
import { collection, query, onSnapshot, getDoc, doc } from '@firebase/firestore';
import { db, auth } from '../../utils/firebase';
import { updatePassword } from "firebase/auth";
import ViewHistory from '../../components/ViewHistory';
import { Stack } from '@mui/system';
import { Alert, Backdrop, TextField, Typography, Button } from '@mui/material';


function Profile() {
  const [firstName, setFirstName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirmation, setNewPasswordConfirmation] = useState('');
  const [history, setHistory] = useState([]);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const currentUserUID = auth.currentUser.uid;
  const queryHistory = query(collection(db, "users", `${currentUserUID}`, "history"))

  useEffect(() => {
    onSnapshot(queryHistory, (snapshot) => {
      setHistory(snapshot.docs.map(doc => ({
          id: doc.id,
          item: doc.data()
      })))
    })

    getDoc(doc(db, "users", `${currentUserUID}`)).then(doc => {
      setEmailAddress(doc.data().email)
      setFirstName(doc.data().firstName)
      setLastName(doc.data().lastName)
      setUsername(doc.data().username)
    })
  }, []);

  const validatePassword = () => {
    if (newPassword.length < 6) throw Error('Password is less than 6 characters');
    if (newPasswordConfirmation != newPassword) throw Error ('Passwords do not match');
  }

  const handleCloseBackdrop = () => {
    setSuccess(false);
  }

  const handleChangePassword = () => {
    try {
      validatePassword();
      updatePassword(auth.currentUser, newPassword).then(() => {
        console.log('Successfully changed passwords');
        setSuccess(true);
      });
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  return (
    <Stack container direction={'column'} spacing={2} sx={{ my: 1, p: 3 }}>
      <Typography variant='h4' color={'black'}>Account</Typography>
      <Stack container direction={'column'} spacing={2} sx={{ width: 400 }}>
        <TextField
          id='first_name'
          value={firstName}
          disabled/>
        <TextField
          id='last_name'
          value={lastName}
          disabled/>
        <TextField
          id='email'
          value={emailAddress}
          disabled/>
        <TextField
          id='username'
          value={username}
          disabled/>
        
        <div/>
        
        <TextField
          id='new_password'
          label='New Password'
          value={newPassword}
          onChange={(event) => setNewPassword(event.target.value)}/>
        <TextField
          id='new_password_confirmation'
          label='Confirm New Password'
          value={newPasswordConfirmation}
          onChange={(event) => setNewPasswordConfirmation(event.target.value)}/>
        <Button variant='contained' onClick={handleChangePassword}>Change password</Button>
        {errorMessage && (
          <Alert severity='error'>{errorMessage}</Alert>
        )}
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={success}
          onClick={handleCloseBackdrop}
        >
          <Alert severity='success'>Password changed!</Alert>
        </Backdrop>
      </Stack>
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
