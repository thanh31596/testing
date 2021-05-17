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
  IconButton
} from "@material-ui/core";
import axios from "axios";

function Cart() {
    const {userId} = useParams();
    const [user, setUser] = useStateWithLocalStorage(1);
    const [validUser, setValidUser] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [sessionId, setSessionId] = useState();
    const [missionData, setMissionData] = useState();
    const [cartData, setCartData] = useState();
    const [vendorData, setVendorData] = useState();
    //const [subtotal, setSubtotal] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [total, setTotal] = useState(0);
    const [isData, setIsData] = useState(false);

    let subtotal=0;
    useEffect(async () => {
        const sessionUrl = `http://localhost:4000/cartsession/${userId}`;        
        let sessionRes = await axios.get(sessionUrl);
        let sessionData = sessionRes.data;
        let session = sessionData.Session[0].id;        
        setSessionId(session);

        const cartUrl = `http://localhost:4000/cart/${session}`;
        let cartRes = await axios.get(cartUrl);
        let cartData = cartRes.data;
        console.log(cartData.Cart);
        setCartData(cartData.Cart);
        if (cartData.Cart.length > 0){
            setIsData(true);
        }
        const missionUrl = "http://localhost:4000/mission";
        let missionRes = await axios.get(missionUrl);
        let missionData = missionRes.data;
        setMissionData(missionData.Mission);

        const vendor_url = "http://localhost:4000/vendor";
        let vendorRes = await axios.get(vendor_url);
        let vendorData = vendorRes.data;
        setVendorData(vendorData.Vendor);

        if (user === userId)
        {
            setValidUser(true);
            console.log("valid user");
            
        }
        setIsLoading(false);
      }, []);

      const deleteMission = async (mission) => {
        console.log(mission);
        //   await axios.post("http://localhost:4000/cartdelete", {
        //       sessionId : sessionId,
        //       mission_id : mission
        //   })
      }


  return (
    <div>
        {validUser  && !isLoading ? (
            <div style={{ backgroundColor: "#161616" }}>
                <Container>
                    <Typography
                    variant="h4"
                    gutterBottom
                    style={{ paddingTop: "25px" }}
                    >
                    Cart
                    </Typography>
                    <Grid
                    container
                    style={{
                        backgroundColor: "#303030",
                        borderRadius: "10px",
                        //height: "500px"
                    }}>
                        {isData ? (
                            <Grid
                            container
                            style={{
                            borderBottom: "1px solid white"
                            }}>
                            {cartData.map((mission) => {
                                let currentMission;
                                for (let x = 0; x < missionData.length; x++) {
                                    if (missionData[x].mission_id === mission.mission_id) {
                                        currentMission = missionData[x];
                                        subtotal = subtotal+currentMission.price;
                                        //setSubtotal(subtotal+currentMission.price);
                                        break;
                                    }
                                }
                                console.log(subtotal);
                                return <AddedMission mission={currentMission} vendor={vendorData} userId={userId} sessionId={sessionId}/>;
                            })}
                            {/* <AddedMission />
                            <AddedMission /> */}
                        </Grid>
                        ): (
                            <div>
                                <Grid
                                    container
                                    style={{
                                    borderBottom: "1px solid white"
                                    }}
                                >
                                    <Typography
                                        variant="h4"
                                        gutterBottom
                                        style={{ paddingTop: "25px" }}
                                        >
                                        Cart is empty!
                                    </Typography>        
                                </Grid>
                            </div>
                        )

                        }
                    

                    
                    <Grid
                        container
                        lg={12}
                        alignItems="center">
                        <ApplyVoucher discount={discount} setDiscount={setDiscount} />
                        <DisplayTotals subtotal={subtotal} discount={discount} total={total} setTotal={setTotal} sessionId={sessionId}/>
                    </Grid>
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

export default Cart;

async function deleteMission(mission, sessionId)  {
    console.log(mission);
    console.log(sessionId);
    await axios.post("http://localhost:4000/cartdelete", {
        session_id : sessionId,
        mission_id : mission
    });
    
}

async function UpdateTotal(total, sessionId){
    console.log(total);
    console.log(sessionId);
    await axios.post("http://localhost:4000/sessiontotal", {
        id: sessionId,
        total: total
    });
}

function AddedMission({mission, vendor, userId, sessionId}) {
   console.log(mission);
//   console.log(userId);
    return (
    <Grid
      container
      lg={12}
      alignItems="center"
      style={{
        backgroundColor: "#d3d3d3",
        padding: "10px",
        borderRadius: "10px",
        margin: "15px",
      }}
    >
      <Grid
        item
        lg={2}
        style={{
          backgroundColor: "#d3d3d3",
          borderRadius: "8px",
          height: "100%",
          width: "100%",
        }}
      >
        <Link to={`./Mission/${mission.mission_id}`} style={{ textDecoration: "none" }}>
          <div
            style={{
              backgroundColor: "#949494",
              height: "100%"
            }}
          >
            <img
              //className="imgborder"
              src={`${process.env.PUBLIC_URL}/img/missions/${mission.picture}`}
              alt="mission_image"
              width="100%"
            />

          </div>
        </Link>
      </Grid>

      <Grid
        item
        lg={8}
        style={{
          backgroundColor: "#d3d3d3",
          padding: "20px",
          borderRadius: "10px",
          margin: "15px 0px",
        }}
      >
        <Link to={`./Mission/${mission.mission_id}`} style={{ textDecoration: "none" }}>
          <Typography
            variant="h5"
            gutterBottom
            style={{ color: "#ff4000", textAlign: "left" }}
          >
            {mission.mission_title}
          </Typography>
          <Typography
            variant="subtitle1"
            gutterBottom
            style={{ color: "#ce6d00", textAlign: "left" }}
          >
            {vendor.map((vendor) => {
                if (vendor.id === mission.vendor_id) {
                    return vendor.name;
                }
              })}
          </Typography>
          <Typography
            variant="body2"
            gutterBottom
            style={{ color: "#727272", textAlign: "left" }}
          >
            {mission.description.slice(0, 250)} ......
          </Typography>
          <Typography
            variant="subtitle2"
            gutterBottom
            style={{ color: "#0a0d0f", textAlign: "left" }}
          >
            Location: {mission.location}
          </Typography>
        </Link>
      </Grid>
      <Grid
        item
        lg
        style={{
          backgroundColor: "#d3d3d3",
        }}
      >
        <Typography
          variant="h5"
          gutterBottom
          style={{ color: "#ff4000", textAlign: "center" }}
        >
          ${mission.price}
          </Typography>
      </Grid>

      <Grid
        item
        lg
        style={{
          backgroundColor: "#d3d3d3",
        }}
      >
        <Button
          variant="contained"
          color="default"
          style={{
            margin: "10px",
            padding: "10px",
            borderRadius: "20px",
            textAlign: "centre"
          }}
          onClick={()=> {
              deleteMission(mission.mission_id, sessionId);
              window.location.replace("./cart");
            }}
          >
          Delete
      </Button>
      </Grid>
    </Grid >
  )
}


function ApplyVoucher({discount, setDiscount}) {
  return (
    <Grid
      item
      lg={8}>
      <div>
        <Button
          variant="contained"
          color="primary"
          style={{
            margin: "10px",
            padding: "10px",
            borderRadius: "20px",
            textAlign: "centre",
            marginTop: "20px",
            marginBottom: "30px"
          }}>
          Clear Cart
      </Button> <br />
        <TextField
          id="outlined-standard"
          label="Voucher Code"
          variant="outlined"
          style={{
            margin: "10px",
            width: "60%"
          }} />
        <Button variant="contained" color="primary" style={{ margin: "10px", marginLeft: "20px" }}>
          Apply Voucher
      </Button> <br />
        <Link to="./mission_catalogue" style={{ textDecoration: "none" }}>
          <Button variant="contained"
            color="primary"
            style={{
              margin: "10px",
              padding: "10px",
              borderRadius: "20px",
              textAlign: "centre",
              marginTop: "30px",
              marginBottom: "20px"
            }}>
            Browse more missions
          </Button>
        </Link>
      </div>
    </Grid>
  )
}

function DisplayTotals({subtotal, discount, total, setTotal, sessionId}) {
    setTotal(subtotal-discount);
    return (
    <Grid
      container
      lg={4}
      justify="center"
      style={{ paddingRight: "50px" }}>
      <Grid
        item>
        <Typography
          variant="h5"
          gutterBottom
          style={{ paddingTop: "10px" }}
        >
          Subtotal: ${subtotal}
        </Typography>
        <Typography
          variant="h5"
          gutterBottom
        >
          Discount: -${discount}
        </Typography>
        <Typography
          variant="h5"
          gutterBottom
        >
          Total Price: ${total}
        </Typography>
        {() => {
            if (discount > 0){
                return (
                    <div style={{ backgroundColor: "#ff4000", borderRadius: "10px", padding: "5px" }}>
                        <Typography
                            variant="h5"
                            gutterBottom
                            style={{ color: "#000" }}>
                            You saved: ${discount}!
                        </Typography>
                    </div>
                )
            }
        }}

        
        <Link to="./transaction" style={{ textDecoration: "none" }}>
            <Button variant="contained"
                color="primary"
                style={{
                    margin: "10px",
                    padding: "10px",
                    borderRadius: "20px",
                    textAlign: "centre",
                    marginTop: "30px",
                    marginBottom: "20px"
                }}
                onClick={()=>{
                    UpdateTotal(total, sessionId);
                }}
            >
            Go to payment
          </Button>
        </Link>
      </Grid>
    </Grid >
  )
}


