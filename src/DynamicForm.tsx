import schema from './schema.json';
import data from './data.json';
import './DynamicForm.css'

interface IProps {
  name: String;
}

const DynamicForm = (props: IProps) => {
  return (
    // <div>
    //   Form name: {props.name} 
    //   <br />
    //   schema:
    //   {schema.fields.first_name.type}
    //   <br />
    //   data:
    //   { data.address.city }
    // </div>

    <div className="wrapper">
      <div className="header">Header</div>
      <div className="main">
        <p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.</p>
      </div>
      <div className="aside aside-1">Aside 1</div>
      <div className="aside aside-2">Aside 2</div>
      <div className="footer">Footer</div>
    </div>
  );
};

export default DynamicForm;
