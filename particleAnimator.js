export class ParticleAnimation {

    constructor(app) {

        this.app = app;

        // container for win particles
        this.particleContainer = new PIXI.ParticleContainer();

        this.particle = 'examples/assets/coin.png';
    }

    // win particles drawing function
    winParticles() {

        //Pixi Emitter
        this.emitter = new PIXI.particles.Emitter(
            
            this.particleContainer, [PIXI.Texture.from(this.particle)],
            
            {
                //Starting and End Alpha 0 - 1
                "alpha": {
                    "start": 1,
                    "end": 1
                },
                
                //Starting and Ending Size with randomness
                "scale": {
                    "start": 0.7,
                    "end": 0.7,
                    "minimumScaleMultiplier": 0
                },
                
                //Starting and Ending Color
                "color": {
                    "start": "#ffffff",
                    "end": "#ffffff"
                },
                
                //Starting and Ending Speed with random
                "speed": {
                    "start": 200,
                    "end": 300,
                    "minimumSpeedMultiplier": 0
                },
                
                //Directional Drift
                "acceleration": {
                    "x": 0,
                    "y": 30
                },
                
                //Maximum speed or Drift
                "maxSpeed": 0,
                
                //Direction of movement 0 360
                "startRotation": {
                    "min": 0,
                    "max": 360
                },
                
                //Allows to disable auto rotation based on drift
                "noRotation": false,
                
                //Force Rotation Speed Randomness - Positive or Negative = direction
                "rotationSpeed": {
                    "min": 100,
                    "max": 100
                },
                
                //Lifetime of Particle Randomness
                "lifetime": {
                    "min": 200,
                    "max": 400
                },
                
                //Blending Mode
                "blendMode": "normal",
                
                //How Quickly New Particles Are Generated
                "frequency": 0.01,
                
                //How Long the Particles Are Generated 
                "emitterLifetime": -1,
                
                //Maximum Paticles at a Time
                "maxParticles": 300,
                
                //Starting Position of emitter
                "pos": {
                    "x": this.app.renderer.width/2,
                    "y": 0
                },
                
                //If particles should be added to the back of the display
                "addAtBack": false,
                
                //Emitter Type with properties
                "spawnType": "circle",
                "spawnCircle": {
                    "x": 0,
                    "y": 0,
                    "w": this.app.screen.width,
                    "h": 0
                }
            });
            
        // console.log(emitter);

        // current time
        this.elapsed = Date.now();

        // update frame
        var update = () => {
            
            // Update the next frame
            requestAnimationFrame(update);
            
            this.now = Date.now();
            
            // The emitter requires the elapsed seconds
            this.emitter.update((this.now - this.elapsed) * 0.001);
            this.elapsed = this.now;
            
            this.app.stage.addChild(this.particleContainer);
            
        };
            
        // Start emitting
        this.emitter.emit = true;

        //  // Start the update
        update();
    }
}