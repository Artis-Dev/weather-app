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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst api = (() => {\n  async function processData(data) {\n    const { locationData, forecastData } = data;\n    const processedData = {\n      city: locationData.name,\n      country: locationData.sys.country,\n      coord: locationData.coord,\n      current: {\n        temp: forecastData.current.temp,\n        feelsLike: forecastData.current.feels_like,\n        icon: forecastData.current.weather[0].icon,\n        tempDescription: forecastData.current.weather[0].description,\n        windSpeed: forecastData.current.wind_speed,\n        windDegree: forecastData.current.wind_deg,\n        chanceOfRain: forecastData.daily[0].pop,\n        humidity: forecastData.current.humidity,\n        dateAndTime: new Date(),\n        sunriseTime: forecastData.current.sunrise,\n        sunsetTime: forecastData.current.sunset,\n      },\n      daily: [],\n      hourly: [],\n    };\n\n    for (let i = 0; i < 7; i += 1) {\n      processedData.daily[i] = {\n        dayTemp: forecastData.daily[i].temp.day,\n        nightTemp: forecastData.daily[i].temp.night,\n        weatherId: forecastData.daily[i].weather[0].id,\n        tempDescription: forecastData.daily[i].weather[0].description,\n        windSpeed: forecastData.daily[i].wind_speed,\n        windGust: forecastData.daily[i].wind_gust,\n        windDegree: forecastData.daily[i].wind_deg,\n      };\n    }\n\n    for (let j = 0; j < 24; j += 1) {\n      processedData.hourly[j] = {\n        temp: forecastData.hourly[j].temp,\n        weatherId: forecastData.hourly[j].weather[0].id,\n        tempDescription: forecastData.hourly[j].weather[0].description,\n        windSpeed: forecastData.hourly[j].wind_speed,\n        windGust: forecastData.hourly[j].wind_gust,\n        windDegree: forecastData.hourly[j].wind_deg,\n      };\n    }\n\n    return processedData;\n  }\n\n  async function getForecastData(locationData, units = 'metric') {\n    const { coord } = locationData;\n    try {\n      const response = await fetch(\n        `https://api.openweathermap.org/data/2.5/onecall?lat=${coord.lat}&lon=${coord.lon}&exclude=alerts,minutely&units=${units}&appid=c93fd1817f3fbe42aeac0a63076603b9`,\n        { mode: 'cors' },\n      );\n      const forecastData = await response.json();\n      return processData({ locationData, forecastData });\n    } catch (error) {\n      return console.error(error);\n    }\n  }\n\n  async function getLocData(query) {\n    try {\n      const response = await fetch(\n        `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=c93fd1817f3fbe42aeac0a63076603b9`,\n        { mode: 'cors' },\n      );\n      const locData = await response.json();\n\n      if (response.status >= 400) {\n        console.log('Error: ', locData);\n        return locData;\n      }\n      return getForecastData(locData);\n    } catch (error) {\n      return console.error(error);\n    }\n  }\n\n  return {\n    getLocData,\n  };\n})();\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (api);\n\n\n//# sourceURL=webpack://weather-app/./src/api.js?");

/***/ }),

/***/ "./src/dom.js":
/*!********************!*\
  !*** ./src/dom.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst dom = (() => {\n  function convertIcon(iconId) {\n    switch (iconId) {\n      case '01d':\n        return 'fa-sun';\n      case '01n':\n        return 'fa-moon-stars';\n      case '02d':\n        return 'fa-cloud-sun';\n      case '02n':\n        return 'fa-cloud-moon';\n      case '03d':\n        return 'fa-clouds-sun';\n      case '03n':\n        return 'fa-clouds-moon';\n      case '04d':\n      case '04n':\n        return 'fa-clouds';\n      case '09d':\n      case '09n':\n        return 'fa-cloud-showers-heavy';\n      case '10d':\n        return 'fa-cloud-sun-rain';\n      case '10n':\n        return 'fa-cloud-moon-rain';\n      case '11d':\n      case '11n':\n        return 'fa-thunderstorm';\n      case '13d':\n      case '13n':\n        return 'fa-cloud-snow';\n      case '50d':\n      case '50n':\n        return 'fa-fog';\n      default:\n    }\n    return false;\n  }\n\n  function renderForecast(data) {\n    const headingCity = document.querySelector('.data-city');\n    const headingCountry = document.querySelector('.data-country');\n    const headingCurrentTemp = document.querySelector('.data-temp');\n    const headingWindSpeed = document.querySelector('.data-wind-speed');\n    const infoCoordLon = document.querySelector('.data-coord-lon');\n    const infoCoordLat = document.querySelector('.data-coord-lat');\n    const infoFeelsLike = document.querySelector('.data-feels-like');\n    const infoTempDesc = document.querySelector('.data-temp-desc');\n    const iconCurrentTemp = document.querySelector('.icon-current-temp');\n\n    const {\n      city, country, coord, current,\n    } = data;\n\n    headingCity.textContent = city;\n    headingCountry.textContent = country;\n    headingCurrentTemp.textContent = Math.round(current.temp);\n    headingWindSpeed.textContent = Math.round(current.windSpeed);\n\n    infoCoordLon.textContent = coord.lon;\n    infoCoordLat.textContent = coord.lat;\n    infoFeelsLike.textContent = Math.round(current.feelsLike);\n    infoTempDesc.textContent = current.tempDescription.charAt(0).toUpperCase()\n      + current.tempDescription.slice(1);\n\n    iconCurrentTemp.className = '';\n    iconCurrentTemp.className = `big-icon icon-current-temp far ${convertIcon(current.icon)}`;\n\n    console.log(data);\n  }\n\n  return {\n    renderForecast,\n  };\n})();\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (dom);\n\n\n//# sourceURL=webpack://weather-app/./src/dom.js?");

/***/ }),

/***/ "./src/handlers.js":
/*!*************************!*\
  !*** ./src/handlers.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom */ \"./src/dom.js\");\n/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./api */ \"./src/api.js\");\n\n\n\nconst handlers = (() => {\n  const searchSubmit = document.querySelector('.search-submit');\n  const searchInput = document.querySelector('.search-input');\n\n  function clickHandler() {\n    searchSubmit.addEventListener('click', async (e) => {\n      e.preventDefault();\n      const weatherData = await _api__WEBPACK_IMPORTED_MODULE_1__[\"default\"].getLocData(searchInput.value);\n      _dom__WEBPACK_IMPORTED_MODULE_0__[\"default\"].renderForecast(weatherData);\n    });\n  }\n\n  return {\n    clickHandler,\n  };\n})();\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (handlers);\n\n\n//# sourceURL=webpack://weather-app/./src/handlers.js?");

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