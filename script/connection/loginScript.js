/**
 * @author Marvin Lutz
 * @class ScriptMarvin
 */

//Gamesession Object
//var GS = null;

//var GS = null;

$(document).ready(function(){
	$("#cr-stage").hide(0); //hide cnavas
	
	//Look for a class="form" and create a dynamic form object there
	var form = $('.form')
	.wrap("<form />")
	.parents("form");		
	//----------------------------------------------------------------------------------------------check the form data
	$("#submit").click(function(){
		DEBUG.print("$(#sumbit).click : form data=");
		var data = form.serializeArray();
		DEBUG.print(data);
		var status = true;
		
		//for each element in data, aka the form
		$.each(data,function(){
			//search the field in this form
			var field = form.find('*:input[name="'+this.name+'"]');			
			//check if value is set
			if(typeof(this.value) == "undefined" || !this.value.trim()){
				//highlight this field when empty
				field.addClass('highlight')
				.focus();
				showMessage("Alle Felder müssen gesetzt sein!");	
				showError("this.hide");
				status = false;
			}
			else{
				field.removeClass('highlight');
			}	
			
			//check email address
			if(this.name == 'email'){
				if(Utility.checkEmailAddress(this.value)){
					field
					.addClass('highlight')
					.focus();					
					showMessage("Ungültige E-Mail Adresse!");
					showError("this.hide");
					status = false;					
				}
				else{
					field.removeClass('highlight');
				}
			}			
		});		
		if(status){
			//if everything was correct, send data to server
			var email = $('input[name=email]').val();
			var password = $('input[name=password]').val();
			sendData(email,password);
		}
		return false; //early version was return status; but now its not necessary anymore
	});
});

/**
 * This function will send the login data to the server
 * @param email
 * @param password
 */
function sendData(email, password){
	DEBUG.print("login:sendData->param[email:"+email+", password:"+password+"]");	
	if(email == "" || password == ""){
		DEBUG.print("sendData->Failure: email or pasword are empty!");
		return;
	}
	//Connect to server
	GS = null;
	Connector.loginUser(email,password,Utility.serverURL, 
	function(data){
		//Success handler from the RecieveData Request
		DEBUG.print("login:sendData->Success");
		//check if data has not the failure flag set
		var msg = Connector.checkRecievedData(data);
		if(msg != "OK"){
			//Data has failure flag set!
			DEBUG.print("login:sendData->Success->msg not OK: "+msg);
			showMessage("this.hide");
			showError(msg);
			return;
		}
		//Data was OK
		GS = data;
		showMessage("this.hide");
		showError("Das Spiel wird geladen...");
		DEBUG.print(data);
		$('#form').each(function(){
			  this.reset();
		});		
		window.setTimeout(function(){
			deleteCenter();
		}, 2000);//TODO change time?		
	},function(error){
		//Error handler from the RecieveData Request
		DEBUG.print("login:sendData->Error");
		DEBUG.print(error);
		showMessage("this.hide");
		showError(Connector.translateErrorCode(error));
	});
}

/**
 * This function will call the game starting function and remove all unnecessary divs
 */
function deleteCenter(){
	if(GS==null){ 
		DEBUG.print("logn:deleteCenter -> Gamesession == null!");
		return;
	}
	var div = $(".center");
	$("<p />").attr({ id: "gameP"})
	.insertBefore(div)
	.text("Still loading...");
	div.remove();
	window.setTimeout(function(){
		$("#gameP").remove();
		startCrafty();
	}, 1000);	//TODO change time?
}

/**
 * This function will start a Crafty.js demo Pong game.
 */
function startCrafty(){
	DEBUG.print("Gamesession Object:"); //TODO demo purpose
	DEBUG.print(GS);	
	
	$("#cr-stage").show(0);
	loadGame();
}