import schema1 from '../schemas/schema1.json';
import data from '../data.json';
import './Layout.css'

interface IProps {
  schema: IElement[];
}

export interface IElement {
  type: string,
  class: string,
  children: IElement[],
  dataKey: string,
  data?: string,
  for?: string,
  id?: string
}

export const renderLayout = (element: IElement) => {
  console.log(element);
  let jsonString = JSON.parse(JSON.stringify(data));

  switch (element.type) {
    case "div":
      if (element.children.length > 0) {
        return <div className={element.class}>{element.children.map(e => renderLayout(e))}</div>
      }
      else if (element.dataKey) {
        return <div className={element.class}>{jsonString[element.dataKey]}</div>
      }
      else {
        return <div className={element.class}>{element.data}</div>
      }
    case "p":
      return <p>{jsonString[element.dataKey]}</p>
    case "label":
      return <label htmlFor={element.for}>{element.data}</label>
    case "textarea":
      return <textarea></textarea>
    case "button":
      return <button type="submit">Submit</button>
    default:
      return <input type="text" id={element.id} />;
  }
}

const Layout = (props: IProps) => {
  return (
    <>
      {
        (props.schema).map(m =>
          renderLayout(m))
      }
    </>
  );
};

export default Layout;