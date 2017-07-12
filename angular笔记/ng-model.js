var userInfoModele = angular.module('UserInfoModule',[]);
userInfoModule.controller('UserInfoCtrl',[$scope,function($scope){
	$scope.userInfo = {
		email:"234324@qq.com",
		password:"fdsa",
		autoLogin:true,
	}
}] );