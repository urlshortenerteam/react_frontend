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
        };
        return <Donut {...config} />;
    }
}

export default DonutPlot;
