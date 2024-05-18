import "./post.scss";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from "react-router-dom";
import Comments from "../comments/Comments";
import { useEffect, useState } from "react";
import moment from "moment";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import axios from "axios";

const Post = ({ post,user }) => {
  const [commentOpen, setCommentOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [liked,setLiked]=useState(false);
  const { currentUser } = useContext(AuthContext);

  // const { isLoading, error, data } = useQuery(["likes", post.id], () =>
  //   makeRequest.get("/likes?postId=" + post.id).then((res) => {
  //     return res.data;
  //   })
  // );

  // const queryClient = useQueryClient();

  // const mutation = useMutation(
  //   (liked) => {
  //     if (liked) return makeRequest.delete("/likes?postId=" + post.id);
  //     return makeRequest.post("/likes", { postId: post.id });
  //   },
  //   {
  //     onSuccess: () => {
  //       // Invalidate and refetch
  //       queryClient.invalidateQueries(["likes"]);
  //     },
  //   }
  // );
  // const deleteMutation = useMutation(
  //   (postId) => {
  //     return makeRequest.delete("/posts/" + postId);
  //   },
  //   {
  //     onSuccess: () => {
  //       // Invalidate and refetch
  //       queryClient.invalidateQueries(["posts"]);
  //     },
  //   }
  // );

  const handleLike = async() => {
    
  
  const formData = new FormData();
formData.append('post_id', post.id);
formData.append('user_id', localStorage.getItem("user_id"));
 await axios.post("https://localhost:7015/students/Likes",formData
  )
  };
  const renderMedia = () => {
    if (post && post.post) {
      const fileExtension = post.post.split('.').pop().toLowerCase();
      const isImage = ['jpg', 'jpeg', 'png', 'gif'].includes(fileExtension);
      const isVideo = ['mp4', 'webm', 'ogg'].includes(fileExtension);

      if (isImage) {
        return <img src={post.post} alt="Media content" 
        />;
      } else if (isVideo) {
        return (
          <video controls style={{width:"100%",
            maxHeight:"500px",objectFit:"cover",
            marginTop:"20px"
          }}>
            <source src={post.post} type={`video/${fileExtension}`} />
            Your browser does not support the video tag.
          </video>
        );
      } else {
        return <p>Unsupported media type</p>;
      }
    }
    return null;
  };

  // const handleDelete = () => {
  //   deleteMutation.mutate(post.id);
  // };
  
//console.log(post.likes)

  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img src="https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg" alt="aaa" />
            <div className="details">
              <Link
                to={`/profile/1`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="name">{post.owner}</span>
              </Link>
              <span className="date">{moment(post.created).fromNow()}</span>
            </div>
          </div>
          <MoreHorizIcon onClick={() => setMenuOpen(!menuOpen)} />
          {menuOpen && post.userId === currentUser.id && (
            <button >delete</button>
          )}
        </div>
        <div className="content">
          <p>{post.content}</p>

          {renderMedia()}
        </div>
        <div className="info">
          <div className="item" onClick={handleLike} >
            {
            //isLoading ? (
            //   "loading"
            // ) : data.includes(currentUser.id) ? (
            //   <FavoriteOutlinedIcon
            //     style={{ color: "red" }}
               
            //   />
            // ) :
            //  (

           post.likes.includes(localStorage.getItem("user_id"))?  <FavoriteOutlinedIcon
                style={{ color: "red" }}/> : <FavoriteBorderOutlinedIcon  />
            // )
            
            }
             {post?.likes?.length} 
             <p>Likes</p>     
         
          </div>
          <div className="item" onClick={() => setCommentOpen(!commentOpen)}  >
            <TextsmsOutlinedIcon />
          Comments
          </div>
          <div className="item">
            <ShareOutlinedIcon />
            Share
          </div>
        </div>
        {commentOpen && <Comments post={post} />}
      </div>
    </div>
  );
};

export default Post;
