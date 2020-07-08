import React from "react";
import StatisticsBar from "../components/statistics/StatisticsBar";
import {Row,Col} from 'antd';
import MapBox from "../components/MapBox";
import TrendingLines from "../components/statistics/TrendingLines";
import '../css/Statistics.css'
import OverView from "../components/statistics/OverView";
const testData=[{short:'abc',
    count:2341,
    area_distr:[
        {
            name: '云南省',
            code: 530000,
            value: 1000
        },
        {
            name: '黑龙江省',
            code: 230000,
            value: 16361.62
        },
        {
            name: '贵州省',
            code: 520000,
            value: 14806.45
        },
        {
            name: '北京市',
            code: 110000,
            value: 30319.98
        },
        {
            name: '河北省',
            code: 130000,
            value: 36010.27
        },
        {
            name: '山西省',
            code: 140000,
            value: 16818.11
        },
        {
            name: '吉林省',
            code: 220000,
            value: 15074
        },
        {
            name: '宁夏回族自治区',
            code: 640000,
            value: 3705.18
        },
        {
            name: '辽宁省',
            code: 210000,
            value: 25315.35
        },
        {
            name: '海南省',
            code: 460000,
            value: 4832.05
        },
        {
            name: '内蒙古自治区',
            code: 150000,
            value: 17289.22
        },
        {
            name: '天津市',
            code: 120000,
            value: 18809.64
        },
        {
            name: '新疆维吾尔自治区',
            code: 650000,
            value: 12199.08
        },
        {
            name: '上海市',
            code: 310000,
            value: 32679.87
        },
        {
            name: '陕西省',
            code: 610000,
            value: 24438.32
        },
        {
            name: '甘肃省',
            code: 620000,
            value: 8246.07
        },
        {
            name: '安徽省',
            code: 340000,
            value: 30006.82
        },
        {
            name: '香港特别行政区',
            code: 810000,
            value: 0
        },
        {
            name: '广东省',
            code: 440000,
            value: 97277.77
        },
        {
            name: '河南省',
            code: 410000,
            value: 48055.86
        },
        {
            name: '湖南省',
            code: 430000,
            value: 36425.78
        },
        {
            name: '江西省',
            code: 360000,
            value: 21984.78
        },
        {
            name: '四川省',
            code: 510000,
            value: 40678.13
        },
        {
            name: '广西壮族自治区',
            code: 450000,
            value: 20353.51
        },
        {
            name: '江苏省',
            code: 320000,
            value: 92595.4
        },
        {
            name: '澳门特别行政区',
            code: 820000,
            value: null
        },
        {
            name: '浙江省',
            code: 330000,
            value: 56197.15
        },
        {
            name: '山东省',
            code: 370000,
            value: 76469.67
        },
        {
            name: '青海省',
            code: 630000,
            value: 2865.23
        },
        {
            name: '重庆市',
            code: 500000,
            value: 20363.19
        },
        {
            name: '福建省',
            code: 350000,
            value: 35804.04
        },
        {
            name: '湖北省',
            code: 420000,
            value: 39366.55
        },
        {
            name: '西藏自治区',
            code: 540000,
            value: 1477.63
        },
        {
            name: '台湾省',
            code: 710000,
            value: null
        }
    ],
    time_distr:[
        {time:'0',url:"short.cn/URl",value:3}, {time:'1',url:"short.cn/URl",value:5},{time:'2',url:"short.cn/URl",value:6},{time:'3',url:"short.cn/URl",value:2},{time:'4',url:"short.cn/URl",value:2},{time:'5',url:"short.cn/URl",value:2},{time:'6',url:"short.cn/URl",value:2},{time:'7',url:"short.cn/URl",value:2},
        {time:'8',url:"short.cn/URl",value:2},{time:'9',url:"short.cn/URl",value:742},{time:'10',url:"short.cn/URl",value:241},{time:'11',url:"short.cn/URl",value:2},{time:'12',url:"short.cn/URl",value:2},{time:'13',url:"short.cn/URl",value:2}, {time:'14',url:"short.cn/URl",value:2},{time:'15',url:"short.cn/URl",value:2},
        {time:'16',url:"short.cn/URl",value:262},{time:'17',url:"short.cn/URl",value:20},{time:'18',url:"short.cn/URl",value:242},{time:'19',url:"short.cn/URl",value:2},{time:'20',url:"short.cn/URl",value:2},
        {time:'21',url:"short.cn/URl",value:212},{time:'22',url:"short.cn/URl",value:234},{time:'23',url:"short.cn/URl",value:253},
        {time:'0',url:"short.cn/uRL",value:3}, {time:'1',url:"short.cn/uRL",value:5},{time:'2',url:"short.cn/uRL",value:6},{time:'3',url:"short.cn/uRL",value:2},{time:'4',url:"short.cn/uRL",value:2},{time:'5',url:"short.cn/uRL",value:2},{time:'6',url:"short.cn/uRL",value:2},{time:'7',url:"short.cn/uRL",value:2},
        {time:'8',url:"short.cn/uRL",value:122},{time:'9',url:"short.cn/uRL",value:442},{time:'10',url:"short.cn/uRL",value:71},{time:'11',url:"short.cn/uRL",value:542},{time:'12',url:"short.cn/uRL",value:42},{time:'13',url:"short.cn/uRL",value:2}, {time:'14',url:"short.cn/uRL",value:72},{time:'15',url:"short.cn/uRL",value:2},
        {time:'16',url:"short.cn/uRL",value:26},{time:'17',url:"short.cn/uRL",value:20},{time:'18',url:"short.cn/uRL",value:142},{time:'19',url:"short.cn/uRL",value:322},{time:'20',url:"short.cn/uRL",value:2},
        {time:'21',url:"short.cn/uRL",value:22},{time:'22',url:"short.cn/uRL",value:274},{time:'23',url:"short.cn/uRL",value:453}

    ],
    source_distr:{'jd.com':345,'taobao.com':35,'qq.com':312}
},
    {short:'aBC',
        count:3245,
        area_distr:[
            {
                name: '云南省',
                code: 530000,
                value: 17881.12
            },
            {
                name: '黑龙江省',
                code: 230000,
                value: 16361.62
            },
            {
                name: '贵州省',
                code: 520000,
                value: 14806.45
            },
            {
                name: '北京市',
                code: 110000,
                value: 30319.98
            },
            {
                name: '河北省',
                code: 130000,
                value: 36010.27
            },
            {
                name: '山西省',
                code: 140000,
                value: 16818.11
            },
            {
                name: '吉林省',
                code: 220000,
                value: 15074
            },
            {
                name: '宁夏回族自治区',
                code: 640000,
                value: 3705.18
            },
            {
                name: '辽宁省',
                code: 210000,
                value: 25315.35
            },
            {
                name: '海南省',
                code: 460000,
                value: 4832.05
            },
            {
                name: '内蒙古自治区',
                code: 150000,
                value: 17289.22
            },
            {
                name: '天津市',
                code: 120000,
                value: 18809.64
            },
            {
                name: '新疆维吾尔自治区',
                code: 650000,
                value: 12199.08
            },
            {
                name: '上海市',
                code: 310000,
                value: 32679.87
            },
            {
                name: '陕西省',
                code: 610000,
                value: 24438.32
            },
            {
                name: '甘肃省',
                code: 620000,
                value: 8246.07
            },
            {
                name: '安徽省',
                code: 340000,
                value: 30006.82
            },
            {
                name: '香港特别行政区',
                code: 810000,
                value: 0
            },
            {
                name: '广东省',
                code: 440000,
                value: 97277.77
            },
            {
                name: '河南省',
                code: 410000,
                value: 48055.86
            },
            {
                name: '湖南省',
                code: 430000,
                value: 36425.78
            },
            {
                name: '江西省',
                code: 360000,
                value: 21984.78
            },
            {
                name: '四川省',
                code: 510000,
                value: 40678.13
            },
            {
                name: '广西壮族自治区',
                code: 450000,
                value: 20353.51
            },
            {
                name: '江苏省',
                code: 320000,
                value: 92595.4
            },
            {
                name: '澳门特别行政区',
                code: 820000,
                value: null
            },
            {
                name: '浙江省',
                code: 330000,
                value: 56197.15
            },
            {
                name: '山东省',
                code: 370000,
                value: 76469.67
            },
            {
                name: '青海省',
                code: 630000,
                value: 2865.23
            },
            {
                name: '重庆市',
                code: 500000,
                value: 20363.19
            },
            {
                name: '福建省',
                code: 350000,
                value: 35804.04
            },
            {
                name: '湖北省',
                code: 420000,
                value: 39366.55
            },
            {
                name: '西藏自治区',
                code: 540000,
                value: 1477.63
            },
            {
                name: '台湾省',
                code: 710000,
                value: null
            }
        ],
        time_distr:{
            0:23,1:23,2:234,3:34,4:85,5:84,6:84,7:43,8:32,9:32,10:63,11:23,
            12:45,13:23,14:452,15:412,16:32,17:345,18:345,19:234,20:34,21:56,22:84,23:45
        },
        source_distr:{'jd.com':345,'taobao.com':35,'qq.com':312}
    },
    {short:'Abc',
        count:4221,
        area_distr:[
            {
                name: '云南省',
                code: 530000,
                value: 17881.12
            },
            {
                name: '黑龙江省',
                code: 230000,
                value: 16361.62
            },
            {
                name: '贵州省',
                code: 520000,
                value: 14806.45
            },
            {
                name: '北京市',
                code: 110000,
                value: 30319.98
            },
            {
                name: '河北省',
                code: 130000,
                value: 36010.27
            },
            {
                name: '山西省',
                code: 140000,
                value: 16818.11
            },
            {
                name: '吉林省',
                code: 220000,
                value: 15074
            },
            {
                name: '宁夏回族自治区',
                code: 640000,
                value: 3705.18
            },
            {
                name: '辽宁省',
                code: 210000,
                value: 25315.35
            },
            {
                name: '海南省',
                code: 460000,
                value: 4832.05
            },
            {
                name: '内蒙古自治区',
                code: 150000,
                value: 17289.22
            },
            {
                name: '天津市',
                code: 120000,
                value: 18809.64
            },
            {
                name: '新疆维吾尔自治区',
                code: 650000,
                value: 12199.08
            },
            {
                name: '上海市',
                code: 310000,
                value: 32679.87
            },
            {
                name: '陕西省',
                code: 610000,
                value: 24438.32
            },
            {
                name: '甘肃省',
                code: 620000,
                value: 8246.07
            },
            {
                name: '安徽省',
                code: 340000,
                value: 30006.82
            },
            {
                name: '香港特别行政区',
                code: 810000,
                value: 0
            },
            {
                name: '广东省',
                code: 440000,
                value: 97277.77
            },
            {
                name: '河南省',
                code: 410000,
                value: 48055.86
            },
            {
                name: '湖南省',
                code: 430000,
                value: 36425.78
            },
            {
                name: '江西省',
                code: 360000,
                value: 21984.78
            },
            {
                name: '四川省',
                code: 510000,
                value: 40678.13
            },
            {
                name: '广西壮族自治区',
                code: 450000,
                value: 20353.51
            },
            {
                name: '江苏省',
                code: 320000,
                value: 92595.4
            },
            {
                name: '澳门特别行政区',
                code: 820000,
                value: null
            },
            {
                name: '浙江省',
                code: 330000,
                value: 56197.15
            },
            {
                name: '山东省',
                code: 370000,
                value: 76469.67
            },
            {
                name: '青海省',
                code: 630000,
                value: 2865.23
            },
            {
                name: '重庆市',
                code: 500000,
                value: 20363.19
            },
            {
                name: '福建省',
                code: 350000,
                value: 35804.04
            },
            {
                name: '湖北省',
                code: 420000,
                value: 39366.55
            },
            {
                name: '西藏自治区',
                code: 540000,
                value: 1477.63
            },
            {
                name: '台湾省',
                code: 710000,
                value: null
            }
        ],
        time_distr:{
            0:23,1:23,2:234,3:34,4:85,5:84,6:84,7:43,8:32,9:32,10:63,11:23,
            12:45,13:23,14:452,15:412,16:32,17:345,18:345,19:234,20:34,21:56,22:84,23:45
        },
        source_distr:{'jd.com':345,'taobao.com':35,'qq.com':312}
    },
    {short:'AbC',
        count:1234,
        area_distr:[
            {
                name: '云南省',
                code: 530000,
                value: 17881.12
            },
            {
                name: '黑龙江省',
                code: 230000,
                value: 16361.62
            },
            {
                name: '贵州省',
                code: 520000,
                value: 14806.45
            },
            {
                name: '北京市',
                code: 110000,
                value: 30319.98
            },
            {
                name: '河北省',
                code: 130000,
                value: 36010.27
            },
            {
                name: '山西省',
                code: 140000,
                value: 16818.11
            },
            {
                name: '吉林省',
                code: 220000,
                value: 15074
            },
            {
                name: '宁夏回族自治区',
                code: 640000,
                value: 3705.18
            },
            {
                name: '辽宁省',
                code: 210000,
                value: 25315.35
            },
            {
                name: '海南省',
                code: 460000,
                value: 4832.05
            },
            {
                name: '内蒙古自治区',
                code: 150000,
                value: 17289.22
            },
            {
                name: '天津市',
                code: 120000,
                value: 18809.64
            },
            {
                name: '新疆维吾尔自治区',
                code: 650000,
                value: 12199.08
            },
            {
                name: '上海市',
                code: 310000,
                value: 32679.87
            },
            {
                name: '陕西省',
                code: 610000,
                value: 24438.32
            },
            {
                name: '甘肃省',
                code: 620000,
                value: 8246.07
            },
            {
                name: '安徽省',
                code: 340000,
                value: 30006.82
            },
            {
                name: '香港特别行政区',
                code: 810000,
                value: 0
            },
            {
                name: '广东省',
                code: 440000,
                value: 97277.77
            },
            {
                name: '河南省',
                code: 410000,
                value: 48055.86
            },
            {
                name: '湖南省',
                code: 430000,
                value: 36425.78
            },
            {
                name: '江西省',
                code: 360000,
                value: 21984.78
            },
            {
                name: '四川省',
                code: 510000,
                value: 40678.13
            },
            {
                name: '广西壮族自治区',
                code: 450000,
                value: 20353.51
            },
            {
                name: '江苏省',
                code: 320000,
                value: 92595.4
            },
            {
                name: '澳门特别行政区',
                code: 820000,
                value: null
            },
            {
                name: '浙江省',
                code: 330000,
                value: 56197.15
            },
            {
                name: '山东省',
                code: 370000,
                value: 76469.67
            },
            {
                name: '青海省',
                code: 630000,
                value: 2865.23
            },
            {
                name: '重庆市',
                code: 500000,
                value: 20363.19
            },
            {
                name: '福建省',
                code: 350000,
                value: 35804.04
            },
            {
                name: '湖北省',
                code: 420000,
                value: 39366.55
            },
            {
                name: '西藏自治区',
                code: 540000,
                value: 1477.63
            },
            {
                name: '台湾省',
                code: 710000,
                value: null
            }
        ],
        time_distr:{
            0:23,1:23,2:234,3:34,4:85,5:84,6:84,7:43,8:32,9:32,10:63,11:23,
            12:45,13:23,14:452,15:412,16:32,17:345,18:345,19:234,20:34,21:56,22:84,23:45
        },
        source_distr:{'jd.com':345,'taobao.com':35,'qq.com':312}
    },];
/*
StatisticsView
@author Zhuohao Shen
@date July 7th 2020
@description Statistics page
*/
export default class StatisticsView extends React.Component{
    state={
        display:'overview'
    }
    toggleSwitch=({key})=>{
        this.setState({display:key});
    }
    render() {

        return (
            <div>
                <Row>
                    <Col style={{background:'black',"maxWidth":"256px"}}>
                        <StatisticsBar toggleSwitch={this.toggleSwitch} />
                    </Col>
                    <Col flex="auto" style={{height: 800}}>
                        {this.state.display==='time'?<TrendingLines data={testData[0].time_distr}/>:null}
                        {this.state.display==='area'?<MapBox data={testData[0].area_distr}/>:null}
                        {this.state.display==='overview'?<OverView />:null}
                    </Col>
                </Row>
            </div>
        );
    }
}