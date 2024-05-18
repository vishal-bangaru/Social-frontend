import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
JSON.parse(localStorage.getItem("user")) || null
  );
  const [allUsers,setAllUsers]=useState([]);
  const [flag,setFlag]=useState(false);
  const login = async (inputs) => {
     const res=await axios.post(`https://localhost:7015/students/Login`, inputs);
     
      localStorage.setItem('user_id',res.data.user_id)
    setCurrentUser(res.data)
  
  };

  useEffect(() => {
    
    localStorage.setItem("user", JSON.stringify(currentUser));
     }, [currentUser]);
  useEffect(()=>{
    axios.get("https://localhost:7015/students/GetAllStudents")
    .then(res=>setAllUsers(res.data))
    .catch(err=>console.log(err));
  },[])
  return (
    <AuthContext.Provider value={{ currentUser, login,allUsers,setFlag,flag }}>
      {children}
    </AuthContext.Provider>
  );
};
