/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);
module.exports = __webpack_require__(3);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _helpers = __webpack_require__(2);

(function Notifications(window) {
	// Default notification options
	var defaultOptions = {
		closeOnClick: true,
		displayCloseButton: false,
		positionClass: 'nfc-top-right',
		onclick: false,
		showDuration: 3000,
		theme: 'success'
	};

	function configureOptions(options) {
		// Create a copy of options and merge with defaults
		options = Object.assign({}, defaultOptions, options);

		// Validate position class
		function validatePositionClass(className) {
			var validPositions = ['nfc-top-left', 'nfc-top-right', 'nfc-bottom-left', 'nfc-bottom-right'];

			return validPositions.indexOf(className) > -1;
		}

		// Verify position, if invalid reset to default
		if (!validatePositionClass(options.positionClass)) {
			console.warn('An invalid notification position class has been specified.');
			options.positionClass = defaultOptions.positionClass;
		}

		// Verify onClick is a function
		if (options.onclick && typeof options.onclick !== 'function') {
			console.warn('Notification on click must be a function.');
			options.onclick = defaultOptions.onclick;
		}

		return options;
	}

	// Create a new notification instance
	function createNotification(options) {
		// Validate options and set defaults
		options = configureOptions(options);

		// Return a notification function
		return function notification() {
			var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
			    title = _ref.title,
			    message = _ref.message;

			var container = createNotificationContainer(options.positionClass);

			if (!title && !message) {
				return console.warn('Notification must contain a title or a message!');
			}

			// Create the notification wrapper
			var notificationEl = (0, _helpers.createElement)('div', 'ncf', options.theme);

			// Close on click
			if (options.closeOnClick === true) {
				notificationEl.addEventListener('click', function () {
					return container.removeChild(notificationEl);
				});
			}

			// Custom click callback
			if (options.onclick) {
				notificationEl.addEventListener('click', function (e) {
					return options.onclick(e);
				});
			}

			// Display close button
			if (options.displayCloseButton) {
				var closeButton = (0, _helpers.createElement)('button');
				closeButton.innerText = 'X';

				// Use the wrappers close on click to avoid useless event listeners
				if (options.closeOnClick === false) {
					closeButton.addEventListener('click', function () {
						return container.removeChild(notificationEl);
					});
				}

				(0, _helpers.append)(notificationEl, closeButton);
			}

			// Append title and message
			(0, _helpers.isString)(title) && (0, _helpers.append)(notificationEl, (0, _helpers.createParagraph)('ncf-title')(title));
			(0, _helpers.isString)(message) && (0, _helpers.append)(notificationEl, (0, _helpers.createParagraph)('nfc-message')(message));

			// Append to container
			(0, _helpers.append)(container, notificationEl);

			// Remove element after duration
			if (options.showDuration) {
				var timeout = setTimeout(function () {
					container.removeChild(notificationEl);

					// Remove container if empty
					if (container.querySelectorAll('.ncf').length === 0) {
						document.body.removeChild(container);
					}
				}, options.showDuration);

				// If close on click is enabled and the user clicks, cancel timeout
				if (options.closeOnClick || options.displayCloseButton) {
					notificationEl.addEventListener('click', function () {
						return clearTimeout(timeout);
					});
				}
			}
		};
	}

	function createNotificationContainer(position) {
		var container = document.querySelector('.' + position);

		if (!container) {
			container = (0, _helpers.createElement)('div', position, 'ncf-container');
			(0, _helpers.append)(document.body, container);
		}

		return container;
	}

	// Add Notifications to window to make globally accessible
	if (window.createNotification) {
		console.warn('Window already contains a create notification function. Have you included the script twice?');
	} else {
		window.createNotification = createNotification;
	}
})(window);

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
var partial = exports.partial = function partial(fn) {
	for (var _len = arguments.length, presetArgs = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
		presetArgs[_key - 1] = arguments[_key];
	}

	return function () {
		for (var _len2 = arguments.length, laterArgs = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
			laterArgs[_key2] = arguments[_key2];
		}

		return fn.apply(undefined, presetArgs.concat(laterArgs));
	};
};

var append = exports.append = function append(el) {
	for (var _len3 = arguments.length, children = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
		children[_key3 - 1] = arguments[_key3];
	}

	return children.forEach(function (child) {
		return el.appendChild(child);
	});
};

var isString = exports.isString = function isString(input) {
	return typeof input === 'string';
};

var createElement = exports.createElement = function createElement(elementType) {
	for (var _len4 = arguments.length, classNames = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
		classNames[_key4 - 1] = arguments[_key4];
	}

	var element = document.createElement(elementType);

	if (classNames.length) {
		var _element$classList;

		(_element$classList = element.classList).add.apply(_element$classList, classNames);
	}

	return element;
};

var setInnerText = function setInnerText(element, text) {
	element.innerText = text;
	return element;
};

var createTextElement = function createTextElement(elementType) {
	for (var _len5 = arguments.length, classNames = Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
		classNames[_key5 - 1] = arguments[_key5];
	}

	return partial(setInnerText, createElement.apply(undefined, [elementType].concat(classNames)));
};

var createParagraph = exports.createParagraph = function createParagraph() {
	for (var _len6 = arguments.length, classNames = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
		classNames[_key6] = arguments[_key6];
	}

	return createTextElement.apply(undefined, ['p'].concat(classNames));
};

/***/ }),
/* 3 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);