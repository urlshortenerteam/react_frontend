import React, { Component } from "react";
import { Collapse, Select } from "antd";
import LineChart from "../LineChart";

const { Option } = Select;
const { Panel } = Collapse;
/**TrendingLines
@author Zhuohao Shen
@date July 8th 2020
@description Show all the trending of the user
*/
export default class TrendingLines extends Component {
    state = {
        data: [],
        lineDisplay: [],
    };

    constructor(props) {
        super(props);
        let options = Array.from(new Set(props.data.map((data) => data.url)))
        this.state = {
            data: props.data,
            options: options,
            lineDisplay: props.data.slice(0,10*24)
        };
        console.log(this.state)
    }

    handleChangeSelector = (value) => {
        this.setState({
            lineDisplay: this.state.data.filter(
                (time) => value.indexOf(time.url) !== -1
            )
        })
    }
    render() {
        return (
            <Collapse
                defaultActiveKey={["1"]}
                ghost
                style={{ backgroundColor: "#011428" }}
            >
                <Panel header="过去24小时" key="1">
                    <Select
                        mode="multiple"
                        placeholder="选择短链接"
                        style={{
                            position: "relative",
                            width:"100%",
                            zIndex: 3,
                            backdropFilter:
                                "saturate(180%) blur(20px)",
                            opacity: 0.7,
                        }}
                        defaultValue={this.state.options.slice(0, 10)}
                        onChange={this.handleChangeSelector}
                    >
                        {this.state.options.map(
                            (url) => (
                                <Option key={url}>
                                    {url}
                                </Option>
                            )
                        )}
                    </Select>
                    <LineChart
                        data={this.state.lineDisplay}
                        title="访问量"
                        description="短链接访问量分时段统计"
                        xField="time"
                        yField="value"
                        legend={
                            {
                                visible: false,
                                position: "top-left",
                                offsetX: 10,
                                style: { fill: "white" },
                            }
                        }
                        tooltip={
                            {
                                visible: true,
                                shared: true,
                                showCrosshairs: true,
                                crosshairs: {
                                    type: "y",
                                },
                                offset: 20,
                            }
                        }
                        interactions={
                            [
                                {
                                    type: "slider",
                                    cfg: {
                                        start: 0.4,
                                        end: 0.8,
                                    },
                                },
                            ]
                        }
                    />
                </Panel>
                <Panel header="最近一周" key="2">
                    <p>test</p>
                </Panel>
                <Panel header="最近一个月" key="3">
                    <p>test</p>
                </Panel>
                <Panel header="最近一年" key="4">
                    <p>test</p>
                </Panel>
            </Collapse>
        );
    }
}
