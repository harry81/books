import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import IndexPage from "../components/index";
import Shelf from "../components/shelf";
import React from "react";

const AppRouter = () => {

  return(
    <div style={style}>
      <Router>
        <Switch>
          <Route path="/" exact component={IndexPage} />
          <Route path="/shelf/" exact component={Shelf} />
        </Switch>
      </Router>
    </div>
  )
}

const style={
  marginTop:'0px'
}

export default AppRouter;
