import { React, useEffect, useState } from 'react';
import { db } from '../utils/firebase';
import { collection, getDocs } from '@firebase/firestore';

function List(props) {
    //create a new array by filtering the original array
    const [users, setUsers] = useState([]);
    useEffect(() => {
        const fetchUsers = async () => {
          try {
            const querySnapshot = await getDocs(collection(db, "users"));
            const userList = querySnapshot.docs.map(doc => doc.data());
            setUsers(userList);
          } catch (error) {
            console.error('Error fetching users:', error);
          }
        };
    
        fetchUsers();
      }, []);

    const filteredData = users.filter((user) => {
        //if no input the return the original
        if (props.input === '') {
            return user;
        }
        //return the item which contains the user input
        else {
            return user.username.toLowerCase().includes(props.input)
        }
    })
    return (
        <ul>
            {filteredData.map((item) => (
                <li key={item.id}>{item.username}</li>
            ))}
        </ul>
    )
}

export default List