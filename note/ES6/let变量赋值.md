# ES6
[toc]

标签（空格分隔）： let const 解构赋值

---
## 一、let and const
### 1、let命令
#### 1.1基本用法
let块级代码，let只在代码块中有作用

    {
    let a = 10;
    var b = 12
    }
    console.log(b)//12
    console.log(a)//a is not defined

for循环的计数器，就很合适使用let命令。

    for(let i=0;i<10;i++){
    
    }
    console.log(i)//i is not defined
    for(var i=0;i<10;i++){
    
    }
    console.log(i)//10
如果是用for给其赋值的化，效果如下：

    var a=[]
    for(let i=0;i<10;i++){
      a[i] = function(){
        console.log(i)
      }
    }
    a[6]();//6
 >如果使用let，声明的变量仅在块级作用域内有效，最后输出的是6。
 
    var a = [];
    for(var i=0;i<10;i++){
      a[i] = function(){
        console.log(i)
      }
    }
    a[6]();//10

>上面代码中，变量i是var声明的，在全局范围内都有效。所以每一次循环，新的i值都会覆盖旧值，导致最后输出的是最后一轮的i的值。

另外，for循环还有一个特别之处，就是循环语句部分是一个父作用域，而循环体内部是一个单独的子作用域。

    for (let  i = 0; i < 3; i++) {
      var i = 'abc';
      console.log(i);
    }
    //012
    
    for (let i = 0; i < 3; i++) {
      let i = 'abc';
      console.log(i); //abc abc abc
    }
    重新给i赋值并不会覆盖原来的代码
#### 不存在变量提升 
let命令改变了语法行为，它所声明的变量一定要在声明后使用，否则报错。

    console.log(a)//undefined
    var a = 0;
    
    
    console.log( b)
    let b =20;//报错

#### 暂时性死区
       
    var temp =123;
    if(true){
      temp = "abc";//temp is not defined
      let temp
    }
ES6明确规定，如果区块中存在let和const命令，这个区块对这些命令声明的变量，从一开始就形成了封闭作用域。凡是在声明之前就使用这些变量，就会报错。


总之，在代码块内，使用let命令声明变量之前，该变量都是不可用的。这在语法上，称为“暂时性死区”（temporal dead zone，简称 TDZ）。

    function bar(x = y, y = 2) {//设值默认值  
      return [x, y];
    }
    
    bar(); // 报错；也是因为死区 
    

总之，暂时性死区的本质就是，只要一进入当前作用域，所要使用的变量就已经存在了，但是不可获取，只有等到声明变量的那一行代码出现，才可以获取和使用该变量。

#### 不允许重复声明
    // 报错
    function () {
      let a = 10;
      var a = 1;
    }
    
    // 报错
    function () {
      let a = 10;
      let a = 1;
    }
    
    
    
### 2、块级作用域
####为什么需要块级作用域？ 
1、 内层变量改变外层变量
2、用来计数的变量泄露为全局变量
#### es6的块级作用域

    function f1(){
      let a = 2;
      if(true){
        let a="asdf";
        console.log(a)//asdf 不会覆盖上边的 a
      }
      console.log(a)//2
    }
    f1();

块级作用域的出现，实际上使得获得广泛应用的立即执行函数表达式（IIFE）不再必要了。

#### 块级作用域与函数声明
ES5 规定，函数只能在顶层作用域和函数作用域之中声明，不能在块级作用域声明。

    // 情况一
    if (true) {
      function f() {}
    }
    
    // 情况二
    try {
      function f() {}
    } catch(e) {
      // ...
    }

以上是错误的方法

ES6 规定，块级作用域之中，函数声明语句的行为类似于let，在块级作用域之外不可引用。

**以下为es56区别 注意：**


    function f(){console.log("i am outside")}
    
    (function(){
    if(true){
    function f(){
      console.log("i am inside")
      }
    }
    f()
    }())
    
    //i am outside//es6
    //i am inside//es5
    
上面代码在 ES5 中运行，会得到“I am inside!”，因为在if内声明的函数f会被提升到函数头部，实际运行的代码如下。

    // ES5 版本
    function f() { console.log('I am outside!'); }
    (function () {
      function f() { console.log('I am inside!'); }
      if (false) {
      }
      f();
    }());
es6的浏览器处理方式：报错    
允许在块级作用域内声明函数。
函数声明类似于var，即会提升到全局作用域或函数作用域的头部。
同时，函数声明还会提升到所在的块级作用域的头部。

    // 浏览器的 ES6 环境
    function f() { console.log('I am outside!'); }
    (function () {
      if (false) {
        // 重复声明一次函数f
        function f() { console.log('I am inside!'); }
      }
    
      f();
    }());
    // Uncaught TypeError: f is not a function
        
浏览器的 ES6 环境实际效果

    function f() { console.log('I am outside!'); }
    (function () {
      var f = undefined;
      if (false) {
        function f() { console.log('I am inside!'); }
      }
    
      f();
    }());
    // Uncaught TypeError: f is not a function
    
    
所以，要尽量的声明为函数表达式，而不是函数声明语句，同时尽量避免在es6块级作用域中声明函数
#### do表达式  **只是提案，经测试，没有效果**
本质上，块级作用域是一个语句，没有返回值
想让块级作用域有返回值，用do

    let x = do {
      let t = f();
      t * t + 1;
    };
### 3、 const命令
#### 3.1基本用法：
 1、需要立即赋值，不能声明
 2、变量值不能改变
 3、作用域等同于let，只在声明所在的块级作用域内有效。
 4、const命令声明的常量也是不提升，同样存在暂时性死区，只能在声明的位置后面使用。

#### 3.2本质
const实际上保证的，并不是变量的值不得改动，而是变量指向的那个内存地址不得改动。
但对于复合类型的数据（主要是对象和数组），变量指向的内存地址，保存的只是一个指针，const只能保证这个指针是固定的，至于它指向的数据结构是不是可变的，就完全不能控制了。因此，将一个对象声明为常量必须非常小心。

    const p = {};
    p.a = "a";
    p.b = "n";
    
    console.log(p)//{"a":"a","b":"n"}
    p={};// "p" is read-only
    
**真*定值**
如果真的想将对象冻结，应该使用Object.freeze方法。

    const foo = Object.freeze({});
    
    // 常规模式时，下面一行不起作用；
    // 严格模式时，该行会报错
    foo.prop = 123;

除了将对象本身冻结，对象的属性也应该冻结。下面是一个将对象彻底冻结的函数。


    var constantize = (obj) => {
      Object.freeze(obj);
      Object.keys(obj).forEach( (key, value) => {
        if ( typeof obj[key] === 'object' ) {
          constantize( obj[key] );
        }
      });
    };
#### 3.3 6种声明变量的方法     
var function let const 
import class

### 4 顶层对象属性
浏览器中是window 对象node中是global属性

    window.a = 1;
    a // 1
    
    a = 2;
    window.a // 2
如上，顶层对象属性和全局变量挂钩严重
es6开始逐步脱钩
一方面规定，为了保持兼容性，var命令和function命令声明的全局变量，依旧是顶层对象的属性；另一方面规定，let命令、const命令、class命令声明的全局变量，不属于顶层对象的属性。

    var a = 1;
    // 如果在Node的REPL环境，可以写成global.a
    // 或者采用通用方法，写成this.a
    window.a // 1
    
    let b = 1;
    window.b // undefine

### 5 global对象
//还是提案，不看了。

## 二、变量的解构赋值
### 1、数组的解构赋值
---
#### 1.1基本用法
以前赋值方式：
let a=1 ,b=2, c=3;
现在可以：
let [a,b,c] = [1,2,3];
如果等号的右边不是可遍历的结构，报错
let[foo] = NAN //报错

---
#### 1.2默认值

    let [foo = true] = [];
    foo // true
    
    let [x, y = 'b'] = ['a']; // x='a', y='b'
    let [x, y = 'b'] = ['a', undefined]; // x='a', y='b'
必须是严格的undefined的qing'kuang情况下

    let [x = 1] = [undefined];
    x // 1
    
    let [x = 1] = [null];
    x // null

---

### 2对象的解构赋值

    let { foo, bar } = { foo: "aaa", bar: "bbb" };
    foo // "aaa"
    bar // "bbb"
如果变量名与属性名不一致，必须写成下面这样。

    var { foo: baz } = { foo: 'aaa', bar: 'bbb' };
    baz // "aaa"
    
    let obj = { first: 'hello', last: 'world' };
    let { first: f, last: l } = obj;
    f // 'hello'
    l // 'world'
注意，采用这种写法时，变量的声明和赋值是一体的。对于let和const来说，变量不能重新声明，所以一旦赋值的变量以前声明过，就会报错。

    let foo;
    let {foo} = {foo: 1}; // SyntaxError: Duplicate declaration "foo"
    
    let baz;
    let {bar: baz} = {bar: 1}; // SyntaxError: Duplicate declaration "baz"

但是如果不声明的话

    let foo;
     ({foo} = {foo: 1}); //it's ok

 圆括号是必须的，否则会当成代码块处理
 
 ---
### 3字符串的解构赋值

    const [a, b, c, d, e] = 'hello';
    a // "h"
    b // "e"
    c // "l"
    d // "l"
    e // "o"
属性赋值，但是是对象的形式

    let {length : len} = 'hello';
    len // 5
    
### 4数值和布尔值的解构赋值

解构赋值的规则是，只要等号右边的值不是对象或数组，就先将其转为对象。由于undefined和null无法转为对象，所以对它们进行解构赋值，都会报错。
### 5函数参数的解构赋值

    function add([x, y]){
      return x + y;
    }
    
    add([1, 2]); // 3

函数参数的解构也可以使用默认值

    function move({x = 0, y = 0} = {}) {
      return [x, y];
    }
    
    move({x: 3, y: 8}); // [3, 8]
    move({x: 3}); // [3, 0]
参数实际上是传给形参后头的那个{}的，

    function move({x, y} = { x: 0, y: 0 }) {
      return [x, y];
    }
    
    move({x: 3, y: 8}); // [3, 8]
    move({x: 3}); // [3, undefined]
    move({}); // [undefined, undefined]
    move(); // [0, 0]
    
注意以上两点的区别
上面代码是为函数move的参数指定默认值，而不是为变量x和y指定默认值，所以会得到与前一种写法不同的结果。

### 6圆括号问题 
不得使用圆括号的情况
1、变量声明语句中，不能带有圆括号。

    // 全部报错
    let [(a)] = [1];
    
    let {x: (c)} = {};
    let ({x: c}) = {};
    let {(x: c)} = {};
    let {(x): c} = {};
    
    let { o: ({ p: p }) } = { o: { p: 2 } };
2、函数参数中，模式不能带有圆括号。

函数参数也属于变量声明，因此不能带有圆括号。

    // 报错
    function f([(z)]) { return z; }
3、赋值语句中，不能将整个模式，或嵌套模式中的一层，放在圆括号之中。

```js
// 全部报错
({ p: a }) = { p: 42 };
([a]) = [5];
```


可以使用圆括号的情况只有一种：赋值语句的非模式部分，可以使用圆括号。

    [(b)] = [3]; // 正确
    ({ p: (d) } = {}); // 正确
    [(parseInt.prop)] = [3]; // 正确
上面三行语句都可以正确执行，因为首先它们都是**赋值语句**，而不是**声明语句**；其次它们的**圆括号都不属于模式的一部分**。第一行语句中，模式是取数组的第一个成员，跟圆括号无关；第二行语句中，模式是p，而不是d；第三行语句与第一行语句的性质一致。

---
###7 用途
1、交换变量的值

```
let x=1;
let y=2;
[x,y]=[y,x];
console.log(x)//2
console.log(y)//1
```
2、从函数返回多个值

```
// 返回一个数组

function example() {
  return [1, 2, 3];
}
let [a, b, c] = example();

// 返回一个对象

function example() {
  return {
    foo: 1,
    bar: 2
  };
}
let { foo, bar } = example();
```

3、函数参数的定义

```js

// 参数是一组有次序的值
function f([x, y, z]) { ... }
f([1, 2, 3]);

// 参数是一组无次序的值
function f({x, y, z}) { ... }
f({z: 3, y: 2, x: 1});
```
4、提取JSON数据
```

let jsonData = {
  id: 42,
  status: "OK",
  data: [867, 5309]
};

let { id, status, data: number } = jsonData;

console.log(id, status, number);
// 42, "OK", [867, 5309]
```

5、函数参数的默认值

```
jQuery.ajax = function (url, {
  async = true,
  beforeSend = function () {},
  cache = true,
  complete = function () {},
  crossDomain = false,
  global = true,
  // ... more config
}) {
  // ... do stuff
};
```

6、遍历Map结构

```
var map = new Map();
map.set('first', 'hello');
map.set('second', 'world');

for (let [key, value] of map) {
  console.log(key + " is " + value);
}
// first is hello
// second is world


// 获取键值
for (let [,value] of map) {
  // ...
}
```
7、输入模块的指定方法

加载模块时，往往需要指定输入哪些方法。解构赋值使得输入语句非常清晰。

    const { SourceMapConsumer, SourceNode } = require("source-map");