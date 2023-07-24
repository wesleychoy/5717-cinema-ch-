import { Card, Stack, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';
import { db, auth } from '../utils/firebase';
import { doc, deleteDoc, setDoc } from '@firebase/firestore';
import '../styles/FriendRequest.css';

const FriendRequest = ({ arr }) => {
    let isReceiver = arr.item.receiver == auth.currentUser.uid;
    return isReceiver ? (
        <Card sx={{ maxWidth: 800 }}>
            <Stack direction={'row'} justifyContent='space-between' spacing={2} sx={{ my: 2, p: 2 }}>
                <Stack direction={'column'} justifyContent='space-between'>
                    <Typography variant='h4' color={'black'} sx={{ fontSize: 20, fontWeight: 'bold' }}>{arr.item.senderUsername}</Typography>
                    <Typography variant='subtitle1' color={'black'} textTransform={'uppercase'}>{arr.item.status}</Typography>
                </Stack>
                <DeleteIcon
                    fontSize="large"
                    style={{ opacity: 0.7 }}
                    onClick={() => {
                    deleteDoc(doc(db, "friendRequests", arr.id));
                    }}
                />
                <DoneIcon
                    fontSize="large"
                    style={{ opacity: 0.7 }}
                    onClick={() => {
                        setDoc(doc(db, "friendRequests", arr.id), {
                            sender: arr.item.sender,
                            receiver: arr.item.receiver,
                            receiverUsername: arr.item.receiverUsername,
                            senderUsername: arr.item.senderUsername,
                            status: 'accepted'
                        });
                    }}
                />
            </Stack>
        </Card>
    ): (
        <Card sx={{ maxWidth: 800 }}>
            <Stack direction={'row'} justifyContent='space-between' spacing={2} sx={{ my: 2, p: 2 }}>
                <Stack direction={'column'} justifyContent='space-between'>
                    <Typography variant='h4' color={'black'} sx={{ fontSize: 20, fontWeight: 'bold' }}>{arr.item.receiverUsername}</Typography>
                    <Typography variant='subtitle1' color={'black'} textTransform={'uppercase'}>{arr.item.status}</Typography>
                </Stack>
                <DeleteIcon
                fontSize="large"
                style={{ opacity: 0.7 }}
                onClick={() => {
                    deleteDoc(doc(db, "friendRequests", arr.id));
                }}
                />
            </Stack>
        </Card>
    );
};
export default FriendRequest;