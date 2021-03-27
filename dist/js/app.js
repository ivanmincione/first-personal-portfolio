/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/animation-rain-neon.js":
/*!***************************************!*\
  !*** ./src/js/animation-rain-neon.js ***!
  \***************************************/
/***/ (() => {

var c = document.getElementById("canvas-club");
var ctx = c.getContext("2d");
var w = c.width = window.innerWidth;
var h = c.height = window.innerHeight;
var clearColor = 'rgba(11, 12, 17, 0.5)';
var max = 30;
var drops = [];

function random(min, max) {
  return Math.random() * (max - min) + min;
}

function O() {}

O.prototype = {
  init: function init() {
    this.x = random(0, w);
    this.y = 0;
    this.color = 'hsl(180, 100%, 50%)';
    this.w = 2;
    this.h = 1;
    this.vy = random(4, 5);
    this.vw = 3;
    this.vh = 1;
    this.size = 2;
    this.hit = random(h * .8, h * .9);
    this.a = 1;
    this.va = .96;
  },
  draw: function draw() {
    if (this.y > this.hit) {
      ctx.beginPath();
      ctx.moveTo(this.x, this.y - this.h / 2);
      ctx.bezierCurveTo(this.x + this.w / 2, this.y - this.h / 2, this.x + this.w / 2, this.y + this.h / 2, this.x, this.y + this.h / 2);
      ctx.bezierCurveTo(this.x - this.w / 2, this.y + this.h / 2, this.x - this.w / 2, this.y - this.h / 2, this.x, this.y - this.h / 2);
      ctx.strokeStyle = 'hsla(180, 100%, 50%, ' + this.a + ')';
      ctx.stroke();
      ctx.closePath();
    } else {
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x, this.y, this.size, this.size * 5);
    }

    this.update();
  },
  update: function update() {
    if (this.y < this.hit) {
      this.y += this.vy;
    } else {
      if (this.a > .03) {
        this.w += this.vw;
        this.h += this.vh;

        if (this.w > 100) {
          this.a *= this.va;
          this.vw *= .98;
          this.vh *= .98;
        }
      } else {
        this.init();
      }
    }
  }
};

function resize() {
  w = c.width = window.innerWidth;
  h = c.height = window.innerHeight;
}

function setup() {
  for (var i = 0; i < max; i++) {
    (function (j) {
      setTimeout(function () {
        var o = new O();
        o.init();
        drops.push(o);
      }, j * 200);
    })(i);
  }
}

function anim() {
  ctx.fillStyle = clearColor;
  ctx.fillRect(0, 0, w, h);

  for (var i in drops) {
    drops[i].draw();
  }

  requestAnimationFrame(anim);
}

window.addEventListener("resize", resize);
setup();
anim();

/***/ }),

/***/ "./src/js/app.js":
/*!***********************!*\
  !*** ./src/js/app.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// Animazione hero background pioggia al neon
__webpack_require__(/*! ./animation-rain-neon */ "./src/js/animation-rain-neon.js");

__webpack_require__(/*! ./navbar */ "./src/js/navbar.js");

__webpack_require__(/*! ./hero-text-animation */ "./src/js/hero-text-animation.js");

__webpack_require__(/*! ./skills */ "./src/js/skills.js");

__webpack_require__(/*! ./btn-return-top */ "./src/js/btn-return-top.js");

/***/ }),

/***/ "./src/js/btn-return-top.js":
/*!**********************************!*\
  !*** ./src/js/btn-return-top.js ***!
  \**********************************/
/***/ (() => {

document.addEventListener('DOMContentLoaded', function () {
  window.onscroll = function (ev) {
    document.getElementById("cRetour").className = window.pageYOffset > 100 ? "cVisible" : "cInvisible";
  };
});

/***/ }),

/***/ "./src/js/hero-text-animation.js":
/*!***************************************!*\
  !*** ./src/js/hero-text-animation.js ***!
  \***************************************/
/***/ (() => {

// Wraps letters with spans, for css animations
(function ($) {
  var s,
      spanizeLetters = {
    settings: {
      letters: $('.js-spanize')
    },
    init: function init() {
      s = this.settings;
      this.bindEvents();
    },
    bindEvents: function bindEvents() {
      s.letters.html(function (i, el) {
        //spanizeLetters.joinChars();
        var spanizer = $.trim(el).split("");
        return '<span>' + spanizer.join('</span><span>') + '</span>';
      });
    }
  };
  spanizeLetters.init();
})(jQuery);

/***/ }),

/***/ "./src/js/navbar.js":
/*!**************************!*\
  !*** ./src/js/navbar.js ***!
  \**************************/
/***/ (() => {

var toggler = document.querySelector('.menu__toggler');
var menu = document.querySelector('.menu');
/*
 * Toggles on and off the 'active' class on the menu
 * and the toggler button.
 */

toggler.addEventListener('click', function () {
  toggler.classList.toggle('active');
  menu.classList.toggle('active');
});

/***/ }),

/***/ "./src/js/skills.js":
/*!**************************!*\
  !*** ./src/js/skills.js ***!
  \**************************/
/***/ (() => {

var options = {
  cutoutPercentage: 65,
  animation: {
    duration: 5000,
    easing: 'linear'
  },
  animateScale: true,
  tooltips: {
    enabled: false
  },
  events: []
};
var skills = [{
  id: "html_css",
  values: [95, 5]
}, {
  id: "javascript",
  values: [85, 15]
}, {
  id: "vue",
  values: [80, 20]
}, {
  id: "laravel",
  values: [75, 25]
}, {
  id: "php",
  values: [75, 25]
}, {
  id: "mysql",
  values: [70, 30]
}, {
  id: "ui-ux",
  values: [90, 10]
}, {
  id: "others",
  values: [80, 20]
}];
var offset = 0;

var _loop = function _loop() {
  var skill = _skills[_i];
  var canvas = document.querySelector("#".concat(skill.id));

  if (!canvas) {
    return "continue";
  }

  var ctx = canvas.getContext('2d');
  setTimeout(function () {
    var chart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        datasets: [{
          data: skill.values,
          backgroundColor: ['#2d99ae', '#c5c6c7']
        }]
      },
      options: options
    });
  }, offset);
  offset += 250;
};

for (var _i = 0, _skills = skills; _i < _skills.length; _i++) {
  var _ret = _loop();

  if (_ret === "continue") continue;
}

/***/ }),

/***/ "./src/scss/app.scss":
/*!***************************!*\
  !*** ./src/scss/app.scss ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					result = fn();
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"/js/app": 0,
/******/ 			"css/app": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			for(moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 				}
/******/ 			}
/******/ 			if(runtime) runtime(__webpack_require__);
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkIds[i]] = 0;
/******/ 			}
/******/ 			__webpack_require__.O();
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkfirst_personal_portfolio"] = self["webpackChunkfirst_personal_portfolio"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	__webpack_require__.O(undefined, ["css/app"], () => (__webpack_require__("./src/js/app.js")))
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["css/app"], () => (__webpack_require__("./src/scss/app.scss")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;