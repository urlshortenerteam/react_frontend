import React from "react";
import { Donut } from "@ant-design/charts";

/**
 * DonutPlot
 * @author Shuchang Liu
 * @date July 16th 2020
 * @description DonutPlot
 * @property data
 **/
class DonutPlot extends React.Component {
    render() {
        let data = this.props.data;
        const config = {
            forceFit: true,
            radius: 0.8,
            padding: "auto",
            data,
            angleField: "value",
            colorField: "type",
            title: {
                visible: true,
                text: "TOP10环状图",
                style: {
                    fill: "white",
                    fontSize: 24,
                },
                alignTo: "middle",
            },
            description: {
                visible: false,
                position: "top-center",
                text: "访问量前十的热门短链接",
            },
            ringStyle: {
                stroke: "#0c1112",
                lineWidth: 0,
                strokeOpacity: 0,
            },
            // color: ['#5a93fc', '#90b6fd', '#c8dbfe', '#ffffff'],
            label: {
                visible: false,
            },
            legend: {
                visible: true,
                position: "bottom-center",
            },
            pieStyle: () => {
                return {
                    shadowColor: "#55acee",
                    shadowBlur: 5,
                    // shadowOffsetX: -5,
                };
            },
        };
        return <Donut {...config} />;
    }
}

export default DonutPlot;
