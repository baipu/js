>如何在根 "AppModule" 中构建和启动应用。

`Angular` 模块类描述应用的部件是如何组合在一起的。 每个应用都至少有一个 Angular 模块，也就是根模块，用来引导并运行应用。 你可以为它取任何名字。常规名字是 `AppModule。`
```
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }  from './app.component';

@NgModule({
  imports:      [ BrowserModule ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
```

`import` 语句之后，可以看到一个`@NgModule`装饰器修饰的类。
@NgModule装饰器将AppModule标记为 Angular 模块类（也叫NgModule类）。 @NgModule接受一个元数据对象，告诉 Angular 如何编译和启动应用。

- imports — BrowserModule，这个和每个在浏览器中运行应用都需要它。
- declarations — 应用的唯一组件，它同时也是...
- bootstrap — 根组件，Angular 创建它并插入index.html宿主页面。
## imports 数组
 HTTP 服务在HttpModule里。路由器在RouterModule中。 最终，你可能也会创建特性模块。当应用需要模块的特性时，将其添加到imports数组中。

 imports数组中应该只有NgModule类。不要放置其它类型的类。


>不要将 Angular 块的imports数组与文件顶部的import语句弄混淆了。它们的功能不同。

>JavaScript 的import声明允许你访问在其他文件中导出的符号，这样你可以在当前文件引用它们。 它们与 Angular 毫无关系，Angular 对它们也一无所知。

>模块的imports数组告诉 Angular 特定 Angular 模块的信息 — 用@NgModule装饰的类 — 应用需要它们来正常工作。

## declarations 数组
每个组件必须在且仅在一个NgModule类中声明。通过将其列到AppModule模块的declarations数组中，告诉 Angular 哪个组件属于AppModule。 在创建更多组件的过程中，逐步将它们添加到declarations中。
只有*可以声明的 — 组件、指令和管道 — 属于declarations数组。 不要将其他类型的类添加到declarations中，例如NgModule类, 服务类，模型类。
## bootstrap 数组
通过引导根`AppModule`来启动应用.
每个被引导的组件都是它自己的组件树的根。 插入一个被引导的组件通常触发一系列组件的创建并形成组件树。

你可以为这个根组件取任何名字，但是大多数程序员将其取名为AppComponent。
下面让我们来看看引导过程本身。

# 在main.ts中引导
开始时，你将使用即时 (JiT) 编译器动态编译应用。然后在浏览器中运行它。 稍后，你可以了解其他选项。
引导即时编译的浏览器应用的推荐地点是在app目录中一个名为app/main.ts的单独文件中。
app/main.ts
```
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule }              from './app.module';

platformBrowserDynamic().bootstrapModule(AppModule);
```
引导过程搭建运行环境，从模块的bootstrap数组中提出根AppComponent， 创建该组件的实例，并将其插入到组件selector标识的元素标签中。
AppComponent选择器 — 在这里以及文档大部分例子中 — 是my-app， 所以 Angular 在index.html中查找像这样的<my-app>标签...
```
<my-app><!-- content managed by Angular --></my-app>
```
该文件非常稳定。一旦配置好，你可能永远不会再修改它。
