const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer');
const fs = require("fs");
const multer = require('multer');
const storage = multer.diskStorage({
	destination: function(req, file, cb) {
		const path = './public/uploads/' + req.body.phone;
		console.log(path);
		if(!fs.existsSync(path)) {
			fs.mkdirSync(path);
		}
		cb(null, path); // 保存的路径，备注：需要自己创建
	},
	filename: function(req, file, cb) {
		cb(null, file.originalname);
	}
});
const upload = multer({
	storage: storage
})

/*router.get('/', function(req, res, next) {
	Customer.getCustomers(function(err, Customers) {
		if(err) {
			next(err);
		} else {
			res.json(Customers);
		}
	});
});*/

router.post('/', function(req, res, next) {
	// Article Object
	var newCustomer = new Customer({
		phone: req.body.phone,
		topInfos: req.body.topInfos,
		topFiles: req.body.topFiles,
		personInfos: req.body.personInfos,
		companyInfos: req.body.companyInfos,
		otherInfos: req.body.otherInfos,
		botFiles: req.body.botFiles,
		otherFiles: req.body.otherFiles,
		textModule: req.body.textModule,
		bgColor: req.body.bgColor,
		menuColor: req.body.menuColor,
		topHeight: req.body.topHeight,
		topImgHeight: req.body.topImgHeight,
		topModule: req.body.topModule,
	});
	// Create Article
	Customer.createCustomer(newCustomer, function(err, customer) {
		if(err) {
			next(err);
		} else {
			res.send("创建成功")
		}
	});
});

router.put('/', function(req, res, next) {
	var data = req.body;
	// Create Article
	Customer.updateCustomer(data, function(err, article) {
		if(err) {
			next(err);
		} else {
			res.send("保存成功");
		}
	});
});

router.get('/:phone', function(req, res, next) {
	Customer.getCustomerByPhone(req.params.phone, function(err, Customer) {
		if(err) {
			next(err);
		} else if(Customer.length != 0) {
			res.json(Customer);
		} else {
			res.send("不存在该用户");
		}
	});
});

router.delete('/:phone', function(req, res, next) {
	Customer.removeCustomer(req.params.phone, function(err) {
		if(err) {
			next.log(err);
		} else {
			res.send("成功");
		}
	});
});

router.delete('/file', function(req, res, next) {
	var phone = req.query.phone;
	var fileName = req.query.fileName;
	if(phone != null) {
		try {
			path = "./public/uploads/" + phone + "/" + fileName;
			fs.unlinkSync(path);
			res.send({
				status: "success",
				message: "成功删除"
			})
		} catch(err) {
			res.send({
				status: 'error',
				message: "删除失败"
			});
		}
	} else {
		res.send({
			status: 'error',
			message: "请输入电话号码"
		});
	}
});

router.post('/file', upload.array("uploadFiles", 12), function(req, res, next) {
	res.send({
		message: 'File uploaded successfully',
		filename: req.files[0].originalname
	});
});

router.get('/file/:phone', function(req, res, next) {
	var phone = req.params.phone;
	if(phone != "undefined") {
		var path = "./public/uploads/" + phone;
		if(!fs.existsSync(path)) {
			res.send({
				status: "0",
				data: '没有文件',
			});
		} else {
			var files = fs.readdirSync(path);
			res.send({
				status: "1",
				data: files
			});
		}
	} else {
		res.send({
			status: "0",
			data: "请输入电话号码",
		});
	}
});

router.post('/create', function(req, res, next) {

	var name = req.body.name;
	var phone = req.body.phone;
	var data = req.body.data;
	var head = "<html>" +
		"<head>" +
		"<meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\">" +
		"<meta name=\"viewport\", initial-scale=1.0, maximum-scale=1.0, user-scalable=no\">" +
		"<meta name=\"apple-mobile-web-app-capable\" content=\"yes\">" +
		"<meta name=\"apple-mobile-web-app-status-bar-style\" content=\"black\">" +
		"<title>" + name + "的微名片</title>" +
		"<link href=\"/stylesheets/bootstrap.min.css\" rel=\"stylesheet\">" +
		"<link href=\"/stylesheets/style.css\" rel=\"stylesheet\">" +
		"<link href=\"/stylesheets/main.css\" rel=\"stylesheet\">" +
		"</head>" +
		"<body>" +
		"<div col-md-4 col-xs-0>" +
		"</div>" + 
			"<div id=\"qrcode\" style=\"width:100px; height:100px; margin-top:15px;\">" +
			"</div>" + 
		"<div>";
	var tail = 
		"</div>" +
		"<div col-md-4 col-xs-0>" +
		"/div>" +
		"</body>" +
		"</html>";
	var out = head + data + tail;
	var path = "./public/uploads/" + phone + "/index.html";
	var buffer = new Buffer(out);
	if(fs.existsSync(path)) {
		fs.unlinkSync(path);
	}
	fs.open(path, 'w+', function(err, fd) {
		if(err) {
			next(error);
		} else {
			fs.write(fd, buffer, 0, buffer.length, null, function(err) {
				if(err) {
					res.send({
						status: "error"
					});
				} else {
					fs.close(fd, function() {
						res.send({
							status: "success"
						});
						console.log('file written');
					});
				}
			});
		};
	});
});

module.exports = router;