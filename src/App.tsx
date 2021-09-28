import './App.css';
import Welcome from './Welcome';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import DynamicForm from './DynamicForm';
import Home from './Home';

function App() {

  return (
      <div className="App">

        <Router>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/welcome">Welcome</Link>
            </li>
            <li>
              <Link to="/dynamic">Dynamic Form</Link>
            </li>
          </ul>

          <Switch>
            <Route path="/welcome">
              <Welcome name="Gokul" />
            </Route>
            <Route path="/dynamic">
              <DynamicForm name="test" />
            </Route>
            <Route path="/">
              <Home name="Test"/>
            </Route>
          </Switch>

        </Router>
      </div>
  );
}

export default App;
