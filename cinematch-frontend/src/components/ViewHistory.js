import { List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import Rating from '@mui/material/Rating';
import DeleteIcon from '@mui/icons-material/Delete';
import { db, auth } from '../utils/firebase';
import { doc, deleteDoc } from '@firebase/firestore';
import '../styles/ViewHistory.css';

const ViewHistory = ({ arr }) => {
  return (
    <List className="view__history">
      <ListItem>
        <ListItemAvatar />
        <ListItemText primary={arr.item.movie} />
      </ListItem>
      <Rating
            name="simple-controlled"
            defaultValue = {arr.item.rating}
            readOnly = {true}
        />
      <DeleteIcon
        fontSize="large"
        style={{ opacity: 0.7 }}
        onClick={() => {
          deleteDoc(doc(db, "users", `${auth.currentUser.uid}`, "history", arr.id));
        }}
      />
    </List>
  ) 
};
export default ViewHistory;