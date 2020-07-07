import React from "react";
import { Line }from "@ant-design/charts";
import {testData} from "./MapBox.js"
export default class LineChart extends React.Component{
    state={
        data:[],
        config:{},
    }
    constructor() {
        super();
        this.state={data: testData[0].time_distr,
        config: {
            data:testData[0].time_distr,
            title:{visible:true,text:'分时段统计'},
            description: {
                visible: true,
                text: '对短链接访问量分时段统计',
            },xField:'time',yField:'value'
        }
        };
    }
    render() {
        return (
            <Line {...this.state.config} />
        );
    }
}