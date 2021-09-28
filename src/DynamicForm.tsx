import schema from './schema.json';
import data from './data.json';
import './DynamicForm.css'

interface IProps {
  name: String;
}

interface IElement
{
  element: string,
  class: string,
  fieldKey: string
}


const renderLayout = (element: IElement) => {
  console.log(element);
  let jsonString = JSON.parse(JSON.stringify(data));
  return (
    <div className={element.class}>{jsonString[element.fieldKey]}</div>
  );
}

const DynamicForm = (props: IProps) => {
  return (
    <div className="wrapper">
      {/* <div className="header">Header</div>
      <div className="main">
        <p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.</p>
      </div>
      <div className="aside aside-1">Aside 1</div>
      <div className="aside aside-2">Aside   2</div>
      <div className="footer">Footer</div> */}

      {
        schema.layout.map(m =>
          renderLayout(m))
      }

    </div>
  );
};

export default DynamicForm;
