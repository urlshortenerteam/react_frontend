import React from "react";
import { Line } from "@ant-design/charts";

/**
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

        this.state = {
            data: props.data,
        };
    }
    render() {
        let { data } = this.props
        const maxValue = Math.max.apply(
            [],
            data.map((d) => d.value),
        );
        let config = {
            title: {
                visible: true,
                text: this.props.title,
                style: { fill: "white" },
            },
            description: {
                visible: true,
                text: this.props.description,
            },
            xField: this.props.xField,
            yField: this.props.yField,
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
            data,
            legend: this.props.legend,
            seriesField: "url",
            theme: "dark",
            tooltip: this.props.tooltip,
            color: ["#9ad4ff", "#8df8c2", "#ffdc78", "#ff9898"],
            interactions: this.props.interactions,
            responsive: true,
            markerPoints: [
                {
                    visible: true,
                    data: [{ value: maxValue }],
                    label: {
                        visible: true,
                        formatter: (value) => {
                            return '峰值：' + value + '次'
                        },
                        style: {
                            fill: 'white'
                        }
                    },
                    style: { normal: { fill: 'rgba(255, 0, 0, 0.65)' } },
                    animation: {
                        endState: {
                            size: 4,
                            opacity: 0.3,
                        },
                        animateCfg: {
                            duration: 1500,
                            easing: 'easeLinear',
                            repeat: true,
                            delay: 1200,
                        },
                    },
                },
            ],
        }
        return <Line {...config} memoData={data.length} />;
    }
}
