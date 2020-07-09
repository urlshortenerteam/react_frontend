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
                            "short":/[a-z][A-Z][0-9][a-z][0-9][A-Z]/,
                            "long|1":[
                                "https://www.baidu.com",
                                "https://www.sjtu.edu.cn",
                                "https://www.i.sjtu.edu.cn",
                                "https://www.jd.com"
                            ],
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

apiRoutes.post('/getShort', function(req, res) {

    let n=req.body.length;
    setTimeout(() => {
        res.json({
            status: 200,
            msg: '查询成功',
            data: Mock.mock({
                    "short|5":[
                        {
                            "short":/[a-z][A-Z][0-9][a-z][0-9][A-Z]/,
                        }
                    ]
                }
            )
        });
    }, random);
});

apiRoutes.post('/getOneShort', function(req, res) {
    setTimeout(() => {
        res.json({
            status: 200,
            msg: '查询成功',
            data: Mock.mock({
                "short":/[a-z][A-Z][0-9][a-z][0-9][A-Z]/,
                }
            )
        });
    }, random);
});


module.exports = apiRoutes;
