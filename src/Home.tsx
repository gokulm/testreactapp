import { useEffect, useRef, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { themes } from './theme-context';
import MyInput, { MyInputHandles } from './MyInput';
import Toolbar from './Toolbar';
import { ChangeThemeCommand, MessagingService, MyInputEvent, Person, Student } from './MessagingService';
interface IProps {
    name: String;
}

const Home = (props: IProps) => {
    const [theme, setTheme] = useState(themes.dark);
    const myInputRef = useRef<MyInputHandles>(null);
    const messagingService = MessagingService.getInstance();
    const student1 = new Student({ name: "John student from parent" });
    const [person, setPerson] = useState(new Person());

    useEffect(() => {
        if (myInputRef.current) {
            myInputRef.current.focus();
        }

        let personSubscription = messagingService.of(Person).subscribe(result => {
            console.log(result);
            setPerson(result);
        });
        return () => {
            personSubscription.unsubscribe();
        };

    });

    useEffect(() => {
        let changeThemeSubscription = messagingService.of(ChangeThemeCommand).subscribe(result => {
            console.log(result);
            setTheme(result.theme);
        });
        return () => {
            changeThemeSubscription.unsubscribe();
        };

    });

    function toggleTheme() {
        console.log("toggling theme");
        setTheme(theme === themes.dark ? themes.light : themes.dark);
        if (myInputRef.current) {
            myInputRef.current.test();

            let myInput = new MyInputEvent({ name: "My input event from parent" });
            messagingService.publish(myInput);
        }

        messagingService.publish(student1);
    };

    function parameterizedMethod(input: string) {
        console.log("here is the param: " + input);
    }

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />


                <Toolbar changeTheme={() => toggleTheme()} onPublish={(p: any) => parameterizedMethod("test parameter - " + p)} />
                <MyInput ref={myInputRef} />
            </header>


            <div>
                Person: {person.name}
            </div>
        </div>
    );
};

export default Home;
