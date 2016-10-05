(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("preact"));
	else if(typeof define === 'function' && define.amd)
		define(["preact"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("preact")) : factory(root["preact"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.Section = exports.Layout = undefined;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _preact = __webpack_require__(1);

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	function Layout(_ref) {
		var className = _ref.className;
		var recurse = _ref.recurse;
		var children = _ref.children;

		var props = _objectWithoutProperties(_ref, ['className', 'recurse', 'children']);

		if (recurse === undefined) recurse = 9;
		var sections = getSections(children);
		var main = sections.filter(function (s) {
			return !s.attributes || !s.attributes.type;
		})[0];
		sections = sections.filter(function (s) {
			return s.attributes && s.attributes.type;
		});
		var contributions = {};
		sections.forEach(function (s) {
			return contributions[s.attributes.type] = s.children || [];
		});
		if (main && main.children) {
			main.children = collect(main.children, sections, contributions, recurse);
			sections.forEach(function (s) {
				var contribution = contributions[s.attributes.type];
				s.children = contributions[s.attributes.type];
			});
		}
		return children && children.length === 1 ? children[0] : (0, _preact.h)(
			'div',
			{ className: className || 'Layout' },
			children
		);
	}

	function Section(_ref2) {
		var type = _ref2.type;
		var children = _ref2.children;

		var props = _objectWithoutProperties(_ref2, ['type', 'children']);

		return children && children.length === 1 ? children[0] : (0, _preact.h)(
			'div',
			props,
			children
		);
	}

	function getSections(nodes) {
		var results = [];
		nodes && nodes.forEach(function (n) {
			if (n.nodeName === Section) results.push(n);
			results.push.apply(results, getSections(n.children));
		});
		return results;
	}

	function collect(nodes, sections, results, recurse) {
		var leftovers = [];
		nodes && nodes.forEach(function (n) {
			if (isContribution(n, sections)) {
				if (!results[n.nodeName]) results[n.nodeName] = [];
				var contributions = n.children || [];
				if (n.attributes && n.attributes.append) results[n.nodeName].push.apply(results[n.nodeName], contributions);else if (n.attributes && n.attributes.prepend) results[n.nodeName].unshift.apply(results[n.nodeName], contributions);else results[n.nodeName] = contributions;
				return;
			}
			if (typeof n.nodeName == 'function' && recurse) {
				n = n.nodeName(_extends({}, n.attributes, { children: n.children }));
				recurse--;
			}
			leftovers.push(n);
			if (n && n.children) n.children = collect(n.children, sections, results, recurse);
		});
		return leftovers;
	}

	function isContribution(n, sections) {
		var filtered = sections.filter(function (s) {
			return n.nodeName === s.attributes.type;
		});
		return filtered.length > 0;
	}

	exports.Layout = Layout;
	exports.Section = Section;

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }
/******/ ])
});
;