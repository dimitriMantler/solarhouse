/*This is a file about the devices. 
 * with storage, producer, consumer and the electrical consumption.
 * The electrical consumption could be part of the consumer, but in a future version
 * a producer could have an electrical consumption, too.
 * 
 * The storage has a Button. if the button is true, the engergy comes into the accumulator.
 * If the button is false, the energy will be sold.
 * The energy also will be sold if the accumulator is full.
 * The method reduceStorageValue sets the Value to 0 if the code needs more then 99 ms and the accumulator 
 * goes under zero.
 * 
 * checkPossibleAfterDT and TurnOn are very similar functions, but you cannot connect them, because in js there are no threads
 * and it could be that there is a switch in the Daytime and someone starts an consumer
 * checkPossibleAfterDT checks the consumer chronological if they can run or not(not priority based for example in much consumption).
 * 
 * TurnOn sets the actual device standardly on true so it will be checked on the maximum hours per Daytime.  
 * */

var storage={
	stateOfCharge: 0.0,
	maxStateOfCharge:0,
	button:true,
	
	initStorage:function()
	{
		for(var i=0;i<storage.tempStorage().length;i++)
		{
		  storage.maxStateOfCharge+=storage.tempStorage()[i].capacity;
		}
	},
	
	addStorageValue:function(valueAdd)
	{
      if(((storage.stateOfCharge+valueAdd)<=storage.maxStateOfCharge) && storage.button == true)
	  {
      storage.stateOfCharge+=valueAdd;
      storage.button==true;
      return 0.0;
	  }
	  else if(((storage.stateOfCharge+valueAdd)>storage.maxStateOfCharge) && storage.button == true)
	  {
		var remain=(storage.stateOfCharge+valueAdd)-storage.maxStateOfCharge;// damit der Überschuss verkauft wird
		storage.stateOfCharge=storage.maxStateOfCharge;
		//console.log("Akku voll, kann nicht weiter geladen werden");
		storage.button==false;
		return remain;
	  }
	  return 0.0; //wenn button false	
	},
	
    reduceStorageValue:function(valueReduce)
    {
      storage.stateOfCharge-=valueReduce;
      if(storage.stateOfCharge<0)
      {
    	storage.stateOfCharge=0;
      }	
    },
    
    setButtonStatus:function(buttonValue)
    {
      if(storage.maxStateOfCharge==storage.stateOfCharge&& storage.buttonValue==true)
      {
        console.log("Schon voll, button nicht Änderbar");
      }
      else
      {
    	storage.button=buttonValue;	
      }
    },
    
	tempStorage : function() {
		var storage1 = {
			"istorage" : 2,
			"capacity" : 10,
			"level" : 1,
			"name" : "Akkumulator",
			"picpath" : "./servername",
			"position" : 2,
			"price" : 4000,
			"tooltip" : "Der einfachste Akku für Solaranlagen"
		};

		var storage2 = {
				"istorage" : 3,
				"capacity" : 10,
				"level" : 1,
				"name" : "Akkumulator",
				"picpath" : "./servername",
				"position" : 3,
				"price" : 4000,
				"tooltip" : "Der einfachste Akku für Solaranlagen"
			};
		var storage3 = {
				"istorage" : 1,
				"capacity" : 10,
				"level" : 1,
				"name" : "Akkumulator",
				"picpath" : "./servername",
				"position" : 1,
				"price" : 4000,
				"tooltip" : "Der einfachste Akku für Solaranlagen"
			};


		var arr = new Array();
		arr.push(storage1);
		arr.push(storage2);
		arr.push(storage3);
		return arr;

	}
};

var consumer = {
	extendedConsumer : null,
	tempKWh:0.0,
	tempKWhActive:0.0,
	tempKWhActiveDT:0.0,
	
	initConsumer : function() {
		consumer.extendedConsumer = consumer.tempConsumer();
		for ( var i = 0; i < consumer.extendedConsumer.length; i++) {
			consumer.extendedConsumer[i].runningHours = 0.0;
			consumer.extendedConsumer[i].active = false;
			consumer.extendedConsumer[i].timer = new myTimer();
		}
	},
	
	turnOn:function(deviceStart)
	{
		  var consumerT=consumer.getOneExtendedConsumer(deviceStart);
		  consumerT.active=true;  

		  for(var i=0; i<consumer.extendedConsumer.length;i++)
		  {
			if(consumer.extendedConsumer[i].active==false)
			{
				consumer.tempKWh+=(consumer.extendedConsumer[i].runningHours*consumer.extendedConsumer[i].watt)/1000;
		    }
			else if(consumer.extendedConsumer[i].active==true)
			{
				consumer.tempKWhActive+=(daytime.daytimeLength*consumer.extendedConsumer[i].watt)/1000;
			}
		  }
		  if((consumer.tempKWh+consumer.tempKWhActive)<=storage.stateOfCharge)
		  {
		    console.log(deviceStart +" darf laufen");
			console.log(/*"Bisher verbrauchte KWh: "+consumer.tempKWh+*/deviceStart+" Maximalverbrauch KWh in DT: "+consumer.tempKWhActive+" Akkustand: "+storage.stateOfCharge);
		    consumerT.timer.start();
		    consumer.tempKWh=0.0;
		    consumer.tempKWhActive=0.0;
		  }
		  else
		  {
		    consumerT.active=false;
			console.log(deviceStart+" darf nicht laufen, zu wenig Energie fuer eine ganze Tageszeit");
			console.log("Maximalverbrauch in KWh fuer "+deviceStart+" ist in DT: "+consumer.tempKWhActive);
			consumer.tempKWh=0.0;
			consumer.tempKWhActive=0.0;
		  }			
	},

	turnOff:function(deviceStop)
	{  
	  var consumerT=consumer.getOneExtendedConsumer(deviceStop);
	  if(consumerT.active==true)
	  {
		consumerT.timer.stop();
		consumerT.active=false;
	    console.log(deviceStop+" gestoppt, Zeit: "+consumerT.timer.getTime());
	  }
	  else
	  {
		console.log("Geraet war gar nicht an");
	  }
	},
	
	checkIfPossibleAfterDT:function()
	{
	  for(var i=0; i<consumer.extendedConsumer.length;i++)
		  {
		    if(consumer.extendedConsumer[i].active==true)
		    {
		    	consumer.tempKWhActiveDT+=(daytime.daytimeLength*consumer.extendedConsumer[i].watt)/1000;
		      if(consumer.tempKWhActiveDT>storage.stateOfCharge)
		      {
		    	  consumer.tempKWhActiveDT-=(daytime.daytimeLength*consumer.extendedConsumer[i].watt)/1000;
		    	  consumer.extendedConsumer[i].timer.stop();
		    	  consumer.extendedConsumer[i].active=false;
		    	  console.log("Geraet: "+consumer.extendedConsumer[i].type+" wurde gestoppt, passt nicht mehr rein");
		      }
		    }
		    
		  }
	  consumer.tempKWhActiveDT=0.0;	
	},

	recalculateTimer : function() {
		for ( var i = 0; i < consumer.extendedConsumer.length; i++) {
			if (consumer.extendedConsumer[i].active == true) {
				consumer.extendedConsumer[i].timer.changedDaytime();
			}
		}
	},

	getOneExtendedConsumer : function(cType) {
		for ( var i = 0; i < consumer.extendedConsumer.length; i++) {
			if (consumer.extendedConsumer[i].type == cType) {
				return consumer.extendedConsumer[i];
			}
		}
	},

	tempConsumer : function() {
		var phone = {
			"iconsumer" : 1,
			"level" : 1,
			"name" : "Telephone x2000",
			"picpath" : "./servername",
			"price" : 50,
			"tooltip" : "Dies ist ein Phone",
			"type" : "phone",
			"watt" : 30,
			"x" : 238,
			"y" : 435,
			"playerneeds" : {
				"name" : "work",
				"value" : 5
			}
		};

		var tv = {
			"iconsumer" : 3,
			"level" : 1,
			"name" : "Röhren TV",
			"picpath" : "./servername",
			"price" : 500,
			"tooltip" : "Dies ist ein Fernseher",
			"type" : "tv",
			"watt" : 120,
			"x" : 238,
			"y" : 435,
			"playerneeds" : {
				"name" : "lifestyle",
				"value" : 5
			}
		};

		var coffeeBrewer = {
			"iconsumer" : 4,
			"level" : 1,
			"name" : "Kaffeemaschine GG2000",
			"picpath" : "./servername",
			"price" : 30,
			"tooltip" : "Dies ist eine Kaffeemaschine",
			"type" : "Coffeemachine",
			"watt" : 120,
			"x" : 33,
			"y" : 4315,
			"playerneeds" : {
				"name" : "hunger",
				"value" : 5
			}
		};

		var bed = {
			"iconsumer" : 5,
			"level" : 1,
			"name" : "bed schlaraffGG2000",
			"picpath" : "./servername",
			"price" : 300,
			"tooltip" : "Dies ist ein Bett",
			"type" : "bed",
			"watt" : 20,
			"x" : 338,
			"y" : 325,
			"playerneeds" : {
				"name" : "sleep",
				"value" : 5
			}
		};

		var arr = new Array();
		arr.push(phone);
		arr.push(tv);
		arr.push(coffeeBrewer);
		arr.push(bed);
		return arr;

	}

	
};

var producer={
		installedKW:0,
		initProducer : function(){
			for(var i=0;i<producer.tempProducer().length;i++)
			{
				producer.installedKW+=producer.tempProducer()[i].watt/1000;
			}
		},

		tempProducer : function() {
			var solar1 = {
				"iproducer" : 1,
				"level" : 1,
				"name" : "solar power panel",
				"picpath" : "./servername",
				"position" : 1,
				"price" : 2000,
				"tooltip" : "Ein Solarpanel der Firma PowerPan",
				"watt" : 500,
				"x" : 100,
				"y" : 100
			};

			var solar2 = {
					"iproducer" : 5,
					"level" : 2,
					"name" : "sun collector 2kai",
					"picpath" : "./servername",
					"position" : 2,
					"price" : 3500,
					"tooltip" : "Ein Solarpanel der Firma 2kai",
					"watt" : 750,
					"x" : 200,
					"y" : 200
				};
			var solar3 = {
					"iproducer" : 6,
					"level" : 2,
					"name" : "sun collector 2kai",
					"picpath" : "./servername",
					"position" : 3,
					"price" : 3500,
					"tooltip" : "Ein Solarpanel der Firma 2kai",
					"watt" : 750,
					"x" : 300,
					"y" : 300
				};

			var arr = new Array();
			arr.push(solar1);
			arr.push(solar2);
			arr.push(solar3);
			return arr;
		}
};


var electricalConsumption={
		kwh:0,
		calculateConsumer:function(){
	      for(var k=0;k<consumer.extendedConsumer.length;k++)
		  {
		    var hourCounter=consumer.extendedConsumer[k].timer.getTime()/(daytime.daytimeIntervall/daytime.daytimeLength);
		    consumer.extendedConsumer[k].runningHours+=hourCounter;
		  }
		  for(var i=0; i<consumer.extendedConsumer.length;i++)
		  {
			  electricalConsumption.kwh+=(consumer.extendedConsumer[i].runningHours*consumer.extendedConsumer[i].watt)/1000;
		  }
		  storage.reduceStorageValue(electricalConsumption.kwh);
		},
		
		reset:function(){
		electricalConsumption.kwh=0; 
		  for(var i=0;i<consumer.extendedConsumer.length;i++)
		  {
			consumer.extendedConsumer[i].runningHours=0.0;  
			consumer.extendedConsumer[i].timer.reset();
		  }  
		},

		getAndMinKWh:function(){
		  var value=electricalConsumption.kwh*100000;
		  value=Math.floor(value);
		  value=value/100000;
		  return value ;	
		} 
};
