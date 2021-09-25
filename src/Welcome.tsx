import { useContext } from "react";
import { ThemeContext } from "./theme-context";
interface IProps {
  name: String;
}

const Welcome = (props: IProps) => {
  const themeContext = useContext(ThemeContext)
  const numbers = [1, 2, 3, 4, 5];
  const listItems = numbers.map((number) =>
    <li>{number}</li>
  );
  return (

    <div>
      {/* <ul>{listItems}</ul> */}
      Welcome {props.name}
      <br />
      <span>background: {themeContext.background} foreground: {themeContext.foreground} </span>

    </div>
  );
};

export default Welcome;
