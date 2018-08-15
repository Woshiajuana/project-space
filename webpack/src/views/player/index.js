import Store from '../../assets/lib/store'

$(function () {

    // 音乐列表控制器
    const MusicListController = {
        $el: $('#music-wrap'),
        $el_list: $('#music-list'),
        $el_all: $('#check-all'),
        $el_title: $('#music-title'),
        $el_src: $('#music-pic-image'),
        $el_delete: $('#list-delete'),
        list: [],
        // 初始化
        init (list, index) {
            this.innerHTML(list, index);
            this.addMonitorEvent();
            return this;
        },
        innerHTML(list, index) {
            let str = '';
            this.list = list || [];
            list.forEach((item, i) => {
                str += `<li class="list-item ${i === index ? 'active' : ''}" data-index="${i}">
                            <div class="list-item-part check">
                                <div class="check-box">
                                    <div class="check-inner"></div>
                                </div>
                                <span class="check-box-prompt icon"></span>
                                <span class="check-box-prompt index">${i + 1}</span>
                            </div>
                            <div class="list-item-part name">${item.title}</div>
                            <div class="list-item-part author">${item.author}</div>
                            <div class="list-item-part time">${formatTime(+item.duration)}</div>
                        </li>`;
            });
            this.$el_list.html(str);
            this.innerLrc(index);
            return this;
        },
        // 渲染歌词
        innerLrc (index) {
            let music = this.list[index];
            if (music){
                // let lrc =
            }
            return this;
        },
        // 歌曲事件监听
        addMonitorEvent () {
            let that = this;
            // 选取播放歌曲
            this.$el.on('click', '.name', function (e) {
                let index = $(this).parent('.list-item').data('index');
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
                that.handleDelete()
            });
            return this;
        },
        // 删除
        handleDelete() {
            let arr = [];
            let that = this;
            this.$el_list.find('.list-item').each(function() {
                let check = $(this).find('.check-box').hasClass('active');
                if (check) {
                    let index = $(this).data('index');
                    arr.push(that.list[index]);
                }
            });
            this.$el_all.hasClass('active') && this.handleCheck(this.$el_all);
            this.$el_delete.hide();
            this.$el_src.hide();
            this.$el_title.text('');
            MusicResourcesController.remove(arr).restart();
        },
        // 选中
        handleCheck(el){
            el.toggleClass('active');
        },
        // 切换选中歌曲
        handleSwitchItem (i) {
            $('.list-item').each(function (index, item) {
                if (i === index) {
                    $(item).addClass('active')
                } else {
                    $(item).removeClass('active')
                }
            });
            let music = this.list[i];
            this.$el_title.text(music.title);
            this.$el_src.show();
            this.$el_src.prop('src', music.src);
            return this;
        },
        // 判断是否选中
        judgeCheck () {
            let all_check = true;
            let check = false;
            $('#music-wrap .check-box').each(function(index, item){
                let type = $(this).hasClass('active');
                if (type) check = true;
                if (!type) all_check = false;
            });
            if (all_check){
                this.$el_all.addClass('active')
            } else {
                this.$el_all.removeClass('active')
            }
            if (check) {
                this.$el_delete.show();
            } else {
                this.$el_delete.hide();
            }
        },
        // 选中全部
        handleCheckAll () {
            let type = this.$el_all.hasClass('active');
            if (!type) {
                $('#music-list .check-box').addClass('active')
            } else {
                $('#music-list .check-box').removeClass('active')
            }
        },
        // 切换
        channelCheckHandle (el) {
            let type = el.hasClass('active');
            if (!type) {
                el.addClass('active');
            } else {
                el.removeClass('active');
            }
            return !type;
        }
    };

    // 音乐播放控制器
    const MusicPlayerController = {
        $el: $('#player-warp'),
        $el_player: $('#player'),
        $el_play: $('#play-ctr'),
        $el_title: $('.play-music-title'),
        list: null,
        music: null,
        mode: 0,
        init (list, index = 0) {
            this.list = list;
            this.index = index;
            this.addMonitorEvent();
            let that = this;
            let options = {
                error: function () {
                    if (that.list.length === 0) return;
                    that.handleNext('next');
                },
                supplied: 'mp3',
                wmode: 'window',
            };
            // if (this.list.length) {
            //     options.ready = function () {
            //         that.play(that.index);
            //     }
            // }
            $('#player').jPlayer(options);
            this.lrc_list = $('#lrc_list').jScrollPane({
                autoReinitialise: false,
            });
            return this;
        },
        setList(list) {
            this.list = list;
            return this;
        },
        getCurMusic () {
            return this.music;
        },
        setCurIndex (index) {
            this.index = index;
            return this;
        },
        getCurIndex () {
            return this.index;
        },
        play (index) {
            this.index = index;
            let music = this.list[this.index];
            if (music) {
                this.music = music;
                this.$el_player.jPlayer('setMedia', {
                    mp3: music.file,
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
        lrcStart (music) {
            let that = this;
            if(music.lrc) {
                $.get(music.lrc + '?t=' + new Date().getTime(),function(data,status){
                    if(status !== 'success') {
                        $('.jspPane').html(' <p>获取歌词失败</p>')
                        var refreshApi = that.lrc_list.data("jsp");
                        //重新加载刷新滚动条
                        refreshApi.reinitialise({
                            autoReinitialise: false,
                        });
                        return ;
                    } else {
                        that.lrcInner(data)
                    }
                });
            } else  {
                $('.jspPane').html(' <p>暂无歌词</p>')
                var refreshApi = this.lrc_list.data("jsp");
                //重新加载刷新滚动条
                refreshApi.reinitialise({
                    autoReinitialise: false,
                });
            }

        },

        lrcInner(txt) {
            if(typeof txt !== 'string' || txt.length < 1) return;
            console.log(11)
            try {
                var item = null, item_time = null, html = '', list = [];
                /* 分析歌词的时间轴和内容 */
                txt = txt.split("\n");
                for(var i = 0; i < txt.length; i++) {
                    item = txt[i].replace(/^\s+|\s+$/, '');
                    if(item.length < 1 || !(item = /^[^\[]*((?:\s*\[\d+\:\d+(?:\.\d+)?\])+)([\s\S]*)$/.exec(item))) continue;
                    list.push(item[2])
                }
                list.forEach((item, index) => {
                    html += `<p>${item}</p>`
                });
                $('.jspPane').html(html);
                var refreshApi = this.lrc_list.data("jsp");
                //重新加载刷新滚动条
                refreshApi.reinitialise({
                    autoReinitialise: false,
                });
            } catch (e) {
                $('#lrc_list').html(' <p>解析歌词失败</p>')
            }
        },


        addMonitorEvent() {
            let that = this;
            this.$el.on('click', '#play-ctr', function (e) {
                that.handlePlayOrPause($(this));
            }).on('click', '.play-bar-inner', function (e) {
                if (that.list[that.index]){
                    let progress = that.handleProgress(this, e);
                    $('#player').jPlayer('play', that.list[that.index].duration * progress);
                    that.$el_play.addClass('play').removeClass('pause');
                }
            }).on('click', '.play-volume-inner', function (e) {
                let progress = that.handleProgress(this, e);
                $('#player').jPlayer('volume', progress);
            }).on('click', '.up', function (e) {
                that.handleNext();
            }).on('click', '.down', function (e) {
                that.handleNext('next');
            }).on('click', '#play-mode', function (e) {
                that.handleSetMode($(this));
            });
            this.$el_player.bind($.jPlayer.event.ended, (e) => {
                that.handleNext('next');
            });
            this.$el_player.bind($.jPlayer.event.timeupdate, (e) => {
                that.handlePlaying(e);
            });
            return this;
        },
        handleSetMode($el) {
            this.mode++;
            this.mode = this.mode % 3;
            $el.removeClass('play-mode-0')
                .removeClass('play-mode-1')
                .removeClass('play-mode-2');
            $el.addClass('play-mode-' + this.mode);
        },
        // timeupdate
        handlePlaying(e) {
            let progress = e.jPlayer.status.currentPercentAbsolute;
            let volume = e.jPlayer.options.volume * 100;
            $('.play-volume-con').css({width: volume + '%'});
            $('.play-volume-ctr').css({left: volume + '%'});
            $('.play-bar-con').css({width: progress + '%'});
            $('.play-bar-ctr').css({left: progress + '%'});
            if (this.list[this.index]) {
                let time = Math.round(e.jPlayer.status.currentTime);
                this.list[this.index].duration = Math.round(e.jPlayer.status.duration);
                let music_time = formatTime(time) + '/' + formatTime(this.list[this.index].duration);
                $('.play-music-time').text(music_time);
            } else {
                this.$el_play.addClass('pause').removeClass('play');
            }
        },
        // 下一首 上一首
        handleNext(type) {
            let next_index = null;
            let len = this.list.length;
            if (!len) return this;
            let copy_arr = [...this.list];
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
                        let music = copy_arr[Math.floor(Math.random() * copy_arr.length)];
                        next_index = Store.findFirstIndexForArr(this.list, (item, index) => {
                            return music.id === item.id;
                        })
                    }
                    break;
            }
            this.play(next_index);
        },
        // 暂停
        handlePlayOrPause(el) {
            if (this.list.length === 0) {
                el.removeClass('play').addClass('pause');
                return;
            }
            if (el.hasClass('play')){
                el.removeClass('play').addClass('pause');
                this.$el_player.jPlayer('pause');
            } else {
                el.removeClass('pause').addClass('play');
                this.$el_player.jPlayer('play');
            }
        },
        // 进度
        handleProgress(el, e,) {
            return (e.clientX - el.getBoundingClientRect().left) / el.clientWidth;
        }
    };

    // 音乐资源控制器
    const MusicResourcesController = {
        key: 'MUSIC_LIST',
        list: null,
        init () {
            this.getList();
            this.addMonitorEvent();
            return this;
        },
        remove(arr) {
            arr.forEach((music) => {
                this.list.forEach((item, index) => {
                    if(music.id === item.id) this.list.splice(index, 1);
                });
            });
            this.save();
            return this;
        },
        save() {
            Store.dataToLocalStorageOperate.save(this.key, this.list);
        },
        getList () {
            this.list = Store.dataToLocalStorageOperate.achieve(this.key) || [];
            return this.list;
        },
        start () {
            let arr = this.getList();
            MusicListController.init(arr, 0);
            MusicPlayerController.init(arr, 0).play(0);
        },
        restart(){
            let arr = this.getList();
            let music = MusicPlayerController.getCurMusic();
            let index = -1;
            if (music) {
                index= Store.findFirstIndexForArr(arr, (item) => {
                    return item.id === music.id;
                });
            }
            MusicPlayerController.setList(arr);
            if (index === -1){
                MusicListController.innerHTML(arr, 0);
                MusicPlayerController.play(0);
            } else {
                MusicListController.innerHTML(arr, index);
                MusicPlayerController.setCurIndex(index);
            }
        },
        addMonitorEvent () {
            let that = this;
            window.addEventListener('storage', function(){
                that.restart();
                MusicPlayerController.play(0);
            })
        }
    };
    MusicResourcesController.init().start();

    Store.dataToLocalStorageOperate.save('IS_OPEN', true);
    window.onbeforeunload = function () {
        Store.dataToLocalStorageOperate.save('IS_OPEN', false);
    };

    // 格式化时间
    function formatTime (time) {
        let ss = time % 60;
        let mm = Math.floor(time / 60);
        if (mm < 10) mm = '0' + mm;
        if (ss < 10) ss = '0' + ss;
        time = mm + ':' + ss;
        return time;
    }

} ());


