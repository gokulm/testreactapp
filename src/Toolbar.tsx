import { useEffect } from 'react';
import { MessagingService, Person, Student } from './MessagingService';
import ThemedButton from './ThemedButton';
const person1 = new Person({ name: "John from child" });
const person2 = new Person({ name: "Smith from child" });
const messagingService = MessagingService.getInstance();

function Toolbar(props: any) {

    useEffect(() => {
        messagingService.of(Student).subscribe(result => {
          console.log(result);
        });
      });

    return (
        <>
            <ThemedButton onClick={props.changeTheme}>
                Change Theme
            </ThemedButton>

            <ThemedButton onClick={() => messagingService.publish(person1)}>
                Change Test1
            </ThemedButton>

            <ThemedButton onClick={() => messagingService.publish(person2)}>
                Change Test2
            </ThemedButton>
        </>
    );
}

export default Toolbar;