export class BackgroungImages {

    constructor(app) {

        this.app = app;

        // resizing the window
        window.addEventListener('resize', function() {
            app.stage.width = window.innerWidth;
            app.stage.height = window.innerHeight;
        })
    }

    // setting up background image
    bgSprite() {

        this.bg = PIXI.Sprite.from('examples/assets/bg1.jpg');
        this.bg.anchor.set(0.5);
        this.bg.x = this.app.screen.width / 2;
        this.bg.y = this.app.screen.height / 2;
        this.app.stage.addChild(this.bg);
    }
}