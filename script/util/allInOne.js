var scriptLoader = 0;

var errAIO = function(err){
	console.log("Script failed loading:");
	console.log(Connector.translateErrorCode(err));
};

var succAIO = function(textStatus){
	DEBUG.print("Script loading...");
	DEBUG.print(textStatus);
};

var loadScript = function(scriptPath){
	$.getScript(scriptPath)
	.done(function(data, textStatus){
		succAIO(scriptPath+" scriptLoader:"+scriptLoader);
		scriptLoader++;
	})
	.fail(errAIO);  
};

//load all logic files
$(document).ready(function(){	
	//setting cache
	$.ajaxSetup({
	  cache: true
	});	
	
	$.getScript("../script/logic/calculateDaytime.js")
	.done(function(data, textStatus){
		$.getScript("../script/logic/calculateElectricalConsumption.js")
		.done(function(data, textStatus){
			$.getScript("../script/logic/calculateGaussianDistribution.js")
			.done(function(data, textStatus){
				$.getScript("../script/logic/calculateIncome.js")
				.done(function(data, textStatus){
					$.getScript("../script/logic/calculateNeedsAndWants.js")
					.done(function(data, textStatus){
						$.getScript("../script/logic/calculateSeason.js")
						.done(function(data, textStatus){
							$.getScript("../script/logic/calculateSurfacePossibility.js")
							.done(function(data, textStatus){
								$.getScript("../script/logic/consumer.js")
								.done(function(data, textStatus){
									$.getScript("../script/logic/day.js")
									.done(function(data, textStatus){
										$.getScript("../script/logic/main.js")
										.done(function(data, textStatus){
											$.getScript("../script/logic/myTimer.js")
											.done(function(data, textStatus){
												$.getScript("../script/logic/randomEvents.js")
												.done(function(data, textStatus){
													$.getScript("../script/logic/storage.js")
													.done(function(data, textStatus){
														$.getScript("../script/logic/tableSeasonDaytime.js")
														.done(function(data, textStatus){
															$.getScript("../script/logic/testLogicScript.js")
															.done(function(data, textStatus){
																DEBUG.print("ALL fucking loading done!");

																initConsumer();
																addDay();
																daytimeRoutine();
															});
														});
													});
												});
											});
										});
									});
								});
							});
						});
					});
				});
			});
		});
	});
});