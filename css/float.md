---
typora-copy-images-to: ./img
---

# float

[TOC]



## 一、float 的本质与特性

`float`本来是为了实现文字环绕效果而设计的，但是现在被用于设定宽高的砌砖头的布局方式，稍有改动就会样式错乱，所以建议：**浮动是魔鬼，少砌砖头少浮动，更多的去挖掘css世界本身的流动行和自适应性**

`css2`的重点还是图文展示，但是现在比较流行更为绚丽饿的诗句效果和更为丰富的网页布局，所以，`flex`弹性盒子布局出现，让 大家不得不去以自适应的方式实现布局

`float`又如下的特性：

- 包裹性 （`float`元素是里边子元素的最大值）

- 块状化并格式化上下文

- 破坏文档流

- 没有任何的`margin`合并

  **注意：** 不要指望在float元素下使用text-align因为float会默认的让元素的`display`变成`block`或者是`table`（`float`会将`display：inline-table`变成`display:table`）



## 二、float 作用机制

他有个著名的图恶性，让父元素的高度塌陷，大多数的场景下会影响正常的布局，但是要注意，这个让父元素塌陷不是缺点，不是`bug`，这个只是为了实现文字环绕效果才出来的，但是在今天的布局里是不需要float塌陷的，也因为这个特性可能会出现一些不一样的效果。

元素高度塌陷只是一个效果，还有另一个效果是‘<u>行框盒子和浮动元素的不可重叠性</u>’

```html
<style>
        .point01 .father{
            width: 400px;
        }
        .point01 .floatleft{
            float: left;
        }
        .point01 .father img{
            width: 180px;
        }
         .point01 .father .div{
             width: 180px;
             height: 30px;
            background: #ccc;
        }
    </style>
    <div class="point01">
        <div class="father"><img src="./img/test.png" alt="" class="floatleft">我是文字，虽然我的兄弟元素img 已经float了，但是他并不会盖在我的上边，我绕着他走的</div>
        <div class="father"><img src="./img/test.png" alt="" class="floatleft"><div class="div">那如果我在block元素里边了呢？额···</div></div>
    </div>
```



![image-20180515195105289](/Users/baipu/工作文件/study/github/js/css/img/image-20180515195105289.png)

```html
 <style>
        .point02{
            display: block;
        }
        .point02 .father {
            width: 200px;
            height: 64px;
            border: 1px solid #ccc;
        }
        .point02 .floatleft {
            float: left;
        }
    
        .point02 .father img {
           width: 60px;
           height:64px;
        }
    
        .point02 .father .div {
            width: 180px;
            height: 30px;
            background: #ccc;
        }
    </style>
    <div class="point02">
        <div class="father">
            <div class="floatleft"><img src="./img/test.png" alt=""></div>
            框框的高度和图片的高度一样高，由于一些额外的原因，vertical-align等的原因，图片的高度高粗框框一丢丢，同时因为不覆盖原则，所以有一行空行是被环绕的</div>
    </div>
```

![image-20180515201833104](/Users/baipu/工作文件/study/github/js/css/img/image-20180515201833104.png)

所以，一般来说我们需要用一些干净的手段来清除浮动的影响；



## 三、 float更深入的作用机制

- **浮动锚点：**`float`本身是流中的一个点，这个点本身并不浮动，表现起来更像是一个没有`margin` `border` `padding`的空内联元素
- **浮动参考：**浮动元素对齐的参考的实体

```html
 <style>
        .point03 {
            display: block;
        }
    
        .point03 .father {
            width: 200px;
            
        }
        .father .more{
            float: left;
            background: #ccc;
        }
       
    </style>
    <div class="point03">
        <div class="father">
            <h3>我是一个非常长的,长到能够换行的标题元素，然后我们看看更多这个按钮在哪呢？理论上他是应该在我的后头头追加的<a class="more" href="#">更多</a></h3>
        </div>
        
    </div>
```

![image-20180515210651840](/Users/baipu/工作文件/study/github/js/css/img/image-20180515210651840.png)

### float与流体布局

除了目录树，还有三栏布局如图：

```html
 <style>
        .prev{
            float: left;
        }
        .next{
            float: right;
        }
        .title{
            margin: 0 70px;
            text-align: center;
        }
    </style>
    <div class="box">
        <a class="prev">&laquo 上一张</a>
        <a class="next">下一章&raquo</a>
        <h3 class="title">第十二章，this is test </h3>

    </div>

```

![image-20180515212156267](/Users/baipu/工作文件/study/github/js/css/img/image-20180515212156267.png)

## 四、float的天然克星 clear

> `Clear`：元素盒子的边，不能和前面的浮动元素相邻

clear的值是这样的：

- `none`:浮动就浮动，我也没办法
- `left`：左侧不能浮动
- `right`: 右侧不能浮动
- `both`: 两边都不能浮动

left和both没什么卵用， 直接`clear:both`就好了

```html
 <style>
        .point04{
            display: block;
            margin: 100px;
            height: 100px;
        }
    
        .point04 li {
            /* display: block; */
           list-style-type: none;
            width: 30px;
            height: 30px;
            margin: 5px;
            float: left;

            text-align: center;
            line-height: 30px;
            
            border: 1px solid #ccc;
    
        }
    
        .point04 li:nth-of-type(3) {
            clear: both;
        }
    </style>
    <div class="point04">
        <ul>
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
            <li>5</li>
        </ul>
    </div>
```

![image-20180515214155108](/Users/baipu/工作文件/study/github/js/css/img/image-20180515214155108.png)

### clear的弊端：

> `clear`只有在块级元素才是有效的，但是::after等为元素默认是内联等，所以借用`::after`的时候，需要设置`display:block;`

```
 .clear::after {
            content: "";
            display: block;
            clear: both;
        }
```







```html
<style>
    .point04 {
       
    }

    .point04 .father {
        /* display: block; */
       display: block;
        margin: 100px;
        height: 100px;
        width: 300px;
        border: 1px solid #ccc;

    }
      .point04 .father::after{
          contain: "";
          display: block;
          clear: both;
      }
    .point04 .father img{
        height: 100px;
        float: left;

    }
</style>
<div class="point04">
   <div class="father"><img src="./img/test02.jpeg" alt="" sr=""><!--  -->
    <div class="font">我理论上应该在右边怪怪的呆着，但是旁边突然出现了一个clear，<div style="clear:both"></div><这时候起我的其他文字就被挤下去了，其实换行后并没有真正的清楚浮动，只是换行了而已</div>
    </div>
</div>

```





使用了`clear`有一些特性依然存在，就比如：

- 如果`clear:both`元素前边就是`float`那么，`margin-top`负值即使是`-9999px`也不会有任何的作用
- `clear:both`后边的元素依旧可能会发生文字环绕的现象

有时候父元素设置了`clear:both`组织浮动对其他元素的影响，但是最后错位依然还是有的，（就比如上图）

所以为了彻底清楚浮动，我们建议用`BFC`



