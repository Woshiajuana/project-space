# 1. 头像框，全部改成圆形框 投稿数据与普通数据区别（右下图片角标）"

```
    // 新增样式 在头像上加上这个class样式
    .border-radius{border-radius: 50%; overflow: hidden;}
```

# 2.列表页：1.1 新增“作品播放数” 新增操作，可进行下载（许可规则勾选了可下载）、添加播放列表功能"

```
    // 新增样式
    .music-line .col-1{width: 300px !important;}
    .music-line .col-2{width: 100px !important;}
    .music-line .col-6{ color: #b2b2b2; width: 84px !important; padding-left: 20px; background: url(../images/shouting.png) no-repeat left center;}
    .music-line .play-panel .a0{background: url("../images/yylb-xz-jz-icon.png") no-repeat center}
    // 新增html
    <div class="music-listbox">
        <ul class="music-line">
            <li class="col-1"><a target="_blank" href="/html/detail-music.html?id=MTk3&amp;type=3" style="color:#333;">
                <img width="45" src="https://www.poppro.cn/uploads/1504600353_783.png?ran=3278096">【初音未来V4C】奇妙魔术师【中文翻唱】</a>
            </li>
            <li class="col-2" style="margin-left: 30px">
                <a target="_blank" href="./user-main.html?id=MTE2OQ==">凝沙Key</a>
            </li>
            <li class="col-6">3824</li>
            <li class="col-3">2017-09-05 16:35:20</li>
            <li class="col-4" style="margin-left: 30px;">01:27</li>
            <li class="play-panel">
                <a href="javascript:;" class="a0" wid="197"></a>
                <a href="javascript:;" class="a1" wid="197"></a>
                <a href="javascript:;" class="a2" wid="197"></a>
                <a href="javascript:;" class="a3" wid="197"></a>
                <a href="javascript:;" class="a4" wid="197"></a>
            </li>
        </ul>
    </div>
```
