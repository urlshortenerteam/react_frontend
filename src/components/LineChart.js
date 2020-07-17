import React from "react";
import { Line } from "@ant-design/charts";
/*
LineChart:
@author Zhuohao Shen <ao7777@sjtu.edu.cn>
@date July 7th 2020
@description A chart of line showing visit counts by hours
@params {Array(JSON)} data - data of distribution order by hour
@contents {DOM} - a flex box of chart showing distribution
*/
export default class LineChart extends React.Component {
    state = {
        data: [],
        config: {},
    };

    constructor(props) {
        super(props);
        console.log(props.data);
        this.state = {
            data: props.data,
            config: {
                data: props.data,
                title: {
                    visible: true,
                    text: "访问量",
                    style: { fill: "white" },
                },
                description: {
                    visible: true,
                    text: "短链接访问量分时段统计",
                },
                xField: "time",
                yField: "value",
                xAxis: {
                    visible: true,
                    title: {
                        visible: true,
                        text: "时间",
                    },
                    label: {
                        visible: true,
                        autoRotate: true,
                        autoHide: true,
                    },
                },
                yAxis: {
                    visible: true,
                    title: {
                        visible: true,
                        text: "访问量",
                        style: { fill: "white" },
                        grid: {
                            visible: true,
                        },
                    },
                    label: {
                        visible: true,
                        autoRotate: true,
                        autoHide: true,
                    },
                },
                legend: {
                    position: "top-left",
                    offsetX: 10,
                    style: { fill: "white" },
                },
                seriesField: "url",
                theme: "dark",
                tooltip: {
                    visible: true,
                    shared: true,
                    showCrosshairs: true,
                    crosshairs: {
                        type: "y",
                    },
                    offset: 20,
                },
                color: ["#9ad4ff", "#8df8c2", "#ffdc78", "#ff9898"],
                interactions: [
                    {
                        type: "slider",
                        cfg: {
                            start: 0.4,
                            end: 0.8,
                        },
                    },
                ],
            },
        };
    }

    render() {
        return <Line {...this.state.config} />;
    }
}
