# REEVOO短链接项目开发文档

<!-- START doctoc generated TOC please keep comment here to allow auto-update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [功能性需求](#%E5%8A%9F%E8%83%BD%E6%80%A7%E9%9C%80%E6%B1%82)
  - [短链创建](#%E7%9F%AD%E9%93%BE%E5%88%9B%E5%BB%BA)
  - [管理链接](#%E7%AE%A1%E7%90%86%E9%93%BE%E6%8E%A5)
  - [统计图表](#%E7%BB%9F%E8%AE%A1%E5%9B%BE%E8%A1%A8)
  - [运营管理](#%E8%BF%90%E8%90%A5%E7%AE%A1%E7%90%86)
  - [网站细节](#%E7%BD%91%E7%AB%99%E7%BB%86%E8%8A%82)
- [非功能需求](#%E9%9D%9E%E5%8A%9F%E8%83%BD%E9%9C%80%E6%B1%82)
- [Safety](#safety)
  - [Accessibility](#accessibility)
  - [Scalability](#scalability)
  - [Availability](#availability)
- [Security](#security)
- [项目架构与设计](#%E9%A1%B9%E7%9B%AE%E6%9E%B6%E6%9E%84%E4%B8%8E%E8%AE%BE%E8%AE%A1)
  - [微服务](#%E5%BE%AE%E6%9C%8D%E5%8A%A1)
  - [前端打包优化](#%E5%89%8D%E7%AB%AF%E6%89%93%E5%8C%85%E4%BC%98%E5%8C%96)
  - [可观测性](#%E5%8F%AF%E8%A7%82%E6%B5%8B%E6%80%A7)
    - [cAdvisor+Prometheus+Grafana](#cadvisorprometheusgrafana)
    - [Elasticsearch+Fluentd+Kibana](#elasticsearchfluentdkibana)
- [测试](#%E6%B5%8B%E8%AF%95)
  - [v1.0 origin](#v10-origin)
  - [v1.1 async+log](#v11-asynclog)
  - [v2.0 microService](#v20-microservice)
  - [v2.1 kafka](#v21-kafka)

<!-- END doctoc generated TOC please keep comment here to allow auto-update -->


## 功能性需求

​		**REEVOO短链接**是一款短链接生成及统计工具。「REEVOO短链接」帮助用户快捷的将长链接转化为短链接，支持一对一生成和多对一生成两种模式，并支持批量生成。同时提供管理链接，统计图表的功能，针对管理员提供运营管理功能。

### 短链创建

- 可批量生成短链接
- 支持多对一生成（随机跳转），一对一生成
- 支持以 http:// 和 https:// 开头的网址，并自动检测网址格式
- 短链接支持生成二维码
- 支持批量导入长链接，以换行符或空格切分长链接
- 用户可以直接访问生成的短链接，我们的服务将直接跳转到相应长链接



### 管理链接

- 显示所有该用户创建的短链接

- 展示短链接的访问量和闲时

- 支持禁用短链接的功能

- 一对一生成的短链接可随时修改短链的跳转地址

- 支持网页预览，显示网页标题和页面缩略图 

- 分页从后端拉取数据，避免数据量过大导致等待时间过久

- 支持一键复制短链接网址，方便分享

  

### 统计图表

- 概览
  - 显示各个短链接近24小时的访问量趋势图，了解访问的高峰在哪个时段
  - 实时统计最近被访问的五个短链接的信息，包括原长链接，访问者IP，来源，访问时间
  - 可关闭指定短链接折线图

- 时段
  - 短链接访问分时段统计
  - 可任意选择时间区间
  - 可关闭指定短链接折线图
- 地区
  - 显示短链接访问地区分布图
  - 以颜色深浅区分访问密集程度，颜色越深，则该地区访问量越大
  - 支持筛选指定短链接

### 运营管理

- 限管理员用户访问
- 短链接管理
  - 显示所有后台存储的短链接
  - 显示短链接，访问量，创建用户，创建日期，禁用/启用等详细信息
  - 折叠显示短链接对应跳转的长链接
  - 分页从后端拉取数据，避免数据量过大导致等待时间过久
  - 支持禁用短链接，启用被禁用的短链接的功能
- 用户管理
  - 显示所有后台存储用户信息
  - 显示用户名，访问次数，用户类型，禁用/解除等详细信息
  - 支持排序、筛选、搜索等功能
  - 支持禁用普通用户、解禁被禁用用户的功能
- 统计
  - 显示用户数，总短链接数，总访问量，最受欢迎短链接等信息
  - 显示访问量前十的短链接信息，并绘制成可视化的环状图

### 网站细节

- 异常页面显示
  - 404页面绘制精美，实现15秒后自动跳回
  - 未创建短链接网址的跳转页面绘制精美（如果跳转网址为一个还未创建的短链接，则进入该页面
  - 禁用短链接的跳转页面绘制精美（如果跳转短链接被禁用，则进入该页面
- 全部页面支持响应式
- 自定义网站主题色
- 加入骨架屏和自制的加载动画



## 非功能需求

非功能性需求分成"safety"和"security"两部分。"safety"指保证系统有稳定可靠的状态，"security"包括认证(Authentication)和授权(Authorization)。

## Safety

### Accessibility

- 支持多种交互方式：鼠标、键盘
- 多平台：完成网页端，由于网页端设计成了可响应式，可较方便的转换成手机端

### Scalability

- 横向扩展 ： 后端做成微服务，使用了负载均衡器（traefik) ，提升性能
- 纵向扩展 ： 可增加资源

### Availability

- 代码测试覆盖率：100%

## Security

"security"包括认证（Authentication）和授权（Authorization）。本项目采取JWT实现。

传统的认证方式随着认证用户的增多，服务端的开销会明显增大，并且传统的认证方式不适用于分布式系统。于是我们采用了JWT，通过验证签名，使token的验证直接在本地完成，不需要连接认证服务器；并在payload中定义用户的信息，实现token和用户信息的绑定。

除此之外我们实现了JWT的续签和过期处理，用户的一次登录的有效时间为十分钟；若在该次登陆过期后的五分钟内有进行操作，则会自动续签，刷新登录有效时间；如没有进行操作将会退出登录。

## 项目架构与设计

### 微服务

后端将短链接重定向至长链接的API拆分为两个微服务，分别是重定向和日志服务。我们使用Go以及原生net/http库实现上述微服务，具有极高的并发性能和超小的资源占用。两个微服务之间通过kafka进行消息队列沟通，实现日志服务的并发削峰并进一步增强重定向服务的并发性能。

同时，我们在重定向服务中加入了少量的内存缓存，轻巧有效地加快了读取速度。

### 前端打包优化

由于前端页面资源丰富，js和css体积都较大，首页加载时间相当长。为加快首屏加载速度并增强前端页面鲁棒性，我们在React Router中使用懒加载技术引入包，从而实现代码分割，降低了首页所需js包大小。同时我们通过babel和动态注入技术，缩小Ant Design包体积，减少不必要的模块引入。

最后，我们使用React Rewired来去除js包中的源码映射，进一步减少整体打包体积，加快编译和渲染速度。


### 可观测性

#### cAdvisor+Prometheus+Grafana

由于需要监控服务器上的多个容器状态（CPU，内存，网络请求等），所以我们使用cAdvisor监控容器,将数据暴露给Prometheus,并通过Grafana绘制成图,方便横向对比不同容器的CPU占用量等信息。

同时，我们在SpringBoot和Go的服务中都暴露了Prometheus的接口，从而可以在Grafana中了解到更加细粒度的统计数据。


#### Elasticsearch+Fluentd+Kibana

多个容器将产生大量不同的日志,并存储在不同地方,难以统一查询与分析 。于是我们使用fluentd工具采集并汇总、解析日志。Fluentd可以过滤不需要的日志,将不同日志标记、分类,统一汇总到Elasticsearch进行存储。最后再通过Kibana可视化呈现。

为更好的使用fluentd解析日志,我们将容器的日志统一输出为json格式。

## 测试

我们对优化过程中的各个版本，针对该项目的主功能——短链接跳转进行了性能测试。考虑到缓存的存在，我们对每个版本进行了两种测试：每秒100并发持续发送的对同一个短链接的访问，和每秒100并发持续发送的每次对一千个短链接中的随机一个的访问。

我们运用jmeter+wrk工具向服务器发送请求并监测响应时间，用cAdvisor+Prometheus+Grafana监控容器状态。

### v1.0 origin

完成所有功能性需求和安全需求，且进行了数据库优化的版本。

### v1.1 async+log

在v1.0的基础上将spring的各函数异步处理，并且加上了如前面提到的规范日志打印

### v2.0 microService

将主功能从spring中独立出来，变成两个用go编写的微服务：redirectService, visitlogService。同一份跳转请求被traefik分别发送给二者，前者查询到目标地址后迅速返回给用户，后者负责在数据库中记录本次访问的数据，提高响应速度。

### v2.1 kafka

在v2.0的基础上，跳转请求不再被发给visitlogService，而是通过消息队列kafka，由redirectService处理请求后将相关数据异步发送一个消息到broker，visitlogService再从broker中获取数据写入数据库。这样避免了两者重复查询数据库，提高效率。
