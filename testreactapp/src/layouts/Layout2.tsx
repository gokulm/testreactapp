import schema2 from '../schemas/schema2.json';
import Layout from './Layout';
import './Layout.css'



const Layout2 = (props: any) => {
  return (
    <form className="myForm">
      <Layout schema={schema2.layout} />
    </form>
  );
};

export default Layout2;
