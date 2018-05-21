const config = require('../config.js');
module.exports = ( req ) => {
	let firstUser;
	let user_id = req.cookies.id;
	let userName = req.cookies.userName;
	let acc = req.query.acc;
	if(req.headers["origin"] == "http://localhost:8000"){
		user_id = config.defaultId;
	}else{
		user_id = user_id;
	}
	if(req.headers["origin"] == "http://localhost:8000"){
		acc = config.defaultAcc;
		firstUser = acc;
	}else{
		if(acc && !userName){
			firstUser = acc;
		}else if(userName && !acc){
			firstUser = userName;
		}else if(acc && userName){
			firstUser = acc;
		}else if(!acc && !userName){
			// res.status(400).send("Bad Request");
			// acc = "nanfangxinwujin";
			
		}
	}
	let result = { user_id, userName, acc, firstUser };
	console.log(result);
	return result;
}