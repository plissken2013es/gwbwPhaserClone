GWBW.Preload = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function Preload() {
        Phaser.Scene.call(this, { key: "GWBW.Preload" });
        this.preloadBar = null;
    },
    preload: function() {
        this.preloadBar = this.add.sprite(0, 0, "splash").setOrigin(0);
        this.preloadBar.setCrop(0, 0, 0, this.preloadBar.height);

        this.loadTxt = this.add.bitmapText(GWBW.WIDTH / 2, GWBW.HEIGHT - 20, "minecraft", "0 %", 10);
        this.loadTxt.setOrigin(0.5, 0);
        this.loadTxt.setTint(0xffffff);
        this.loadTxt.setCenterAlign();

        this.load.on("progress", this.onProgress, this);

        this.load.setPath("media/fonts/");
        this.load.bitmapFont("fipps", "fipps.png", "fipps.xml");

        this.load.setPath("media/sounds/");
        this.load.audio("wind", ["wind1.ogg", "wind1.mp3"]);
        this.load.audio("bso", ["watching4.ogg", "watching4.mp3"]);
        this.load.audio("campfireSnd", ["hoguera.ogg", "hoguera.mp3"]);
        this.load.audio("stepsSnd", ["snow_steps.ogg", "snow_steps.mp3"]);
        this.load.audio("laserSnd", ["laser.ogg", "laser.mp3"]);
        this.load.audio("howlSnd", ["growl.ogg", "growl.mp3"]);
        this.load.audio("roarSnd", ["rugido.ogg", "rugido.mp3"]);
        this.load.audio("keyboard", ["keyboard.ogg", "keyboard.mp3"]);

        this.load.setPath("media/");
        this.load.image("fondo", "fondo.png");
        this.load.image("titulo", "titulo.png");
        this.load.spritesheet("crosshair", "white_crosshair_16.png", { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet("dialogbox", "dialogbox.png", { frameWidth: 320, frameHeight: 45 });
        this.load.spritesheet("ship", "nave-137x37.png", { frameWidth: 137, frameHeight: 37 });
        this.load.spritesheet("cursor", "cursor.png", { frameWidth: 10, frameHeight: 13 });
        this.load.spritesheet("water", "agua-302x58-6x84.png", { frameWidth: 302, frameHeight: 58 });
        this.load.spritesheet("planet1", "planet1.png", { frameWidth: 14, frameHeight: 13 });
        this.load.spritesheet("planet2", "planet2.png", { frameWidth: 9, frameHeight: 9 });
        this.load.spritesheet("campfire", "hoguera-70x57-146x129.png", { frameWidth: 70, frameHeight: 57 });
        this.load.spritesheet("radio", "radio-75x57-245x127.png", { frameWidth: 75, frameHeight: 57 });
        this.load.spritesheet("meat", "carne-57x48-9x159.png", { frameWidth: 57, frameHeight: 48 });
        this.load.spritesheet("burden", "prota-57x69.png", { frameWidth: 57, frameHeight: 69 });
        this.load.spritesheet("doctor", "doctor-54x54-76x123.png", { frameWidth: 54, frameHeight: 54 });
        this.load.spritesheet("soldier", "soldado-68x75-7x109.png", { frameWidth: 68, frameHeight: 75 });
        this.load.spritesheet("scientist", "ingeniero-52x68-234x105.png", { frameWidth: 52, frameHeight: 68 });
        this.load.spritesheet("girl", "chica-61x48-102x114.png", { frameWidth: 61, frameHeight: 48 });
        this.load.spritesheet("dog", "perrito-31x34.-9x142.png", { frameWidth: 31, frameHeight: 34 });
        this.load.spritesheet("robot", "robot-65x81-247x113.png", { frameWidth: 65, frameHeight: 81 });

        this.load.setPath("js/data/");
        this.load.json("entities", "entities.json");
        this.load.json("actions", "actions.json");
    },
    create: function() {
        this.preloadBar.setCrop();
        this.scene.start("GWBW.Introduction");
    },
    onProgress: function(progress) {
        this.preloadBar.setCrop(0, 0, this.preloadBar.width * progress, this.preloadBar.height);
        this.loadTxt.setText(Math.round(progress * 100) + " %");
    }
});
