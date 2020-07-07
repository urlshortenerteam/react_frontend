import React from 'react';
import './App.css';
import 'antd/dist/antd.css';
import moment from 'moment';
import 'moment/locale/zh-cn';
import StatisticsView from "./view/StatisticsView";
moment.locale('zh-cn');

function App() {
  return (
    <div className="App">
        <StatisticsView />
    </div>
  );
}

export default App;
