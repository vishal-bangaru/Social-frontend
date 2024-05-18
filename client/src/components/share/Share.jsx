import "./share.scss";
import Image from "../../assets/img.png";
import Map from "../../assets/map.png";
import Friend from "../../assets/friend.png";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
const Share = () => {
  const [file, setFile] = useState(null);
  const [desc, setDesc] = useState("");

  
  


  const uploadFile = async (file, id,desc,name) => {
    try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('user_id', id);
        formData.append('content',desc);
        formData.append('owner',name);
      
        console.log(file)
        const response = await fetch('https://localhost:7015/students/PostImg', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            console.log('File uploaded successfully.');
            // Handle success
        } else {
            console.error('Failed to upload file.');
            // Handle failure
        }
    } catch (error) {
        console.error('Error uploading file:', error);
        // Handle error
    }
};



  const { currentUser } = useContext(AuthContext);


 
 
  const handleClick = async (e) => {
    e.preventDefault();
    
    console.log(currentUser.name)
    if (file) await uploadFile(file,localStorage.getItem('user_id'),desc,currentUser.name);
    //mutation.mutate({ desc, img: imgUrl });
    setDesc("");
    setFile(null);
  };

  return (
    <div className="share">
      <div className="container">
        <div className="top">
          <div className="left">
            <img src="https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg" alt="" />
            <input
              type="text"
              placeholder={`What's on your mind ${currentUser.name}?`}
              onChange={(e) => setDesc(e.target.value)}
              value={desc}
            />
          </div>
          <div className="right">
            {file && (
              <img className="file" alt="" src={URL.createObjectURL(file)} />
            )}
          </div>
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <input
              type="file"
              id="file"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
            <label htmlFor="file">
              <div className="item">
                <img src={Image} alt="" />
                <span>Add Post</span>
              </div>
            </label>
            <div className="item">
              <img src={Map} alt="" />
              <span>Add Place</span>
            </div>
            <div className="item">
              <img src={Friend} alt="" />
              <span>Tag Friends</span>
            </div>
          </div>
          <div className="right">
            <button onClick={handleClick}>Share</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;
