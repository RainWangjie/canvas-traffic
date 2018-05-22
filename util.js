// 兼容rAF
window.requestAnimFrame = (function() {
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function(callback) {
      window.setTimeout(callback, 1000 / 60);
    }
  );
})();

// 设备检测
const BrowserDetect = {
  init: function() {
    this.browser = this.searchString(this.dataBrowser) || 'An unknown browser';
    this.version =
      this.searchVersion(navigator.userAgent) ||
      this.searchVersion(navigator.appVersion) ||
      'an unknown version';
    this.OS = this.searchString(this.dataOS) || 'an unknown OS';
  },
  searchString: function(data) {
    for (let i = 0; i < data.length; i++) {
      let dataString = data[i].string;
      let dataProp = data[i].prop;
      this.versionSearchString = data[i].versionSearch || data[i].identity;
      if (dataString) {
        if (dataString.indexOf(data[i].subString) != -1)
          return data[i].identity;
      } else if (dataProp) return data[i].identity;
    }
  },
  searchVersion: function(dataString) {
    let index = dataString.indexOf(this.versionSearchString);
    if (index == -1) return;
    return parseFloat(
      dataString.substring(index + this.versionSearchString.length + 1)
    );
  },
  dataBrowser: [
    {
      string: navigator.userAgent,
      subString: 'Chrome',
      identity: 'Chrome'
    },
    {
      string: navigator.userAgent,
      subString: 'OmniWeb',
      versionSearch: 'OmniWeb/',
      identity: 'OmniWeb'
    },
    {
      string: navigator.vendor,
      subString: 'Apple',
      identity: 'Safari',
      versionSearch: 'Version'
    },
    {
      prop: window.opera,
      identity: 'Opera',
      versionSearch: 'Version'
    },
    {
      string: navigator.vendor,
      subString: 'iCab',
      identity: 'iCab'
    },
    {
      string: navigator.vendor,
      subString: 'KDE',
      identity: 'Konqueror'
    },
    {
      string: navigator.userAgent,
      subString: 'Firefox',
      identity: 'Firefox'
    },
    {
      string: navigator.vendor,
      subString: 'Camino',
      identity: 'Camino'
    },
    {
      // for newer Netscapes (6+)
      string: navigator.userAgent,
      subString: 'Netscape',
      identity: 'Netscape'
    },
    {
      string: navigator.userAgent,
      subString: 'MSIE',
      identity: 'Explorer',
      versionSearch: 'MSIE'
    },
    {
      string: navigator.userAgent,
      subString: 'Gecko',
      identity: 'Mozilla',
      versionSearch: 'rv'
    },
    {
      // for older Netscapes (4-)
      string: navigator.userAgent,
      subString: 'Mozilla',
      identity: 'Netscape',
      versionSearch: 'Mozilla'
    }
  ],
  dataOS: [
    {
      string: navigator.platform,
      subString: 'Win',
      identity: 'Windows'
    },
    {
      string: navigator.platform,
      subString: 'Mac',
      identity: 'Mac'
    },
    {
      string: navigator.userAgent,
      subString: 'iPhone',
      identity: 'iPhone/iPod'
    },
    {
      string: navigator.platform,
      subString: 'Linux',
      identity: 'Linux'
    }
  ]
};

BrowserDetect.init();

let isBrowserOk = false;
if (BrowserDetect.browser == 'Firefox') {
  let notify = confirm(
    'Firefox seems to have an issue rendering this and can cause your machine to crash, so please use google chrome or safari'
  );
  if (notify == true) {
    let notify2 = confirm('You sure you want to run this?');
    if (notify2 == true) {
      isBrowserOk = true;
    }
  }
} else {
  isBrowserOk = true;
}
// 深拷贝
const deepCopy = data => {
  if (typeof data !== 'object') {
    return data;
  }
  let newObj = data instanceof Array ? [] : {};
  for (let key in data) {
    if (data.hasOwnProperty(key)) {
      newObj[key] =
        typeof data[key] === 'object' ? deepCopy(data[key]) : data[key];
    }
  }
  return newObj;
};
export { BrowserDetect, isBrowserOk, deepCopy };
