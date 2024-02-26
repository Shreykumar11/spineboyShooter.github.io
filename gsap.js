export class Gsap {

    constructor(app) {

        this.app = app;
    }

    // GSAP animations
    gsapAnimation() {

        // cloud animation using gsap
        this.cloud = PIXI.Sprite.from('examples/assets/cloud.png');
        this.cloud.width = 100;
        this.cloud.height = 100;
        gsap.to( this.cloud, { 
            // scale: 0.1,
            x: this.app.screen.width, 
            y: 0,  
            ease: "power1.inOut", 
            delay: 1,
            duration: 5,
            repeat: -1,         //Repeats infinitely if set to -1
            repeatDelay: 0.5,
            yoyo: true          //animation goes back and forth seamlessly
        });
        
        // console.log('finished');
        this.app.stage.addChild(this.cloud);

        // cloud animation using gsap - timelineMax()
        this.cloud1 = PIXI.Sprite.from('examples/assets/cloud.png');
        this.cloud1.width = 100;
        this.cloud1.height = 100;
        this.t1 = new TimelineMax();
        this.t1.from(this.cloud1, { 
            x: this.app.screen.width, 
            y: 0, 
            ease: "power1.out", 
            delay: 1,
            duration: 5,
            repeat: -1,
            repeatDelay: 0.5,
            yoyo: true
        });
        this.app.stage.addChild(this.cloud1);
    }
}