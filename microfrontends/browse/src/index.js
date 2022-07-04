import 'react-app-polyfill/ie11';
import React, { lazy } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { unregister } from './registerServiceWorker';
import Loadable from './Loadable';

const Indian = Loadable(lazy(() => import(/* webpackChunkName: "Indian" */'./IndianRestaurant')));
const Japanese = Loadable(lazy(() => import(/* webpackChunkName: "Japanese" */'./JapaneseRestaurant')));



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

window.renderIndian = (containerId, history) => {
  console.log("inside window.renderIndian. containerId: ", containerId);
  ReactDOM.render(
    <Indian />,
    document.getElementById(containerId),
  );
  unregister();
};

window.unmountIndian = containerId => {
  ReactDOM.unmountComponentAtNode(document.getElementById(containerId));
};

window.renderJapanese = (containerId, history) => {
  console.log("inside window.renderIndian. containerId: ", containerId);
  ReactDOM.render(
    <Japanese />,
    document.getElementById(containerId),
  );
  unregister();
};

window.unmountJapanese = containerId => {
  ReactDOM.unmountComponentAtNode(document.getElementById(containerId));
};