/**
 * A Utility Class, which contains many useful Functions.
 * 
 * @class Utility
 */
var Utility = {
		// vars
		serverURL : "http://localhost:8080/ProjectHyperion",		
		// funcs
		
		/** This Function checks an email address.
		 * 
		 * @author Marvin Lutz @method checkEmailAdress @param {String} address The
		 * email address which need to be checked. @return {Boolean} Returns true on
		 * valid email address.
		 */
		checkEmailAddress : function(address){
			var regex = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
			if(!regex.test(address)) return true;
			return false;
		}
};