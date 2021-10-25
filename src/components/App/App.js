
import React from "react";
import Providers from '../../context/GlobalProvider';
import HomePage from "../HomePage/HomePage";

import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';



const App = ()=>{

  return(
    <Providers>
    <Router>
      <Switch>
        <Route path="/" exact component={HomePage} />
          
        
{/*        
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} /> */}
       

      </Switch>
    </Router>
   
  </Providers>
  )
}

export default App;
