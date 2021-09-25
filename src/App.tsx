import React, { useEffect, useRef, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Welcome from './Welcome';
import { ThemeContext, themes } from './theme-context';
import ThemedButton from './ThemedButton';
import MyInput, { MyInputHandles } from './MyInput';

// export const ThemeProvider = ThemeContext.Provider



function Toolbar(props: any) {
  return (
    <ThemedButton onClick={props.changeTheme}>
      Change Theme
    </ThemedButton>
  );
}

function App() {
  const [theme, setTheme] = useState(themes.dark);
  const myInputRef = useRef<MyInputHandles>(null);

  useEffect(() => {
    if (myInputRef.current) {
      myInputRef.current.focus();
    }
  });

  function toggleTheme() {
    console.log("toggling theme");
    setTheme(theme === themes.dark ? themes.light : themes.dark);
    if (myInputRef.current) {
      myInputRef.current.test();
    }
  };

  return (
    <ThemeContext.Provider value={theme}>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <Welcome name="Gokul" />
          <Toolbar changeTheme={() => toggleTheme()} />
          <MyInput ref={myInputRef} />
        </header>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
