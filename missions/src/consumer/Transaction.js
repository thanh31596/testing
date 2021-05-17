import React, { useEffect, useState } from "react";
import { useStateWithLocalStorage } from "../App";
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

function Transaction() {
  const [isLoading, setIsLoading] = useState(true);
  const { userId } = useParams();
  const [user, setUser] = useStateWithLocalStorage(1);
  const [validUser, setValidUser] = useState(false);

  useEffect(async () => {
    if (user === userId) {
      setValidUser(true);
      console.log("valid user");
    }
    setIsLoading(false);
  }, []);

  return (
    <div>
      {validUser && !isLoading ? (
        <div style={{ backgroundColor: "#161616" }}>
          <Container>
            <Typography
              variant="h4"
              gutterBottom
              style={{ paddingTop: "25px" }}
            >
              Order Details
            </Typography>
            <Grid
              container
              lg={12}
              style={{
                backgroundColor: "d3d3d3",
                borderRadius: "10px",
              }}
            >
              <ConsumerDetails />
              <OrderDetails />
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

export default Transaction;

function ConsumerDetails() {
  return (
    <Grid item lg={7}>
      <div
        style={{
          borderRadius: "10px",
          border: "1px solid grey",
          padding: "10px",
          margin: "10px",
        }}
      >
        <TextField
          id="outlined-standard"
          label="Name"
          variant="outlined"
          style={{
            margin: "10px",
            width: "90%",
          }}
        />
        <TextField
          id="outlined-standard"
          label="Email"
          variant="outlined"
          style={{
            margin: "10px",
            width: "90%",
          }}
        />
        <TextField
          id="outlined-standard"
          label="Address"
          multiline
          variant="outlined"
          style={{
            margin: "10px",
            width: "90%",
          }}
        />
      </div>
      <div
        style={{
          borderRadius: "10px",
          border: "1px solid grey",
          margin: "10px",
          padding: "10px",
        }}
      >
        <Typography variant="h5" gutterBottom style={{ paddingTop: "25px" }}>
          Visa Card Details
        </Typography>
        <TextField
          id="outlined-standard"
          label="Card Number"
          variant="outlined"
          style={{
            margin: "10px",
            width: "90%",
          }}
        />
        <TextField
          id="outlined-standard"
          label="Cardholder Name"
          variant="outlined"
          style={{
            margin: "10px",
            width: "90%",
          }}
        />
        <TextField
          id="outlined-standard"
          label="Expiry"
          variant="outlined"
          style={{
            margin: "10px",
            width: "90%",
          }}
        />
        <TextField
          id="outlined-standard"
          label="CVN"
          variant="outlined"
          style={{
            margin: "10px",
            width: "90%",
          }}
        />
      </div>
      <Grid container justify="flex-end">
        <Link to="./confirmation" style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            color="primary"
            style={{
              margin: "10px",
              padding: "10px",
              borderRadius: "20px",
              textAlign: "centre",
            }}
          >
            Submit payment
          </Button>
        </Link>
      </Grid>
    </Grid>
  );
}

function OrderDetails() {
  return (
    <Grid item lg>
      <div
        style={{
          borderRadius: "10px",
          border: "1px solid grey",
          padding: "10px",
          margin: "10px",
        }}
      >
        <Typography variant="h5" gutterBottom style={{ paddingTop: "25px" }}>
          In Cart
        </Typography>
        <div style={{ borderBottom: "1px solid grey" }}>
          <AddedMissions />
          <AddedMissions />
        </div>
        <DisplayTotals />
      </div>
    </Grid>
  );
}

function AddedMissions() {
  return (
    <Grid
      container
      lg
      alignItems="center"
      style={{
        backgroundColor: "#d3d3d3",
        borderRadius: "10px",
        marginTop: "15px",
        marginBottom: "15px",
      }}
    >
      <Grid
        item
        lg={10}
        style={{
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
      <Grid item>
        <Typography
          variant="h5"
          gutterBottom
          style={{ color: "#ff4000", textAlign: "center" }}
        >
          $125
        </Typography>
      </Grid>
    </Grid>
  );
}

function DisplayTotals() {
  return (
    <Grid container justify="flex-end">
      <Grid item>
        <Typography variant="h5" gutterBottom>
          Subtotal: $250
        </Typography>
        <Typography variant="h5" gutterBottom>
          Discount: -$50
        </Typography>
        <Typography variant="h5" gutterBottom>
          Total Price: $200
        </Typography>
        <div
          style={{
            backgroundColor: "#ff4000",
            borderRadius: "10px",
            padding: "5px",
          }}
        >
          <Typography variant="h5" gutterBottom>
            You saved: $50!
          </Typography>
        </div>
        <Link to="./cart" style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            color="primary"
            style={{
              margin: "10px",
              padding: "10px",
              borderRadius: "20px",
              textAlign: "centre",
              marginTop: "30px",
              marginBottom: "20px",
            }}
          >
            Back to Cart
          </Button>
        </Link>{" "}
        <br />
        <Link to="./mission_catalogue" style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            color="primary"
            style={{
              margin: "10px",
              padding: "10px",
              borderRadius: "20px",
              textAlign: "centre",
            }}
          >
            Browse more missions
          </Button>
        </Link>
      </Grid>
    </Grid>
  );
}
