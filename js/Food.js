class Food {
    constructor() {
        this.foodStock = 20;
        this.lastFed;
        this.image = loadImage("images/Milk.png");
    }

    getFoodStock() {
        return this.foodStock;
    }

    updateFoodStock(foodStock) {
        this.foodStock = foodStock
    }

    deductFood() {
        if(this.foodStock>0) {
            this.foodStock-=1;
        }
    }

    display() {
        var x=500, y= 170;

        imageMode(CENTER);

        if(this.foodStock!=0) {
            for(var i=0; i<this.foodStock; i++) {
                if(i%10 == 0) {
                    x = 80;
                    y+=50;
                }
                image(this.image,x,y,50,50);
                x+=30;
            }
        }
    }
}