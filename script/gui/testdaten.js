TESTDATEN = function(){};
var Testdaten = new TESTDATEN();

var GS;

TESTDATEN.prototype.loadSavestate = function(){

 GS={
	"money":4000,
	"storedEnergy":500,
	"consumer":[tv1],
	"producer":[panel1_1],
	"storage":[battery3_1],
	};
};

//-----------Consumer----------------		 

tv1={
     "iconsumer": 1,
	 "name":"Gründig F1",
	 "type":"tv",
	 "level": 1,
	 "watt": 100,
     "price":200,
	 "playerneeds":{"name":"lifestyle","value":5},
	 "x":130,
	 "y":400,
	 "tooltip":"hallo ich bin das erste item",
	 "picpath":itemsImagesPath+"tv1"
	 };
	 
tv2={
	 "iconsumer": 2,
	 "name":"LX 2000",
	 "type":"tv",
	 "level": 2,
	 "watt": 500,
     "price":800,
	 "playerneeds":{"name":"lifestyle","value":30},
	 "x":140,
	 "y":400,
	 "tooltip":"Dieses Gerät bringt dir endlich den langersehnten lifestyle ins haus!",
	 "picpath":itemsImagesPath+"tv2"
	 }; 
	 
tv3={
	 "iconsumer": 3,
	 "name":"Loewe MX701",
	 "type":"tv",
	 "level": 3,
	 "watt": 1000,
     "price":2000,
	 "playerneeds":{"name":"lifestyle","value":50},
	 "x":130,
	 "y":400,
	 "tooltip":"Sehr flach, sehr teuer und ein echter Stromfresser!",
	 "picpath":itemsImagesPath+"tv3"
	 }; 

hifi1={
	 "iconsumer": 4,
	 "name":"Boose Sounds",
	 "type":"hifi",
	 "level": 1,
	 "watt": 50,
     "price":100,
	 "playerneeds":{"name":"lifestyle","value":10},
	 "x":420,
	 "y":330,
	 "tooltip":"Naja wenigstens ein Kassettendeck hat es",
	 "picpath":itemsImagesPath+"hifi1"
	 }; 
	 
hifi2={
	 "iconsumer": 5,
	 "name":"Groundshock 2",
	 "type":"hifi",
	 "level": 2,
	 "watt": 500,
     "price":500,
	 "playerneeds":{"name":"lifestyle","value":25},
	 "x":415,
	 "y":305,
	 "tooltip":"Auf dem neusten Stand der Technik",
	 "picpath":itemsImagesPath+"hifi2"
	 };
	 
hifi3={
	 "iconsumer": 6,
	 "name":"1000W machine",
	 "type":"hifi",
	 "level": 3,
	 "watt": 5000,
     "price":1500,
	 "playerneeds":{"name":"lifestyle","value":50},
	 "x":383,
	 "y":282,
	 "tooltip":"Ein echter Trommelfellvernichter",
	 "picpath":itemsImagesPath+"hifi3"
	 };

telephone1={
	 "iconsumer": 7,
	 "name":"Drehscheibe 42",
	 "type":"telephone",
	 "level": 1,
	 "watt": 20,
     "price":10,
	 "playerneeds":{"name":"lifestyle","value":5},
	 "x":130,
	 "y":400,
	 "tooltip":"Endlich Kontakt zur Aussenwelt",
	 "picpath":itemsImagesPath+"telephone1"
	 };

telephone2={
	 "iconsumer": 8,
	 "name":"Comfortel",
	 "type":"telephone",
	 "level": 2,
	 "watt": 100,
     "price":100,
	 "playerneeds":{"name":"lifestyle","value":10},
	 "x":130,
	 "y":400,
	 "tooltip":"Genies die Freiheit, endlich schnurlos zu sein",
	 "picpath":itemsImagesPath+"telephone2"
	 };
	 
telephone3={
	 "iconsumer": 9,
	 "name":"Business AllinOne",
	 "type":"telephone",
	 "level": 3,
	 "watt": 300,
     "price":300,
	 "playerneeds":{"name":"lifestyle","value":15},
	 "x":130,
	 "y":400,
	 "tooltip":"Jetzt auch mit integriertem Faxgerät",
	 "picpath":itemsImagesPath+"telephone3"
	 };


//-----------Producer----------------
panel1_1={
	"iproducer": 1,
	"name": "kleines Panel rechts",
	"pos":1,
	"level":1,
	"price":3000,
	"kw":1000,
	"tooltip":"ein kleines Panel",
	"picpath":itemsImagesPath+"panel1_1"
};

panel2_1={
	name: "kleines Panel mitte",
	pos:2,
	level:1,
	price:3000,
	kw:1000,
	tooltip:"Ein kleines Panel",
	picpath:itemsImagesPath+"panel2_1"
};


//-----------Storage-----------------
battery1_2={name:"medium Akku rechts",
	 pos: 1,
	 level:2,
     price:2000,
	 capacity:2000,
	 tooltip:"Ein größerer Akku",
	 picpath:itemsImagesPath+"battery1_2"
	 };
	 
battery2_1={name:"kleiner Akku mitte",
	 pos: 2,
	 level:1,
     price:500,
	 capacity:2000,
	 tooltip:"Ein kleiner Akku",
	 picpath:itemsImagesPath+"battery2_1"
	 };
	 
battery3_1={name:"kleiner Akku links",
     pos: 3,
	 level:1,
     price:500,
	 capacity:500,
	 tooltip:"Ein kleiner Akku",
	 picpath:itemsImagesPath+"battery3_1"
	 };

var shopItemArray=new Array();
var shopConsumerArray=new Array(tv2,hifi2,hifi1,hifi3);
var shopProducerArray=new Array(panel2_1);
var shopStorageArray=new Array(battery1_2,battery2_1,battery3_1,battery2_1,battery2_1,battery2_1,battery2_1,battery2_1,battery2_1,battery2_1,battery2_1,battery2_1);
//shopItemArray=shopConsumerArray;
