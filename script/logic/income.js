/*@author Markus Gündel
 *@class calculateIncome
 *
 *This must be done after a new season, daytime, and the gaussian distribution 
 *
 *This calculates the income in money and KWh  
 * */

var income={
	 money:0.0,
     incomingMoney:0.0,
	 incomingKWh:0.0,
	 
	 calculateIncomeKWh:function()
	 {
		  var weatherFactor=1;
		  var actionFactor=1;
		  
		  switch(randomEvents.getEventWeather())
		  {
		    case randomEvents.clearsky: weatherFactor=1 ;break;
		    case randomEvents.rain: weatherFactor=0.5 ;break;
		    case randomEvents.clouds: weatherFactor=0.7 ;break;
		    default: console.log("Fehler-Switch-CaculateIncome: "+randomEvents.getEventWeather());break;
		  }
		  switch(randomEvents.getEventAction())
		  {
		    case randomEvents.nothing: actionFactor=1 ;break;
		    case randomEvents.ice: actionFactor=0.75 ;break;
		    case randomEvents.leaves: actionFactor=0.8 ;break;
		    case randomEvents.birddroppings: actionFactor=0.9 ;break;
		    default: console.log("Fehler-Switch2-CaculateIncome: "+randomEvents.getEventAction()+"number:"+randomEvents.actionNo);break;
		  }
		  income.incomingKWh=producer.installedKW*tableSeasonDayTime.calculateTable()*weatherFactor*actionFactor;//*daytime.daytimeLength; not because is in tableSeasonDaytime per Daytime
		  income.incomingKWh=income.incomingKWh*1000;
		  income.incomingKWh= Math.floor(income.incomingKWh);
		  income.incomingKWh=income.incomingKWh/1000;
		  var remain1=storage.addStorageValue(income.incomingKWh); 
		  income.calculatePrice(remain1,income.incomingKWh);
	 },
	
	 calculatePrice:function(remain1,result)
	 {
			if(storage.button==false)
			{
				income.incomingMoney=Math.round(result*gaussianDistribution.myRandom);	
			}
			else if(storage.stateOfCharge==storage.maxStateOfCharge)
			{
				income.incomingMoney=Math.round(remain1*gaussianDistribution.myRandom);
			}
			income.money+=income.incomingMoney;
	 },
	 
	 reduceMoney:function(value)
	 {
		 income.money-value;	 
	 }
	 
};