import schema1 from '../schemas/schema1.json';
import './Layout.css'
import Layout from './Layout';

const Layout1 = (props: any) => {
  return (
    <div className="wrapper">
      <Layout schema={schema1.layout} />
    </div>
  );
};

export default Layout1;
