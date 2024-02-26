export class Projectile {

    constructor(app, container) {

        this.app = app;
        this.container = container;
    }


    // ball drawing
    createBullet() {

        // setting up ball
        this.ball = PIXI.Sprite.from('examples/assets/ball.png');
        this.ball.scale.set(0.5);
        this.ball.x = this.app.screen.width / 3.05;
        this.ball.y = this.app.screen.height / 2.35;
        this.ball.width = 25;
        this.ball.height = 25;

        this.container.addChild(this.ball);
        // return this.ball;
    }


    // projectile
    projection(basket) {

        return new Promise((resolve, reject) => {

            this.createBullet();

            let initialBallXPosition = this.ball.x;
            let initialBallYPosition = this.ball.y;
            let initialCurveXPosition = initialBallXPosition - this.ball.width;
            let initialCurveYPosition = initialBallYPosition + this.ball.height/2;

            const P0 = { x: -this.container.width/2 - initialCurveXPosition, y: initialCurveYPosition }, 
                    P1 = { x: ((basket.x + basket.width/2) - (initialBallXPosition + this.ball.width/2)), y: 0 },
                    P2 = { x: (basket.x + basket.width/2), y: (basket.y + basket.height/10) };

            this.ball.alpha = 1;

            let elapsedTime = 0.0;

            let maximumTimeToReachBasket = 2000;    // time in mili-seconds

            var update;

            this.app.ticker.add(update = () => {

                elapsedTime += this.app.ticker.elapsedMS;

                if (elapsedTime <= maximumTimeToReachBasket) {

                    console.log(elapsedTime);

                    let time = elapsedTime / maximumTimeToReachBasket;

                    let x = Math.pow(1-time, 2) * P0.x + 2 * (1-time) * P1.x + Math.pow(time, 2) * P2.x; 
                    let y = Math.pow(1-time, 2) * P0.y + 2 * (1-time) * P1.y + Math.pow(time, 2) * P2.y;

                    this.ball.x = x;
                    this.ball.y = y;

                    console.log(this.ball.x, this.ball.y);                
                }
                else {

                    this.app.ticker.remove(update);
                    this.ball.destroy();
                    resolve("Goal!!");
                    console.log('***********');
                }
            });
        });
    }
}