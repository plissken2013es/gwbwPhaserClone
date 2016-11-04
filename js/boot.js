var GWBW = {};

GWBW.Boot = function() {};
GWBW.Boot.prototype = {
    init: function() {
        this.input.maxPointers = 1;
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        
        this.time.desiredFps = 60;
    },
    preload: function() {
        this.load.path = "media/";
        this.load.image("splash", "splash.jpg");
        
        this.load.path = "media/fonts/";
        this.load.bitmapFont("minecraft");
    },
    create: function() {
        this.game.context.scale(2, 2);
        this.state.start('GWBW.Preload');
    }
};