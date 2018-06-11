# overflow结界

常常我们用clear:both来清楚float的影响，但是在float一文中我们也说过，clear并没有真正的清楚了float浮动，只是让下一行元素不和float元素在同一行而已。用来清楚float最好的方法还是BFC结界清除，overfloat便是以为不会产生包裹性的元素。

## 1、border box裁剪界线：





```html
 <style>
        .point01 .box{
            width: 200px;height: 200px;padding: 10px;border: 10px solid #ccc;
            overflow: hidden;
        }
         .point01 .box img{
             width: 400px;
         }
    </style>
    <div class="point01">
        <div class="box"><img src="./img/test02.jpeg" alt=""></div>
    </div>	
```

![image-20180516194158906](/var/folders/mw/5vvml0vn1bs6ycsmrm4tm2dm0000gn/T/abnerworks.Typora/image-20180516194158906.png)

如上所示，但是如果我们还是希望四周都有padding的白框，我们可以用透明的边框，因为这个时候，内边距padding属性是无能为力的。

当然，如果不是overflow，而是auto的时候，chrome和firefox就有两种表现形式了。	

![image-20180516194944647](/var/folders/mw/5vvml0vn1bs6ycsmrm4tm2dm0000gn/T/abnerworks.Typora/image-20180516194944647.png)![image-20180516195226090](/var/folders/mw/5vvml0vn1bs6ycsmrm4tm2dm0000gn/T/abnerworks.Typora/image-20180516195226090.png)

## 2、overflow-y 和overflow-x

这两个属性和overflow一模一样

- visible
- hidden
- scroll
- auto

但是设置了并不一定有效，规则如下：

>  如果x y中的一个值为visible，另一个是scroll auto那么visible的样式就是auto的样式，也就是除非x y 都是visible否则visible会被当成auto解析

## 3、overflow与滚动条

关于滚动条有两个结论：

1. pc端，无论是什么浏览器，默认的滚动条均来自于<html> 而不是<body>标签。

   所以如果想干掉页面的滚动条，只需要

   ```css
   html{overflow:hidden;}
   ```

2. 在pc端，滚动条是会占用元素额可用宽度或者是高度的。但是移动端因为屏幕有限，一定是炫富模式不会占据可用宽度的，然后所有pc的浏览器的宽度都是17px没有例外，只要ie7及其以上就是17px

   滚动栏占据宽度最大的问题是页面加载的时候水平居中的页面会出现抖动的情况，因为默认床提示没有滚动条的，html是自上而下加载的，加载的时候出现滚动条，宽度重新计算导致这个问题，一般的解决办法是：

   ```Css
   html{overflow:hidden;}
   ```

   但是不满意一个屏幕就有问题，所以建议如下的代码

   ```html
   
     <style>
           html{overflow-y:scroll;}
           :root{overflow-y: auto;overflow-x: hidden;}
           :root body{
               position: absolute;
           }
           body{
               overflow: hidden;
               width: hidden;
           }
   
       </style>
   
   ```

   

## 4、overflow 锚点定位

### 锚点定位的触发条件：

1. url重的锚点和元素对应并有交互行为

2. 可focus的锚点元素处于focus状态

   >  input button等元素当你摁tab键的时候就会自动的跳转获取焦点，如果获取焦点的input不在屏幕范围内的话，那就自动滚动到这个范围内。

上边两个还是有区别的，url的锚点定位让元素定位在浏览器的窗体上边缘，focue锚点定位，让元素在浏览器窗体范围内显示就好了，并不一定是上边缘

### 锚点定位的本质

- 本质上是通过改变容器滚动高度或者宽度来实现的。而且锚点滚动时容器的滚动高度，而不是浏览器的滚动高度。

- 滚动高度时由内而外的

  ​	当普通的元素和窗体同事可以滚动的时候，会由内而外的触发所有可滚动窗体的锚点定位行为。

**就算是设置了overflow:hidden的元素也是可以滚动的，这也是本小姐的核心，hidden和auto的区别就是没有滚动条数笔哦啊滚动也没有效果，但是如果用锚点定位的，无论是哪个url定位还是focus定位，都会发现，其实还是能够出现在显示屏上的**

