/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/api.js":
/*!********************!*\
  !*** ./src/api.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst api = (() => {\n  async function getCityData(query) {\n    try {\n      const response = await fetch(\n        `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=c93fd1817f3fbe42aeac0a63076603b9`,\n        { mode: 'cors' },\n      );\n      const data = await response.json();\n      const { coord } = data;\n      const city = data.name;\n      const { country } = data.sys;\n      return { coord, city, country };\n    } catch (error) {\n      return console.error(error);\n    }\n  }\n\n  async function getForecastData(coord, units = 'metric') {\n    try {\n      const response = await fetch(\n        `https://api.openweathermap.org/data/2.5/onecall?lat=${coord.lat}&lon=${coord.lon}&exclude=alerts,minutely&units=${units}&appid=c93fd1817f3fbe42aeac0a63076603b9`,\n        { mode: 'cors' },\n      );\n      const data = await response.json();\n      return data;\n    } catch (error) {\n      return console.error(error);\n    }\n  }\n\n  async function getData(query) {\n    const cityData = await getCityData(query);\n    const forecastData = await getForecastData(cityData.coord);\n    const data = {\n      city: cityData.city,\n      country: cityData.country,\n      coord: cityData.coord,\n      current: {\n        temp: forecastData.current.temp,\n        feelsLike: forecastData.current.feels_like,\n        weatherId: forecastData.current.weather[0].id,\n        tempDescription: forecastData.current.weather[0].description,\n        windSpeed: forecastData.current.wind_speed,\n        windDegree: forecastData.current.wind_deg,\n        chanceOfRain: forecastData.daily[0].pop,\n        humidity: forecastData.current.humidity,\n        dateAndTime: new Date(),\n        sunriseTime: forecastData.current.sunrise,\n        sunsetTime: forecastData.current.sunset,\n      },\n      daily: [],\n      hourly: [],\n    };\n\n    for (let i = 0; i < 7; i += 1) {\n      data.daily[i] = {\n        dayTemp: forecastData.daily[i].temp.day,\n        nightTemp: forecastData.daily[i].temp.night,\n        weatherId: forecastData.daily[i].weather[0].id,\n        tempDescription: forecastData.daily[i].weather[0].description,\n        windSpeed: forecastData.daily[i].wind_speed,\n        windGust: forecastData.daily[i].wind_gust,\n        windDegree: forecastData.daily[i].wind_deg,\n      };\n    }\n\n    for (let j = 0; j < 24; j += 1) {\n      data.hourly[j] = {\n        temp: forecastData.hourly[j].temp,\n        weatherId: forecastData.hourly[j].weather[0].id,\n        tempDescription: forecastData.hourly[j].weather[0].description,\n        windSpeed: forecastData.hourly[j].wind_speed,\n        windGust: forecastData.hourly[j].wind_gust,\n        windDegree: forecastData.hourly[j].wind_deg,\n      };\n    }\n\n    return data;\n  }\n\n  return {\n    getData,\n  };\n})();\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (api);\n\n\n//# sourceURL=webpack://weather-app/./src/api.js?");

/***/ }),

/***/ "./src/dom.js":
/*!********************!*\
  !*** ./src/dom.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api */ \"./src/api.js\");\n\n\nconst dom = (() => {\n  function renderForecast(query) {\n    _api__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getData(query)\n      .then((response) => {\n        console.log(response);\n      });\n  }\n\n  return {\n    renderForecast,\n  };\n})();\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (dom);\n\n\n//# sourceURL=webpack://weather-app/./src/dom.js?");

/***/ }),

/***/ "./src/handlers.js":
/*!*************************!*\
  !*** ./src/handlers.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom */ \"./src/dom.js\");\n\n\nconst handlers = (() => {\n  const searchSubmit = document.querySelector('.search-submit');\n  const searchInput = document.querySelector('.search-input');\n\n  function clickHandler() {\n    searchSubmit.addEventListener('click', () => {\n      _dom__WEBPACK_IMPORTED_MODULE_0__[\"default\"].renderForecast(searchInput.value);\n    });\n  }\n\n  return {\n    clickHandler,\n  };\n})();\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (handlers);\n\n\n//# sourceURL=webpack://weather-app/./src/handlers.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _handlers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./handlers */ \"./src/handlers.js\");\n\n\n_handlers__WEBPACK_IMPORTED_MODULE_0__[\"default\"].clickHandler();\n\n\n//# sourceURL=webpack://weather-app/./src/index.js?");

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
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
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
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;