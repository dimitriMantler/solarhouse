/*@author Markus Gündel
 *@class calculateDaytime
 *
 *This is the routine about the daytime,day, season and the randomEvents of every daytime
 *
 *The createRandomNumber works only with 0 at min and creates a number from 0 < max 
 * */

var daytime={
	daytimeLength:6,
	daytimeArray:["morning","midday","evening","night"],
	daytimeNo:0,//start morning
	maxDays:360,
	daytimeTimer:0,
	daytimeIntervall:5000,
	
	daytimeRoutine:function(){
	  gaussianDistribution.gauss(22,3);
	 // randomEvents.fillEventArrays(season.getSeason());
	  daytime.printbeforeDaytime();
	  daytime.daytimeTimer=setTimeout(daytime.nextDaytime, daytime.daytimeIntervall);
	},
	
    nextDaytime:function(){
    	  income.calculateIncomeKWh();
    	  
    	  if(daytime.daytimeNo <=2)
    	  {
    		  daytime.daytimeNo++;
    	  }
    	  else if(daytime.daytimeNo >=3) // one Day over
    	  {
    		  daytime.daytimeNo=0;
    		  if(day.day<daytime.maxDays) 
    		  {
    		    day.addDay();
    		  }
    		  else if(day.day>=daytime.maxDays) // 360 days over
    		  {
    			day.clearDay(); // set day to 1
    		  }
    	  }
    	  randomEvents.fillEventArrays(season.getSeason());
    	  randomEvents.createNewEvents(); //after calculate IncomeKWh


    	  consumer.recalculateTimer(); //how long device ran until here
    	  needsAndWants.needsAndWantsRoutine(); 
    	  electricalConsumption.calculateConsumer(); 
    	  daytime.printAfterDaytime();
    	  
    	  consumer.checkIfPossibleAfterDT();
    	  
    	  electricalConsumption.reset(); 
    	  clearTimeout(daytime.daytimeTimer);
    	  
    	  daytime.daytimeRoutine();	
    },
    printbeforeDaytime:function()
    {	
	    if(day.day==1 && daytime.getDaytime()==daytime.daytimeArray[0] || day.day==91&&daytime.getDaytime()==daytime.daytimeArray[0] ||day.day==181 &&daytime.getDaytime()==daytime.daytimeArray[0]|| day.day==271&&daytime.getDaytime()==daytime.daytimeArray[0])// daytime.daytimeArray[0]=="morning"
	    {
	      	console.log(season.getSeason());
	    }

    	if(daytime.getDaytime()==daytime.daytimeArray[0])
    	{
    	  console.log("Day: "+day.day);
    	}
    	console.log("Daytime: "+daytime.getDaytime());
    	console.log("In dieser Tageszeit koenntest du "+gaussianDistribution.myRandom+" Cent pro KWh bekommen");
    	console.log("Anfangsakkustand: "+storage.stateOfCharge);
    	console.log("Geldstand: "+income.money+" Cent");
    	console.log("Weather: "+randomEvents.getEventWeather()+" Action: "+randomEvents.getEventAction()); //vorher noch daytime
    	
    	console.log("hunger: "+needsAndWants.getNeedAndWant(needsAndWants.hunger));
    	console.log("lifestyle: "+needsAndWants.getNeedAndWant(needsAndWants.lifestyle));
    	console.log("work: "+needsAndWants.getNeedAndWant(needsAndWants.work));
    	console.log("sleep: "+needsAndWants.getNeedAndWant(needsAndWants.sleep));
    	console.log("\n");	
    },
    
    printAfterDaytime:function()
    {
    	  console.log("Berechnungen nach der Tageszeit: ");
    	  console.log("Die Eingeflossenen KWh in dieser Tageszeit ist : "+income.incomingKWh);
    	  console.log("Das Einkommen mit "+gaussianDistribution.myRandom+" ist "+income.incomingMoney);
    	  for(var i=0; i<consumer.extendedConsumer.length;i++)
    	  {
    	    if(consumer.extendedConsumer[i].active==true)
    	    {
    		  console.log("Gelaufene Zeit von "+consumer.extendedConsumer[i].type+": "+consumer.extendedConsumer[i].timer.getTime()+"ms");
    		}
    		console.log(consumer.extendedConsumer[i].type+" hat "+(consumer.extendedConsumer[i].runningHours*consumer.extendedConsumer[i].watt)/1000+" verbraucht");
    	  }
    	  
    	  console.log("Verbrauchte KWh: "+electricalConsumption.getAndMinKWh());
    	  console.log("Neuer Akkustand nach Abzug: "+storage.stateOfCharge);
    	  console.log("Neuer Geldstand: "+income.money +" Cent");
    	  
    	  for(var i=0; i<consumer.extendedConsumer.length;i++)
    	  {
  			switch (consumer.extendedConsumer[i].playerneeds.name) {
  			case needsAndWants.lifestyle:
  				console.log(needsAndWants.lifestyle+ " abgezogen: "+consumer.extendedConsumer[i].playerneeds.value* needsAndWants.lifestyleObjects * needsAndWants.factorLifestyle);
  				console.log(needsAndWants.lifestyle+ " hinzugefuegt: "+Math.round(consumer.extendedConsumer[i].timer.getTime()/ 100* needsAndWants.factorLifestyle*3)/10);
  				break;
  			case needsAndWants.work:
  				console.log(needsAndWants.work+ " abgezogen: "+consumer.extendedConsumer[i].playerneeds.value* needsAndWants.workObjects * needsAndWants.factorWork);
  				console.log(needsAndWants.work+ " hinzugefuegt: "+ Math.round(consumer.extendedConsumer[i].timer.getTime()/ 100* needsAndWants.factorWork*3)/10);
  				break;
  			case needsAndWants.hunger:
  				console.log(needsAndWants.hunger+ " abgezogen: "+consumer.extendedConsumer[i].playerneeds.value* needsAndWants.hungerObjects * needsAndWants.factorHunger);
  				console.log(needsAndWants.hunger+ " hinzugefuegt: "+ Math.round(consumer.extendedConsumer[i].timer.getTime()/ 100* needsAndWants.factorHunger*3)/10);
  				break;
  			case needsAndWants.sleep:
  				console.log(needsAndWants.sleep+ " abgezogen: "+consumer.extendedConsumer[i].playerneeds.value* needsAndWants.sleepObjects * needsAndWants.factorSleep);
  				console.log(needsAndWants.sleep+ " hinzugefuegt: "+ Math.round(consumer.extendedConsumer[i].timer.getTime()/ 100* needsAndWants.factorSleep*3)/10);
  				break;
  			}
    	  }
    	  console.log(" ");
    },
    
    getDaytime:function()
    {
    	return daytime.daytimeArray[daytime.daytimeNo];	
    }
};

var day= {
	    day:0,
	    
	    addDay: function()
	    {
	      day.day++;
	      if(day.day==1 || day.day==91 ||day.day==181 || day.day==271)
	      {
	        season.nextSeason();
	      }
	    },
	    
	   clearDay: function()
	   {
		 day.day=1;
		 season.nextSeason();
	   },
	   
	   saveToDatabase: function()
	   {
		   
	   }
};

var season = {
		seasonArray : [ "summer", "autuum", "winter", "spring" ],
		seasonNo : -1, //-1 because in the main day.addDay and in day nextSeason->start summer

		nextSeason : function() {
			if (season.seasonNo <= 2) {
				season.seasonNo++;
			} else if (season.seasonNo >= 3) {
				season.seasonNo = 0;
			}
		},
	    
		getSeason:function(){
			return season.seasonArray[season.seasonNo];
		}
};

var randomEvents={
		
    clearsky:"clear sky",
    rain:"rain",
    clouds:"clouds",
    
    nothing:"nothing",
    birddroppings:"birddroppings",
    leaves:"leaves",
    ice:"ice",
    
	weatherArray:[],
	actionArray:[],
	weatherNo:0,    //std: sun
	actionNo:0,     //std: nothing
	
	fillEventArrays: function(seasonf)
	{
    if(seasonf==season.seasonArray[0])//summer
	  {
  	randomEvents.weatherArray=[randomEvents.clearsky,randomEvents.clearsky,randomEvents.rain,randomEvents.clouds];  
  	randomEvents.actionArray=[randomEvents.nothing,randomEvents.nothing,randomEvents.birddroppings];
	  }
	  else if(seasonf==season.seasonArray[1])//autuum
	  {
		randomEvents.weatherArray=[randomEvents.clearsky,randomEvents.rain,randomEvents.clouds,randomEvents.clouds];  
		randomEvents.actionArray=[randomEvents.nothing,randomEvents.leaves,randomEvents.leaves,randomEvents.birddroppings];
	  }
	  else if(seasonf==season.seasonArray[2])//winter
	  {
		randomEvents.weatherArray=[randomEvents.clearsky,randomEvents.rain,randomEvents.clouds,randomEvents.clouds];  
		randomEvents.actionArray=[randomEvents.nothing,randomEvents.nothing,randomEvents.ice];
	  }
	  else if(seasonf==season.seasonArray[3])//spring
	  {
		randomEvents.weatherArray=[randomEvents.clearsky,randomEvents.rain,randomEvents.rain,randomEvents.clouds]; 
		randomEvents.actionArray=[randomEvents.nothing,randomEvents.birddroppings];
	  }		
	},
	
	createNewEvents: function()
  {
	  randomEvents.weatherNo= randomEvents.createRandomNumber(0,randomEvents.weatherArray.length);  
	  randomEvents.actionNo= randomEvents.createRandomNumber(0,randomEvents.actionArray.length);  
  },
  
  createRandomNumber:function(min, max)
  {
    var value = Math.random();
    value*=max;						
    value=Math.floor(value);	
    return value;		
  },
  
  getEventWeather:function()
  {
    return randomEvents.weatherArray[randomEvents.weatherNo];	
  },
  
  getEventAction:function()
  {
    return randomEvents.actionArray[randomEvents.actionNo];	
  }
	
};
