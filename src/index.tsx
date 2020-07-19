import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

// Bootstrap Imports //
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';

// Component Imports
<<<<<<< Updated upstream
import Navbar from './components/NavBar/Navbar';
=======
import BaseApp from './components/Base-App/Base-App';
>>>>>>> Stashed changes

// Css imports //
import './css/index.css';

// ts/js imports // 
import './ts-plugins/no-right-click';


ReactDOM.render(
  <React.StrictMode>
<<<<<<< Updated upstream
    <Navbar />
=======
    <BaseApp/>
>>>>>>> Stashed changes
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
  