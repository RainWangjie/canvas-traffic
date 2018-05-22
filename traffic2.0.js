import { isBrowserOk } from './util';
import Road from './component/Road';
import Car, { addRoundedRect, defaultCar } from './component/Car';
import Intersections from './component/Intersections';
import color from './color';
const canvas = document.getElementsByTagName('canvas')[0];
const ctx = canvas.getContext('2d');

addRoundedRect(ctx);

// 检测canvas支持虚线 dash
if (!ctx.setLineDash) {
  ctx.setLineDash = function() {
    console.log('browser not supported for dashed lines');
  };
}

// 设置canvas宽高
let w = document.documentElement.clientWidth,
  h = document.documentElement.clientHeight;
// canvas.style.transformOrigin = '0 0';
// canvas.style.transform = 'scale(0.5,0.5)';
canvas.width = w;
canvas.height = h;

let roads = [],
  intersections_arr = [],
  cars = [];

const roadConfig = [
  {
    x: 0,
    y: h / 2 - 20,
    width: w,
    height: 40,
    direction: 'h',
    num: 1
  },
  {
    x: w / 2 - 20,
    y: 0,
    width: 40,
    height: h,
    direction: 'v',
    num: 1
  }
  // {
  //   x: 0,
  //   y: 200,
  //   width: w,
  //   height: 40,
  //   direction: 'h'
  // },
  // {
  //   x: 1050,
  //   y: h / 2 - 40,
  //   width: 40,
  //   height: h - (h / 2 - 40),
  //   direction: 'v'
  // },
  // {
  //   x: 450,
  //   y: 200,
  //   width: 40,
  //   height: h - 200,
  //   direction: 'v'
  // },
  // {
  //   x: 120,
  //   y: 0,
  //   width: 80,
  //   height: h,
  //   direction: 'v'
  // },
  // {
  //   x: 0,
  //   y: h / 2 + 240,
  //   width: w,
  //   height: 40,
  //   direction: 'h'
  // }
];

// 定时变换信号灯
let left_green = false;

function left_greenc() {
  left_green = !left_green;
}

setInterval(() => {
  left_greenc();
}, 3000);

// 初始化
function init() {
  //Launch Cars
  cars = [];
  roads = [];
  intersections_arr = [];

  const roadTotal = roadConfig.length;

  // 生成car
  const car_no = 2;
  for (let i = 0; i < car_no; i++) {
    let car = new Car();
    let randomRoad = roadConfig[~~Math.random() * roadTotal];
    const { direction, x, y, width, height } = randomRoad;

    if (direction === 'h') {
      car.x = x + width + defaultCar.l;
      car.y = y + height / 2 - 17;
      car.d = 'w';
    } else {
      car.x = x + width / 2 + 17;
      car.y = y + height + defaultCar.l;
      car.d = 'n';
    }

    let color_rand = Math.random();
    let color = '';
    if (color_rand < 0.2) {
      color = '#fff';
    } else if (color_rand > 0.2 && color_rand < 0.4) {
      color = '#E22322';
    } else if (color_rand > 0.4 && color_rand < 0.6) {
      color = '#F9D111';
    } else if (color_rand > 0.6 && color_rand < 0.8) {
      color = '#367C94';
    } else if (color_rand > 0.8 && color_rand < 1) {
      color = '#222';
    }
    car.color = color;
    cars.push(car);
  }

  // 生成road
  roads = roadConfig.map(config => new Road(config));

  // 生成路口
  intersections_arr = Intersections(roadConfig);
}

// 绘制场景
function drawscene() {
  // 清除画布
  ctx.clearRect(0, 0, w, h);

  // 底图
  ctx.fillStyle = '#4DBB4C';
  ctx.fillRect(0, 0, w, h);

  // 道路
  roads.forEach(road => {
    road.draw(ctx);
  });

  // 路口
  intersections_arr.forEach(intersection => {
    intersection.setTraffic(left_green);
    intersection.draw(ctx);
  });

  // 车辆
  drive_cars();
}

// 移动车辆
function drive_cars() {
  const carCount = cars.length;
  for (var i = 0; i < carCount; i++) {
    var c = cars[i];
    c.s = 5;
    if (c.d == 'e') {
      for (var l = 0; l < carCount; l++) {
        var c2 = cars[l];
        var dc = c.check_distance(c2, 'x');
        if (dc == true) {
          // 车辆停止
          c.s = 0;
          for (var k = 0; k < intersections_arr.length; k++) {
            var inter = intersections_arr[k];

            if (inter.y + inter.height > c.y && inter.y < c.y) {
              // 两车道，车辆放置到较少车辆车道
              if (inter.height === 80) {
                var lc = 0;
                var ld = 0;
                for (var v = 0; v < carCount; v++) {
                  if (
                    cars[v].y == inter.y + 44 &&
                    cars[v].x < inter.x &&
                    cars[v].s == 0
                  ) {
                    lc++;
                  }
                  if (
                    cars[v].y == c.y &&
                    cars[v].x < inter.x &&
                    cars[v].s == 0
                  ) {
                    ld++;
                  }
                }
                if (ld - 2 > lc) {
                  c.y = inter.y + 44;
                }
              }
            }
          }
        } else {
          // 车辆继续前进
          var counter = 0;
          for (var k = 0; k < intersections_arr.length; k++) {
            var inter = intersections_arr[k];
            if (c.check_inter(inter, 'x')) {
              counter++;
              if (inter.left == color.traffic.red) {
                //red
                c.s = 0;
              } else {
                //green
                c.s = defaultCar.s;
                //改变方向
                c.gen_dir(inter);
              }
            }
          }
          if (counter == 0) {
            //car past intersection reset random generator
            c.dd = false;
          }
        }
      }
      // 车辆已驶出屏幕，重置位置
      if (c.x + 26 >= canvas.width) {
        //reposition car
        c.x = -1 * defaultCar.l;
      }
      c.x += c.s;
    } else if (c.d == 'n') {
      for (var l = 0; l < cars.length; l++) {
        var c2 = cars[l];
        var dc = c.check_distance(c2, '-y');
        if (dc == true) {
          c.s = 0;
          for (var k = 0; k < intersections_arr.length; k++) {
            var inter = intersections_arr[k];
            if (inter.x + inter.width > c.x && inter.x < c.x) {
              //this is road
              if (inter.width == 80) {
                var lc = 0;
                var ld = 0;
                for (var v = 0; v < cars.length; v++) {
                  if (
                    cars[v].x == inter.x + 55 &&
                    cars[v].y < inter.y &&
                    cars[v].s == 0
                  ) {
                    lc++;
                  }
                  if (
                    cars[v].x == c.x &&
                    cars[v].y < inter.y &&
                    cars[v].s == 0
                  ) {
                    ld++;
                  }
                }
                if (ld - 2 > lc) {
                  c.x = inter.x + 55;
                }
              }
            }
          }
        } else {
          var counter = 0;
          for (var k = 0; k < intersections_arr.length; k++) {
            var inter = intersections_arr[k];
            if (c.check_inter(inter, '-y')) {
              counter++;
              if (inter.bottom == color.traffic.red) {
                //red
                c.s = 0;
              } else {
                //green
                c.s = defaultCar.s;
                //figure dir
                c.gen_dir(inter);
              }
            }
          }
          if (counter == 0) {
            //car past intersection reset random generator
            c.dd = false;
          }
        }
      }
      if (c.y + 26 <= 0) {
        //reposition car
        c.y = h + defaultCar.l;
      }
      c.y -= c.s;
    } else if (c.d == 's') {
      for (var l = 0; l < cars.length; l++) {
        var c2 = cars[l];
        var dc = c.check_distance(c2, 'y');
        if (dc == true) {
          c.s = 0;
          for (var k = 0; k < intersections_arr.length; k++) {
            var inter = intersections_arr[k];
            if (inter.x + inter.width > c.x && inter.x < c.x) {
              //this is road
              if (inter.width == 80) {
                var lc = 0;
                var ld = 0;
                for (var v = 0; v < cars.length; v++) {
                  if (
                    cars[v].x == inter.x + 36 &&
                    cars[v].y < inter.y &&
                    cars[v].s == 0
                  ) {
                    lc++;
                  }
                  if (
                    cars[v].x == c.x &&
                    cars[v].y < inter.y &&
                    cars[v].s == 0
                  ) {
                    ld++;
                  }
                }
                if (ld - 1 > lc) {
                  c.x = inter.x + 36;
                }
              }
            }
          }
        } else {
          var counter = 0;
          for (var k = 0; k < intersections_arr.length; k++) {
            var inter = intersections_arr[k];
            if (c.check_inter(inter, 'y')) {
              counter++;
              if (inter.top == color.traffic.red) {
                //red
                c.s = 0;
              } else {
                //green
                c.s = defaultCar.s;
                //figure dir
                c.gen_dir(inter);
              }
            }
          }
          if (counter == 0) {
            //car past intersection reset random generator
            c.dd = false;
          }
        }
      }
      if (c.y - 26 >= h) {
        //reposition car
        c.y = -1 * defaultCar.l;
      }
      c.y += c.s;
    } else if (c.d == 'w') {
      for (var l = 0; l < cars.length; l++) {
        var c2 = cars[l];
        var dc = c.check_distance(c2, '-x');
        if (dc == true) {
          c.s = 0;
          for (var k = 0; k < intersections_arr.length; k++) {
            var inter = intersections_arr[k];
            if (inter.y + inter.height > c.y && inter.y < c.y) {
              //this is road
              if (inter.height == 80) {
                var lc = 0;
                var ld = 0;
                for (var v = 0; v < cars.length; v++) {
                  if (
                    cars[v].y == inter.y + 22 &&
                    cars[v].x > inter.x &&
                    cars[v].s == 0
                  ) {
                    lc++;
                  }
                  if (
                    cars[v].y == c.y &&
                    cars[v].x > inter.x &&
                    cars[v].s == 0
                  ) {
                    ld++;
                  }
                }
                if (ld - 2 > lc) {
                  c.y = inter.y + 22;
                }
              }
            }
          }
        } else {
          var counter = 0;
          for (var k = 0; k < intersections_arr.length; k++) {
            var inter = intersections_arr[k];
            if (c.check_inter(inter, '-x')) {
              counter++;
              if (inter.right == color.traffic.red) {
                //red
                c.s = 0;
              } else {
                //green
                c.s = defaultCar.s;
                //figure dir
                c.gen_dir(inter);
              }
            }
          }
          if (counter == 0) {
            //car past intersection reset random generator
            c.dd = false;
          }
        }
      }
      // 车辆离开视图
      if (c.x + 26 <= 0) {
        //reposition car
        c.x = w + defaultCar.l;
      }
      c.x -= c.s;
    }
    c.draw(ctx);
  }
}

// 控制车辆开始运动
let isPlay = false,
  btnEl = document.getElementById('play');

btnEl.onclick = () => {
  isPlay = !isPlay;
  btnEl.innerHTML = isPlay ? 'pause' : 'play';
  isPlay && animloop();
};

// rAF方案保证渲染能力
function animloop() {
  drawscene();
  if (isPlay) {
    requestAnimFrame(animloop);
  }
}

init();
// drawscene();
animloop();
