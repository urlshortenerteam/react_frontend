import React, { Component } from "react";
import "../../css/AdminStatisticsCss.css";
import NumberCount from "./NumberCount";
import VisitRankingList from "./VisitRankingList";
import { getAllUrls } from "../../Services/adminManageService";

/**
 * simpleStatic
 * @author Shuchang Liu
 * @date July 16th 2020
 * @description simpleStatic used in adminManageService
 **/
export default class SimpleStatistics extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            rawData: [],
            subTabData: [],
            search: 0,
            editShort: null,
        };
    }

    componentDidMount() {
        const callback = (res) => {
            console.log(res.data);
            this.setState({
                dataSource: res.data,
                rawData: res.data,
            });
        };
        getAllUrls(callback, (error) => {
            console.log(error);
        });
    }

    render() {
        return (
            <div>
                <NumberCount />
                <VisitRankingList />
            </div>
        );
    }
}
