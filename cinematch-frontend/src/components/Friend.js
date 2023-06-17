import { List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { db, auth } from '../utils/firebase';
import { doc, deleteDoc } from '@firebase/firestore';

const Friend = ({ arr }) => {
  let isReceiver = arr.item.receiver == auth.currentUser.uid;
  return isReceiver ? (
    <List className="friend__list">
      <ListItem>
        <ListItemAvatar />
        <ListItemText primary={arr.item.senderUsername} secondary={arr.item.status} />
      </ListItem>
      <DeleteIcon
        fontSize="large"
        style={{ opacity: 0.7 }}
        onClick={() => {
          deleteDoc(doc(db, "friendRequests", arr.id));
        }}
      />
    </List>
  ) : (
    <List className="friend__list">
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
export default Friend;