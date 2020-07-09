import '../../css/Carousel.css'
import React from "react";
import RealTimeTrack from "./RealTimeTrack";
import {Gauge,Liquid} from "@ant-design/charts";
import {Row,Col} from 'antd';

/*
Overview
@author Zhuohao Shen
@date July 8th 2020
@description show overview for current user
*/
export default class OverView extends React.Component{
    WorkloadGauge=(style)=>{
        const config = {
            title: {
                visible: true,
                text: '负载',
                alignTo:'middle'
            },
            value: 34,
            min: 0,
            max: 100,
            range: [0, 70],
            format: (v) => {
                return v + '%';
            },
            color: ['l(0) 0:' +
            '#b0d0ff' +
            ' 1:' +
            '#03c600'
            ],
        };
        return  <Gauge {...config} style={style} theme="dark"/>
    }
    fluxLiquid=()=>{
        const config = {
            title: {
                visible: true,
                text: '流量',
                alignTo:'middle'
            },
            forceFit:true,

            color:'#99CC33',
            min: 0,
            max: 10000,
            value: 5639,
            statistic: { formatter: (value) => ((100 * value) / 10000).toFixed(1) + '%'
            ,color:"#ffffff"
            },
        };
        return <Liquid {...config} theme="dark"/>;
    }
    render() {
        return (
            <div>
                <Row align="bottom" >
                    <Col flex={1}>
                        {this.WorkloadGauge()}

                    </Col >
                    <Col  flex={2}>
                        {this.fluxLiquid()}
                    </Col>
                </Row>
                <RealTimeTrack />
            </div>
        );
    }
}