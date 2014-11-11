SCENE = function(){};
var Scene = new SCENE();
var tv,hifi,telephone;
var background;

var destX=false;
var destY=false;
var move=false;
var clickPosX=0;
var clickPosY=0;
var character;
var charWidth = 120;
var charHeight = 362;

SCENE.prototype.buildChar = function(){

character=Crafty.e("2D, Canvas, Image")
	.attr({x: windowWidth/2-charWidth/2, y: 400, w: 30, h: 30})
	.image(charImagesPath+"char.png");
	
//---Character-movement---
//TODO im verhältnis bewegen
Crafty.e("2D, Canvas")
	.attr({x: 10, y: 70, w: 20, h: 20, visible:false})
	.bind('EnterFrame', function(){
		if(move==true){
			if(character._x+charWidth/2!=clickPosX){
				if(character._x+charWidth/2>clickPosX){
					character.x--;
				}
				else{
					character.x++;
				}
			}
			else{
				destX=true;
			}
			if(character._y+charHeight!=clickPosY){
				if(character._y+charHeight>clickPosY){
					character.y--;
				}
				else{
					character.y++;
				}
			}
			else{
				destY=true;	
			}
			if(destX==true&&destY==true){
				move=false;
			}	
		}		
	});
};

SCENE.prototype.buildLivingroom = function(){

//floor
Crafty.e("2D,Canvas,Color,Mouse")
	.attr({x:0, y: 480, w: windowWidth, h: 350, alpha:0.0})
	.color("blue")
	.bind('Click', function(){
		move=true;
		destY=false;
		destX=false;
		clickPosX=mousePosX;
		clickPosY=mousePosY;
	});

//TODO floorborders

background = Crafty.e("Background, 2D, Canvas, Image")
	.image(sceneImagesPath+"wohnzimmer.png")
	.attr({x: 0, y: 0,height:0, width:0});

tv = Crafty.e("2D, Canvas, Image,Mouse")
	.attr({x: 130, y: 400, w: 100, h: 100})
	.image("")
	.bind("MouseOver",function(){
		Util.showTooltipConsumer("tv");
	})
	.bind("MouseOut",function(){
		tip=false;
	})
	.bind('Click',function(){
		Util.addNeeds("tv");
		Menu.updateStatsMenu();
		//if(activ==false)
		//activate(tv);
		//else
		//deactivate(tv);
	});

hifi = Crafty.e("2D, Canvas, Image,Mouse")
	.attr({x: 400, y: 270, w: 100, h: 100})
	.image(shopImagesPath+"blank.png")
	.bind("MouseOver",function(){
		Util.showTooltipConsumer("hifi");
	})
	.bind("MouseOut",function(){
		tip=false;
	});
	
telephone = Crafty.e("2D, Canvas, Color,Mouse")
	.attr({x: 680+25, y: 270+50, w: 50, h: 50})
	.color("yellow")
	.bind("MouseOver",function(){
		Util.showTooltipConsumer(4);
	})
	.bind("MouseOut",function(){
		tip=false;
	})
	.bind("Click",function(){
		shopPage=0;
		shopPageCount.text(shopPage+1);
		Menu.showShop();
		Menu.updateShop();
	});
	

};

