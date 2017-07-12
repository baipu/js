//1、var提升
//	es5
var x = "outer";
function test(inner) {
	var x;
	if (inner) {
		x = "inner";
		return x;
	}
	return x;
}
//es6
let x = "outer";
function test(inner) {
	if (inner) {
		let x = "inner"
			return x;
	}
	return x;
}
test(false);
test(true);

//获取数组元素
//es5
var array = [1, 2, 3, 4];
var first = array[0];
var third = array[2];
console.log(first, third);
//es6
const array = [1, 2, 3, 4, 5];
const[first, , third] = array;
console.log(first, third);
//调换值
// es5
(function () {
	var a = 1,
	b = 2;
	var temp = a;
	a = b;
	b = temp;
	console.log(a, b);
})()
//es6
(function () {
	let a = 1;
	let b = 2;
	[a, b] = [b, a];
	console.log(a, b)
})()
//返回多个值的解构
//es5
(function () {
	function margin() {
		var left = 1,
		right = 2,
		top = 3,
		buttom = 4;
		return {
			left: left,
			right: right,
			top: top,
			buttom: buttom
		}
	}
	var data = margin();
	var left = data.left;
	var buttom = data.buttom;
	console.log(left, buttom)
})()

//es6
(function () {
	function margin() {
		const left = 1,
		right = 2,
		top = 3,
		bottom = 4;
		return {
			left,
			right,
			top,
			bottom
		};
	}
	const {
		left,
		bottom
	} = margin();
	console.log(left, bottom); // 1 4
})()
//参数匹配解构
//es5
(function () {
	var user = {
		firstName: 'Adrian',
		lastName: 'Mejia'
	};
	function getFullName(user) {
		var firstName = user.firstName;
		var lastName = user.lastName;
		return firstName + ' ' + lastName;
	}
	console.log(getFullName(user));
})()
//es6
(function () {
	const user = {
		firstName: 'Adrian',
		lastName: 'Mejia'
	};
	function getFullName({
		firstName,
		lastName
	}) {
		return `${firstName}${lastName}`;
	}
	console.log(getFullName(user)); // Adrian Mejia
})()

//深度匹配
//	ES5
(function () {
	function settings() {
		return {
			display: {
				color: 'red'
			},
			keyboard: {
				layout: 'querty'
			}
		};
	}
	var tmp = settings();
	var displayColor = tmp.display.color;
	var keyboardLayout = tmp.keyboard.layout;
	console.log(displayColor, keyboardLayout); // red querty

})()
//	ES6
(function () {
	function settings() {
		return {
			display: {
				color: 'red'
			},
			keyboard: {
				layout: 'querty'
			}
		};
	}
	const {
		display: {
			color: displayColor
		},
		keyboard: {
			layout: keyboardLayout
		}
	} = settings();
	console.log(displayColor, keyboardLayout); // red querty
})()
/* 最佳实践：
使用数组解构获取元素或调换变量，这样就不用创建临时引用了。
对于多返回值的情况，不要用数组解构，用对象解构。 */
//类和对象
//es5
(function () {
	var Animal = (function () {
		function MyConstructor(name) {
			this.name = name;
		}
		MyConstructor.prototype.speak = function speak() {
			console.log(this.name + ' makes a noise.');
		};
		return MyConstructor;
	})();
	var animal = new Animal('animal');
	animal.speak(); // animal makes a noise.
})()
//es6ES6 提供了语法糖，可以用 class、constructor 等新的关键字、更少的样板代码实现相同的效果。
(function () {
	class Animal {
		constructor(name) {
			this.name = name;
		}
		speak() {
			console.log(this.name + ' makes a noise.');
		}
	}
	const animal = new Animal('animal');
	animal.speak(); // animal makes a noise.
})()

/* 继承
基于前面的 Animal 类，现在想要拓展 Animal，定义一个 Lion 类。
ES5 原型继承的方式有些复杂。 */
(function () {
	var Animal = (function () {
		function MyConstructor(name) {
			this.name = name;
		}
		MyConstructor.prototype.speak = function speak() {
			console.log(this.name + ' makes a noise.');
		};
		return MyConstructor;
	})();
	var Lion = (function () {
		function MyConstructor(name) {
			Animal.call(this, name);
		};
		MyConstructor.prototype = Object.create(Animal.prototype);
		console.log(MyConstructor.prototype)
		MyConstructor.prototype.constructor = Animal;
		MyConstructor.prototype.speak = function speak() {
			Animal.prototype.speak.call(this);
			console.log(this.name + "roars");
		}
		return MyConstructor;
	})();
	var lion = new Lion('Simba');
	lion.speak(); // Simba makes a noise.
})()
//es6
(function () {
	var Animal = (function () {
		function MyConstructor(name) {
			this.name = name;
		}
		MyConstructor.prototype.speak = function speak() {
			console.log(this.name + ' makes a noise.');
		};
		return MyConstructor;
	})();
	class Lion extends Animal {
		speak() {
			super.speak();
			console.log(this.name + ' roars ');
		}
	}
	const lion = new Lion('Simba');
	lion.speak(); // Simba makes a noise.
	// Simba roars.
})()
/* 原生 Promise

用 promise 替代回调地狱 */
(function () {
	function printAfterTimeout(string, timeout, done) {
		setTimeout(function () {
			done(string);
		}, timeout);
	}
	printAfterTimeout("Hello", 2e3, function (result) {
		console.log(result);
		//然后再次调用自身
		printAfterTimeout("Hello" + result, 2e3, function (result) {
			console.log(result);
		});

	})
})()
/**
这个函数接收一个回调，在 done 后执行。我们想要先后执行两次，所以在回调中又一次调用了 printAfterTimeout。

如果需要 3 或 4 次回调，代码很快就一团糟了。那么用 promise 如何实现呢：

ES6**/
(function () {
	function printAfterTimeout(string, timeout) {
		return new Promise((resolve, reject) => {
			setTimeout(function () {
				resolve(string)
			}, timeout);
		})
	}
	printAfterTimeout("Hello", 2e3).then((result) => {
		console.log(result);
		return printAfterTimeout("reader" + result, 2e3)
	}).then((result) => {
		console.log(result)
	});
})()
/**箭头函数

ES6 没有移除函数表达式，但是新增了箭头函数。

ES5 中，this 的指向有问题：
 **/
(function () {
	var _this = this; // need to hold a reference
	$('.btn').click(function (event) {
		_this.sendData(); // reference outer this
	});
	$('.input').on('change', function (event) {
		this.sendData(); // reference outer this
	}
		.bind(this)); // bind to outer this
})()
//es6 =>
(function () {
	$('.btn').click( (event)=> this.sendData());
	$('.input').on('change',this=>this.sendData());
	// this will reference the outer one
})()
//es6=>
(function () {
	const ids = [211,123,123,543,12];
	const message=ids.map(value=>`ID is $(value)`);//？？
})()

/* //默认参数 */
(function () {
	function point(x,y,isFlag){
		x = x||0;
		y=y||-1;
		isFlag = isFlag||true;
		console.log(x,y,isFlag);
	}
	point(1,1);
	point(0,0,false);
	point(1);
	point()
	function point01(x=0,y=-1,isFlag=true){
		console.log(x,y,isFlag);
	}
	point01(1,1);
	point01(0,0,false);
	point01(1);
	point01()
})()
/* //剩余参数 */
(function () {
	function print(format){
		var params = [].slice.call(arguments,1);
		console.log("params:",params);
		console.log("format",format);
	}
	print("%s %d %.2f",'adrian',312,Math.PI);
	function printf1(format, ...params) {
  console.log('params: ', params);
  console.log('format: ', format);
}
printf1('%s %d %.2f', 'adrian', 321, Math.PI);
})()
/* 展开操作符
Math.max(1,2,3,5,3,2,1,4,6,2,);
Math.max([1,2,1,2,3,4,34,7,6,5,8,3,4,9,,8,4,3,6]);
Math.max.apply(Math,[1,2,1,2,3,4,34,7,6,5,8,3,4,9,,8,4,3,6])

如上所述，apply 可以将数组当作参数序列进行传递：
ES5
Math.max.apply(Math, [2,100,1,6,43]) // 100
ES6 可以用展开操作符：
Math.max(...[2,100,1,6,43]) // 100
 */
(function () {//ES5
 
var array1 = [2,100,1,6,43];
var array2 = ['a', 'b', 'c', 'd'];
var array3 = [false, true, null, undefined];
console.log(array1.concat(array2, array3));
})()
//ES6 可以用展开操作符展开嵌套的数组：
//ES6
(function () {
const array1 = [2,100,1,6,43];
const array2 = ['a', 'b', 'c', 'd'];
const array3 = [false, true, null, undefined];
console.log([...array1, ...array2, ...array3]);})()
