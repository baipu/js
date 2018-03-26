
---

# ES6(3)

标签（空格分隔）： js es6 

[toc]

---


## 七 、函数的扩展
---
### 1、 函数参数的默认值
#### 基本用法
原来的给参数配默认值的问题：

    function log(x, y) {
      y = y || 'World';
      console.log(x, y);
    }
    
    log('Hello') // Hello World
    log('Hello', 'China') // Hello China
    log('Hello', '') // Hello World
    
  现在的方法 

    function log(x, y = 'World') {
      console.log(x, y);
    }
    
    log('Hello') // Hello World
    log('Hello', 'China') // Hello China
    log('Hello', '') // Hello
**注意**：
>1.  变量是默认声明的情况下就不能用let或者是const继续申明
2. 使用参数默认值时，函数不能有同名参数
3.  如果参数默认值是变量，那么参数就不是传值的，而是每次都重新计算默认值表达式的值。也就是说，参数默认值是惰性求值的

    let x = 99;
    function foo(p = x + 1) {
      console.log(p);
    }
    
    foo() // 100
    
    x = 100;
    foo() // 101
#### 与解构赋值默认值结合使用

    function foo({x, y = 5}) {
      console.log(x, y);
    }
    
    foo({}) // undefined, 5
    foo({x: 1}) // 1, 5
    foo({x: 1, y: 2}) // 1, 2
    foo() // TypeError: Cannot read property 'x' of undefined
    
注意：

    function fetch(url, { body = '', method = 'GET', headers = {} }) {
      console.log(method);
    }
    
    fetch('http://example.com', {})
    // "GET"
    
    fetch('http://example.com')
    // 报错
    
    //为了让上述方法不报错，需要继续做默认
    function fetch(url, { method = 'GET' } = {}) {
      console.log(method);
    }


#### 参数默认值的位置
	通常情况下，定义了默认值的参数，应该是函数的尾参数。因为这样比较容易看出来，到底省略了哪些参数。如果非尾部的参数设置默认值，实际上这个参数是没法省略的。
``` stata
// 例一
function f(x = 1, y) {
  return [x, y];
}

f() // [1, undefined]
f(2) // [2, undefined])
f(, 1) // 报错
f(undefined, 1) // [1, 1]

// 例二
function f(x, y = 5, z) {
  return [x, y, z];
}

f() // [undefined, 5, undefined]
f(1) // [1, 5, undefined]
f(1, ,2) // 报错
f(1, undefined, 2) // [1, 5, 2]
```

#### 函数的 length 属性
指定了默认值以后，函数的length属性，将返回没有指定默认值的参数个数。也就是说，指定了默认值后，length属性将失真。
同理，rest参数也不会计入length属性。
如果设置了默认值的参数不是尾参数，那么`length`属性也不再计入后面的参数了。

``` javascript
(function (a = 0, b, c) {}).length // 0
(function (a, b = 1, c) {}).length // 1
```

#### 作用域
一旦设置了参数的默认值，函数进行声明初始化时，参数会形成一个单独的作用域（context）。等到初始化结束，这个作用域就会消失。这种语法行为，在不设置参数默认值时，是不会出现的。

``` javascript
var x = 1;
function f(x, y = x) {
  console.log(y);
}
f(2) // 2
```

如果参数是一个函数的时候

``` javascript
var x = 1;
function foo(x, y = function() { x = 2; }) {
  var x = 3;
  y();
  console.log(x);
}

foo()//2
console.log(x)//1
```

### 2、 rest参数

``` javascript
（形式为“...变量名”），用于获取函数的多余参数。这样就不需要使用arguments对象了。

function push(array, ...items) {
  items.forEach(function(item) {
    array.push(item);
    console.log(item);
  });
}

var a = [];
push(a, 1, 2, 3)
```
函数的length属性，不包括 rest 参数。

``` javascript
(function(a) {}).length  // 1
(function(...a) {}).length  // 0
(function(a, ...b) {}).length  // 1
```
### 3 、扩展运算符
#### 含义
扩展运算符（spread）是三个点（...）。它好比 rest 参数的逆运算，将一个数组转为用逗号分隔的参数序列。

``` javascript
console.log(...[1, 2, 3])
// 1 2 3

console.log(1, ...[2, 3, 4], 5)
// 1 2 3 4 5????为什么不输出逗号？？

[...document.querySelectorAll('div')]
// [<div>, <div>, <div>]
```
该运算符主要用于函数调用。

``` javascript
function f(v, w, x, y, z) { }
var args = [0, 1];
f(-1, ...args, 2, ...[3]);
```

---
#### 替代数组的apply方法：
不再需要apply将数组转为函数的参数了

``` javascript
// ES5的写法
function f(x, y, z) {
  // ...
}
var args = [0, 1, 2];
f.apply(null, args);

// ES6的写法
function f(x, y, z) {
  // ...
}
var args = [0, 1, 2];
f(...args);
```


---

#### 扩展运算符的应用
1、合并数组：

``` javascript
	var more = [1,2,3,4,5]
	console.log([1,4,...more])
```
2、与解构赋值结合

``` javascript
// ES5
a = list[0], rest = list.slice(1)
// ES6
//经过测试这种方法在babel上无效，
[a,...rest] = list
```
3、函数的返回值
JavaScript的函数只能返回一个值，如果需要返回多个值，只能返回数组或对象。扩展运算符提供了解决这个问题的一种变通方法。

``` javascript
//????
var dateFields = readDateFields(database);
var d = new Date(...dateFields);
```
4、字符串：

``` javascript
var a =[..."hello"]
console.log(a)
```
上面的写法，有一个重要的好处，那就是能够正确识别32位的Unicode字符。

5、实现了iterator的接口对象
任何Iterator接口的对象，都可以用扩展运算符转为真正的数组。
上面代码中，querySelectorAll方法返回的是一个nodeList对象。它不是数组，而是一个类似数组的对象。这时，扩展运算符可以将其转为真正的数组，原因就在于NodeList对象实现了Iterator接口。

对于那些没有部署Iterator接口的类似数组的对象，扩展运算符就无法将其转为真正的数组。


6、Map和Set结构，Generator函数

``` javascript
let map = new Map([
  [1, 'one'],
  [2, 'two'],
  [3, 'three'],
]);

let arr = [...map.keys()]; // [1, 2, 3]
```
注意：这里的map里边的一个个对象好像也都是一个数组

>**Generator**函数运行后，返回一个遍历器对象，因此也可以使用扩展运算符。

``` javascript
var go = function*(){
  yield 1;
  yield 2;
  yield 3;
};

[...go()] // [1, 2, 3]
```


### 4、 严格模式

《ECMAScript 2016标准》做了一点修改，规定只要函数参数使用了默认值、解构赋值、或者扩展运算符，那么函数内部就不能显式设定为严格模式，否则会报错。
两种方法可以规避这种限制。第一种是设定全局性的严格模式，这是合法的。

``` javascript
'use strict';

function doSomething(a, b = a) {
  // code
}
```


第二种是把函数包在一个无参数的立即执行函数里面。

``` javascript
const doSomething = (function () {
  'use strict';
  return function(value = 42) {
    return value;
  };
}());
```


### 5、 name 属性

``` javascript
var f = function () {};

// ES5
f.name // ""

// ES6
f.name // "f"
```


Function构造函数返回的函数实例，name属性的值为anonymous。

bind返回的函数，name属性值会加上bound前缀。

``` javascript
function foo() {};
foo.bind({}).name // "bound foo"

(function(){}).bind({}).name // "bound "
```
### 6、 箭头函数
#### 1、基本用法：
1、ES6允许使用“箭头”（=>）定义函数。
``` javascript
var f = v => v;
```

上面的箭头函数等同于：

``` javascript
var f = function(v) {
  return v;
};
```
2、不需要参数的时候

``` javascript
var f = () => 5;
```
3、如果箭头函数的代码块部分**多于一条语句**，就要使用大括号将它们括起来，并且使用return语句返回。

``` javascript
var sum = (num1, num2) => { return num1 + num2; }
```
4、由于大括号被解释为代码块，所以如果箭头函数直接返回一个对象，必须在对象外面加上括号。

``` javascript
var getTempItem = id => ({ id: id, name: "Temp" });
```
5、箭头函数可以与变量解构结合使用。

``` javascript
const full = ({ first, last }) => first + ' ' + last;

// 等同于
function full(person) {
  return person.first + ' ' + person.last;
}
```
>用处：
1.表达更简单
2.简化回掉

``` javascript
//简化回掉
// 正常函数写法
[1,2,3].map(function (x) {
  return x * x;
});

// 箭头函数写法
[1,2,3].map(x => x * x);
```

---

#### 2、注意点:
1.this就是定义时候的对象，而不是使用时候的对象
2.不能当成构造函数，也就是说不能使用new
3.不能使用arguments如果又需要可以用rest参数代替
4.不能用yield命令，因此箭头函数不能用作Generator函数

``` javascript
function foo() {
  setTimeout(() => {
    console.log('id:', this.id);
  }, 100);
}

var id = 21;

foo.call({ id: 42 });
// id: 42
```
上面代码中，setTimeout的参数是一个箭头函数，这个箭头函数的定义生效是在foo函数生成时，而它的真正执行要等到100毫秒后。如果是普通函数，执行时this应该指向全局对象window，这时应该输出21。但是，箭头函数导致this总是指向函数定义生效时所在的对象（本例是{id: 42}），所以输出的是42。
除了this，以下三个变量在箭头函数之中也是不存在的，指向外层函数的对应变量：arguments、super、new.target。


---
#### 3、嵌套的箭头函数
1.箭头函数内部，还可以再使用箭头函数。下面是一个ES5语法的多重嵌套函数。

``` javascript
function insert(value) {
  return {into: function (array) {
    return {after: function (afterValue) {
      array.splice(array.indexOf(afterValue) + 1, 0, value);
      return array;
    }};
  }};
}

insert(2).into([1, 3]).after(1); //[1, 2, 3]

let insert = (value) => ({into: (array) => ({after: (afterValue) => {
  array.splice(array.indexOf(afterValue) + 1, 0, value);
  return array;
}})});

insert(2).into([1, 3]).after(1); //[1, 2, 3]
```
2.下面是一个部署管道机制（pipeline）的例子，即前一个函数的输出是后一个函数的输入。

``` javascript
const pipeline = (...funcs) =>
  val => funcs.reduce((a, b) => b(a), val);

const plus1 = a => a + 1;
const mult2 = a => a * 2;
const addThenMult = pipeline(plus1, mult2);

addThenMult(5)
// 12
```
如果觉得上面的写法可读性比较差，也可以采用下面的写法。

``` javascript
const plus1 = a => a + 1;
const mult2 = a => a * 2;

mult2(plus1(5))
// 12
```

### 7、 绑定 this(提案)
箭头函数可以绑定this对象，大大减少了显式绑定this对象的写法（call、apply、bind）。但是，箭头函数并不适用于所有场合，所以ES7提出了“函数绑定”（function bind）运算符，用来取代call、apply、bind调用。

``` javascript
foo::bar;
// 等同于
bar.bind(foo);

foo::bar(...arguments);
// 等同于
bar.apply(foo, arguments);

const hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn(obj, key) {
  return obj::hasOwnProperty(key);
}
```

### 8、 尾调用优化
什么是尾调用？
尾调用（Tail Call）是函数式编程的一个重要概念，本身非常简单，一句话就能说清楚，就是指某个函数的最后一步是调用另一个函数。

``` javascript
function f(x){
  return g(x);
}
```

以下三种情况，都不属于尾调用。

``` javascript
// 情况一
function f(x){
  let y = g(x);
  return y;
}

// 情况二
function f(x){
  return g(x) + 1;
}

// 情况三
function f(x){
  g(x);
}
```

所以我认为**尾调函数**就是return 一个方法

#### 2、尾调用优化


如果是非尾递归的fibonacci 递归方法
``` javascript
function Fibonacci (n) {
  if ( n <= 1 ) {return 1};

  return Fibonacci(n - 1) + Fibonacci(n - 2);
}

Fibonacci(10); // 89
// Fibonacci(100)
// Fibonacci(500)
// 堆栈溢出了
```

如果我们使用尾递归优化过的fibonacci 递归算法

``` javascript
function Fibonacci2 (n , ac1 = 1 , ac2 = 1) {
  if( n <= 1 ) {return ac2};

  return Fibonacci2 (n - 1, ac2, ac1 + ac2);
}

Fibonacci2(100) // 573147844013817200000
Fibonacci2(1000) // 7.0330367711422765e+208
Fibonacci2(10000) // Infinity
```

注意：第二种递归是正向算法，后两个数用来连续相加，第一个参数是用来倒数计时的

#### 3、递归函数的改写(柯里化)
尾递归的实现，往往需要改写递归函数，确保最后一步只调用自身。做到这一点的方法，就是把所有用到的内部变量改写成函数的参数。

两个方法可以解决这个问题。
方法一是在尾递归函数之外，再提供一个正常形式的函数。

``` javascript
function tailFactorial(n, total) {
  if (n === 1) return total;
  return tailFactorial(n - 1, n * total);
}

function factorial(n) {
  return tailFactorial(n, 1);
}

factorial(5) // 120
```

函数式编程有一个概念，叫做**柯里化**（currying），意思是将多参数的函数转换成单参数的形式。这里也可以使用柯里化。

``` javascript
function currying(fn, n) {
  return function (m) {
    return fn.call(this, m, n);
  };
}

function tailFactorial(n, total) {
  if (n === 1) return total;
  return tailFactorial(n - 1, n * total);
}

const factorial = currying(tailFactorial, 1);

factorial(5) // 120
```
第二种方法就简单多了，就是采用ES6的函数默认值。

``` javascript
function factorial(n, total = 1) {
  if (n === 1) return total;
  return factorial(n - 1, n * total);
}

factorial(5) // 120
```
**纯粹的函数式编程语言没有循环操作命令，所有的循环都用递归实现，**??????????


#### 4、严格模式 
ES6的尾调用优化只在严格模式下开启，正常模式是无效的。
这是因为在正常模式下，函数内部有两个变量，可以跟踪函数的调用栈。

- func.arguments：返回调用时函数的参数。
- func.caller：返回调用当前函数的那个函数。


尾调用优化发生时，函数的调用栈会改写，因此上面两个变量就会失真。严格模式禁用这两个变量，所以尾调用模式仅在严格模式下生效。

#### 5、尾递归优化的实现
就是自己实现尾递归优化。

它的原理非常简单。尾递归之所以需要优化，原因是调用栈太多，造成溢出，那么只要减少调用栈，就不会溢出。怎么做可以减少调用栈呢？就是采用“循环”换掉“递归”。

``` javascript
function sum(x, y) {
  if (y > 0) {
    return sum(x + 1, y - 1);
  } else {
    return x;
  }
}

sum(1, 100000)
// Uncaught RangeError: Maximum call stack size exceeded(…)
```

**蹦床函数（trampoline）**可以将递归执行转为循环执行。

``` javascript
function trampoline(f) {
  while (f && f instanceof Function) {
    f = f();
  }
  return f;
}

```

蹦床函数并不是真正的尾递归优化，下面的实现才是。

``` javascript
function tco(f) {
  var value;
  var active = false;
  var accumulated = [];

  return function accumulator() {
    accumulated.push(arguments);
    if (!active) {
      active = true;
      while (accumulated.length) {
        value = f.apply(this, accumulated.shift());
      }
      active = false;
      return value;
    }
  };
}

var sum = tco(function(x, y) {
  if (y > 0) {
    return sum(x + 1, y - 1)
  }
  else {
    return x
  }
});

sum(1, 100000)
// 100001
```
上面代码中，tco函数是尾递归优化的实现，它的奥妙就在于状态变量active。默认情况下，这个变量是不激活的。一旦进入尾递归优化的过程，这个变量就激活了。然后，每一轮递归sum返回的都是undefined，所以就避免了递归执行；而accumulated数组存放每一轮sum执行的参数，总是有值的，这就保证了accumulator函数内部的while循环总是会执行。这样就很巧妙地将“递归”改成了“循环”，而后一轮的参数会取代前一轮的参数，保证了调用栈只有一层。


### 9、 函数参数的尾逗号 
如名字










