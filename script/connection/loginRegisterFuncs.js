var showMessage = function(message){
	var field = $('.form').find('div.message');
	if(message=="this.hide"){
		field
		.html("")
		.hide(500);
	}
	else{
		field
		.hide()
		.html(message)
		.show(500);
	}	
};

var showError = function(message){
	var field = $('.form').find('div.result');
	if(message=="this.hide"){
		field
		.html("")
		.hide(500);
	}
	else{
		field
		.hide()
		.html(message)
		.show(500);
	}
};