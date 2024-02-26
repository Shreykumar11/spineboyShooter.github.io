export class Basket {

    constructor(app) {

        this.app = app;

        this.container = new PIXI.Container();     // container for spineboy, basket and ball

        this.winingCount = 0;
    }


    // setting up basket png in the container
    basketSprite() {

        this.basket = PIXI.Sprite.from('examples/assets/basket.png');
        this.basket.scale.set(0.5);
        this.basket.x = this.app.screen.width / 1.3;
        this.basket.y = this.app.screen.height / 1.55;
        this.basket.width = 150;
        this.basket.height = 160;
        this.container.addChild(this.basket);
    }


    basketCounter(onBasketFull) {

        this.winingCount++;

        if (this.winingCount % 5 === 0) {

            onBasketFull();
        }
    }
}