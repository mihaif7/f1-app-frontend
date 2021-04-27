import { Box, Spinner } from "@chakra-ui/react";
import React, { Suspense, useEffect } from "react";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import UpdateNotification from "./components/updateNotification";

const Seasons = React.lazy(() => import("./views/seasons/seasons"));
const Races = React.lazy(() => import("./views/races/races"));
const RaceInfo = React.lazy(() => import("./views/raceInfo/raceInfo"));
const HeadToHead = React.lazy(() => import("./views/headToHead/headToHead"));

function App() {
  const history = useHistory();

  useEffect(() => {
    history.listen((location, action) => {
      // check for sw updates on page change
      navigator.serviceWorker
        .getRegistrations()
        .then((regs) => regs.forEach((reg) => reg.update()));
    });
    //eslint-disable-next-line
  }, []);

  return (
    <Box d="flex" minH="100vh" flexDirection="column">
      <Header />
      <Suspense
        fallback={
          <Box flexGrow="1" d="flex" justifyContent="center">
            <Spinner mt={4} />
          </Box>
        }>
        <Box flexGrow={1} pt={4}>
          <Switch>
            <Route exact path="/seasons" component={Seasons} />
            <Route exact path="/season/:year" component={Races} />
            <Route exact path="/season/:year/round/:raceId" component={RaceInfo} />
            <Route
              exact
              path="/season/:year/round/:raceId/headtohead"
              component={HeadToHead}
            />
            <Redirect from="/" to="/seasons" />
          </Switch>
        </Box>
      </Suspense>
      <UpdateNotification />
      <Footer />
    </Box>
  );
}

export default App;
