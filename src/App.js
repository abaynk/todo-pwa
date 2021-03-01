import React from "react";
import Evaluate from "./components/Evaluate";
import Schedule from "./components/Schedule";
import Tasks from "./components/Tasks";
import Navbar from "./components/Navbar";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";

const App = () => {
  const THEME = createMuiTheme({
    typography: {
      'fontFamily':"'Open Sans', sans-serif"
    }
  })
  return (
    <div className="App">
      <MuiThemeProvider theme={THEME}>
        <Navbar />
        <Tasks />
        <Schedule />
        <Evaluate />
      </MuiThemeProvider>
    </div>
  );
};

export default App;
