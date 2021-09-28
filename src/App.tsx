import { useState } from 'react';
import './App.css';
import Welcome from './Welcome';
import { ThemeContext, themes } from './theme-context';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import DynamicForm from './DynamicForm';
import Home from './Home';

function App() {
  const [theme, setTheme] = useState(themes.dark);

  return (
    <ThemeContext.Provider value={theme}>
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
    </ThemeContext.Provider>
  );
}

export default App;
