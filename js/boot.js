var GWBW = {
    WIDTH: 320,
    HEIGHT: 215,

    // Phaser 2's Sprite.overlap(): true if the bounds of both objects intersect
    overlap: function(a, b) {
        return Phaser.Geom.Intersects.RectangleToRectangle(a.getBounds(), b.getBounds());
    }
};

GWBW.Boot = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function Boot() {
        Phaser.Scene.call(this, { key: "GWBW.Boot" });
    },
    preload: function() {
        this.load.setPath("media/");
        this.load.image("splash", "splash.jpg");

        this.load.setPath("media/fonts/");
        this.load.bitmapFont("minecraft", "minecraft.png", "minecraft.xml");
    },
    create: function() {
        this.scene.start("GWBW.Preload");
    }
});
