import { Stack, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import Rating from '@mui/material/Rating';
import DeleteIcon from '@mui/icons-material/Delete';
import { db, auth } from '../utils/firebase';
import { doc, deleteDoc } from '@firebase/firestore';
import '../styles/ViewHistory.css';
import FilmIcon from './FilmIcon';

const ViewHistory = ({ arr }) => {
  return (
    <Stack direction={'column'} alignItems={'center'} spacing={2}>
        <FilmIcon film={arr.item.film}/>
        <Stack direction={'row'} alignItems={'space-around'} spacing={2}>
          <Rating
            name="simple-controlled"
            defaultValue = {arr.item.rating}
            readOnly = {true}
          />
          <DeleteIcon
            fontSize="large"
            style={{ color:'black',  opacity: 0.7 }}
            onClick={() => {
              deleteDoc(doc(db, "users", `${auth.currentUser.uid}`, "history", arr.id));
            }}
          />
        </Stack>
    </Stack>
  ) 
};
export default ViewHistory;