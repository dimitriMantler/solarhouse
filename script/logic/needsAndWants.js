/*@author Markus Gündel
 *@class calculateNeedsAndWants
 *
 *This are the NeedsAndWants of the player. Every Daytime this will be de- and increased 
 *in case which NeedAndWant it is, how many devices of a type are buyed and how long this device ran
 * */

var needsAndWants = {
	lifestyle:"lifestyle",
	work:"work",
	hunger:"hunger",
	sleep:"sleep",
		
	maxNeedsAndWants : 100,
	hungerValue :0,
	lifestyleValue : 0,
	workValue :0,
	sleepValue :0,

	lifestyleObjects : 0,
	workObjects : 0,
	hungerObjects : 0,
	sleepObjects : 0,

	factorLifestyle : 1,
	factorWork : 1,
	factorHunger : 1,
	factorSleep : 1,

	initNeedsAndWants:function()
    {
		needsAndWants.hungerValue =needsAndWants.maxNeedsAndWants;
		needsAndWants.lifestyleValue=needsAndWants.maxNeedsAndWants;
		needsAndWants.workValue =needsAndWants.maxNeedsAndWants;
		needsAndWants.sleepValue =needsAndWants.maxNeedsAndWants;
    },	
	needsAndWantsRoutine : function() {
		needsAndWants.lifestyleObjects = 0;
		needsAndWants.workObjects = 0;
		needsAndWants.hungerObjects = 0;
		needsAndWants.sleepObjects = 0;

		for ( var i = 0; i < consumer.extendedConsumer.length; i++) {
			switch (consumer.extendedConsumer[i].playerneeds.name) {
			case needsAndWants.lifestyle:
				needsAndWants.lifestyleObjects++;
				break;
			case needsAndWants.work:
				needsAndWants.workObjects++;
				break;
			case needsAndWants.hunger:
				needsAndWants.hungerObjects++;
				break;
			case needsAndWants.sleep:
				needsAndWants.sleepObjects++;
				break;
			}
		}

		for ( var i = 0; i < consumer.extendedConsumer.length; i++) {
			switch (consumer.extendedConsumer[i].playerneeds.name) {
			case needsAndWants.lifestyle:
				needsAndWants.reduceNeedAndWant(needsAndWants.lifestyle,consumer.extendedConsumer[i].playerneeds.value* needsAndWants.lifestyleObjects * needsAndWants.factorLifestyle);
				needsAndWants.addNeedAndWant(needsAndWants.lifestyle, consumer.extendedConsumer[i].timer.getTime()/ 1000 * needsAndWants.factorLifestyle*3 );
				break;
			case needsAndWants.work:
				needsAndWants.reduceNeedAndWant(needsAndWants.work,consumer.extendedConsumer[i].playerneeds.value* needsAndWants.workObjects * needsAndWants.factorWork);
				needsAndWants.addNeedAndWant(needsAndWants.work, consumer.extendedConsumer[i].timer.getTime()/ 1000* needsAndWants.factorWork*3 );
				break;
			case needsAndWants.hunger:
				needsAndWants.reduceNeedAndWant(needsAndWants.hunger,consumer.extendedConsumer[i].playerneeds.value* needsAndWants.hungerObjects * needsAndWants.factorHunger);
				needsAndWants.addNeedAndWant(needsAndWants.hunger, consumer.extendedConsumer[i].timer.getTime()/ 1000* needsAndWants.factorHunger*3 );
				break;
			case needsAndWants.sleep:
				needsAndWants.reduceNeedAndWant(needsAndWants.sleep,consumer.extendedConsumer[i].playerneeds.value* needsAndWants.sleepObjects * needsAndWants.factorSleep);
				needsAndWants.addNeedAndWant(needsAndWants.sleep, consumer.extendedConsumer[i].timer.getTime()/ 1000* needsAndWants.factorSleep*3 );
				break;
			}
		}
	},

	getNeedAndWant : function(name) {
		switch (name) {
		case needsAndWants.hunger:
			return needsAndWants.hungerValue;
			break;
		case needsAndWants.lifestyle:
			return needsAndWants.lifestyleValue;
			break;
		case needsAndWants.work:
			return needsAndWants.workValue;
			break;
		case needsAndWants.sleep:
			return needsAndWants.sleepValue;
			break;
		}
	},

	addNeedAndWant : function(name, value) {
		switch (name) {
		case needsAndWants.hunger:
			if ((needsAndWants.hungerValue + value) > needsAndWants.maxNeedsAndWants) {
				needsAndWants.hungerValue = 100;
				//console.log("Es geht nicht höher als " + needsAndWants.maxNeedsAndWants);
			} else {
				needsAndWants.hungerValue += value;
			}
			break;

		case needsAndWants.lifestyle:
			if ((needsAndWants.lifestyleValue + value) > needsAndWants.maxNeedsAndWants) {
				needsAndWants.lifestyleValue = 100;
				//console.log("Es geht nicht höher als " + needsAndWants.maxNeedsAndWants);
			} else {
				needsAndWants.lifestyleValue += value;
			}
			break;

		case needsAndWants.work:
			if ((needsAndWants.workValue + value) > needsAndWants.maxNeedsAndWants) {
				needsAndWants.workValue = 100;
				//console.log("Es geht nicht höher als " + needsAndWants.maxNeedsAndWants);
			} else {
				needsAndWants.workValue += value;
			}
			break;

		case needsAndWants.sleep:
			if ((needsAndWants.sleepValue + value) > needsAndWants.maxNeedsAndWants) {
				needsAndWants.sleepValue = 100;
				//console.log("Es geht nicht höher als " + needsAndWants.maxNeedsAndWants);
			} else {
				needsAndWants.sleepValue += value;
			}
			break;
		}
	},
	reduceNeedAndWant : function(name, value) {
		switch (name) {
		case needsAndWants.hunger:
			if (needsAndWants.hungerValue - value <= 0) {
				needsAndWants.hungerValue = 0;
			} else {
				needsAndWants.hungerValue -= value;
			}
			break;

		case needsAndWants.lifestyle:
			if (needsAndWants.lifestyleValue - value <= 0) {
				needsAndWants.lifestyleValue = 0;
			} else {
				needsAndWants.lifestyleValue -= value;
			}
			break;

		case needsAndWants.work:
			if (needsAndWants.workValue - value <= 0) {
				needsAndWants.workValue = 0;
			} else {
				needsAndWants.workValue -= value;
			}
			break;

		case needsAndWants.sleep:
			if (needsAndWants.sleepValue - value <= 0) {
				needsAndWants.sleepValue = 0;
			} else {
				needsAndWants.sleepValue -= value;
			}
			break;
		}

	}
};
