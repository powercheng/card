angular.module("card")
.controller('editCardCtrl', ['$scope', '$http', 'fileUpload', '$sce', function($scope, $http, fileUpload, $sce) {
	$scope.host = location.origin;
	$scope.topInfos = [{
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
		}
	];
	$scope.addTopInfo = function(arr) {
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
	$scope.personInfos = [{
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
		"value": " "
	}, {
		"name": "邮箱",
		"value": ""
	}];
	$scope.otherFiles = [{
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

	$scope.companyInfos = [{
		"name": "固定电话",
		"value": ""
	}, {
		"name": "传真号码",
		"value": ""
	}, {
		"name": "网址",
		"value": ""
	}];
	$scope.otherInfos = [];
	$scope.topFiles = [{
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
	}
	$scope.botFiles = [{
		"value": ""
	}];
	$scope.addBotFile = function(arr) {
		arr.push({
			"vaule": ""
		});
	};

	$scope.myVar = [true, true, true, true, true, true, true, true, true];
	$scope.textModule = 'single';
	$scope.bgColor = '#ff7694';
	$scope.menuColor = '#ff7694';
	$scope.topHeight = 200;
	$scope.topImgHeight = 100;
	$scope.topModule = '1';

	$scope.toggle = function(index) {
		$scope.myVar[index] = !$scope.myVar[index];
	};

	$scope.addInfo = function(arr) {
		arr.push({
			"name": "",
			"value": ""
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
		var url = "/customers/file/" + $scope.phone;

		$http.get(url, {}).then(function(res) {
			if(res.data.status == "0") {
				$scope.fileStatus = res.data.data;
			} else {
				$scope.fileStatus = "获取成功";
				$scope.filesName = res.data.data;
			}
		});
	};

	$scope.sendFile = function() {
		var url = "/customers/file",
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
		if(ext == 'mp4' || ext == 'avi' || ext == 'mpeg' || ext == 'wmv' || ext == 'rmvb' || ext == 'rm') {
			return true;
		} else {
			return false;
		}
	};

	$scope.getCustomer = function() {
		var url = "./customers/" + $scope.phone;
		$http({
				method: "GET",
				url: url,
			}).success(function(res) {

				if(res == "不存在该用户") {
					var url = "./customers";
					$http({
							method: "POST",
							url: url,
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
						}).success(function(res) {
							$scope.createStatus = res;
						})
						.error(function(res) {

						});
				} else {
					$scope.getFile();
					console.log(res);
					$scope.phone = angular.fromJson(res[0].phone);
					$scope.topInfos = angular.fromJson(res[0].topInfos);
					$scope.topFiles = angular.fromJson(res[0].topFiles);
					$scope.personInfos = angular.fromJson(res[0].personInfos);
					$scope.companyInfos = angular.fromJson(res[0].companyInfos);
					$scope.otherInfos = angular.fromJson(res[0].otherInfos);
					$scope.botFiles = angular.fromJson(res[0].botFiles);
					$scope.otherFiles = angular.fromJson(res[0].otherFiles);
					$scope.textModule = angular.fromJson(res[0].textModule);
					$scope.bgColor = angular.fromJson(res[0].bgColor);
					$scope.menuColor = angular.fromJson(res[0].menuColor);
					$scope.topHeight = angular.fromJson(res[0].topHeight);
					$scope.topImgHeight = angular.fromJson(res[0].topImgHeight);
					$scope.topModule = angular.fromJson(res[0].topModule);

					$scope.createStatus = "获取成功";
				}
			})
			.error(function(res) {

			});
	}

	$scope.saveCustomer = function() {
		var url = "./customers/" + $scope.phone;
		$http({
				method: "GET",
				url: url,
			}).success(function(res) {

				if(res == "不存在该用户") {
					var url = "./customers";
					$http({
							method: "POST",
							url: url,
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
						}).success(function(res) {
							$scope.createStatus = res;
						})
						.error(function(res) {

						});
				} else {
					var url = "./customers";
					$http({
							method: "PUT",
							url: url,
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
						}).success(function(res) {
							$scope.createStatus = res;
						})
						.error(function(res) {

						});
				}
			})
			.error(function(res) {

			});
	}
	/*	$scope.getCustomers = function() {
			$http({
					method: "GET",
					url: "./customers/"
				}).success(function(res) {
					console.log(res);
				})
				.error(function() {
					console.log(2);
				});
		}*/

	$scope.save = function() {
		var data = $("#main")[0].innerHTML;
		$http({
				method: "POST",
				url: "./customers/create",
				data: {
					'phone': $scope.phone,
					'name': $scope.topInfos[0].value,
					'data': data
				}
			})
			.success(function() {

			})
			.error(function() {

			});
	}

	$scope.trustUrl = function(url) {
		/*		if(url == 'default') {
					return $sce.trustAsResourceUrl($scope.host + '/images/music.mp3');
				} else {*/
		return $sce.trustAsResourceUrl('./uploads/' + $scope.phone + '/' + url);
		/*		}*/
	}
}]);