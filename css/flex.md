# vFlex布局

[TOC]

 兼容ie10

## 1、 概念

弹性布局，为盒状模型提供最大的灵活性

### 1.1 语法

````css
.box{
    display:filex;
}
//如果是行内元素
.box{
    display:inline-flex;
}
````

如果是web-kit内核的呢？

````css

.box{
  display: -webkit-flex; /* Safari */
  display: flex;
}
````

**如果设置了父元素是 flex，那么子元素的float clear vertical-align都将失效 **

### 1.2 基本概念

![flex概念图](./img/flex.png)

申明flex的元素称之为容器，所有的子元素都是他的容器成员，称为flex项目

容器默认存在两根轴：水平的主轴（main axis）和垂直的交叉轴（cross axis）。主轴的开始位置（与边框的交叉点）叫做`main start`，结束位置叫做`main end`；交叉轴的开始位置叫做`cross start`，结束位置叫做`cross end`。

项目默认沿主轴排列。单个项目占据的主轴空间叫做`main size`，占据的交叉轴空间叫做`cross size`

## 2、容器

````css
flex-direction
flex-wrap
flex-flow
justify-content
align-items
align-content
````

### 2.1 flex-direction

表示主轴的方向，有四个参数

````css
.box {
  flex-direction: row | row-reverse | column | column-reverse;
}
````

- row（默认值）：主轴为水平方向，起点在左端。

- row-reverse：主轴为水平方向，起点在右端。

- column：主轴为垂直方向，起点在上沿。

- column-reverse：主轴为垂直方向，起点在下沿。

  ​### 2.2 flex-wrap属性

  `flex-wrap`属性定义，如果一条轴线排不下，如何换行

````css
  .box{
     flex-wrap: nowrap | wrap | wrap-reverse;
   }
````

  它可能取三个值。

  1. `nowrap`（默认）：不换行。
  2. `wrap`：换行，第一行在上方。
  3. `wrap-reverse`：换行，第一行在下方。

### 2.3 flex-flow

`flex-direction`属性和`flex-wrap`属性的简写形式，默认值为`row nowrap`。

````css
box {
  flex-flow: <flex-direction || <flex-wrap>;
}
````

### 2.4 ustify-content属性

属性定义了项目在主轴上的对齐方式

````css
.box {
  justify-content: flex-start | flex-end | center | space-between | space-around;
}
````

- `flex-start`（默认值）：左对齐
- `flex-end`：右对齐
- `center`： 居中
- `space-between`：两端对齐，项目之间的间隔都相等。
- `space-around`：每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍。

### 2.5 align-items属性

`align-items`属性定义项目在交叉轴上如何对齐。

它可能取5个值。具体的对齐方式与交叉轴的方向有关，下面假设交叉轴从上到下。

 - `flex-start`：交叉轴的起点对齐。
 - `flex-end`：交叉轴的终点对齐。
 - `center`：交叉轴的中点对齐。
 - `baseline`: 项目的第一行文字的基线对齐。
 - `stretch`（默认值）：如果项目未设置高度或设为auto，将占满整个容器的高度。

![test](./img/flex_align_item.png)

### 3.6 align-content属性

`align-content`属性定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。

 ````css
 .box {
   align-content: flex-start | flex-end | center | space-between | space-around | stretch;
 }
 ````

- `flex-start`：与交叉轴的起点对齐。
- `flex-end`：与交叉轴的终点对齐。
- `center`：与交叉轴的中点对齐。
- `space-between`：与交叉轴两端对齐，轴线之间的间隔平均分布。
- `space-around`：每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍。
- `stretch`（默认值）：轴线占满整个交叉轴。

![align](./img/flex_align_content.png)

## 3、项目的属性

### 3.1、order属性

`order`属性定义项目的排列顺序。数值越小，排列越靠前，默认为0。

````css

.item {
  order: <integer>;
}
````

![order](./img/flex_order.png)

### 3.2、flex-grow属性

`flex-grow`属性定义项目的放大比例，默认为`0`，即如果存在剩余空间，也不放大

````css

.item {
  flex-grow: <number>; /* default 0 */
}

````

![flex_grow](./img/flex_grow.png)

### 3.3、flex-shrink属性

`flex-shrink`属性定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。

 ````css

.item {
  flex-shrink: <number>; /* default 1 */
}

 ````

![shrink](./img/flex_shrink.jpg)

### 3.4、flex-basis属性

`flex-basis`属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为`auto`，即项目的本来大小。

````css

> .item {
>   flex-basis: <length> | auto; /* default auto */
> }

````

它可以设为跟`width`或`height`属性一样的值（比如350px），则项目将占据固定空间。

### 3.5、flex属性

`flex`属性是`flex-grow`, `flex-shrink` 和 `flex-basis`的简写，默认值为`0 1 auto`。后两个属性可选。

 ````css

 .item {
   flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]
 }

 ````

该属性有两个快捷值：`auto` (`1 1 auto`) 和 none (`0 0 auto`)。

建议优先使用这个属性，而不是单独写三个分离的属性，因为浏览器会推算相关值。

### 3.6、align-self属性

`align-self`属性允许单个项目有与其他项目不一样的对齐方式，可覆盖`align-items`属性。默认值为`auto`，表示继承父元素的`align-items`属性，如果没有父元素，则等同于`stretch`。

> ````css
> .item {
>   align-self: auto | flex-start | flex-end | center | baseline | stretch;
> }
> ````
该属性可能取6个值，除了auto，其他都与align-items属性完全一致。