/**
 * @author Marvin Lutz
 * @class DEBUG
 */

var DEBUG = {
	//class variablen
	visible : true,
	
	//functions
	turnOff : function(){
		this.visible = false;
	},
	
	turnOn : function(){
		this.visible = true;
	},
	
	toggle : function(){
		this.visible = !this.visible;
	},
	
	print : function(msg){
		if(this.visible) console.log(msg);
	}	
};
