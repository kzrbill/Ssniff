function ManaulTaskSniffResult(_message, _type){
	this.type = "Manual task";
	this.message = _message;
}

function AutomatedTaskSniffResult(_message, _level){
	this.type = "Automated task";
	this.message = _message;
}

module.exports.ManaulTaskSniffResult = ManaulTaskSniffResult;
module.exports.AutomatedTaskSniffResult = AutomatedTaskSniffResult;