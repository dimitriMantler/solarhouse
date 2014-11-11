/*
 * myTimer calculates the time of every consumer.
 * There is a beginningTime,currentTime and endTime. 
 * The time endTime-currentTime is the time in the daytime so the currentTime is set every beginning of the daytime
 * The time endTime-beginningTime is the time the device ran on all daytimes together 
 * 
 * The time should be stopped if the shop is called  
 *  
 */
function myTimer()
{
 this.dateB;
 this.dateE;
 this.currentTime;
 this.beginningTime;
 this.endTime;
 
 this.result;
 this.endResult=0.0;
};

myTimer.prototype.start = function()
{
  this.dateB = new Date();
  this.beginningTime = this.dateB.getTime();	
  this.currentTime=this.beginningTime;
};

myTimer.prototype.changedDaytime= function()
{

   this.dateE = new Date();
   this.endTime=this.dateE.getTime();  
   this.endResult=Math.floor((this.endTime-this.currentTime)/100)*100;
   if((this.endResult)>daytime.daytimeIntervall)
	{
	  this.endResult=daytime.daytimeIntervall;
	}
   this.currentTime=this.endTime;
};

myTimer.prototype.stop = function()
{
  this.dateE = new Date();
  this.endTime=this.dateE.getTime();
  
  this.endResult=(this.endTime-this.currentTime);
  console.log("Timer gestoppt");
};

myTimer.prototype.getTime = function()
{
  return this.endResult;	
};

myTimer.prototype.reset= function()
{
  this.endResult=0.0;
};



myTimer.prototype.getBeginningTime= function()
{
   return this.beginningTime;
};

myTimer.prototype.resetBeginningTime= function()
{
   this.beginningTime=0.0;
};