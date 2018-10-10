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

# 3."2. 详情页：2.1 作品信息区域，新增“作品播放数”（放于标题下+上传时间）
                       2.3 作者信息区域中作者头像展示（包含头像框、认证标识、徽章等）"

```
    // 新增样式
    .detail-base-info{ color: #999; padding: 0 0 18px 40px;}
    .detail-base-info span{ height: 20px; line-height: 20px;display: inline-block;color: #999; font-size: 12px; margin-right: 20px;}
    .detail-base-info .icon{ padding-left: 22px; background: url("../images/mian-eye-ico.png") left center no-repeat;}

    // 新增html
    <h2>标题标题标题标题标题标题标题标题标题标题</h2>
    <p class="detail-base-info">
        <span class="icon">2012</span>
        <span>上传时间：2018-08-06</span>
    </p>
    <div class="detail-txt-box">
        <div class="detail-txt-info">

        </div>
    </div>
```


# 4.作者信息区域中作者头像（包含头像框、认证标识、徽章等）

```
    // 新增样式
    .author-session{zoom:1;}
    .author-session:after{content:'\20';display:block;height:0;clear:both;}
    .author-wrap{padding: 25px 0 30px 115px;position: relative;}
    .author-head-link{position: absolute; top: 25px; left: 30px; padding: 5px;}
    .author-head-link img{display: block; width: 70px; height: 70px;}
    .author-inner{}
    .author-session{ margin-bottom: 10px;}
    .author-name-link{color: #18b2d8; font-size: 16px;text-decoration: none;}
    .author-sex{width: 20px; height: 20px;}
    .author-session a,.author-session span,.author-session img{vertical-align:middle;display: inline-block;}
    .author-level{color: #18b2d8;font-size: 12px;}
    .author-icon{width: 16px;height: 16px;}
    .author-icon-session{ width: 160px;}
    .author-icon-session img{float: left; width: 30px; height: 30px; margin: 0 5px 5px 0;}
    .auth-more-link{color: #18b2d8; font-size: 14px;text-decoration: none;}

    // 新增html
    <div class="author-wrap">
        <a href="" class="author-head-link"><img src="http://www.owulia.com/static/temp/2.jpg" alt=""></a>
        <div class="author-inner">
            <div class="author-session">
                <a href="" class="author-name-link">作者</a>
                <img src="http://www.owulia.com/static/temp/2.jpg" class="author-sex">
            </div>
            <div class="author-session">
                <span class="author-level">Lv13</span>
                <img src="http://www.owulia.com/static/temp/2.jpg" alt="" class="author-icon">
            </div>
            <div class="author-session author-icon-session">
                <img src="http://www.owulia.com/static/temp/2.jpg" alt="">
                <img src="http://www.owulia.com/static/temp/2.jpg" alt="">
                <img src="http://www.owulia.com/static/temp/2.jpg" alt="">
                <img src="http://www.owulia.com/static/temp/2.jpg" alt="">
                <img src="http://www.owulia.com/static/temp/2.jpg" alt="">
                <img src="http://www.owulia.com/static/temp/2.jpg" alt="">
                <img src="http://www.owulia.com/static/temp/2.jpg" alt="">
                <img src="http://www.owulia.com/static/temp/2.jpg" alt="">
                <img src="http://www.owulia.com/static/temp/2.jpg" alt="">
                <img src="http://www.owulia.com/static/temp/2.jpg" alt="">
            </div>
            <a href="" class="auth-more-link">查看作者更多作品</a>
        </div>
    </div>
```

# 5."1. 列表页：1.1 新增“作品浏览数”
                       1.2 新增点击缩略图可进入图片浏览模块。（点击缩略图进入图片浏览，在列表页弹出透明层（一定灰度），可左右选择不同图片，点击透明层上的图片可进入详情页）浮层上加名称，作者，浏览数，点击作品名、图片进入详情页"
```
    // 新增样式
    .pop-wrap{position: fixed;top: 0;left: 0;right: 0;bottom: 0;background-color: rgba(0,0,0,0.5); z-index: 99}
    .pop-inner{position: absolute; transform: translate3d(-50%, -50%, 0); top: 50%; left: 50%;}
    .pop-next,.pop-prev{position: absolute; width: 40px; height: 40px;  top: 50%; margin-top: -20px; cursor: pointer;}
    .pop-prev{left: 0; background: url("../images/pop-prev-icon.png") center no-repeat;}
    .pop-next{right: 0; background: url("../images/pop-next-icon.png") center no-repeat;}
    .pop-con{margin: 0 100px;position: relative;}
    .pop-con img{max-width: 480px; height: auto;}
    .pop-info{ position: absolute; width: 100%; bottom: 0; left: 0; right: 0;background-color: rgba(0,0,0,0.4);
        height: 65px;overflow: hidden;}
    .pop-info-text{zoom:1;}
    .pop-info-text:after{content:'\20';display:block;height:0;clear:both;}
    .pop-info h3{font-size: 14px; color: #fff; padding: 15px 0 2px 30px; font-weight: normal;}
    .pop-info-text{color: #fff; font-size: 12px; padding: 0 30px;}
    .pop-info-text span{float: left;}
    .pop-info-text .pop-right{float: right;}
    .pop-right{ height: 20px; line-height: 20px; padding-left: 20px; background: url("../images/mian-eye-ico.png") left center no-repeat;}

    // 新增html
    <div class="pop-wrap">
        <div class="pop-inner">
            <i class="pop-prev"></i>
            <div class="pop-con">
                <img src="http://www.owulia.com/static/temp/2.jpg" alt="">
                <div class="pop-info">
                    <h3>xasxaxsa</h3>
                    <p class="pop-info-text">
                        <span>xasxasx</span>
                        <span class="pop-right">xsaxasx</span>
                    </p>
                </div>
            </div>
            <i class="pop-next"></i>
        </div>
    </div>

```



