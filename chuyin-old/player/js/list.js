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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Created by Administrator on 2017/5/2.
 */
var Tool = function (win) {
    var Tool = {};
    /**
     * 操作数据到sessionstorage
     * */
    Tool.dataToSessionStorageOperate = {
        /**存储*/
        save: function save(data_name, data_value) {
            if (typeof data_name != 'undefined' && typeof data_value != 'undefined') sessionStorage.setItem(data_name, JSON.stringify(data_value));
        },
        /**取出*/
        achieve: function achieve(data_name) {
            var data_value = sessionStorage.getItem(data_name);
            data_value && (data_value = JSON.parse(data_value));
            return data_value;
        },
        /**删除*/
        remove: function remove(data_name) {
            if (data_name) sessionStorage.removeItem(data_name);
        },
        /**清空*/
        clear: function clear() {
            sessionStorage.clear();
        }
    };
    /**
     * 操作数据到localstorage
     * */
    Tool.dataToLocalStorageOperate = {
        /**存储*/
        save: function save(data_name, data_value) {
            if (typeof data_name != 'undefined' && typeof data_value != 'undefined') localStorage.setItem(data_name, JSON.stringify(data_value));
        },
        /**取出*/
        achieve: function achieve(data_name) {
            var data_value = localStorage.getItem(data_name);
            data_value && (data_value = JSON.parse(data_value));
            return data_value;
        },
        /**删除*/
        remove: function remove(data_name) {
            if (data_name) localStorage.removeItem(data_name);
        },
        /**清空*/
        clear: function clear() {
            localStorage.clear();
        }
    };

    Tool.findFirstIndexForArr = function () {
        var arr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
        var filter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};

        var index = -1;
        arr.forEach(function (item, i) {
            if (typeof filter === 'function' && filter(item)) return index = i;
            if (typeof filter !== 'function' && item === filter) return index = i;
        });
        return index;
    };

    Tool.findFirstIndexForArr = function () {
        var arr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
        var filter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};

        var index = -1;
        arr.forEach(function (item, i) {
            if (typeof filter === 'function' && filter(item)) return index = i;
            if (typeof filter !== 'function' && item === filter) return index = i;
        });
        return index;
    };

    return Tool;
}(window);
exports.default = Tool;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(2);

__webpack_require__(3);

/***/ }),
/* 2 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _store = __webpack_require__(0);

var _store2 = _interopRequireDefault(_store);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

$(function () {

    var arr = getMusicList();

    var MusicResourcesController = {
        key: 'MUSIC_LIST',
        $el: $('.main-music'),
        $el1: $('.music-listbox'),
        $el2: $('.banner-ctr'),
        el: '.a3',
        el1: '.a4',
        el2: '.player-icon',
        el3: '.player-add-list',
        total: [],
        list: [],
        init: function init(total, list) {
            this.total = total;
            this.getList(list);
            this.addMonitorEvent();
        },

        // 歌曲事件监听
        addMonitorEvent: function addMonitorEvent() {
            var that = this;
            // 添加歌曲
            this.$el.on('click', this.el, function (e) {
                if (!checkLogin()) {
                    systemTip('您还没有登录哦！', 'javascript:toLogin();');
                    return;
                }
                var wId = $(this).attr('wId');
                var result = addPlayList(wId, 2);

                if (result.code == 0) {
                    var arr = getMusicList();
                    that.saveList(arr);
                    alert('添加成功');
                } else {
                    alert(result.msg);
                }
            });

            //播放歌曲
            this.$el.on('click', this.el1, function (e) {
                if (!checkLogin()) {
                    systemTip('您还没有登录哦！', 'javascript:toLogin();');
                    return;
                }
                var wId = $(this).attr('wId');
                var result = addPlayList(wId, 1);
                var arr = getMusicList();
                var baseWId = window.btoa(wId);
                viewaddscore(3,baseWId);
                view(3,baseWId);
                that.saveList(arr);
                if (!_store2.default.dataToLocalStorageOperate.achieve('IS_OPEN')) {
                    _store2.default.dataToLocalStorageOperate.save('IS_OPEN', true);
                    window.open('/player/view/player.html');
                }
            });

            // 添加歌曲
            this.$el1.on('click', this.el, function (e) {
                if (!checkLogin()) {
                    systemTip('您还没有登录哦！', 'javascript:toLogin();');
                    return;
                }
                var wId = $(this).attr('wId');
                var result = addPlayList(wId, 2);
                if (result.code == 0) {
                    var arr = getMusicList();
                    that.saveList(arr);
                    alert('添加成功');
                } else {
                    alert(result.msg);
                }
            });

            //播放歌曲
            this.$el1.on('click', this.el1, function (e) {
                if (!checkLogin()) {
                    systemTip('您还没有登录哦！', 'javascript:toLogin();');
                    return;
                }
                var wId = $(this).attr('wId');
                var result = addPlayList(wId, 1);
                var arr = getMusicList();
                that.saveList(arr);
                var baseWId = window.btoa(wId);
                viewaddscore(3,baseWId);
                view(3,baseWId);
                if (!_store2.default.dataToLocalStorageOperate.achieve('IS_OPEN')) {
                    _store2.default.dataToLocalStorageOperate.save('IS_OPEN', true);
                    window.open('/player/view/player.html');
                }
            });



            // 添加歌曲
            this.$el2.on('click', this.el3, function (e) {
                if (!checkLogin()) {
                    systemTip('您还没有登录哦！', 'javascript:toLogin();');
                    return;
                }
                var wId = queryString('id');
                wId = window.atob(wId);
                var result = addPlayList(wId, 2);
                if (result.code == 0) {
                    var arr = getMusicList();
                    that.saveList(arr);
                    alert('添加成功');
                } else {
                    alert(result.msg);
                }
            });

            //播放歌曲
            this.$el2.on('click', this.el2, function (e) {
                if (!checkLogin()) {
                    systemTip('您还没有登录哦！', 'javascript:toLogin();');
                    return;
                }
                var wId = queryString('id');
                wId = window.atob(wId);
                var result = addPlayList(wId, 1);
                var arr = getMusicList();
                that.saveList(arr);
                var baseWId = window.btoa(wId);
                viewaddscore(3,baseWId);
                view(3,baseWId);
                if (!_store2.default.dataToLocalStorageOperate.achieve('IS_OPEN')) {
                    _store2.default.dataToLocalStorageOperate.save('IS_OPEN', true);
                    window.open('/player/view/player.html');
                }
            });


            return this;
        },
        getList: function getList(list) {
            this.list = list || _store2.default.dataToLocalStorageOperate.achieve(this.key) || [];
            return this.list;
        },
        addMusic: function addMusic(music) {
            var index = this.findMusic(music);
            if (index !== -1) {
                this.list.splice(index, 1);
            }
            this.list.unshift(music);
            this.saveList();
            if (!_store2.default.dataToLocalStorageOperate.achieve('IS_OPEN')) {
                _store2.default.dataToLocalStorageOperate.save('IS_OPEN', true);
                window.open('player.html');
            }
            return this;
        },
        saveList: function saveList(list) {
            if (list) this.list = list;
            _store2.default.dataToLocalStorageOperate.save(this.key, this.list);
        },
        findMusic: function findMusic(music) {
            this.getList();
            var cur_index = _store2.default.findFirstIndexForArr(this.list, function (item, index) {
                return item.id === music.id;
            });
            return cur_index;
        },
        removeMusic: function removeMusic(music) {
            var index = this.findMusic(music);
            index !== -1 && this.list.splice(index, 1);
            this.saveList();
            return this;
        }
    };
    MusicResourcesController.init(arr);
}());

/***/ })
/******/ ]);