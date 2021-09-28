import { useEffect, useState } from 'react';
import { ChangeThemeCommand, MessagingService, Person, Student } from './MessagingService';
import { themes } from './theme-context';
import ThemedButton from './ThemedButton';
const person1 = new Person({ name: "John from child" });
const person2 = new Person({ name: "Smith from child" });
const messagingService = MessagingService.getInstance();

function Toolbar(props: any) {
    const [student, setStudent] = useState(new Student());

    useEffect(() => {
        let studentSubscription = messagingService.of(Student).subscribe(result => {
          console.log(result);
          setStudent(result);
        });
        return () => {
            studentSubscription.unsubscribe();
        };
      });

    return (
        <>

            <div>
                Student: {student.name}
            </div>

            <ThemedButton onClick={props.changeTheme}>
                Change Theme
            </ThemedButton>

            <ThemedButton onClick={() => messagingService.publish(new ChangeThemeCommand({ theme: themes.dark}))}>
                Set Dark
            </ThemedButton>

            <ThemedButton onClick={() => messagingService.publish(new ChangeThemeCommand({ theme: themes.light}))}>
                Set Light
            </ThemedButton>
        </>
    );
}

export default Toolbar;