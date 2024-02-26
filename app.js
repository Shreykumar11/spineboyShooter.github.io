import { BackgroungImages } from './background.js';
import { Basket } from './basket.js';
import { SpineBoy } from './spineboy.js';
import { Button } from './buttons.js';
import { ParticleAnimation } from './particleAnimator.js';
import { Music } from './music.js';
import { Gsap } from './gsap.js';


const app = new PIXI.Application({ width: window.innerWidth, height: window.innerHeight });
document.body.appendChild(app.view);

// to enable pixi-devtools
globalThis.__PIXI_APP__ = app;

export class App {

    constructor() {

        this.winingCount = 0;
    }
    

    prepareStage() {

        this.basket = new Basket(app);
        this.animator = new ParticleAnimation(app);
        this.bgAssets = new BackgroungImages(app);
        this.shutter = new Music(app);
        this.boy = new SpineBoy(app, this.basket.container);
        this.cloud = new Gsap(app);

        this.bgAssets.bgSprite();
        this.basket.basketSprite();
        this.cloud.gsapAnimation(); // gsap animation
        this.boy.spineBoyJSONLoad();
        this.shutter.backgroundMusic();

        this.actionButton = new Button(app, 'Action', 350, app.screen.height, this.onAction.bind(this));
        this.aimButton = new Button(app, 'Aim', 650, app.screen.height, this.onAim.bind(this));
        this.shootButton = new Button(app, 'Shoot', 950, app.screen.height, this.onShoot.bind(this));
    }


    onAction() {

        this.boy.actionFeature();
        this.shutter.featureMusic().play('escape');
    }


    onAim() {

        this.boy.aimFeature();
        this.shutter.featureMusic().play('aim ping');
    }


    async onShoot() {

        this.shutter.featureMusic().play('shot');
        await this.boy.shootFeature(this.basket.basket);
        this.shootButton.buttonContainer.interactive = false;
        this.onbasket();
    }


    onbasket() {

        this.basket.basketCounter(this.onBasketFull.bind(this));
        this.shootButton.buttonContainer.interactive = true;
        this.shutter.applauseMusic();
    }


    onBasketFull() {

        console.log("win");        
        this.shutter.particleMusic();
        this.animator.winParticles();
        app.stage.addChild(this.animator.particleContainer);
    }
}

const main = new App();
main.prepareStage();