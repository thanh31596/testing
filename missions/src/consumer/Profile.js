import React, { useEffect, useState } from "react";
import { useStateWithLocalStorage } from "../App";
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
  Slider,
  Input,
  TextField,
} from "@material-ui/core";
import axios from "axios";

// Lisa's part
function Profile() {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [currentUser, setCurrentUser] = useState(null);
  // const [mission, setMission] = useState(null);
  const [interested, setInterested] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [user, setUser] = useStateWithLocalStorage(1);
  const [validUser, setValidUser] = useState(false);
  const [bought, setBought] = useState(null);

  //let { userId } = 1;
  const { userId } = useParams();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(async () => {
    const url = `http://localhost:4000/user/${userId}`;
    let res = await axios.get(url);
    let data = res.data;
    let fetchedUser = data.User[0];
    setCurrentUser(fetchedUser);

    const urlInterested = `http://localhost:4000/interestedMissions/${userId}`;
    let interestedRes = await axios.get(urlInterested);
    let interestedData = interestedRes.data;
    let fetchedInterested = interestedData.User;
    setInterested(fetchedInterested);

    const urlbought = `http://localhost:4000/boughtMissions/${userId}`;
    let boughtRes = await axios.get(urlbought);
    let boughtData = boughtRes.data;
    let fetchedBought = boughtData.Mission;
    setBought(fetchedBought);

    const urlFeedback = `http://localhost:4000/user_feedback`;
    let feedbackRes = await axios.get(urlFeedback);
    let feedbackData = feedbackRes.data.Feedback;
    console.log(feedbackData);
    let fetchedReviews = feedbackData.map((data) => ({
      text: data.text,
      participant_id: data.participant_id
    }));
    let fetchedRatings = feedbackData.map((data) => ({
      rating: data.rating,
      participant_id: data.participant_id
    }));
    sessionStorage.setItem('reviews', JSON.stringify(fetchedReviews));
    sessionStorage.setItem('ratings', JSON.stringify(fetchedRatings));

    if (user === userId) {
      setValidUser(true);
      console.log("valid user");
    }
    setLoading(false);
  }, []);

  return (
    <div>
      {validUser && !isLoading ? (
        <div style={{ backgroundColor: "#161616" }}>
          <Container style={{ marginTop: "20px" }}>
            <Grid
              container
              direction="row"
              justify="left"
              alignItems="center"
              style={{
                borderRadius: "10px",
                backgroundColor: "#303030",
                padding: "5px",
                margin: "20px",
              }}
            >
              <UserDetails user={currentUser} />
              <Earned user={currentUser} setUser={setUser} />
              <ProfilePic user={currentUser} />
            </Grid>
          </Container>
          <Container>
            <Grid
              container
              direction="row"
              alignItems="center"
              style={{
                borderRadius: "10px",
                backgroundColor: "#303030",
                padding: "5px",
                margin: "20px",
              }}
            >
              <ExpBar user={currentUser} />
              <ViewCollection userId={currentUser} />
            </Grid>
          </Container>
          <Container>
            <Grid
              container
              direction="row"
              justify="left"
              alignItems="center"
              style={{
                borderRadius: "10px",
                backgroundColor: "#303030",
                padding: "20px",
                margin: "20px",
              }}
            >
              <Grid item style={{ width: "100%" }}>
                <div className={classes.root}>
                  <AppBar position="static">
                    <Tabs
                      value={value}
                      onChange={handleChange}
                      aria-label="Mission Lists"
                    >
                      <Tab label="Bought Missions" {...a11yProps(0)} />
                      <Tab label="Interested Missions" {...a11yProps(1)} />
                    </Tabs>
                  </AppBar>
                  <TabPanel value={value} index={0}>
                    <CurrentMissions bought={bought} userId={userId} />
                  </TabPanel>
                  <TabPanel value={value} index={1}>
                    <InterestedMissions
                      interested={interested}
                      userId={userId}
                    />
                  </TabPanel>
                </div>
              </Grid>
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
  //   if (isLoading == true) {
  //     return <p>Loading...</p>;
  //   } else {
  //     if (currentUser == null) {
  //       return <p> No user found! </p>;
  //     } else {
  //       return (

  //       );
  // }
  //   }
}

export default Profile;

function UserDetails(user) {
  let temp = user.user.total_exp / 1000;
  let currentLevel = Math.floor(temp);

  return (
    <Grid
      item
      xs
      id="UserDetails"
      style={{
        padding: "10px",
        margin: "5px",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Name: {user.user.first_name} {user.user.last_name}
      </Typography>
      <Typography variant="h5" gutterBottom>
        Email: {user.user.email}
      </Typography>
      <Typography variant="h5" gutterBottom>
        Current Level: {currentLevel}
      </Typography>
    </Grid>
  );
}

function Earned({ user, setUser }) {
  return (
    <Grid
      item
      xs
      id="EarnedDetails"
      style={{
        padding: "10px",
        margin: "5px",
      }}
    >
      <Typography variant="h5" gutterBottom>
        Total accumulated points: {user.total_exp}
      </Typography>
      <Typography variant="h5" gutterBottom>
        Total badges earned: {user.total_num_badge}
      </Typography>
      <Typography variant="h5" gutterBottom>
        Total vouchers earned: {user.total_num_voucher}
      </Typography>
      <Link to={`/${user.id}/editprofile`} style={{ textDecoration: "none" }}>
        <Button
          variant="contained"
          color="primary"
          style={{ marginRight: "10px" }}
        >
          Edit Profile
        </Button>
      </Link>
      {/* <Link to="/" style={{ textDecoration: "none" }}>
        <Button
          variant="contained"
          color="primary"
          style={{ marginLeft: "10px" }}
           //onClick={setUser(0)}
        >
          Log out
        </Button>
      </Link> */}
    </Grid>
  );
}

function ProfilePic(user) {
  let avatarId = user.user.avatar_id;

  const [avatar, setAvatar] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(async () => {
    const urlAvatar = `http://localhost:4000/avatar/${avatarId}`;
    let aRes = await axios.get(urlAvatar);
    let aData = aRes.data;
    setAvatar(aData.Avatar[0].avatar_picture);

    setLoading(false);
  }, []);

  if (isLoading == true) {
    return null;
  } else {
    return (
      <Grid
        item
        xs={3}
        style={{
          padding: "10px",
          margin: "5px",
          borderRadius: "10px",
        }}
      >
        <img
          src={`${process.env.PUBLIC_URL}/img/avatars/${avatar}`}
          alt="profile image"
        />
      </Grid>
    );
  }
}

function ExpBar(user) {
  let currentExp = (user.user.total_exp % 1000) / 10;
  let temp = user.user.total_exp / 1000;
  let currentLevel = Math.floor(temp);
  const classes = useStyles_Exp();
  const [progress, setProgress] = useState(currentExp);

  let voucher = 0;

  if (currentLevel % 5 == 4) {
    voucher = 2;
  } else {
    voucher = 1;
  }

  return (
    <Grid
      item
      xs={9}
      id="ExpBar"
      style={{
        padding: "10px",
        margin: "10px",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Experience points
      </Typography>
      <LinearProgressWithLabel value={progress} />
      <Typography
        style={{
          textAlign: "right",
        }}
      >
        Next reward: {voucher} voucher
      </Typography>
    </Grid>
  );
}

function LinearProgressWithLabel(props) {
  return (
    <Box display="flex" alignItems="center">
      <Box width="100%" mr={1}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box minWidth={35}>
        <Typography variant="body2" color="textSecondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired,
};

const useStyles_Exp = makeStyles({
  root: {
    width: "100%",
  },
});

function ViewCollection({ userId }) {
  return (
    <Grid
      item
      xs
      id="BadgesVouchers"
      style={{
        padding: "20px",
      }}
    >
      <Link to={`./badges`} style={{ textDecoration: "none" }}>
        <Button variant="contained" color="primary" style={{ margin: "10px" }}>
          View Badges
        </Button>
      </Link>
      <br />
      <Link to={`./vouchers`} style={{ textDecoration: "none" }}>
        <Button variant="contained" color="primary" style={{ margin: "10px" }}>
          View Vouchers
        </Button>
      </Link>
    </Grid>
  );
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`mission-list-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={2}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `mission-list-${index}`,
    "aria-controls": `mission-list-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

function VerticalTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="verttabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={2}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

VerticalTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const useVertStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    minHeight: 300,
  },
  tabs: {
    borderRight: `3px solid ${theme.palette.divider}`,
  },
}));

function CurrentMissions(bought) {
  const classes = useVertStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (bought.bought.length == 0) {
    return (
      <Typography
        variant="h5"
        gutterBottom
        style={{ color: "#ff4000", textAlign: "left" }}
      >
        You haven't added any missions to this list yet!
      </Typography>
    );
  } else {
    return (
      <div className={classes.root}>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          className={classes.tabs}
        >
          {bought.bought.map((boughtMission, index) => {
            return <Tab label={index + 1} {...a11yProps(index)} />;
          })}
        </Tabs>
        {bought.bought.map((boughtMission, index) => {
          let FetchedRatings = JSON.parse(sessionStorage.getItem('ratings'));
          let thisRating = null;
          let thisReview = null;
          FetchedRatings.map((rating) => {
            if (rating.participant_id === boughtMission.participant_details_id) {
              thisRating = rating.rating;
            }
          });
          let FetchedReviews = JSON.parse(sessionStorage.getItem('reviews'));
          FetchedReviews.map((review) => {
            if (review.participant_id === boughtMission.participant_details_id) {
              thisReview = review.text;
            }
          });
          return (
            <TabPanel value={value} index={index} style={{ maxWidth: "80%" }}>
              <BoughtMissionItem missionId={boughtMission.mission_id} userId={boughtMission.user_id} detailsId={boughtMission.participant_details_id} oldRating={thisRating} oldReview={thisReview} />
            </TabPanel>
          );
        })}
      </div>
    );
  }
}

function InterestedMissions(interested) {
  const classes = useVertStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (interested.interested.length == 0) {
    return (
      <Typography
        variant="h5"
        gutterBottom
        style={{ color: "#ff4000", textAlign: "left" }}
      >
        You haven't added any missions to this list yet!
      </Typography>
    );
  } else {
    return (
      <div className={classes.root}>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          className={classes.tabs}
        >
          {interested.interested.map((interestedMission, index) => {
            return <Tab label={index + 1} {...a11yProps(index)} />;
          })}
        </Tabs>
        {interested.interested.map((interestedMission, index) => {
          return (
            <TabPanel value={value} index={index} style={{ maxWidth: "80%" }}>
              {" "}
              <MissionItem missionId={interestedMission.mission_id} />
            </TabPanel>
          );
        })}
      </div>
    );
  }
}


function BoughtMissionItem({ missionId, userId, detailsId, oldRating, oldReview }) {
  console.log(oldRating);

  const [mission, setMission] = useState(null);
  const [loading, setLoading] = useState(true);
  const [vendor, setVendor] = useState(null);

  useEffect(async () => {
    const url = `http://localhost:4000/mission/${missionId}`;
    let res = await axios.get(url);
    let data = res.data;
    let fetchedMission = data.Mission[0];
    setMission(fetchedMission);

    const vendor_url = "http://localhost:4000/vendor";
    let vendor_result = await axios.get(vendor_url);
    let vendor_data = vendor_result.data;
    setVendor(vendor_data.Vendor);

    setLoading(false);
  }, []);


  const classes = useStyles();
  const [rating, setRating] = useState(oldRating);
  const [review, setReview] = useState(oldReview);

  const handleSliderChange = (event, newRating) => {
    setRating(newRating);
  };

  const handleInputChange = (event) => {
    setRating(event.target.value === '' ? '' : Number(event.target.value));
  };

  const handleBlur = () => {
    if (rating < 0) {
      setRating(0);
    } else if (rating > 100) {
      setRating(100);
    }
  };

  const DeleteReview = async () => {
    await axios.post("http://localhost:4000/DeleteOldReview", {
      participant_id: detailsId,
    });

  };

  const SubmitReview = async () => {
    let today = new Date().toISOString().substring(0, 10);
    await axios.post("http://localhost:4000/UpdateReview", {
      participant_id: detailsId,
      text: review,
      rating: rating,
      created_at: today,
    }).then(() => {
      alert("successfully updated");
    });
  };

  if (loading == true) {
    return <p>Loading...</p>;
  } else {
    return (
      <div style={{ paddingLeft: "10px", marginLeft: "10px", minWidth: "80%" }}>
        <Grid container>
          <Grid item lg={12} xs={12}>
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
              style={{ color: "#ffffff", textAlign: "left" }}
            >
              {mission.description}
            </Typography>
            <Typography
              variant="subtitle2"
              gutterBottom
              style={{ color: "#d3d3d3", textAlign: "left" }}
            >
              Location: {mission.location}
            </Typography>
          </Grid>
          <Grid
            item lg={12} xs={12} style={{ marginBottom: "10px" }}>
            <Link to={`/${userId}/Mission/${missionId}`} style={{ textDecoration: "none" }}>
              <Button
                variant="contained"
                color="primary"
                style={{ marginRight: "10px" }}
              >
                Go To Mission
          </Button>
            </Link>
          </Grid>
          <Grid
            item lg={12} xs={12}>
            <div style={{ borderTop: "3px solid #595959", marginTop: "10px", paddingTop: "10px" }}>
              <Typography
                variant="subtitle1"
                gutterBottom
                style={{ color: "#ff4000", textAlign: "left" }}
              >
                Review This Mission!
              </Typography>
              <div className={classes.root}>
                <Typography id="input-slider" variant="body2" gutterBottom>
                  Rating out of 100:
                </Typography>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} lg={10}>
                    <Slider
                      value={typeof rating === 'number' ? rating : 0}
                      onChange={handleSliderChange}
                      aria-labelledby="input-slider"
                    />
                  </Grid>
                  <Grid item style={{ marginBottom: "15px" }}>
                    <Input
                      className={classes.input}
                      value={rating}
                      margin="dense"
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      inputProps={{
                        step: 10,
                        min: 0,
                        max: 100,
                        type: 'number',
                        'aria-labelledby': 'input-slider',
                      }}
                    />
                  </Grid>
                </Grid>
              </div>
              <Grid
                item xs={12} lg={12}>
                <form className={classes.root}>
                  <TextField
                    id="text"
                    label="Additional Comments:"
                    defaultValue={`${review}`}
                    multiline variant="filled"
                    onChange={(event) => {
                      setReview(event.target.value);
                    }}
                    style={{ width: "90%" }}>

                  </TextField>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={
                      () => {
                        DeleteReview();
                        SubmitReview();
                      }}
                    style={{ marginTop: "15px", marginBottom: "15px" }}
                  >
                    Submit Rating and Comments
                  </Button>
                </form>
              </Grid>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}





function MissionItem(missionId) {
  let user = missionId.userId;
  let id = missionId.missionId;

  const [mission, setMission] = useState(null);
  const [loading, setLoading] = useState(true);
  const [vendor, setVendor] = useState(null);

  useEffect(async () => {
    const url = `http://localhost:4000/mission/${id}`;
    let res = await axios.get(url);
    let data = res.data;
    let fetchedMission = data.Mission[0];
    setMission(fetchedMission);

    const vendor_url = "http://localhost:4000/vendor";
    let vendor_result = await axios.get(vendor_url);
    let vendor_data = vendor_result.data;
    setVendor(vendor_data.Vendor);

    setLoading(false);
  }, []);

  if (loading == true) {
    return <p>Loading...</p>;
  } else {
    return (
      <div style={{ paddingLeft: "10px", marginLeft: "10px" }}>
        <Grid container lg={12}>
          <Grid item lg={12}>
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
              style={{ color: "#ffffff", textAlign: "left" }}
            >
              {mission.description}
            </Typography>
            <Typography
              variant="subtitle2"
              gutterBottom
              style={{ color: "#d3d3d3", textAlign: "left" }}
            >
              Location: {mission.location}
            </Typography>
          </Grid>
        </Grid>
        <Link to={`/${user}/Mission/${id}`} style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            color="primary"
            style={{ marginRight: "10px" }}
          >
            Go To Mission
          </Button>
        </Link>
      </div>
    );
  }
}
