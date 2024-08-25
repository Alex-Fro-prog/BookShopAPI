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

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modules_slider_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/slider.js */ \"./src/modules/slider.js\");\n/* harmony import */ var _modules_books_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/books.js */ \"./src/modules/books.js\");\n/* harmony import */ var _modules_cart_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/cart.js */ \"./src/modules/cart.js\");\n\r\n\r\n\r\n\r\ndocument.addEventListener('DOMContentLoaded', () => {\r\n    const slider = new _modules_slider_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](\".slides\", \".dot\");\r\n    const apiKey = 'AIzaSyDCtBCcZhy9dRhgG4_lSgmflPuuzmXT25s';\r\n    const books = new _modules_books_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"](apiKey, '#books-container', '#load-more', 'https://via.placeholder.com/212x300?text=No+Cover');\r\n    (0,_modules_cart_js__WEBPACK_IMPORTED_MODULE_2__.updateCartCount)();\r\n\r\n    document.querySelectorAll('.dot').forEach((dot, index) => {\r\n        dot.addEventListener('click', () => {\r\n            slider.currentSlide(index);\r\n        });\r\n    });\r\n});\r\n\n\n//# sourceURL=webpack://bookshop/./src/main.js?");

/***/ }),

/***/ "./src/modules/books.js":
/*!******************************!*\
  !*** ./src/modules/books.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _cart_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cart.js */ \"./src/modules/cart.js\");\n\r\n\r\nclass Books {\r\n    constructor(apiKey, booksContainerSelector, loadMoreButtonSelector, placeholderImage) {\r\n        this.apiKey = apiKey;\r\n        this.booksContainer = document.querySelector(booksContainerSelector);\r\n        this.loadMoreButton = document.querySelector(loadMoreButtonSelector);\r\n        this.placeholderImage = placeholderImage;\r\n        this.currentCategory = 'Architecture';\r\n        this.startIndex = 0;\r\n        this.maxResults = 6;\r\n        this.init();\r\n    }\r\n\r\n    init() {\r\n        this.loadBooks(this.currentCategory, this.startIndex);\r\n        this.loadMoreButton.addEventListener('click', () => {\r\n            this.startIndex += this.maxResults;\r\n            this.loadBooks(this.currentCategory, this.startIndex);\r\n        });\r\n\r\n        document.querySelectorAll('.main__categories-item').forEach(item => {\r\n            item.addEventListener('click', () => {\r\n                this.setActiveCategory(item);\r\n            });\r\n        });\r\n    }\r\n\r\n    truncateText(text, maxLength) {\r\n        return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;\r\n    }\r\n\r\n    loadBooks(category, startIndex) {\r\n        fetch(`https://www.googleapis.com/books/v1/volumes?q=subject:${encodeURIComponent(category)}&key=${this.apiKey}&printType=books&startIndex=${startIndex}&maxResults=${this.maxResults}&langRestrict=en`)\r\n        .then(response => response.json())\r\n        .then(data => {\r\n            if (data.items && data.items.length > 0) {\r\n                data.items.forEach(book => this.renderBook(book));\r\n                this.loadMoreButton.style.display = 'block';\r\n            } else {\r\n                this.loadMoreButton.style.display = 'none';\r\n            }\r\n            this.updateButtonStates();\r\n        });\r\n    }\r\n\r\n    renderBook(book) {\r\n        const bookInfo = book.volumeInfo;\r\n        const bookElement = document.createElement('div');\r\n        bookElement.className = 'book-item';\r\n\r\n        const thumbnail = bookInfo.imageLinks?.thumbnail || this.placeholderImage;\r\n        const authors = bookInfo.authors ? bookInfo.authors.join(', ') : 'Unknown Author';\r\n        const title = bookInfo.title || 'No Title';\r\n        const description = this.truncateText(bookInfo.description || 'No description available', 100);\r\n        const rating = bookInfo.averageRating;\r\n        const ratingsCount = bookInfo.ratingsCount;\r\n        const price = book.saleInfo.listPrice ? `${book.saleInfo.listPrice.amount} ${book.saleInfo.listPrice.currencyCode}` : null;\r\n        const bookId = book.id;\r\n\r\n        bookElement.innerHTML = `\r\n            <div class=\"book-cover\">\r\n                <img src=\"${thumbnail}\" alt=\"${title}\">\r\n            </div>\r\n            <div class=\"book-details\">\r\n                <p class=\"book-authors\">${authors}</p>\r\n                <h3 class=\"book-title\">${title}</h3>\r\n                ${rating ? `<p class=\"book-rating\">${this.renderRating(rating)} ${ratingsCount} review</p>` : ''}\r\n                <p class=\"book-description\">${description}</p>\r\n                ${price ? `<p class=\"book-price\">${price}</p>` : ''}\r\n                <button class=\"book-button\" data-book-id=\"${bookId}\">Buy now</button>\r\n            </div>\r\n        `;\r\n\r\n        this.booksContainer.appendChild(bookElement);\r\n    }\r\n\r\n    renderRating(rating) {\r\n        return `${'<svg width=\"12\" height=\"11\" viewBox=\"0 0 12 11\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M6 0L7.80568 3.5147L11.7063 4.1459L8.92165 6.9493L9.52671 10.8541L6 9.072L2.47329 10.8541L3.07835 6.9493L0.293661 4.1459L4.19432 3.5147L6 0Z\" fill=\"#F2C94C\"/></svg>'.repeat(Math.round(rating))}${'<svg width=\"12\" height=\"11\" viewBox=\"0 0 12 11\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M6 0L7.80568 3.5147L11.7063 4.1459L8.92165 6.9493L9.52671 10.8541L6 9.072L2.47329 10.8541L3.07835 6.9493L0.293661 4.1459L4.19432 3.5147L6 0Z\" fill=\"#EEEDF5\"/></svg>'.repeat(5 - Math.round(rating))}`;\r\n    }\r\n\r\n    setActiveCategory(categoryElement) {\r\n        document.querySelectorAll('.main__categories-item').forEach(item => {\r\n            item.classList.remove('active');\r\n        });\r\n        categoryElement.classList.add('active');\r\n        this.currentCategory = categoryElement.textContent;\r\n        this.booksContainer.innerHTML = '';\r\n        this.startIndex = 0;\r\n        this.loadBooks(this.currentCategory, this.startIndex);\r\n    }\r\n\r\n    updateButtonStates() {\r\n        const cart = JSON.parse(localStorage.getItem('cart')) || [];\r\n\r\n        document.querySelectorAll('.book-button').forEach(button => {\r\n            const bookId = button.getAttribute('data-book-id');\r\n\r\n            if (cart.includes(bookId)) {\r\n                button.textContent = 'In the cart';\r\n                button.classList.add('in-cart');\r\n            } else {\r\n                button.textContent = 'Buy now';\r\n                button.classList.remove('in-cart');\r\n            }\r\n\r\n            button.addEventListener('click', () => {\r\n                this.toggleCartItem(button, bookId, cart);\r\n            });\r\n        });\r\n    }\r\n\r\n    toggleCartItem(button, bookId, cart) {\r\n        if (cart.includes(bookId)) {\r\n            const index = cart.indexOf(bookId);\r\n            if (index > -1) {\r\n                cart.splice(index, 1);\r\n            }\r\n            button.textContent = 'Buy now';\r\n            button.classList.remove('in-cart');\r\n        } else {\r\n            cart.push(bookId);\r\n            button.textContent = 'In the cart';\r\n            button.classList.add('in-cart');\r\n        }\r\n\r\n        localStorage.setItem('cart', JSON.stringify(cart));\r\n        (0,_cart_js__WEBPACK_IMPORTED_MODULE_0__.updateCartCount)();\r\n    }\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Books);\n\n//# sourceURL=webpack://bookshop/./src/modules/books.js?");

/***/ }),

/***/ "./src/modules/cart.js":
/*!*****************************!*\
  !*** ./src/modules/cart.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   updateCartCount: () => (/* binding */ updateCartCount)\n/* harmony export */ });\nfunction updateCartCount() {\r\n    const cart = JSON.parse(localStorage.getItem('cart')) || [];\r\n    const cartCount = document.getElementById('cart-count');\r\n    cartCount.textContent = cart.length;\r\n}\n\n//# sourceURL=webpack://bookshop/./src/modules/cart.js?");

/***/ }),

/***/ "./src/modules/slider.js":
/*!*******************************!*\
  !*** ./src/modules/slider.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nclass Slider {\r\n    constructor(slidesSelector, dotsSelector, interval = 5000) {\r\n        this.slideIndex = 0;\r\n        this.slides = document.querySelectorAll(slidesSelector);\r\n        this.dots = document.querySelectorAll(dotsSelector);\r\n        this.interval = interval;\r\n        this.timer = null;\r\n        this.init();\r\n    }\r\n\r\n    init() {\r\n        this.showSlide(this.slideIndex);\r\n        this.timer = setInterval(() => this.nextSlide(), this.interval);\r\n    }\r\n\r\n    showSlide(index) {\r\n        this.slides.forEach((slide, i) => {\r\n            slide.classList.remove(\"active\");\r\n            this.dots[i].classList.remove(\"active\");\r\n        });\r\n        this.slides[index].classList.add(\"active\");\r\n        this.dots[index].classList.add(\"active\");\r\n        this.slideIndex = index;\r\n    }\r\n\r\n    currentSlide(index) {\r\n        clearInterval(this.timer);\r\n        this.showSlide(index);\r\n        this.timer = setInterval(() => this.nextSlide(), this.interval);\r\n    }\r\n\r\n    nextSlide() {\r\n        this.slideIndex = (this.slideIndex + 1) % this.slides.length;\r\n        this.showSlide(this.slideIndex);\r\n    }\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Slider);\n\n//# sourceURL=webpack://bookshop/./src/modules/slider.js?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/main.js");
/******/ 	
/******/ })()
;