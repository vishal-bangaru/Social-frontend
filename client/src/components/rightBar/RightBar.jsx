import { useEffect, useState } from "react";
import "./rightBar.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const RightBar = () => {
  // https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600
  const [users,setUsers]=useState([])
  let cur_id=localStorage.getItem('user_id')
  const [acc,setAcc]=useState(false);
  const navigate=useNavigate();
  const handleFollow=(req_id)=>{
      
      axios.post(`https://localhost:7015/students/Request?cur_id=${cur_id}&req_id=${req_id}`)
      .then(res=>
        console.log(res.data)
      )
      .catch(err=>console.log(err))
  }
  const handleAccept=(app_id)=>{
      
    axios.post(`https://localhost:7015/students/Approve?cur_id=${cur_id}&app_id=${app_id}`)
    .then((res)=>{
      console.log(res.data);
      setAcc(true);
    }
    )
    .catch(err=>console.log(err))
}


  useEffect(()=>{
       axios.get("https://localhost:7015/students/GetAllStudents")
       .then(res=>{setUsers(res.data)})
       .catch(err=>console.log(err));

  },[users])
  return (
    <div className="rightBar">
      <div className="container">
        <div className="item" style={{overflowY:"auto",scrollbarWidth:"thin"}}>
          <span>Suggestions For You</span>
          {
            users.filter(user=>user.user_id!==cur_id   && !user.followers.includes(cur_id) && !user.following.includes(cur_id) ).map((user)=>(
              <div className="user" >
            <div className="userInfo">
              <img
                src="https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg"
                alt=""
              />
              <span>{user.name}</span>
            </div>
            <div className="buttons">
              
              {
                user.approvals.includes(cur_id)? 
                <button>Requested</button>
                :
                user.following.includes(cur_id) ?

                <button onClick={()=>{handleFollow(user.user_id)}}>follow back</button>
                :
                <button onClick={()=>{handleFollow(user.user_id)}}>follow </button>

              }
              
            </div>
          </div>
          


            ))
          }
          
        </div>

        <div className="item">
          <span>Friend Requests ({
          users.filter(user=>user.id===cur_id)[0]?.approvals.length})</span>
          {
           
              
            users.filter(user=>user.id===cur_id)[0]?.approvals?.
            map((friend)=>(
              <div className="user">
             
              <div className="userInfo">
                <img
                  src="https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg"
                  alt=""
                />
                <span>{users.filter(user=>user.id==friend)[0]?.name}</span>
              </div>
              <div className="buttons">
                {
                acc?<button>Accepted</button>:
                <button onClick={()=>{handleAccept(friend)}}>Accept</button>
                }
                <button>dismiss</button>
              </div>
            </div>
          ))
        
          }







          {/* <div className="user">
            <div className="userInfo">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <p>
                <span>Rushyendra</span> commented on your post
              </p>
            </div>
            <span>1 min ago</span>
          </div> */}
         
        </div>
        {/* <div className="item">
          <span>Online Friends</span>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <div className="online" />
              <span>Nitish</span>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <div className="online" />
              <span>Sahil</span>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <div className="online" />
              <span>Rushyendra</span>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <div className="online" />
              <span>Vishal</span>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <div className="online" />
              <span>Disha</span>
            </div>
          </div>
          

        </div> */}
      </div>
    </div>
  );
};

export default RightBar;
