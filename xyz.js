
const app = new PIXI.Application({ width: window.innerWidth, height: window.innerHeight});
document.body.appendChild(app.view);

app.view.style.position = "absolute";
app.autoResize = true;
//  app.resizeTo(window.innerWidth, window.innerHeight);

var container = new PIXI.Container();

//Particle Images
// var particle = 'https://raw.githubusercontent.com/kittykatattack/learningPixi/master/examples/images/cat.png';
const particle = 'examples/assets/coin.png';

//Pixi Emitter
const emitter = new PIXI.particles.Emitter(
	
	container, [PIXI.Texture.from(particle)],
	
	{
		
		//Starting and End Alpha 0 - 1
		"alpha": {
		"start": 1,
		"end": 1
		},
		
		//Starting and Ending Size with randomness
		"scale": {
		"start": 0.5,
		"end": 0.5,
		"minimumScaleMultiplier": 0
		},
		
		//Starting and Ending Color
		"color": {
		"start": "#ffffff",
		"end": "#ffffff"
		},
		
		//Starting and Ending Speed with random
		"speed": {
		"start": 100,
		"end": 20,
		"minimumSpeedMultiplier": 0
		},
		
		//Directional Drift
		"acceleration": {
		"x": 0,
		"y": 0
		},
		
		//Maximum speed or Drift
		"maxSpeed": 0,
		
		//Direction of movement 0 360
		"startRotation": {
		"min": 180,
		"max": 90
		},
		
		//Allows to disable auto rotation based on drift
		"noRotation": false,
		
		//Force Rotation Speed Randomness - Positive or Negative = direction
		"rotationSpeed": {
		"min": 30,
		"max": 50
		},
		
		//Lifetime of Particle Randomness
		"lifetime": {
		"min": 20,
		"max": 20
		},
		
		//Blending Mode
		"blendMode": "normal",
		
		//How Quickly New Particles Are Generated
		"frequency": 0.1,
		
		//How Long the Particles Are Generated 
		"emitterLifetime": -1,
		
		//Maximum Paticles at a Time
		"maxParticles": 1000,
		
		//Starting Position of emitter
		"pos": {
		"x": 0,
		"y": 0
		},
		
		//If particles should be added to the back of the display
		"addAtBack": false,
		
		//Emitter Type with properties
		"spawnType": "rect",
		"spawnRect": {
		"x": 0,
		"y": 0,
		"w": app.screen.width,
		"h": 0
		}
	});
	
// console.log(emitter);

// current time
var elapsed = Date.now();

// update frame
var update = () => {
	
	// Update the next frame
	requestAnimationFrame(update);
	
	let now = Date.now();
	
	// The emitter requires the elapsed seconds
	emitter.update((now - elapsed) * 0.001);
	elapsed = now;
	
	app.stage.addChild(container);
	
};
	
// Start emitting
emitter.emit = true;

//  // Start the update
update();
	