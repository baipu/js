[TOC]

# 壹、x

##1、字母与基线

1. Line-height 行高的定义就是两基线的间距
2. vertical-align默认的值就是基线
3. **字母x的下边线就是我们的基线**

## 2、x-height 与ex

x-height就是小写字母x的高度，

在css世界中，`vertical-align:middle`的`middle`就是只基线上1/2 `x-height`的高度,所以`vertical-align:middle`不是绝对的居中了，不同的字体，x的基线不一样，高度也不一样，所以只是看起来好像在中间一样

ex兼容性比较早，ie6就可以了，ex就是x-height的大小。

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

## 1、内联高度的根本：line-height

> 内联元素的高度不是由`font-size`元素决定的，而是由`line-height`撑开的，so非替换元素的纯内联元素的可视高度，完全由`line-height `决定



