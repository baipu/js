---
typora-copy-images-to: ./img
---



# position:absolute

[TOC]

## 1、float与absolute

> 1. 当`float`和`absolute`同时存在的时候，`float`时么有任何效果的，所以没有必要同时启用`float`和`absolute`
>
> 2. 两个具有相似性，相似点包括
>    1. 块状化和浮动类似，直接把元素`display`表现成`block`或者是`table`
>    2. 破坏性，破坏正常的流的持续性。
>    3. 块状格式化上下文 `BFC`
>    4. 包裹性，元素不会自动填充，而是由内容撑起来的 所以没必要使用display:inline-block,如果元素显示或者无依赖定位，可以使用`display:inline`

### 1、包含块

普通元素宽度的百分比是针对于父级元素的`context box`的宽度计算的，但是  `absolute`是对于上边第一个`position`不为static的祖先元素计算的。包含块的计算规则：

1. 根元素 `<html>`

2. 对于其他元素，如果这个元素的`position`是`relative`或者是`static`那么包含块就是最近的祖先的`content box`边界

3. 如果`position:fixed`的包含块是’初始包含块‘

4. `position:absolute`的包含块是最近的`position`不为`static`的祖先元素建立

   - 如果祖先是个纯inline的呢么
     - 假设给内联元素的前后各生成一个宽度为0的内联盒子，那么这两个内联盒子的padding box外边的包围盒就是内联元素的包含块，内联元素的包含块受`::first-line`伪元素的影响，但是不受`::first-letter`伪元素的影响
     - 如果这个内联元素被跨行分割，那么包含块没有定义，自行发挥
   - 其他情况就是祖先`padding box`的边界形成的

   

   

#### 如下是内联元素作为包含块讲解：

我们用的少的原因：

   1. 使用了absolute定位，都是用来布局的，但是内联元素用来图文展示，所以不好碰上

   2. 理解成本比较高，

      ```html
      <div class="point01">
              <span style="position: relative;">  我是  <big style="font-size: 200%">字号很大的</big>文字</span>
      </div>
      ```

      ![image-20180519135748133](/Users/baipu/工作文件/study/github/js/css/img/image-20180519135748133.png)

      可以看到，内联元素的包含块是由生成的前后内联盒子决定的，和里边的内联盒子的细节没任何关系

   3. 兼容性问题，

      1. 内联元素单行的时候： 包含块是个空元素的时候，
      2. 多行的时候，因为行为没有被定义，所以自由发挥

   #### 绝对定位元素 计算包含块

   > 最近的`position`不为`static`的祖先元素建立

   这里我们引申一下，

   ​	height:100% 是第一恶搞具有定位元素的属性值的祖先元素的高度，

   	height:inherit  单纯的父亲高度的继承

**包裹性**带来的**宽度自适应性**是由包含块来计算的：

```Html
<div class="box">我是文字，</div>
<style>
.point01 .box{
    position: absolute;
}
</style>
```

   这个时候是不会换行的，但是如果有很多字的话，会不会换行？

> 在通常场景下，.box 元素宽度就是里边文字的宽度，不会换行，但是文字越来越多，。box元素就会越来越大，不会无限大下去，因为超过一定限制就会自动换行，这里的限制就是。box的包含块

**绝对定位元素默认的最大宽度就是“包含块”的宽度**



但是当我们的包含块的宽度足够小，放不下几个文字的时候，就会怪异如下：

```html
<a href="javascript:" class="icon-delete tips" data-title="删除"></a>

```

```Css
.tips[data-title] {
    position: relative;
}

.tips[data-title]::before,
.tips[data-title]::after {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    visibility: hidden;
}

.tips[data-title]::before {
    content: attr(data-title);
    top: -33px;
    padding: 2px 10px 3px;
    line-height: 18px;
    border-radius: 2px;
    /*white-space: nowrap;*/
    background-color: #333;
    text-align: left;
    color: #fff;
    font-size: 12px;
}

.tips[data-title]::after {
    content: "";
    border: 6px solid transparent;
    border-top-color: #333;
    top: -10px;
}

.tips[data-title]:hover::before,
.tips[data-title]:hover::after {
    transition: visibility .1s .1s;
    visibility: visible;
}

.icon-delete {
    display: inline-block;
    width: 20px; height: 20px;
    background: url(../img/delete@2x.png) no-repeat center;
    background-size: 16px;
}
```

![image-20180519154640265](/Users/baipu/工作文件/study/github/js/css/img/image-20180519154640265.png)

如果把注释的代码解开就是：

![image-20180519154827861](/Users/baipu/工作文件/study/github/js/css/img/image-20180519154827861.png)

上述的代码，after用来做小尖头，然后before用来做文本框

> **这里还有一个隐藏的技术：`content: attr(data-title);`动态设置文档** 



#### 定位和计算是相对于祖先元素的padding box的



### 2、具有相对特性的 无依赖absolute绝对定位

如果一个`position`，如果没有任何的`left` `right` `top` `bottom`那他会在那里？**他会在当前位置！**

> `absolute`是非常独立的css属性值，样式和行为不依赖任何的`css`都可以完成

无依赖绝对定位 ：没有任何的`left` `right` `top` `bottom`属性

使用无依赖绝对定位  特性：代码简洁	相对定位

几个案例：

#### 1、各类图标定位

```html
<div class="menu">
    <span>普通导航</span>
    <span > 热门导航<i class="icon-hot"></i></span>
    <span>新导航</span>
</div>
```

```Css
.point03 span{
    list-style-type: none;
    float: left;
    line-height: 70px;
    padding-left: 30px;
    /*display: inline-block;*/
}
.point03 .menu{
    height: 70px;
    background: gray;
}
.icon-hot{
    position: absolute; 
    margin:-6px 0 0 2px;
    width: 28px;
    height:11px;
    background: url("../img/hot.gif");
}
```

![image-20180519162604956](/Users/baipu/工作文件/study/github/js/css/img/image-20180519162604956.png)

这里图标就在文件后头，还不影响正常的排序

`position:absolute`然后用`margin`偏移实现，兼容性很好，和inline-block对齐相比较，好处在于inline-block最终对齐的行框高度会变大，中文下沉，图表居中，想要视觉上的居中，vertical-align会让图标比实际的低一点，而且行高变大，但是用”无依赖“实现这些的时候，完全不用担心正常流空间的尺寸

#### 2、超越常规的布局排版

```html
<div class="point04">
    <div class="form">
        <div class="line">
            <label for="mail"><span class="icon-star">*</span>邮箱</label><input type="email" id="mail">
            <span class="regist-remark regist-warn">
                <i class="icon-warn"></i>邮箱格式不准确（示意）
            </span>
        </div>
        <div class="line">
            <label for="pass">密码</label><input type="text" id="pass">
        </div>
        <div class="line">
            <label for="tel">手机号码</label><input type="text" id="tel">
        </div>



    </div>
</div>
```

```css
.point04 .form{
    width:356px;
    margin: auto;
}
.point04 .form .line{
    margin: 30px;
     display: block;
 }
.point04 .line label{
    display: inline-block;
    width: 100px;
    text-align: left;
}
.point04 input{
    height: 30px;
    width:170px;
}
/*以下是星星还有提示信息的样式*/
.icon-star{
    position: absolute;
    margin-left: -1em;
    color: #f30;
}
.regist-remark {
    position: absolute;
    margin: 8px 0 0 10px;
    color: #666;
}


/* 邮箱报错那里的警示小图标 */
.regist-warn {
    padding-left: 16px;
    color: #be0000;
}
.icon-warn {
    position: absolute;
    margin-left: -18px;
    width: 16px; height: 20px;
    background: url(../img/warn.gif) no-repeat center;
}
```

![image-20180519165147134](/Users/baipu/工作文件/study/github/js/css/img/image-20180519165147134.png)

这里前边的*还有后头的提示都跳出了宽度的限制，而且，如果把框框变窄，也会随着变化。

#### 3、下拉框的实现：



```Css
.point05 input{
    width: 200px; height: 20px;
    line-height: 20px;
    padding: 9px 39px 9px 9px;
    border: 1px solid #ddd;
}
.point05 .search-btn {
    width: 20px; height: 20px;
    border: 9px solid #fff;
    background: #ddd url(../img/search.png) no-repeat center;
    position: absolute; margin: 1px 0 0 -40px;
    /*隐藏文字*/
    text-indent:-9em;
    overflow: hidden;
}

.point05 .search-datalist{
    position: absolute;
    width:248px;
    border:1px solid #e6e8e9;
}
.point05 .search-datalist a{
    display: block;
    line-height: 36px;
    padding-left: 12px;
    color: #5e5e5e;
    text-decoration: none;
}

.point05 .search-result{
    display: none;
}
.search-input:focus~.search-result{
    display: block;
}

```

![image-20180519170919311](/Users/baipu/工作文件/study/github/js/css/img/image-20180519170919311.png)

主要是放大镜还有下来框的定位，用到了position然后用margin进行修饰

#### 4、进一步深入“无依赖绝对定位”

虽然说 absolute后的代码，display是block，但是其定位的位置和没有设置position:absolute时候的位置相关。



```Html
<div>这里是一大串的文字，如果我后头的<span style="position:absolute;">span元素设置成position，那么他的display模式将会是block但是定位的时候，还是按行内元素的来</span></div>
```

![image-20180519172150069](/Users/baipu/工作文件/study/github/js/css/img/image-20180519172150069.png)
如图所示，span后头的文字并没有换行，说明并没有按照display来定位地址的



### 3、absolute 和text-align

讲道理，absolute和float一样将元素的display变成block。理论上对text-align无感，但是万万没想到，text-align对absolute居然有影响

```Html
<p style="text-align: center;"><img src="./img/test02.jpeg" style="position:absolute;" alt=""></p>
```

![image-20180519173655324](/Users/baipu/工作文件/study/github/js/css/img/image-20180519173655324.png)

具体的渲染原理如下：

1. 由于img是内联水平，p中仅仅存在一个宽度为0的幽灵空白点，所以影响了布局方式

2. 如果要让图片居中实现，只需要让图片margin-left一半宽度就好了

   ```Html
   <p style="text-align: center;"><img src="./img/test02.jpeg" style="position:absolute;margin-left: -204px" alt=""></p>
   ```

   ![image-20180519174040905](/Users/baipu/工作文件/study/github/js/css/img/image-20180519174040905.png)



## 2、 absolute和overflow

> overflow对absolute元素裁剪规则：绝对定位元素不总是被父级overflow属性裁剪，尤其当overflow在绝对定位元素及其包含块之间的时候
>
> 

```Html
<div class="point08">
    <div style="position:relative;">
    <div style="overflow: hidden;">
        <img src="./img/test.png" style="position:absolute;" alt=""></div></div>
</div>
```

![image-20180519180659323](/Users/baipu/工作文件/study/github/js/css/img/image-20180519180659323.png)

你看，虽然overflow在img的上边，高度为空，外边由position，但是还是无法裁剪这个图片

```html
<div style="overflow: hidden;position:relative;">
    <img src="./img/test.png" style="position:absolute;" alt=""></div>
```

这个就会进行裁剪，因为overflow在包含块上



如果overflow的值不是hidden而是scroll或者是auto也不会出现滚动条

这个特性 **可以用来实现某个元素不随着滚动条滚动的效果**

> css3中 当大家遇到absolute被剪裁，或者fixed失效的时候，看看是不是transform属性作祟



## 3、absolute和clip

> css中，有些属性必须绑定使用才有效果，比如说clip属性，必须是绝对定位或者是固定定位



```
clip:rect(top,right,bottom,left)
```

注意上边的用法，不能缩写，不能用百分号 ，可以由逗号，也可以没有逗号

clip的使用方法：

1. **fixed股定位的剪裁**，如果在定位中，想要剪裁，一般是需要overflow作用在包含块上的，但是，fixed的包含块是html，这里他可能有心无力，所以还是需要clip来进行剪裁的。

2. **最佳可访问性隐蔽** 内容虽然看不见，但是能被机器读取，同时还占用原来的空间   兼容性好，任何元素，任何场景都可以无障碍使用之。

   隐藏文件的方法：

   1. display:none:不推荐，这个机器无法读取到
   2. Text-align:缩进，但是如果文字缩进的太大了，大到屏幕之外，屏幕阅读设备也不会读取的
   3. color：transparaent移动端上推荐，但是pc很难用简单的方式阻止文本被选中
   4. clip:视觉上隐藏了，但是可以被机器读取到



```html
<div class="point09">
    <div class="box"><img  class="img01" src="./img/test02.jpeg" alt=""></div>

    <div class="box"><img  class="img02" src="./img/test02.jpeg" alt=""></div>
</div>
```

```Css
.point09 .box{
    float: left;
    width:300px;
    height:300px;
    background-color: #f0f3f9;
    position: relative;
    overflow: auto;
}
.point09 img{
     position: absolute;
 }
.point09 .img02{
    position: absolute;
    clip:rect(0 0 0 0 );
}
```

![image-20180519190732170](/Users/baipu/工作文件/study/github/js/css/img/image-20180519190732170.png)



## 4、absolute的流体特性

####  1 left top right bottom属性

当absolute遇上left top right bottom 等的时候，absolute才真正的变成了绝对定位元素。这个时候，会绝对定位于包含块的左上角为原点，的top right bottom left确定的点上。丧失了**原有属性**和相对特性

如果只设置了一个方向的绝对定位，那么，另一个方向依然保持了相对特性

```Html
<div class="box" style="position:relative;">
    <span class="div">我们这里看如果只给absolute元素设置但方向的绝对值时候，另一个方向的绝对值怎么样</span><span style="position:absolute;top:30px;">这里是绝对定位</span>

</div>
```

![image-20180519192031290](/Users/baipu/工作文件/study/github/js/css/img/image-20180519192031290.png)

#### 2、流体特性

当一个绝对定位元素上，对立定位的方向同时具有定位数值的时候，流体特性就发生了，比如

```Css
left:0;right:20px;
```

如上，并不一定两边都是零，只要由数值，position就会丧失包裹性，从而能够进行填充。

这个时候填充到padding box的大小，那么如下两个css有什么区别呢？

```Css
.box01{
    position:absolute;
    left:0;right:0;top:0;bottom:0;
    padding:30px;
}
.box02{
    position:absolute;
    left:0;top:0;
    padding:30px;
    width:100%;height:100%;
}
```

很明显，设置了padding后，box2 的高度宽度都比原来增加了，而box01是内部缩小，box01更体现出流体特性

同时这种情况，对我们的布局非常有价值，因为子元素的height百分比可以生效了，高度自适应高度等比例等布局都可以实现了。

