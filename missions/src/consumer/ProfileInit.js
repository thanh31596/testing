import React, { useState } from "react";
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
import { useEffect } from "react";
import ListofHobbies from "../components/ListofHobbies.json";

// style sheet
const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(4),
    backgroundColor: "#333333",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: "15px",
    padding: "40px",
  },
  form: { marginTop: "2vh" },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#2F80ED",
    borderRadius: "20px",
  },
  Link: {
    color: "#333333",
    textDecoration: "none",
  },
}));

// Daddy's part
function ProfileInit(props) {
  const classes = useStyles();
  const [listofIntrest, setListofIntrest] = useState([]);

  useEffect(() => {
    let res = ListofHobbies;
    let listofHobbies = res.map((intrest) => ({
      category: intrest.category,
      subCategory: intrest.subCategory,
      title: intrest.title,
    }));
    // console.log(listofHobbies);
    setListofIntrest(listofHobbies);
  }, []);

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
            <Grid lg={10}>
              <Typography
                component="h1"
                variant="h4"
                style={{ fontWeight: "600", margin: "15px 0px" }}
              >
                Hi, {props.name}
              </Typography>
              <Typography
                component="p"
                variant="caption"
                style={{ marginBottom: "2vw" }}
              >
                Pick your interests!
              </Typography>
              {listofIntrest.slice(0, 40).map((interest) => {
                return <PreferencesButton name={interest.title} value={0} />;
              })}
            </Grid>
            <Link to="/profile" className={classes.Link}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Good to go!
              </Button>
            </Link>
          </div>
        </Box>
      </Container>
    </div>
  );
}

export default ProfileInit;

function PreferencesButton({ name, value }) {
  const [interest, setInterest] = useState(value);

  function toggle() {
    if (interest == 1) {
      setInterest(0);
    } else setInterest(1);
  }

  if (interest !== 1) {
    return (
      <Button
        variant="contained"
        color="default"
        size="small"
        style={{
          margin: "5px",
          padding: "5px 15px",
          borderRadius: "30px",
        }}
        onClick={toggle}
      >
        {name}
      </Button>
    );
  }
  if (interest == 1) {
    return (
      <Button
        variant="contained"
        color="secondary"
        size="small"
        style={{
          margin: "5px",
          padding: "5px 15px",
          borderRadius: "30px",
        }}
        onClick={toggle}
      >
        {name}
      </Button>
    );
  }
}
