import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

import Home from "./consumer/Home";

// consumer pages
import Mission from "./consumer/Mission";
import SearchResult from "./consumer/SearchResult";
import SignUp from "./consumer/SignUp";
import Login from "./consumer/Login";
import ProfileInit from "./consumer/ProfileInit";
import MissionCatalogue from "./consumer/MissionCatalogue";
import NavigationBar from "./components/NavigationBar";
import Cart from "./consumer/Cart";
import Badges from "./consumer/Badges";
import ConsumerProfile from "./consumer/Profile";
import ConsumerEditProfile from "./consumer/ProifileEdit";
import Vouchers from "./consumer/Vouchers";
import Transaction from "./consumer/Transaction";
import Confirmation from "./consumer/Confirmation";
import LegalCheck from "./consumer/LegalCheck";
import Avatar from "./consumer/Avatar";

// vendor pages
import LoginVendor from "./vendor/Login_vendor";
import SignUp_vendor from "./vendor/SignUp_vendor";
import ProfileInit_vendor from "./vendor/ProfileInit_vendor";
import MissionCreation from "./vendor/MissionCreation";
import Profile_vendor from "./vendor/Profile_vendor";
import LegalCheck_vendor from "./vendor/LegalCheck_vendor";

//TESTING PAGE ---------------DELETE BEFORE SUBMISSION
import TestPage from "./consumer/testpage";

const theme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

export const useStateWithLocalStorage = (localStorageKey) => {
  const [user, setUser] = useState(localStorage.getItem(localStorageKey) || 0);

  useEffect(() => {
    localStorage.setItem(localStorageKey, user);
  }, [user]);

  return [user, setUser];
};

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <div className="App">
            <NavigationBar />
            <Switch>
              <Route exact path="/" component={Home} />

              {/* consumer route */}
              <Route path="/:userId/mission/:missionId" component={Mission} />
              <Route path="/:userId/cart" component={Cart} />
              <Route
                path="/:userId/mission_catalogue"
                component={MissionCatalogue}
              />
              <Route path="/:userId/search/:search" component={SearchResult} />
              <Route path="/sign_up" component={SignUp} />
              <Route path="/sign_up_legalCheck" component={LegalCheck} />
              <Route path="/login" component={Login} />
              <Route path="/:userId/badges" component={Badges} />
              <Route path="/:userId/profile/" component={ConsumerProfile} />
              <Route path="/profileinit" component={ProfileInit} />
              <Route
                path="/:userId/editprofile"
                component={ConsumerEditProfile}
              />
              <Route path="/:userId/vouchers" component={Vouchers} />
              <Route path="/:userId/transaction" component={Transaction} />
              <Route path="/:userId/confirmation" component={Confirmation} />
              <Route path="/:userId/avatar" component={Avatar} />

              {/* vendor routes */}
              <Route
                path="/profileinit_vendor"
                component={ProfileInit_vendor}
              />
              <Route path="/login_vendor" component={LoginVendor} />
              <Route
                path="/:vendorId/createmission"
                component={MissionCreation}
              />
              <Route
                path="/:vendorId/profile_vendor"
                component={Profile_vendor}
              />
              <Route path="/sign_up_vendor" component={SignUp_vendor} />
              <Route
                path="/sign_up_legalCheck_vendor"
                component={LegalCheck_vendor}
              />
              <Route exact path="/:userId" component={Home} />
            </Switch>
          </div>
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
