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

__webpack_require__(/*! ./projects */ "./src/js/projects.js");

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

/***/ "./src/js/projects.js":
/*!****************************!*\
  !*** ./src/js/projects.js ***!
  \****************************/
/***/ (() => {

// Slider(all Slides in a container)
var slider = document.querySelector(".slider"); // All trails

var trail = document.querySelector(".trail").querySelectorAll("div"); // Transform value

var value = 0; // trail index number

var trailValue = 0; // interval (Duration)

var interval = 15000; // Function to slide forward

var slide = function slide(condition) {
  // CLear interval
  clearInterval(start); // update value and trailValue

  condition === "increase" ? initiateINC() : initiateDEC(); // move slide

  move(value, trailValue); // Restart Animation
  // animate()
  // start interal for slides back

  start = setInterval(function () {
    return slide("increase");
  }, interval);
}; // function for increase(forward, next) configuration


var initiateINC = function initiateINC() {
  // Remove active from all trails
  trail.forEach(function (cur) {
    return cur.classList.remove("active");
  }); // increase transform value

  value === 80 ? value = 0 : value += 20; // update trailValue based on value

  trailUpdate();
}; // function for decrease(backward, previous) configuration


var initiateDEC = function initiateDEC() {
  // Remove active from all trails
  trail.forEach(function (cur) {
    return cur.classList.remove("active");
  }); // decrease transform value

  value === 0 ? value = 80 : value -= 20; // update trailValue based on value

  trailUpdate();
}; // function to transform slide


var move = function move(S, T) {
  // transform slider
  slider.style.transform = "translateX(-".concat(S, "%)"); //add active class to the current trail

  trail[T].classList.add("active");
};

var tl = gsap.timeline({
  defaults: {
    duration: 0.6,
    ease: "power2.inOut"
  }
});
tl.from(".bg", {
  x: "-100%",
  opacity: 0
}).from("p", {
  opacity: 0
}, "-=0.3").from("h1", {
  opacity: 0,
  y: "30px"
}, "-=0.3").from("button", {
  opacity: 0,
  y: "-40px"
}, "-=0.8"); // function to restart animation

var animate = function animate() {
  return tl.restart();
}; // function to update trailValue based on slide value


var trailUpdate = function trailUpdate() {
  if (value === 0) {
    trailValue = 0;
  } else if (value === 20) {
    trailValue = 1;
  } else if (value === 40) {
    trailValue = 2;
  } else if (value === 60) {
    trailValue = 3;
  } else {
    trailValue = 4;
  }
}; // Start interval for slides


var start = setInterval(function () {
  return slide("increase");
}, interval); // Next  and  Previous button function (SVG icon with different classes)

document.querySelectorAll("svg").forEach(function (cur) {
  // Assign function based on the class Name("next" and "prev")
  cur.addEventListener("click", function () {
    return cur.classList.contains("next") ? slide("increase") : slide("decrease");
  });
}); // function to slide when trail is clicked

var clickCheck = function clickCheck(e) {
  // CLear interval
  clearInterval(start); // remove active class from all trails

  trail.forEach(function (cur) {
    return cur.classList.remove("active");
  }); // Get selected trail

  var check = e.target; // add active class

  check.classList.add("active"); // Update slide value based on the selected trail

  if (check.classList.contains("box1")) {
    value = 0;
  } else if (check.classList.contains("box2")) {
    value = 20;
  } else if (check.classList.contains("box3")) {
    value = 40;
  } else if (check.classList.contains("box4")) {
    value = 60;
  } else {
    value = 80;
  } // update trail based on value


  trailUpdate(); // transfrom slide

  move(value, trailValue); // start animation

  animate(); // start interval

  start = setInterval(function () {
    return slide("increase");
  }, interval);
}; // Add function to all trails


trail.forEach(function (cur) {
  return cur.addEventListener("click", function (ev) {
    return clickCheck(ev);
  });
}); // Mobile touch Slide Section

var touchSlide = function () {
  var start, move, change, sliderWidth; // Do this on initial touch on screen

  slider.addEventListener("touchstart", function (e) {
    // get the touche position of X on the screen
    start = e.touches[0].clientX; // (each slide with) the width of the slider container divided by the number of slides

    sliderWidth = slider.clientWidth / trail.length;
  }); // Do this on touchDrag on screen

  slider.addEventListener("touchmove", function (e) {
    // prevent default function
    e.preventDefault(); // get the touche position of X on the screen when dragging stops

    move = e.touches[0].clientX; // Subtract initial position from end position and save to change variabla

    change = start - move;
  });

  var mobile = function mobile(e) {
    // if change is greater than a quarter of sliderWidth, next else Do NOTHING
    change > sliderWidth / 4 ? slide("increase") : null; // if change * -1 is greater than a quarter of sliderWidth, prev else Do NOTHING

    change * -1 > sliderWidth / 4 ? slide("decrease") : null; // reset all variable to 0

    start = 0;
    move = 0;
    change = 0;
    sliderWidth = 0;
  }; // call mobile on touch end


  slider.addEventListener("touchend", mobile);
}();

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