import { List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';
import { db, auth } from '../utils/firebase';
import { doc, deleteDoc, setDoc } from '@firebase/firestore';

const FriendRequest = ({ arr }) => {
    let toAccept = arr.item.receiver == auth.currentUser.uid;
    return toAccept ? (
        <List className="friendRequest__list">
        <ListItem>
            <ListItemAvatar />
            <ListItemText primary={arr.item.receiverUsername} secondary={arr.item.status} />
        </ListItem>
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
                    status: 'accepted'
                });
            }}
        />
        </List>
    ): (
        <List className="friendRequest__list">
        <ListItem>
            <ListItemAvatar />
            <ListItemText primary={arr.item.receiverUsername} secondary={arr.item.status} />
        </ListItem>
        <DeleteIcon
            fontSize="large"
            style={{ opacity: 0.7 }}
            onClick={() => {
            deleteDoc(doc(db, "friendRequests", arr.id));
            }}
        />
        </List>
    );
};
export default FriendRequest;