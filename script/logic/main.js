/*@author Markus Gündel
 *@class main
 *
 *The main-class initiate and let the routine start 
 *initProducer(),initStorage(),initConsumer() will be done after every call in the shop
 * */



window.onload = function () 
{
	needsAndWants.initNeedsAndWants();
	storage.initStorage();
	producer.initProducer();
	consumer.initConsumer();
	day.addDay();
	randomEvents.fillEventArrays(season.getSeason());
	daytime.daytimeRoutine();
};