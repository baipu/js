---
typora-copy-images-to: ./img
---

# position:relative /fix

relative其实相对来说比较简单，主要是用来限制absolute这个想必大家都是会用的，先不谈，然后relative定位上有两个特性：1. 相对自身 2.没有侵入性

我们1在使用的时候要坚持 relative最小化影响的原则，也就是尽量不使用relative，如果必须要用的话，就让他的影响变得最小。

## 1. relative与定位：

先说两个特性：

1. 相对自身，这里说的就是relative的left top之类的属性是在自己的位置上进行修改的，

2. 无侵入性：但是即便是调整了位置，也不会干扰周边元素的布局，所以没有侵入性，这个应该可以理解，毕竟超出了文档流，但是还留了一个壳子站位

3. 相对包含块的百分比，虽然位置的改变是在本来位置上进行调整的（位移是相对于自身的），但是如果left riht的值是百分比的话，他们就是相对于包含块进行调整的。同时，如果包含块的高度是0那么，bottom还有top的计算值就都是0

   也就是说，如果包含块的height:auto 那么，top:10%就相当于top:0;

4. 相对定位的left 和right同时出现的时候，显示和文档流的方向有关系，默认的文档流是自上而下，从左往右的。top/bottom一起出现的时候，bottom会被干掉。left/right同时出现的时候，right毙命

## 2、relative的最小化影响原则

两点

1. 尽量不使用relative如果想定位某些元素的话，看看能不能使用“五一来的绝对定位”

2. 场景受限，必须使用relative的时候，relative最小化。

   ```html
   <div class="point11">
       <div class="box" style="position:relative;">
           <img src="./img/hot.gif" style="position:absolute;right:0;top:0px;" alt="">
           <p>内容1</p>
           <p>内容2</p>
           <p>内容3</p>
           <p>内容4</p>
           <p>内容5</p>
       </div>
   </div>
   <div class="point12">
       <div class="box" style="position:relative;">
           <div style="position:relative;">
               <img src="./img/hot.gif" style="position:absolute;right:0;top:0px;" alt="">
           </div>
           <p>内容1</p>
           <p>内容2</p>
           <p>内容3</p>
           <p>内容4</p>
           <p>内容5</p>
       </div>
   </div>
   ```

我们如果想右上角飘一张图片的话，我们还是推荐上第二种方式，主要是删除的时候可以直接删了，但是如果是第一种呢，你不知道relative会不会影响本来的z-index之类的，或则他一不小心覆盖了其他的层级，那么就需要把另一个元素也变成relative，这样冤冤相报何时了。。。所以还是要使用最小化原则。



## 3、fixed

他的包含块是html,所以relative对fixed毫无约束力。

基本的用法我们都知道了，此处不做讲解，其他地方有各种各样的讲解。

我们说一下无依赖的固定定位，也就是利用fixed没有设置lef/top/right/bottom的相对特性，可以将目标元素定位到我们想要的位置，用法比较简单，略了