var game = new Phaser.Game(320, 215, Phaser.CANVAS, "screen", GWBW.Boot, false, false);

game.state.add("GWBW.Boot", GWBW.Boot);
game.state.add("GWBW.Preload", GWBW.Preload);
game.state.add("GWBW.Introduction", GWBW.Introduction);
game.state.add("GWBW.Game", GWBW.Game);

game.state.start("GWBW.Boot");