export class Button {

    constructor(app, feature, x, y, myCallBack) {

        this.app = app;
        this.feature = feature;
        this.x = x;
        this.y = y;
        this.myCallBack = myCallBack;

        // container for button
        this.buttonContainer = new PIXI.Container();

        this.textureButton = PIXI.Texture.from('examples/assets/button.png');
    
        this.skewStyle = new PIXI.TextStyle({
            fontFamily: 'Arial',
            fill: ['#ffffff'],
            stroke: '#004620',
            fontSize: 30,
            fontWeight: 'lighter',
            lineJoin: 'round',
            strokeThickness: 12,
        });

        this.createButton();
    }

    // button feature for action, aim, shoot
    createButton() {
    
        this.button = new PIXI.Sprite(this.textureButton);
        this.skewText = new PIXI.Text(this.feature, this.skewStyle);

        // console.log(this.button, this.skewText);

        this.button.name = this.feature;

        this.skewText.anchor.set(0.5);
        this.skewText.x = 0;
        this.skewText.y = 0;

        this.button.anchor.set(0.5);
        this.button.x = 0;
        this.button.y = 0;
        this.button.width = 200;
        this.button.height = 70;

        // add it to the button container
        this.buttonContainer.addChild(this.button);
        this.buttonContainer.addChild(this.skewText);

        // add button container to stage
        this.app.stage.addChild(this.buttonContainer);

        // buttn container positioning and making interactive
        this.buttonContainer.position.set(this.x, this.y - 30);
        this.buttonContainer.interactive = true;
        this.buttonContainer.cursor = 'pointer';

        // Press the button to play the animation
        this.buttonContainer.on('pointertap', this.myCallBack);
    }
}