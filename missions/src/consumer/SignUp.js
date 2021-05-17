import React, { useState, Redirect } from "react";
import { useStateWithLocalStorage } from "../App";
import { Link } from "react-router-dom";
import {
  Avatar,
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  CssBaseline,
  GridList,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import axios from "axios";

// style sheet
const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(4),
    backgroundColor: "#333333",
    // backgroundColor: "#f3f3f3",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: "15px",
  },
  form: { marginTop: "2vh" },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#2F80ED",
    borderRadius: "20px",
  },
  Link: {
    color: "white",
    color: "#333333",
    textDecoration: "none",
  },
  gridList: {
    overflowY: "auto",
    margin: 0,
    padding: 0,
    listStyle: "none",
    "&::-webkit-scrollbar": {
      width: "0.4em",
    },
    "&::-webkit-scrollbar-track": {
      boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
      webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#676767",
      borderRadius: "3px",
    },
  },
}));

// Daddy's part
function SignUp() {
  const classes = useStyles();
  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [user, setUser] = useStateWithLocalStorage(1);

  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
  };

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };
  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePaswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleComfiredPasswordChange = (e) => {
    setConfirmedPassword(e.target.value);
  };

  const submitUserSignUpForm = async () => {
    let today = new Date().toISOString().substring(0, 10);
    let res = await axios.post("http://localhost:4000/sign_up/submit", {
      userName: userName,
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: confirmedPassword,
      date: today,
    });
    let data = res.data;
    alert("Log in right now....");
    if (data.user_id !== null) {
      setUser(data.user_id);
      window.location.replace(`http://localhost:3000/${data.user_id}/profile`);
    } else {
      alert(data.Message);
      window.location.replace(`http://localhost:3000/login`);
    }
  };

  return (
    <div
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1504178407133-4b28437a5a6d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1934&q=80)",
        height: "100vh",
      }}
    >
      <Container
        component="main"
        style={{
          height: "90%",
        }}
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          style={{ height: "100%" }}
        >
          <div className={classes.paper}>
            <Grid lg={6}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign up
              </Typography>
              <div className={classes.form} noValidate>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      autoComplete="username"
                      name="username"
                      variant="outlined"
                      required
                      fullWidth
                      id="username"
                      label="user name"
                      autoFocus
                      onChange={handleUserNameChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="fname"
                      name="firstName"
                      variant="outlined"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      autoFocus
                      onChange={handleFirstNameChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      autoComplete="lname"
                      onChange={handleLastNameChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      onChange={handleEmailChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      onChange={handlePaswordChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      name="password"
                      label="Comfirmed Password"
                      type="password"
                      id="ComfirmedPassword"
                      onChange={handleComfiredPasswordChange}
                    />
                  </Grid>
                </Grid>
                {/* <Link to="/profileinit" className={classes.Link}> */}
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={submitUserSignUpForm}
                >
                  Sign Up
                </Button>
              </div>
            </Grid>
          </div>
        </Box>
      </Container>
    </div>
  );
}

export default SignUp;
