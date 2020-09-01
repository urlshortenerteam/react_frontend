import React, { Component } from "react";
import NumberCount from "./NumberCount";
import VisitRankingList from "./VisitRankingList";

/**
 * simpleStatic
 * @author Shuchang Liu
 * @date July 16th 2020
 * @description simpleStatic used in adminManageService
 **/
export default class SimpleStatistics extends Component {
    render() {
        return (
            <div>
                <NumberCount />
                <br />
                <VisitRankingList />
            </div>
        );
    }
}
