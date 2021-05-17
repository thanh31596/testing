// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import {
//   Avatar,
//   Box,
//   Container,
//   Grid,
//   Typography,
//   TextField,
//   CssBaseline,
//   GridList,
//   Button,
// } from "@material-ui/core";
// import { makeStyles } from "@material-ui/core/styles";
// import { withStyles } from "@material-ui/core/styles";
// import { ThemeProvider } from "@material-ui/styles";
// import ArrowBackIcon from "@material-ui/icons/ArrowBack";
// import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

// // style sheet
// const useStyles = makeStyles((theme) => ({
//   paper: {
//     padding: theme.spacing(4),
//     backgroundColor: "#f3f3f3",
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     justifyContent: "space-between",
//     borderRadius: "15px",
//   },
//   form: { marginTop: "2vh" },
//   submit: {
//     margin: theme.spacing(3, 0, 2),
//     backgroundColor: "#2F80ED",
//     borderRadius: "20px",
//   },
//   Link: {
//     color: "#333333",
//     textDecoration: "none",
//   },
// }));

// const VendorTextField = withStyles({
//   root: {
//     "& label": {
//       color: "black",
//     },
//     "& label.Mui-focused": {
//       color: "black",
//     },
//     "& .MuiInput-underline:after": {
//       borderBottomColor: "black",
//     },
//     "& .MuiOutlinedInput-root": {
//       "& fieldset": {
//         borderColor: "black",
//       },
//       "&:hover fieldset": {
//         borderColor: "#0068cd",
//       },
//       "&.Mui-focused fieldset": {
//         borderColor: "#0068cd",
//       },
//     },
//   },
// })(TextField);

// // Daddy's part
// function ProfileInit_vendor(props) {
//   const classes = useStyles();

//   return (
//     <div
//       style={{
//         backgroundImage:
//           "url(https://images.unsplash.com/photo-1504178407133-4b28437a5a6d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1934&q=80)",
//         height: "100vh",
//       }}
//     >
//       <Container
//         component="main"
//         style={{
//           height: "90%",
//         }}
//       >
//         <Box
//           display="flex"
//           flexDirection="column"
//           alignItems="center"
//           justifyContent="center"
//           style={{ height: "100%" }}
//         >
//           <div className={classes.paper}>
//             <Grid lg={6}>
//               <Typography
//                 component="h1"
//                 variant="h4"
//                 style={{ color: "#303030", fontWeight: "600" }}
//               >
//                 Hi, {props.name}
//               </Typography>
//               <Typography
//                 component="p"
//                 variant="caption"
//                 style={{ color: "#303030" }}
//               >
//                 Contact information
//               </Typography>
//               <form className={classes.form} noValidate>
//                 <Grid container spacing={2}>
//                   <Grid item xs={12}>
//                     <VendorTextField
//                       variant="outlined"
//                       required
//                       fullWidth
//                       id="address"
//                       label="Company Address"
//                       name="address"
//                       autoComplete="street-address"
//                     />
//                   </Grid>
//                   <Grid item xs={12}>
//                     <VendorTextField
//                       variant="outlined"
//                       required
//                       fullWidth
//                       name="company-website"
//                       label="Company website"
//                       type="url"
//                       id="url"
//                       autoComplete="url"
//                     />
//                   </Grid>
//                   <Grid item xs={12} sm={6}>
//                     <VendorTextField
//                       autoComplete="tel"
//                       name="phone-number"
//                       variant="outlined"
//                       required
//                       fullWidth
//                       id="number"
//                       label="Phone number"
//                       autoFocus
//                     />
//                   </Grid>
//                   <Grid item xs={12} sm={6}>
//                     <VendorTextField
//                       variant="outlined"
//                       required
//                       fullWidth
//                       id="ABN"
//                       label="ABN"
//                       name="ABN"
//                     />
//                   </Grid>
//                 </Grid>

//                 <Link to="/profile_vendor" className={classes.Link}>
//                   <Button
//                     type="submit"
//                     variant="contained"
//                     color="primary"
//                     className={classes.submit}
//                   >
//                     Get started!
//                   </Button>
//                 </Link>
//               </form>
//             </Grid>
//           </div>
//         </Box>
//       </Container>
//     </div>
//   );
// }

// export default ProfileInit_vendor;
