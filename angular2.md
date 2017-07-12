---
title: angular2 
tags: typescript,angualr2
grammar_cjkRuby: true
---
[toc]
# 练习：
## 1、把元素赋值给局部变量

``` html
    <input name="link" #newlink>
	
```
这里用#号将元素复制给一个局部变量
## 2、字符串中用变量

``` javascript
    console.log(`Adding article title: ${title.value} and link :${link.value}`);
```
这里的${}就是用来在字符串模板中取值的
es6特性：反引号字符串会展开模板变量
## 3、方法
 

``` javascript
addArticle(title:HTMLInputElement,link:HTMLInputElement): boolean{
    console.log(`Adding article title: ${title.value} and link :${link.value}`);
    return false;
  }
```

1. addArticle是方法名
2. title 和 link是传入的参数，以htmlElement 是参数的形式，string 或者是其他htmlElement是html dom节点的意思
3. boolean是返回值的类型
4. {}中是正文


## 4、子元素给负元素添加依赖：host

``` javascript
@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
  host:{
    class:'row'
  }
})
```
## 5 取消事件冒泡的方法：return false
 

``` javascript
 voteDoen(){
    this.votes -= 1;
    return false;
  }
```
# Typecript:
> 特性： 
> 1. 类型
> 2. 类
> 3. 注解
> 4. 模块导入
> 5. 语言工具包

## 类型 内置类型
有助于代码的编写，编译期预防bug
有助于代码阅读 清晰的表达你的意图
> 类型是可选的

var name:string

函数声明也可以为函数参数和返回值指定类型
function greetText(name:string):string{
	return "hello "+name;
}
### 字符串
var name :string = "felips";
### 数字
ts中所有的素资都是用浮点数表示的
var age:number = 36;
### 布尔类型
var married :boolean = true;
### 数组：

``` javascript
var jobs:Array<string> = ['IBM','Microsoft','Google'];
var jobs :string[] = [4,5,6]
```


###  枚举
一组可命名数值的集合，

``` javascript
enum Role{ Employee,Manageer,Admin};
var role:Role = Role.Employee;
```
>读出来的Role
>{ '0': 'Employee',
  '1': 'Manageer',
  '2': 'Admin',
  Employee: 0,
  Manageer: 1,
  Admin: 2 }
  
### 任意类型

``` typescript	
var somethine:any = "as string";
var something = 1;
something = [1,2,3]
```
### 无类型：
void 通常用于函数表示不需要有任何返回值

## 类
### 属性

``` typescript
class Person {
    first_name:string;
    last_name:string;
    age:number;
}
```


### 方法
运行在类对象实例上下文中的函数，调用兑现的方法之前必须要有这个对象的实例

``` typescript
class Person {
    first_name:string;
    last_name:string;
    age:number;
    greet(){
        console.log("Hello",this.first_name)
    }
}
```
没有显示的声明过方法的返回类型和返回值就会假定他可能返回任何东西，any类型，因为这里没有任何显示的return语句，所以实际返回的类型是void.

### 构造函数：
> 每个类只能有一个构造函数，这是违背ES6标准的，在ES6中，一个类可一拥有不同参数数量的多个构造函数重载实现

``` typescript
class Person {
    first_name:string;
    last_name:string;
    age:number;
    greet(){
        console.log("Hello",this.first_name)
    };
    //gouzhaohanshu
    constructor(first_name:string,last_name:string,age:number){
        this.first_name = first_name;
        this.last_name = last_name;
        this.age = age;
    }
}
```
### 继承
继承是ts的核心语法，

``` typescript
class  Report{
    data:Array<string>;
    constructor(data:Array<string>){
        this.data = data;
    }
    run(){
        this.data.forEach(function (line) {
            console.log(line)
        })
    }
}
var r:Report = new Report(["fist Line","Second Line"]);
r.run();
class TabbedReport extends Report {
    headers:Array<string>;
    constructor(headers:string[],values:string[]){
        super(values);
        this.headers = headers;
    }
    run(){
        console.log(this.headers);
        super.run()
    }
}
```

## 工具
### 胖箭头函数

**有一个特性：和环绕他的外部代码共享同一个this**
### 模板字符串
var firstame = "Nate";
var lastName = "Murray";
conole.log(greeting)

## 总结
还有好多其他的语法特性：
> 1. 接口
> 2. 泛型
> 3. 模块的导入，导出
> 4. 标注
> 5. 解构
> 4. 


# Angular的工作原理
## FormsModule
 
 >FormBuilder,
 FormGroup


FormModels:
> ngModel NgForm
>1. NgForm :他的选择器包含form标签而不用显示添加ngForm属性。当我们导入FormModule的是后Ngform就会被自动附加到视图中所有的,<form>标签上。**有两个功能**:
>1.1  一个名叫ngForm的FormGroup对象
>1.2 一个输出事件ngSubmit
>2. input和ngmodel 当使用不带属性值的ngModel时，我们要指定“
>2.1. **单项数据绑定**
>2.2. 希望在表单中创建一个名为sku的FormContrl 

NgModel是视图中的指令 FormControl用来表示表单中的数据和验证规则

ReactiveFormsModule:
> formControl ngFormGroup

## Formsbuilder
表单是由FormControl 和FormGroup构成，但是无法提供更多的定制化选项，
如和组件定义类型中使用FormGroup


















