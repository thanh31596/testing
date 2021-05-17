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
import axios from "axios";
import Rating from "@material-ui/lab/Rating";

function Profile_vender() {
  const [user, setUser] = useStateWithLocalStorage(1);
  const [vendorIdCheck, setVendorIdCheck] = useStateWithLocalStorage(50);
  const [validUser, setValidUser] = useState(false);
  const [vendor, setVendor] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [missions, setMissions] = useState([]);

  const { vendorId } = useParams();

  useEffect(async () => {
    const url = `http://localhost:4000/vendor/${vendorId}`;
    let res = await axios.get(url);
    let data = res.data;
    let fetchedVendor = data.Vendor[0];
    setVendorIdCheck(fetchedVendor.id);
    setVendor(fetchedVendor);

    const missionsListURL = `http://localhost:4000/vendor_mission/${vendorId}`;
    let res_missionsList = await axios.get(missionsListURL);
    let data_missionsList = res_missionsList.data;
    let vendorMissions = data_missionsList.VendorMissions;
    console.log(vendorMissions);
    setMissions(vendorMissions);

    if (vendorIdCheck === vendorId) {
      setValidUser(true);
      console.log("valid user");
    }
    setLoading(false);
  }, []);

  return (
    <div>
      {validUser && !isLoading ? (
        <div
          style={{
            backgroundColor: "white",
            padding: "20px 0px",
            backgroundImage:
              "url(https://images.unsplash.com/photo-1617213861681-30a2a883c9b7?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3274&q=80)",
          }}
        >
          <Container>
            <Grid
              container
              lg={12}
              style={{
                backgroundColor: "#d3d3d3",
                padding: "20px",
                borderRadius: "10px",
                margin: "15px 0px",
                minHeight: "90vh",
              }}
            >
              <Grid
                item
                sm={12}
                style={{
                  padding: "20px",
                }}
              >
                <Grid container justify="space-between">
                  <Grid item>
                    <Typography
                      variant="h4"
                      gutterBottom
                      style={{
                        color: "#333333",
                        fontWeight: "600",
                        textAlign: "left",
                      }}
                    >
                      Hi, {vendor.name}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Button
                      type="submit"
                      variant="contained"
                      style={{
                        padding: "5px 10px",
                        borderRadius: "20px",
                      }}
                    >
                      Edit
                    </Button>
                  </Grid>
                </Grid>
                <Grid container nowrap>
                  <Grid
                    container
                    md={6}
                    style={{
                      padding: "5px 10px",
                    }}
                  >
                    <Grid item md={3}>
                      <Typography
                        variant="subtitle2"
                        gutterBottom
                        style={{ color: "#0a0d0f", textAlign: "left" }}
                      >
                        Location
                      </Typography>
                    </Grid>
                    <Grid item md>
                      <Typography
                        variant="body2"
                        gutterBottom
                        style={{ color: "#727272", textAlign: "left" }}
                      >
                        {vendor.address}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    nowrap
                    md={6}
                    style={{
                      padding: "5px 10px",
                    }}
                  >
                    <Grid item md={3}>
                      <Typography
                        variant="subtitle2"
                        gutterBottom
                        style={{ color: "#0a0d0f", textAlign: "left" }}
                      >
                        Social media
                      </Typography>
                    </Grid>
                    <Grid item md>
                      <Typography
                        variant="body2"
                        gutterBottom
                        style={{ color: "#727272", textAlign: "left" }}
                      >
                        {vendor.website}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid container nowrap>
                  <Grid
                    container
                    nowrap
                    md={6}
                    style={{
                      padding: "5px 10px",
                    }}
                  >
                    <Grid item md={3}>
                      <Typography
                        variant="subtitle2"
                        gutterBottom
                        style={{ color: "#0a0d0f", textAlign: "left" }}
                      >
                        Phone
                      </Typography>
                    </Grid>
                    <Grid item md>
                      <Typography
                        variant="body2"
                        gutterBottom
                        style={{ color: "#727272", textAlign: "left" }}
                      >
                        {vendor.phone}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    nowrap
                    md={6}
                    style={{
                      padding: "5px 10px",
                    }}
                  >
                    <Grid item md={3}>
                      <Typography
                        variant="subtitle2"
                        gutterBottom
                        style={{ color: "#0a0d0f", textAlign: "left" }}
                      >
                        ABN number
                      </Typography>
                    </Grid>
                    <Grid item md>
                      <Typography
                        variant="body2"
                        gutterBottom
                        style={{ color: "#727272", textAlign: "left" }}
                      >
                        {vendor.ABN}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid container nowrap>
                  <Grid
                    container
                    nowrap
                    md={6}
                    style={{
                      padding: "5px 10px",
                    }}
                  >
                    <Grid item md={3}>
                      <Typography
                        variant="subtitle2"
                        gutterBottom
                        style={{ color: "#0a0d0f", textAlign: "left" }}
                      >
                        Email address
                      </Typography>
                    </Grid>
                    <Grid item md>
                      <Typography
                        variant="body2"
                        gutterBottom
                        style={{ color: "#727272", textAlign: "left" }}
                      >
                        {vendor.email}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>

              <MyMission missions={missions} vendorId={vendorId} />
              <PaymentOptions />
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

export default Profile_vender;

function MyMission({ vendorId, missions }) {
  return (
    <Grid
      item
      xs={12}
      style={{
        padding: "20px",
        borderTop: "1px solid Grey",
        borderBottom: "1px solid Grey",
      }}
    >
      <div>
        <Grid container justify="space-between">
          <Typography
            variant="h5"
            gutterBottom
            style={{ color: "#333333", fontWeight: "600", textAlign: "left" }}
          >
            My missions
          </Typography>
          <Link
            to={`/${vendorId}/createmission`}
            style={{ textDecoration: "none" }}
          >
            <Button
              type="submit"
              color="primary"
              variant="contained"
              style={{
                padding: "5px 10px",
                borderRadius: "20px",
              }}
            >
              Add new mission
            </Button>
          </Link>
        </Grid>
      </div>
      <Grid container>
        <Grid sm={12}>
          <Grid
            container
            nowap
            style={{
              borderRadius: "10px",
              textAlign: "center",
              padding: "5px",
            }}
          >
            <Grid item sm={5}>
              <Typography
                variant="subtitle2"
                gutterBottom
                style={{
                  color: "#333333",
                  fontWeight: "600",
                  textAlign: "left",
                }}
              >
                Title
              </Typography>
            </Grid>
            <Grid item sm={1}>
              <Typography
                variant="subtitle2"
                gutterBottom
                style={{
                  color: "#333333",
                  fontWeight: "600",
                  textAlign: "center",
                }}
              >
                Clicks
              </Typography>
            </Grid>
            <Grid item sm={1}>
              <Typography
                variant="subtitle2"
                gutterBottom
                style={{
                  color: "#333333",
                  fontWeight: "600",
                  textAlign: "center",
                }}
              >
                Purchases
              </Typography>
            </Grid>
            <Grid item sm={1}>
              <Typography
                variant="subtitle2"
                gutterBottom
                style={{
                  color: "#333333",
                  fontWeight: "600",
                  textAlign: "center",
                }}
              >
                Reviews
              </Typography>
            </Grid>
            <Grid item sm={2}>
              <Typography
                variant="subtitle2"
                gutterBottom
                style={{
                  color: "#333333",
                  fontWeight: "600",
                  textAlign: "center",
                }}
              >
                Ratings
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid sm={12}>
          {missions.map((mission, index) => {
            return <VendorMission mission={mission} id={index} />;
          })}
        </Grid>
        <Grid sm={6}></Grid>
      </Grid>
    </Grid>
  );
}

function VendorMission({ mission }) {
  const [value, setValue] = useState(2);
  const [missionDetail, setMissionDetail] = useState(null);

  useEffect(async () => {
    try {
      const url = `http://localhost:4000/mission/${mission.mission_id}`;
      let res = await axios.get(url);
      let data = res.data;
      let fetchedMission = data.Mission[0];
      setMissionDetail(fetchedMission);
    } catch (e) {
      console.log(e);
    }
  }, [mission]);

  return (
    <div>
      {missionDetail == null ? null : (
        <Grid
          container
          nowap
          direction="row"
          justify="space-evenly"
          alignItems="center"
          style={{
            borderRadius: "10px",
            textAlign: "center",
            padding: "10px",
            margin: "10px 0px",
            backgroundColor: "#dadada",
          }}
        >
          <Grid item sm={5}>
            <Link
              to={`/0/Mission/${missionDetail.mission_id}`}
              style={{ textDecoration: "none" }}
            >
              <Typography
                variant="subtitle2"
                gutterBottom
                style={{
                  color: "#333333",
                  fontWeight: "600",
                  textAlign: "left",
                }}
              >
                {missionDetail.mission_title}
              </Typography>
            </Link>
          </Grid>
          <Grid item sm={1}>
            <Typography
              variant="subtitle2"
              gutterBottom
              style={{
                color: "#333333",
                fontWeight: "600",
                textAlign: "center",
              }}
            >
              117
            </Typography>
          </Grid>
          <Grid item sm={1}>
            <Typography
              variant="subtitle2"
              gutterBottom
              style={{
                color: "#333333",
                fontWeight: "600",
                textAlign: "center",
              }}
            >
              44
            </Typography>
          </Grid>
          <Grid item sm={1}>
            <Typography
              variant="subtitle2"
              gutterBottom
              style={{
                color: "#333333",
                fontWeight: "600",
                textAlign: "center",
              }}
            >
              145
            </Typography>
          </Grid>
          <Grid item sm={2}>
            <Rating name="simple-controlled" value={value} />
          </Grid>

          <Grid item sm={2}>
            <Button
              variant="contained"
              style={{
                padding: "5px 10px",
                borderRadius: "20px",
              }}
            >
              Edit
            </Button>
          </Grid>
        </Grid>
      )}
    </div>
  );
}

function PaymentOptions() {
  return (
    <Grid
      item
      xs={12}
      style={{
        padding: "20px",
      }}
    >
      <div>
        <Typography
          variant="h5"
          gutterBottom
          style={{ color: "#333333", fontWeight: "600", textAlign: "left" }}
        >
          Payment Options
        </Typography>
      </div>
      <Grid container nowrap justify="space-evenly">
        <Grid sm={6}>
          <div
            style={{
              border: "1px solid black",
              borderRadius: "10px",
              textAlign: "center",
            }}
          >
            <Button
              variant="contained"
              style={{
                margin: "20px",
                padding: "5px 10px",
                borderRadius: "20px",
              }}
            >
              Add payment option
            </Button>
          </div>
        </Grid>
        <Grid sm={6}></Grid>
      </Grid>
    </Grid>
  );
}
