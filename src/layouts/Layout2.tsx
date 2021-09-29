import schema2 from '../schemas/schema2.json';
import './Layout.css'
import { renderLayout } from './Layout1';



const Layout2 = (props: any) => {
  return (


    <form className="myForm">
      {
        schema2.layout.map(m =>
          renderLayout(m))
      }
    </form>
  );
};

export default Layout2;
