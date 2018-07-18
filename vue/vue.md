 

# vue

[TOC]

## 1、v-on

- **缩写**：`@`

- **预期**：`Function | Inline Statement | Object`

- **参数**：`event`

- **修饰符**：

  - `.stop` - 调用 `event.stopPropagation()`。**组织冒泡**
  - `.prevent` - 调用 `event.preventDefault()`。**阻止默认行为**
  - `.capture` - 添加事件侦听器时使用 capture 模式。**捕获事件触发**
  - `.self` - 只当事件是从侦听器绑定的元素本身触发时才触发回调。**只有点击自己才会触发事件，如果是捕获或者是冒泡，就不会处罚回调事件**
  - `.{keyCode | keyAlias}` - 只当事件是从特定键触发时才触发回调。
  - `.native` - 监听组件根元素的原生事件。
  - `.once` - 只触发一次回调。
  - `.left` - (2.2.0) 只当点击鼠标左键时触发。
  - `.right` - (2.2.0) 只当点击鼠标右键时触发。
  - `.middle` - (2.2.0) 只当点击鼠标中键时触发。
  - `.passive` - (2.3.0) 以 `{ passive: true }` 模式添加侦听器

- **用法**：

  绑定事件监听器。事件类型由参数指定。表达式可以是一个方法的名字或一个内联语句，如果没有修饰符也可以省略。

  用在普通元素上时，只能监听[**原生 DOM 事件**](https://developer.mozilla.org/zh-CN/docs/Web/Events)。用在自定义元素组件上时，也可以监听子组件触发的**自定义事件**。

  在监听原生 DOM 事件时，方法以事件为唯一的参数。如果使用内联语句，语句可以访问一个 `$event` 属性：`v-on:click="handle('ok', $event)"`。

  从 `2.4.0` 开始，`v-on` 同样支持不带参数绑定一个事件/监听器键值对的对象。注意当使用对象语法时，是不支持任何修饰器的。

  ```
  <!-- 停止冒泡 -->
  <button @click.stop="doThis"></button>
  
  <!-- 阻止默认行为 -->
  <button @click.prevent="doThis"></button>
  
  <!-- 阻止默认行为，没有表达式 -->
  <form @submit.prevent></form>
  
  <!--  串联修饰符 -->
  <button @click.stop.prevent="doThis"></button>
  
  <!-- 键修饰符，键别名 -->
  ```

## 2、v-class

class名字可以带引号，也可以不带引号

1、数组

```
<div v-bind:class="[activeClass, errorClass]"></div>
```

2、数组里边使用三元表达式

```
<div v-bind:class="[‘activeClass’, ‘errorClass’，flag?active:'']"></div>
```

```
<div v-bind:class="[activeClass, errorClass,{'active':flag}]"></div>
```

3、直接使用对象

```
<div class="static"
     :class="{ active: isActive, 'text-danger': hasError }">
</div>
```





# WebPack

1. `npm i webpack`	用来安装`webpack`

2. `npm  i web pack-dev-server -D` 自动打包依赖的功能还能自动刷新浏览器，（现在好像依赖webpack-cli）需要在`package.json` 中写东西，然后用 `npm run dev`运行

   ````json
   "scripts": {
       "test": "echo \"Error: no test specified\" && exit 1",
      // "dev": "webpack-dev-server"，//这个时候仅仅是打包，和自动刷新
        "dev": "webpack-dev-server --open --port 3000 ContentBase src --hot"//这个时候仅仅是打包，和自动刷新，端口设置为3000   根路基就是src 因为src下有index.html所以自动打开的是index页面 --hot不用重新打包boundle，而是布丁更新，可以让浏览器无刷新重载
       
     },
   ````

   

3. `npm i html-webpack-plugin -D`

   当我们自动添加了html-webpack-plugin的时候，我们就不需要在手动的导入boundle这个js了，他会自动帮我们处理这个问题

   ````json
    plugins: [
           new webpack.HotModuleReplacementPlugin(),//启用热更新的第三步
           new webpack.htmlWebpackPlugin({
               template: path.join(__dirname, "index.html"),
               filename:'index.html'//生产的页面的名字
           }),
   
       ]
   ````

   

4. npm i css-loader style-loader -D

   1. npm i less-loader sass-loader -D
   2. npm i url-loader file-loader -D.  处理图片的loader用url-loader

5. Babel的安装

   1. npm i babel-core bable-loader babel-plugin-transform-runtime -D
   2. npm i babel-preset-env bable-preset-stage-0 -D









6. 安装vue
   1. npm i vue -D
   2. npn i vue-loader vue-template-complier -D
7. cpm i moment -S时间格式化文件



## export exports

- 在 ES6中，也通过 规范的形式，规定了 ES6 中如何 导入 和 导出 模块

   ES6中导入模块，使用   import 模块名称 from '模块标识符'    import '表示路径'

   在 ES6 中，使用 export default 和 export 向外暴露成员

- 在Node中 使用 var 名称 = require('模块标识符')

   module.exports 和 exports 来暴露成员

