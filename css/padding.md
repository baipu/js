---

---

# padding 

##  1、 盒子模型和 padding



### 1.box-sizing  :border-box

> 当`padding `的值`> width`的时候，就是，显示的是`padding`的值

都以为`box-sizing  :border-box`的宽度给定`width`的时候就不会变化，大多数是这个样子的，样式的宽度就是设置的宽度，无论如何改变`padding` 都不会变，但是当`padding `的值`> width`的时候，就是，显示的是`padding`的值

```
  .box {
            padding: 10px 60px;
            width: 80px;
            box-sizing: border-box;
            background: rebeccapurple;
        }
 1、盒子模型
        <div class="box">
            .box{ display: block; padding: 10 px 60px; width:80px; box-sizing: border-box; background:rebeccapurple; }
        </div>
```

![padding_box-sizing](/Users/baipu/工作文件/study/github/js/css/padding/padding_box-sizing.jpg)

如图，如果padding 宽度为120 px的时候，但是width只有80px时候，就显示120px，局部使用，尽量使用无宽度以及宽度分离准则

### 2 inline 的padding

> 内联元素使用padding的时候，虽然会看起来变大，但是不影响其他元素的位置

有人认为padding对行内元素来说高度没啥控制的，但是根据如下的代码看看

```html

<style>
 .point02 a.box {
            padding: 10px 60px;
            background: red;
            color: white;
        }
</style>
<div class="point02">
        2、内联元素出现的成叠现象  以及层叠（证明padding 对内联元素垂直上还是有效果的）
        <div>
            这是a元素上变的字，下一行的 a 标签 虽然使用了padding扩大了垂直距离，但是他不会影响我上边的布局
            <br>
            <a class="box"> a.box{ padding: 10px 60px; background: red; color:white; } 我虽然比较大，但也只是盖住了上下遍的东西，并不会把下边挤下去</a>
            </br>
            这是a元素上变的字，下一行的 a 标签 虽然使用了padding扩大了垂直距离，但是他不会影响我上边的布局
        </div>

</div>
```

效果如图：

![padding_inlin](/Users/baipu/工作文件/study/github/js/css/padding/padding_inlin.jpg)

可以看到，内联元素使用`paddin`g的时候，虽然会看起来变大，但是不影响上下文的变化

这种不影响其他元素而显示成叠效果的，有这种效果的方法还有：`relative ` `box-shadow` ` outline` 

有两种分类：

1. 纯视觉的效果 `box-shadow` ` outline`
2. 会影响外部的尺寸` relative ` `inline`的`padding`

> ` inline` 的 `padding `会影响自己的尺寸

证：	

```Html
<style>
 .point02 .father {
            height: 10px;
            overflow: auto;
        }

        .point02 a.box {
            padding: 10px 60px;
            background: red;
            color: white;
        }
</style>
<div class="point02">
  	<p>
                    如果a外边有个father 设置了高度，然后还有属性 overflow：hidden这个时候就会塌陷 说明这个不是视觉层叠效果，会影响外部尺寸
    </p>
这是a元素上变的字，下一行的 a 标签<br>
    <div class="father">
        <a class="box">
            .point02 .father { height: 10px; overflow: auto; } .point02 a.box { padding: 10px 60px; background: red; color: white; }
        </a>
    </div>
    </br>
    这是a元素下变的字，下一行的 a 标签
</div>
```



### 3 行内元素padding 的实际用法

1. 不影响样式的情况下，增加按钮点击面的大小
2. 登录 |  注册

```html
<style>
    .point3 a{
        color: black;
        text-decoration: none;
        font-size: 14px
    }
    .point3 a+a:before{
        content: "";
        font-size: 0;
        padding:10px 3px 4px;
        margin-left:6px;
        border-left: 1px solid gray

    }
</style>
<div class="point3">
    <a href="">登陆</a><a href="">注册</a>

</div>


```

3. 我们希望url的# hash锚定位的时候，一般 元素都是在最上边，但是如果我们希望定位的时候距离顶端有一定的距离使用方法：

```html
<style>
    #point04{
        padding-top:30px
    }
    .point4 .container{/*这个是为了填充下半部分，使页面足够长*/
        width: 100px;
        background: red;
    }
</style>
<div class="point4">
    <span id="point04">使用inilne padding 的奇技淫巧</span>
    <div class="container">container</div>

</div>
```

