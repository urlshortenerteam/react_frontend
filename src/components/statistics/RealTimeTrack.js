import React from "react";
import { getRequest } from "../../services/ajax";
import Table from "antd/es/table";

/**
RealTimeTrack
@author Zhuohao Shen
@date July 6th 2020
@params {JSON Array} - current status of visits from shorten urls
@description Real-time Tracker of current user
*/
export default class RealTimeTrack extends React.Component {
    state = {
        data: [],
        columns: [],
    };

    constructor(props) {
        super(props);
        this.state = {
            columns: [
                {
                    title: "短链接",
                    dataIndex: "shortUrl",
                    key: "shortUrl",
                },
                {
                    title: "原链接",
                    dataIndex: "long",
                    key: "long",
                },
                {
                    title: "访问者IP",
                    dataIndex: "ip",
                    key: "ip",
                },
                {
                    title: "来源",
                    dataIndex: "source",
                    key: "source",
                },
                {
                    title: "访问时间",
                    dataIndex: "time",
                    key: "time",
                },
            ],
        };
    }

    componentDidMount() {
        getRequest("/getReal", this.handleData, {
            errorCallback: this.handleError,
        });
    }

    handleData = (response) => {
        this.setState({ data: response.data.logs });
    };
    handleError = (error) => {
        import("antd").then(({ message }) => {
            message.error(error.toString());
        });
    };

    render() {
        return (
            <Table
                dataSource={this.state.data}
                columns={this.state.columns}
                title={() => "实时统计"}
                rowKey={(record) => {
                    return record.time + record.ip.toString();
                }}
                style={{ marginTop: 15 }}
            />
        );
    }
}
