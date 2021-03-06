class Drop {
    constructor(props) {
        this.initX = function() {
            this.x = random() * width;
        };
        this.initY = function() {
            this.y = -random() * height / 3; // Initialise rain somewhat off the screen
        };

        this.initX();
        this.y = random() * height;

        this.length = random() * 10;
        this.speed = random();

        this.drawAndDrop = function() {
            this.draw();
            this.drop();
        };

        this.draw = function() {
            stroke(CON.COLOR.rain);
            strokeWeight(2);
            line(this.x, this.y, this.x, this.y + this.length);
        };

        this.drop = function() {
            if (this.y < height) {
                this.y += this.speed;
                this.speed += CON.VALUE.acceleration;
            } else {
                this.speed = random();
                this.initY();
                this.initX();
            }
        };
    }
}

class Rain {
    constructor(props) {
        this.drops = [];
        this.rain_num = CON.VALUE.rain_num;
    }

    init() {
        for (var i = 0; i < this.rain_num; i++) {
            this.drops.push(new Drop());
        }
    }

    setAmount(amount) {
        this.rain_num = int(amount * 10);

        this.drops = [];
        this.init();
    }

    draw() {
        this.drops.forEach(function(d) {
            d.drawAndDrop();
        });
    }
}
