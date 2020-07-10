'use strict';
const express = require('express');
const Mock = require('mockjs');
const apiRoutes = express.Router();

let random = Math.random() * 500 + 500;
// 访问 /getReal/ 时
apiRoutes.get('/getReal', function(req, res) {
    setTimeout(() => {
        res.json({
            status: 200,
            msg: '查询成功',
            data: Mock.mock({
                "logs|1-5":[
                    {
                            "shortUrl":/[a-z][A-Z][0-9][a-z][0-9][A-Z]/,
                            "long":'@url("http")',
                            "ip":'@ip',
                            "source":'@domain',
                            "time":'@now'
                    }
                ]
                }
            )
        });
    }, random);
});
apiRoutes.get('/getStat', function(req, res) {
    let jsonResponse={status: 200,
        msg: '查询成功'};
    Object.assign(jsonResponse,Mock.mock({
        "data|1-10":[
            {
                "shortUrl":/[a-z][A-Z][0-9][a-z][0-9][A-Z]/,
                "count":'@natural(0,100000)',
                "long":'@url("http")',
                "area_distr":[
                    {
                        name: '云南省',
                        code: 530000,
                        value: '@natural(0,3000)'
                    },
                    {
                        name: '黑龙江省',
                        code: 230000,
                        value: '@natural(0,3000)'
                    },
                    {
                        name: '贵州省',
                        code: 520000,
                        value: '@natural(0,3000)'
                    },
                    {
                        name: '北京市',
                        code: 110000,
                        value: '@natural(0,3000)'
                    },
                    {
                        name: '河北省',
                        code: 130000,
                        value: '@natural(0,3000)'
                    },
                    {
                        name: '山西省',
                        code: 140000,
                        value: '@natural(0,3000)'
                    },
                    {
                        name: '吉林省',
                        code: 220000,
                        value: '@natural(0,3000)'
                    },
                    {
                        name: '宁夏回族自治区',
                        code: 640000,
                        value: '@natural(0,3000)'
                    },
                    {
                        name: '辽宁省',
                        code: 210000,
                        value: '@natural(0,3000)'
                    },
                    {
                        name: '海南省',
                        code: 460000,
                        value: '@natural(0,3000)'
                    },
                    {
                        name: '内蒙古自治区',
                        code: 150000,
                        value: '@natural(0,3000)'
                    },
                    {
                        name: '天津市',
                        code: 120000,
                        value: '@natural(0,3000)'
                    },
                    {
                        name: '新疆维吾尔自治区',
                        code: 650000,
                        value: '@natural(0,3000)'
                    },
                    {
                        name: '上海市',
                        code: 310000,
                        value: '@natural(0,3000)'
                    },
                    {
                        name: '陕西省',
                        code: 610000,
                        value: '@natural(0,3000)'
                    },
                    {
                        name: '甘肃省',
                        code: 620000,
                        value: '@natural(0,3000)'
                    },
                    {
                        name: '安徽省',
                        code: 340000,
                        value: '@natural(0,3000)'
                    },
                    {
                        name: '香港特别行政区',
                        code: 810000,
                        value: '@natural(0,3000)'
                    },
                    {
                        name: '广东省',
                        code: 440000,
                        value: '@natural(0,3000)'
                    },
                    {
                        name: '河南省',
                        code: 410000,
                        value: '@natural(0,3000)'
                    },
                    {
                        name: '湖南省',
                        code: 430000,
                        value: '@natural(0,3000)'
                    },
                    {
                        name: '江西省',
                        code: 360000,
                        value: '@natural(0,3000)'
                    },
                    {
                        name: '四川省',
                        code: 510000,
                        value: '@natural(0,3000)'
                    },
                    {
                        name: '广西壮族自治区',
                        code: 450000,
                        value: '@natural(0,3000)'
                    },
                    {
                        name: '江苏省',
                        code: 320000,
                        value: '@natural(0,3000)'
                    },
                    {
                        name: '澳门特别行政区',
                        code: 820000,
                        value:'@natural(0,3000)'
                    },
                    {
                        name: '浙江省',
                        code: 330000,
                        value: '@natural(0,3000)'
                    },
                    {
                        name: '山东省',
                        code: 370000,
                        value: '@natural(0,3000)'
                    },
                    {
                        name: '青海省',
                        code: 630000,
                        value: '@natural(0,3000)'
                    },
                    {
                        name: '重庆市',
                        code: 500000,
                        value: '@natural(0,3000)'
                    },
                    {
                        name: '福建省',
                        code: 350000,
                        value:'@natural(0,3000)',
                    },
                    {
                        name: '湖北省',
                        code: 420000,
                        value:'@natural(0,3000)'},
                    {
                        name: '西藏自治区',
                        code: 540000,
                        value:'@natural(0,3000)'},
                    {
                        name: '台湾省',
                        code: 710000,
                        value:'@natural(0,3000)'}
                ],
                "time_distr":[
                    {time:'0',value:'@natural(0,3000)'}, {time:'1',value:'@natural(0,3000)'},{time:'2',value:'@natural(0,3000)'},{time:'3',value:'@natural(0,3000)'},{time:'4',value:'@natural(0,3000)'},{time:'5',value:'@natural(0,3000)'},{time:'6',value:'@natural(0,3000)'},{time:'7',value:'@natural(0,3000)'},
                    {time:'8',value:'@natural(0,3000)'},{time:'9',value:'@natural(0,3000)'},{time:'10',value:'@natural(0,3000)'},{time:'11',value:'@natural(0,3000)'},{time:'12',value:'@natural(0,3000)'},{time:'13',value:'@natural(0,3000)'}, {time:'14',value:'@natural(0,3000)'},{time:'15',value:'@natural(0,3000)'},
                    {time:'16',value:'@natural(0,3000)'},{time:'17',value:'@natural(0,3000)'},{time:'18',value:'@natural(0,3000)'},{time:'19',value:'@natural(0,3000)'},{time:'20',value:'@natural(0,3000)'},
                    {time:'21',value:'@natural(0,3000)'},{time:'22',value:'@natural(0,3000)'},{time:'23',value:'@natural(0,3000)'}
                ],
            }
        ]
    }));
    setTimeout(() => {
        res.json(jsonResponse);
    }, random);
});

apiRoutes.post('/getOneShort', function(req, res) {
    let jsonResponse={
        status: 200,
        msg: '查询成功',
    };
    Object.assign(jsonResponse,Mock.mock({
            "data":/[a-z][A-Z][0-9][a-z][0-9][A-Z]/,}
    ));

    setTimeout(() => {
        res.json(jsonResponse);
    }, random);
});


module.exports = apiRoutes;
