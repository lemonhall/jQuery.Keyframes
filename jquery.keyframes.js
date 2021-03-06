// Generated by CoffeeScript 1.6.3
var $createKeyframeStyleTag, animationPlayState, browserType, playStateRunning;

$createKeyframeStyleTag = function(params) {
  return $("<style>").attr({
    "class": "keyframe-style",
    id: params.id,
    type: "text/css"
  }).appendTo("head");
};

$.keyframe = {
  browserCode: function() {
    var ua;
    ua = navigator.userAgent;
    if (ua.indexOf("Opera") !== -1) {
      return "-o-";
    } else if (ua.indexOf("MSIE") !== -1) {
      return "-ms-";
    } else if (ua.indexOf("WebKit") !== -1) {
      return "-webkit-";
    } else {
      return "";
    }
  },
  isSupported: function() {
    var animationSupport, element, pfx;
    element = $('body').get(0);
    animationSupport = false;
    if (element.style.animationName) {
      animationSupport = true;
    } else {
      pfx = this.browserCode().slice(1, -1);
      if (element.style[pfx + "AnimationName"]) {
        animationSupport = true;
      }
    }
    return animationSupport;
  },
  generate: function(frameData) {
    var $elems, $frameStyle, css, frameName, property;
    frameName = frameData.name || "";
    css = "@" + (this.browserCode()) + "keyframes " + frameName + " {";
    for (property in frameData) {
      if (property !== "name") {
        css += "" + property + "{" + frameData[property] + "}";
      }
    }
    css += "}";
    $frameStyle = $("style#" + frameData.name);
    if ($frameStyle.length > 0) {
      $frameStyle.html(css);
      $elems = $("*").filter(function() {
        return this.style["" + ($.keyframe.browserCode().slice(1, -1)) + "AnimationName"] === frameName;
      });
      return $elems.each(function() {
        var $el, options;
        $el = $(this);
        options = $el.data("keyframeOptions");
        return $el.resetKeyframe(function() {
          return $el.playKeyframe(options);
        });
      });
    } else {
      return $createKeyframeStyleTag({
        id: frameName
      }).append(css);
    }
  },
  define: function(frameData) {
    var frame, _i, _len, _results;
    if (frameData.length) {
      _results = [];
      for (_i = 0, _len = frameData.length; _i < _len; _i++) {
        frame = frameData[_i];
        _results.push(this.generate(frame));
      }
      return _results;
    } else {
      return this.generate(frameData);
    }
  }
};

browserType = $.keyframe.browserCode();

animationPlayState = "animation-play-state";

playStateRunning = "running";

$.fn.resetKeyframe = function(callback) {
  var $el;
  $el = $(this).css(browserType + animationPlayState, playStateRunning).css(browserType + "animation", "none");
  if (callback) {
    return setTimeout(callback, 1);
  }
};

$.fn.pauseKeyframe = function() {
  var $el;
  return $el = $(this).css(browserType + animationPlayState, "paused");
};

$.fn.resumeKeyframe = function() {
  return $(this).css(browserType + animationPlayState, playStateRunning);
};

$.fn.playKeyframe = function(frameOptions, callback) {
  var animationcss, animationkey, defaultsOptions, delay, duration, frameOptSplit, pfx, repeat, _prefixEvent;
  if (typeof frameOptions === 'string') {
    frameOptSplit = frameOptions.trim().split(' ');
    frameOptions = {
      name: frameOptSplit[0],
      duration: parseInt(frameOptSplit[1]),
      timingFunction: frameOptSplit[2],
      delay: parseInt(frameOptSplit[3]),
      repeat: frameOptSplit[4],
      complete: callback
    };
  }
  defaultsOptions = {
    duration: 0,
    timingFunction: "ease",
    delay: 0,
    repeat: 1,
    direction: "normal",
    fillMode: "forwards",
    complete: null
  };
  frameOptions = $.extend(defaultsOptions, frameOptions);
  duration = frameOptions.duration;
  delay = frameOptions.delay;
  repeat = frameOptions.repeat;
  animationcss = "" + frameOptions.name + " " + duration + "ms " + frameOptions.timingFunction + " " + delay + "ms " + repeat + " " + frameOptions.direction + " " + frameOptions.fillMode;
  callback = frameOptions.complete;
  animationkey = browserType + "animation";
  pfx = ["webkit", "moz", "MS", "o", ""];
  _prefixEvent = function(element, type, callback) {
    var evt, p, _results;
    p = 0;
    _results = [];
    while (p < pfx.length) {
      if (!pfx[p]) {
        type = type.toLowerCase();
      }
      evt = pfx[p] + type;
      element.off(evt).on(evt, callback);
      _results.push(p++);
    }
    return _results;
  };
  return this.each(function() {
    var $el;
    $el = $(this).addClass("boostKeyframe").css(browserType + animationPlayState, playStateRunning).css(animationkey, animationcss).data("keyframeOptions", frameOptions);
    if (callback) {
      _prefixEvent($el, 'AnimationIteration', callback);
      return _prefixEvent($el, 'AnimationEnd', callback);
    }
  });
};

$createKeyframeStyleTag({
  id: "boost-keyframe"
}).append(" .boostKeyframe{" + browserType + "transform:scale3d(1,1,1);}");

/*
//# sourceMappingURL=jquery.keyframes.map
*/
