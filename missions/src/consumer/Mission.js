import React, { useEffect, useState } from "react";
import { Button, Container, Grid, Typography, Paper } from "@material-ui/core";
import {useStateWithLocalStorage} from "../App"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
} from "react-router-dom";

import map from "../assets/img/maps/hotairballoon_map.png";
import axios from "axios";

// Kelly's  part
function Mission() {
  let { missionId, userId } = useParams();
  const [mission, setMission] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useStateWithLocalStorage(1);
    const [validUser, setValidUser] = useState(false);

  useEffect(async () => {
    const url = `http://localhost:4000/mission/${missionId}`;
    let res = await axios.get(url);
    let data = res.data;
    let fetchedMission = data.Mission[0];
    console.log(fetchedMission);
    setMission(fetchedMission);
    if (user === userId)
    {
        setValidUser(true);
        console.log("valid user");
        
    }
    setIsLoading(false);
  }, []);

  if (mission == null) {
    return <p>No mission found!</p>;
  }

  return (
    <div>
        {validUser  && !isLoading ? (
            <div>
                <h1>Mission</h1>
                <Container maxWidth="xl">
                    <Grid
                    container
                    lg={12}
                    id="MissionContainer"
                    style={{
                        backgroundColor: "#d3d3d3",
                        padding: "20px",
                        borderRadius: "10px",
                        margin: "15px 0px",
                    }}
                    >
                    <Grid container spacing={5}>
                        <Grid
                        item
                        lg={7}
                        style={
                            {
                            //backgroundColor: "#ffffff",
                            }
                        }
                        >
                        <img
                            className="imgborder"
                            src={`${process.env.PUBLIC_URL}/img/missions/${mission.picture}`}
                            alt="mission-picture"
                            width="100%"
                        />
                        </Grid>
                        <Grid item lg={5}>
                        <img
                            className="imgborder"
                            src={`${process.env.PUBLIC_URL}/img/missions/${mission.map}`}
                            alt="map"
                            height="100%"
                        />
                        </Grid>
                    </Grid>
                    <Grid
                        item
                        lg={12}
                        style={{
                        backgroundColor: "#d3d3d3",
                        padding: "20px",
                        borderRadius: "10px",
                        margin: "15px 0px",
                        }}
                    >
                        <Typography
                        variant="h2"
                        gutterBottom
                        style={{
                            color: "#ff4000",
                            textAlign: "left",
                            fontWeight: "bold",
                        }}
                        >
                        {mission.mission_title}
                        </Typography>
                        <Typography
                        variant="h3"
                        gutterBottom
                        style={{ color: "#000", textAlign: "left" }}
                        >
                        Hot air ballooning
                        </Typography>
                    </Grid>
                    <Grid container justify="center" spacing={2}>
                        <Grid item xs={2} className="paperCard">
                        <Paper elevation={3} style={{ padding: "20px" }}>
                            <p>
                            <h1>Description</h1>
                            </p>
                            <pre><p>{mission.description}</p></pre>
                        </Paper>
                        </Grid>
                        <Grid item xs={2} className="paperCard">
                        <Paper elevation={3} style={{ padding: "20px" }}>
                            <p>
                            <h1>Location</h1>
                            </p>
                            <p>{mission.location}</p>
                        </Paper>
                        </Grid>
                        <Grid item xs={2} className="paperCard">
                        <Paper elevation={3} style={{ padding: "20px" }}>
                            <p>
                            <h1>Time</h1>
                            </p>
                            <p>{mission.activity_time}</p>
                        </Paper>
                        </Grid>
                        <Grid item xs={2} className="paperCard">
                        <Paper elevation={3} style={{ padding: "20px" }}>
                            <p>
                            <h1>Key Info</h1>
                            </p>
                            <p>{mission.key_info}</p>
                        </Paper>
                        </Grid>
                        <Grid item xs={2} className="paperCard">
                        <Paper elevation={3} style={{ padding: "20px" }}>
                            <p>
                            <h1>Legal Info</h1>
                            </p>
                            <p>{mission.legal_info}</p>
                        </Paper>
                        </Grid>
                        <Grid item xs={2} className="paperCard">
                        <Paper elevation={3} style={{ padding: "20px", height: "91%" }}>
                            <p>
                            <h1>Price</h1>
                            </p>
                            <Typography
                            variant="h2"
                            gutterBottom
                            style={{ color: "#ff4000", textAlign: "center" }}
                            >
                            ${mission.price}
                            </Typography>
                        </Paper>
                        </Grid>
                    </Grid>
                    </Grid>
                    <Grid item lg={12} spacing={2} style={{ textAlign: "right" }}>
                    {/* <div style={{textAlign:"right"}}> */}
                    <Button variant="contained" color="primary">
                        Interested
                    </Button>{" "}
                    &nbsp;
                    <Button variant="contained" color="primary">
                        Not Interested
                    </Button>{" "}
                    &nbsp;
                    <Button variant="contained" color="primary">
                        Pay to Unlock Mission
                    </Button>
                    {/* </div> */}
                    <br />
                    <br />
                    </Grid>
                </Container>
            </div>
        ) 
        : (
            <div><p>You do not have permission to view this page!</p></div>
        )}
    </div>
  );
}

export default Mission;
