import React, { useEffect, useState } from "react";
import { useStateWithLocalStorage } from "../App"
import { Link, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  TextField,
  IconButton,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
} from "@material-ui/core";

import axios from "axios";

// Lisa's part
function ProifileEdit() {
  const { userId } = useParams();
  const [user, setUser] = useStateWithLocalStorage(1);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [validUser, setValidUser] = useState(false);


  useEffect(async () => {
    const url = `http://localhost:4000/user/${userId}`;
    let res = await axios.get(url);
    let data = res.data;
    let fetchedUser = data.User[0];
    setCurrentUser(fetchedUser);

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
              justify="centre"
              alignItems="center"
              style={{
                height: "10vh",
                width: "100%",
                padding: "20px",
                margin: "5px 0px",
              }}
            >
              <Typography variant="h4" gutterBottom>
                Hi, {currentUser.first_name}
              </Typography>
            </Grid>

            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
              style={{
                borderRadius: "10px",
                backgroundColor: "#303030",
                padding: "10px",
              }}
            >
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
              >
                <Grid
                  lg={8}
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                >
                  <EditConsumerInfo user={currentUser} />
                </Grid>
                <Grid
                  lg
                  container
                  justify="center"
                  alignItems="center"
                  id="EditingInfo"
                  style={{ borderLeft: "1px solid grey" }}
                >
                  <ProfilePic user={currentUser} />
                </Grid>
              </Grid>
              <Grid
                container
                direction="row"
                justify="center"
                style={{
                  backgroundColor: "#303030",
                  padding: "5px",
                  margin: "15px",
                  borderTop: "1px solid black",
                }}
              >
                <EditPreferences user={currentUser} />
              </Grid>
              <Grid container justify="center">
                <Link
                  to={`/${userId}/profile`}
                  style={{ textDecoration: "none" }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ padding: "5px", marginBottom: "15px" }}
                  >
                    Back to profile
                        </Button>
                </Link>
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

  //   if (isLoading == true) {
  //     return <p> Loading...</p>;
  //   } else {
  //     if (currentUser == null) {
  //       return <p> No user found!</p>;
  //     } else {
  //       return (

  //       );
  //     }
  //   }
}

export default ProifileEdit;

function EditConsumerInfo(user) {
  const [id, setUserId] = useState(user.user.id);
  const [username, setUsername] = useState(user.user.username);
  const [email, setEmail] = useState(user.user.email);
  const [phone, setPhone] = useState(user.user.phone);
  const [gender, setGender] = useState(user.user.gender);
  const [dob, setDOB] = useState(
    new Date(user.user.dob).toISOString().substring(0, 10)
  );
  const [password, setPassword] = useState(user.user.password);


  useEffect(() => {
    setUsername(user.user.username);
    setEmail(user.user.email);
    setDOB(user.user.dob);
    setPhone(user.user.phone);
    setGender(user.user.gender);
    setPassword(user.user.password);
  }, []);

  // const [id, setUserId] = useState(user.user.id);
  // const [username, setUsername] = useState(user.user.username);
  // const [lastname, setLastname] = useState(user.user.last_name);
  // const [firstname, setFirstname] = useState(user.user.first_name);
  // const [email, setEmail] = useState(user.user.email);
  // const [phone, setPhone] = useState(user.user.phone);
  // const [status, setStatus] = useState(user.user.status);
  // const [gender, setGender] = useState(user.user.gender);
  // const [dob, setDOB] = useState(
  //   new Date(user.user.dob).toISOString().substring(0, 10)
  // );
  // const [created, setCreated] = useState(
  //   new Date(user.user.created_at).toISOString().substring(0.10)
  // );
  // const [modified, setModified] = useState(user.user.modified_at);
  // const [password, setPassword] = useState(user.user.password);
  // const [avatar, setAvatar] = useState(user.user.avatar_id);
  // const [currentExp, setCurrentExp] = useState(user.user.current_exp);
  // const [totalExp, setTotalExp] = useState(user.user.total_exp);
  // const [badgeNum, setBadgeNum] = useState(user.user.total_num_badge);
  // const [voucherNum, setVoucherNum] = useState(user.user.total_num_voucher);


  // id: id,
  // username: username,
  // last_name: lastname,
  // first_name: firstname,
  // email: email,
  // phone: phone,
  // status: status,
  // gender: gender,
  // dob: dob,
  // created_at: created,
  // modified_at: today,
  // password: password,
  // avatar_id: avatar,
  // current_exp: currentExp,
  // total_exp: totalExp,
  // total_num_badge: badgeNum,
  // total_num_voucher: voucherNum,



  const UpdateDetails = async () => {
    let today = new Date().toISOString().substring(0, 10);
    let birthday = new Date(dob).toISOString().substring(0, 10);
    await axios.post("http://localhost:4000/editprofile", {
      id: id,
      username: username,
      email: email,
      phone: phone,
      gender: gender,
      dob: birthday,
      modified_at: today,
      password: password,
    }).then(() => {
      alert("successfully updated");
    });
  };

  return (
    <form autoComplete="off">
      <Grid
        item
        xs
        id="column1"
        style={{
          padding: "10px",
          margin: "10px",
        }}
      >
        <TextField
          id="outlined-required"
          label="Username"
          defaultValue={`${username}`}
          variant="outlined"
          onChange={(event) => {
            setUsername(event.target.value);
          }}
          style={{
            margin: "10px",
          }}
        />
        <TextField
          id="outlined-required"
          label="Email"
          defaultValue={`${email}`}
          variant="outlined"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
          style={{
            margin: "10px",
          }}
        />
        <TextField
          id="outlined-required"
          label="DOB"
          defaultValue={`${dob}`}
          variant="outlined"
          onChange={(event) => {
            setDOB(event.target.value);
          }}
          style={{
            margin: "10px",
          }}
        />
      </Grid>
      <Grid
        item
        id="column2"
        style={{
          padding: "10px",
          margin: "10px",
        }}
      >
        <TextField
          id="outlined-required"
          label="Phone Number"
          defaultValue={`${phone}`}
          variant="outlined"
          onChange={(event) => {
            setPhone(event.target.value);
          }}
          style={{
            margin: "10px",
          }}
        />
        <TextField
          id="outlined-required"
          label="Gender"
          defaultValue={`${gender}`}
          onChange={(event) => {
            setGender(event.target.value);
          }}
          variant="outlined"
          style={{
            margin: "10px",
          }}
        />
        <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          defaultValue={`${password}`}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          variant="outlined"
          style={{
            margin: "10px",
          }}
        />
      </Grid>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        onClick={UpdateDetails}
        style={{ padding: "5px", marginLeft: "30px" }}
      >
        Update Details
      </Button>
    </form>
  );
}

function ProfilePic({ user }) {
  let avatarId = user.avatar_id;

  const [avatar, setAvatar] = useState([]);
  const [isLoading, setLoading] = useState(true);
  //   useEffect(() => {
  //     window.location.reload()
  // },[avatar])
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
        container
        justify="center"
        alignItems="center"
        xs={4}
        id="ProfilePicture"
        style={{
          padding: "10px",
          margin: "5px",
          alignItems: "center",
        }}
      >
        <div>
          <Box
            style={{
              height: "200px",
              width: "200px",
              borderRadius: "50%",
            }}
          >
            <img
              src={`${process.env.PUBLIC_URL}/img/avatars/${avatar}`}
              alt="profile image"
            />
          </Box>
          <br />
          <Link
            to={`./avatar`}
            style={{ textDecoration: "none" }}
          >
            <Button
              variant="contained"
              color="primary"
              style={{ margin: "10px", marginLeft: "20px" }}
            >
              Change Avatar
          </Button>
          </Link>
        </div>
      </Grid>
    );
  }
}

function EditPreferences({ user }) {
  const [subCategories, setSubCategories] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [userPreference, setUserPreference] = useState(null);

  useEffect(async () => {
    const url = `http://localhost:4000/categories_child`;
    let res = await axios.get(url);
    let data = res.data;
    let fetchedData = data.SubCategory;
    setSubCategories(fetchedData);

    const urlp = `http://localhost:4000/preferences/${user.id}`;
    let pRes = await axios.get(urlp);
    let pData = pRes.data;
    let fetchedPreferences = pData.User;
    console.log(fetchedPreferences);
    setUserPreference(fetchedPreferences);
    setLoading(false);
  }, []);

  if (isLoading == true) {
    return <p> Loading... </p>
  }
  else {
    return (
      <Grid
        item
        xs
        style={{
          padding: "20px",
        }}
      >
        <Typography variant="h5" gutterBottom>
          Preferences
        </Typography>
        <Typography variant="body2" gutterBottom>
          Categories you are interested in are displayed in red. <br /> You can choose which categories to add or delete by clicing on the category.
        </Typography>
        <Grid container direction="row" justify="left" alignItems="center">
          {subCategories.map((category) => {
            let match = false;
            userPreference.map((preferred) => {
              if (preferred.preference_id == category.category_child_id) {
                match = true;
              }
            });
            return (
              <PreferencesButton name={category.name} match={match} userId={user.id} preferenceId={category.category_child_id} />
            );
          })}
        </Grid>
      </Grid>
    );
  }
}

function PreferencesButton({ name, match, userId, preferenceId }) {
  const [interest, setInterest] = useState(0);

  useEffect(() => {
    if (match == true)
      setInterest(1);
  }, []);

  const addPreference = async () => {
    await axios.post("http://localhost:4000/addPreference", {
      preference_id: preferenceId,
      user_id: userId,

    }).then(() => {
      alert("successfully updated preference");
    });
  }

  const deletePreference = async () => {
    await axios.post("http://localhost:4000/deletePreference", {
      preference_id: preferenceId,
      user_id: userId,

    }).then(() => {
      alert("successfully updated preference");
    });
  }

  function toggle() {
    if (interest == 1) {
      setInterest(0);
      deletePreference();
    } else {
      setInterest(1);
      addPreference();
    }
  }

  if (interest !== 1) {
    return (
      <Button
        variant="contained"
        color="default"
        style={{
          margin: "10px",
          padding: "5px 10px",
          borderRadius: "30px",
        }}
        onClick={toggle}
      >
        {name}
      </Button>
    );
  }
  if (interest === 1) {
    return (
      <Button
        variant="contained"
        color="secondary"
        style={{
          margin: "10px",
          padding: "5px 10px",
          borderRadius: "30px",
        }}
        onClick={toggle}
      >
        {name}
      </Button>
    );
  }
}

// Currently not used 
// function PaymentOptions() {
//   return (
//     <Grid
//       item
//       xs
//       style={{
//         padding: "20px",
//       }}
//     >
//       <div>
//         <Typography variant="h5" gutterBottom>
//           Payment Options
//         </Typography>
//       </div>
//       <Grid>
//         <div
//           style={{
//             border: "1px solid black",
//             borderRadius: "10px",
//             textAlign: "center",
//           }}
//         >
//           <Button
//             variant="contained"
//             style={{ margin: "10px", padding: "5px" }}
//           >
//             Add payment option
//           </Button>
//         </div>
//       </Grid>
//     </Grid>
//   );
// }
