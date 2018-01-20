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
	otherFiles: String
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
	var phone = data.phone;
	var topInfos = data.topInfos;
	var topFiles = data.topFiles;
	var personInfos = data.personInfos;
	var companyInfos = data.companyInfos;
	var otherInfos = data.otherInfos;
	var botFiles = data.botFiles;
	var otherFiles = data.otherFiles;

	var query = {
		phone: phone
	};

	Customer.find(query, function(err, Customer) {
		if(!Customer) {
			return next(new Error('Could not load Customer'));
		} else {
			// Update
			
			Customer[0].phone = phone;
			Customer[0].topInfos = topInfos;
			Customer[0].topFiles = topFiles;
			Customer[0].personInfos = personInfos;
			Customer[0].companyInfos = companyInfos;
			Customer[0].otherInfos = otherInfos;
			Customer[0].botFiles = botFiles;
			Customer[0].otherFiles = otherFiles;
			Customer[0].save(callback);
		}
	});
}

Customer.removeCustomer = function(id, callback) {
	Customer.find({
		_id: id
	}).remove(callback);
}

module.exports = Customer;