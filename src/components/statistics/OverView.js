import React from "react";
import RealTimeTrack from "./RealTimeTrack";
import { StackedArea } from "@ant-design/charts";
import { Select } from "antd";

const { Option } = Select;
/**
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
                text: "访问量趋势",
            },
            description: {
                visible: true,
                text: "近24小时访问量概览",
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
                "#d96d6f",
            ],
            xAxis: {
                type: "dateTime",
                tickCount: 5,
            },
            label: {
                visible: true,
                type: "area",
                autoScale: true,
            },
            legend: {
                visible: false,
            },
            responsive: true,
        };
        return <StackedArea {...config} memoData={data.length} onlyChangeData={true}/>;
    };

    constructor(props) {
        super(props);
        let options = Array.from(new Set(props.data.map((data) => data.url)));
        this.state = {
            options: options,
            lineDisplay: props.data.slice(0, 10 * 24),
        };
    }

    handleChangeSelector = (value) => {
        this.setState({
            lineDisplay: this.props.data.filter(
                (time) => value.indexOf(time.url) !== -1
            ),
        });
    }

    render() {
        return (
            <div style={{ position: "relative" }}>
                <>
                    <Select
                        mode="multiple"
                        placeholder="选择短链接"
                        style={{
                            position: "relative",
                            width: "100%",
                            zIndex: 3,
                            backdropFilter: "saturate(180%) blur(20px)",
                            opacity: 0.7,
                        }}
                        defaultValue={this.state.options.slice(0, 10)}
                        onChange={this.handleChangeSelector}
                    >
                        {this.state.options.map((url) => (
                            <Option key={url}>{url}</Option>
                        ))}
                    </Select>
                    {this.StackedLines(this.state.lineDisplay)}
                </>
                <RealTimeTrack />
            </div>
        );
    }
}
