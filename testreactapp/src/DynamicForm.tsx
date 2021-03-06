import schema1 from './schemas/schema1.json';
import schema2 from './schemas/schema2.json';
import data from './data.json';
import './DynamicForm.css'

interface IProps {
  name: String;
}

interface IElement {
  type: string,
  class: string,
  children: IElement[],
  dataKey: string,
  data?: string,
  for?: string,
  id?: string
}


const renderLayout = (element: IElement) => {
  console.log(element);
  let jsonString = JSON.parse(JSON.stringify(data));

  switch (element.type) {
    case "div":
      if (element.children.length > 0) {
        return <div className={element.class}>{element.children.map(e => renderLayout(e))}</div>
      }
      else {
        return <div className={element.class}>{jsonString[element.dataKey]}</div>
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

const DynamicForm = (props: IProps) => {
  return (

    <>
      <div className="wrapper">
        {
          schema1.layout.map(m =>
            renderLayout(m))
        }
      </div>

      <form className="myForm">
        {
          schema2.layout.map(m =>
            renderLayout(m))
        }
      </form>

    </>
  );
};

export default DynamicForm;
