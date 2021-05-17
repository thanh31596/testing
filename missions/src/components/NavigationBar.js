import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useStateWithLocalStorage } from "../App";
import {
  Avatar,
  Button,
  Container,
  Grid,
  TextField,
  IconButton,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { teal } from "@material-ui/core/colors";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  link: {
    padding: theme.spacing(2),
    textDecoration: "none",
  },
  orange: {
    color: theme.palette.getContrastText(teal[500]),
    backgroundColor: teal[500],
  },
}));

function NavigationBar() {
  const [user, setUser] = useStateWithLocalStorage(1);
  const [vendor, setVendor] = useStateWithLocalStorage(50);
  const classes = useStyles();
  const [search, setSearch] = useState("$rH7fB");
  const [avatar, setAvatar] = useState([]);
  //const userId = 1; //////TEMPORARY UNTIL CONTEXT

  useEffect(async () => {
    if (user != 0 && user != undefined) {
      const url = `http://localhost:4000/user/${user}`;
      let res = await axios.get(url);
      let data = res.data;
      let fetchedUser = data.User[0];

      let avatarId = fetchedUser.avatar_id;

      const urlAvatar = `http://localhost:4000/avatar/${avatarId}`;
      let aRes = await axios.get(urlAvatar);
      let aData = aRes.data;
      setAvatar(aData.Avatar[0].avatar_picture);
    }
  }, []);

  return (
    <div>
      <Container>
        <Grid
          container
          direction="row"
          justify="space-around"
          alignItems="center"
        >
          <Grid item>
            <Link to={`/${user}/`} className={classes.link}>
              <Button>Home</Button>
            </Link>
          </Grid>

          <Grid item>
            <Link to={`/${user}/mission_catalogue`} className={classes.link}>
              <Button>Mission Catalogue</Button>
            </Link>
          </Grid>
          <Grid item>
            <TextField
              id="search_mission"
              label="Search mission"
              onChange={(event) => {
                if (isEmptyOrSpaces(event.target.value)) {
                  setSearch("$rH7fB");
                } else setSearch(event.target.value);
              }}
            />
            <Link to={`/${user}/search/${search}`} className={classes.link}>
              <Button>Search</Button>
            </Link>
          </Grid>

          {user == 0 ? null : (
            <>
              <Grid item>
                <Link to={`/${user}/cart`} className={classes.link}>
                  <Button>cart</Button>
                </Link>
              </Grid>
              <Grid item>
                <Link
                  to={`/${user}/profile`}
                  style={{ textDecoration: "none" }}
                >
                  <IconButton aria-label="account" className={classes.margin}>
                    {/* <AccountCircleIcon /> */}
                    <Avatar
                      alt="Avatar"
                      src={`${process.env.PUBLIC_URL}/img/avatars/${avatar}`}
                    />
                  </IconButton>
                </Link>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  style={{ marginLeft: "10px" }}
                  onClick={() => {
                    setUser(0);
                    window.location.replace("http://localhost:3000/0/");
                  }}
                >
                  Log out
                </Button>
              </Grid>
            </>
          )}
          {vendor == 0 ? null : (
            <>
              <Grid item>
                <Link
                  to={`/${vendor}/profile_vendor`}
                  style={{ textDecoration: "none" }}
                >
                  <Avatar className={classes.orange}>{vendor}</Avatar>
                </Link>
              </Grid>
              <Grid item>
                {/* <Link to="/" style={{ textDecoration: "none" }}> */}
                <Button
                  variant="contained"
                  color="primary"
                  style={{ marginLeft: "10px" }}
                  onClick={() => {
                    setVendor(0);
                  }}
                >
                  Log out
                </Button>
                {/* </Link> */}
              </Grid>
            </>
          )}
        </Grid>
      </Container>
    </div>
  );
}

export default NavigationBar;

function isEmptyOrSpaces(str) {
  return str === null || str.match(/^ *$/) !== null;
}
