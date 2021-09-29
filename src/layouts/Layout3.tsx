import schema3 from '../schemas/schema3.json';
import schema4 from '../schemas/schema4.json';
import Layout from './Layout';
import './Layout.css'



const Layout3 = (props: any) => {
  return (
    <>
      <Layout schema={schema3.layout} />
      <br />
      <div className="table">
        <Layout schema={schema4.layout} />
      </div>
    </>
  );
};

export default Layout3;
