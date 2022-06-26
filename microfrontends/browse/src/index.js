import 'react-app-polyfill/ie11';
import React, { lazy } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// import App2 from './App2';
import { unregister } from './registerServiceWorker';
import Loadable from './Loadable';

// const App3 = React.lazy(() => import('./App'));
const App2 = Loadable(lazy(() => import(/* webpackChunkName: "browse2" */'./App2')));


window.renderBrowse = (containerId, history) => {
  ReactDOM.render(
    <App history={history} />,
    document.getElementById(containerId),
  );
  unregister();
};

window.unmountBrowse = containerId => {
  ReactDOM.unmountComponentAtNode(document.getElementById(containerId));
};


window.renderBrowse2 = (containerId, history) => {
  ReactDOM.render(
    <App2 history={history} />,
    document.getElementById(containerId),
  );
  unregister();
};

window.unmountBrowse2 = containerId => {
  ReactDOM.unmountComponentAtNode(document.getElementById(containerId));
};
