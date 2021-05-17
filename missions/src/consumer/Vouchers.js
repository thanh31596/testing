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
} from "@material-ui/core";

// Lisa's part
function Vouchers() {
    const [isLoading, setIsLoading] = useState(true);
    const userId = useParams();
    const [user, setUser] = useStateWithLocalStorage(1);
    const [validUser, setValidUser] = useState(false);

    useEffect(async () => {
        
        if (user === userId.userId)
        {
            setValidUser(true);
            console.log("valid user");
            
        }
        setIsLoading(false);
      }, []);

  return (
    <div>
        {validUser  && !isLoading ? (
            <div style={{ backgroundColor: "#161616" }}>
            <Container>
                <Typography variant="h4" gutterBottom style={{ paddingTop: "25px" }}>
                Vouchers
                </Typography>
                <Grid container>
                <ReceivedVoucher />
                <ReceivedVoucher />
                <ReceivedVoucher />
                <ReceivedVoucher />
                <ReceivedVoucher />
                <ReceivedVoucher />
                </Grid>
                <Grid container justify="center">
                <Link to="/profile" style={{ textDecoration: "none" }}>
                    <Button
                    variant="contained"
                    color="primary"
                    style={{ padding: "5px", marginBottom: "15px" }}
                    >
                    Back to profile
                    </Button>
                </Link>
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

function ReceivedVoucher() {
  return (
    <Grid
      container
      lg={12}
      id="voucher"
      style={{
        padding: "20px",
        borderRadius: "10px",
        margin: "15px",
      }}
    >
      <Grid container lg={3}>
        <div
          style={{
            borderRadius: "10px",
            backgroundColor: "#303030",
            textAlign: "center",
            width: "100%",
          }}
        >
          <Typography
            variant="h4"
            style={{
              color: "red",
              textAlign: "center",
              verticalAlign: "middle",
              lineHeight: "250px",
            }}
          >
            50% Discount
          </Typography>
        </div>
      </Grid>
      <Grid item lg={3}>
        <div
          style={{
            backgroundColor: "#303030",
            borderRadius: "15px",
            height: "100%",
            width: "100%",
          }}
        ></div>
      </Grid>
      <Grid
        item
        xs
        style={{
          backgroundColor: "d3d3d3",
        }}
      >
        <div
          style={{
            backgroundColor: "#303030",
            borderRadius: "10px",
            height: "100%",
            width: "100%",
            padding: "20px",
          }}
        >
          <Link to="/mission/1" style={{ textDecoration: "none" }}>
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
            <Typography
              variant="body2"
              gutterBottom
              style={{ color: "#727272", textAlign: "left" }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Pellentesque tempus, lacus eget dictum pharetra, Lorem ipsum dolor
              sit amet, consectetur adipiscing elit. Pellentesque tempus, lacus
              eget dictum pharetra,
            </Typography>
            <Typography
              variant="subtitle2"
              gutterBottom
              style={{ color: "grey", textAlign: "left" }}
            >
              Location: 275 George St, Brisbane City QLD 4000
            </Typography>
          </Link>
          <VoucherCode />
        </div>
      </Grid>
    </Grid>
  );
}

function VoucherCode() {
  const [hidden, setHidden] = useState(true);

  function toggle() {
    if (hidden == true) {
      setHidden(false);
    } else setHidden(true);
  }

  if (hidden) {
    return (
      <Button
        variant="contained"
        color="default"
        style={{
          margin: "10px 0px",
          padding: "5px 15px",
          borderRadius: "20px",
          textAlign: "centre",
        }}
        onClick={toggle}
      >
        Reveal voucher code
      </Button>
    );
  }

  if (!hidden) {
    return (
      <Button
        variant="contained"
        color="secondary"
        style={{
          margin: "10px 0px",
          padding: "5px 15x",
          borderRadius: "20px",
          textAlign: "centre",
        }}
        onClick={toggle}
      >
        ABCD2021
      </Button>
    );
  }
}

export default Vouchers;
