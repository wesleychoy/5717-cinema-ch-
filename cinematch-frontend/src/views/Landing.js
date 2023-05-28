import { Button } from '@mui/base';
import { Box } from '@mui/system';
import * as React from 'react';
import { useNavigate } from 'react-router';
import { getAuth, signOut } from '@firebase/auth';
import firebaseApp from '../utils/firebase';
import { Link } from 'react-router-dom';

// export default function Landing() {
//     const auth = getAuth(firebaseApp);
//     const navigate = useNavigate();

//     const navigateToSignIn = () => {
//         navigate('/signin');
//     };

//     const navigateToSignUp = () => {
//         navigate('/signup')
//     }

//     const handleSignOut = async () => {
//         try {
//             await signOut(auth)
//             .then( () => {
//                 console.log("You have signed out");
//                 navigate('/');
//             });
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     return (auth.currentUser)
//     ? (
//         <>
//         <Box>Hello</Box>
//         <Button onClick={handleSignOut}> Sign Out</Button>
//         </>
//     ) : (
//         <>
//         <Box>Hello</Box>
//         <Button onClick={navigateToSignIn}> Sign In</Button>
//         <Button onClick={navigateToSignUp}> Sign Up</Button>
//         </>
//     );

function Landing() {
    return (
      <div className="landing">
        <div className="headerContainer">
          <h1> CINEMA+CH </h1>
          <p> Say goodbye to generic suggestions and enjoy a new level of personalized movie recommendations! </p>
          <Link to="/signin">
            <button> START NOW </button>
        </Link>
        </div>
      </div>
    )
}

export default Landing
// };