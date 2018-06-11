[TOC]

# z-index

## 一、层叠顺序

几个概念：

- 成叠上下文：是一个概念，我们可理解成是一个结界，自成一个结界，这个小结界种可能有其他的成叠结节，而自身也可能处于其他成叠结界种
- 成叠水平：决定了同一个成叠上下文中元素在z轴上显示的顺序
- 成叠顺序，表示元素发生成叠时候，有着特定的垂直显示顺序。
  - css成叠顺序规则：
    - background/border 特指成叠上下文元素的边框和背景色，每个成叠顺序规制仅仅是用于当前层叠上下文的小元素的小世界
    - 负z-index
    - block块状水平盒子
    - float浮动盒子
    - inline水平盒子 包括inline/inline-block/inline-table的陈叠元素，他们都是相通的
    - z-index：auto或者是z-index:0 如果仅仅是看成叠水平，两个可以理解成一样的，但是两个在成叠上下文的时候有根本性的差异
    - 正z-index

## 二、成叠准则：

- 谁大谁上，当具有明显的成叠水平的时候，比如纯在z-index的时候，同一个成叠上下文领域，谁的成叠水平大，谁就上
- 后来居上，当元素的成叠水平一致的时候，在dom流中处于后面的元素会覆盖前面的元素。

## 三、深入了解成叠上下文

 ### 1、特性：

- 层叠上下文的成叠水平要比普通元素高
- 成叠上下文可以住短元素的混合模式
- 成叠上下文可以嵌套。内部层叠上下文及其子上下文都受制于外部的层叠上下文。
- 每个层叠上下文和兄弟元素独立。成叠元素变化的时候，只需要考虑后代元素
- 每个层叠上下文自成体系，元素发生成叠的时候，整个元素都被认为是在父层叠上下文的层叠顺序中。

### 2、上下文的创建：

- 天生的：页面根元素天生具有层叠上下文，称之为根层叠上下文 <html>这个元素，因此所有的元素一定出于至少一个层叠元素中。
- 正统派：z-index数值定位的
- 扩招的：其他css3属性

**后来居上的原则**

```Css
.point14 img{
    height: 200px;
}
.point14 .img1{
    position: relative;
}
.point14 .img2{
    transform: scale(1.5);
}
```

```html
<div class="point14">
    <div class="box01">
        <img src="./img/test01.jpg" class="img1">
        <img src="./img/test02.jpg" class="img2">
    </div>
</div>
```

![image-20180523204618721](/var/folders/mw/5vvml0vn1bs6ycsmrm4tm2dm0000gn/T/abnerworks.Typora/image-20180523204618721.png)





只改变元素的前后顺序，然后我们能够发现：

```Html
<div class="point14">
    <div class="box01">
        <img src="./img/test01.jpg" class="img1">
        <img src="./img/test02.jpg" class="img2">
    </div>
</div>
```



![image-20180523204743186](/var/folders/mw/5vvml0vn1bs6ycsmrm4tm2dm0000gn/T/abnerworks.Typora/image-20180523204743186.png)



**儿子的层级不干扰父亲的层级**

```Html
<div class="point14">

    <div class="box01" style="position:relative; z-index: 0">

        <img src="./img/test01.jpg"  alt="古天乐" class="img1" style="position:relative;z-index: 2;">
    </div>
    <div class="box02" style="position:relative;z-index: 1;top:-100px;">
        <img src="./img/test02.jpg" alt ="吴彦祖"class="img2" style="position:relative;z-index: 1;">
    </div>
</div>
```

![image-20180523210642482](/var/folders/mw/5vvml0vn1bs6ycsmrm4tm2dm0000gn/T/abnerworks.Typora/image-20180523210642482.png)



### 3、层叠上下文和层叠顺序

一旦普通元素成了层叠上下文，他的层叠顺序就会改变，改变规则：

- 如果层叠上下文不依赖z-index的数值，层叠顺序就是z-index:auto;也可以看成z-index：0级别的
- 如果依赖z-index的数值，顺序由z-index决定

## 四、z-index负值

这个还是比较实用的，也就是说，如果一个成叠上下文的元素设置了z-index的值为负数，然后他就会在父级的成叠上下文中寻找合适的位置，基本上就是除了背景色的位置。但是注意一点，他会在父级的层叠上下文环境中整理。

#### z-index的作用：可访问性隐藏

```html
<div class="point15">

    <div class="box01" style=" z-index: 0;background: gray;width: 1000px;>

        <img src="img/test01.jpg" style="position:relative;z-index: -1;top: 100px;left: 40px;">

    </div>

</div>
```

 ![image-20180523213631383](/var/folders/mw/5vvml0vn1bs6ycsmrm4tm2dm0000gn/T/abnerworks.Typora/image-20180523213631383.png)

但是如果我们给父亲设置了层级上下文的话，：、

```html
<div class="box01" style=" z-index: 0;background: gray;width: 1000px;transform: scale(1)" >

    <img src="img/test01.jpg" style="position:relative;z-index: -1;top: 100px;left: 40px;">

</div>
```

![image-20180523213829085](/var/folders/mw/5vvml0vn1bs6ycsmrm4tm2dm0000gn/T/abnerworks.Typora/image-20180523213829085.png)

#### 定位元素在后面：模拟纸张的效果：



