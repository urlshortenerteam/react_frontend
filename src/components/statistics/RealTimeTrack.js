import React from "react";
import {getRequest} from "../../Services/ajax";
import Table from "antd/es/table";
/*
RealTimeTrack
@author Zhuohao Shen
@date July 6th 2020
@params {JSON Array} - current status of visits from shorten urls
@description Real-time Tracker of current user
*/
export default class RealTimeTrack extends React.Component{
    state={
        data:[],
        columns:[],
    }
    constructor(props) {
        super(props);
        this.state={columns:[
                {
                    title: '短链接',
                    dataIndex: 'short',
                    key: 'short',
                },
                {
                    title: '原链接',
                    dataIndex: 'long',
                    key: 'long',
                },
                {
                    title: '访问者IP',
                    dataIndex: 'ip',
                    key: 'ip',
                },
                {
                    title: '来源',
                    dataIndex: 'source',
                    key: 'source',
                },
                {
                    title: '访问时间',
                    dataIndex: 'time',
                    key: 'time',}
            ]}
    }
    componentDidMount() {
        getRequest("http://localhost:4000/getReal",this.handleData,{
            params:{id:0},
            errorCallback:this.handleError
            }
        )
    }
    handleData=(response)=>{
        console.log(response.data.logs)
        this.setState({data:response.data.logs});
    }
    handleError=(error)=>{
        console.log(error);
    }

    render() {
        return (
            <Table dataSource={this.state.data} columns={this.state.columns} />
        );
    }
}