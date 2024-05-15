import { useContext, useState } from "react";
import "./comments.scss";
import { AuthContext } from "../../context/authContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import moment from "moment";
import axios from 'axios'

const Comments = ({ post }) => {
  const [desc, setDesc] = useState("");
  const { currentUser } = useContext(AuthContext);

  // const { isLoading, error, data } = useQuery(["comments"], () =>
  //   makeRequest.get("/comments?postId=" + postId).then((res) => {
  //     return res.data;
  //   })
  // );

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (newComment) => {
      return makeRequest.post("/comments", newComment);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["comments"]);
      },
    }
  );

  const handleClick = async (e) => {
    e.preventDefault();
    await axios.post("https://localhost:7015/students/InsertComment",{
    name:currentUser.name,
    post_id:post.id,
    desc:desc
    })
    setDesc("");
  };

  return (
    <div className="comments">
      <div className="write">
        <img src="https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg" alt="" />
        <input
          type="text"
          placeholder="write a comment"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <button onClick={handleClick}>Send</button>
      </div>
      { post.comments.map((comment) => (
            <div className="comment">
              <img src="https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg" alt="" />
              <div className="info">
                <span>{comment.name}</span>
                <p>{comment.desc}</p>
              </div>
              <span className="date">
                {moment(comment.createdAt).fromNow()}
              </span>
            </div>
          ))}
    </div>
  );
};

export default Comments;
