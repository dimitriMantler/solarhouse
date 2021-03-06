/**
 * @author Marvin Lutz
 * @class ScriptMarvin
 */

$(document).ready(function(){
	//Look for a class="form" and create a dynamic form object there
	var form = $('.form')
	.wrap("<form id=\"form\"/>")
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
				showMessage("Alle Felder m�ssen gesetzt sein!");	
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
					showMessage("Ung�ltige E-Mail Adresse!");
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
			var playername = $('input[name=playername]').val();
			sendData(email,password, playername);
		}
		return false; //early version was return status; but now its not necessary anymore
	});
});

/**
 * This function will send the register data to the server
 * @param email
 * @param password
 * @param playername
 */
function sendData(email, password, playername){
	DEBUG.print("register:sendData->param[email:"+email+", password:"+password+", playername:"+playername+"]");	
	if(email == "" || password == "" || playername == ""){
		DEBUG.print("register:sendData->Failure: email, pasword or playername are empty!");
		return;
	}
	//Connect to server
	Connector.createUser(email,password,playername,Utility.serverURL, 
	function(data){
		//Success handler from the RecieveData Request
		DEBUG.print("register:sendData->Success");
		//check if data has not the failure flag set
		var msg = Connector.checkRecievedData(data);
		if(msg != "OK"){
			//Data has failure flag set!
			DEBUG.print("register:sendData->Success->msg not OK: "+msg);
			showMessage("this.hide");
			showError(msg);
			return;
		}
		//Data was OK
		showMessage(data.message);
		showError("Sie werden in 2 Sekunden weitergeleitet...[NYI]");
		DEBUG.print(data);
		$('#form').each(function(){
			  this.reset();
		});
		window.setTimeout(function(){
			//FIXME For demo purposes disabled
			//window.location.href = "./index.html";
		}, 2000);
	},function(error){
		//Error handler from the RecieveData Request
		DEBUG.print("register:sendData->Error:");
		DEBUG.print(error);
		showMessage("this.hide");
		showError(Connector.translateErrorCode(error));
	});
}
