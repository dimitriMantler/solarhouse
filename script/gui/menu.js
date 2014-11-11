//needs
var hunger=0;
var lifestyle=0;
var sleep=0;
var work=0;
var lifestyleSat,hungerSat,sleepSat,workSat;
var myMoney;

//shop-vars
var shopPage=0;
var shopArray;
var sItemArray; //für updateShop
var itemArray=new Array(); //für updateShop
var consumerTab,producerTab,storageTab,shopWindow,shopLabel,exitShop,shopItemA,shopItemB,shopItemC,shopItemD,shopItemE,shopItemF,shopItemG,shopItemH,shopBack,shopNext,shopPageCount;

 
// itemdetails
var itemDetailsOpen=false;
var itemDetailsArray;
var itemDetailsWindow,itemDetailsLabel,itemDetailsPic,itemDetailsDiag,itemDetailsName,itemDetailsPrice,itemDetailsLevel,itemDetailsType,itemDetailsConsum,itemDetailsNeeds,itemDetailsProduction,itemDetailsCapacity,itemDetailsDescription,buyButton,declineButton;

var chosenItem=0;

MENU = function(){};
var Menu = new MENU();

//----------------| Menus |-------------------
MENU.prototype.buildMenus = function(){//Szenenmenü, StatsMenü, GameMenü

Menu.buildSceneMenu();
Menu.buildGameMenu();
Menu.buildStatsMenu();

Menu.buildShop();
Menu.buildItemDetails();
Menu.buildAlert();
};

MENU.prototype.buildSceneMenu = function(){

var fold=-1;
var i=31;
var menuactiv=false;

var menu = Crafty.e("2D, Canvas, Image")
	.attr({x: -270, y: 100, w: 100, h: 100})
	.image(menuImagesPath+"menu.png");

var switchLivingroom = Crafty.e("2D, Canvas, Image")
	.attr({x: -75, y: 200, w: 20, h: 20})
	.image(menuImagesPath+"living.png");
	
var switchWork = Crafty.e("2D, Canvas, Image")
	.attr({x: -120, y: 200, w: 20, h: 20})
	.image(menuImagesPath+"work.png");
	
var switchKitchen = Crafty.e("2D, Canvas, Image")
	.attr({x: -75, y: 160, w: 20, h: 20})
	.image(menuImagesPath+"kitchen.png");
	
var switchBed = Crafty.e("2D, Canvas, Image")
	.attr({x: -120, y: 160, w: 20, h: 20})
	.image(menuImagesPath+"sleep.png");
	
var switchRoof = Crafty.e("2D, Canvas, Image")
	.attr({x: -120, y: 120, w: 20, h: 20})
	.image(menuImagesPath+"roof.png");
	
var menubutton = Crafty.e("2D, DOM, Image,Mouse")
	.attr({x: 0, y: 100, w: 20, h: 100})
	.image(menuImagesPath+"menubutton.png")
	.attach(menu)
	.attach(switchLivingroom)
	.attach(switchWork)
	.attach(switchKitchen)
	.attach(switchBed)
	.attach(switchRoof)
	.bind("Click",function(){
	//v1.1
		if(menuactiv==false){
			i=0;
			fold*=-1;
			menuactiv=true; 
		}
	});

var menuevent = Crafty.e("2D, Canvas")
	.attr({x: 10, y: 10, w: 20, h: 20, visible:false})
	.bind('EnterFrame', function(){
		if(i<=30){
			menubutton.x+=Math.sin(i/10)*8*fold; 
			i++;
		}
		else{
			menuactiv=false;	
		}
	});
};

MENU.prototype.buildGameMenu = function(){

var foldG=1;
var iG=31;
var gameMenuactiv=false;

var toggleSound = Crafty.e("2D, Canvas, Image, Mouse")
	.attr({x: windowWidth+10, y: 110, w: 100, h: 100, z:6})
	.image(menuImagesPath+"toggleSound.png")
	.bind("Click",function(){
	});
	
var save = Crafty.e("2D, Canvas, Image, Mouse")
	.attr({x: windowWidth+10, y: 170, w: 100, h: 100, z:6})
	.image(menuImagesPath+"save.jpg")
	.bind("Click",function(){
		//save();
	});
	
var logout = Crafty.e("2D, Canvas, Image,Mouse")
	.attr({x: windowWidth+10, y: 230, w: 100, h: 100, z:6})
	.image(menuImagesPath+"logout.png")
	.bind("Click",function(){
	});

var gameMenu = Crafty.e("2D, Canvas, Image")
	.attr({x: windowWidth-1, y: 100, w: 100, h: 100, z:5})
	.attach(toggleSound)
	.attach(save)
	.attach(logout)
	.image(menuImagesPath+"gameMenu.png");

var gameMenubutton = Crafty.e("2D, DOM, Image,Mouse")
	.attr({x: windowWidth-20, y: 100, w: 20, h: 100})
	.image(menuImagesPath+"gameMenubutton.png")
	.attach(gameMenu)
	.bind("Click",function(){
		if(gameMenuactiv==false){
			iG=0;
			foldG*=-1;
			gameMenuactiv=true;
		}
	});

var gameMenuevent = Crafty.e("2D, Canvas")
	.attr({x: 10, y: 10, w: 20, h: 20, visible:false})
	.bind('EnterFrame', function(){
		if(iG<=30){
			gameMenubutton.x+=Math.sin(iG/10)*3*foldG; 
			iG++;
		}
		else{
			gameMenuactiv=false;	
		}
	});
	
};

MENU.prototype.buildStatsMenu = function(){//TODO needs, calendar, energy

var foldS=-1;
var iS=31;
var statsMenuactiv=false;
var move=0;

//--------------------| Need & Wants |----------------------------
var lifestyleBar = Crafty.e("2D, Canvas, Image")
	.attr({x: 510, y: -30, w: 100, h: 20, z:6})
	.image(menuImagesPath+"needsRed.png");
	
lifestyleSat = Crafty.e("2D, Canvas, Color")
	.attr({x: 541, y: -25, w: lifestyle, h: 18, z:7})
	.color("lime");

var hungerBar = Crafty.e("2D, Canvas, Image")
	.attr({x: 510, y: -70, w: 100, h: 20, z:6})
	.image(menuImagesPath+"needsRed.png");
	
hungerSat = Crafty.e("2D, Canvas, Color")
	.attr({x: 510, y: -70, w: hunger, h: 20, z:7})
	.color("lime");

var sleepBar = Crafty.e("2D, Canvas, Image")
	.attr({x: 300, y: -30, w: 100, h: 20, z:6})
	.image(menuImagesPath+"needsRed.png");

sleepSat = Crafty.e("2D, Canvas, Color")
	.attr({x: 300, y: -30, w: sleep, h: 20, z:7})
	.color("lime");

var workBar = Crafty.e("2D, Canvas, Image")
	.attr({x: 300, y: -70, w: 100, h: 20, z:6})
	.image(menuImagesPath+"needsRed.png");

workSat = Crafty.e("2D, Canvas, Color")
	.attr({x: 300, y: -70, w: work, h: 20, z:7})
	.color("lime");
	
//----------------------------------------------------------------
myMoney = Crafty.e("2D, Canvas,Text")
	.attr({x: 700, y: -245, w: 20, h: 20, z:7})
	.text(GS.money+"€");


var statsMenu = Crafty.e("2D, Canvas, Image")
	.attr({x: 290, y: -260, w: 100, h: 100, z:5})
	.attach(lifestyleBar)
	.attach(hungerBar)
	.attach(sleepBar)
	.attach(workBar)
	.attach(myMoney)
	.image(menuImagesPath+"statsMenu.png");

var statsMenubutton = Crafty.e("2D, DOM, Image,Mouse")
	.attr({x: 290, y: 0, w: 20, h: 100})
	.image(menuImagesPath+"statsMenubutton.png")
	.attach(statsMenu)
	.bind("Click",function(){
		if(statsMenuactiv==false){
			iS=0;
			foldS*=-1;
			statsMenuactiv=true;
		}
	});

var statsMenuevent = Crafty.e("2D, Canvas")
	.attr({x: 10, y: 10, w: 20, h: 20, visible:false})
	.bind('EnterFrame', function(){
		if(iS<=30){
			move=Math.sin(iS/10)*4*foldS;
			statsMenubutton.y+=move;
			lifestyleSat.y+=move;
			hungerSat.y+=move;
			iS++;
		}
		else{
			statsMenuactiv=false;	
		}
	});
};

MENU.prototype.updateStatsMenu = function(){//TODO
	hungerSat.w=hunger;
	lifestyleSat.w=lifestyle;
	
	if(lifestyle>40)
		lifestyleSat.color("lime")
	else if(lifestyle>20)
		lifestyleSat.color("yellow")
	else
		lifestyleSat.color("red")
	myMoney.text(GS.money+"€");
};

//----------------| Shop |-------------------
MENU.prototype.buildShop = function(){
	
consumerTab = Crafty.e("2D, Canvas, Image, Mouse")
	.attr({x: 100, y: 40, w: 80, h: 100, z:7, visible:false})
	.image(shopImagesPath+"consumerTab.png")
	.bind('Click', function(){
		this.z=7;
		producerTab.z=5;
		storageTab.z=4;
		
		shopPage=0;
		shopPageCount.text(shopPage+1);
		//shopItemArray=shopConsumerArray;
		Menu.updateShop();
	});

producerTab = Crafty.e("2D, Canvas, Image, Mouse")
	.attr({x: 100, y: 80, w: 80, h: 100, z:5, visible:false})
	.image(shopImagesPath+"producerTab.png")
	.bind('Click', function(){
		this.z=7;
		consumerTab.z=5;
		storageTab.z=5;
		
		shopPage=0;
		shopPageCount.text(shopPage+1);
		//shopItemArray=shopProducerArray;
		Menu.updateShop();
	});

storageTab = Crafty.e("2D, Canvas, Image, Mouse")
	.attr({x: 100, y: 120, w: 80, h: 100, z:5, visible:false})
	.image(shopImagesPath+"storageTab.png")
	.bind('Click', function(){
		this.z=7;
		consumerTab.z=5;
		producerTab.z=4;
		
		shopPage=0;
		shopPageCount.text(shopPage+1);
		//shopItemArray=shopStorageArray;
		Menu.updateShop();
	});

shopWindow = Crafty.e("2D, Canvas, Image")
	.attr({x: 320, y: 200, w: 480, h: 330, z:6, visible:false})
	.image(shopImagesPath+"shop.png")
	.attach(consumerTab)
	.attach(producerTab)
	.attach(storageTab);

shopLabel = Crafty.e("2D, Canvas, Image")
	.attr({x: 320, y: 200, w: 480, h: 330, z:6, visible:false})
	.image(shopImagesPath+"shop_label.png")

exitShop = Crafty.e("2D, Canvas, Image, Mouse")
	.attr({x: 320, y: 20, w: 40, h: 40, z:7, visible:false})
	.image(shopImagesPath+"closeShop.png")
	.bind('Click', function(){
		shopPage=1;
		Menu.hideShop();
	});

shopItemA = Crafty.e("2D, Canvas, Image, Mouse")
	.attr({x: 160, y: 60, w: 80, h: 80, z:7, visible:false})
	.image(shopImagesPath+"noItem.png")
	.bind('Click', function(){
		Menu.showItemDetails(itemArray[0]);
	});

shopItemB = Crafty.e("2D, Canvas, Image, Mouse")
	.attr({x: 210, y: 60, w: 80, h: 80, z:7, visible:false})
	.image(shopImagesPath+"noItem.png")
	.bind('Click', function(){
		Menu.showItemDetails(itemArray[1]);
		
	});

shopItemC = Crafty.e("2D, Canvas, Image, Mouse")
	.attr({x: 260, y: 60, w: 80, h: 80, z:7, visible:false})
	.image(shopImagesPath+"noItem.png")
	.bind('Click', function(){
		Menu.showItemDetails(itemArray[2]);
	});

shopItemD = Crafty.e("2D, Canvas, Image, Mouse")
	.attr({x: 160, y: 110, w: 80, h: 80, z:7, visible:false})
	.image(shopImagesPath+"noItem.png")
	.bind('Click', function(){
		Menu.showItemDetails(itemArray[3]);
	});

shopItemE = Crafty.e("2D, Canvas, Image, Mouse")
	.attr({x: 210, y: 110, w: 80, h: 80, z:7, visible:false})
	.image(shopImagesPath+"noItem.png")
	.bind('Click', function(){
		Menu.showItemDetails(itemArray[4]);
	});

shopItemF = Crafty.e("2D, Canvas, Image, Mouse")
	.attr({x: 260, y: 110, w: 80, h: 80, z:7, visible:false})
	.image(shopImagesPath+"noItem.png")
	.bind('Click', function(){
		Menu.showItemDetails(itemArray[5]);
	});
	
shopItemG = Crafty.e("2D, Canvas, Image, Mouse")
	.attr({x: 260, y: 110, w: 80, h: 80, z:7, visible:false})
	.image(shopImagesPath+"noItem.png")
	.bind('Click', function(){
		Menu.showItemDetails(itemArray[6]);
	});
	
shopItemH = Crafty.e("2D, Canvas, Image, Mouse")
	.attr({x: 260, y: 110, w: 80, h: 80, z:7, visible:false})
	.image(shopImagesPath+"noItem.png")
	.bind('Click', function(){
		Menu.showItemDetails(itemArray[7]);
	});

shopPageCount = Crafty.e("2D, Canvas,Text")
	.attr({x: 210, y: 160, w: 60, h: 60, z:7, visible:false})
	.text(shopPage+1);

shopBack = Crafty.e("2D, Canvas, Image, Mouse")
	.attr({x: 160, y: 160, w: 60, h: 60, z:7, visible:false})
	.image(shopImagesPath+"shopBack.png")
	.bind('Click', function(){
		if(shopPage>0){
			shopPage--;
			shopPageCount.text(shopPage+1);
			Menu.updateShop();
		}
	});

shopNext = Crafty.e("2D, Canvas, Image, Mouse")
	.attr({x: 260, y: 160, w: 60, h: 60, z:7, visible:false})
	.image(shopImagesPath+"shopNext.png")
	.bind('Click', function(){
		if((shopPage+1)<(shopItemArray.length/8)){
			shopPage++;
			shopPageCount.text(shopPage+1);
			Menu.updateShop();
		}
	});
	
	//relative positions of shopcomponents	
	consumerTab.x=shopWindow.x-consumerTab.w+6;
	consumerTab.y=shopWindow.y;
	producerTab.x=shopWindow.x-producerTab.w+6;
	producerTab.y=consumerTab.y+consumerTab.h;
	storageTab.x=shopWindow.x-storageTab.w+6;
	storageTab.y=producerTab.y+producerTab.h;
	exitShop.x=shopWindow.x+shopWindow.w-20;
	exitShop.y=shopWindow.y-25;
	shopLabel.x=shopWindow.x+30;
	shopLabel.y=shopWindow.y-30;
	//-------items 1.row--------
	shopItemA.x=shopWindow.x+30;
	shopItemA.y=shopWindow.y+30;
	shopItemB.x=shopItemA.x+shopItemA.w+30;
	shopItemB.y=shopItemA.y;
	shopItemC.x=shopItemB.x+shopItemB.w+30;
	shopItemC.y=shopItemB.y;
	shopItemD.x=shopItemC.x+shopItemC.w+30;
	shopItemD.y=shopItemC.y;
	//------items 2.row---------
	shopItemE.x=shopItemA.x;
	shopItemE.y=shopItemA.y+shopItemA.h+30;
	shopItemF.x=shopItemE.x+shopItemE.w+30;
	shopItemF.y=shopItemE.y;
	shopItemG.x=shopItemF.x+shopItemF.w+30;
	shopItemG.y=shopItemF.y;
	shopItemH.x=shopItemG.x+shopItemG.w+30;
	shopItemH.y=shopItemG.y;
	//---------------
	shopBack.x=shopWindow.x+shopWindow.w/2-shopBack.w-50;
	shopBack.y=shopWindow.y+shopWindow.h-shopBack.h-20;
	shopPageCount.x=shopBack.x+shopPageCount.w+30;
	shopPageCount.y=shopBack.y;
	shopNext.x=shopPageCount.x+shopNext.w;
	shopNext.y=shopPageCount.y;
};

MENU.prototype.updateShop = function(){
	
	//workaround
	for(var i=0;i<shopItemArray.length;){
		shopItemArray.pop();
	}
	
	if(consumerTab.z==7){
		//shopItemArray=loadConsumerShop //macht Makke
		for(var i=0;i<shopConsumerArray.length;i++){
			shopItemArray.push(shopConsumerArray[i]);
		}
	}
	else if(producerTab.z==7){
		//shopItemArray=loadProducerShop //macht Makke
		for(var i=0;i<shopProducerArray.length;i++){
			shopItemArray.push(shopProducerArray[i]);
		}
	}
	else if(storageTab.z==7){
		//shopItemArray=loadStorageShop //macht Makke
		for(var i=0;i<shopStorageArray.length;i++){
			shopItemArray.push(shopStorageArray[i]);
		}
	}

	// Filter
	if(consumerTab.z==7){
		//removes all items which the user already has, all items with a lower level and with a 2 or more levels greater than the own from the same type 
		for(var j=0;j<GS.consumer.length;j++){ // gehe durch jeden consumer
			for(var i=shopItemArray.length-1;i>=0;i--){ // gehe durch jedes shopelement		
				if(shopItemArray[i].type==GS.consumer[j].type){
					if(shopItemArray[i].level<=GS.consumer[j].level || shopItemArray[i].level>(GS.consumer[j].level)+1){
						shopItemArray.splice(i, 1);
					}
				}
			}
		}
		//remove all items which have a level greater than 1 and have a level 1 item of the same type
		for(var i=0;i<shopItemArray.length;i++){ // go through each shopelement	
			if(shopItemArray[i].level==1)
				for(var j=shopItemArray.length-1;j>=0;j--){
					if(shopItemArray[i].type==shopItemArray[j].type && shopItemArray[i].level<shopItemArray[j].level){
						shopItemArray.splice(j, 1);
						if(j<i)//move i to the correct item only if an item before was removed
							i--;
					}
				}
		}
	}
	else if(producerTab.z==7){
		//removes all items which the user already has, all items with a lower level and with a 2 or more levels greater than the own from the same type 
		for(var j=0;j<GS.producer.length;j++){ // gehe durch jeden producer
			for(var i=shopItemArray.length-1;i>=0;i--){ // gehe durch jedes shopelement		
				if(shopItemArray[i].pos==GS.producer[j].pos){
					if(shopItemArray[i].level<=GS.producer[j].level || shopItemArray[i].level>(GS.producer[j].level)+1){
						shopItemArray.splice(i, 1);
					}
				}
			}
		}
		//remove all items which have a level greater than 1 and have a level 1 item of the same type
		for(var i=0;i<shopItemArray.length;i++){ // go through each shopelement	
			if(shopItemArray[i].level==1)
				for(var j=shopItemArray.length-1;j>=0;j--){
					if(shopItemArray[i].pos==shopItemArray[j].pos && shopItemArray[i].level<shopItemArray[j].level){
						shopItemArray.splice(j, 1);
						if(j<i)//move i to the correct item only if an item before was removed
							i--;
					}
				}
		}
	}
	else if(storageTab.z==7){
		//removes all items which the user already has, all items with a lower level and with a 2 or more levels greater than the own from the same type 
		for(var j=0;j<GS.storage.length;j++){ // gehe durch jeden storage
			for(var i=shopItemArray.length-1;i>=0;i--){ // gehe durch jedes shopelement		
				if(shopItemArray[i].pos==GS.storage[j].pos){
					if(shopItemArray[i].level<=GS.storage[j].level || shopItemArray[i].level>(GS.storage[j].level)+1){
						shopItemArray.splice(i, 1);
					}
				}
			}
		}
		//remove all items which have a level greater than 1 and have a level 1 item of the same type
		for(var i=0;i<shopItemArray.length;i++){ // go through each shopelement	
			if(shopItemArray[i].level==1)
				for(var j=shopItemArray.length-1;j>=0;j--){
					if(shopItemArray[i].pos==shopItemArray[j].pos && shopItemArray[i].level<shopItemArray[j].level){
						shopItemArray.splice(j, 1);
						if(j<i)//move i to the correct item only if an item before was removed
							i--;
					}
				}
		}
	}
	//------------------------------
	
	for(var i=0;i<8;i++){
		itemArray[i]=shopItemArray[i+(shopPage*8)];
		if(itemArray[i]!=undefined)
			sItemArray[i].image(itemArray[i].picpath+"_shop.png");
		else
			sItemArray[i].image(shopImagesPath+"noItem.png");
	}	

};

MENU.prototype.showShop = function(){
	
	//shopConsumerArray=loadConsumerShop(); macht Makke
	//shopProducerArray=loadProducerShop(); macht Makke
	//shopStorageArray=loadStorageShop(); macht Makke
	

	
	if(itemDetailsOpen==false){
		for(var i=0;i<shopArray.length;i++){
			shopArray[i].visible=true;
		}
	}
};

MENU.prototype.hideShop = function(){

	for(var i=0;i<shopArray.length;i++){
		shopArray[i].visible=false;
	}		
};

//----------------| Itemdetails |-----------------
MENU.prototype.buildItemDetails = function(){
	
itemDetailsWindow = Crafty.e("2D, Canvas, Image,Mouse")
	.attr({x: 100, y: 300, w: 500, h: 320, z:8, visible:false})
	.image(shopImagesPath+"detailsWindow.png")
	.bind('Click',function(){});

itemDetailsLabel = Crafty.e("2D, Canvas, Image,Mouse")
	.attr({x: 100, y: 300, w: 500, h: 320, z:8, visible:false})
	.image(shopImagesPath+"itemDetails_label.png")
	.bind('Click',function(){});
	
itemDetailsPic = Crafty.e("2D, Canvas, Image")
	.attr({x: 120, y: 320, w: 40, h: 40, z:8, visible:false})
	.image(shopImagesPath+"noItem.png");
	
itemDetailsDiag = Crafty.e("2D, Canvas, Image,Mouse")
	.attr({x: 120, y: 320, w: 40, h: 40, z:8, visible:false})
	.image(shopImagesPath+"diagram.png")
	.bind('Click',function(){
		//TODO showDiagram()
	});
	
itemDetailsName = Crafty.e("2D, Canvas,Text")
	.attr({x: 180, y: 320, w: 100, h: 20, z:8, visible:false})
	.text("name");

itemDetailsLevel = Crafty.e("2D, Canvas,Text")
	.attr({x: 180, y: 350, w: 100, h: 20, z:8, visible:false})
	.text("level");

itemDetailsPrice = Crafty.e("2D, Canvas,Text")
	.attr({x: 180, y: 380, w: 100, h: 20, z:8, visible:false})
	.text("price");
//----------consumer----------------	
itemDetailsType = Crafty.e("2D, Canvas,Text")
	.attr({x: 180, y: 380, w: 100, h: 20, z:8, visible:false})
	.text("type");	

itemDetailsConsum = Crafty.e("2D, Canvas,Text")
	.attr({x: 180, y: 380, w: 100, h: 20, z:8, visible:false})
	.text("consum");	
	
itemDetailsNeeds = Crafty.e("2D, Canvas,Text")
	.attr({x: 180, y: 380, w: 100, h: 20, z:8, visible:false})
	.text("needs")
	.textColor('#009900');
//---------producer--------------
itemDetailsProduction = Crafty.e("2D, Canvas,Text")
	.attr({x: 180, y: 380, w: 100, h: 20, z:8, visible:false})
	.text("production");	
//---------storage---------------
itemDetailsCapacity = Crafty.e("2D, Canvas,Text")
	.attr({x: 180, y: 380, w: 100, h: 20, z:8, visible:false})
	.text("capacity");	
//-------------------------------
itemDetailsDescription = Crafty.e("2D, Canvas,Text")
	.attr({x: 180, y: 380, w: 100, h: 20, z:8, visible:false})
	.text("description");

buyButton = Crafty.e("2D, Canvas, Image, Mouse")
	.attr({x: 120, y: 410, w: 80, h: 40, z:8, visible:false})
	.image(menuImagesPath+"buybutton.png")
	.bind('Click', function(){
		Util.buyItem(chosenItem);
	});

declineButton = Crafty.e("2D, Canvas, Image, Mouse")
	.attr({x: 220, y: 410, w: 80, h: 40, z:10, visible:false})
	.image(menuImagesPath+"declinebutton.png")//
	.bind('Click', function(){
		Menu.hideItemDetails();
		itemDetailsOpen=false;
		chosenItem=0;
		Menu.showShop();
	});

	//relative positions of detailsview-components	
	itemDetailsWindow.x=windowWidth/2-itemDetailsWindow.w/2;
	itemDetailsWindow.y=windowHeight/2-itemDetailsWindow.h/2-30;
	itemDetailsLabel.x=itemDetailsWindow.x+30;
	itemDetailsLabel.y=itemDetailsWindow.y-30;
	itemDetailsPic.x=itemDetailsWindow.x+30;
	itemDetailsPic.y=itemDetailsWindow.y+30;
	itemDetailsDiag.x=itemDetailsPic.x;
	itemDetailsDiag.y=itemDetailsPic.y+itemDetailsPic.h+20;
	itemDetailsName.x=itemDetailsPic.x+itemDetailsPic.w+30;
	itemDetailsName.y=itemDetailsPic.y;
	itemDetailsLevel.x=itemDetailsName.x;
	itemDetailsLevel.y=itemDetailsName.y+itemDetailsLevel.h+10;
	itemDetailsPrice.x=itemDetailsLevel.x;
	itemDetailsPrice.y=itemDetailsLevel.y+itemDetailsPrice.h+10;	
	//-------consumer---------
	itemDetailsType.x=itemDetailsPrice.x;
	itemDetailsType.y=itemDetailsPrice.y+itemDetailsType.h+10;	
	itemDetailsConsum.x=itemDetailsType.x;
	itemDetailsConsum.y=itemDetailsType.y+itemDetailsConsum.h+10;	
	itemDetailsNeeds.x=itemDetailsConsum.x;
	itemDetailsNeeds.y=itemDetailsConsum.y+itemDetailsNeeds.h+10;
	//-------producer---------
	itemDetailsProduction.x=itemDetailsPrice.x;
	itemDetailsProduction.y=itemDetailsPrice.y+itemDetailsType.h+10;	
	//-------storage----------
	itemDetailsCapacity.x=itemDetailsPrice.x;
	itemDetailsCapacity.y=itemDetailsPrice.y+itemDetailsType.h+10;	
	//------------------------
	itemDetailsDescription.x=itemDetailsWindow.x+30;
	itemDetailsDescription.y=itemDetailsNeeds.y+itemDetailsDescription.h+10;	
	buyButton.x=itemDetailsWindow.x+itemDetailsWindow.w/2-buyButton.w-20;
	buyButton.y=itemDetailsWindow.y+itemDetailsWindow.h-buyButton.h-30;
	declineButton.x=itemDetailsWindow.x+itemDetailsWindow.w/2+20;
	declineButton.y=itemDetailsWindow.y+itemDetailsWindow.h-declineButton.h-30;
};

MENU.prototype.showItemDetails = function(Item){
	if(Item!=undefined){
		
		for(var i=0;i<itemDetailsArray.length;i++){
			itemDetailsArray[i].visible=true;
		}
		if(consumerTab.z!=7)
			itemDetailsDiag.visible=false;
		
		itemDetailsOpen=true;
		Menu.hideShop();
		chosenItem=Item;
		itemDetailsPic.image(Item.picpath+"_shop.png");
		itemDetailsName.text("Name: "+Item.name);
		itemDetailsLevel.text("Stufe: "+Item.level);
		itemDetailsPrice.text("Preis: "+Item.price+" €");	
		if(Item.price>GS.money)
			itemDetailsPrice.textColor('#FF0000'); //red
		else
			itemDetailsPrice.textColor('#000000'); //black
		if(consumerTab.z==7){
			itemDetailsProduction.visible=false;
			itemDetailsCapacity.visible=false;
			
			itemDetailsType.text("Typ: "+Item.type);
			itemDetailsConsum.text("Verbrauch: "+Item.watt+"W");
			itemDetailsNeeds.text(Item.playerneeds.name+" +"+Item.playerneeds.value);
		}
		else if(producerTab.z==7){
			itemDetailsType.visible=false;
			itemDetailsConsum.visible=false;
			itemDetailsNeeds.visible=false;
			itemDetailsCapacity.visible=false;
			
			itemDetailsProduction.text("Produktion: "+Item.kw+"W");
		}
		else if(storageTab.z==7){
			itemDetailsType.visible=false;
			itemDetailsConsum.visible=false;
			itemDetailsNeeds.visible=false;
			itemDetailsProduction.visible=false;
		
			itemDetailsCapacity.text("Kapazität: "+Item.capacity+"kW");
		}
		itemDetailsDescription.text(Item.tooltip);
	}
};

MENU.prototype.hideItemDetails = function(){

		for(var i=0;i<itemDetailsArray.length;i++){
			itemDetailsArray[i].visible=false;
		}
};

//----------------| Alert |-----------------
MENU.prototype.buildAlert=function(){

alertWindow = Crafty.e("2D, Canvas, Image, Mouse")
	.attr({x: windowWidth/2-120, y: windowHeight/2-100, w: 240, h: 150, z:9, visible:false})
	.image(menuImagesPath+"alert.png")
	.bind('Click', function(){});
	
alertHeadline = Crafty.e("2D, Canvas,Text")
	.attr({x: alertWindow.x+10, y: alertWindow.y+10, w: 100, h: 20, z:10, visible:false})
	.text("headline");
	
alertMessage = Crafty.e("2D, Canvas,Text")
	.attr({x: alertHeadline.x, y: alertHeadline.y+50, w: 100, h: 20, z:10, visible:false})
	.text("message");
	
alertIcon = Crafty.e("2D, Canvas, Image")
	.attr({x: alertWindow.x+alertWindow.w-40-10, y: alertMessage.y-10, w: 40, h: 40, z:10, visible:false})
	.image(menuImagesPath+"info.png");
	
alertButton = Crafty.e("2D, Canvas, Image, Mouse")
	.attr({x: windowWidth/2-30, y: alertWindow.y+alertWindow.h-40-10, w: 60, h: 40, z:10, visible:false})
	.image(menuImagesPath+"okaybutton.png")
	.bind('Click', function(){
		Menu.hideAlert();
	});	
};

MENU.prototype.alert=function(headline,message,icon){
	alertWindow.visible=true;
	alertHeadline.visible=true;
	alertMessage.visible=true;
	alertIcon.visible=true;
	alertButton.visible=true;
	
	alertHeadline.text(headline);
	alertMessage.text(message);
	alertIcon.image(menuImagesPath+icon+".png");
};

MENU.prototype.hideAlert=function(){//private
	alertWindow.visible=false;
	alertHeadline.visible=false;
	alertMessage.visible=false;
	alertIcon.visible=false;
	alertButton.visible=false;
};

