# 基于 canvas 的交通运行图

 源码来源[codepen](https://codepen.io/motorlatitude/pen/grdtj)

## 绘制对象与流程

 覆盖式 draw

* 道路（roads）`Road.js`
  * 主路（road）
  * 路沿（roadEdge）
  * 实线（solidLine）(双向车道分割线，单条)
  * 虚线（dashLine）（同向道路分割线，多条）

![Road](/images/Road.png)

* 路口（intersections）`Intersections.js`

  * 道路（road）（覆盖路口交叉部分）
  * 斑马线（zebraCross）
  * 停止线（stopLine）
  * 信号灯（trafficLight）

![intersections](/images/intersections.png)

* 车（cars）`Car.js`
  * 车身
  * 车窗
  * 后视镜

![Car](/images/Car.png)

## 车辆移动过程

![canvas_traffic](/images/canvas_traffic.png)

### 附：

```
.
├── README.md
├── color.js
├── component
│   ├── Car.js              // Car类
│   ├── Intersections.js    // Intersections类
│   └── Road.js             // Road类
├── images
│   ├── Car.png
│   ├── Road.png
│   ├── canvas_traffic.png
│   └── intersections.png
├── package.json             // parcel做脚手架
├── traffic.css
├── traffic.html             // 原作者代码
├── traffic.js               // 原作者代码
├── traffic2.0.html
├── traffic2.0.js            // 入口JS
└── util.js
```

原作者代码在单一 JS 内，可读性较低，`if`、`for`嵌套深，已完成部分优化

转弯执行规则暂未分析，其余代码均已添加注释与模块化。
