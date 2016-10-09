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
	exports.processNode = exports.isContribution = exports.getSections = exports.Section = exports.Layout = undefined;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _preact = __webpack_require__(1);

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	function Layout(_ref, context) {
		var className = _ref.className;
		var recurse = _ref.recurse;
		var children = _ref.children;

		var props = _objectWithoutProperties(_ref, ['className', 'recurse', 'children']);

		var _getSections = getSections(children);

		var main = _getSections.main;
		var sections = _getSections.sections;

		processNode(main, sections, _extends({}, context), recurse);
		return children && children.length === 1 ? children[0] : (0, _preact.h)(
			'div',
			{ className: className || 'Layout' },
			children
		);
	}

	function Section(_ref2, context) {
		var type = _ref2.type;
		var children = _ref2.children;

		var props = _objectWithoutProperties(_ref2, ['type', 'children']);

		return children && children.length === 1 ? children[0] : (0, _preact.h)(
			'div',
			props,
			children
		);
	}

	function getSections(n, result) {
		if (!result) result = { sections: [] };
		if (n.nodeName === Section) {
			if (n.attributes && n.attributes.type) result.sections.push(n);else result.main = n;
		}
		var children = Array.isArray(n) ? n : n.children;
		children && children.forEach(function (c) {
			getSections(c, result);
		});
		return result;
	}

	function processNode(node, sections, context, recurse, collectOnly, results) {
		var leftovers = [],
		    postProcess = !results;
		context = context || {};
		if (recurse === undefined) recurse = 9;
		results = results || {};
		sections.forEach(function (s) {
			return results[s.attributes.type] = results[s.attributes.type] || s.children || [];
		});
		node && node.children && node.children.forEach(function (n) {
			if (isContribution(n, sections)) {
				if (!results[n.nodeName]) results[n.nodeName] = [];
				if (n.attributes && n.attributes.append) results[n.nodeName].push.apply(results[n.nodeName], n.children || []);else if (n.attributes && n.attributes.prepend) results[n.nodeName].unshift.apply(results[n.nodeName], n.children || []);else results[n.nodeName] = n.children || [];
				return; // continue
			}
			leftovers.push(n);
			if (typeof n.nodeName == 'function' && recurse) {
				var props = _extends({}, n.nodeName.defaultProps, n.attributes, { children: n.children });
				if (n.nodeName.prototype && typeof n.nodeName.prototype.render == 'function') {
					var rn = void 0,
					    c = new n.nodeName(props, context);
					c.props = props;
					c.context = context;
					if (c.componentWillMount) c.componentWillMount();
					n = c.render(c.props, c.state, c.context);
					if (c.getChildContext) context = _extends({}, context, c.getChildContext());
				} else n = n.nodeName(props, context);
				recurse--;
			}
			processNode(n, sections, context, recurse, collectOnly, results);
		});
		if (!collectOnly) {
			if (node.children) node.children = leftovers;
			if (postProcess) sections.forEach(function (s) {
				return s.children = results[s.attributes.type];
			});
		}
		return results;
	}

	function isContribution(n, sections) {
		return sections.filter(function (s) {
			return n.nodeName === s.attributes.type;
		}).length > 0;
	}

	exports.Layout = Layout;
	exports.Section = Section;
	exports.getSections = getSections;
	exports.isContribution = isContribution;
	exports.processNode = processNode;

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }
/******/ ])
});
;