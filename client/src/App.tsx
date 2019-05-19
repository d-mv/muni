import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import City from "./components/City";
import CityContainer from './CityContainer'
import "./styles/App.module.scss";

const App: React.FC = () => {
  const haifa = () => <City city='Haifa' />;
  const telAviv = () => <City city='Tel-Aviv' />;
  const Jerusalem = () => <City city='Jerusalem' />;
  // https://github.com/alvarotrigo/fullPage.js/
  // https://codepen.io/ananyaneogi/pen/mYmodx
  return (
    <Router>
      <Route path='/' exact component={CityContainer} />
      <Route path='/haifa' exact component={haifa} />
      <Route path='/tel-aviv' component={telAviv} />
      <Route path='/Jerusalem' component={Jerusalem} />
    </Router>
  );
};

export default App;
