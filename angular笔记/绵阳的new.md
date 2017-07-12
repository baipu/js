# 绵阳的new

## 1、得到contrller
    link: function (scope, element, attr, ctrl) {
    				var controls = element.controller('form');
    	}
这里的element.controller表示的是从当前指令所在的表单页获取到form标签的控制器

## 添加的element活动起来
    var valObj = vx.element('<span class="validte">&nbsp;<img src="images/gou.png" width="16" height="16" v-show="' + formName + '.' + attr.name + '.$dirty&&' + formName + '.' + attr.name + '.$valid"/>&nbsp;<span v-show="' + formName + '.' + attr.name + '.$dirty&&' + formName + '.' + attr.name + '.$invalid&&' + formName + '.' + attr.name + '.uiValidateMsg"><img src="images/cha.png" width="16" height="16"/><span v-bind="' + formName + '.' + attr.name + '.uiValidateMsg"></span></span></span>');
    
	element.after(valObj);
	$compile(valObj.contents())(scope);

## menu3的指令
1. 判断什么类型的指令
组件型  √ 
装饰性

特性：template controller 
要不要独立作用域
scope :true