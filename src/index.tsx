import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

// Bootstrap Imports //
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';

// Component Imports
import BaseApp from './components/Base-App/Base-App';

// Css imports //
import './css/index.css';

// ts/js imports // 
import './externals/no-right-click';


ReactDOM.render(
  <React.StrictMode>
    <BaseApp />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
  