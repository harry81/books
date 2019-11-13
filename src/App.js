import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
} from "react-router-dom";


import AppRouter from "./components/RouterComponent";
import IndexPage from "./components/index";

import logo from './logo.svg';
import './App.css';



function App() {
  return (
    <div>
      <AppRouter/>
    </div>
  );
}

export default App;
