export class Music {

    constructor(app) {

        this.app = app;
    }

    // music for different features
    featureMusic() {

        this.sprites = {
            'escape' : { start: 4, end: 7.2 },
            'aim ping' : { start: 9, end: 9.1 },
            'shot' : { start: 17, end: 18 }
        }

        this.sound = PIXI.sound.Sound.from({
            'url': 'examples/resources/sprite.mp3',
            'sprites': this.sprites
        });

        return this.sound;
    }

    // background music
    backgroundMusic() {

        this.backgroundSound = PIXI.sound.Sound.from({ url:'examples/resources/background.mp3', autoPlay: true });
        this.backgroundSound.play({ loop: this.backgroundSound });
    }

    // success music
    particleMusic() {

        this.success = PIXI.sound.Sound.from('examples/resources/success.mp3');
        this.success.play();
    }

    // applause music
    applauseMusic() {

        this.applause = PIXI.sound.Sound.from('examples/resources/applause.mp3');
        this.applause.play();
    }
}