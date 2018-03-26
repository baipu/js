
# TypeScript

[TOC]

标签（空格分隔）： Type

---

## 1、generator函数
编译器Babel
断点：yield 
控制函数的执行过程，手工展厅和恢复代码执行

## 2destructuring 析构表达式
同过表达式将对象或数组拆解成任意数量的变量
### 对象中取值
    function getStock(){
        return {
            code:"IBM",
            price:{
                price1:100,
                price2:200
                },
            aaa:"asdf",
            xc:"asdfhui"
        }
    
    }
    
    var stock = getStock();
    var code = stock.code;
    
    var { code,price} = getStock();
    // 第二种情况
    var {code:codex,price:{price2}} = getStock();





### 数组中取值

    var array1 = [1,2,3,4,5,6];
    var [number1,number2,...others] = array1;
    console.log(number1)
    console.log(number2)
    console.log(others)//[3,4,5,6]
    
    function doSomething([number1,number2,...other]){
    console.log(number1);
    console.log(others)
    }
    doSomething(array1)；

## 箭头表达式
```
    //单行
    var sum = (arg1, arg2) => arg1 + arg2;
    //多行 需要大括号和return    

    //只有一个参数的时候不用括号 
    var sum1 = arg1 => { 
        console.log(1)
    }

var myArray = [1, 2, 3, 4, 5];
console.log(myArray.filter(value => value % 2 == 0))
//优势：消除了this关键字的问题


//关于this的问题
function getStock(name: String) { 
    setInterval(
        function () { 
            console.log("name is "+this.name);
        },1000
    )
}
var stock = new getStock("IBM");
//如果使用箭头表达式
function getSrock2(name: String) { 
    this.name = name;
    setInterval(() => { 
        console.log("this is name " + this.name);
    },1000)
}
var stock2 = new getSrock2("Ibm");
## forEach

    var myAyyar = [1, 2, 3, 4];
    myAyyar.des = "four number";//这里的类型不符合，所以ts报错
    //老的foreach循环，忽略属性  不能够跳出去
    myAyyar.forEach(value => console.log(value))//1,2,3,4
    //for in
    for (var n in myAyyar) { 
        console.log(n)//0,1,2,3,des这里打出来的值值
        console.log(myAyyar[n])
    }
    //for of 可以break掉掉
    for (var n of myAyyar) { 
        if (n > 2) break;
        console.log(n)//0,1,2,3,des这里打出来的值值
        
    }
```
# 面向对象特性
##   class 核心
### 定义

    class Person { 
        name;
        eat() { 
            console.log("im eating ")
        }
    }
    var p1 = new Person();
    p1.name = "batman";
    p1.eat;
    //访问控制付付
    // public 默认的的
    // private 
    //protected 可以在内部和子类里边被访问
### 构造函数
constructor

        class Person { 
        constructor() { 
            console.log("hehe")
        }
        name;
        eat() { 
            console.log("im eating ")
        }
    }
    var p1 = new Person();
### 类的继承

        extends 
        class Person { 
        constructor(public name:String) { 
            console.log("hehe")
        }
        
        eat() { 
            console.log("im eating ")
        }
    }
    var p1 = new Person("");
    //继承 extends
    //super
    class Employee extends Person{
        constructor(name: string, code: string) { 
            super(name);
            this.code = code;
        }
        code: string;
        work() { 
            super.eat();
            this.doWork();
        }
        doWork() { 
            
        }
    }
    
    var e1 = new Employee("name","12");
    e1.code;
    e1.eat()
    //super的用法

## 泛型
    参数化的类型，一般用来限制集合的内容

    var workers: Array<Person> = [];
    workers[0] = new Person("掌声");
    workers[1] = new Employee("lisi", "0");
## 接口
    interface implement
    interface IPerson{
        name: string;
        age: number;
    
    }
    
    class Person { 
        constructor(public config: IPerson) {
            
        }
    }
    var p1 = new Person({//这里的对象必须符合接口声明的所有的属性
        name: "zhangshan",
        age:19
    })


这里用implement

    interface animal { 
        eat();
    }
    class Sheep implements animal { 
        eat() { //接口管中的方法必须有
            console.log("i eat grass");
    
        }
    }
    class Tigger implements animal { 
        eat() { 
            console.log("I eat meat")
        }
    }
    
  ## 模块
  一个文件就是一个模块，模块的内部有两个关键之
  export import导出和导入
  一个是对外暴露什么，一个是需要导入什么
  import {prop1} from "./a";
 ## 注解
 供制定的框架或者是工具使用的

## 类型定义文件（*.d.ts）
    如和使用jquery等工具包
    来自于github下DefinitelyTyped有几乎所有js框架的类型定义文件
    typings工具用来下载类型定义文件
    



