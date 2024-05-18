import "./profile.scss";
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Posts from "../../components/posts/Posts";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { useLocation, useParams } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/authContext";
import Update from "../../components/update/Update";
import { useState } from "react";
import axios from "axios";
import Navbar from "../../components/navbar/Navbar";
const Profile = () => {
  const [openUpdate, setOpenUpdate] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const [user,setUser]=useState({})
  //const [currentUser,setCurrentUser]=useState({});
  const {id}=useParams();
  console.log(id)
  useEffect(()=>{
    axios.get(`https://localhost:7015/students/GetStudentById?id=${id}`)
    .then(res=>setUser(res.data))
    .catch(err=>console.log(err))

  },[id])
  const cur_id=localStorage.getItem("user_id")
  // useEffect(()=>{
  //   axios.get(`https://localhost:7015/students/GetStudentById?id=${cur_id}`)
  //   .then(res=>setCurrentUser(res.data))
  //   .catch(err=>console.log(err))

  // },[])
  const handleFollow=(req_id)=>{
      
    axios.post(`https://localhost:7015/students/Request?cur_id=${cur_id}&req_id=${req_id}`)
    .then(res=>
      console.log(res.data)
    )
    .catch(err=>console.log(err))
}
  

  return (
    <div className="profile">
      
        <>
          <div className="images">
            <img src="https://img.freepik.com/free-vector/digital-technology-background-with-abstract-wave-border_53876-117508.jpg" alt="" className="cover" />
            <img src="https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg" alt="" className="profilePic" />
          </div>
          <div className="profileContainer">
            <div className="uInfo">
              <div className="left">
                
                <a href="http://facebook.com">
                  <InstagramIcon fontSize="large" />
                </a>
                
                <a href="http://facebook.com">
                  <LinkedInIcon fontSize="large" />
                </a>
                
              </div>
              <div className="center">
                <span>{user.name}</span>
                <div className="info">
                  <div className="item">
                    <PlaceIcon />
                    <span>Hyderabad,Telangana</span> 
                  </div>
                  {/* <div className="item">
                    <LanguageIcon />
                    <span></span>
                  </div> */}
                </div>
               {
                 currentUser.user_id===id ?
                  <button onClick={() => setOpenUpdate(true)}>update</button>
                  :
                  currentUser.requests?.includes(id)
                  ?
                  <button >Requested</button>
                  :
                  currentUser.following?.includes(id)
                  ?
                  <button >Message</button>
                  :
                  user.approvals?.includes(cur_id) ? 
                <button>Requested</button>
                :
                <button onClick={()=>{handleFollow(user.id)}}>follow</button>
               }
               
                  {/* <button onClick={handleFollow}>
                    {relationshipData.includes(currentUser.id)
                      ? "Following"
                      : "Follow"}
                  </button>
                */}
              </div>
              <div className="right">
                <EmailOutlinedIcon />
                <MoreVertIcon />
              </div>
              
            </div>
            <p style={{textAlign:"center",color:"grey",fontWeight:"bold",margin:"10px"}}>Posts</p>
            <Posts id={id}/>
          </div>
        </>
      
      {/* {openUpdate && <Update setOpenUpdate={setOpenUpdate} user={data} />} */}
    </div>
  );
};

export default Profile;
