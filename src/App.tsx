import './App.css';
import Welcome from './Welcome';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './Home';
import Layout1 from './layouts/Layout1';
import Layout2 from './layouts/Layout2';
import Layout3 from './layouts/Layout3';
import Layout4 from './layouts/Layout4';

function App() {

  return (
    <div className="App">

      <Router>
        <ul className="navigation">
          <li>
            <Link to="/">Home</Link>
          </li>
          {/* <li>
              <Link to="/welcome">Welcome</Link>
            </li> */}
          <li>
            <Link to="/layout1">Layout1</Link>
          </li>
          <li>
            <Link to="/layout2">Layout2</Link>
          </li>
          <li>
            <Link to="/layout3">Layout3</Link>
          </li>
          <li>
            <Link to="/layout4">Layout4</Link>
          </li>
        </ul>

        <Switch>
          <Route path="/welcome">
            <Welcome name="Gokul" />
          </Route>
          <Route path="/layout1">
            <Layout1 />
          </Route>
          <Route path="/layout2">
            <Layout2 />
          </Route>
          <Route path="/layout3">
            <Layout3 />
          </Route>
          <Route path="/layout4">
            <Layout4 />
          </Route>
          <Route path="/">
            <Home name="Test" />
          </Route>
        </Switch>

      </Router>
    </div>
  );
}

export default App;
