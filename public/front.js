var app = angular.module('card', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
	$routeProvider
	.when('/', {
		templateUrl: 'views/login.html',
		controller: ''
	})
/*	.when('/', {
		templateUrl: 'views/createCard.html',
		controller: ''
	})
	.when('/', {
		templateUrl: 'views/editCard.html',
		controller: ''
	})*/
}]);

app.directive("fileModel", ["$parse", function($parse) {
	return {
		restrict: "A",
		link: function(scope, element, attrs) {
			var model = $parse(attrs.fileModel);
			var modelSetter = model.assign;
			element.bind("change", function() {
				scope.$apply(function() {
					modelSetter(scope, element[0].files);
				})
			})
		}
	}
}]);

app.service("fileUpload", ["$http", function($http) {
	this.uploadFileToUrl = function(files, uploadUrl, scope) {
		var fd = new FormData();
		fd.append("phone", scope.phone);
		for(var i = 0; i < files.length; i++) {
			fd.append("uploadFiles", files[i]);
		}
		$http.post(uploadUrl, fd, {
				transformRequest: angular.identity,
				headers: {
					"Content-Type": undefined
				}
			})
			.success(function() {
				scope.uploadStatus = "上传成功";
			})
			.error(function() {
				scope.errorStatus = "上传失败";
			});
	}
}]);