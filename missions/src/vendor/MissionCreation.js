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
  InputLabel,
  FormControl,
  Select,
  MenuItem,
} from "@material-ui/core";

import "../App.css";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import PersonPinIcon from "@material-ui/icons/PersonPin";

import Axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 400,
  },
  iconButton: {
    padding: 10,
  },
  paper: {
    padding: theme.spacing(4),
    backgroundColor: "#f3f3f3",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: "15px",
  },
  form: { marginTop: "2vh" },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#2F80ED",
    borderRadius: "20px",
  },
  Link: {
    color: "white",
    color: "#333333",
    textDecoration: "none",
  },
}));

const VendorTextField = withStyles({
  root: {
    "& label": {
      color: "black",
    },
    "& label.Mui-focused": {
      color: "black",
    },
    "& .MuiInputBase-input": {
      color: "black",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "black",
    },
    "& .MuiFormHelperText-root": {
      color: "#009688",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "black",
      },
      "&:hover fieldset": {
        borderColor: "#0068cd",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#0068cd",
      },
    },
  },
})(TextField);

function MissionsCreation() {
  const classes = useStyles();
  const [missionTitle, setMissionTitle] = useState();
  const [price, setPrice] = useState();
  const [location, setLocation] = useState();
  const [description, setDescription] = useState();
  const [time, setTime] = useState();
  const [keyInfo, setKeyInfo] = useState();
  const [legalInfo, setLegalInfo] = useState();
  const [category, setCategory] = useState();
  const [image, setImage] = useState(null);
  const [map, setMap] = useState("map");
  const [demoImage, setDemoImage] = useState(null);

  const { vendorId } = useParams();

  const createMission = async () => {
    let today = new Date().toISOString().substring(0, 10);

    let res = await Axios.post("http://localhost:4000/createmission", {
      mission_title: missionTitle,
      map: map,
      description: description,
      category_id: category,
      vendor_id: vendorId,
      price: price,
      activity_time: time,
      location: location,
      created_at: today,
      picture: image,
      legal_info: legalInfo,
      key_info: keyInfo,
    });
  };

  const onClickHandler = () => {
    const promise = Axios.post("http://localhost:4000/missionIdSearch", {
      mission_title: missionTitle,
      vendor_id: vendorId,
    });

    const dataPromise = promise.then((response) => {
      // alert(response.data.MissionId);
      alert("uploading image...");
      // const newName =
      //   response.data.MissionId + "." + image.name.split(".").slice(-1);
      const newName = response.data.MissionId + ".jpg";
      const myNewImage = new File([image], newName, {
        type: image.type,
      });
      const data = new FormData();
      data.append("file", myNewImage);
      Axios.post("http://localhost:4000/uploadImage", data, {
        // receive two parameter endpoint url ,form data
      }).then((res) => {
        // then print response status
        console.log(res.statusText);
      });
    });
  };

  const fileSelectedHandler = (e) => {
    console.log(e.target.files[0]);
    setImage(e.target.files[0]);
    setDemoImage(URL.createObjectURL(e.target.files[0]));
  };

  //mission_title, map, description, category_id, vendor_id, price, feedback_id, activity_time, location, created_at, picture, legal_info, key_info
  return (
    <Container
      component="main"
      style={{
        height: "90%",
      }}
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        style={{ height: "100%" }}
      >
        <div>
          <h1>Create a mission!</h1>
          <Grid
            container
            lg={12}
            id="MissionContainer"
            style={{
              backgroundColor: "#d3d3d3",
              padding: "30px",
              borderRadius: "10px",
              margin: "15px 0px",
            }}
          >
            <Grid lg={12}>
              <form className={classes.form} noValidate>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <VendorTextField
                      name="missionTitle"
                      label="Mission title"
                      // variant="outlined"
                      required
                      fullWidth
                      id="missionTitle"
                      inputProps={{ className: classes.input }}
                      onChange={(event) => {
                        setMissionTitle(event.target.value);
                      }}
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <VendorTextField
                      // variant="outlined"
                      label="Price($)"
                      required
                      fullWidth
                      id="price"
                      inputProps={{ className: classes.input }}
                      onChange={(event) => {
                        setPrice(event.target.value);
                      }}
                      name="price"
                      autoComplete="price"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <VendorTextField
                      label="Time"
                      autoComplete="time"
                      name="time"
                      // variant="outlined"
                      required
                      fullWidth
                      id="time"
                      inputProps={{ className: classes.input }}
                      onChange={(event) => {
                        setTime(event.target.value);
                      }}
                    />
                  </Grid>
                  <Grid item xs className={classes.root}>
                    <VendorTextField
                      // variant="outlined"
                      label="Mission location"
                      required
                      fullWidth
                      id="location"
                      inputProps={{ className: classes.input }}
                      onChange={(event) => {
                        setLocation(event.target.value);
                      }}
                      name="location"
                      autoComplete="location"
                    />
                    <IconButton
                      className={classes.iconButton}
                      aria-label="menu"
                      color="primary"
                    >
                      <PersonPinIcon />
                    </IconButton>
                  </Grid>
                  <Grid item xs={12}>
                    <VendorTextField
                      id="description"
                      name="description"
                      label="Description"
                      required
                      multiline
                      rows={2}
                      helperText="Maximum 500 words"
                      inputProps={{ className: classes.input }}
                      onChange={(event) => {
                        setDescription(event.target.value);
                      }}
                      fullWidth
                      // variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <VendorTextField
                      id="keyInfo"
                      name="keyInfo"
                      autoComplete="keyInfo"
                      inputProps={{ className: classes.input }}
                      label="Key Information"
                      helperText="Maximum 500 words"
                      rows={2}
                      multiline
                      fullWidth
                      // variant="outlined"
                      onChange={(event) => {
                        setKeyInfo(event.target.value);
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <VendorTextField
                      id="legalInfo"
                      name="legalInfo"
                      label="Legal Information"
                      helperText="Maximum 500 words"
                      inputProps={{ className: classes.input }}
                      rows={2}
                      multiline
                      fullWidth
                      // variant="outlined"
                      onChange={(event) => {
                        setLegalInfo(event.target.value);
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl
                      label="Mission Category"
                      fullWidth
                      required
                      // variant="outlined"
                      className={classes.formControl}
                    >
                      <InputLabel id="category">Mission Category</InputLabel>
                      <Select
                        labelId="category"
                        id="category"
                        inputProps={{ className: classes.input }}
                        onChange={(event) => {
                          setCategory(event.target.value);
                        }}
                      >
                        <MenuItem value={"1"}>One</MenuItem>
                        <MenuItem value={"2"}>Two</MenuItem>
                        <MenuItem value={"3"}>Three</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={9}>
                    <Grid item xs={12} sm={6}>
                      <Grid item xs={12}>
                        <Button variant="contained" component="label">
                          Upload File
                          <input
                            type="file"
                            name="file"
                            hidden
                            onChange={fileSelectedHandler}
                          />
                        </Button>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      {demoImage ? (
                        <div>
                          <img src={demoImage} />
                        </div>
                      ) : null}
                    </Grid>
                  </Grid>
                </Grid>

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={() => {
                    createMission();
                    onClickHandler();
                  }}
                >
                  Create Mission
                </Button>
              </form>
            </Grid>
          </Grid>
        </div>
      </Box>
    </Container>
  );
}

export default MissionsCreation;
