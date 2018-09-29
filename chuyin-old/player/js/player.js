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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
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
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(5);

__webpack_require__(6);

/***/ }),
/* 5 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _store = __webpack_require__(0);

var _store2 = _interopRequireDefault(_store);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } } // import { formatData } from 'wow-cool/lib/date.lib'


$(function () {

    // 音乐列表控制器
    var MusicListController = {
        $el: $('#music-wrap'),
        $el_list: $('#music-list'),
        $el_all: $('#check-all'),
        $el_title: $('#music-title'),
        $el_src: $('#music-pic-image'),
        $el_delete: $('#list-delete'),
        list: [],
        // 初始化
        init: function init(list, index) {
            this.innerHTML(list, index);
            this.addMonitorEvent();
            return this;
        },
        innerHTML: function innerHTML(list, index) {
            var str = '';
            this.list = list || [];
            list.forEach(function (item, i) {
                str += '<li class="list-item ' + (i === index ? 'active' : '') + '" data-index="' + i + '" wId="' + item.id + '">\n                            <div class="list-item-part check">\n                                <div class="check-box">\n                                    <div class="check-inner"></div>\n                                </div>\n                                <span class="check-box-prompt icon"></span>\n                                <span class="check-box-prompt index">' + (i + 1) + '</span>\n                            </div>\n                            <div class="list-item-part name">' + item.title + '</div>\n                            <div class="list-item-part author">' + item.author + '</div>\n                            <div class="list-item-part time">' + formatTime(+item.duration) + '</div>\n                        </li>';
            });
            this.$el_list.html(str);
            this.innerLrc(index);
            return this;
        },

        // 渲染歌词
        innerLrc: function innerLrc(index) {
            var music = this.list[index];
            if (music) {
                // let lrc =
            }
            return this;
        },

        // 歌曲事件监听
        addMonitorEvent: function addMonitorEvent() {
            var that = this;
            // 选取播放歌曲
            this.$el.on('click', '.name', function (e) {
                var index = $(this).parent('.list-item').data('index');
                MusicPlayerController.play(index);
                that.handleSwitchItem(index);
            }).on('click', '.check-box', function (e) {
                that.handleCheck($(this));
                that.judgeCheck();
                e.stopPropagation();
            }).on('click', '#check-all', function (e) {
                if (!that.list.length) return;
                that.handleCheckAll($(this));
                that.judgeCheck();
            }).on('click', '#list-delete', function (e) {
                that.handleDelete();
            });
            return this;
        },

        // 删除
        handleDelete: function handleDelete() {
            var arr = [];
            var that = this;
            var wIdArr = [];
            this.$el_list.find('.list-item').each(function () {
                var check = $(this).find('.check-box').hasClass('active');
                if (check) {
                    var index = $(this).data('index');
                    arr.push(that.list[index]);

                    var wId = $(this).attr('wId');
                    wIdArr.push(wId);
                }
            });
            removeMusicList(wIdArr);
            this.$el_all.hasClass('active') && this.handleCheck(this.$el_all);
            this.$el_delete.hide();
            this.$el_src.hide();
            this.$el_title.text('');
            MusicResourcesController.remove(arr).restart();
        },

        // 选中
        handleCheck: function handleCheck(el) {
            el.toggleClass('active');
        },

        // 切换选中歌曲
        handleSwitchItem: function handleSwitchItem(i) {
            $('.list-item').each(function (index, item) {
                if (i === index) {
                    $(item).addClass('active');
                } else {
                    $(item).removeClass('active');
                }
            });
            var music = this.list[i];
            this.$el_title.text(music.title);
            this.$el_src.show();
            this.$el_src.prop('src', music.src);
            return this;
        },

        // 判断是否选中
        judgeCheck: function judgeCheck() {
            var all_check = true;
            var check = false;
            $('#music-wrap .check-box').each(function (index, item) {
                var type = $(this).hasClass('active');
                if (type) check = true;
                if (!type) all_check = false;
            });
            if (all_check) {
                this.$el_all.addClass('active');
            } else {
                this.$el_all.removeClass('active');
            }
            if (check) {
                this.$el_delete.show();
            } else {
                this.$el_delete.hide();
            }
        },

        // 选中全部
        handleCheckAll: function handleCheckAll() {
            var type = this.$el_all.hasClass('active');
            if (!type) {
                $('#music-list .check-box').addClass('active');
            } else {
                $('#music-list .check-box').removeClass('active');
            }
        },

        // 切换
        channelCheckHandle: function channelCheckHandle(el) {
            var type = el.hasClass('active');
            if (!type) {
                el.addClass('active');
            } else {
                el.removeClass('active');
            }
            return !type;
        }
    };

    // 音乐播放控制器
    var MusicPlayerController = {
        $el: $('#player-warp'),
        $el_player: $('#player'),
        $el_play: $('#play-ctr'),
        $el_title: $('.play-music-title'),
        list: null,
        music: null,
        mode: 0,
        init: function init(list) {
            var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

            this.list = list;
            this.index = index;
            this.addMonitorEvent();
            var that = this;
            var options = {
                error: function error() {
                    if (that.list.length === 0) return;
                    that.handleNext('next');
                },
                supplied: 'mp3',
                wmode: 'window'
            };
            // if (this.list.length) {
            //     options.ready = function () {
            //         that.play(that.index);
            //     }
            // }
            $('#player').jPlayer(options);
            this.lrc_list = $('#lrc_list').jScrollPane({
                autoReinitialise: false
            });
            return this;
        },
        setList: function setList(list) {
            this.list = list;
            return this;
        },
        getCurMusic: function getCurMusic() {
            return this.music;
        },
        setCurIndex: function setCurIndex(index) {
            this.index = index;
            return this;
        },
        getCurIndex: function getCurIndex() {
            return this.index;
        },
        play: function play(index) {
            this.index = index;
            var music = this.list[this.index];
            if (music) {
                this.music = music;
                this.$el_player.jPlayer('setMedia', {
                    mp3: music.file
                }).jPlayer('play');
                this.lrcStart(music);
                this.$el_title.text(music.title);
                MusicListController.handleSwitchItem(index);
                this.$el_play.addClass('play').removeClass('pause');
            } else {
                $('#lrc_list').html('');
                this.$el_player.jPlayer('stop');
                this.$el_title.text('');
                $('.play-music-time').text('——/——');
                this.$el_play.addClass('pause').removeClass('play');
            }
            return this;
        },
        lrcStart: function lrcStart(music) {
            var that = this;
            if (music.lrc) {
                $.get(music.lrc + '?t=' + new Date().getTime(), function (data, status) {
                    if (status !== 'success') {
                        $('.jspPane').html(' <p>获取歌词失败</p>');
                        var refreshApi = that.lrc_list.data("jsp");
                        //重新加载刷新滚动条
                        refreshApi.reinitialise({
                            autoReinitialise: false
                        });
                        return;
                    } else {
                        that.lrcInner(data);
                    }
                });
            } else {
                $('.jspPane').html(' <p>暂无歌词</p>');
                var refreshApi = this.lrc_list.data("jsp");
                //重新加载刷新滚动条
                refreshApi.reinitialise({
                    autoReinitialise: false
                });
            }
        },
        lrcInner: function lrcInner(txt) {
            if (typeof txt !== 'string' || txt.length < 1) return;
            console.log(11);
            try {
                var item = null,
                    item_time = null,
                    html = '',
                    list = [];
                /* 分析歌词的时间轴和内容 */
                txt = txt.split("\n");
                for (var i = 0; i < txt.length; i++) {
                    item = txt[i].replace(/^\s+|\s+$/, '');
                    if (item.length < 1 || !(item = /^[^\[]*((?:\s*\[\d+\:\d+(?:\.\d+)?\])+)([\s\S]*)$/.exec(item))) continue;
                    list.push(item[2]);
                }
                list.forEach(function (item, index) {
                    html += '<p>' + item + '</p>';
                });
                $('.jspPane').html(html);
                var refreshApi = this.lrc_list.data("jsp");
                //重新加载刷新滚动条
                refreshApi.reinitialise({
                    autoReinitialise: false
                });
            } catch (e) {
                $('#lrc_list').html(' <p>解析歌词失败</p>');
            }
        },
        addMonitorEvent: function addMonitorEvent() {
            var that = this;
            this.$el.on('click', '#play-ctr', function (e) {
                that.handlePlayOrPause($(this));
            }).on('click', '.play-bar-inner', function (e) {
                if (that.list[that.index]) {
                    var progress = that.handleProgress(this, e);
                    $('#player').jPlayer('play', that.list[that.index].duration * progress);
                    that.$el_play.addClass('play').removeClass('pause');
                }
            }).on('click', '.play-volume-inner', function (e) {
                var progress = that.handleProgress(this, e);
                $('#player').jPlayer('volume', progress);
            }).on('click', '.up', function (e) {
                that.handleNext();
            }).on('click', '.down', function (e) {
                that.handleNext('next');
            }).on('click', '#play-mode', function (e) {
                that.handleSetMode($(this));
            });
            this.$el_player.bind($.jPlayer.event.ended, function (e) {
                that.handleNext('next');
            });
            this.$el_player.bind($.jPlayer.event.timeupdate, function (e) {
                that.handlePlaying(e);
            });
            return this;
        },
        handleSetMode: function handleSetMode($el) {
            this.mode++;
            this.mode = this.mode % 3;
            $el.removeClass('play-mode-0').removeClass('play-mode-1').removeClass('play-mode-2');
            $el.addClass('play-mode-' + this.mode);
        },

        // timeupdate
        handlePlaying: function handlePlaying(e) {
            var progress = e.jPlayer.status.currentPercentAbsolute;
            var volume = e.jPlayer.options.volume * 100;
            $('.play-volume-con').css({ width: volume + '%' });
            $('.play-volume-ctr').css({ left: volume + '%' });
            $('.play-bar-con').css({ width: progress + '%' });
            $('.play-bar-ctr').css({ left: progress + '%' });
            if (this.list[this.index]) {
                var time = Math.round(e.jPlayer.status.currentTime);
                this.list[this.index].duration = Math.round(e.jPlayer.status.duration);
                var music_time = formatTime(time) + '/' + formatTime(this.list[this.index].duration);
                $('.play-music-time').text(music_time);
            } else {
                this.$el_play.addClass('pause').removeClass('play');
            }
        },

        // 下一首 上一首
        handleNext: function handleNext(type) {
            var next_index = null;
            var len = this.list.length;
            if (!len) return this;
            var copy_arr = [].concat(_toConsumableArray(this.list));
            switch (this.mode) {
                // 循环播放
                case 0:
                    if (type === 'next') {
                        next_index = (this.index + 1) % len;
                    } else {
                        next_index = (this.index - 1 + len) % len;
                    }
                    break;
                // 单曲循环
                case 1:
                    next_index = this.index;
                    break;
                // 随机循环
                case 2:
                    if (this.list.length === 1) {
                        next_index = this.index;
                    } else {
                        copy_arr.splice(this.index, 1);
                        var music = copy_arr[Math.floor(Math.random() * copy_arr.length)];
                        next_index = _store2.default.findFirstIndexForArr(this.list, function (item, index) {
                            return music.id === item.id;
                        });
                    }
                    break;
            }
            this.play(next_index);
        },

        // 暂停
        handlePlayOrPause: function handlePlayOrPause(el) {
            if (this.list.length === 0) {
                el.removeClass('play').addClass('pause');
                return;
            }
            if (el.hasClass('play')) {
                el.removeClass('play').addClass('pause');
                this.$el_player.jPlayer('pause');
            } else {
                el.removeClass('pause').addClass('play');
                this.$el_player.jPlayer('play');
            }
        },

        // 进度
        handleProgress: function handleProgress(el, e) {
            return (e.clientX - el.getBoundingClientRect().left) / el.clientWidth;
        }
    };

    // 音乐资源控制器
    var MusicResourcesController = {
        key: 'MUSIC_LIST',
        list: null,
        init: function init() {
            this.getList();
            this.addMonitorEvent();
            return this;
        },
        remove: function remove(arr) {
            var _this = this;

            arr.forEach(function (music) {
                _this.list.forEach(function (item, index) {
                    if (music.id === item.id) _this.list.splice(index, 1);
                });
            });
            this.save();
            return this;
        },
        save: function save() {
            _store2.default.dataToLocalStorageOperate.save(this.key, this.list);
        },
        getList: function getList() {
            this.list = _store2.default.dataToLocalStorageOperate.achieve(this.key) || [];
            return this.list;
        },
        start: function start() {
            var arr = this.getList();
            MusicListController.init(arr, 0);
            MusicPlayerController.init(arr, 0).play(0);
        },
        restart: function restart() {
            var arr = this.getList();
            var music = MusicPlayerController.getCurMusic();
            var index = -1;
            if (music) {
                index = _store2.default.findFirstIndexForArr(arr, function (item) {
                    return item.id === music.id;
                });
            }
            MusicPlayerController.setList(arr);
            if (index === -1) {
                MusicListController.innerHTML(arr, 0);
                MusicPlayerController.play(0);
            } else {
                MusicListController.innerHTML(arr, index);
                MusicPlayerController.setCurIndex(index);
            }
        },
        addMonitorEvent: function addMonitorEvent() {
            var that = this;
            window.addEventListener('storage', function (e) {
                if (e.key === 'MUSIC_LIST') {
                    that.restart();
                    MusicPlayerController.play(0);
                }
            });
        }
    };
    MusicResourcesController.init().start();

    _store2.default.dataToLocalStorageOperate.save('IS_OPEN', true);
    window.onbeforeunload = function () {
        _store2.default.dataToLocalStorageOperate.save('IS_OPEN', false);
    };

    // 格式化时间
    function formatTime(time) {
        var ss = time % 60;
        var mm = Math.floor(time / 60);
        if (mm < 10) mm = '0' + mm;
        if (ss < 10) ss = '0' + ss;
        time = mm + ':' + ss;
        return time;
    }
}());

/***/ })
/******/ ]);