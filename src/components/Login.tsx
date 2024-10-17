import {
    Box,
  Button,
  Card,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import React, { ChangeEvent, useState } from "react";
import axios from 'axios'
type logType={
    email:string,
    password:string
}
const Login = () => {
    const [login,setLogin]=useState<logType>({email:'',password:''})
    const handleChange=(e:ChangeEvent<HTMLInputElement>)=>{
        const {name,value}=e.target
        setLogin((prev)=>({...prev,[name]:value}))
    }
    const handleLogin=async()=>{
        try{
      let response=await axios.post('http://localhost:7777/login',login,{withCredentials:true})
      console.log(response.data)
        }catch(error){
          console.log(error.message)
        }
    }
    console.log(login)
  return (
    <Box
      sx={{
        
        display: "flex", // Use flexbox for centering
        justifyContent: "center", // Horizontally center
        
      }}
    >
    <Card sx={{width:'300px',m:2}}>
      <Grid container direction="column" alignItems={'center'} spacing={2} p={1}>
        <Grid item><Typography variant='subtitle2'>Login</Typography></Grid>
        <Grid item>
          <InputLabel>Email</InputLabel>
          <TextField onChange={handleChange} name='email'/>
        </Grid>
        <Grid item>
          <InputLabel>password</InputLabel>
          <TextField onChange={handleChange} name='password'/>
        </Grid>
      <Grid item><Button variant="contained" onClick={handleLogin}>Login</Button></Grid>
      </Grid>
      
    </Card>
    </Box>
  );
};

export default Login;
