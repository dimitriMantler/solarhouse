var mousePosX = 0;
var mousePosY = 0;
var tooltip;
var item=0;
var tip=false; // tooltip-trigger

UTIL = function(){};
var Util = new UTIL();

//---------------| Tooltip |--------------------
UTIL.prototype.tooltip = function(){

tooltipPath = Crafty.e("tooltip,2D, Canvas, Color,Text")
	.attr({x: 10, y: 30, w: 10, h: 10, z:4, visible:false})
	.color("white")
	.bind('EnterFrame',function(){
		if(tip==true){
			this.visible=true;
			this.text(item.picpath); 
		}
		else{
			this.visible=false;
		}
	});

tooltipName = Crafty.e("tooltip,2D, Canvas, Color,Text")
	.attr({x: 10, y: 10, w: 10, h: 10, z:4, visible:false})
	.color("white")
	.bind('EnterFrame',function(){
		if(tip==true){
			this.visible=true;
			this.text(item.name);
		}
		else{
			this.visible=false;
		}
	});
	
tooltipPrice = Crafty.e("tooltip,2D, Canvas, Color,Text")
	.attr({x: 10, y: 20, w: 10, h: 10, z:4, visible:false})
	.color("white")
	.bind('EnterFrame',function(){
		if(tip==true){
			this.visible=true;
			this.text(item.price);
		}
		else{
			this.visible=false;
		}
	});
	
tooltip = Crafty.e("tooltip,2D, Canvas, Image")
	.attr({x: 0, y: 0, w: 130, h: 60, z:3, visible:false})
	.image(menuImagesPath+"tooltip.png")
	.attach(tooltipName)
	.attach(tooltipPrice)
	.attach(tooltipPath)
	.bind('EnterFrame',function(){
		if(tip==true){
			this.visible=true;
			this.x=mousePosX;
			this.y=mousePosY-(this._h+10);
		}
		else{
			tooltip.visible=false;
		}
	});
};

UTIL.prototype.updateTooltip = function(object){
	item = object;
};

UTIL.prototype.checkForSameTooltip = function(object){
	if(item==object)
		return true;
	else
		return false;
};

UTIL.prototype.showTooltipConsumer = function(type){

	var i=0;
	for(i=0;i<GS.consumer.length;i++){
		if(GS.consumer[i].type==type)
		break;
	}
	if(GS.consumer[i]!=undefined){
		if(!Util.checkForSameTooltip(GS.consumer[i]))
			Util.updateTooltip(GS.consumer[i]);
			
		tip=true;
	}
};

//--------------------------------------
UTIL.prototype.componentsToArray = function(){
	shopArray = new Array(consumerTab,producerTab,storageTab,shopWindow,shopLabel,exitShop,shopItemA,shopItemB,shopItemC,shopItemD,shopItemE,shopItemF,shopItemG,shopItemH,shopBack,shopNext,shopPageCount);
	//itemArray= new Array(0,0,0,0,0,0,0,0);
	sItemArray = new Array(shopItemA,shopItemB,shopItemC,shopItemD,shopItemE,shopItemF,shopItemG,shopItemH);
	itemDetailsArray = new Array(itemDetailsWindow,itemDetailsLabel,itemDetailsPic,itemDetailsDiag,itemDetailsName,itemDetailsPrice,itemDetailsLevel,itemDetailsType,itemDetailsConsum,itemDetailsNeeds,itemDetailsProduction,itemDetailsCapacity,itemDetailsDescription,buyButton,declineButton);
};

UTIL.prototype.updateConsumer = function(item){//TODO

	var object;
	
	switch(item.type){
	case "tv" : object=tv;break;	
	case "hifi": object=hifi;break;
	case "telephone": object=telephone;break;
	}

	object.image(item.picpath+".png");
	object.x=item.x;
	object.y=item.y;
};

UTIL.prototype.updateAllConsumers = function(){//TODO weitere consumer hinzufügen

	var object;
	for(var i=0;i<GS.consumer.length;i++){
		switch(GS.consumer[i].type){
		case "tv" : object=tv;break;	
		case "hifi": object=hifi;break;
		case "phone": object=telephone;break;
		}
		
		object.image(GS.consumer[i].picpath+".png");
		object.x=GS.consumer[i].x;
		object.y=GS.consumer[i].y;
	}
};

UTIL.prototype.buyItem = function(item){//TODO producer,storage
	
	var bought=false;

	if(GS.money>=item.price){
		//consumer
		if(consumerTab.z==7){
			for(var i=0;i<GS.consumer.length;i++){
				if(item.type==GS.consumer[i].type){
					GS.consumer[i]=item;
					bought=true;
					break;
				}
			}
			if(bought==false){
				GS.consumer.push(item);
			}
		Util.updateConsumer(item);
		}
		else if(producerTab.z==7){
			for(var i=0;i<GS.producer.length;i++){
				if(item.pos==GS.producer[i].pos){
					GS.producer[i]=item;
					bought=true;
					break;
				}
			}
			if(bought==false){
				GS.producer.push(item);
			}
		//Util.updateProducer();//TODO
		}
		else if(storageTab.z==7){
			for(var i=0;i<GS.storage.length;i++){
				if(item.pos==GS.storage[i].pos){
					GS.storage[i]=item;
					bought=true;
					break;
				}
			}
			if(bought==false){
				GS.storage.push(item);
			}
		//Util.updateStorage();//TODO
		}
		GS.money-=item.price; // macht Makke reduceMoney(item.price);
		//save(); macht Makke
		Menu.hideShop();
		
		Menu.updateStatsMenu(); // meine funktion
	}
	else{
		Menu.alert("Hinweis","Du hast nicht genug Geld","info");
		
	}
	Menu.hideItemDetails();
	bought=false;
	itemDetailsOpen=false;
};

UTIL.prototype.addNeeds = function(type){//TODO alle needs ausser lifestyle
		for(var i=0;i<GS.consumer.length;i++){
		if(lifestyle>100)
			lifestyle=100;
		if(GS.consumer[i].type==type)
			lifestyle+=GS.consumer[i].playerneeds.value;
		}
};

UTIL.prototype.delay = function(ms) {
	ms += new Date().getTime();
	while (new Date() < ms){}
};

window.onmousemove = function(event){
	mousePosX = event.pageX;
	mousePosY = event.pageY;
};

window.onclick = function(event){
	mousePosX = event.pageX;
	mousePosY = event.pageY;
};

