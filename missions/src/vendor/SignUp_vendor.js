import React, { useState } from "react";
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
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import axios from "axios";

const theme = createMuiTheme({
  palette: {
    type: "light",
  },
});

// style sheet
const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(4),
    backgroundColor: "#f3f3f3",
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

const VendorTextField = withStyles({
  root: {
    "& label": {
      color: "#adadad",
    },
    "& label.Mui-focused": {
      color: "black",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "black",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "black",
      },
      "&:hover fieldset": {
        borderColor: "#0068cd",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#0068cd",
      },
    },
    "& .MuiInputBase-input": {
      color: "#1654ab",
      fontWeight: "600",
    },
  },
})(TextField);

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

// Daddy's part
function SignUp_vendor() {
  const classes = useStyles();
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [website, setWebsite] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [ABN, setABN] = useState("");
  const [user, setUser] = useStateWithLocalStorage(1);
  const [vendor, setVendor] = useStateWithLocalStorage(50);

  const handleCompanyNameChange = (e) => {
    setCompanyName(e.target.value);
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
  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };
  const handleWebChange = (e) => {
    setWebsite(e.target.value);
  };
  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };
  const handleABNChange = (e) => {
    setABN(e.target.value);
  };

  const submitUserSignUpForm = async () => {
    let today = new Date().toISOString().substring(0, 10);
    let res = await axios.post("http://localhost:4000/sign_up_vendor/submit", {
      companyName: companyName,
      email: email,
      password: confirmedPassword,
      website: website,
      address: address,
      phone: phone,
      ABN: ABN,
      date: today,
      industryId: 1,
    });
    alert("Log in right now....");
    let data = res.data;
    if (data.vendor_id !== null) {
      setVendor(data.vendor_id);
      window.location.replace(
        `http://localhost:3000/${data.vendorId}/profile_vendor`
      );
    } else {
      alert(data.Message);
      window.location.replace(`http://localhost:3000/login_vendor`);
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
              <Typography
                component="h1"
                variant="h5"
                style={{ color: "#303030", fontWeight: "600" }}
              >
                Sign up
              </Typography>
              <div className={classes.form} noValidate>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <VendorTextField
                      autoComplete="username"
                      name="companyName"
                      variant="outlined"
                      required
                      fullWidth
                      id="companyName"
                      label="company name"
                      autoFocus
                      onChange={handleCompanyNameChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <VendorTextField
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
                    <VendorTextField
                      variant="outlined"
                      required
                      fullWidth
                      id="address"
                      label="Company Address"
                      name="address"
                      autoComplete="street-address"
                      onChange={handleAddressChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <VendorTextField
                      variant="outlined"
                      required
                      fullWidth
                      name="company-website"
                      label="Company website"
                      type="url"
                      id="url"
                      autoComplete="url"
                      onChange={handleWebChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <VendorTextField
                      autoComplete="tel"
                      name="phone-number"
                      variant="outlined"
                      required
                      fullWidth
                      id="number"
                      label="Phone number"
                      autoFocus
                      onChange={handlePhoneChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <VendorTextField
                      variant="outlined"
                      required
                      fullWidth
                      id="ABN"
                      label="ABN"
                      name="ABN"
                      onChange={handleABNChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <VendorTextField
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
                    <VendorTextField
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

export default SignUp_vendor;
