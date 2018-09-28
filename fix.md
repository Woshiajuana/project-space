# 1.TOP10	音乐和其他的查看数没有区分	音乐用的收听数和其他用的观看数的图标变成一种了

```
    // 新增样式
    .toplist li span.zan { background: url(../images/shouting.png) no-repeat left center;}
```
# 2.单纯图标不明确	悬浮窗里的图标仅仅只是图标，不知道的用户除非点击否则不知道是什么功能

```
    // 悬浮窗新增title属性
    <ul id="wheel3" data-angle="E" class="wheel">
        <li class="item"><a href="#home" class="item-1" title="哈哈1"></a></li>
        <li class="item"><a href="https://www.baidu.com/" target="_blank" class="item-2" title="哈哈2"></a></li>
        <li class="item"><a href="#home" class="item-3" title="哈哈3"></a></li>
        <li class="item"><a href="#home" class="item-4" title="哈哈4"></a></li>
    </ul>

```
# 3.播放器打开不便捷	点击悬浮窗的播放器按钮直接在当前页打开了，播放器是没入口进其他页面的

```
    // 悬浮窗新增target="_blank"属性
    <ul id="wheel3" data-angle="E" class="wheel">
        <li class="item"><a href="#home" class="item-1" title="哈哈1"></a></li>
        <li class="item"><a href="https://www.baidu.com/" target="_blank" class="item-2" title="哈哈2"></a></li>
        <li class="item"><a href="#home" class="item-3" title="哈哈3"></a></li>
        <li class="item"><a href="#home" class="item-4" title="哈哈4"></a></li>
    </ul>

```

# 4.投稿按钮	图标与右上角“我要投稿”不同，但功能是一样的，容易有歧义	同步图标样子（样子基本相似就可以）

```
    // 自行替换图片链接
```

# 5.所有	所有	选择文件	按钮不明确	按钮鼠标移入鼠标都没有改变，像不能点击的感觉

```
    // 新增样式
    .cursor-pointer{cursor: pointer;}
    // 然后在给需要改变的元素标签加上这个样式
    <div class="cursor-pointer"></div>
```

# 6.封面替换	封面替换点击区域太小	需要点击替换按钮的中间十字才能弹出选择框

```
    // 把点击事件绑定到父标签就行了
```

# 7.播放数	播放数错误	点击收听后刷新页面，显示的播放数增加了2

```
    // 逻辑处理
```

# 8.认证按钮区分	认证按钮已认证是也是显示蓝色，并且鼠标移上是手指点击的样式，会有歧义	如果已认证，认证按钮需要灰掉，鼠标移入的样式改为箭头

```
    // 新增样式
    // 需要置灰的按钮添加此样式
    .button-disabled { cursor: default !important; border: 1px solid #ddd !important; color: #ddd !important;}
```

# 9.小组列表	列表展示	不知道哪个是认证过的	列表上没有指示出哪个是认证过的	列表头像上加上角标，认证团队

```
    // 新增样式
    .search-group-list a{position: relative;}
    .search-group-list .auth-icon{width: 50px;height: 50px;position: absolute;top: 0;left: 0;}
    // 列表结构
    <ul class="search-group-list">
        <li>
            <a href="javascript:;" onclick="joinInGroup(53)" class="join">申请加入</a>
            <a target="_blank" href="group.html?id=NTM=">
                <img src="http://poppro.ozzyad.com/uploads/1535529656_210.png?ran=2578700">
                <img class="auth-icon" src="../images/rzxzym-icon.png"/>
            </a>
            <h3><a target="_blank" style="color:black;text-decoration:none;" href="group.html?id=NTM=">测试123</a></h3>
            <dl><dt>最近更新：</dt><dd>2018-09-28</dd></dl><dl><dt>成立时间：</dt><dd>2018-08-29 16:01:07</dd></dl><dl><dt>参加人数：</dt><dd>1人</dd></dl><dl><dt>管理员：</dt><dd>天天天晴</dd></dl><dl><dt>招募：</dt><dd>绘画</dd></dl></li>
    </ul>
```

# 10.积分兑换	兑换积分不清晰	看不到需要多少积分，得鼠标悬停在图片上才行，不是很突出	在名字下方加上  积分：xx分

```
    // 新增样式
    .exchange-box p{color: #666; line-height: 1.5;}
    // 新增html
    <li>
        <div></div>
        <h3>初音未来2017</h3>
        <p>1积分</p>
        <a href="javascript:;">兑换</a>
    </li>
```

# 11.经验显示	没有经验显示的区域	整个页面中都没有显示经验的区域，经验进度条上的数字并不能很清楚的表示这是经验值	就在经验条里面加入“经验值：当前经验值/该等级总经验值”	样式见示例2

```
    // 新增样式
    .jf-ico-2 span{text-align: center; position: relative;line-height: 15px;}
    .jf-ico-2 i{position: absolute;height: 100%;left: 0;top: 0;}
    .jf-icon-text{color: #fff;font-size: 12px;position: relative}
    // 新增html
    <p class="jf-ico-2">
        <label>我的等级:</label>
        <span>
            <i style="width: 50%;"></i>
            <b class="jf-icon-text">366/500</b>
        </span>
        <strong>Lv.12</strong>
    </p>
```

# 12.团队标示	团队标示较少的情况下展示的空白区域太大

```

```

# 13.画作/3D建模	显示区域没有对齐	白色作品区域没有与其他地方对齐（TOP）

```

```

# 14.性别图标	图标太大	性别和认证的图标太大导致看起来与旁边不和谐	性别图标改为15px 15px

```
    // 修改样式
    .sex-icon{width: 15px; height: 15px;}
```

