import schema4 from '../schemas/schema4.json';
import Layout from './Layout';
import './Layout.css'



const Layout4 = (props: any) => {
  return (
    <>
      <div className="table">
        <Layout schema={schema4.layout} />
      </div>
    </>
  );
};

export default Layout4;
