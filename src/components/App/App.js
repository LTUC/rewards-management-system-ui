import React from "react";
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Providers from '../../context/GlobalProvider';
import HomePage from "../../pages/HomePage/HomePage";
import Login from "../../pages/Login/Login";
import Register from "../../pages/Register/Register";
import TA from "../../pages/TA/TA";
import Instructor from "../../pages/Instructor/Instructor";


const App = () => {

  return (
    <Providers>
      <Router>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/ta" exact component={TA} />
          <Route path="/instructor" exact component={Instructor} />




          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />


        </Switch>
      </Router>

    </Providers>
  )
}

export default App;
