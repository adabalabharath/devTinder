import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import ResponsiveAppBar from "./components/ResponsiveAppBar";
import { Route, Routes, useNavigate } from "react-router-dom";
import Feed from "./components/Feed";
import Login from "./components/Login";
import Test from "./components/Profile";
import Profile from "./components/Profile";
import Connections from "./components/Connections";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { ADD_USER } from "./redux/actionType";
import { response } from "./utils/Types";

function App() {
  const user=useSelector((store:response)=>store)
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const fetchUser = async () => {
    try {
      let response = await axios.get("http://localhost:7777/profile",{withCredentials:true});
      dispatch({ type: ADD_USER, payload: response.data });
      if(!response.data.firstName){
        navigate('/login')
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
   
    fetchUser();
  }, []);

  return (
    <>
      <ResponsiveAppBar />
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/connections" element={<Connections />} />
      </Routes>
    </>
  );
}

export default App;
