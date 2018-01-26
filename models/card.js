var mongoose = require('mongoose');
var CardSchema = mongoose.Schema({
	phone: {
		type: String,
		index: {
			unique: true
		}
	},
	name: String,
	createdAt: {type: Date, default: Date.now},
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

var Card = mongoose.model('Card', CardSchema);

Card.updateCard = function(data, callback) {
	var phone = data.phone;
	var query = {
		phone: phone
	};
	Card.findOne(query, function(err, card) {
		if(err) {
			return next(err);
		} else {
			console.log(card);
			card.phone = phone;
			card.topInfos = data.topInfos;
			card.topFiles = data.topFiles;
			card.personInfos = data.personInfos;
			card.companyInfos = data.companyInfos;
			card.otherInfos = data.otherInfos;
			card.botFiles = data.botFiles;
			card.otherFiles = data.otherFiles;
			card.textModule = data.textModule;
			card.bgColor = data.bgColor;
			card.menuColor = data.menuColor;
			card.topHeight = data.topHeight;
			card.topImgHeight = data.topImgHeight;
			card.topModule = data.topModule;
			
			card.save(callback);
		}
	});
}




module.exports = Card;