import React, { useEffect, useState } from 'react';
import { AuthContext } from "../../context/authContext";
import { useContext } from 'react';
import './friends.scss';  // Import the CSS file
import Navbar from '../../components/navbar/Navbar';
import LeftBar from '../../components/leftBar/LeftBar';
import RightBar from '../../components/rightBar/RightBar';
import axios from 'axios';
const Friends = () => {
 const cur_id=localStorage.getItem("user_id");
 const [currentUser,setCurrentUser]=useState({});
 const [allUsers,setAllUsers]=useState([]);
 
  useEffect(()=>{
    axios.get(`https://localhost:7015/students/GetStudentById?id=${cur_id}`)
    .then(res=>setCurrentUser(res.data))
    .catch(err=>console.log(err))
  },[])
  useEffect(()=>{
    axios.get("https://localhost:7015/students/GetAllStudents")
    .then(res=>setAllUsers(res.data))
    .catch(err=>console.log(err))
  },[])

  
  const [f1,setf1]=useState(false)
  
  const getUserNameById = (id) => {
    const user = allUsers.find(user => user.user_id === id);
    return user ? user.name : 'Unknown';
  };

  return (
    <div className="friends-container ">
     <div className='header'>
      <button onClick={()=>{setf1(false)}}>Following</button>
      <button onClick={()=>{setf1(true)}}>Followers</button>
     </div>
      <table className="friends-table">
        <thead>
          <tr>
            
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              {f1==false ? currentUser.following?.map(friend => (
                <p key={friend}>{getUserNameById(friend)}</p>
              ))
            :
            currentUser.followers?.map(friend => (
              <p key={friend}>{getUserNameById(friend)} </p>
            ))
                
            }
            </td>
            {/* <td>
              {currentUser.followers.map(friend => (
                <p key={friend}>{getUserNameById(friend)}</p>
              ))}
            </td> */}
          </tr>
        </tbody>
      </table>
      
    </div>
   
    
    
  );
}

export default Friends;
