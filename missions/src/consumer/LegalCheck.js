import React, { useState, Redirect } from "react";
import { Link, Route } from "react-router-dom";
import {
  Grid,
  Typography,
  GridList,
  Button,
  Box,
  Container,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

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

export default function LegalCheck(props) {
  const classes = useStyles();

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
            <Grid lg={8}>
              <Grid style={{ alignItems: "left", marginTop: "1vh" }} lg={12}>
                <Link to="/login" className={classes.Link}>
                  <ArrowBackIcon />
                </Link>
              </Grid>
              <Typography
                component="h1"
                variant="h4"
                style={{
                  textAlign: "left",
                  fontWeight: "600",
                  margin: "2vw 0 4vw 0",
                }}
              >
                Welcome
              </Typography>
              <GridList
                cellHeight={220}
                className={classes.gridList}
                cols={1}
                style={{ margin: "3vw 0px" }}
              >
                <Typography
                  variant="body1"
                  style={{
                    textAlign: "left",
                    fontWeight: "100",
                  }}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse tempor auctor bibendum. Nulla tempus enim nisi,
                  vitae blandit ante efficitur eu. Fusce non enim ac odio
                  eleifend dictum vitae id sem. Sed euismod nec nunc ut
                  fermentum. Vivamus in pellentesque elit, iaculis efficitur
                  leo. Phasellus tincidunt arcu dui, sit amet ornare sem
                  vestibulum nec. Proin et enim in odio ultricies elementum et
                  eu sem. Duis pellentesque arcu ligula, in dictum velit
                  porttitor eu. Aliquam suscipit mauris aliquam eros finibus
                  hendrerit. Sed porta faucibus sem, nec sagittis metus interdum
                  sit amet. Cras ante tortor, imperdiet ut luctus a, tincidunt
                  id libero. Nulla luctus nibh non lectus tempor, nec eleifend
                  lorem sodales. In aliquet neque dui, nec ultricies ligula
                  vehicula et. Nulla a odio vel lorem dictum bibendum eget quis
                  mi. Ut justo nisi, cursus in sem ut, iaculis rutrum quam.
                  Aenean justo nisi, egestas vel facilisis eu, efficitur sit
                  amet ligula. Etiam magna erat, sagittis eu tellus eget, tempor
                  euismod odio. Nunc quis mi ipsum. Pellentesque posuere nulla
                  turpis, eget volutpat sem mollis non. Aliquam non augue
                  tempor, venenatis elit a, rhoncus libero. Phasellus vulputate
                  nibh erat, nec tristique quam dictum non. Nulla faucibus justo
                  id arcu efficitur, a pellentesque orci gravida. Praesent id
                  tellus a felis suscipit faucibus molestie non metus. Vivamus
                  vitae enim pretium, malesuada dui non, dapibus enim. Sed et
                  vulputate lacus, at ornare risus. Donec aliquam lorem purus,
                  tristique vulputate est sodales quis. Cras sagittis tortor sit
                  amet dignissim placerat. Aliquam dignissim dignissim ipsum et
                  commodo. Nunc eu tortor quis neque tempor feugiat. Aliquam
                  erat volutpat. Maecenas nisi lacus, mattis porta varius eget,
                  bibendum a velit. Sed aliquam pulvinar aliquam. Sed dapibus
                  risus et nibh mollis, quis blandit nulla dignissim. Duis sit
                  amet tristique eros. Sed sollicitudin, metus sed interdum
                  sagittis, augue lacus accumsan orci, eget venenatis.
                </Typography>
              </GridList>
              <Grid
                container
                justify="left"
                alignItems="center"
                style={{ marginBottom: "2vw" }}
              >
                <Grid item>
                  <Link to={`/sign_up`} className={classes.Link}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                    >
                      Continue
                    </Button>
                  </Link>
                </Grid>
              </Grid>
            </Grid>
          </div>
        </Box>
      </Container>
    </div>
  );
}
