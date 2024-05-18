import "./navbar.scss";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { AuthContext } from "../../context/authContext";
import axios from "axios";
import { useEffect } from "react";
const Navbar = () => {
  const { toggle, darkMode } = useContext(DarkModeContext);
  const { currentUser } = useContext(AuthContext);
  const [users,setUsers]=useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();
  function handleLogout(){
    localStorage.clear();
    navigate('/login')
  }
  useEffect(()=>{
    axios.get("https://localhost:7015/students/GetAllStudents")
    .then(res=>{setUsers(res.data)})
    .catch(err=>console.log(err));

},[])
const handleChange = event => {
  setSearchTerm(event.target.value);
  // Filter data based on search term
  const results = users.filter(item =>
    item.name.toLowerCase().includes(event.target.value.toLowerCase())
  );
  setSearchResults(results);
};
  return (
    <div className="navbar">
      <div className="left">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span>Social Blade</span>
        </Link>
        <HomeOutlinedIcon />
        {darkMode ? (
          <WbSunnyOutlinedIcon onClick={toggle} />
        ) : (
          <DarkModeOutlinedIcon onClick={toggle} />
        )}
        {/* <GridViewOutlinedIcon /> */}
        <div className="search">
          <SearchOutlinedIcon />
          <input type="text" placeholder="Search..."  value={searchTerm}
        onChange={handleChange} />
        {
          searchTerm &&
          <div style={{width:"500px",border:"1px solid white",position:"absolute",
            top:"55px",marginLeft:"35px",padding:"15px"
          }} className="searchDiv">
              {
                searchResults.length>0?
                searchResults.map((user)=>
                  (<div onClick={()=>{navigate(`/profile/${user.id}`);setSearchTerm("")}} className="user"
                style={{ cursor: 'pointer' }}>
                    <img  
            src="https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg"
            alt=""/>
                    {user.name}
                    </div>))
                :<div>No users found</div>
              }
          </div>
          }
        </div>
        

      </div>
      
      <div className="right">
        {/* <PersonOutlinedIcon />
        <EmailOutlinedIcon /> */}
        <NotificationsOutlinedIcon />
        <div className="user"  >
          <img
            src="https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg"
            alt=""
            onClick={()=>{navigate(`/profile/${localStorage.getItem("user_id")}`)}}
            style={{ cursor: 'pointer' }}
            />
          <span>{currentUser.name}</span>
          <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
        </div>
      </div>
      
    </div>
  );
};

export default Navbar;
