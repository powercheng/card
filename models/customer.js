var mongoose = require('mongoose');

var customerSchema = mongoose.Schema({
	phone: {
		type: String,
		index: {
			unique: true
		}
	},
	topInfos: String,
	topFiles: String,
	personInfos: String,
	companyInfos: String,
	otherInfos: String,
	botFiles: String,
	otherFiles: String,
	textModule: String,
	bgColor: String,
	menuColor: String,
	topHeight: String,
	topImgHeight: String,
	topModule: String,
});

var Customer = mongoose.model('Customer', customerSchema);

// Get All Customers
Customer.getCustomers = function(callback) {
	Customer.find(callback);
}

// get customer by phone
Customer.getCustomerByPhone = function(phone, callback) {
	var query = {
		phone: phone
	};
	Customer.find(query, callback);
}

// Add an Customer
Customer.createCustomer = function(newCustomer, callback) {
	newCustomer.save(callback);
}

// Update Customer
Customer.updateCustomer = function(data, callback) {
	console.log(data.phone);
	var phone = data.phone;
	var query = {
		phone: phone
	};
	Customer.find(query, function(err, Customer) {
		if(err) {
			return next(new Error('Could not load Customer'));
		} else if(Customer.length == 0) {
			// Update
			console.log(1);
		} else {
			Customer[0].phone = phone;
			Customer[0].topInfos = data.topInfos;
			Customer[0].topFiles = data.topFiles;
			Customer[0].personInfos = data.personInfos;
			Customer[0].companyInfos = data.companyInfos;
			Customer[0].otherInfos = data.otherInfos;
			Customer[0].botFiles = data.botFiles;
			Customer[0].otherFiles = data.otherFiles;
			Customer[0].textModule = data.textModule;
			Customer[0].bgColor = data.bgColor;
			Customer[0].menuColor = data.menuColor;
			Customer[0].topHeight = data.topHeight;
			Customer[0].topImgHeight = data.topImgHeight;
			Customer[0].topModule = data.topModule;
			
			Customer[0].save(callback);
		}
	});
}

Customer.removeCustomer = function(phone, callback) {
	var query = {
		phone: phone
	};
	
	Customer.find(query, function(err, Customer) {
		if (err) {
			return next(new Error('Could not load Customer'));
		} else if(Customer.length == 0) {
			console.log("no customer found");
		} else {
			Customer[0].remove(callback);
		}
	});
}

module.exports = Customer;