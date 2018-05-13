[TOC]

# 壹、x

##1、字母与基线

1. `Line-height` 行高的定义就是两基线的间距
2. `vertical-align`默认的值就是基线
3. **字母x的下边线就是我们的基线**

## 2、x-height 与ex

`x-height`就是小写字母x的高度，

在css世界中，`vertical-align:middle`的`middle`就是只基线上1/2 `x-height`的高度,所以`vertical-align:middle`不是绝对的居中了，不同的字体，x的基线不一样，高度也不一样，所以只是看起来好像在中间一样

ex兼容性比较早，ie6就可以了，ex就是`x-height`的大小。

用法在副作用上，用来实现文字后的小图标居中对齐(不受字体和字号影响的内联元素的垂直居中对齐效果)

> 内联元素默认基线对齐，基线是x的底线 然后如果图标就是x的高度的话，看起来就好像居中对齐一样



```html
<style>
        .point01 .icon_arrow{
            display: inline-block;
            width: 20px;
            height: 1ex;
            background: url(./img/arrow.png) no-repeat center
        }
    </style>
    <span class="point01 "> i am the testx<span class="icon_arrow"> </span></span>
```



![image-20180509205350668](/var/folders/mw/5vvml0vn1bs6ycsmrm4tm2dm0000gn/T/abnerworks.Typora/image-20180509205350668.png)

# 贰、 line-height

> 内联元素的高度不是由`font-size`元素决定的，而是由`line-height`撑开的，so非替换元素的纯内联元素的可视高度，**完全**由`line-height `决定

1. 一般来说，行距 = `line-height` - `font-size`

2. 当我们的字体是**宋体**的时候，内容区域和`em-box`是等同的

3. Line-height 小于 font-size的时候字会叠加到一起，行距为负值

4. Line-height不可以影响替换元素的高度，如img，但是能改变替换元素相邻兄弟元素'幽灵空白节点'

5. 如果行内元素和替换元素在一块，也就是图文模式的时候，line-height只能影响最小高度因为

   1. 替换元素高度不受line-height影响
   2. vertical-align背后的作用

6. 单行文字居中，只要设置line-height就可以了，如果有高度的话，需要把line-height和高度设置的一样高就好了

7. 行高控制文字居中，不仅适用于单行，多行也是可以的，**line-height能够让单行或者是多行文字近似的垂直居中**注意这的近似

   ```
    <style>
   		/*--大的盒子用line-height--*/ 
           .point02 .box {
              line-height: 1024px;
           }
       	/*小的盒子，让他先成为行内元素，然后居中显示就好了*/
           .point02 .content {
              display: inline-block;
              line-height: 20px;
              vertical-align: middle;
           }
       </style>
   ```

   > 因为内联元素都是基线对齐的，所以我们通过对.content设置vertical-align:middle来调整多行文本的垂直位置

8. `line-height`的值可以是数字，px， em， 百分比，猛一看，`line-height:150%;` `line-height:1.5` `line-height:1.5em`没有区别，实际上，`line-height:1.5 `和另外两个有点区别，`line-height:1.5`所有子元素都是继承1.5，但是如果是百分比，或者是em子继承的是计算出来的那个px

    比如：

   - **`line-height:1.5;`**`font-size : 20px;`实际效果是` line-height:30px`;如果儿子的`font-size : 30px; `  `line-height`的实际效果是45px;
   - **`Line-height:150%;`**`font-size:20px;` 实际效果 `line-height:30px;`如果儿子`font-size:30px; ` `line-height`的值依然是30px;

9. 如果line-height:150%;想要有line-height:1.5的效果使用方法：

   ```Css
   *{line-height:150%}
   /**因为通配符表示所有的元素，优先级大于继承来的css**/
   ```

10. 推荐的line-height的值：

    1. 重内容展示的网页，比如博客，论坛之类的，一定用数值作为单位。
    2. 如果是偏重于布局结构精致的网站，长度数值都好
    3. 如果是数值，一般1.3 1.4 1.5都好，但是如果是长度值，20px推荐，因为计算方便

11. 大值特性：

    ```
    <div class="box">
    	<span></span>
    </div>
    ```

    上边的情况，无论	`box span`的`line-height`谁大谁小，`box`的高度由大的那个`line-height`决定



