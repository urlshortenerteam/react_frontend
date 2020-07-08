import '../../css/Carousel.css'
import {Carousel} from "antd";
import React from "react";
import RealTimeTrack from "./RealTimeTrack";

/*
Overview
@author Zhuohao Shen
@date July 8th 2020
@description show overview for current user
*/
export default class OverView extends React.Component{
    render() {
        return (
            <div>
                <Carousel autoplay>
                    <div>
                        <h3>1</h3>
                    </div>
                    <div>
                        <h3>2</h3>
                    </div>
                    <div>
                        <h3>3</h3>
                    </div>
                    <div>
                        <h3>4</h3>
                    </div>
                </Carousel>
                <RealTimeTrack />
            </div>
        );
    }
}