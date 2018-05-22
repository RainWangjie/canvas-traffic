import color from '../color';

export const defaultRoad = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  direction: 'h',
  num: 0
};

class Road {
  constructor(config) {
    for (let key in defaultRoad) {
      this[key] = config[key] || defaultRoad[key];
    }
  }

  drawRoadEdge(ctx, x, y, w, h) {
    ctx.fillStyle = color.roadEdge;
    ctx.fillRect(x, y, w, h);
  }

  drawRoad(ctx, x, y, w, h) {
    ctx.fillStyle = color.road;
    ctx.fillRect(x, y, w, h);
  }

  drawSolidLine(ctx, x, y, w, h) {
    ctx.fillStyle = color.solidLine;
    ctx.fillRect(x, y, w, h);
  }

  drawDashLine(ctx, x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.setLineDash([2, 5]);
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.closePath();
    ctx.strokeStyle = color.dashLine;
    ctx.lineWidth = 1;
    ctx.fill();
    ctx.stroke();
  }

  draw(ctx) {
    const { x, y, width: w, height: h, direction, num } = this;

    // roadEdge
    if (direction === 'h') {
      this.drawRoadEdge(ctx, x, y - 10, w, h + 20);
    } else {
      this.drawRoadEdge(ctx, x - 10, y, w + 20, h);
    }

    // road
    this.drawRoad(ctx, x, y, w, h);

    // solidRoad
    if (direction === 'h') {
      this.drawSolidLine(ctx, x, y + h / 2 - 1, w, 2);
    } else {
      this.drawSolidLine(ctx, x + w / 2 - 1, y, 2, h);
    }

    // dashRoad
    if (num > 1) {
      // 车道宽
      let space = Math.min(w, h) / num / 2;
      for (let i = 1; i < num; i++) {
        let space_1 = space * i - 1,
          space_2 = space * (num * 2 - i) - 1;
        if (direction === 'h') {
          this.drawDashLine(ctx, x, y + space_1, w, y + space_1);
          this.drawDashLine(ctx, x, y + space_2, w, y + space_2);
        } else if (direction === 'v') {
          this.drawDashLine(ctx, x + space_1, y, x + space_1, h);
          this.drawDashLine(ctx, x + space_2, y, x + space_2, h);
        }
      }
    }
  }
}

export default Road;
