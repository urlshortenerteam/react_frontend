import React, {Component} from "react";
import { Collapse } from 'antd';
import LineChart from "../LineChart";
const { Panel } = Collapse;
/*
TrendingLines
@author Zhuohao Shen
@date July 8th 2020
@description Show all the trending of the user
*/
export default class TrendingLines extends Component{
    state={
        data:[]
    }
    constructor(props) {
        super(props);
        this.state={
            data:props.data
        }
    }
    render() {
        return (
            <Collapse defaultActiveKey={['1']} ghost style={{'background-color':'#011428'}}>
                <Panel  header="过去24小时" key="1">
                    <LineChart  data={this.state.data} />
                </Panel>
                <Panel header="最近一周" key="2">
                    <p>test</p>
                </Panel>
                <Panel header="最近一个月" key="3">
                    <p>test</p>
                </Panel>
                <Panel header="最近一年" key="3">
                <p>test</p>
            </Panel>
            </Collapse>
        );
    }

}