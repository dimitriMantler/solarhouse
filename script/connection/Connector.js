/**
This class manages the connection to the database.
It can send and recieve with GET and POST.
For data transfer a JSON object will be used.
@author Marvin Lutz
@class Connector
**/
var Connector = {		
		//vars
		userURL : "/user",
		shopURL : "/shop",
		gamesessionURL : "/gamesession",	
		adminURL : "/admin",
			
		//functions
		/**
		* This function will send a POST request to a server. Either you will get a JSON object 
		* or the error callback function will trigger. The JSON Object will be handled in the 
		* seccessfull callback function like this:
		* function(data) {
		* 	//data would be the json object.
		* 	var recievedMsg = Connector.checkDataRecieved(data); //should ALWAYS be done to check failures
		* 	if(recievedMsg=="OK") //do something with your JSON object
		* 	else //print out recievedMsg, there will be additional infos in it
		* }
		* 
		* @method post
		* @param {String} url The url to the server/file.
		* @param {JSON} data Extra data which will be send to the Server, like commands for the server.
		* @param {function} cbSucces This functon will be called if: 200 OK AND a proper JSON object 
		* with no SYNTAX error was returned.
		* @param {function} cbError This function will be called if there were an error while requesting 
		* something.
		*/
		post : function(url, data, cbSucces, cbError){
			DEBUG.print("Connector.post#start");
			$.postJSON(url, data, cbSucces, cbError);
			DEBUG.print("Connector.post#done");
		},
		
		/**
		* This function will send a GET request to a server. Either you will get a JSON object 
		* or the error callback function will trigger. The JSON Object will be handled in the 
		* seccessfull callback function like this:
		* function(data) {
		* 	//data would be the json object.
		* 	var recievedMsg = Connector.checkDataRecieved(data); //should ALWAYS be done to check failures
		* 	if(recievedMsg=="OK") //do something with your JSON object
		* 	else //print out recievedMsg, there will be additional infos in it
		* }
		* 
		* @deprecated
		* @method get
		* @param {String} url The url to the server/file.
		* @param {JSON} data Extra data which will be send to the Server, like commands for the server.
		* @param {function} cbSucces This functon will be called if: 200 OK AND a proper JSON object 
		* with no SYNTAX error was returned.
		* @param {function} cbError This function will be called if there were an error while requesting 
		* something.
		*/
		get : function(url, data, cbSucces, cbError){
			DEBUG.print("Connector.get#start");
			$.postGET(url, data, cbSucces, cbError);
			DEBUG.print("Connector.get#done");
		},
		
		/**
		 * This function will check your JSON object which you should have recieved from the POST and GET functions.
		 * It will check if there are any failure flags set. If everything is ok the string contains "OK", otherwise
		 * it will contain a message from the server with the problem.
		 * 
		 * THIS FUNCTION SHOULD ALWAYS BE INCLUDED IN YOUR SUCCESSFULL CALLBACK ROUTINE!
		 * 
		 * @method checkRecievedData
		 * @param {JSON} data The recieved JSON object.
		 * @returns {String} A formattet string which could contain "OK" if everything was correct 
		 * OR a message from the server if something failed.
		 */
		checkRecievedData : function(data){
			var ret = "OK";
			if(data.failure != undefined) ret = data.failure;
			return ret;
		},

		/**
		 * This functin will translate the http error code into a readable message for the user.
		 * 
		 * @method translateErrorCode
		 * @param {http Object} error The error object recieved from a error callback function 
		 * @returns {String} A readable message which discribes the error.
		 */
		translateErrorCode : function(error){
			if(error.status == undefined){
				return "Error war nicht definiert!";
			}
			var msg = "["+error.status+"]";	
			switch (""+error.status) {
			  //Client Fehler 4xx
			  case "400"://400 Bad Request
				  msg += "Bad Request - The request cannot be fulfilled due to bad syntax";
				  break;
			  case "401"://401 Unauthorized
				  msg += "Unauthorized - The request was a legal request, but the server is refusing" +
				  		" to respond to it. For use when authentication is possible but has failed or not yet been provided";
				  break;
			  case "402"://402 Payment
				  msg += "Payment Required - Reserved for future use";
				  break;
			  case "403"://403 Forbidden
				  msg += "Forbidden - The request was a legal request, but the server is refusing to respond to it";
				  break;
			  case "404"://404 Not Found
				  msg += "Not Found - The requested page could not be found but may be available again in the future";
				  break;
			  case "405"://405 Method Not Allowed
				  msg += "Method Not Allowed - A request was made of a page using a request method not supported by that page";
				  break;
			  case "406"://406 Not Acceptable
				  msg += "Not Acceptable - The server can only generate a response that is not accepted by the client";
				  break;
			  case "407"://407 Proxy Authentication Required
				  msg += "Proxy Authentication Required - The client must first authenticate itself with the proxy";
				  break;
			  case "408"://408 Request Timeout
				  msg += "Request Timeout - The server timed out waiting for the request";
				  break;
			  case "409"://409 Conflict
				  msg += "Conflict - The request could not be completed because of a conflict in the request";
				  break;
			  case "410"://410 Gone
				  msg += "Gone	The requested page is no longer available";
				  break;
			  case "411"://411 Length Required
				  msg += "Length Required - The \"Content-Length\" is not defined. The server will not accept the request without it ";
				  break;
			  case "412"://412 Precondition Failed
				  msg += "Precondition Failed - The precondition given in the request evaluated to false by the server";
				  break;
			  case "413"://413 Request Entity Too Large
				  msg += "Request Entity Too Large - The server will not accept the request, because the request entity is too large";
				  break;
			  case "414"://414 Request-URI Too Long
				  msg += "Request-URI Too Long - The server will not accept the request, because the URL is too long. Occurs when you convert" +
				  		" a POST request to a GET request with a long query information ";
				  break;
			  case "415"://415 Unsupported Media Type
				  msg += "Unsupported Media Type - The server will not accept the request, because the media type is not supported ";
				  break;
			  case "416"://416 Requested Range Not Satisfiable
				  msg += "Requested Range Not Satisfiable	The client has asked for a portion of the file, but the server cannot supply that portion";
				  break;
			  case "417"://417 Expectation Failed
				  msg += "Expectation Failed - The server cannot meet the requirements of the Expect request-header field";
				  break;
				  //Server Fehler 5xx
			  case "500"://500 Internal Server Error
				  msg += "Internal Server Error - A generic error message, given when no more specific message is suitable";
				  break;
			  case "501": //501 Not Implemented
				  msg += "Not Implemented - The server either does not recognize the request method, or it lacks the ability to fulfill the request";
				  break;
			  case "502": //502 Bad Gateway
				  msg += "Bad Gateway - The server was acting as a gateway or proxy and received an invalid response from the upstream server";
				  break;
			  case "503"://503 Service Unavailable
				  msg += "Service Unavailable - The server is currently unavailable (overloaded or down)";
				  break;
			  case "504"://504 Gateway Timeout
				  msg += "Gateway Timeout - The server was acting as a gateway or proxy and did not receive a timely response from the upstream server";
				  break;
			  case "511"://511 Network Authentication Required
				  msg += "Network Authentication Required - The client needs to authenticate to gain network access";
				  break;		  
			  default:
				  msg += "Kein relevanter Status Error wurde gefunden.";
			}
			return msg;
		},
		
		/****************************************************************************************************USER*REQUESTS
		 * User Protocol used:
		 * url : /user
		 * user.create :: email:String , password:String , playerName:String
		 * user.delete :: email:String , password:String
		 * user.login  :: email:String , password:String
		 * user.change :: email:String , password:String,  paramToChange:String[password,playerName], valueToChange:String
		 * 		=> user.change.password
		 * 		=> user.cange.playerName
		 */
		
		/**
		 * This function will send a HTTP Request to the Server as POST. It will contain a JSON Object.
		 * It is used to create a new user in the Database and will return specified JSON objects on success.
		 * 
		 * @method createUser
		 * @param {String} email The email address of the user. 
		 * @param {String} password The password of the user.
		 * @param {String} playerName The name of the player character.
		 * @param {URL/String} serverURL A String formatted as a URL like this: http://mywebsite.de/
		 * @param {function} cbSuccess A callback function which will be called on success.
		 * @param {function} cbError A callback function which will be called on error, like HTTP 404 error.
		 */
		createUser : function(email, password, playerName, serverURL, cbSuccess, cbError){
			var cmd = "user.create";
			var json = {
					"command":cmd,
					"email":email,
					"password":password,
					"playerName":playerName
			};	
			Connector.post(serverURL+Connector.userURL, json, cbSuccess, cbError);
		},
		
		/**
		 * This function will send a HTTP Request to the Server as POST. It will contain a JSON Object.
		 * It is used to delete a user from the Database and will return a specified JSON object an success.
		 * 
		 * @method deleteUser
		 * @param {String} email The email address of the user. 
		 * @param {String} password The password of the user.
		 * @param {URL/String} serverURL A String formatted as a URL like this: http://mywebsite.de/
		 * @param {function} cbSuccess A callback function which will be called on success.
		 * @param {function} cbError A callback function which will be called on error, like HTTP 404 error.
		 */
		deleteUser : function(email, password, serverURL, cbSuccess, cbError){
			var cmd = "user.delete";
			var json = {
					"command":cmd,
					"email":email,
					"password":password
			};	
			Connector.post(serverURL+Connector.userURL, json, cbSuccess, cbError);
		},
		
		/**
		 * This function will send a HTTP Request to the Server as POST. It will contain a JSON Object.
		 * It is used to change a user specific attribute from the Database and will return a specified JSON object an success.
		 * 
		 * @method changeUser
		 * @param {String} email The email address of the user. 
		 * @param {String} password The password of the user.
		 * @param {String} paramToChange Should contain: playerName or password.
		 * @param {String} valueToChange The new value of the changed attribute.
		 * @param {URL/String} serverURL A String formatted as a URL like this: http://mywebsite.de/
		 * @param {function} cbSuccess A callback function which will be called on success.
		 * @param {function} cbError A callback function which will be called on error, like HTTP 404 error.
		 */
		changeUser : function(email, password, paramToChange, valueToChange, serverURL, cbSuccess, cbError){
			var cmd = "user.change."+paramToChange;
			var json = {
					"command":cmd,
					"email":email,
					"password":password,
					"valueToChange":valueToChange
			};	
			Connector.post(serverURL+Connector.userURL, json, cbSuccess, cbError);
		},
		
		/**
		 * This function will send a HTTP Request to the Server as POST. It will contain a JSON Object.
		 * It is used to verify a user from the Database and will return a specified JSON object an success.
		 * 
		 * @method loginUser
		 * @param {String} email The email address of the user. 
		 * @param {String} password The password of the user.
		 * @param {URL/String} serverURL A String formatted as a URL like this: http://mywebsite.de/
		 * @param {function} cbSuccess A callback function which will be called on success.
		 * @param {function} cbError A callback function which will be called on error, like HTTP 404 erro.
		 */
		loginUser : function(email, password, serverURL, cbSuccess, cbError){
			var cmd = "user.login";
			var json = {
					"command":cmd,
					"email":email,
					"password":password
			};
			Connector.post(serverURL+Connector.userURL, json, cbSuccess, cbError);
		},
		
		/****************************************************************************************************SHOP*REQUESTS
		 * Shop Protocol used:
		 * url : /shop
		 * shop.getProducer :: email:String
		 * shop.getConsumer :: email:String
		 * shop.getStorage  :: email:String
		 */
		
		/**
		 * This function will send a HTTP Request to the Server as POST. It will contain a JSON Object.
		 * It is used to get all producer items which the user not own and will return specified JSON objects on success.
		 * 
		 * @method shopGetProducer
		 * @param {String} email The email address of the user. 
		 * @param {URL/String} serverURL A String formatted as a URL like this: http://mywebsite.de/
		 * @param {function} cbSuccess A callback function which will be called on success.
		 * @param {function} cbError A callback function which will be called on error, like HTTP 404 error.
		 */
		shopGetProducer : function(email, serverURL, cbSuccess, cbError){
			var cmd = "shop.getProducer";
			var json = {
					"command":cmd,
					"email":email
			};	
			Connector.post(serverURL+Connector.shopURL, json, cbSuccess, cbError);
		},
		
		/**
		 * This function will send a HTTP Request to the Server as POST. It will contain a JSON Object.
		 * It is used to get all consumer items which the user not own and will return specified JSON objects on success.
		 * 
		 * @method shopGetConsumer
		 * @param {String} email The email address of the user. 
		 * @param {URL/String} serverURL A String formatted as a URL like this: http://mywebsite.de/
		 * @param {function} cbSuccess A callback function which will be called on success.
		 * @param {function} cbError A callback function which will be called on error, like HTTP 404 error.
		 */
		shopGetConsumer : function(email, serverURL, cbSuccess, cbError){
			var cmd = "shop.getConsumer";
			var json = {
					"command":cmd,
					"email":email
			};	
			Connector.post(serverURL+Connector.shopURL, json, cbSuccess, cbError);
		},
		
		/**
		 * This function will send a HTTP Request to the Server as POST. It will contain a JSON Object.
		 * It is used to get all storage items which the user not own and will return specified JSON objects on success.
		 * 
		 * @method shopGetStorage
		 * @param {String} email The email address of the user. 
		 * @param {URL/String} serverURL A String formatted as a URL like this: http://mywebsite.de/
		 * @param {function} cbSuccess A callback function which will be called on success.
		 * @param {function} cbError A callback function which will be called on error, like HTTP 404 error.
		 */
		shopGetStorage : function(email, serverURL, cbSuccess, cbError){
			var cmd = "shop.getStorage";
			var json = {
					"command":cmd,
					"email":email
			};	
			Connector.post(serverURL+Connector.shopURL, json, cbSuccess, cbError);
		},
		
		/****************************************************************************************************Gamesession*REQUESTS
		 * Gamesession Protocol used:
		 * url : /gamesession
		 * gamesession.save :: gamesession:JSON
		 * gamesession.load :: email:String
		 */
		
		/**
		 * This function will send a HTTP Request to the Server as POST. It will contain a JSON Object.
		 * It is used to save the gamesession of the user and will return specified JSON objects on success.
		 * 
		 * @method gamesessionSave
		 * @param {JSON} gamesession The current gamesession.
		 * @param {URL/String} serverURL A String formatted as a URL like this: http://mywebsite.de/
		 * @param {function} cbSuccess A callback function which will be called on success.
		 * @param {function} cbError A callback function which will be called on error, like HTTP 404 error.
		 */
		gamesessionSave : function(gamesession, serverURL, cbSuccess, cbError){
			var cmd = "gamesession.save";	
			var json = {
					"command":cmd,
					"gamesession":gamesession
			};		
			Connector.post(serverURL+Connector.gamesessionURL, json, cbSuccess, cbError);
		},
		
		/**
		 * This function will send a HTTP Request to the Server as POST. It will contain a JSON Object.
		 * It is used to load the gamesession of the user and will return specified JSON objects on success.
		 * 
		 * @method gamesessionLoad
		 * @param {String} email he email address of the user.
		 * @param {URL/String} serverURL A String formatted as a URL like this: http://mywebsite.de/
		 * @param {function} cbSuccess A callback function which will be called on success.
		 * @param {function} cbError A callback function which will be called on error, like HTTP 404 error.
		 */
		gamesessionLoad : function(email, serverURL, cbSuccess, cbError){
			var cmd = "gamesession.save";
			var json = {
					"command":cmd,
					"email":email
			};	
			Connector.post(serverURL+Connector.gamesessionURL, json, cbSuccess, cbError);
		},
		
		/****************************************************************************************************Gamesession*REQUESTS
		 * Admin Controll Panel Protocol used:
		 * url : /admin
		 * admin.login :: data:JSON
		 * admin.createConsumer :: data:JSON
		 * admin.createStorage :: [NYI]
		 * admin.createProducer :: [NYI]
		 */
		
		/**
		 * @method adminLogin
		 * @param {JSON} data The login data as JSON object.
		 * @param {URL/String} serverURL A String formatted as a URL like this: http://mywebsite.de/
		 * @param {function} cbSuccess A callback function which will be called on success.
		 * @param {function} cbError A callback function which will be called on error, like HTTP 404 error.
		 */
		adminLogin : function(data, serverURL, cbSuccess, cbError){
			Connector.post(serverURL+Connector.adminURL, data, cbSuccess, cbError);
		},
		
		/**
		 * @method adminCreateConsumer
		 * @param {JSON} data The consumer data as JSON object.
		 * @param {URL/String} serverURL A String formatted as a URL like this: http://mywebsite.de/
		 * @param {function} cbSuccess A callback function which will be called on success.
		 * @param {function} cbError A callback function which will be called on error, like HTTP 404 error.
		 */
		adminCreateConsumer : function(data, serverURL, cbSuccess, cbError){
			Connector.post(serverURL+Connector.adminURL, data, cbSuccess, cbError);
		},
		
		//TODO testen
		//TODO controlle umwandeln zu control
		adminCreateProducer : function(data, serverURL, cbSuccess, cbError){
			Connector.post(serverURL+Connector.adminURL, data, cbSuccess, cbError);
		},

		//TODO testen
		adminCreateStorage : function(data, serverURL, cbSuccess, cbError){
			Connector.post(serverURL+Connector.adminURL, data, cbSuccess, cbError);
		},
};