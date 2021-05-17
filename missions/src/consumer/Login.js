import React, { useState } from "react";
import { useStateWithLocalStorage } from "../App";
import { Link, Redirect, Switch } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  Container,
  Checkbox,
  FormControlLabel,
  Grid,
  Paper,
  Typography,
  TextField,
  CssBaseline,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
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
    borderRadius: "15px",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#2F80ED",
    borderRadius: "20px",
  },
  Link: {
    color: "#BDBDBD",
    textDecoration: "none",
  },
}));

// Daddy's part
function Login() {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useStateWithLocalStorage(1);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePaswordChange = (e) => {
    setPassword(e.target.value);
  };

  const submitSignInForm = async () => {
    let res = await axios.post("http://localhost:4000/sign_in/submit", {
      email: email,
      passwordcheck: password,
    });
    let data = res.data;
    if (data.user_id !== null) {
      // alert("Login Successfully");
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
        maxWidth="xs"
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
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography
              component="h1"
              variant="h4"
              style={{
                textAlign: "left",
                fontWeight: "600",
                margin: "2vw 0",
              }}
            >
              Welcome back
            </Typography>
            <div className={classes.form} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={handleEmailChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handlePaswordChange}
              />
              <Grid
                container
                justify="center"
                alignItems="center"
                style={{ margin: "1vw 0" }}
              >
                <Grid item>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={submitSignInForm}
                  >
                    Sign In
                  </Button>
                </Grid>
              </Grid>
              {/* <Grid item style={{ textAlign: "center" }}>
                  <Link href="#" variant="body2" className={classes.Link}>
                    Forgot password?
                  </Link>
                </Grid> */}
              <Grid item style={{ textAlign: "center" }}>
                <Link
                  to="/sign_up_legalCheck"
                  variant="body2"
                  className={classes.Link}
                >
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </div>
          </div>
          <div
            style={{
              width: "100%",
              height: "40px",
              marginTop: "5px",
              padding: "5px",
              backgroundColor: "#4F4F4F",
              display: "flex",
              borderRadius: "15px",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Grid item style={{ textAlign: "center" }}>
              <Link to="/login_vendor" variant="body2" className={classes.Link}>
                {"Are you a business? Click here!"}
              </Link>
            </Grid>
          </div>
        </Box>
      </Container>
    </div>
  );
}

export default Login;
