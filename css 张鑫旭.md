---
title: css 张鑫旭 
tags: 新建,模板,小书匠
grammar_cjkRuby: true
---
[toc]
# 1、Relative 
## 和absolute的搭配：

1. 限制 相对定位
2. 限制层级关系，absolute的index还是看父级的z-index自己的没什么乱用
2. 限制超越overflow


## relative和定位：
1、relative是想对自身原来的定位的偏移，absolute是找限制他自己的
2、无侵入的布局，，不影响其他元素的布局
3、同时设值了top 和bottom的时候，两个只显示一种，显示 前边的
## relative的层级
可以提高元素的层叠上下文
不会限制absolute的层叠上下文
## relative最小化影响的原则
尽量降低他对起亚元素的影响
1、尽量避免使用relative
2、使用的时候不使用relative
# 2、absolute
## 1、与float的兄弟关系
包裹性：容器absolute的话紧贴内层元素
破坏性：就是说absolute撑不开父节点了
## 2、 不和relative绑定到一起：
clear清理float的残局情况
relative越独立越强大
独立的absolute可摆脱overflow的限制

## 3、 无依赖的绝对定位
不依赖absolute也不用top bottom  right left


1、 脱离文档流
动画尽量作用在绝对定位的元素上：因为不会影响到周围的元素
z-index 如果有两个absolute的话，那就同过dom流来控制谁在上边，如果很多的话，这种情况很少见，用z-index=1就能显示，如果是在非弹框元素上 z-index大于2说明你的代码冗余了



2、 折翼天使？？？
2.1 去浮动
2.2 位置跟随，就是

>无依赖的绝对定位如果没有设值top left 等的话，他就会还是在原来的地方，同过margin调整位置 然后会抽离出来，脱离文档流，本身不占据任何空间
>下拉框的事件处理可以是失去焦点



对齐居中或边缘：
position:absolute;
text-align:center;//前边添加一个空格，然后位置跟随，这里的text就是控制空格
margin-left:-26px;//这里是图片的一半


3、 天使的羽翼：left right top bottom 
3.1. 两两组合使用
3.2. 会被relative stricky absolute fixed 限制
3.3. left right top bottom 与heihgt width 的异曲同工,相互匹配
	如果绝对定位方向是相对的，不是瞬间位移，而是直接拉伸
	position：absolute;top:0;left:0;width:50%;
	position：absolute;top:0;left:0;right:50%;
	以上两种情况一个意思
	
	
	如果一个元素想让自己宽高百分比的是后就要父亲宽高不是auto
	
	如果宽高和拉伸效果同时存在，这时候宽高设置大于拉伸效果
	相互合作，如果两个同时存在，就可以实现绝对居中的情况
	
4、absolute网页整体布局：适合移动web的布局策略
	拜托狭隘的定位：
	1、body降级，元素升级
	.contianer{position:absolute;top:0;left:0;bottom:0;right:0;}
	这时候需要添受限于父级：
	body{height:100%;}//一般情况下，body的高度是0
	2、 头尾侧边栏各居其位
	header,footer{position：absolute;left:0;right:0;}
	header{height:48px;top:0;}
	footer{height:52px;bottom:0;}
# 3、float
# 4、Overflow
## 第1章 Overflow基本属性 
visible:默认，
hidden	：超出去隐藏，不是剪裁
scroll：滚动	
auto：不足的是后没有滚动条
inhert：ie8以上兼容
overflow-x:水平隐藏，垂直方向开始滚动，如果两个值相同，如果值不同，如果一个被赋值vidible另一个hidden/auto那么，visible会被重置为auto
overflow-y:
兼容性：
1、滚动条，都比较丑
2、宽度设值机制

作用的前提：
非inline   对应方位的尺寸处理
button文字越多，留白越大，然后用overflow:visible可解决
## 第2章 Oveflow与滚动条 
滚动条出现条件：
overflow:autp pverflow:scroll   html textarea
文字超出了限制

无论什么浏览器，滚动条来自于html元素，而不是body标签
body 默认的。5em  margin
ie 67 html 类似于overflow:y:scroll
ie8+  html{overflow：auto}

js与滚动高度：
chrome浏览器：document.body.scrollTop
其他浏览器：	document.socumentElment.scrollTop
两者不会同时存在，


ie7 chrome fireFox的滚动条宽度都是17
水平居中的跳动问题解决办法：
1、默认显示
2、padding-left:calc(100vw-100%);

滚动条的自定义：
![相关的参数设值][1]


## 第3章 Overflow与块状格式上下文 
bfc: block format context
避免margin穿透：overflow:
两栏自适应布局：
.cell{
display:table-cell;width:2000px;//ie8bfc特性
*display:inline-block;*width:auto;//ie7weitexing 
}

## 第4章 Overflow与absolute绝对定位 
如果为absolute的时候就需要overflow:hidden  	剪裁失效了
绝对定位元素不总是被父级overflow属性裁剪，尤其是当overflow在觉得对定位元素及其包含块之间的时候

解决办法：
	1、overflow自己为包含块
	2、overflow的子元素为包含块
	3、**任意合法的transform声明当成包含快**
		3.1. overflow自身transform ie9+  firefox可以  chrome和safari不行
		3.2 overflow子元素 transform 都可以	
## 第5章 依赖Overflow 的样式表现 
1. resize拉伸，但是overflow不能是visible
	resize :both/horizontal /vertical只有垂直方向拉
2.  text-overflow:ellipsis属性，依赖overflow:hidden



## 第6章 Overflow与锚点技术 
锚点定位的本质：改变容器的滚动高度
1、容器可滚动
2、锚点在容器内
锚点定位的触发：1、url地址中的锚链与锚点元素2、可focus的锚点元素处于focus状态
作用：1、快速定位
overflow的选项卡技术：
![锚点选显卡][2]
# 5、border
##  第1章 border-width不支持百分比 
 why？使用场景决定
outline box-shadow text-shadow
支持的关键字：thin 1px; middle:3px; thick:5px;
border-style:double;至少3px才有作用
## 第2章 深入了解各种border-style类型 
虚线dashed
chrome firefox宽高3：1 虚实1：1  
ie:宽高2：1 虚实2：1

点线：dotted
chrom firefox:方框 
ie 圆的 ======》ie7/8实现圆角效果
双线：double
计算规则： 1px: 0+1+0  2px; 1+0+1 3px 111 4px121 5px:212 6px:222 7px:232
双线永远相等，然后中间空白区加减一
可以用来绘制图形
![用来绘制图标][3]
内凹：inset;

## 第3章 border与color 
border-color:用的是color的颜色，但是没啥用 其他的类似用color做颜色的：box-shadow text-shadow outline 
作用：如果不设置颜色的话，一个hover的时候只需要改变color的颜色就好了，不用两个都改变


## 第4章 border与background定位 
 background定位的局限：只能针对于左上角，不能针对于右上角
 方法其实很多，一个方法就是相对于border给右侧一个透明的边框就好了
 background-position:100% 40px;
 border-right:50 solid transparent
 100%右侧定位 不计算在border区域，所以会有留白
## 第5章 border与三角等图形构建 
各种各样的三角形和各种各样的图形
## 第6章 border与透明边框 
 1、始于ie7足够的兼容
 background定位 三角形 优雅的增加相应区域的大小
 添加可视渲染区域

```html
 <!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>图标添加映射的功能</title>
<style>
.icons{filter: drop-shadow(20px 0 #ff0080);}

</style>
</head>

<body>
<div class="icons">
    <img src="img/icons02.png"/>
</div>
</body>
</html>
```
经过检测，ie11不好用
chrome浏览器上 页面上不可见的元素，drop-shadow也不可见
	text-indent clip margin 负值 left只要不在可视区域，都是失败
	解决办法：border
# 6、margin
## 第1章 CSS margin与容器的尺寸 
可视尺寸
没有设值宽高 block 只适用于水平防向的

占据尺寸

## 第2章 CSS margin与百分比单位 
普通元素margin的百分百是相对于**宽度**计算的
绝对定位的元素 计margin也是相对于宽度计算的，但是不是父类，而是第一个定位祖先元素
如和利用这个特性？、
产生一个定比例的动态矩形
## 第3章 正确看待CSS的margin重叠 
如和发生：
block水平元素不包括absolute float
不考虑writing-mode只发生在垂直方向  
三种情况
1. 相邻的兄弟元素
2. 父级和第一个/最后一个子元素
3. 空的block元素

干掉margin-top 重叠
1. 父元素：非块中格式上下文 父亲:overflowhidden
2. border-top的设值
3. padding-top的设值
4. 负元素和第一个元素没有inline元素风格
5. 父元素没有设值heihgt
存在的价值：

## 第4章 理解CSS中的margin:auto
垂直居中的写法：

1. 在父元素上加writing-mode:vertical-lr;改变流的方向，个人认为不实用
2. margin:auto和absolute的配合居中 
这个方法在ie8的基础上使用
``` css
.father{position:relative;height:200px;}
.children{position:absolute;height:100px;width:100px;top:0;bottom:0;right:0;left:0;margin:auto;}
```
> 上例中，先用position进行拉伸，然后设值宽高进行强制拉回来，这样就有了margin空间，这时候用margin:auto就可以让他居中了

## 第5章 CSS margin负值定位 
1. 两端对齐:父元素下的margin-right;-20 px; 子元素margin:20;这样最右边的margin就会消失
2. margin布局下的等高布局
3. margin负值下的两栏自适应布局,右边不动，左边自适应
两个都float：left 然后右边的margin-left:-150px(这里是自身宽度)这样他本身就不占空间，然后左边元素：margin-right:150px;给他留下空间
## 第6章 CSS margin无效情形解析 
1、 inline水平元素的垂直margin无效
两个前提：非替换元素如不是img 正常书写模式
2、 margin重叠
3、display:table-cell与margin
margin适用于所有的元素，但是display:table相关类型的除外
例外的替换原数：img button
4、
## 第7章 了解margin-start/margin-end属性
正常流的情况下 ： margin-start==margin-left；ie不支持
margin-collapse:collaspan(默认重叠) discard(取消) separate（分隔）
# 7、z-index
##  第1章 CSS z-index基础 
支持负值
css2.1时代，需要和定位元素配合使用
支持css3 animation动画

## 第2章 z-index与CSS定位属性 
只对定位元素有作用 position：statc就没用了
如果z-index没有发生嵌套：
1. 后来居上
2. 哪个大哪个上
如果定位元素发生嵌套
1. 祖先优先原则（前提：z-index:非负值，非auto）


## 第3章 CSS中的层叠上下文和层叠水平 
层叠上下文：html元素中的一个三维概念，表示元素在z轴上有了可以高人一等 
	
层叠水平：层叠上下文的每一个元素都有层叠水平，决定了同一个层叠上下文中的元素在z轴上的显示顺序；遵循后来居上，一及谁大谁上的原则
层叠水平和z-index不是同一个东西，普通元素也有层叠水平


##  第4章 元素的层叠顺序 
 ![层叠顺序][4]
 ##  第5章 z-index与层叠上下文 
 5-1 z-index与层叠上下文 (09:28)
##  第6章 其他CSS属性与层叠上下文 
 6-1 其他CSS属性与层叠上下文 (09:38)
##  第7章 z-index与其他CSS属性层叠上下文 
 7-1 z-index与其他CSS属性层叠上下文 (09:20)
##  第8章 z-index相关实践分享 
最小化影响原则  避免z-index嵌套层级混乱
不犯二准则 避免出现z-index准则一山比一山高的准则：非浮层元素，避免设值z-index值没有超过2的
组件层级计数器
可访问性隐藏   人肉可识别


  [1]: ./images/1498287331083.jpg "1498287331083"
  [2]: ./images/1498307254352.jpg "1498307254352"
  [3]: ./images/1498308180305.jpg "1498308180305"
  [4]: ./images/1498357350201.jpg "1498357350201"