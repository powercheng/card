var app = angular.module('wechatCard', ['ngRoute','monospaced.qrcode']);

app.config(['$routeProvider', function($routeProvider) {
	$routeProvider.
	when('/', {
		templateUrl: '/views/cards.html',
		controller: 'cardsCtrl'
	}).
	when('/cards/:id', {
		templateUrl: '/views/card.html',
		controller: 'cardCtrl'
	});
}]);

app.controller('cardsCtrl', ['$scope', '$http', function($scope, $http) {
	$http({
		method: 'GET',
		url: '/cards/'
	}).then(function successCallback(res) {
		$scope.cards = res.data;
	}, function errorCallback(res) {
            // 请求失败执行代码
        });
	
	let	topInfos = [{
		"name": "姓名",
		"value": "",
		"style": {
			"fontFamly": "宋体",
			"fontSize": "28px",
			"position": "absolute",
			"left": "40%",
			"top": "30%",
			"fontWeight": "unbold"
		}
	},
	{
		"name": "公司名称",
		"value": "",
		"style": {
			"fontFamly": "宋体",
			"fontSize": "18px",
			"position": "absolute",
			"left": "40%",
			"top": "60%",
			"fontWeight": "unbold"
		}
	},
	{
		"name": "职位",
		"value": "",
		"style": {
			"fontFamly": "宋体",
			"fontSize": "18px",
			"position": "absolute",
			"left": "40%",
			"top": "50%",
			"fontWeight": "unbold"
		}
	}];
	let personInfos = [{
		"name": "联系电话",
		"value": ""
	}, {
		"name": "联系地址",
		"value": ""
	}, {
		"name": "微信号码",
		"value": ""
	}, {
		"name": "QQ号码",
		"value": ""
	}, {
		"name": "邮箱",
		"value": ""
	}];
	let otherFiles = [{
		"name": "地址百度坐标",
		"value": ""
	}, {
		"name": "微信二维码",
		"value": ""
	}, {
		"name": "QQ二维码",
		"value": ""
	}, {
		"name": "顶部背景",
		"value": ""
	}, {
		"name": "背景音乐",
		"value": ""
	}];
	let companyInfos = [{
		"name": "固定电话",
		"value": ""
	}, {
		"name": "传真号码",
		"value": ""
	}, {
		"name": "网址",
		"value": ""
	}];
	let otherInfos = [];
	let topFiles = [{
		"src": "默认头像.jpg",
		"style": {
			"width": "80px",
			"height": "80px",
			"position": "absolute",
			"left": "20%",
			"top": "30%",
			"borderRadius": "50%"
		}
	}];
	let botFiles = [{"value":""}];
	let textModule = 'single';
	let bgColor = '#ff7694';
	let menuColor = '#ff7694';
	let topHeight = 200;
	let topImgHeight = 100;
	let topModule = '1';
	$scope.createCard = function() {
		$http({
			method:"POST",
			url: '/cards/',
			data : {
				phone: $scope.phone,
				topInfos: angular.toJson(topInfos),
				topFiles: angular.toJson(topFiles),
				personInfos: angular.toJson(personInfos),
				companyInfos: angular.toJson(companyInfos),
				otherInfos: angular.toJson(otherInfos),
				botFiles: angular.toJson(botFiles),
				otherFiles: angular.toJson(otherFiles),
				textModule: angular.toJson(textModule),
				bgColor: angular.toJson(bgColor),
				menuColor: angular.toJson(menuColor),
				topHeight: angular.toJson(topHeight),
				topImgHeight: angular.toJson(topImgHeight),
				topModule: angular.toJson(topModule)
			}
		}).then(function successCallback(res) {
			$http({
				method: 'GET',
				url: '/cards/'
			}).then(function successCallback(res) {
				$scope.cards = res.data;
			}, function errorCallback(res) {
            // 请求失败执行代码
        });
		}, function errorCallback(res) {

		});
	};
	$scope.createCard = function() {
		$http({
			method:"POST",
			url: '/cards/',
			data : {
				phone: $scope.phone,
				topInfos: angular.toJson(topInfos),
				topFiles: angular.toJson(topFiles),
				personInfos: angular.toJson(personInfos),
				companyInfos: angular.toJson(companyInfos),
				otherInfos: angular.toJson(otherInfos),
				botFiles: angular.toJson(botFiles),
				otherFiles: angular.toJson(otherFiles),
				textModule: angular.toJson(textModule),
				bgColor: angular.toJson(bgColor),
				menuColor: angular.toJson(menuColor),
				topHeight: angular.toJson(topHeight),
				topImgHeight: angular.toJson(topImgHeight),
				topModule: angular.toJson(topModule)
			}
		}).then(function successCallback(res) {
			$http({
				method: 'GET',
				url: '/cards/'
			}).then(function successCallback(res) {
				$scope.cards = res.data;
			}, function errorCallback(res) {
            // 请求失败执行代码
        });
		}, function errorCallback(res) {

		});
	};
}]);


app.controller('cardCtrl', ['$scope', '$http', '$routeParams', 'fileUpload', '$sce', '$timeout','$window',
	function($scope, $http, $routeParams, fileUpload, $sce, $timeout, $window) {
	$http({
		method: 'GET',
		url: '/cards/' + $routeParams.id,
	}).then(function successCallback(res) {
		$scope.phone = angular.fromJson(res.data.phone);
		$scope.topInfos = angular.fromJson(res.data.topInfos);
		$scope.topFiles = angular.fromJson(res.data.topFiles);
		$scope.personInfos = angular.fromJson(res.data.personInfos);
		$scope.companyInfos = angular.fromJson(res.data.companyInfos);
		$scope.otherInfos = angular.fromJson(res.data.otherInfos);
		$scope.botFiles = angular.fromJson(res.data.botFiles);
		$scope.otherFiles = angular.fromJson(res.data.otherFiles);
		$scope.textModule = angular.fromJson(res.data.textModule);
		$scope.bgColor = angular.fromJson(res.data.bgColor);
		$scope.menuColor = angular.fromJson(res.data.menuColor);
		$scope.topHeight = angular.fromJson(res.data.topHeight);
		$scope.topImgHeight = angular.fromJson(res.data.topImgHeight);
		$scope.topModule = angular.fromJson(res.data.topModule);
	}, function errorCallback(res) {

	});
	$scope.myVar = [true, true, true, true, true, true, true, true, true];
	$scope.musicUrl = '/images/music.mp3';
	$scope.addTopInfo = function(arr) {
		console.log(arr);
		console.log(typeof(arr));
		arr.push({
			"name": "",
			"value": "",
			"style": {
				"fontFamly": "宋体",
				"fontSize": "18px",
				"position": "absolute",
				"left": "40%",
				"top": "60%",
				"fontWeight": "unbold"
			}
		});
	};			
	$scope.addTopFile = function(arr) {
		arr.push({
			"src": "默认头像.jpg",
			"style": {
				"width": "80px",
				"height": "80px",
				"position": "absolute",
				"left": "20%",
				"top": "30%",
				"borderRadius": "50%"
			}
		});
	};
	$scope.addBotFile = function(arr) {
		arr.push({
			"value":""
		});
	};
	$scope.toggle = function(index) {
		$scope.myVar[index] = !$scope.myVar[index];
	};
	$scope.addInfo = function(arr) {
		arr.push({
			name: "",
			value: ""
		});
	};
	$scope.removeInfo = function(arr, index) {
		arr.splice(index, 1);
	};

	$scope.removeFile = function(arr, index) {
		fName = arr[index];
		arr.splice(index, 1);
		var url = "/customers/file";
		$http.delete(url, {
			params: {
				"phone": $scope.phone,
				"fileName": fName
			}
		}).then(function(res) {

		});
		$scope.getFile();
	};

	$scope.changeMut = function(i) {
		$(".mut").removeClass("mused");
		$(".mut").eq(i).addClass("mused");
		$(".mutexItems").css("display", "none");
		$(".mutexItems").eq(i).css("display", "block");
	};

	$scope.getFile = function() {
		var url = "/cards/file/" + $scope.phone;

		$http.get(url, {}).then(function(res) {
			if(res.data.status == "0") {
				$scope.fileStatus = res.data.data;
			} else {
				$scope.fileStatus = "获取成功";
				$scope.filesName = res.data.data;
				// 复制filesname, 加入一个空值。
				$scope.selectNames = res.data.data.slice(0);
				$scope.selectNames.push("");
			}
		});
	};

	$scope.sendFile = function() {
		var url = "/cards/file",
		files = $scope.uploadFiles;
		if(!files) return;
		fileUpload.uploadFileToUrl(files, url, $scope);
	};

	$scope.dragable = function(e, o) {
		var width = $("#top1").width();
		var height = $("#top1").height();
		var x = e.clientX - e.target.offsetLeft;
		var y = e.clientY - e.target.offsetTop;
		var tWidth = e.target.offsetWidth;
		var tHeight = e.target.offsetHeight;
		var d = document;
		var p = "onmousemove";
		var s = e.target.style;
		d[p] = function(e) {
			s.left = (e.clientX - x) / width * 100 + '%';
			s.top = (e.clientY - y) / height * 100 + '%';
			if(parseFloat(s.left) < 0) {
				s.left = 0 + '%';
			}
			if(parseFloat(s.left) > parseFloat((width - tWidth) / width * 100)) {
				s.left = (width - tWidth) / width * 100 + '%';
			}
			if(parseFloat(s.top) < 0) {
				s.top = 0 + '%';
			}
			if(parseFloat(s.top) > parseFloat((height - tHeight) / height * 100)) {
				s.top = (height - tHeight) / height * 100 + '%';
			}
		};
		d.onmouseup = function() {
			o.style.left = s.left;
			o.style.top = s.top;
			d[p] = null;
		};
	};

	$scope.checkImage = function(name) {
		var ext = name.substr(name.lastIndexOf(".") + 1).toLowerCase();
		if(ext == 'jpg' || ext == 'jpeg' || ext == 'bmp' || ext == 'png')
			return true;
		return false;
	};
	$scope.checkVideo = function(name) {
		var ext = name.substr(name.lastIndexOf(".") + 1).toLowerCase();
		if(ext == 'mp4' || ext == 'avi' || ext == 'mpeg' || ext == 'wmv' || ext == 'rmvb' || ext == 'rm') 
			return true;
		return false;
	};
	$scope.trustUrl = function(url) {
		return $sce.trustAsResourceUrl('/uploads/' + $scope.phone + '/' + url);
	};

	$scope.saveCard = function() {
		$scope.saveStatus = "保存中...";
		$http({
			method: "PUT",
			url: "/cards/",
			data: {
				phone: $scope.phone,
				topInfos: angular.toJson($scope.topInfos),
				topFiles: angular.toJson($scope.topFiles),
				personInfos: angular.toJson($scope.personInfos),
				companyInfos: angular.toJson($scope.companyInfos),
				otherInfos: angular.toJson($scope.otherInfos),
				botFiles: angular.toJson($scope.botFiles),
				otherFiles: angular.toJson($scope.otherFiles),
				textModule: angular.toJson($scope.textModule),
				bgColor: angular.toJson($scope.bgColor),
				menuColor: angular.toJson($scope.menuColor),
				topHeight: angular.toJson($scope.topHeight),
				topImgHeight: angular.toJson($scope.topImgHeight),
				topModule: angular.toJson($scope.topModule)
			}
		}).then(function successCallback(res){
			$scope.saveStatus = "保存成功";
			$timeout(function(){
				$scope.saveStatus = "未保存";
			},10000);  
			

		}).then(function errorCallback(res) {

		});
	};

	$scope.finishCard = function() {
		console.log('finish');
		$scope.saveCard();
		var content = $("#main")[0].innerHTML;
		$http({
			method: "POST",
			url: "/cards/finish",
			data: {
				'phone': $scope.phone,
				'name': $scope.topInfos[0].value,
				'content': content
			}
		}).then(function successCallback(res){
			$scope.finish = true;
			var url = location.origin + "/uploads/" + $scope.phone + "/index.html";
			$scope.cardHtml = url;
		}).then(function errorCallback(res) {

		});
	}

/*	$scope.save = function() {
		var data = $("#main")[0].innerHTML;
		$http({
			method: "POST",
			url: "/customers/create/",
			data: {
				'phone': $scope.phone,
				'data': data
			}
		})
		.success(function() {

		})
		.error(function() {

		});
	};*/

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
				});
			});
		}
	};
}]);

app.service("fileUpload", ["$http", function($http) {
	this.uploadFileToUrl = function(files, uploadUrl, scope) {
		scope.uploadStatus = "上传中....";
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
	};
}]);