import { List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { db } from '../utils/firebase';
import { doc, deleteDoc } from '@firebase/firestore';

const FriendRequest = ({ arr }) => {
  return (
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