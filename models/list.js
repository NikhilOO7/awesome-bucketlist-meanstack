// Require mongoose package
const mongoose = require('mongoose');

// Define Bucketlist Schema with title, description and category.

const BucketlistSchema = mongoose.Schema({
	title : {
		type : String,
		required : true
	},
	description : String,
	category : {
		type : String,
		required : true,
		enum : ['High', 'Medium', 'Low']
	}
});

const BucketList = module.exports = mongoose.model('BucketList', BucketlistSchema);


// Apart from the schema , we can also host database queries inside our BucketList model and export them as methods

// BucketList.find() returns all the lists
module.exports.getAllLists = ( callback ) => {
	BucketList.find( callback );
}


// newList.save() is used to insert the document in mongoDB
module.exports.addList = (newList, callback) => {
	newList.save( callback );
}


// Here we need to pass an id parameter to BucketList.remove
module.exports.deleteListById = (id, callback) => {
	let query = {_id : id};
	BucketList.remove(query, callback);
}