import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AuthProvider } from "../contexts/AuthContext.js";
import Layout from './Layout.js';
import Home from './pages/Home.js';
import Login from './pages/Login.js';
import Quiz from './pages/Quiz.js';
import Result from './pages/Result.js';
import Signup from './pages/Signup.js';
import PrivateRoute from "./PrivateRoute.js";

import PublicRoute from "./PublicRoute.js";

import './style/App.css';

function App() {
  return (
     <Router>
        <AuthProvider>
        <Layout>
          <Switch>
          <Route exact path="/" component={Home} />
            <PublicRoute exact path="/signup" component={Signup} />
            <PublicRoute exact path="/login" component={Login} />
            <PrivateRoute exact path="/quiz/:id" component={Quiz} />
            <PrivateRoute exact path="/result/:id" component={Result} />
          </Switch>
        </Layout>
        </AuthProvider>
      </Router> 
   
  );
}
export default App;


