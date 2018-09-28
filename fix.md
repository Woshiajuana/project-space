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

