import Stories from "../../components/stories/Stories"
import Posts from "../../components/posts/Posts"
import Share from "../../components/share/Share"
import "./home.scss"
import axios from "axios"
import { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar"

const Home = () => {
  const cur_id=localStorage.getItem("user_id");
const [user,setUser]=useState({});

useEffect(()=>{
  axios.get(`https://localhost:7015/students/GetStudentById?id=${cur_id}`)
  .then(res=>setUser(res.data))
  .catch(err=>console.log(err))
 },[])
  return (
    <div className="home">
      
      <Share/>
      {
        user.following?.map((id)=>(
          <Posts id={id}/>
        ))
      
      }
    </div>
  )
}

export default Home