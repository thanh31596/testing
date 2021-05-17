import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useStateWithLocalStorage } from "../App";
import { Box, Button, Container, Grid, Typography } from "@material-ui/core";
import axios from "axios";

// Daddy's  part
function Home() {
  const [missions, setMissions] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { userId } = useParams();
  const [user, setUser] = useStateWithLocalStorage(1);
  const [validUser, setValidUser] = useState(false);

  useEffect(async () => {
    const url = "http://localhost:4000/mission";
    let res = await axios.get(url);
    let data = res.data;
    console.log(data);
    setMissions(data.Mission);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <p>loading...</p>;
  }

  return (
    <div>
      {!isLoading ? (
        <div style={{ backgroundColor: "#161616" }}>
          <Container
            style={{
              backgroundImage: "url(https://source.unsplash.com/random)",
              backgroundSize: "auto",
            }}
          >
            <Grid
              container
              direction="row"
              justify="space-around"
              alignItems="center"
              className="hero"
              style={{
                height: "20vh",
                width: "100%",
              }}
            >
              <Grid item>
                <Typography variant="h4" gutterBottom>
                  Hello, we haven’t seen you here before!
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  Ready to challenge yourself?
                </Typography>
              </Grid>
            </Grid>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
              className="hero"
              style={{
                height: "10vh",
                width: "100%",
              }}
            >
              {user != 0 ? null : (
                <Grid item style={{ margin: "10px" }}>
                  <Link to="/login" style={{ textDecoration: "none" }}>
                    <Button variant="contained" color="primary">
                      Sign up / Sign in
                    </Button>
                  </Link>
                </Grid>
              )}

              <Grid item style={{ margin: "10px" }}>
                <Button variant="contained" color="primary">
                  View All Missions
                </Button>
              </Grid>
            </Grid>
          </Container>
          <Container>
            <Grid
              container
              direction="row"
              justify="left"
              alignItems="center"
              className="hero"
              style={{
                height: "10vh",
                width: "100%",
              }}
            >
              <Typography variant="h4" gutterBottom>
                Popular missions
              </Typography>
            </Grid>
            <Grid container direction="row" justify="left" alignItems="center">
              {missions.map((mission) => {
                return <MissionItem mission={mission} />;
              })}
            </Grid>
          </Container>
        </div>
      ) : (
        <div>
          <p>You do not have permission to view this page!</p>
        </div>
      )}
    </div>
  );
}

export default Home;

function MissionItem({ mission }) {
  return (
    <Grid
      item
      id="MissionItem"
      style={{
        backgroundColor: "#303030",
        padding: "20px",
        borderRadius: "10px",
        width: "280px",
        margin: "15px 10px",
      }}
    >
      <div
        style={{
          backgroundColor: "#949494",
          height: "180px",
          width: "100%",
          overflow: "hidden",
        }}
      >
        <img
          src={`${process.env.PUBLIC_URL}/img/missions/${mission.picture}`}
          alt=""
          style={{ display: "block", objectFit: "cover", height: "100%" }}
        />
      </div>
      <Box style={{ margin: "15px 0px" }}>
        <Typography variant="h6" gutterBottom>
          {mission.mission_title}
        </Typography>
        <Typography variant="caption" gutterBottom>
          {mission.description.slice(0, 150)} ......
        </Typography>
        <br />
      </Box>
      <Grid container direction="row" justify="center" alignItems="center">
        <Link
          to={`./mission/${mission.mission_id}`}
          style={{ textDecoration: "none" }}
        >
          <Button variant="contained" color="secondary">
            Hop on!
          </Button>
        </Link>
      </Grid>
    </Grid>
  );
}
