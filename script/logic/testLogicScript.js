/* This is a testscript which minimal simulate the GUI 
*/

var myT=new myTimer();
var dev= new Array();
dev[0]=new Array();
dev[1]=new Array();
dev[2]=new Array();

$(document).ready(function(){
	
	//Button1
	$("#b1").click(function(){
		consumer.turnOn("bed");
	});
	
	//Button2
	$("#b2").click(function(){
		consumer.turnOff("bed");
	});
	//Button3
	$("#b3").click(function(){
		consumer.turnOn("Coffeemachine");
	});
	//Button4
	$("#b4").click(function(){
		consumer.turnOff("Coffeemachine");
	});
	//Button5
	$("#b5").click(function(){
		clearTimeout(daytime.daytimeTimer);
	});
	
	//Button7
	$("#b7").click(function(){
		storage.setButtonStatus(true);
	});
	//Button7
	$("#b8").click(function(){
		storage.setButtonStatus(false);
	});
	
});

function getSD()
{
  return dev();
}
