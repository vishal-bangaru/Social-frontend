import Post from "../post/Post";
import "./posts.scss";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import axios from 'axios'
import { useEffect, useState } from "react";
const Posts = ({id}) => {
  // const { isLoading, error, data } = useQuery(["posts"], () =>
  //   makeRequest.get("/posts?userId="+userId).then((res) => {
  //     return res.data;
  //   })
    
 // );
 const currentUserId=localStorage.getItem("user_id")
 const [data,setData]=useState([])
 const fun=async()=>{
  let res=await axios.get(`https://localhost:7015/students/GetPostsById?userId=${id}`)
  setData(res.data);
 }

 useEffect(()=>{
 fun();
 },[data])
  
  return (
    <div className="posts">
    
    {
      

  data?.map((post) => (
   
      <Post post={post} key={post.id} />

  ))
}
    </div>
  );
};

export default Posts;
