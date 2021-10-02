import schema5 from '../schemas/schema5.json';
import BaseLayout from './BaseLayout';
import './Layout.css'



const Layout4 = (props: any) => {
  return (
    <>
        <BaseLayout layouts={schema5.layouts} controls={schema5.controls} />
    </>
  );
};

export default Layout4;
