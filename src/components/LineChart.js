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
            title:{visible:true,text:'访问量',style: {fill: "white"}},
            description: {
                visible: true,
                text: '短链接访问量分时段统计',
                style: {
                    fill: "#cccccc",
                }
            },xField:'time',yField:'value',
            xAxis:{
                visible:true,
                title:{
                    visible:true,
                    text:"时间",
                    style: {fill: "white"}
                },
                label: {
                    visible: true,
                    autoRotate: true,
                    autoHide: true,
                    style: {fill: "white"}
                },
            },
            yAxis:{
                visible:true,
                title:{
                    visible:true,
                    text:"访问量",
                    style: {fill: "white"},
                    grid:{
                        visible:true,
                        style: {fill: "white"}
                    }
                },
                label: {
                    visible: true,
                    autoRotate: true,
                    autoHide: true,
                    style: {fill: "white"}
                },
            },
            legend:{
                position:"top-left",
                style: {fill: "white"}
            },
            seriesField:"url",
            tooltip:{
                visible:true,
                shared:true,
                showCrosshairs:true,
                crosshairs:{
                    type:'y'
                },
                offset:20,
            },
            color: ['#9ad4ff', '#8df8c2', '#ffdc78','#ff9898'],
            interactions: [
                {
                    type: 'slider',
                    cfg: {
                        start: 0.1,
                        end: 0.2,
                    },
                },
            ],
        }
        };
    }
    render() {
        return (
            <Line {...this.state.config} />
        );
    }
}