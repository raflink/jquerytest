exports.redirection = function(req, res){
	console.log('save in database');
	if(req.body.email == '')
		resp = 'Email adress field cannot be empty.';
	else{
		resp = 'Your settings have been changed';
	}
	res.end(JSON.stringify(resp));
};