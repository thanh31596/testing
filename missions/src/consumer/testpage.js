import React, { useEffect, useState } from "react";
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
    const [avatar, setAvatar] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    let avatarId = 29;


    useEffect(async () => {
        const url = `http://localhost:4000/avatar/${avatarId}`;
        let res = await Axios.get(url);
        let data = res.data;
        console.log(data.Avatar[0].avatar_picture);
        setAvatar(data.Avatar[0].avatar_picture);


        setIsLoading(false)
    },[]);

    return (
        <div>
            {!isLoading ? (
                <div
                style={{
                backgroundImage:
                    "url(https://images.unsplash.com/photo-1618297358013-d3cb3e23ce25?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)",
                }}
            >
                <Container>
                <img
                //className="imgborder"
                src={`${process.env.PUBLIC_URL}/img/avatars/${avatar}`}
                alt="mission_image"
                width="100%"
              />
                </Container>
            </div>
            ) : (
                <div></div>
            )}
        </div>
        
    );
}

export default SearchResult;
