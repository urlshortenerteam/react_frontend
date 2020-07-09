import React from "react";
import StatisticsBar from "../components/statistics/StatisticsBar";
import {Row,Col} from 'antd';
import MapBox from "../components/MapBox";

import Navigation from "../components/Navigation";


import TrendingLines from "../components/statistics/TrendingLines";

import '../css/Statistics.css'
import OverView from "../components/statistics/OverView";
import {getRequest} from "../Services/ajax";

/*
StatisticsView
@author Zhuohao Shen
@date July 7th 2020
@description Statistics page
*/
export default class StatisticsView extends React.Component{
    state={
        display:'overview',
        data:[],
        lineData:[]
    };
    toggleSwitch=({key})=>{
        this.setState({display:key});
    };
    async componentDidMount() {
        getRequest("http://localhost:4000/getStat",this.handleData,{
                params:{id:0},
                errorCallback:this.handleError
            }
        )
    }
    handleData=(response)=>{
        this.setState({data:response.data.stats});
        let lines=[];
        this.state.data.forEach(
            (url)=>{
                url.time_distr.forEach(
                    (time)=>{
                        time.url='short.cn/'+url.short;
                        lines.push(time)
                    }
                )

            }
        );
        this.setState({lineData:lines});
        console.log(this.state)
    };
    handleError=(error)=>{
        console.log(error);
    };
    render() {

        return (
            <div>
                <Navigation/>
                <Row>
                    <Col  style={{background:'black',"maxWidth":"256px"}}>
                        <StatisticsBar toggleSwitch={this.toggleSwitch} />
                    </Col>
                    <Col offset={3} span={21} style={{height: 800,
                        marginLeft:30,
                        marginRight:32,
                    }}>
                        {this.state.display==='time'?<TrendingLines data={this.state.lineData}/>:null}
                        {this.state.display==='area'?<MapBox data={this.state.data[0].area_distr}/>:null}
                        {this.state.display==='overview'?<OverView />:null}
                    </Col>
                </Row>
            </div>
        );
    }
}
