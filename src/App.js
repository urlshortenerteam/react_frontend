import React from 'react';
import logo from './logo.svg';
import './App.css';
<<<<<<< HEAD
=======
import 'antd/dist/antd.css';
import moment from 'moment';
import 'moment/locale/zh-cn';
import MapBox from "./MapBox";
import LineChart from "./LineChart";
moment.locale('zh-cn');
>>>>>>> parent of f53b067... statistics page initialized

function App() {
  return (
    <div className="App">
<<<<<<< HEAD
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
=======
      <LineChart />
>>>>>>> parent of f53b067... statistics page initialized
    </div>
  );
}

export default App;
