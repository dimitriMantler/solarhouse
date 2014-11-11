var windowHeight = 768;
var windowWidth = 1024;
var sceneImagesPath ="../res/scenes/";
var menuImagesPath ="../res/menu/";
var charImagesPath ="../res/char/";
var shopImagesPath ="../res/shop/";
var itemsImagesPath ="../res/items/";

function loadGame (){
Crafty.init(windowWidth, windowHeight);

prog = Crafty.e("2D, Canvas, Text")
	.attr({x: 10, y: 10, w: 1, h: 20, visible:true})
	.text("");
	
src = Crafty.e("2D, Canvas, Text")
	.attr({x: 10, y: 30, w: 1, h: 20, visible:true})
	.text("");
	
progbar = Crafty.e("2D, Canvas, Color")
	.attr({x: 10, y: 50, w: 1, h: 20, visible:true})
	.color("green");

Crafty.load([// alle ressourcen eintragen
			charImagesPath+"char.png",
			itemsImagesPath+"hifi1.png",
			itemsImagesPath+"tv2.png",
			itemsImagesPath+"tv2_shop.png",
			itemsImagesPath+"tv1.png",
			itemsImagesPath+"panel2_0.png",
			itemsImagesPath+"panel2_1_shop.png",
			itemsImagesPath+"panel1_1.png",
			itemsImagesPath+"battery1_2_shop.png",
			itemsImagesPath+"battery2_1_shop.png",
			itemsImagesPath+"battery3_1_shop.png",
			menuImagesPath+"gameMenu.png",
			menuImagesPath+"gameMenubutton.png",
			menuImagesPath+"kitchen.png",
			menuImagesPath+"living.png",
			menuImagesPath+"logout.png",
			menuImagesPath+"menu.png",
			menuImagesPath+"menubutton.png",
			menuImagesPath+"needsGreenEnd.png",
			menuImagesPath+"needsRed.png",
			menuImagesPath+"roof.png",
			menuImagesPath+"save.jpg",
			menuImagesPath+"sleep.png",
			menuImagesPath+"statsMenu.png",
			menuImagesPath+"statsMenubutton.png",
			menuImagesPath+"toggleSound.png",
			menuImagesPath+"work.png",
			sceneImagesPath+"roof_summer.png",
			sceneImagesPath+"sky_midday.png",
			sceneImagesPath+"wohnzimmer.png",
			shopImagesPath+"shopBack.png",
			shopImagesPath+"shopNext.png",
			shopImagesPath+"closeShop.png",
			shopImagesPath+"consumerTab.png",
			shopImagesPath+"detailsWindow.png",
			shopImagesPath+"diagram.png",
			shopImagesPath+"noItem.png",
			shopImagesPath+"producerTab.png",
			shopImagesPath+"shop.png",
			shopImagesPath+"storageTab.png",
			 ],
    function() {
        //when loaded
		Util.delay(500);
		prog.visible=false;
		progbar.visible=false;
		src.visible=false;
        startGame();
		
    },

    function(e) {
	   //progress
	   progbar.w=2*e.percent;
	   prog.text(e.loaded+"/"+e.total+" "+e.percent+"%");
	   
	   src.text(e.src);
      
    },

    function(e) {
      //error loading
	  console.log("cant find "+e.src);
    }
);

};

function startGame (){
//-----------| Init |------------------
Crafty.e("2D,Canvas,Text")
.textFont({family: 'Verdana',size: '12px', weight: 'bold'});

Testdaten.loadSavestate();
Scene.buildLivingroom();
Util.updateAllConsumers();
Scene.buildChar();
Util.tooltip();
Menu.buildMenus();
Util.componentsToArray();
Menu.updateShop();
};