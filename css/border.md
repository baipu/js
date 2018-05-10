# border

## 1、不兼容百分比

除了基本的数字，还有thin（1px） medium(3px) thick (4px)

不兼容百分比还有 box-shadom outline text-shadow都是因为设计的时候就觉得不会因为屏幕的变大，呢你容的变多而变多

## 2、border-style

### border-style：none

如果要隐藏一条边的话，性能最佳体验：

```css
div{
    border:1px solid ;
    border-bottom:0;
}
```

### border-style:dashed

各个浏览器对其的兼容性不一致，有时候是3:1 有时候是2:1 线白比例 1:1 或者是1:2

因为兼容性不好，所以一般也没啥用

### border-style:dotted 

原点，可以用来画圆圈，也可以实现border-radius 所以这个我就不去考虑了

### border-style:double

双线边框，两根线为实线可以配合下边框 组成三道杠的图片，

```html
<style>
        .point03 .ico_menu {
            color: gray;
           width: 80px;
           height: 20px;
           border-top: 60px double ;
           border-bottom: 20px solid;

        }
    
    </style>
    <div class="point03">
       <div class="ico_menu">
       </div>
    </div>
```



![image-20180508211439405](/var/folders/mw/5vvml0vn1bs6ycsmrm4tm2dm0000gn/T/abnerworks.Typora/image-20180508211439405.png)

### 其他的boreder-style类型

inset outset groovw ridge 风格比较老土,说了你也不用它

## 3、boreder-color:

默认的颜色是color的颜色，这个比较实用，如下用来画图：

```html
<style>
        .point02 .add {
            display: inline-block;
            border: 2px dotted;
            width: 76px;
            height: 76px;
            text-indent: -120px;
            overflow: hidden;
            position: relative;
        }
    
        .point02 .add::after,
        .point02 .add::before {
            position: absolute;
            left: 50%;
            top: 50%;
    
            content: "";
        }
    
        .point02 .add::after {
            width: 20px;
            margin: -2px 0 0 -10px;
            border-top: 4px solid;
        }
    
        .point02 .add::before {
            height: 20px;
            margin: -10px 0px 0 -2px;
            border-left: 4px solid;
        }
    </style>
    <div class="point02">
        <a href class="add" title="继续上传">
            添加图片
        </a>
    
    </div>
```

![image-20180508212645125](/var/folders/mw/5vvml0vn1bs6ycsmrm4tm2dm0000gn/T/abnerworks.Typora/image-20180508212645125.png)

## 透明边框的作用

- 右下方的background定位技术，因为有了css3所以先不研究了

- 优雅的增加点击区域大小，

  我们之前说过通过padding增加按钮的点击区域，这里我们可以通过`border：10px solid transparent;`方法进行扩展，这样就不用担心改变大小影响背景样式的问题了

- 绘制各种各样的三角形

  ```html
  
  <style>
      .point04  {
          margin-top: 100px;
         border: 10px  solid ;
         width: 0;
         border-color: #f30 transparent transparent;
      }
  </style>
  <div class="point04">
  </div>
  ```

  ![image-20180508214126088](/var/folders/mw/5vvml0vn1bs6ycsmrm4tm2dm0000gn/T/abnerworks.Typora/image-20180508214126088.png)

## 等高布局

````html

<style>

    .point05.box{border-left: 150px solid #333;
    background-color: #f0f3f9;text-align: center;
    font-size: 14px;
    }
    .point05.box::after{
        content: "";
        display: block;
        clear: both;
    }
    .point05.box >nav{
        width: 150px;
        margin-left: -150px;
        float: left;
        line-height: 40px;
    }
    nav + .nav {
    line-height: 39px;
    border-top: 1px solid #555;
}
    .point05.box >section{
        overflow: hidden;
    }
    .point05 .nav{
        margin: 0;
        line-height: 40px;
        color: #fff;
    }
   .point05  .module{
        line-height: 40px;
    }

    .nav + .nav {
        line-height: 39px;
        border-top: 1px solid #555;
    }
</style>

<div class="point05 box ">
<nav>
    <h3 class="nav">导航1</h3>
    <h3 class="nav">导航2</h3>
    <h3 class="nav">导航3</h3>
</nav>

<section>
    <div class="module">模块1</div>
</section>
</div>
````

![image-20180509151737240](/var/folders/mw/5vvml0vn1bs6ycsmrm4tm2dm0000gn/T/abnerworks.Typora/image-20180509151737240.png)

