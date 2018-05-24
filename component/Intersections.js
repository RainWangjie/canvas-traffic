import color from '../color';

const Intersections = roads => {
  const roadNum = roads.length,
    intersections_arr = [];
  for (let i = 0; i < roadNum - 1; i++) {
    for (var j = i + 1; j < roadNum; j++) {
      let r1 = roads[i],
        r2 = roads[j];

      // road 方向相同
      if (r1.direction === r2.direction) continue;

      // 交换road顺序，横向r1，纵向r2
      if (r1.direction === 'v' && r2.direction === 'h') {
        [r1, r2] = [r2, r1];
      }

      // r1,r2未交叉
      if (r1.x + r1.width < r2.x || r1.x > r2.x) {
        continue;
      }
      if (r2.y + r2.height < r1.y || r2.y > r1.y) {
        continue;
      }

      // r1，r2存在尽头相交
      let roadtop = true;
      let roadbottom = true;
      let roadleft = true;
      let roadright = true;

      if (r1.y == r2.y) {
        roadtop = false;
      }
      if (r1.x == r2.x) {
        roadleft = false;
      }
      if (r1.x + r1.width == r2.x + r2.width) {
        roadright = false;
      }
      if (r1.y + r1.height == r2.y + r2.height) {
        roadbottom = false;
      }

      intersections_arr.push(
        new Intersection({
          x: r2.x,
          y: r1.y,
          lightNumH: r1.num,
          lightNumV: r2.num,
          width: r2.width,
          height: r1.height,
          roadtop,
          roadleft,
          roadright,
          roadbottom
        })
      );
    }
  }
  return intersections_arr;
};

export const defaultInter = {
  x: 0,
  y: 0,
  lightNumH: 0,
  lightNumV: 0,
  width: 0,
  height: 0,
  roadtop: false,
  roadleft: false,
  roadright: false,
  roadbottom: false
};

// 信号灯、斑马线
class Intersection {
  constructor(options) {
    for (let key in defaultInter) {
      this[key] = options[key] || defaultInter[key];
    }

    this.setTraffic();
  }

  setTraffic(left_green = true) {
    if (left_green) {
      this.right = color.traffic.green;
      this.left = color.traffic.green;
      this.top = color.traffic.red;
      this.bottom = color.traffic.red;
    } else {
      this.right = color.traffic.red;
      this.left = color.traffic.red;
      this.top = color.traffic.green;
      this.bottom = color.traffic.green;
    }
  }

  // 重绘路口
  drawRoad(ctx, x, y, w, h) {
    ctx.fillStyle = color.road;
    ctx.fillRect(x, y, w, h);
  }

  // 斑马线
  drawZebraCross(ctx, x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.setLineDash([1, 5]);
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.closePath();
    ctx.strokeStyle = '#A09383';
    ctx.lineWidth = 10;
    ctx.fill();
    ctx.stroke();
  }

  // 停止线
  drawStopLine(road, ctx, x, y, w, h) {
    ctx.fillStyle = color.solidLine;
    ctx.fillRect(x, y, w, h);

    const { dir, num } = road;
    if (num === 1) return;

    let space = Math.max(w, h) / num;

    // 虚线上叠加实线分割线
    for (let i = 1; i < num; i++) {
      if (dir === 'left') {
        ctx.fillRect(x - 30, y + space * i - 2, 30, 2);
      }
      if (dir === 'right') {
        ctx.fillRect(x, y + space * i - 2, 30, 2);
      }
      if (dir === 'top') {
        ctx.fillRect(x + space * i - 2, y - 30, 2, 30);
      }
      if (dir === 'bottom') {
        ctx.fillRect(x + space * i - 2, y, 2, 30);
      }
      ctx.fill();
      ctx.restore();
    }
  }

  // 信号灯
  drawTrafficLight(light, ctx, x, y, w, h) {
    let shadow_color = light.color;
    ctx.save();

    let diff = Math.max(w, h) / light.num / 2;
    for (let i = 0; i < light.num; i++) {
      ctx.fillStyle = shadow_color;
      ctx.shadowColor = shadow_color;
      if (light.dir === 'left') {
        ctx.fillRect(x - 3, y + diff * (2 * i + 1), 4, 4);
      }
      if (light.dir === 'right') {
        ctx.fillRect(x + 1, y + h - diff * (2 * i + 1), 4, 4);
      }
      if (light.dir === 'top') {
        ctx.fillRect(x + diff * (2 * i + 1), y - 3, 4, 4);
      }
      if (light.dir === 'bottom') {
        ctx.fillRect(x + w - diff * (2 * i + 1), y + 1, 4, 4);
      }
      ctx.fill();
      ctx.restore();
    }

    // 信号灯杆
    ctx.fillStyle = '#ddd';
    ctx.fillRect(x, y, w, h);
  }

  draw(ctx) {
    // 覆盖路口
    ctx.fillStyle = color.road;
    ctx.fillRect(this.x, this.y, this.width, this.height);

    if (this.roadleft == true) {
      this.drawRoad(ctx, this.x - 20, this.y, 20, this.height);
      this.drawZebraCross(
        ctx,
        this.x - 12,
        this.y,
        this.x - 12,
        this.y + this.height
      );
      this.drawStopLine(
        { dir: 'left', num: this.lightNumH },
        ctx,
        this.x - 22,
        this.height / 2 + this.y - 1,
        2,
        this.height / 2 + 1
      );
      this.drawTrafficLight(
        { dir: 'left', num: this.lightNumH, color: this.left },
        ctx,
        this.x - 3,
        this.y + this.height - this.height / 2 + 3,
        1,
        this.height / 2
      );
    }
    if (this.roadright == true) {
      this.drawRoad(ctx, this.x + this.width, this.y, 22, this.height);
      this.drawZebraCross(
        ctx,
        this.x + this.width + 12,
        this.y,
        this.x + this.width + 12,
        this.y + this.height
      );
      this.drawStopLine(
        { dir: 'right', num: this.lightNumH },
        ctx,
        this.x + this.width + 22,
        this.y,
        2,
        this.height / 2 + 1
      );
      this.drawTrafficLight(
        { dir: 'right', num: this.lightNumH, color: this.right },
        ctx,
        this.x + this.width + 2,
        this.y - 3,
        1,
        this.height / 2
      );
    }
    if (this.roadtop == true) {
      this.drawRoad(ctx, this.x, this.y - 20, this.width, 20);
      this.drawZebraCross(
        ctx,
        this.x,
        this.y - 12,
        this.x + this.width,
        this.y - 12
      );
      this.drawStopLine(
        { dir: 'top', num: this.lightNumV },
        ctx,
        this.x,
        this.y - 21,
        this.width / 2 + 1,
        2
      );
      this.drawTrafficLight(
        { dir: 'top', num: this.lightNumV, color: this.top },
        ctx,
        this.x - 3,
        this.y - 2,
        this.width / 2,
        1
      );
    }
    if (this.roadbottom == true) {
      this.drawRoad(ctx, this.x, this.y + this.height, this.width, 20);
      this.drawZebraCross(
        ctx,
        this.x,
        this.y + this.height + 12,
        this.x + this.width,
        this.y + this.height + 12
      );
      this.drawStopLine(
        { dir: 'bottom', num: this.lightNumV },
        ctx,
        this.x + this.width - this.width / 2 - 1,
        this.y + this.height + 20,
        this.width / 2 + 1,
        2
      );
      this.drawTrafficLight(
        { dir: 'bottom', num: this.lightNumV, color: this.bottom },
        ctx,
        this.x + this.width / 2 + 3,
        this.y + this.height + 2,
        this.width / 2,
        1
      );
    }
  }
}

export default Intersections;
