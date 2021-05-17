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
import Axios from "axios";

// Daddy's part
function SearchResult(props) {
    const [searchData, setSearchData] = useState([]);
    const [vendorData, setVendorData] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const userId = useParams();
    const [user, setUser] = useStateWithLocalStorage(1);
    const [validUser, setValidUser] = useState(false);
    let search = props.match.params.search;
    //console.log(search);
    if (search === "")
        search = "all";

    useEffect(async () => {
        const url = `http://localhost:4000/search/${search}`;
        const vendor_url = "http://localhost:4000/vendor";
        let res = await Axios.get(url);
        let data = res.data;
        console.log(data.Search);
        setSearchData(data.Search);

        let vendor_result = await Axios.get(vendor_url);
        console.log(vendor_result);
        let vendor_data = vendor_result.data;
        console.log(vendor_data.Vendor);
        setVendorData(vendor_data.Vendor);
        if (user === userId.userId)
        {
            setValidUser(true);
            console.log("valid user");
            
        }
        setIsLoading(false);
    },[search]);

    return (
        <div>
            {validUser  && !isLoading ? (
                <div
                style={{
                backgroundImage:
                    "url(https://images.unsplash.com/photo-1618297358013-d3cb3e23ce25?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)",
                }}
            >
                <Container>
                <Typography
                    variant="h4"
                    gutterBottom
                    style={{ color: "#ffffff", paddingTop: "25px" }}
                >
                    {search === "$rH7fB"
                    ? "Showing all search results"
                    : `Search result for "${search}":`}

                    
                </Typography>
                <Grid container>
                    {searchData.map((mission) => {
                        return <SearchedMission mission={mission} vendor={vendorData} userId={userId} />
    
                    })}
                </Grid>
                </Container>
            </div>
            ) : (
                <div><p>You do not have permission to view this page!</p></div>
            )}
        </div>
        
    );
}

export default SearchResult;

function SearchedMission({mission, vendor, userId}) {
    return (
      <Link
        to={`/${userId.userId}/Mission/${mission.mission_id}`}
        style={{ textDecoration: "none" }}
      >
        <Grid
          container
          lg={12}
          id="SearchedMission"
          style={{
            backgroundColor: "#d3d3d3",
            padding: "20px",
            borderRadius: "10px",
            margin: "15px 0px",
          }}
        >
          <Grid
            item
            lg={4}
            style={{
              backgroundColor: "#d3d3d3",
            }}
          >
            <div
              style={{
                backgroundColor: "#949494",
                borderRadius: "8px",
                height: "100%",
                width: "100%",
                padding: "5px",
              }}
            >
              <img
                //className="imgborder"
                src={`${process.env.PUBLIC_URL}/img/missions/${mission.picture}`}
                alt="mission_image"
                width="100%"
              />
            </div>
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
          </Grid>
        </Grid>
      </Link>
    );
  }