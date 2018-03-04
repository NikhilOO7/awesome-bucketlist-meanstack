// Require he express package and use the xpress.router()

const express = require('express');
const router = express.Router();
const bucketlist = require('../models/list');

// GET HTTP method to /bucketlist
router.get('/', (req, res) => {
	bucketlist.getAllLists( (err, lists) => {
		if( err ) {
			res.json({ success : false, message : 'Failed to load all lists' });
		}
		else {
			res.write(JSON.stringify({ success : true, lists : lists }, null, 2));
			res.end();
		}
	});
});


// POST HTTP method to /bucketlist
router.post('/', (req, res, next) => {
	let newList = new bucketlist({
		title : req.body.title,
		description : req.body.description,
		category : req.body.category
	});
	bucketlist.addList(newList, (err, list) => {
		if( err ) {
			res.json({ success : false, message : 'Failed to create new list. Error : ', err });
		}
		else {
			res.json({ success : true, message : 'Added successfully' });
		}
	});
});


// DELETE HTTP method to /bucketlist. Here we will pass in params which is the object id.
router.delete('/:id', (req, res, next) => {
	//  Access the parameter which is the id of the item to be deleted 
	let id = req.params.id;
	// Call the model method deleteListById
	bucketlist.deleteListById(id, (err, list) => {
		if( err ) {
			res.json({ success : false, message : 'Failed to delete the list' });
		}
		else if ( list ) {
			res.json({ success : true, message : 'Deleted successfully' });
		}
		else {
			res.json({ success : false });
		}
	});
});


module.exports = router;