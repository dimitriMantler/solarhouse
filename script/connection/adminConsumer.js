/**
 * @author Marvin Lutz
 * @class ScriptMarvin
 */

$(document).ready(function(){	
	//Look for a class="form" and create a dynamic form object there
	var form = $('.form')
	.wrap("<form id=\"form\"/>")
	.parents("form");	
	//--------------------------------------------------------------------------------------
	var initData = form.serializeArray();
	//Create the error fields before each input
	$.each(initData,function(){		
		$("[name="+this.name+"]").attr("id",this.name); //add id to all forms for easier access
		
		//$("#"+this.name).parent().before("<div id=\""+this.name+"err\" class=\"message\"></div>"); //above
		$("#"+this.name).after("<div id=\""+this.name+"err\" class=\"messageBeside\"></div>"); //right beside
		
		$("#"+this.name+"err").hide(0);
		
		
	});
	//add numeric input handler
	$("#lvl").ForceNumericOnly();
	$("#price").ForceNumericOnly();
	$("#watt").ForceNumericOnly();
	$("#x").ForceNumericOnly();
	$("#y").ForceNumericOnly();
	$("#pnValue").ForceNumericOnly();
	
	
	
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
				showErr(this.name,"Feld muss ausgefüllt sein!");
				status = false;
				return;
			}
			else{
				field.removeClass('highlight');
				showErr(this.name,"this.hide");
			}	
			
			//check email address
			if(this.name == 'email'){
				if(Utility.checkEmailAddress(this.value)){
					field
					.addClass('highlight')
					.focus();					
					showErr(this.name,"Ungültige E-Mail Adresse!");
					status = false;		
				}
				else{
					field.removeClass('highlight');
					showErr(this.name,"this.hide");
				}
			}
			
			//check number fields >0
			if(this.name == "lvl" || this.name == "price" || this.name == "watt" || this.name == "pnValue"){
				var num = $("#"+this.name).val();
				if(isNaN(num)){
					field
					.addClass('highlight')
					.focus();					
					showErr(this.name,"Feld darf nur Zahlen enthalten!");
					status = false;					
				}
				else{					
					if(num <= 0){
						field
						.addClass('highlight')
						.focus();					
						showErr(this.name,"Feld muss positive und NICHT 0 sein.");
						status = false;					
					}
					else{
						field.removeClass('highlight');
						showErr(this.name,"this.hide");
					}
				}
				
			}
			
			if(this.name == "x" || this.name == "y"){
				var num = $("#"+this.name).val();
				if(isNaN(num)){
					field
					.addClass('highlight')
					.focus();					
					showErr(this.name,"Feld darf nur Zahlen enthalten!");
					status = false;					
				}
				else{					
					if(num < 0){
						field
						.addClass('highlight')
						.focus();					
						showErr(this.name,"Feld muss positive sein.");
						status = false;					
					}
					else{
						field.removeClass('highlight');
						showErr(this.name,"this.hide");
					}
				}				
			}
		});		
		if(status){
			//if everything was correct, send data to server
			sendData();
		}
		showMessage("this.hide");
		return false; //early version was return status; but now its not necessary anymore
	});
});

/**
 * This function will send the login and createConsumer data to the server
 */
function sendData(){
	//getVars
	var lvl, name, picpath, price, tooltip, ctype, watt, x, y, pnType, pnValue, email, password;
	lvl = $("#lvl").val();
	name = $("#name").val();
	picpath = $("#picpath").val();
	price = $("#price").val();
	tooltip = $("#tooltip").val();
	ctype = $("#ctype").val();
	watt = $("#watt").val();
	x = $("#x").val();
	y = $("#y").val();
	pnType = $("#pnType").val();
	pnValue = $("#pnValue").val();
	email = $("#email").val();
	password = $("#password").val();
	
	var jsonConsumer = {
			"command":"admin.createConsumer",
			"level":lvl,
			"name":name,
			"picPath":picpath,
			"price":price,
			"tooltip":tooltip,
			"ctype":ctype,
			"watt":watt,
			"x":x,
			"y":y,
			"pnType":pnType,
			"pnValue":pnValue
	};
	var jsonAdmin={
			"command":"admin.login",
			"email":email,
			"password":password
	};
	
	DEBUG.print("Admin:");
	DEBUG.print(jsonAdmin);
	DEBUG.print("Consumer:");
	DEBUG.print(jsonConsumer);

	//Connect to server
	Connector.adminLogin(jsonAdmin,Utility.serverURL, //TODO test
	function(data){
		//Success handler from the RecieveData Request
		DEBUG.print("adminConsumer:sendData(login)->Success");
		//check if data has not the failure flag set
		var msg = Connector.checkRecievedData(data);
		if(msg != "OK"){
			//Data has failure flag set!
			DEBUG.print("adminConsumer:sendData(login)->Success->msg not OK: "+msg);
			showMessage(msg);
			return;
		}
		//Data was OK, so createConsumer
		Connector.adminLogin(jsonConsumer,Utility.serverURL,
		function(data){
			//Success handler from the RecieveData Request
			DEBUG.print("adminConsumer:sendData(createConsumer)->Success");
			//check if data has not the failure flag set
			var msg = Connector.checkRecievedData(data);
			if(msg != "OK"){
				//Data has failure flag set!
				DEBUG.print("adminConsumer:sendData(createConsumer)->Success->msg not OK: "+msg);
				showMessage(msg);
				return;
			}			
			showMessage(data.message);
			$.each($('#form').serializeArray(),function(){
				if(this.name == "email" || this.name == "password") return;
				$("#"+this.name).val("");
			});			
		},function(error){
			//Error handler from the RecieveData Request
			DEBUG.print("adminConsumer(createConsumer):sendData->Error");
			DEBUG.print(error);
			showMessage(Connector.translateErrorCode(error));
		});		
	},function(error){
		//Error handler from the RecieveData Request
		DEBUG.print("adminConsumer(login):sendData->Error");
		DEBUG.print(error);
		showMessage(Connector.translateErrorCode(error));		
	});
}

/**
 * This function show and Error message besides the input fields
 * @param id Of the input
 * @param msg Which will be deisplayed in the Error box.
 */
function showErr(id, msg){
	if(msg=="this.hide") $("#"+id+"err").hide(500).html("");
	else $("#"+id+"err").show(500).html(msg);
}

