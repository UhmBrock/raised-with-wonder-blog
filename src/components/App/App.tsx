import React from 'react';
import './App.css';
import { NoRightClickImages } from '../../ts-plugins/no-right-click';

import Navbar from '../NavBar/Navbar';


class App extends React.Component<{}, {}> {

  componentDidMount() {
    NoRightClickImages();
  }

  render() {
    return (
      <div className="App">
        <Navbar/>
        <div style={ { height: '2000px', backgroundColor: '#fffbf6'}}>
            <h1 style={ {color: '#cfd2d7'} }> Test header for bootstrap </h1>
            <button className="button">test</button>
            <p> test </p>
            <img src={ require("../../images/color_swatches.jpg") }></img>
          </div>
        </div>
    );  
  }
  
}

export default App;
