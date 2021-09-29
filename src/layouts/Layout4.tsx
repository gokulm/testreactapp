import schema5 from '../schemas/schema5.json';
import Layout from './Layout';
import './Layout.css'



const Layout4 = (props: any) => {
  return (
    <>
      <div className="table">
        <Layout schema={schema5.layout} />
      </div>
    </>
  );
};

export default Layout4;
