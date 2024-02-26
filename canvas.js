// const { Timeline } = require("@pixi-spine/runtime-4.1");

const app = new PIXI.Application({ width: window.innerWidth, height: window.innerHeight });
document.body.appendChild(app.view);

// to enable pixi-devtools
globalThis.__PIXI_APP__ = app;

// resizing the window
window.addEventListener('resize', function() {
	app.stage.width = window.innerWidth;
	app.stage.height = window.innerHeight;
})

// background music
const backgroundMusic = PIXI.sound.Sound.from({ url:'examples/resources/background.mp3', autoPlay: true });
backgroundMusic.play({ loop: backgroundMusic });

// declaring few variables
const buttons = [];
const nameBut = [];
var winingCount = 0;

// container for spineboy, basket and ball
const container = new PIXI.Container();

// container for win particles
const particleContainer = new PIXI.ParticleContainer();

// setting up background image
const bg = PIXI.Sprite.from('examples/assets/bg1.jpg');
bg.anchor.set(0.5);
bg.x = app.screen.width / 2;
bg.y = app.screen.height / 2;
app.stage.addChild(bg);

gsapAnimation(); // gsap animation

// setting up basket image
const basket = PIXI.Sprite.from('examples/assets/basket.png');
basket.scale.set(0.5);
basket.x = app.screen.width / 1.31;
basket.y = app.screen.height / 1.7;
basket.width = 200;
basket.height = 200;
container.addChild(basket);


// load spine data
PIXI.loader.add('boy','examples/assets/pixi-spine/spineboy-pro.json').load(onAssetsLoaded);

function onAssetsLoaded(loader, spineboyAsset) {

    // create a spine boy
    const spineBoyPro = new PIXI.spine.Spine(spineboyAsset.boy.spineData);

    // set the position
    spineBoyPro.x = app.screen.width / 4;
    spineBoyPro.y = app.screen.height - 64;

    spineBoyPro.scale.set(0.5);

    container.addChild(spineBoyPro);

    const singleAnimations = ['aim', 'portal'];
    const loopAnimations = ['shoot'];
    //const allAnimations = [].concat(singleAnimations, loopAnimations);

    var audio = featureMusic();
    var ballPath = bezierCurve();
    var initialBallXPosition = ballPath.x;
    var initialBallYPosition = ballPath.y;
    var initialCurveXPosition = initialBallXPosition - ballPath.width;
    var initialCurveYPosition = initialBallYPosition + ballPath.height/2;

    // Press the button to play the animation
    buttons[2].on('pointertap', actionButton);
    nameBut[2].on('pointertap', actionButton);
    buttons[1].on('pointertap', aimButton);
    nameBut[1].on('pointertap', aimButton);
    buttons[0].on('pointertap', shootButton);
    nameBut[0].on('pointertap', shootButton);


    function actionButton() {

        console.log('action');
        audio.play('escape');

        winingCount = 0;
        app.stage.removeChild(particleContainer);
        ballPath.alpha = 0;
        
        let animation = 'portal';
        
        spineBoyPro.state.setAnimation(0, animation, loopAnimations.includes(animation));
    }
    
    function aimButton() {

        console.log('aim');
        audio.play('aim ping');

        winingCount = 0;
        app.stage.removeChild(particleContainer);
        ballPath.alpha = 0;
        
        let animation = 'aim';

        spineBoyPro.state.setAnimation(0, animation, loopAnimations.includes(animation));
    }
    
    function shootButton() {

        audio.play('shot');
        winingCount += 1;
        ballPath.alpha = 1;
        ballPath.x = initialBallXPosition;
        ballPath.y = initialBallYPosition;
        container.addChild(ballPath);
        app.stage.removeChild(particleContainer);

        // Add a variable to winingCount up the seconds our application has been running
        let elapsedTime = 0.0;

        let maximumTimeToReachBasket = 2000;    // time in mili-seconds

        console.log('shoot');
        console.log(winingCount);
        
        let animation = 'shoot';
        
        spineBoyPro.state.setAnimation(0, animation, singleAnimations.includes(animation));

        const P0 = { x: -container.width/2 - initialCurveXPosition, y: initialCurveYPosition }, 
                P1 = { x: ((basket.x + basket.width/2) - (initialBallXPosition + ballPath.width/2)), y: 0 },
                P2 = { x: (basket.x + basket.width/2), y: (basket.y + basket.height/5) };
        
        app.ticker.add(function move() {

            elapsedTime += 16.66;

            if (elapsedTime <= maximumTimeToReachBasket) {

                console.log(elapsedTime);

                var time = elapsedTime / maximumTimeToReachBasket;

                var p = projection(time, P0, P1, P2);

                ballPath.x = p.x;
                ballPath.y = p.y;

                console.log(ballPath.x, ballPath.y);
            }
            else {

                app.ticker.remove(move);
                let applause = PIXI.sound.Sound.from('examples/resources/applause.mp3');
                applause.play();
                console.log('***********');
                
                ballPath.x = initialBallXPosition;
                ballPath.y = initialBallYPosition;
                
                if (winingCount % 5 == 0) {
                    console.log("win");
                    winParticles();
                    let success = PIXI.sound.Sound.from('examples/resources/success.mp3');
                    success.play();
                    app.stage.addChild(particleContainer);
                }
            }
        });
    }
}


// projectile
function projection(t, p0, p1, p2) {

    let x = Math.pow(1-t, 2) * p0.x + 2 * (1-t) * p1.x + Math.pow(t, 2) * p2.x; 
    let y = Math.pow(1-t, 2) * p0.y + 2 * (1-t) * p1.y + Math.pow(t, 2) * p2.y;

    return {x: x, y: y};
}


// button feature for action, aim, shoot
function buttonFeature() {

    const textureButton = PIXI.Texture.from('examples/assets/button.png');

    const buttonName = ['Shoot', 'Aim', 'Action'];

    const skewStyle = new PIXI.TextStyle({
        fontFamily: 'Arial',
        fill: ['#ffffff'],
        stroke: '#004620',
        fontSize: 30,
        fontWeight: 'lighter',
        lineJoin: 'round',
        strokeThickness: 12,
    });

    for (let i = 0; i < 3; i++) {
        const button = new PIXI.Sprite(textureButton);
        const skewText = new PIXI.Text(buttonName[i], skewStyle);

        skewText.anchor.set(0.5);
        skewText.x = (window.innerWidth / 1.5) - ((150 + skewText.width) * i);
        skewText.y = app.screen.height - 30;

        button.anchor.set(0.5);
        button.x = (window.innerWidth / 1.5) - ((150 + skewText.width) * i);
        button.y = app.screen.height - 30;
        button.width = 200;
        button.height = 70;

        // make the button interactive...
        skewText.interactive = true;
        button.interactive = true;
        button.cursor = 'pointer';
        skewText.cursor = 'pointer';

        // add it to the stage
        app.stage.addChild(button);
        app.stage.addChild(skewText);

        // add button to object
        buttons.push(button);
        nameBut.push(skewText);
    }
}


// bezier curve and ball drawing
function bezierCurve() {

    // setting up ball
    const ball = PIXI.Sprite.from('examples/assets/ball.png');
    ball.scale.set(0.5);
    ball.x = app.screen.width / 3.05;
    ball.y = app.screen.height / 2.35;
    ball.width = 25;
    ball.height = 25;
    
    // const bezier = new PIXI.Graphics();

    // bezier.lineStyle(5, 0xAA0000, 1);
    // bezier.moveTo(ball.x + ball.width/2, ball.y + ball.height/2);     // moveTo(x, y) => x and y are initial points
    
    // // bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)  => cp is control point, x & y are final points
    // bezier.bezierCurveTo((basket.x + basket.width/2) - (ball.x + ball.width/2) + 50, 100, (basket.x + basket.width/2) - (ball.x + ball.width/2) + 50, 100, basket.x + basket.width/2, basket.y + 64);
    
    // container.addChild(bezier);

    return ball;
}


// win particles drawing function
function winParticles() {

    const particle = 'examples/assets/coin.png';

    //Pixi Emitter
    const emitter = new PIXI.particles.Emitter(
        
        particleContainer, [PIXI.Texture.from(particle)],
        
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
                "x": app.renderer.width/2,
                "y": 0
            },
            
            //If particles should be added to the back of the display
            "addAtBack": false,
            
            //Emitter Type with properties
            "spawnType": "circle",
            "spawnCircle": {
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
}

// music for different features
function featureMusic() {

    const sprites = {
        'escape' : { start: 4, end: 7.2 },
        'aim ping' : { start: 9, end: 9.1 },
        'shot' : { start: 17, end: 18 }
    }

    const sound = PIXI.sound.Sound.from({
        'url': 'examples/resources/sprite.mp3',
        'sprites': sprites
    });

    return sound;
}


// GSAP animations
function gsapAnimation() {

    // cloud animation using gsap
    var cloud = PIXI.Sprite.from('examples/assets/cloud.png');
    cloud.width = 100;
    cloud.height = 100;
    gsap.to( cloud, { 
        // scale: 0.1,
        x: app.screen.width, 
        y: 0,  
        ease: "power1.inOut", 
        delay: 1,
        duration: 5,
        repeat: -1,
        repeatDelay: 0.5,
        yoyo: true
    });
    
    console.log('finished');
    app.stage.addChild(cloud);

    // cloud animation using gsap - timelineMax()
    var cloud1 = PIXI.Sprite.from('examples/assets/cloud.png');
    cloud1.width = 100;
    cloud1.height = 100;
    var t1 = new TimelineMax();
    t1.from(cloud1, { 
        x: app.screen.width, 
        y: 0, 
        ease: "power1.out", 
        delay: 1,
        duration: 5,
        repeat: -1,
        repeatDelay: 0.5,
        yoyo: true
    });
    app.stage.addChild(cloud1);
}

buttonFeature();

app.stage.addChild(container);
