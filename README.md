# 基于 canvas 的交通运行图

 源码来源[codepen](https://codepen.io/motorlatitude/pen/grdtj)

## 绘制对象

* 道路（roads）`Road.js`
  * 主路（road）
  * 路沿（roadEdge）
  * 实线（solidLine）
  * 虚线（dashLine）
* 路口（intersections）`Intersections.js`
  * 斑马线（zebraCross）
  * 信号灯（trafficLight）
  * 停止线（stopLine）
* 车（cars）`Car.js`

## 绘制流程

 覆盖式 draw

### Road

1.  roadEdge
2.  road
3.  solidLine(双向车道分割线，单条)
4.  dashLine（同向道路分割线，多条）

### Intersections

1.  road 颜色覆盖路口
2.  road 颜色覆盖路口内 20px
3.  zebraCross
4.  stopLine（ 多车道为 T 字形）
5.  trafficLight(白色杆+🚥)

### Car

1.  车身
2.  车窗
3.  后视镜
