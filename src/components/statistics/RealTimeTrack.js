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
                    render: (text, record) => {
                        let myTime = record.time.split(" ");
                        myTime = myTime[1];
                        let t = myTime.split(":");
                        let hours = (parseInt(t[0]) + 3) % 24;
                        myTime = hours.toString() + ":" + t[1] + ":" + t[2];

                        let dateTemp = record.time.split("-");
                        let days = dateTemp[2];

                        days = parseInt(days);
                        let date = new Date(
                            dateTemp[0] + "-" + "01" + "-" + "01"
                        ); //转换为MM-DD-YYYY格式

                        date.setDate(date.getDate() + days - 1);
                        var day = date.getDate();

                        return record.time === null ? null : (
                            <span>
                                {" "}
                                {dateTemp[0] +
                                    "-" +
                                    dateTemp[1] +
                                    "-" +
                                    day +
                                    " " +
                                    myTime}
                            </span>
                        );
                    },
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
