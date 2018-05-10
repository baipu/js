# margin

[TOC]

## 一、布局与尺寸

1、`margin`普通情况下不影响可视尺寸，只有元素在 充分利用可用空间 的时候才影响可视尺寸

2、value可以是负值

3、可以用来实现流体布局

4、内联（inline）元素垂直方向的margin是没有任何影响的

### 图片左侧定位

```html
 <style>
        .point01 .box{overflow: hidden}
        .point01 .box >img{float: left;width: 140px}
        .point01 .box >p {margin-left: 140px}
    </style>
<div class="point01">
    <div class="box">
        <img src="./img/test.png" alt="">
        <p>文字内容。文字内容。文字内容。文字内容。文字内容。文字内容。文字内容。文字内容。文字内容。文字内容。文字内容。文字内容。文字内容。文字内容。文字内容。文字内容。文字内容。文字内容。文字内容。文字内容。文字内容。文字内容。文字内容。文字内容。文字内容。文字内容。文字内容。。。</p>
    </div>
</div>
```

![左侧布局](/Users/baipu/工作文件/study/github/js/css/img/左侧布局.png)

### 流体布局右侧固定

````
style>
    .point02 .box {
        overflow: hidden
    }

    .point02 .box>img {
        float: left;
        margin-left: -140px;
    }

    .point02 .full{
        width: 100%;
        float: left;
    }
    .point02 .box p {
        margin-right: 140px
    }
</style>
<div class="point02">
    <div class="box">
        <div class="full">
<p>文字内容。文字内容。文字内容。文字内容。文字内容。文字内容。文字内容。文字内容。文字内容。文字内容。文字内容。文字内容。文字内容。文字内容。文字内容。文字内容。文字内容。文字内容。文字内容。文字内容。文字内容。文字内容。文字内容。文字内容。文字内容。文字内容。文字内容。。。</p>
        </div>
        <img src="./img/test.png" width="140">
       </div>
</div>
````



效果如下，注意：

`.point02 .box>img { float: left; margin-left: -140px; }   `

![youcebuju](/Users/baipu/工作文件/study/github/js/css/img/youcebuju.png)

### 等高布局：

```html


<h3>等高</h3>
<style>
    .point04 .box {
        overflow: hidden;
    }

    .point04 .c_left,
    .point04 .c_right {
        float: left;
        width: 300px;
        margin-bottom: -9999px;
        padding-bottom: 9999px;
    }
    .c_left{
        background: gray;
    }
    .c_right{
        background: red;
    }
</style>
<div class="point04">
<div class="box c_left">
    <h4>正方观点</h4>
    <p>观点1111</p>
</div>
<div class="box c_right">
    <h4>反方观点</h4>
    <p>观点1111</p>
    <p>观
        点1111</p>
    <p>观点1111</p>
    <p>观点1111</p>
</div>
</div>
```

效果：

![等高](/Users/baipu/工作文件/study/github/js/css/img/等高.png)

解析：

两个padding和margin把页面拉的特别长，最终显示的是内容撑开的父亲的大小，其他的地方都被遮挡了

但是还是建议用table-ceil



## 二、margin合并

### 三种合并场景：

1. 相邻元素合并

   ```html
   <style>
       .point06  p{
          margin: 1 em 0;
       }
   
       .point06 .container>h2 {
           font-size: 128px;
           margin-top: 100px;
           color: #fff;
       }
   </style>
   <div class="point06">
      <p>第一行</p>
      <p>第二行</p>
      <p>第三回</p>
      <p>第四行</p>
      <p>第五行</p>
      <p>第六行</p>
   </div>
   
   ```

   效果如下：![margin合并_01](/Users/baipu/工作文件/study/github/js/css/img/margin合并_01.png)

   

2. 父级和第一个/最后一个子元素

   eg：banner里边有自己的内容，如果内容要靠margin靠中间的话，会把banner挤下来的,如何解决这种功能问题？注释中的四种方法

   ```html
   <style>
       .point05 {}
   
       .point05 .container {
           /* overflow: hidden; *//*格式化父元素*/
           /* border-top: 1px solid gray; *//*父元素设置border-top的值*/
           /* padding: 1px; *//*父元素设置padding*/
           max-width: 1020px;
           height: 300px;
           background: green;
       }
   
       .point05 .container>h2 {
           font-size: 128px;
           margin-top: 100px;
           color: #fff;
       }
   </style>
   <div class="point05">
       <h1> i am the title </h1>
       <div class="container">
           <!-- <a>123</a> --><!--   父元素和第一个子元素之间添加内敛元素进行分离-->
           <h2>this is test</h2>
       </div>
   </div>
   
   ```

   ![margin合并](/Users/baipu/工作文件/study/github/js/css/img/margin合并.png)

3. 空块级元素的margin合并

   如果父亲里边有一个空元素，上下margin都是10 结果父元素的高度只有10 因为子元素的上下margin合并了

   ```html
   
   <style>
      .point07 .father{
           overflow: hidden;
       }
       .point07 .son{
           margin: 10px 0;
           /* padding-top: 1px; */
           /* border-top: 1px solid green; */
           /* min-height: 1px */
       }
   </style>
   <div class="point07">
   
   <div class="father">
       <div class="son">
           <!-- 12 -->
       </div>
   </div>
   </div>
   ```

   

### 三种合并规则：

1. 正正取大
2. 正负相加
3. 负负最负



## 三、margin:auto

前提：

1、div等元素，在没有设置`width` 和`height `的时候 他也会自动填满容器`<div></div>`

2、有时候，元素没有设置width height 也会自动填充对应的方位

```Css
div{
    position:absolute;
    left:0;right:0;
}
```



> Margin:auto 的属性值就是基于以上两点实现的，填充规则如下：
>
> 1. 一侧定值，一侧auto 那么auto剩下的空间大小
> 2. 两边都是auto ，那么平分剩余空间大小

如下几个例子：



![marginleft](/Users/baipu/工作文件/study/github/js/css/img/marginleft.png)

![margin_auto](/Users/baipu/工作文件/study/github/js/css/img/margin_auto.png)

![margin](/Users/baipu/工作文件/study/github/js/css/img/margin.png)

### margin：auto高度不居中的问题：

margin:auto居中的前提是自动填充的功能，但是垂直高度上，本来div都不会自动填充，所以也不会自动分配margin进行填充了。

如果要用margin:auto实现垂直居中，可以使用手动创建垂直自动填充功能进行居中

**不兼容ie8**

```html
<style>
    .point08 .father{
        width: 300px;
        height: 300px;
        background: grey;
        position: relative;
    }
    .point08 .son {
        width:200px;
        height: 200px;
        background: red;
        position: absolute;
        top: 0;bottom: 0;left: 0;right: 0;
        margin: auto;
    }

</style>
<div class="point08">
    <div class="father">
        <div class="son">
            i am the son 
        </div>
    </div>
</div>

```

之前我以为这里的垂直居中是因为`position`的`top bottom`的拉伸作用使元素上上不去下下不来才居中的，但是这里如果我们将`.point08 .son `的`margin：auto`删除，将不再居中，所以position只是用来提供自动填充的功能

还有一种，如果不考虑水平居中的话，可以如下：

```css
.point08 .father{
        width: 300px;
        height: 300px;
        background: grey;
        /* position: relative; */
        writing-mode: vertical-lr;
    }
```

## 四、margin 无效的情况

1. 内联（`inline`） 非替换（除了类似于`<img> <iframe>`的元素）元素的高度设置margin没用

2. `tr td` 或者 `table-cell table-row` 的元素，但是`table-caption table` 或者是`inline-table`就没有问题了

3. 父子`margin`合并的时候，就可能让子的`margin`没用

4. 绝对定位的非定位方向的`margin`,因为设置了right，这样left没有设置的时候，调试的再大也没有用了，但是如果给`left：0`一个值，元素立马会因为`margin：1000px`而消失不见或者十分靠右

   ```css
     		position: absolute;
           top: 0;bottom: 0;right: 10px;
           margin-left: 1000px;
   ```

5. 定高容器的`margin-bottom` 或者是定宽的` margin-right`

6. 鞭长莫及导致margin失效

    ```Html
     <style>
           .point09 .son1 {
               float: left;
               width: 256px;
           }
           .point09 .son2 {
               overflow: hidden;
               margin-left: 250px;
           }
       </style>
       <div class="point09">
           <div class="father">
               <img src="./img/test.png" alt="" class="son1">
               <div class="son2">
                   i am the son
               </div>
           </div>
       </div>
    ```

   这个时候，只要margin小于256 无论正负都不变化

7. 内联特性导致的margin无效

   ```html
    <style>
           .point09 .father {
   
           }
           .point09 .son1 {
               height: 96px;
               margin-top: -600px;
   
   
           }
       </style>
       <div class="point09">
           <div class="father">
               <img src="./img/test.png" alt="" class="son1">
               <div class="son2">
                   i am the son
               </div>
              
           </div>
       </div>
   ```

   这个时候，margin-top往上一定程度后就无法再移动了，比如margin-top:-200px;上移动了200px;但是在将其改为300还是200的位置，并不会因此而进行改变

   