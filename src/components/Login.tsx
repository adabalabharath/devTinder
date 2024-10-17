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
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { ADD_USER } from "../redux/actionType";
import { response, User } from "../utils/Types";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
type logType = {
  email: string;
  password: string;
};

const Login = () => {
  const [login, setLogin] = useState<logType>({ email: "", password: "" });
  const [error,setError]=useState('')
  const dispatch = useDispatch();
  const store = useSelector((store: response) => store);
  const navigate = useNavigate();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLogin((prev) => ({ ...prev, [name]: value }));
  };
  const handleLogin = async () => {
    try {
      let response = await axios.post(BASE_URL + "/login", login, {
        withCredentials: true,
      });
      setError('')
      dispatch({ type: ADD_USER, payload: response.data.user });
      return navigate("/");
    } catch (error:any) {
      setError(error.response.data)
      console.log(error);
    }
  };
  console.log(login);
  return (
    <Box
      sx={{
        display: "flex", // Use flexbox for centering
        justifyContent: "center", // Horizontally center
      }}
    >
      <Card sx={{ width: "300px", m: 2 }}>
        <Grid
          container
          direction="column"
          alignItems={"center"}
          spacing={2}
          p={1}
        >
          <Grid item>
            <Typography variant="subtitle2">Login</Typography>
          </Grid>
          <Grid item>
            <InputLabel>Email</InputLabel>
            <TextField onChange={handleChange} name="email" />
          </Grid>
          <Grid item>
            <InputLabel>password</InputLabel>
            <TextField onChange={handleChange} name="password" />
          </Grid>
          {error&&<Grid item>
          <Typography color='error'>{error}</Typography>
         </Grid>}
          <Grid item>
            <Button variant="contained" onClick={handleLogin}>
              Login
            </Button>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
};

export default Login;
