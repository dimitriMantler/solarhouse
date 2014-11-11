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
			var checked = $('input[name=radio]:checked').val();
			var newvalue = $('input[name=valueToChange]').val();
			sendData(email,password, checked, newvalue);
		}
		return false; //early version was return status; but now its not necessary anymore 
	});
	
	//Function which will change the input type of valueToChange according to the used radio buttons
	$("input[name=radio]:radio").change(function(){
		changeInputType();
	});
});

/**
 * This function will send the change data to the server
 * @param email
 * @param password
 * @param checked
 * @param newvalue
 */
function sendData(email, password, checked, newvalue){
	DEBUG.print("change:sendData->param[email:"+email+", password:"+password+", checked:" +
			""+checked+", newvalue:"+newvalue+"]");	
	if(email == "" || password == "" || newvalue == ""){
		DEBUG.print("change:sendData->Failure: email, pasword or newvalue are empty!");
		return;
	}
	Connector.changeUser(email, password, checked, newvalue, Utility.serverURL,
	function(data){
		//Success handler from the RecieveData Request
		DEBUG.print("change:sendData->Success");
		//check if data has not the failure flag set
		var msg = Connector.checkRecievedData(data);
		if(msg != "OK"){
			//Data has failure flag set!
			DEBUG.print("change:sendData->Success->msg not OK: "+msg);
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
		DEBUG.print("change:sendData->Error:");
		DEBUG.print(error);
		showMessage("this.hide");
		showError(Connector.translateErrorCode(error));

		//FIXME probeweise
		
	});//*/
}

/**
 * This function will change the input type depending on the checked radio button.
 */
function changeInputType(){	
	if($('input[name=radio]:checked').val() == "password"){
		DEBUG.print("radio:change:type=password");
		$('[name=valueToChange]').each(function() {
			   $("<input type='password' />").attr({ name: this.name, value: this.value }).insertBefore(this);
		}).remove();
	}
	else{
		DEBUG.print("radio:change:type=text");
		$('[name=valueToChange]').each(function() {
			   $("<input type='text' />").attr({ name: this.name, value: this.value }).insertBefore(this);
		}).remove();		
	}
	 $('[name=valueToChange]')
	 .val("")
	 .hide(500)
	 .focus()
	 .show(500);
}
