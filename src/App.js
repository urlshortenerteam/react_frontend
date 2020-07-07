import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'antd/dist/antd.css';
import moment from 'moment';
import 'moment/locale/zh-cn';
import MapBox from "./MapBox";
import LineChart from "./LineChart";
moment.locale('zh-cn');

function App() {
  return (
    <div className="App">
      <LineChart />
    </div>
  );
}

export default App;
