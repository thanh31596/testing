
import React, { useEffect, useState } from "react";
import {useStateWithLocalStorage} from "../App"
import { Link, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  TextField,
  IconButton,
  Paper,
  Card,
  Divider
} from "@material-ui/core";

import bullseye from "../assets/img/badges/target.png";
import bullseyeBW from "../assets/img/badges/target_bw.png";
import axios from "axios";

// Kelly's  part
function Badges() {
    const [isLoading, setIsLoading] = useState(true);
    const {userId} = useParams();
    const [user, setUser] = useStateWithLocalStorage(1);
    const [validUser, setValidUser] = useState(false);
    const [achievedBadges, setAchievedBadges] = useState([]);
    const [unachievedBadges, setUnachievedBadges] = useState([]);

    useEffect(async () => {
        const userBadgeUrl = `http://localhost:4000/badge/${userId}`;
        let userBadgeRes = await axios.get(userBadgeUrl);
        let userBadgeData = userBadgeRes.data;
        let userBadges = userBadgeData.Badges;


        const badgesUrl = `http://localhost:4000/badges`;
        let badgesRes = await axios.get(badgesUrl);
        let badgesData = badgesRes.data;
        let allBadgesData = badgesData.Badges;

        let achievedBadges = [];
        let unachievedBadges = [];

        console.log(allBadgesData);
        allBadgesData.map((badge) => {
            for (let x = 0; x < userBadges.length; x++) {
                if (badge.id === userBadges[x].badge_id) {
                    let tempBadge = badge;
                    tempBadge.date_achieved = userBadges[x].date_achieved;
                    //console.log(tempBadge);
                    // console.log(userBadges[x]);
                    // console.log(badge);
                    achievedBadges.push(tempBadge);
                } 
            }            
        })
        allBadgesData.filter((badge)=> {
            if (!achievedBadges.includes(badge)) {
                unachievedBadges.push(badge);
            }
        })
        setAchievedBadges(achievedBadges);
        setUnachievedBadges(unachievedBadges);
        // console.log(achievedBadges);
        // console.log(unachievedBadges);
        if (user === userId)
        {
            setValidUser(true);
            console.log("valid user");
            
        }
        setIsLoading(false);
      }, []);
  
      
  
    return (
    <div>
        {validUser  && !isLoading ? (
            <div>
                <h1 style={{textAlign: "center"}}>Badges</h1>
                <Container maxWidth="xl">
                    <Grid
                    container
                    lg={12}
                    id="BadgesContainer"
                    style={{
                        backgroundColor: "#d3d3d3",
                        padding: "20px",
                        borderRadius: "10px",
                        margin: "15px 0px",
                    }}            
                    >
                        <div>
                        <Typography
                            variant="h3"
                            gutterBottom
                            style={{ color: "#000000", textAlign: "left", fontWeight: "bold" }}
                        >
                            Achieved{/* {badge.date_achieved} */}
                        </Typography>
                        <Grid
                        container
                        justify="left"
                        spacing={3}                                                
                        >
                            {achievedBadges.map((badge) => {
                                return <AchievedBadge badge={badge} />
                            })}
                                   
                        </Grid>
                        <br/>
                        </div>                
                        <Divider variant="middle" style={{width: "95%", height: "1px", backgroundColor: "#000000"}} />
                        <div>
                            <br />
                            <Typography
                                variant="h3"
                                gutterBottom
                                style={{ color: "#000000", textAlign: "left", fontWeight: "bold" }}
                            >
                                Available
                            </Typography>

                            <Grid
                            container
                            justify="left"
                            spacing={3}                  
                        >
                            {unachievedBadges.map((badge) => {
                                return <UnachievedBadge badge={badge} />
                            })}
                            
                        
                        </Grid>



                        </div>
                        
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

export default Badges;

function AchievedBadge({badge}) {
    console.log(badge);
    
    let date = new Date(badge.date_achieved).toISOString().substring(0, 10);
    
    
    return (
        <Grid item>
            <Card style={{ padding: "10px", textAlign: "center", width: "200px", height: "280px"}}>
                <img 
                    src={`${process.env.PUBLIC_URL}/img/badges/${badge.image_active}`} 
                    alt={badge.badge_name}
                    width="150px"
                >
                </img>
                <Typography
                    variant="h5"
                    gutterBottom
                    style={{ color: "#ff4000", textAlign: "center", fontWeight: "bold" }}
                >
                    {badge.badge_name}
                </Typography>
                <Typography
                    variant="h6"
                    gutterBottom
                    style={{ color: "#000000", textAlign: "center" }}
                >
                    {date}
                </Typography>
            </Card>
        </Grid>
    )
}

function UnachievedBadge({badge}) {
    return (
        <Grid item>
            <Card style={{ padding: "10px", textAlign: "center", width: "200px", height: "250px"}}>
                <img 
                    src={`${process.env.PUBLIC_URL}/img/badges/${badge.image_inactive}`} 
                    alt={badge.badge_name}
                    width="150px"
                >
                        
                </img>
                <Typography
                    variant="h5"
                    gutterBottom
                    style={{ color: "#565656", textAlign: "center", fontWeight: "bold" }}
                >
                    {badge.badge_name}
                </Typography>
            </Card>
        </Grid>
    )
}


//, opacity: "0.4"