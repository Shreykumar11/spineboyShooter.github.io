import { Projectile } from "./projectile.js";

export class SpineBoy {

    constructor(app, container) {

        this.app = app;
        this.container = container;     // container for spineboy, basket and ball

        this.parabola = new Projectile(app, container);
    
        this.singleAnimations = ['aim', 'portal'];
        this.loopAnimations = ['shoot'];
    }


    spineBoyJSONLoad() {

        PIXI.loader.add('boy','examples/assets/pixi-spine/spineboy-pro.json').load((loader, spineboyAsset) => {

            // console.log(new PIXI.spine.Spine(spineboyAsset.boy.spineData));

            // create a spine boy
            this.spineBoyPro = new PIXI.spine.Spine(spineboyAsset.boy.spineData);

            // console.log(this.spineBoyPro);

            // set the position
            this.spineBoyPro.x = this.app.screen.width / 4;
            this.spineBoyPro.y = this.app.screen.height - 64;

            this.spineBoyPro.scale.set(0.5);

            this.container.addChild(this.spineBoyPro);
        });

        this.app.stage.addChild(this.container);
    }


    // spineboy action feature
    actionFeature() {

        console.log('action');
        
        let animation = 'portal';
        
        this.spineBoyPro.state.setAnimation(0, animation, this.loopAnimations.includes(animation));
    }

    
    // spineboy aim feature
    aimFeature() {

        console.log('aim');
        
        let animation = 'aim';

        this.spineBoyPro.state.setAnimation(0, animation, this.loopAnimations.includes(animation));
    }

    
    // spineboy shoot feature
    async shootFeature(basket) {

        console.log('shoot');
        
        let animation = 'shoot';
        
        this.spineBoyPro.state.setAnimation(0, animation, this.singleAnimations.includes(animation));

        await this.parabola.projection(basket);
    }
}