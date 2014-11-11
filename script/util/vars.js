/*************************************************************************
 * Marvs Vars *
 **************/
//Gamesession Object
var GS = null;
/************************************************************************* 
 * END *
 *******/
 
 /************************************************************************* 
 * Markus Vars *
 ***************/
 /************************************************************************* 
 * END *
 *******/
 
 /************************************************************************* 
 * Dimitris Vars *
 *****************/
 //--------| gui/game.js |---------------
 //Resolution of the canvaselement
var windowHeight = 768;
var windowWidth = 1024;
//Paths to the ressources
var sceneImagesPath ="../res/scenes/";  
var menuImagesPath ="../res/menu/";
var charImagesPath ="../res/char/";
var shopImagesPath ="../res/shop/";
var itemsImagesPath ="../res/items/";
//--------| gui/menu.js |--------------
//Needs - local - temporary
var hunger=0;
var lifestyle=0;
var sleep=0;
var work=0;
//Needs-satuaritybar in the statsmenu
var lifestyleSat,hungerSat,sleepSat,workSat;
//Displays the current money in the statsmenu
var myMoney;

//shop-vars
//The current shopPage-1, also for access of the sItemArray
var shopPage=0;
//Contains the shopelements for hide-/show-shop
var shopArray;
//Contains the crafty-objects where the items have to be displayed
var sItemArray; //für updateShop
//Contains the actual items displayed in the shop 
var itemArray=new Array(); //für updateShop
//Crafty-shopcomponents
var consumerTab,producerTab,storageTab,shopWindow,shopLabel;
var exitShop,shopItemA,shopItemB,shopItemC,shopItemD,shopItemE;
var shopItemF,shopItemG,shopItemH,shopBack,shopNext,shopPageCount;

// itemdetails-vars
//hinders the shop to be activates if the itemdetailsview is still activ
var itemDetailsOpen=false;
//Contains the itemdetailselements for hide-/show-itemdetails
var itemDetailsArray;
//Crafty-itemDetailscomponents
var itemDetailsWindow,itemDetailsLabel,itemDetailsPic;
var itemDetailsDiag,itemDetailsName,itemDetailsPrice,itemDetailsLevel;
var itemDetailsType,itemDetailsConsum,itemDetailsNeeds;
var itemDetailsProduction,itemDetailsCapacity;
var itemDetailsDescription,buyButton,declineButton;

//Forwards the selected item from the shop for buying it   
var chosenItem=0;

//---------| gui/scene.js |---------------------

//Consumer-craftyobjects
var tv,hifi,telephone;
//Current background 
var background;
//Character-craftyobject
var character;

var destX=false;
var destY=false;
var move=false;

//the last position where the user has been clicked on the floor, also forwarded to mousePosX/Y for touchcontrol
var clickPosX=0;
var clickPosY=0;
//The dimension of the Character for correct placement
var charWidth = 120;
var charHeight = 362;

//----------| gui/util.js |---------------------
//The current mouseposition
var mousePosX = 0;
var mousePosY = 0;
//Tooltip-craftyobject
var tooltip;
//Get the current item pointed with the mouse 
var item=0;
//Triggers the tooltip to be (not)visible
var tip=false; 
 /************************************************************************* 
 * END *
 *******/
 