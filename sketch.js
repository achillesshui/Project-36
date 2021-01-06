//Create variables here
var dog, happyDog;
var database;
var foodS, foodStock;
var fedTime, lastFed;
var foodObj;
var feed, addFood;

function preload()
{
  //load images here
  dogIMG = loadImage("images/Dog.png");
  happyDog = loadImage("images/happydog.png");
}

function setup() {
  database = firebase.database();
  createCanvas(1000, 400);
  
  foodObj = new Food();

  foodStock = database.ref('food');
  foodStock.on("value", readFoodS, showError);

  dog = createSprite(550,250,20,20);
  dog.addImage(dogIMG);
  dog.scale = 0.3;

  feed = createButton("Feed The Dog");
  feed.position(900,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(1000,95);
  addFood.mousePressed(addFoods);
}


function draw() {  
  background(46, 139, 87);

  foodObj.display();

  fedTime = database.ref('feedTime');
  fedTime.on("value", function(data){
    lastFed = data.val();
  })

  //add styles here

  fill(255,255,254);
  textSize(15);
  if(lastFed>=12) {
    text("Last Fed: "+ lastFed%12 + " PM", 350, 60);
  }
  else if(lastFed == 0) {
    text("Last Fed: 12 AM", 350, 60);
  }
  else{
    text("Last Fed: "+ lastFed + " AM", 350, 60);
  }

  drawSprites();
}

function showError() {
  console.log("there is error in database")
}

function readFoodS(data) {
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}

function addFoods() {
  foodS++;
  database.ref('/').update({
    'food' :foodS
  })
}

function feedDog() {
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    'food': foodObj.getFoodStock(),
    'feedTime': hour()
  })
}

