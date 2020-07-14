import "../../css/Carousel.css";
import React from "react";
import RealTimeTrack from "./RealTimeTrack";
import { StackedArea } from "@ant-design/charts";

/*
Overview
@author Zhuohao Shen
@date July 8th 2020
@description show overview for current user
*/
export default class OverView extends React.Component {
    StackedLines = (data) => {
        const config = {
            title: {
                visible: true,
                text: "访问量趋势"
            },
            description: {
                visible: true,
                text: "近24小时访问量概览"
            },
            data,
            xField: "time",
            yField: "value",
            theme: "dark",
            stackField: "url",
            color: [
                "#6897a7",
                "#8bc0d6",
                "#60d7a7",
                "#dedede",
                "#fedca9",
                "#fab36f",
                "#d96d6f"
            ],
            xAxis: {
                type: "dateTime",
                tickCount: 5
            },
            label: {
                visible: true,
                type: "area",
                autoScale: true
            },
            legend: {
                visible: true,
                offsetX: -10,
                position: "right-top"
            },
            responsive: true
        };
        return <StackedArea {...config} />;
    };

    render() {
        return (
            <div style={{ position: "relative" }}>
                {this.StackedLines(this.props.data)}

                <RealTimeTrack/>
            </div>
        );
    }
}
