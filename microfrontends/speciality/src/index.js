import 'react-app-polyfill/ie11';
import React, { lazy } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { unregister } from './registerServiceWorker';
import Loadable from './Loadable';

const Indian = Loadable(lazy(() => import(/* webpackChunkName: "Indian" */'./IndianRestaurant')));


window.renderRestaurant = (containerId, history) => {
  ReactDOM.render(
    <App history={history} />,
    document.getElementById(containerId),
  );
  unregister();
};

window.unmountRestaurant = containerId => {
  ReactDOM.unmountComponentAtNode(document.getElementById(containerId));
};

window.renderIndianRestaurant = (containerId, history) => {
  ReactDOM.render(
    <Indian />,
    document.getElementById(containerId),
  );
  unregister();
};

window.unmountIndianRestaurant = containerId => {
  ReactDOM.unmountComponentAtNode(document.getElementById(containerId));
};

