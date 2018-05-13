---
typora-copy-images-to: ./img
---

[TOC]

# vertical-align

## 一、vertical-align基本：

当我们设置了`line-height` 和	`font-size`的时候，往往发现元素比我们的`line-height`高，为什么了？这个就是由`vertical-align`导致的；

`vertical-align`的值有以下几种：

- 线类：`baseline`	 `top	middle bottom`
- 文本类: `text-top text-bottom`
- 上下标类:`sub`, `super`
- **数值百分比类**:`20px` `2em` `20%`

上边三种我们常见，但是数值和百分比功能强大，他兼容性比较好，然后不同的字体base-line能达到的效果并不一致，所以用数值比较直接一点，也能够自由的调整、精确控制，当vertical-align:0的时候表示的是baseline 然后在这个基础上上移一个像素或者是下移一个像素。

- 百分比是相对于`line-height`的
- 但是我们还是建议直接用`px`，因为当我们具体写的时候，行高一般都已经确定了，很少会改变行高的，所以这个高度百分比意义不大，还需要计算，不如直接用`vertical-align:1px;`这种语法



## 二、vertical使用环境：

> 只能作用在`display`的计算值为`inline`、`inline-block`、`inline-table`、 `table-cel`上
>
> **并不是我们设置了`display`或者是默认的行内元素就没问题了，狠毒css属性会在背后默默的改变`display`的属性，像`float`，`position：absolute`**

当`display:table-cell`的时候，`vertical-align`这个语句是需要作用在自己身上，才能让儿子居中的，其他的都是作用在儿子身上的



其他`vertical-align`不起作用的情况：

1、父元素的行高不够

```html
<style>
        .point03 .box1 {
            height: 128px;
            background: gray;
        }
        .point03 .content1 {
            vertical-align: middle;
            height: 50px
        }
    </style>
    <div class="point03 box">
        <div class="box1">
              <img src="./img/test.png" alt="" class="content1">
        </div>
    </div>



```



![image-20180513094312695](/Users/baipu/工作文件/study/github/js/css/img/image-20180513094312695.png)

效果如图，并没有垂直居中，那是因为幽灵空白节点不够大，加一行代码就好了

````css
 .point03 .box1 {
            height: 128px;
            background: gray;
        }
````



2、作用在`table-cell`的字节点上的效果

```html
<style>
        .point03 .box1 {
            height: 128px;
            background: gray;
            display: table-cell
        }
        .point03 .content1 {
            vertical-align: middle;
            height: 50px
        }
        .point03 .box2 {
            height: 128px;
            background: #ccc;
            display: table-cell;
            vertical-align: middle;
        }
        .point03 .content2 {
            height: 50px
        }
    </style>
    <div class="point03 box">
        <div class="box1">
            box01
              <img src="./img/test.png" alt="" class="content1">
        </div>

        <div class="box2">
            box02
            <img src="./img/test.png" alt="" class="content2">
        </div>
       
    
    </div>

```

如下图可见，`verticalalign`作用在img上的时候并没有居中，只有在`display:table-cell`的元素上的时候才能够居中



![image-20180513095533920](/Users/baipu/工作文件/study/github/js/css/img/image-20180513095533920.png)

> 虽然就效果而言，`table-cell`元素设置了`vertical-align`垂直对齐的是子元素，但是他作用的并不是子元素而是`table-cell`元素自己，就算`table-cell`元素的子元素是一个块级元素的，也一样可以让其有个字垂直对齐的表现



## 三、vertical-align ，line-height，幽灵空白点 导致神秘高度的问题：



### 1. 解释莫名高度出现的原因

```css
<style>
    .point04 .box1 {
        line-height: 64px;
        font-size: 20px;
    }

    .point04 .content1 {
        font-size: 32px;
    }
</style>
<div class="point04 box">
    <div class="box1">
        x
        <span  class="content1"> 文本x</span>
    </div>
</div>


```

![image-20180513101050169](/Users/baipu/工作文件/study/github/js/css/img/image-20180513101050169.png)

**解释**：如上，我们设置了`line-height:64px`得到的高度却是68这四个像素来自于哪里呢？来自于文本前边的幽灵空白节点，这里我们用`span`前边的x表示空白节点，因为	`span `前边的空白节点的`font-size`是继承的（这里我写在`box`下模拟继承）`font-size`不一样导致了基线位置不一样，`font-size`越大，基线越靠下，文本的基线就比前边的x的基线靠下，这样差开的基线使两个字不在同一水平上，导致高度比`line-height`要高

**解决方法**：两种方式

1. 改变对齐方式，` .point04 .content1 { font-size: 32px; vertical-align:top;}`上对齐就好了
2. 让幽灵空白点的字体大小和span里额一样大，也就是` .point04 .box1 { line-height: 64px;  font-size: 32px;  }`



### 2、调整div框框比图片 大的问题：

```Html
<style>
    .point04{margin: 100px;}
    .point04 .box1 {
       width: 300px;
       text-align: center;
        border: 1px solid #ccc;
    }

    .point04 .content1 {
        height: 70px;
    }
</style>
<div class="point04 box">
    <div class="box1">
        x
        <img src="./img/test02.jpeg" class="content1"/> 
    </div>
</div>


```



![image-20180513102808480](/Users/baipu/工作文件/study/github/js/css/img/image-20180513102808480.png)

**解释** 如图，高度77px 因为前边x所代表的幽灵空白点导致，所以会大于图片的70px的高度，其实这个效果的出现是`line-height` ` vertical-alien` 幽灵空白点共同作用产生的，

**解决方法：**	四种方式：

1. 图片块状，这样同时干掉了`line-height` ` vertical-align`  还有幽灵空白点
2. `line-height`足够小，**半间距**小到x的下边缘位置靠上就好了，这样就没有下边的半间距撑开了。让`line-height:0`
3. `Font-size`足够小 ，同时`line-height:150%/1.5`之类的。
4. 图片设置其他的`vertical-align`的属性值，`top`,` middle `,`bottom`都可以



### 3、内联导致margin-top:-1000px失效的问题

```html
<style>
    
    .point04 .box1 {
        border: 1px solid #ccc;
    }

    .point04 .content1 {
        margin-top:-1000px;
        height: 70px;
    }
</style>
<div class="point04 box">
    <div class="box1">
        x
        <img src="./img/test02.jpeg" class="content1"/> 
    </div>
</div>
```

![margin-top失效](/Users/baipu/工作文件/study/github/js/css/img/image-20180513104321052.png)

如图，本来设置了`margin-top:-1000px;`我们期望的是吴彦祖能够飞掉，消失在框框中，但是，图中我们看到，并没，原理和上边讲的高度变高是一样的，**css世界中，非主动触发位移的内联元素是不可能跑到计算容器外边的** 

1. 幽灵空白点无法主动设置到`inline`的外边
2. 幽灵空白点的下边和图片是需要对齐的

所以图片无法跑到box的外边了



## 四、vertical-align的线性属性

### 1、inline-block和baseline

一开始我们知道线性属性有：`baseline`	` top`	`middle`  `bottom`

> Inline 的vertical-align的baseline就是x的下边缘
>
> 如果是inline-block元素，里边没有内联元素，或者overflow不是visible,baseline就是margin的底边缘
>
> 否则就是元素里左后银行内联元素的基线

```html
<style>
    .point05 {
        margin: 100px;
    }

    .point05 .box1 {
       display: inline-block;
       width: 150px;height: 150px;
       border: 1px solid #cad5ec;
       background: #f0f3f9;
    }

   
</style>
<div class="point05 box">
    <span class="box1">
       
    </span>
    <span class="box1">x-baseline</span>
</div>

```

![image-20180513124328048](/Users/baipu/工作文件/study/github/js/css/img/image-20180513124328048.png)

效果如图，没有文字的时候，基线就是容器的下边缘，也就是下边框下边的文字。如果里边有文字的时候也就有了行内元素，第二个框就是这些字符的基线，我们看到第一个框的下边缘和第二个框的x的下边缘对齐了。

如果`line-height:0`

![image-20180513125129438](/Users/baipu/工作文件/study/github/js/css/img/image-20180513125129438.png)

`line-height`为0 字符占据的高度也是另，高度的起始位置就成了中心位置，这样文字就有一半到了外边

#### icon 简化开发

```html
<style>
    .point05.box1 {
      line-height: 20px;
    }
    .point05 .icon{
        display: inline-block;
        width: 20px;height: 20px;
        white-space: nowrap;/*不换行*/
        letter-spacing: -1em;/*所有的里边的子都在一块儿显示*/
        text-indent: -99em;/*首行缩进的看不见了*/
    }
    .icon::before{content: "\3000"}


    .icon_delete{
        background: url(./img/delete@2x.png) no-repeat center;
    }

   
</style>
<div class="point05 box1">
    <span class="icon icon_delete">删除</span>delete
</div>
```

![image-20180513130948836](/Users/baipu/工作文件/study/github/js/css/img/image-20180513130948836.png)

注意：

- 图的高度和当前的行高都是20px;(不是由图片说了算，而是css决定了多么高)
- 图标标签里永远有字符：（before的作用就是如此）
- 图标不适用`overflow:hidden`是为了保证里边的字符基线，同时还要让里边的字符不可见
- `box`外边的容器需要时`inline-block`,然后就是找基线的问题了

如下，不同的字体大小都没有问题

```html
<Style>
 .point05 .larger {
            font-size: 20px;
        }
</Style>
  <div class="point05 box1">
        <h4> 标签内没有文字
        </h4>
        <p class="">
            x
            <span class="icon icon_delete"> </span> x删除
        </p>
        <h4>标签有文字</h4>
        <p class="">
            <span class="icon icon_delete "> 删除 </span> x删除
        </p>
        <h4>large</h4>
        <p class="larger">
            <i class="icon icon_delete "> 删除 </i> x删除</p>
        <p>
            <i class="icon icon_delete "> </i> x删除
        </p>

    </div>
```

![image-20180513150029646](/Users/baipu/工作文件/study/github/js/css/img/image-20180513150029646.png)

### 2、top/bottom

> `top`垂直上边对齐
>
> - 内联元素，元素底部和当前行框盒子的顶部对齐
> - `Table-cell` 元素底`padding`边缘和表哥行的顶部对齐

如果是内联元素，则和这一行位置最高的内联元素顶部对齐

如果是`table-cell` 脑补成`td` 和`tr`的上边缘对齐

**这里的边缘指的是行框盒子，而不是块状容器的上下边缘**

### 3、middle近似居中

- 内联元素，元素垂直中心点和行框盒子基线往上1/2 `x-height`处对齐
- `Table-cell` 单元格填充盒子相对于外面的表格行居中

关键是第一点，盒子的基线就是x的下边缘，`x-height`就是x的高度，所以`middle`的点就是x的交叉点，但是一般来说，x的交叉点因字体的原因会略微靠下，一般来说也就是一两个像素的问题，`font-size`越大越明显



**解决：**如果要实现真正意义上的垂直居中，通常是`font-size:0`将x变成一个看不见的点，这样就可以实际上的居中了

## 五、文本属性/上下标

### `text-top`:盒子顶部和父级内容区域的顶部对齐

内容区域：可以看成是`firefox /ie`浏览器文本选中当前元素`font-size`和`font-family`下应由区域的大小

实用性不强，因为：

- 场景比较缺乏，当前`css`以精致布局为主流，对齐文本场景比旧时代少很多
- 文本类垂直对齐理解成本高，不如直接用vertical-align或者是relative等
- 内容区域不直观，容易改变

### 上下标类属性值

`sub`和`super`两个 ，b的圈在小编，表示下标，p在上边，标上上标

`vertical-align:super`:提高盒子的基线到父级合适的上标基线位置

。。。合适的位置，这个语义这么不明确，怎么玩。。。

注意的是，`vertical-align`不会改变`font-size`的大小，但是可以实用`<sup></sup>`这一类的标签



## 六 、弹出框

```html
 <style>
        .point06.container{
            position: fixed;
            top: 0;right: 0;bottom: 0;left: 0px;
            background: rgba(0,0,0,.5);
            text-align: center;
            font-size:0;
            white-space: nowrap;
            overflow: auto;
        }
        .point06.container::after{
            content: "";
            display: inline-block;
            height: 100%;
            vertical-align: middle;
        }
        .dialog{
            display: inline-block;
            vertical-align: middle;
            background: white;
            text-align: left;
            font-size: 14px;
            white-space: nowrap;
        }
        .content {
            width: 240px;
            height: 120px;
            padding: 20px;
        }

    </style>
    <div class="point06 container">
        <div class="dialog">
            <div class="content">test</div>
        </div>
    </div>
```

![image-20180513155305937](/Users/baipu/工作文件/study/github/js/css/img/image-20180513155305937.png)