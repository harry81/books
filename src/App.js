import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
} from "react-router-dom";


import AppRouter from "./components/RouterComponent";
import './App.css';



function App() {
  return (
    <div>
      <AppRouter/>
    </div>
  );
}

export default App;
