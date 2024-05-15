import Post from "../post/Post";
import "./posts.scss";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import axios from 'axios'
import { useEffect, useState } from "react";
const Posts = ({userId}) => {
  // const { isLoading, error, data } = useQuery(["posts"], () =>
  //   makeRequest.get("/posts?userId="+userId).then((res) => {
  //     return res.data;
  //   })
    
 // );
 const [data,setData]=useState([])
 const fun=async()=>{
  let res=await axios.get("https://localhost:7015/students/GetPostsById?userId=eefbd8c4-215b-447f-b419-4fbb447ecdae")
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
