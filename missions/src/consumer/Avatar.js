import React, { useEffect, useState } from "react";
import {useStateWithLocalStorage} from "../App"
import { Link, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  AppBar,
  Tabs,
  Tab,
  makeStyles,
  LinearProgress,
} from "@material-ui/core";

import axios from "axios";

// Lisa's part
function Profile() {

    const [avatars, setAvatars] = useState();
    const [isLoading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState();
    const [user, setUser] = useStateWithLocalStorage(1);
    const [validUser, setValidUser] = useState(false);
    const [selectedAvatar, setSelectedAvatar] = useState(1);


  //let { userId } = 1;
  const { userId } = useParams();

  useEffect(async () => {
    const url = `http://localhost:4000/avatars`;
    const userUrl = `http://localhost:4000/user/${userId}`;
    let res = await axios.get(url);
    let data = res.data;
    setAvatars(data.Avatar);

    let userRes = await axios.get(userUrl);
    let userData = userRes.data;
    setCurrentUser(userData.User[0]);
    setSelectedAvatar(userData.User[0].avatar_id);
    if (user === userId)
    {
        setValidUser(true);
        
    }
    setLoading(false);
  }, []);

  const UpdateAvatar = async () => {
    await axios.post("http://localhost:4000/changeavatar", {
      id: userId,
      avatar_id: selectedAvatar,
    }).then(() => {
      alert("successfully updated");
    });
  };

  return (
      <div>
          {validUser  && !isLoading ? (
            <div style={{ backgroundColor: "#161616" }}>
              
              <Container maxWidth="xl">
                    
                    <Grid
                        container
                        lg={12}
                        id="AvatarContainer"
                        alignItems="center"
                        style={{
                            backgroundColor: "#d3d3d3",
                            padding: "20px",
                            borderRadius: "10px",
                            margin: "15px 0px",
                        }}
                    >
                        <Grid item xs={4}></Grid>
                        <Grid item xs={2}>
                        <Typography
                        variant="h4"
                        gutterBottom
                        style={{
                            color: "#000000",
                            textAlign: "left",
                            fontWeight: "bold",
                        }}
                        >
                        </Typography>
                            <Grid
                                item
                                //id="MissionItem"
                                style={{
                                    backgroundColor: "#303030",
                                    padding: "20px",
                                    borderRadius: "10px",
                                    width: "140px",
                                    margin: "2px 2px",
                                }}
                                >
                                <div
                                    style={{
                                    //backgroundColor: "#949494",
                                    height: "100px",
                                    width: "100%",
                                    overflow: "hidden",
                                    }}                                    
                                >
                                    
                                    <img
                                    src={`${process.env.PUBLIC_URL}/img/avatars/${avatars[currentUser.avatar_id -1].avatar_picture}`}
                                    alt=""
                                    style={{ display: "block", objectFit: "cover", height: "100%" }}
                                    />
                                </div>
                                <Box style={{ margin: "15px 0px", height: "30px", textAlign: "center"}}>
                                    <Typography variant="h6" gutterBottom>
                                    Current avatar: {currentUser.avatar_id}
                                    </Typography>                
                                </Box>            
                            </Grid>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography
                            variant="h4"
                            gutterBottom
                            style={{
                                color: "#000000",
                                textAlign: "left",
                                fontWeight: "bold",
                            }}
                            >
                            </Typography>
                            <Grid
                                item
                                //id="MissionItem"
                                style={{
                                    backgroundColor: "#303030",
                                    padding: "20px",
                                    borderRadius: "10px",
                                    width: "140px",
                                    margin: "2px 2px",
                                }}
                                >
                                <div
                                    style={{
                                    //backgroundColor: "#949494",
                                    height: "100px",
                                    width: "100%",
                                    overflow: "hidden",
                                    }}                                    
                                >
                                    
                                    <img
                                    src={`${process.env.PUBLIC_URL}/img/avatars/${avatars[selectedAvatar -1].avatar_picture}`}
                                    alt=""
                                    style={{ display: "block", objectFit: "cover", height: "100%" }}
                                    />
                                </div>
                                <Box style={{ margin: "15px 0px", height: "30px", textAlign: "center"}}>
                                    <Typography variant="h6" gutterBottom>
                                    New Avatar: {selectedAvatar}
                                    </Typography>                
                                </Box>            
                            </Grid>
                        </Grid>
                        <Grid item xs={2}>
                        <Link
                            to={`./editprofile`}
                            style={{ textDecoration: "none" }}
                            >
                            <Button 
                                variant="contained" 
                                color="primary"
                                onClick = {() => {
                                    UpdateAvatar();
                                    window.location.replace(`./editprofile`);
                                }}
                            >
                                Confirm
                            </Button>
                        </Link>
                        </Grid>
                        <Typography
                        variant="h6"
                        gutterBottom
                        style={{
                            color: "#000000",
                            textAlign: "center",
                            fontWeight: "bold",
                        }}
                        >
                        Click on an avatar below to select a new avatar for your profile.
                        </Typography>
                        {/* <Grid item>
                        <Typography
                        variant="h4"
                        gutterBottom
                        style={{
                            color: "#000000",
                            textAlign: "left",
                            fontWeight: "bold",
                        }}
                        >
                        Current avatar: {currentUser.avatar_id}
                        </Typography>
                        <Typography
                        variant="h4"
                        gutterBottom
                        style={{
                            color: "#000000",
                            textAlign: "left",
                            fontWeight: "bold",
                        }}
                        >
                        New avatar: {selectedAvatar}
                        </Typography>
                        <Link
                            to={`./editprofile`}
                            style={{ textDecoration: "none" }}
                            >
                            <Button 
                                variant="contained" 
                                color="primary"
                                onClick = {()=>{}}
                            >
                                Confirm
                            </Button>
                        </Link>
                        <Typography
                        variant="h6"
                        gutterBottom
                        style={{
                            color: "#000000",
                            textAlign: "left",
                            fontWeight: "bold",
                        }}
                        >
                        Click on an avatar below to select a new avatar for your profile.
                        </Typography> */}
                        {/* </Grid>                    */}
                        <Grid container direction="row" justify="left" alignItems="center">
                        {avatars.map((avatar) => {
                            return <Avatar avatar={avatar} setSelectedAvatar = {setSelectedAvatar} />;
                        })}
                        </Grid>
                    </Grid>
                    
              </Container>


            </div>
            ) 
            : (
                <div><p>You do not have permission to view this page!</p></div>
            )}
      </div>
  )

}

export default Profile;

function Avatar({avatar, setSelectedAvatar}) {
    return (
        <Grid
            item
            id="MissionItem"
            style={{
                backgroundColor: "#303030",
                padding: "20px",
                borderRadius: "10px",
                width: "140px",
                margin: "2px 2px",
            }}
            >
            <div
                style={{
                //backgroundColor: "#949494",
                height: "100px",
                width: "100%",
                overflow: "hidden",
                }}
                onClick={() => {
                    setSelectedAvatar(avatar.avatar_id)
                }}
            >
                <img
                src={`${process.env.PUBLIC_URL}/img/avatars/${avatar.avatar_picture}`}
                alt=""
                style={{ display: "block", objectFit: "cover", height: "100%" }}
                />
            </div>
            <Box style={{ margin: "15px 0px", height: "10px", textAlign: "center"}}>
                <Typography variant="h6" gutterBottom>
                {avatar.avatar_id}
                </Typography>                
                <br />
            </Box>            
        </Grid>
            
    )
}
