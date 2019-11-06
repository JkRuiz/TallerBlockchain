import "./App.css";
import React from "react";
import LogIn from "./components/LogIn";
import DashBoard from "./components/DashBoard";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router>
        <Switch>
          <div>
            <Route path="/DashBoard/" component={DashBoard} />
            <Route exact path="/" component={LogIn} />
          </div>
        </Switch>
      </Router>
    );
  }
}

export default App;
