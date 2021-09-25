import React, { useEffect, useRef, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Welcome from './Welcome';
import { ThemeContext, themes } from './theme-context';
import MyInput, { MyInputHandles } from './MyInput';
import Toolbar from './Toolbar';
import { MessagingService, Person, Student } from './MessagingService';

function App() {
  const [theme, setTheme] = useState(themes.dark);
  const myInputRef = useRef<MyInputHandles>(null);
  const messagingService = MessagingService.getInstance();
  const student1 = new Student({ name: "John student from parent" });

  useEffect(() => {
    if (myInputRef.current) {
      myInputRef.current.focus();
    }

    messagingService.of(Person).subscribe(result => {
      console.log(result);
    });
  });

  function toggleTheme() {
    console.log("toggling theme");
    setTheme(theme === themes.dark ? themes.light : themes.dark);
    if (myInputRef.current) {
      myInputRef.current.test();
    }

    messagingService.publish(student1);
  };

  function parameterizedMethod(input: string) {
    console.log("here is the param: " + input);
  }

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
          <Toolbar changeTheme={() => toggleTheme()} onPublish={(p: any) => parameterizedMethod("test parameter - " + p)} />
          <MyInput ref={myInputRef} />
        </header>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
