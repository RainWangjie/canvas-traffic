// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({10:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

// 兼容rAF
window.requestAnimFrame = function () {
  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
    window.setTimeout(callback, 1000 / 60);
  };
}();

// 设备检测
var BrowserDetect = {
  init: function init() {
    this.browser = this.searchString(this.dataBrowser) || 'An unknown browser';
    this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || 'an unknown version';
    this.OS = this.searchString(this.dataOS) || 'an unknown OS';
  },
  searchString: function searchString(data) {
    for (var i = 0; i < data.length; i++) {
      var dataString = data[i].string;
      var dataProp = data[i].prop;
      this.versionSearchString = data[i].versionSearch || data[i].identity;
      if (dataString) {
        if (dataString.indexOf(data[i].subString) != -1) return data[i].identity;
      } else if (dataProp) return data[i].identity;
    }
  },
  searchVersion: function searchVersion(dataString) {
    var index = dataString.indexOf(this.versionSearchString);
    if (index == -1) return;
    return parseFloat(dataString.substring(index + this.versionSearchString.length + 1));
  },
  dataBrowser: [{
    string: navigator.userAgent,
    subString: 'Chrome',
    identity: 'Chrome'
  }, {
    string: navigator.userAgent,
    subString: 'OmniWeb',
    versionSearch: 'OmniWeb/',
    identity: 'OmniWeb'
  }, {
    string: navigator.vendor,
    subString: 'Apple',
    identity: 'Safari',
    versionSearch: 'Version'
  }, {
    prop: window.opera,
    identity: 'Opera',
    versionSearch: 'Version'
  }, {
    string: navigator.vendor,
    subString: 'iCab',
    identity: 'iCab'
  }, {
    string: navigator.vendor,
    subString: 'KDE',
    identity: 'Konqueror'
  }, {
    string: navigator.userAgent,
    subString: 'Firefox',
    identity: 'Firefox'
  }, {
    string: navigator.vendor,
    subString: 'Camino',
    identity: 'Camino'
  }, {
    // for newer Netscapes (6+)
    string: navigator.userAgent,
    subString: 'Netscape',
    identity: 'Netscape'
  }, {
    string: navigator.userAgent,
    subString: 'MSIE',
    identity: 'Explorer',
    versionSearch: 'MSIE'
  }, {
    string: navigator.userAgent,
    subString: 'Gecko',
    identity: 'Mozilla',
    versionSearch: 'rv'
  }, {
    // for older Netscapes (4-)
    string: navigator.userAgent,
    subString: 'Mozilla',
    identity: 'Netscape',
    versionSearch: 'Mozilla'
  }],
  dataOS: [{
    string: navigator.platform,
    subString: 'Win',
    identity: 'Windows'
  }, {
    string: navigator.platform,
    subString: 'Mac',
    identity: 'Mac'
  }, {
    string: navigator.userAgent,
    subString: 'iPhone',
    identity: 'iPhone/iPod'
  }, {
    string: navigator.platform,
    subString: 'Linux',
    identity: 'Linux'
  }]
};

BrowserDetect.init();

var isBrowserOk = false;
if (BrowserDetect.browser == 'Firefox') {
  var notify = confirm('Firefox seems to have an issue rendering this and can cause your machine to crash, so please use google chrome or safari');
  if (notify == true) {
    var notify2 = confirm('You sure you want to run this?');
    if (notify2 == true) {
      exports.isBrowserOk = isBrowserOk = true;
    }
  }
} else {
  exports.isBrowserOk = isBrowserOk = true;
}
// 深拷贝
var deepCopy = function deepCopy(data) {
  if ((typeof data === 'undefined' ? 'undefined' : _typeof(data)) !== 'object') {
    return data;
  }
  var newObj = data instanceof Array ? [] : {};
  for (var key in data) {
    if (data.hasOwnProperty(key)) {
      newObj[key] = _typeof(data[key]) === 'object' ? deepCopy(data[key]) : data[key];
    }
  }
  return newObj;
};
exports.BrowserDetect = BrowserDetect;
exports.isBrowserOk = isBrowserOk;
exports.deepCopy = deepCopy;
},{}],35:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  solidLine: '#A68B44',
  dashLine: '#A09383',
  road: '#605A4C',
  roadEdge: '#A09383',
  traffic: {
    red: 'rgba(255,0,0,0.4)',
    green: 'rgba(0,255,0,0.4)'
  }
};
},{}],11:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultRoad = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _color = require('../color');

var _color2 = _interopRequireDefault(_color);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var defaultRoad = exports.defaultRoad = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  direction: 'h',
  num: 0
};

var Road = function () {
  function Road(config) {
    _classCallCheck(this, Road);

    for (var key in defaultRoad) {
      this[key] = config[key] || defaultRoad[key];
    }
  }

  _createClass(Road, [{
    key: 'drawRoadEdge',
    value: function drawRoadEdge(ctx, x, y, w, h) {
      ctx.fillStyle = _color2.default.roadEdge;
      ctx.fillRect(x, y, w, h);
    }
  }, {
    key: 'drawRoad',
    value: function drawRoad(ctx, x, y, w, h) {
      ctx.fillStyle = _color2.default.road;
      ctx.fillRect(x, y, w, h);
    }
  }, {
    key: 'drawSolidLine',
    value: function drawSolidLine(ctx, x, y, w, h) {
      ctx.fillStyle = _color2.default.solidLine;
      ctx.fillRect(x, y, w, h);
    }
  }, {
    key: 'drawDashLine',
    value: function drawDashLine(ctx, x1, y1, x2, y2) {
      ctx.beginPath();
      ctx.setLineDash([2, 5]);
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.closePath();
      ctx.strokeStyle = _color2.default.dashLine;
      ctx.lineWidth = 1;
      ctx.fill();
      ctx.stroke();
    }
  }, {
    key: 'draw',
    value: function draw(ctx) {
      var x = this.x,
          y = this.y,
          w = this.width,
          h = this.height,
          direction = this.direction,
          num = this.num;

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
        var space = Math.min(w, h) / num / 2;
        for (var i = 1; i < num; i++) {
          var space_1 = space * i - 1,
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
  }]);

  return Road;
}();

exports.default = Road;
},{"../color":35}],15:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var addRoundedRect = exports.addRoundedRect = function addRoundedRect(ctx) {
  Object.getPrototypeOf(ctx).rounded_rect = function (x, y, w, h, r) {
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

var defaultCar = exports.defaultCar = {
  x: 0,
  y: 0,
  s: 5,
  l: 25, //length of vehicle
  d: 'e',
  dd: false,
  color: '#F5D600'
};

var Car = function () {
  function Car() {
    _classCallCheck(this, Car);

    for (var key in defaultCar) {
      this[key] = defaultCar[key];
    }
  }
  // 俩车距离确认


  _createClass(Car, [{
    key: 'check_distance',
    value: function check_distance(car, axis) {
      var c1 = this,
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

  }, {
    key: 'check_inter',
    value: function check_inter(inter, axis) {
      var c = this;
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
          if (c.y - inter.y > c.l + 8 && c.y - inter.y <= c.l + inter.height + 5) {
            if (c.x - 80 <= inter.x && c.x + 42 >= inter.x) {
              return true;
            }
          }
        } else {
          if (c.y - inter.y > c.l + 8 && c.y - inter.y <= c.l + inter.height + 5) {
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

  }, {
    key: 'gen_dir',
    value: function gen_dir(inter) {
      var c = this;
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
          } else {}
        } else if (rand_dir > 3 && rand_dir < 6) {
          if (inter.roadleft == true) {
            var dir = 'w';
            c.d = 'w';
            c.y = inter.y + 8;
            c.x = inter.x + 5;
          } else {}
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
  }, {
    key: 'draw',
    value: function draw(ctx) {
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
  }]);

  return Car;
}();

exports.default = Car;
},{}],23:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultInter = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _color = require('../color');

var _color2 = _interopRequireDefault(_color);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Intersections = function Intersections(roads) {
  var roadNum = roads.length,
      intersections_arr = [];
  for (var i = 0; i < roadNum - 1; i++) {
    for (var j = i + 1; j < roadNum; j++) {
      var r1 = roads[i],
          r2 = roads[j];

      // road 方向相同
      if (r1.direction === r2.direction) continue;

      // 交换road顺序，横向r1，纵向r2
      if (r1.direction === 'v' && r2.direction === 'h') {
        var _ref = [r2, r1];
        r1 = _ref[0];
        r2 = _ref[1];
      }

      // r1,r2未交叉
      if (r1.x + r1.width < r2.x || r1.x > r2.x) {
        continue;
      }
      if (r2.y + r2.height < r1.y || r2.y > r1.y) {
        continue;
      }

      // r1，r2存在尽头相交
      var roadtop = true;
      var roadbottom = true;
      var roadleft = true;
      var roadright = true;

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

      intersections_arr.push(new Intersection({
        x: r2.x,
        y: r1.y,
        lightNumH: r1.num,
        lightNumV: r2.num,
        width: r2.width,
        height: r1.height,
        roadtop: roadtop,
        roadleft: roadleft,
        roadright: roadright,
        roadbottom: roadbottom
      }));
    }
  }
  return intersections_arr;
};

var defaultInter = exports.defaultInter = {
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

var Intersection = function () {
  function Intersection(options) {
    _classCallCheck(this, Intersection);

    for (var key in defaultInter) {
      this[key] = options[key] || defaultInter[key];
    }

    this.setTraffic();
  }

  _createClass(Intersection, [{
    key: 'setTraffic',
    value: function setTraffic() {
      var left_green = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      if (left_green) {
        this.right = _color2.default.traffic.green;
        this.left = _color2.default.traffic.green;
        this.top = _color2.default.traffic.red;
        this.bottom = _color2.default.traffic.red;
      } else {
        this.right = _color2.default.traffic.red;
        this.left = _color2.default.traffic.red;
        this.top = _color2.default.traffic.green;
        this.bottom = _color2.default.traffic.green;
      }
    }

    // 重绘路口

  }, {
    key: 'drawRoad',
    value: function drawRoad(ctx, x, y, w, h) {
      ctx.fillStyle = _color2.default.road;
      ctx.fillRect(x, y, w, h);
    }

    // 斑马线

  }, {
    key: 'drawZebraCross',
    value: function drawZebraCross(ctx, x1, y1, x2, y2) {
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

    // 停止线(缺多车道区分)

  }, {
    key: 'drawStopLine',
    value: function drawStopLine(ctx, x, y, w, h) {
      ctx.fillStyle = '#A09383';
      ctx.fillRect(x, y, w, h);
    }

    // 信号灯

  }, {
    key: 'drawTrafficLight',
    value: function drawTrafficLight(light, ctx, x, y, w, h) {
      var shadow_color = light.color;
      ctx.save();

      var diff = Math.max(w, h) / light.num / 2;
      for (var i = 0; i < light.num; i++) {
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
  }, {
    key: 'draw',
    value: function draw(ctx) {
      // 覆盖路口
      ctx.fillStyle = _color2.default.road;
      ctx.fillRect(this.x, this.y, this.width, this.height);

      if (this.roadleft == true) {
        this.drawRoad(ctx, this.x - 20, this.y, 20, this.height);
        this.drawZebraCross(ctx, this.x - 12, this.y, this.x - 12, this.y + this.height);
        this.drawStopLine(ctx, this.x - 22, this.height / 2 + this.y - 1, 2, this.height / 2 + 1);
        this.drawTrafficLight({ dir: 'left', num: this.lightNumH, color: this.left }, ctx, this.x - 3, this.y + this.height - this.height / 2 + 3, 1, this.height / 2);
      }
      if (this.roadright == true) {
        this.drawRoad(ctx, this.x + this.width, this.y, 22, this.height);
        this.drawZebraCross(ctx, this.x + this.width + 12, this.y, this.x + this.width + 12, this.y + this.height);
        this.drawStopLine(ctx, this.x + this.width + 22, this.y, 2, this.height / 2 + 1);
        this.drawTrafficLight({ dir: 'right', num: this.lightNumH, color: this.right }, ctx, this.x + this.width + 2, this.y - 3, 1, this.height / 2);
      }
      if (this.roadtop == true) {
        this.drawRoad(ctx, this.x, this.y - 20, this.width, 20);
        this.drawZebraCross(ctx, this.x, this.y - 12, this.x + this.width, this.y - 12);
        this.drawStopLine(ctx, this.x, this.y - 21, this.width / 2 + 1, 2);
        this.drawTrafficLight({ dir: 'top', num: this.lightNumV, color: this.top }, ctx, this.x - 3, this.y - 2, this.width / 2, 1);
      }
      if (this.roadbottom == true) {
        this.drawRoad(ctx, this.x, this.y + this.height, this.width, 20);
        this.drawZebraCross(ctx, this.x, this.y + this.height + 12, this.x + this.width, this.y + this.height + 12);
        this.drawStopLine(ctx, this.x + this.width - this.width / 2 - 1, this.y + this.height + 20, this.width / 2 + 1, 2);
        this.drawTrafficLight({ dir: 'bottom', num: this.lightNumV, color: this.bottom }, ctx, this.x + this.width / 2 + 3, this.y + this.height + 2, this.width / 2, 1);
      }
    }
  }]);

  return Intersection;
}();

exports.default = Intersections;
},{"../color":35}],6:[function(require,module,exports) {
'use strict';

var _util = require('./util');

var _Road = require('./component/Road');

var _Road2 = _interopRequireDefault(_Road);

var _Car = require('./component/Car');

var _Car2 = _interopRequireDefault(_Car);

var _Intersections = require('./component/Intersections');

var _Intersections2 = _interopRequireDefault(_Intersections);

var _color2 = require('./color');

var _color3 = _interopRequireDefault(_color2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var canvas = document.getElementsByTagName('canvas')[0];
var ctx = canvas.getContext('2d');

(0, _Car.addRoundedRect)(ctx);

// 检测canvas支持虚线 dash
if (!ctx.setLineDash) {
  ctx.setLineDash = function () {
    console.log('browser not supported for dashed lines');
  };
}

// 设置canvas宽高
var w = document.documentElement.clientWidth,
    h = document.documentElement.clientHeight;
// canvas.style.transformOrigin = '0 0';
// canvas.style.transform = 'scale(0.5,0.5)';
canvas.width = w;
canvas.height = h;

var roads = [],
    intersections_arr = [],
    cars = [];

var roadConfig = [{
  x: 0,
  y: h / 2 - 20,
  width: w,
  height: 40,
  direction: 'h',
  num: 1
}, {
  x: w / 2 - 20,
  y: 0,
  width: 40,
  height: h,
  direction: 'v',
  num: 1
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
}];

// 定时变换信号灯
var left_green = false;

function left_greenc() {
  left_green = !left_green;
}

setInterval(function () {
  left_greenc();
}, 3000);

// 初始化
function init() {
  //Launch Cars
  cars = [];
  roads = [];
  intersections_arr = [];

  var roadTotal = roadConfig.length;

  // 生成car
  var car_no = 2;
  for (var i = 0; i < car_no; i++) {
    var car = new _Car2.default();
    var randomRoad = roadConfig[~~Math.random() * roadTotal];
    var direction = randomRoad.direction,
        x = randomRoad.x,
        y = randomRoad.y,
        width = randomRoad.width,
        height = randomRoad.height;


    if (direction === 'h') {
      car.x = x + width + _Car.defaultCar.l;
      car.y = y + height / 2 - 17;
      car.d = 'w';
    } else {
      car.x = x + width / 2 + 17;
      car.y = y + height + _Car.defaultCar.l;
      car.d = 'n';
    }

    var color_rand = Math.random();
    var _color = '';
    if (color_rand < 0.2) {
      _color = '#fff';
    } else if (color_rand > 0.2 && color_rand < 0.4) {
      _color = '#E22322';
    } else if (color_rand > 0.4 && color_rand < 0.6) {
      _color = '#F9D111';
    } else if (color_rand > 0.6 && color_rand < 0.8) {
      _color = '#367C94';
    } else if (color_rand > 0.8 && color_rand < 1) {
      _color = '#222';
    }
    car.color = _color;
    cars.push(car);
  }

  // 生成road
  roads = roadConfig.map(function (config) {
    return new _Road2.default(config);
  });

  // 生成路口
  intersections_arr = (0, _Intersections2.default)(roadConfig);
}

// 绘制场景
function drawscene() {
  // 清除画布
  ctx.clearRect(0, 0, w, h);

  // 底图
  ctx.fillStyle = '#4DBB4C';
  ctx.fillRect(0, 0, w, h);

  // 道路
  roads.forEach(function (road) {
    road.draw(ctx);
  });

  // 路口
  intersections_arr.forEach(function (intersection) {
    intersection.setTraffic(left_green);
    intersection.draw(ctx);
  });

  // 车辆
  drive_cars();
}

// 移动车辆
function drive_cars() {
  var carCount = cars.length;
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
                  if (cars[v].y == inter.y + 44 && cars[v].x < inter.x && cars[v].s == 0) {
                    lc++;
                  }
                  if (cars[v].y == c.y && cars[v].x < inter.x && cars[v].s == 0) {
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
              if (inter.left == _color3.default.traffic.red) {
                //red
                c.s = 0;
              } else {
                //green
                c.s = _Car.defaultCar.s;
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
        c.x = -1 * _Car.defaultCar.l;
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
                  if (cars[v].x == inter.x + 55 && cars[v].y < inter.y && cars[v].s == 0) {
                    lc++;
                  }
                  if (cars[v].x == c.x && cars[v].y < inter.y && cars[v].s == 0) {
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
              if (inter.bottom == _color3.default.traffic.red) {
                //red
                c.s = 0;
              } else {
                //green
                c.s = _Car.defaultCar.s;
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
        c.y = h + _Car.defaultCar.l;
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
                  if (cars[v].x == inter.x + 36 && cars[v].y < inter.y && cars[v].s == 0) {
                    lc++;
                  }
                  if (cars[v].x == c.x && cars[v].y < inter.y && cars[v].s == 0) {
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
              if (inter.top == _color3.default.traffic.red) {
                //red
                c.s = 0;
              } else {
                //green
                c.s = _Car.defaultCar.s;
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
        c.y = -1 * _Car.defaultCar.l;
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
                  if (cars[v].y == inter.y + 22 && cars[v].x > inter.x && cars[v].s == 0) {
                    lc++;
                  }
                  if (cars[v].y == c.y && cars[v].x > inter.x && cars[v].s == 0) {
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
              if (inter.right == _color3.default.traffic.red) {
                //red
                c.s = 0;
              } else {
                //green
                c.s = _Car.defaultCar.s;
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
        c.x = w + _Car.defaultCar.l;
      }
      c.x -= c.s;
    }
    c.draw(ctx);
  }
}

// 控制车辆开始运动
var isPlay = false,
    btnEl = document.getElementById('play');

btnEl.onclick = function () {
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
},{"./util":10,"./component/Road":11,"./component/Car":15,"./component/Intersections":23,"./color":35}],49:[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';

var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };

  module.bundle.hotData = null;
}

module.bundle.Module = Module;

var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '51731' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
      // Clear the console after HMR
      console.clear();
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');

      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);

      removeErrorOverlay();

      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;

  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';

  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(+k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},[49,6], null)
//# sourceMappingURL=/traffic2.0.c18c7e4c.map