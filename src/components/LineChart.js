import React from "react";
import { Line }from "@ant-design/charts";
/*
LineChart:
@author Zhuohao Shen <ao7777@sjtu.edu.cn>
@date July 7th 2020
@description A chart of line showing visit counts by hours
@params {Array(JSON)} data - data of distribution order by hour
@contents {DOM} - a flex box of chart showing distribution
*/
export default class LineChart extends React.Component{
    state={
        data:[],
        config:{},
    }
    constructor(props) {
        super(props);
        this.state={data: props.data,
        config: {
            data:props.data,
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