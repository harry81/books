import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import IndexPage from "../components/index";
import React from "react";

const AppRouter = () => {
  return(
    <div style={style}>
      <Router>
        <Switch>
          <Route path="/index" exact component={IndexPage} />
        </Switch>
      </Router>
    </div>
  )
}

const style={
  marginTop:'0px'
}

export default AppRouter;
