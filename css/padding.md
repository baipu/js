# padding 

[TOC]

##  一、 盒子模型和 padding



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

### 2. inline 的padding

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



### 3. 行内元素padding 的实际用法

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



## 二、padding 百分比

> 1、value不支持负数 （ margin兼容）
>
> 2、高度的百分比是相对于width的

### 1、对于padding 百分比在block的使用

利用二特性可以写自适应宽高比恒定的div

````Html
 <style>
        .point05 .box {
            padding: 50% 50%;
            position: relative;
        }
        .point05 .box>.img {
            position: absolute;
            width: 10%;
            height: 10%;
            left: 0;
            top: 0;
        }
    </style>
    <h3>padding and percent</h3>
    <div class="point05">
        <div class="box">
            <img class="img" src="./img/test.jpg" width="100"> 
        </div>
    </div>
    <div>
        这里使用percent实现框框随着屏幕改变而改变，但是宽高比是不变化的,可以拖动浏览器宽度看效果
    </div>
````

### 2、对于padding百分比 在inline的使用

内敛元素的特性：

>1、相对于宽度的调整
>
>2、默认的高度和宽度细节有差异
>
>3、padding 会断行

先看断行：

````html
    
<style>
    .point06{
            width: 130px
        }
    .point06 .box {
       border: 2px dashed #cd0000;
    }

    .point06 span {
        padding: 50%;
        /* font-size: 0; */
        background: gray
    }
</style>
<h3>padding percent in inline</h3>
<div class="point06">
    <div class="box">
        <span >has 内有文字若干 </span>
    </div>
</div>
````

效果如下：![padding_percent_inline](/Users/baipu/工作文件/study/github/js/css/padding/padding_percent_inline.jpg)

出现这种情况的原因以及注意点：

1、padding+文字的长度一行放不下了，so padding-left就随着文字换行了

2、宽度改变，如果里边没有任何文字，宽度就和容器一样了，但是还有文字，所以就把宽度撑的宽了，

3、如果把文字删了，只是一个矩形，而不是正方形，why？还是有字符的，如果要改变字符，将font-size改编成0就好了

```Html
 .point06 span {
        padding: 50%;
        font-size: 0;
        background: gray
    }
```



## 三、内置的padding

1. ul/ol

   > 内置padding-left，单位是px，所以字变大的时候可能会有问题，建议 font-size的时候，自己设置成 22px

2. 表单内置padding

   Eg:

   1. all` input`
   2.  all `button`
   3. ie8+ Firefox ` select `
   4. `Radio checkbox` **没有**内置的`padding`

3. 删除/修改 `button`的内置`padding`

   ```Css
   button::-moz-focus-inner{
           padding:0;/*用来删除firefox下的padding*/
       }
   button{
       overflow: visible；/*文字变多，padding也变大时候，用这个可以限制进行控制*/
   }
   ```

4. button 按钮兼容性不好，所以用a标签，但是a标签很多时候事件用起来不舒服，所以可以用label实现一些button

   > `clip: rect(0,0,0,0)`

   ```css
   <style> 
    .point07 button{
           position: absolute;
           clip: rect(0,0,0,0)
       }
   
       .point07 label{
           position: absolute;
           line-height: 20px;
           padding: 10px;
       }
   
   </style>
   <div class="point07">
       <button id="btn"></button>
       <label for="btn">按钮</label>
   </div>
   
   
   ```