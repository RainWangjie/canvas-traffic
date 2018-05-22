export const addRoundedRect = ctx => {
  Object.getPrototypeOf(ctx).rounded_rect = function(x, y, w, h, r) {
    if (typeof r === 'undefined') {
      r = 2;
    }
    this.beginPath();
    this.moveTo(x + r, y);
    this.lineTo(x + w - r, y);
    this.quadraticCurveTo(x + w, y, x + w, y + r);
    this.lineTo(x + w, y + h - r);
    this.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    this.lineTo(x + r, y + h);
    this.quadraticCurveTo(x, y + h, x, y + h - r);
    this.lineTo(x, y + r);
    this.quadraticCurveTo(x, y, x + r, y);
    this.closePath();
    this.fill();
  };
};

export const defaultCar = {
  x: 0,
  y: 0,
  s: 5,
  l: 25, //length of vehicle
  d: 'e',
  dd: false,
  color: '#F5D600'
};

class Car {
  constructor() {
    for (let key in defaultCar) {
      this[key] = defaultCar[key];
    }
  }
  // 俩车距离确认
  check_distance(car, axis) {
    let c1 = this,
      c2 = car;
    if (axis == 'x') {
      var dist = c2.x - c1.x;
      if (dist > 0 && dist <= c1.l + 15) {
        if (c2.w > 15 && c1.w > 15 && c1.y == c2.y) {
          //only check for collison on cars on the same axis
          return true;
        }
      }
    } else if (axis == '-x') {
      var dist = c1.x - c2.x;
      if (dist > 0 && dist <= c1.l + 15) {
        if (c2.w > 15 && c1.w > 15 && c1.y == c2.y) {
          //only check for collison on cars on the same axis
          return true;
        }
      }
    } else if (axis == '-y') {
      var disty = c1.y - c2.y;
      if (disty > 0 && disty <= c1.l + 15) {
        if (c2.w < 25 && c1.w < 25 && c1.x == c2.x) {
          //only check for collison on cars on the same axis
          return true;
        }
      }
    } else if (axis == 'y') {
      var disty = c2.y - c1.y;
      if (disty > 0 && disty <= c1.l + 15) {
        if (c2.w < 25 && c1.w < 25 && c1.x == c2.x) {
          //only check for collison on cars on the same axis
          return true;
        }
      }
    }
    return false;
  }

  // 车与路口关系
  check_inter(inter, axis) {
    let c = this;
    if (axis == 'x') {
      if (inter.height > 40) {
        if (inter.x - c.x > c.l + 8 && inter.x - c.x <= c.l + 25) {
          if (c.y - 80 <= inter.y && c.y + 42 >= inter.y) {
            return true;
          }
        }
      } else {
        if (inter.x - c.x > c.l + 8 && inter.x - c.x <= c.l + 25) {
          if (c.y - 40 <= inter.y && c.y + 42 >= inter.y) {
            return true;
          }
        }
      }
    } else if (axis == '-x') {
      if (inter.height > 40) {
        if (c.x - inter.x > c.l + 8 && c.x - inter.x <= c.l + inter.width + 5) {
          if (c.y - 80 <= inter.y && c.y + 42 >= inter.y) {
            return true;
          }
        }
      } else {
        if (c.x - inter.x > c.l + 8 && c.x - inter.x <= c.l + inter.width + 5) {
          if (c.y - 40 <= inter.y && c.y + 42 >= inter.y) {
            return true;
          }
        }
      }
    } else if (axis == '-y') {
      if (inter.width > 40) {
        if (
          c.y - inter.y > c.l + 8 &&
          c.y - inter.y <= c.l + inter.height + 5
        ) {
          if (c.x - 80 <= inter.x && c.x + 42 >= inter.x) {
            return true;
          }
        }
      } else {
        if (
          c.y - inter.y > c.l + 8 &&
          c.y - inter.y <= c.l + inter.height + 5
        ) {
          if (c.x - 40 <= inter.x && c.x + 42 >= inter.x) {
            return true;
          }
        }
      }
    } else if (axis == 'y') {
      if (inter.width > 40) {
        if (inter.y - c.y > c.l + 8 && inter.y - c.y <= c.l + 27) {
          if (c.x - 80 <= inter.x && c.x + 42 >= inter.x) {
            return true;
          }
        }
      } else {
        if (inter.y - c.y > c.l + 8 && inter.y - c.y <= c.l + 27) {
          if (c.x - 40 <= inter.x && c.x + 42 >= inter.x) {
            return true;
          }
        }
      }
    }
  }

  // 车辆在路口转弯
  gen_dir(inter) {
    let c = this;
    // 车辆已删除
    if (c.dd) return;

    var rand_dir = Math.random() * 10;
    var dir = c.d;
    c.dd = true;
    var rand_no1 = 0,
      rand_no2 = 0;
    if (c.d == 'e') {
      if (inter.width < 80) {
        rand_no1 = 2;
        rand_no2 = 5;
      } else {
        rand_no1 = 3;
        rand_no2 = 6;
      }
      if (rand_dir < rand_no1) {
        if (inter.roadbottom == true) {
          var dir = 's';
          c.d = 's';
          c.x = inter.x + 10;
          c.y = inter.y + inter.height - 27;
        } else {
          if (inter.roadright == true) {
            var dir = c.d;
          } else {
            //turn
          }
        }
      } else if (rand_dir > 3 && rand_dir < rand_no2) {
        if (inter.roadtop == true) {
          var dir = 'n';
          c.d = 'n';
          c.x = inter.x + inter.width - 9;
          c.y = inter.y + c.l + 2;
        } else {
          if (inter.roadright == true) {
            var dir = c.d;
          } else {
            //turn
          }
        }
      } else {
        if (inter.roadright == true) {
          var dir = c.d;
        } else {
          //turn
          var dir = 's';
          c.d = 's';
          c.x = inter.x + 10;
          c.y = inter.y + 2;
        }
      }
    } else if (c.d == 'w') {
      if (inter.width < 80) {
        rand_no1 = 2;
        rand_no2 = 5;
      } else {
        rand_no1 = 3;
        rand_no2 = 6;
      }
      if (rand_dir < rand_no1) {
        if (inter.roadbottom == true) {
          var dir = 's';
          c.d = 's';
          c.x = inter.x + 20;
          c.y = inter.y + inter.height + c.l + 2;
        } else {
          if (inter.roadleft == true) {
            var dir = c.d;
          } else {
            //turn
          }
        }
      } else if (rand_dir > 3 && rand_dir < rand_no2) {
        if (inter.roadtop == true) {
          var dir = 'n';
          c.d = 'n';
          c.x = inter.x + inter.width + 1;
          c.y = inter.y + c.l - 30;
        } else {
          if (inter.roadleft == true) {
            var dir = c.d;
          } else {
            //turn
          }
        }
      } else {
        if (inter.roadleft == true) {
          var dir = c.d;
        } else {
          //turn
          var dir = 'n';
          c.d = 'n';
          c.x = inter.x + inter.width + 1;
          c.y = inter.y + c.l + 2;
        }
      }
    } else if (c.d == 'n') {
      if (rand_dir < 3) {
        if (inter.roadright == true) {
          var dir = 'e';
          c.d = 'e';
          c.y = inter.y + inter.height - 10;
          c.x = inter.x + inter.width + 1;
        } else {
        }
      } else if (rand_dir > 3 && rand_dir < 6) {
        if (inter.roadleft == true) {
          var dir = 'w';
          c.d = 'w';
          c.y = inter.y + 8;
          c.x = inter.x + 5;
        } else {
        }
      } else {
        if (inter.roadtop == true) {
          var dir = c.d;
        } else {
          //turn
          var dir = 'w';
          c.d = 'w';
          c.y = inter.y + 8;
          c.x = inter.x + 5;
        }
      }
    } else if (c.d == 's') {
      if (rand_dir < 3) {
        if (inter.roadright == true) {
          var dir = 'e';
          c.d = 'e';
          c.y = inter.y + inter.height - 21;
          c.x = inter.x + inter.width + 1;
        } else {
          if (inter.roadbottom == true) {
            var dir = c.d;
          } else {
            //turn
            c.s = 0;
          }
        }
      } else if (rand_dir > 3 && rand_dir < 6) {
        if (inter.roadleft == true) {
          var dir = 'w';
          c.d = 'w';
          c.y = inter.y - 2;
          c.x = inter.x - 28;
        } else {
          if (inter.roadbottom == true) {
            var dir = c.d;
          } else {
            //turn
            c.s = 0;
          }
        }
      } else {
        if (inter.roadleft == true) {
          var dir = 'w';
          c.d = 'w';
          c.y = inter.y - 2;
          c.x = inter.x - 28;
        } else {
          //turn
          c.s = 0;
        }
      }
    }
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    if (this.d == 'w') {
      this.w = 25;
      // 车身
      ctx.rounded_rect(this.x, this.y, this.l, 12);
      // 车窗
      ctx.fillStyle = '#99B3CE';
      ctx.fillRect(this.x + 5, this.y, 5, 12);
      ctx.fillRect(this.x + 18, this.y, 2, 12);
      // 后视镜
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x + 6, this.y - 2, 2, 2);
      ctx.fillRect(this.x + 6, this.y + 12, 2, 2);
    } else if (this.d == 'e') {
      this.w = 25;
      ctx.rounded_rect(this.x, this.y, this.l, 12);
      ctx.fillStyle = '#99B3CE';
      ctx.fillRect(this.x + 15, this.y, 5, 12);
      ctx.fillRect(this.x + 4, this.y, 2, 12);
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x + 14, this.y - 2, 2, 2);
      ctx.fillRect(this.x + 14, this.y + 12, 2, 2);
    } else if (this.d == 's') {
      this.w = 12;
      ctx.rotate(Math.PI / 2);
      ctx.rounded_rect(this.y, -this.x, this.l, 12);
      ctx.fillStyle = '#99B3CE';
      ctx.fillRect(this.y + 15, -this.x, 5, 12);
      ctx.fillRect(this.y + 4, -this.x, 2, 12);
      ctx.fillStyle = this.color;
      ctx.fillRect(this.y + 14, -this.x - 2, 2, 2);
      ctx.fillRect(this.y + 14, -this.x + 12, 2, 2);
      ctx.rotate(-Math.PI / 2);
    } else {
      this.w = 12;
      ctx.rotate(Math.PI / 2);
      ctx.rounded_rect(this.y, -this.x, this.l, 12);
      ctx.fillStyle = '#99B3CE';
      ctx.fillRect(this.y + 5, -this.x, 5, 12);
      ctx.fillRect(this.y + 18, -this.x, 2, 12);
      ctx.fillStyle = this.color;
      ctx.fillRect(this.y + 6, -this.x - 2, 2, 2);
      ctx.fillRect(this.y + 6, -this.x + 12, 2, 2);
      ctx.rotate(-Math.PI / 2);
    }
  }
}

export default Car;
