# ES6（2）

标签（空格分隔）： ES6

---

[toc]

## 字符串的扩展

### 1、字符的unicode方法
javascript的字符串方法
    console.log("\u0061")//a
字符串只能是\u000-\uFFF

    console.log("\ud842\udfb7")//吉

es6的改进：

        "\u{20BB7}"
    // "𠮷"
    
    "\u{41}\u{42}\u{43}"
    // "ABC"
    
    let hello = 123;
    hell\u{6F} // 123
    
    '\u{1F680}' === '\uD83D\uDE80'//true
    
这里的{}应该是16进制等价的,所以表示一个字符，有六种方式：

    '\z' === 'z'  // true
    '\172' === 'z' // true
    '\x7A' === 'z' // true
    '\u007A' === 'z' // true
    '\u{7A}' === 'z' // true
### 2、codePointAt()
    js内部，字节以utf16的格式保存，
    es6提供了codePointAt的方法正确处理4个字节
    
    
    var s = "𠮷a";
    console.log(s.length)//2
    console.log(s.charAt(0))
    console.log(s.charAt(1))
    console.log(s.charCodeAt(0))//55362
    console.log(s.charCodeAt(1))//5271
    console.log(s.codePointAt(0));//134071
    console.log(s.codePointAt(1));//57271
    console.log(s.codePointAt(2));//97//a
    
𠮷有四个支付，解析的





## 六 数组的方法

### 1、Array.from()
方法用于将两类对象转为真正的数组：类似数组的对象（array-like object）和可遍历（iterable）的对象（包括ES6新增的数据结构Set和Map）。

        
    var a= {
      1:"sadf",
      2:"sadf2",
      3:"sadf3",
      4:"sadf4",
      length:4  
    }
    var arr = [].slice.call(a)
    var arr2 = Array.from(a)
    console.log(arr)
    console.log(arr2)
    
    //[null,"sadf","sadf2","sadf3"]
    //[null,"sadf","sadf2","sadf3"]
    
实际用的时候 与document搭配
  

      // NodeList对象
     let ps = document.querySelectorAll('p');
        Array.from(ps).forEach(function (p) {
          console.log(p);
        });
        
    // arguments对象
    function foo() {
      var args = Array.from(arguments);
      // ...
    }

 只要是部署了Iterator接口的数据结构，Array.from都能将其转为数组。可以说是字符串，set,或者是数组自己
    
>转为数组的方式2：扩展运算符（...）也可以将某些数据结构转为数组
[...document.querySelectorAll('div')]

    console.log([...a])
对于还没有部署该方法的浏览器，可以用Array.prototype.slice方法替代。

    const toArray = (() =>
      Array.from ? Array.from : obj => [].slice.call(obj)
    )();
    
>Array.from的第二个参数：对每个数进行操作

    
### 2 Array.of
将一组数字转成数组
1、简单的 

    Array.of(3, 11, 8) // [3,11,8]
    Array.of(3) // [3]
    Array.of(3).length // 1
    
2、 原来的数组 不同的个数参数表示不同的意思

    Array() // []
    Array(3) // [, , ,]
    Array(3, 11, 8) // [3, 11, 8]

### 3、数组实例的copyWithin()
>target（必需）：从该位置开始替换数据。
start（可选）：从该位置开始读取数据，默认为0。如果为负值，表示倒数。
end（可选）：到该位置前停止读取数据，默认等于数组长度。如果为负值，表示倒数。

    var a = [1,2,3,4,5,6,7].copyWithin(5,2,-1)
    console.log(a)
    
### 4、数组实例的find()和findIndex() 

    var a = [1,2,-3,4,5,6,7].find(n=>n<0)
    console.log(a)//-3
    
findIndex里边必须是一个方法，三个参数，如下
        
    var a = [1,2,-3,4,5,6,7].findIndex((value,index,arr)=>value>4)
    console.log(a)//4
**es6**：

    var bb = [1,2,-3,4,5,6,7].findIndex((val,index,arr)=>val>6)
    console.log(bb)//6

### 5、数组实例的fill()
    ['a', 'b', 'c'].fill(7)
    // [7, 7, 7]
    
    new Array(3).fill(7)
    // [7, 7, 7]
    
>    fill方法还可以接受第二个和第三个参数，用于指定填充的起始位置和结束位置。

    ['a', 'b', 'c'].fill(7, 1, 2)
    // ['a', 7, 'c']

###  6、entries
>ES6提供三个新的方法——`entries()，keys()`和`values()`——用于遍历数组。它们都返回一个遍历器对象（详见《Iterator》一章），可以用for...of循环进行遍历，唯一的区别是keys()是对键名的遍历、values()是对键值的遍历，entries()是对键值对的遍历。

### 7、数组实例的includes()
Array.prototype.includes方法返回一个布尔值，表示某个数组是否包含给定的值，与字符串的includes方法类似。该方法属于ES7，但Babel转码器已经支持。

    [1, 2, 3].includes(2);     // true
    [1, 2, 3].includes(4);     // false
    [1, 2, NaN].includes(NaN); // true
    
第二位参数
>第二个参数表示搜索的起始位置，默认为0。如果第二个参数为负数，则表示倒数的位置

与index的区别：
>indexOf方法有两个缺点，一是不够语义化，它的含义是找到参数值的第一个出现位置，所以要去比较是否不等于-1，表达起来不够直观。二是，它内部使用严格相当运算符（===）进行判断，这会导致对NaN的误判。
[NaN].includes(NaN)
// true

### 8、数组的空位

    // forEach方法
    [,'a'].forEach((x,i) => console.log(i)); // 1
    
    // filter方法
    ['a',,'b'].filter(x => true) // ['a','b']
    
    // every方法
    [,'a'].every(x => x==='a') // true
    
    // some方法
    [,'a'].some(x => x !== 'a') // false
    
    // map方法
    [,'a'].map(x => 1) // [,1]
    
    // join方法
    [,'a',undefined,null].join('#') // "#a##"
    
    // toString方法
    [,'a',undefined,null].toString() // ",a,,"