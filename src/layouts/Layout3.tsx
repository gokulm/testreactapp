import schema3 from '../schemas/schema3.json';
import Layout from './Layout';
import './Layout.css'



const Layout3 = (props: any) => {
  return (
    <>
      <Layout schema={schema3.layout} />
    </>
  );
};

export default Layout3;
