import React, { useEffect, useState } from "react";
import {useStateWithLocalStorage} from "../App"
import { Link, useParams } from "react-router-dom";
import {
    Box,
    Button,
    Container,
    Grid,
    Typography
} from "@material-ui/core";

function Confirmation() {
    const [isLoading, setIsLoading] = useState(true);
    const {userId} = useParams();
    const [user, setUser] = useStateWithLocalStorage(1);
    const [validUser, setValidUser] = useState(false);

    useEffect(async () => {
        
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
                <div style={{ backgroundColor: "#fafafa" }}>
                    <Container>
                        <Grid
                            container
                            lg={12}
                            style={{
                                backgroundColor: "d3d3d3",
                                borderRadius: "10px",
                                marginTop: "20px"
                            }}>
                            <ConfirmationMessage />
                            <OrderDetails />
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

export default Confirmation;

function ConfirmationMessage() {
    return (
        <Grid
            item
            lg={7}>
            <div style={{ borderRadius: "10px", border: "1px solid black", padding: "10px", margin: "10px" }}>
                <Typography
                    variant="h5"
                    gutterBottom
                    style={{ textAlign: "center" }}>
                    Payment Confirmed! <br />
                    Invoice #: 12345ABCDE <br />
                    We hope you enjoy your mission!
                </Typography>
                <Typography
                    varian="subtitle1"
                    gutterBottom
                    style={{ textAlign: "center", marginTop: "20px" }}>
                    An email has been sent to you. <br />
                    If you have any concerns please contact the company directly.
                </Typography>

            </div>
            <div style={{ borderRadius: "10px", border: "1px solid black", margin: "10px", padding: "10px" }}>
                <Typography
                    variant="h5"
                    gutterBottom
                    style={{ color: "#000", paddingTop: "25px" }}
                >
                    Recommended Missions
          </Typography>
                <Grid
                    container
                    justify="space-around">
                    <RecommendedMission />
                    <RecommendedMission />
                </Grid>
                <Grid
                    container
                    justify="flex-end">
                    <Link to="./mission_catalogue" style={{ textDecoration: "none" }}>
                        <Button variant="contained"
                            color="primary"
                            style={{
                                margin: "10px",
                                padding: "10px",
                                borderRadius: "20px",
                                textAlign: "centre",
                            }}>
                            Browse More Missions
            </Button>
                    </Link>
                </Grid>
            </div>

        </Grid>
    )
}

function RecommendedMission() {
    return (
        <Grid
            item
            style={{
                backgroundColor: "#d3d3d3",
                padding: "20px",
                borderRadius: "10px",
                width: "280px",
                margin: "15px 0px",
            }}
        >
            <div
                style={{
                    backgroundColor: "#949494",
                    height: "180px",
                    width: "100%",
                }}
            ></div>
            <Box style={{ margin: "15px 0px" }}>
                <Typography variant="h6" gutterBottom>
                    Mission Title
        </Typography>
                <Typography variant="caption" gutterBottom>
                    Popular missions Lorem ipsum dolor sit amet, consectetur adipiscing
                    elit. ......
        </Typography>
                <br />
            </Box>
            <Grid container direction="row" justify="center" alignItems="center">
                <Link to="./Mission" style={{ textDecoration: "none" }}>
                    <Button variant="contained" color="secondary">
                        Hop on!
          </Button>
                </Link>
            </Grid>
        </Grid>
    );
}

function OrderDetails() {
    let [date, month, year] = new Date().toLocaleDateString("en-AU").split("/");
    let currentDate = date + "/" + month + "/" + year;

    return (
        <Grid
            item
            lg>
            <div style={{ borderRadius: "10px", border: "1px solid black", padding: "10px", margin: "10px" }}>
                <Typography
                    variant="h5"
                    gutterBottom
                    style={{ color: "#000", paddingTop: "25px" }}
                >
                    Receipt
          </Typography>
                <Typography
                    variant="body1"
                    gutterBottom
                    style={{ color: "#000" }}
                >
                    Date: {currentDate} <br />
                    Invoice #: 12345ABCDE <br />
                    Paid with visa card
                </Typography>
                <div style={{ borderBottom: "1px solid black" }}>
                    <AddedMissions />
                    <AddedMissions />
                </div>
                <DisplayTotals />
            </div>
        </Grid>
    )
}


function AddedMissions() {
    return (
        <Grid
            container
            lg
            alignItems="center"
            style={{
                backgroundColor: "white",
                borderRadius: "10px",
            }}
        >
            <Grid
                item
                lg={10}
                style={{
                    backgroundColor: "#d3d3d3",
                    padding: "20px",
                    borderRadius: "10px",
                    margin: "15px 0px",
                }}
            >
                <Typography
                    variant="h5"
                    gutterBottom
                    style={{ color: "#ff4000", textAlign: "left" }}
                >
                    Gold Coast Hot Air Balloon and Jet Boat Adventure Combo
              </Typography>
                <Typography
                    variant="subtitle1"
                    gutterBottom
                    style={{ color: "#ce6d00", textAlign: "left" }}
                >
                    Company: Hot air ballooning
              </Typography>
            </Grid>
            <Grid
                item
                lg
                style={{
                    backgroundColor: "white",
                }}
            >
                <Typography
                    variant="h5"
                    gutterBottom
                    style={{ color: "#ff4000", textAlign: "center" }}
                >
                    $125
            </Typography>
            </Grid>
        </Grid >
    )
}

function DisplayTotals() {
    return (
        <Grid
            container
            justify="flex-end">
            <Grid
                item>
                <Typography
                    variant="h5"
                    gutterBottom
                    style={{ color: "#000" }}
                >
                    Subtotal: $250
          </Typography>
                <Typography
                    variant="h5"
                    gutterBottom
                    style={{ color: "#000" }}
                >
                    Discount: -$50
          </Typography>
                <Typography
                    variant="h5"
                    gutterBottom
                    style={{ color: "#000" }}
                >
                    Total Price: $200
          </Typography>
                <div style={{ backgroundColor: "#ff4000", borderRadius: "10px", padding: "5px" }}>
                    <Typography
                        variant="h5"
                        gutterBottom
                        style={{ color: "#000" }}>
                        You saved: $50!
            </Typography>
                </div>
            </Grid>
        </Grid>
    )
}
