var game = new Phaser.Game({
    type: Phaser.AUTO,
    width: GWBW.WIDTH,
    height: GWBW.HEIGHT,
    parent: "screen",
    pixelArt: true,
    backgroundColor: "#000000",
    fps: { target: 60 },
    input: { activePointers: 1 },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: "arcade",
        arcade: { gravity: { x: 0, y: 0 } }
    },
    scene: [GWBW.Boot, GWBW.Preload, GWBW.Introduction, GWBW.Game]
});
