GWBW.Introduction = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function Introduction() {
        Phaser.Scene.call(this, { key: "GWBW.Introduction" });
    },
    init: function() {
        this.tpos = 0;
        this.cpos = 0;
        this.consoleCursor = null;
        this.introTxt = null;
        this.introLine = null;
        this.showingTitle = false;
        
        this.txtArray = [
            '2257 dC\n\n',
            'El Sargento Burden lidera un equipo \n',
            'de investigación para la EC-UD \n',
            '(Everdusk Company for Universe Discovery). \n',
            'Su equipo estaba recopilando información\n ',
            'sobre el virus Medusea, \n',
            'una plaga originaria del planeta Sineicos, \n',
            'cuando fue atacados por un grupo de bioterroristas \n',
            'autodenominados "comando XENOLIFER". \n \n',
            'Los datos de su investigacion fueron robados. \n',
            'En las manos equivocadas esto podria suponer\n',
            'el fin de la II Ciberguerra y el inicio\n',
            'de la era del terror espacial. \n \n',
            'Para evitar que esto suceda, su equipo deberá\n',
            'sobrevivir en los inhospitos yermos de Sineicos; \n',
            'luchar contra el hambre, el frío y la locura; \n',
            'combatir -además- los posibles brotes del virus Medusea, \n',
            'conocido por paralizar el cuerpo de sus víctimas; \n',
            'y reparar su Estacion de Radio para\n',
            'enviar un mensaje al Convoy Orbital que cruzará\n',
            'el cielo de Sineicos en 40 días: \n',
            'se trata de su ÚNICA vía de escape. \n',
            '\n \n',
            'Usted es el Sargento Burden. \n \n',
            'Recuerde... \n',
            '\n'
        ];
    },
    create: function() {
        var centerX = GWBW.WIDTH / 2;
        
        this.introLine = this.add.bitmapText(centerX, 20, "minecraft", "", 9);
        this.introLine.setOrigin(0.5, 0);
        this.introLine.setTint(0x000000);
        this.introLine.setCenterAlign();
        
        this.introTxt = this.add.bitmapText(centerX, 20, "minecraft", "", 9);
        this.introTxt.setOrigin(0.5, 0);
        this.introTxt.setTint(0xffffff);
        this.introTxt.setCenterAlign();
        
        this.keyboardSnd = this.sound.add("keyboard", { volume: 0.1, loop: false });
        this.consoleCursor = this.add.sprite(0, 0, "cursor").setOrigin(0);
        this.consoleCursor.anims.create({
            key: "idle",
            frames: this.anims.generateFrameNumbers("cursor", { frames: [0, 1, 2, 3, 4, 5] }),
            frameRate: 6,
            repeat: -1
        });
        this.consoleCursor.play("idle");
        
        // audio is already decoded by the loader in Phaser 4
        this.music = this.sound.add("wind", { volume: 0, loop: true });
        this.startMusic();
        
        this.input.once("pointerdown", this.showTitle, this);
    },
    update: function() {
        if (this.showingTitle) return;
        
        if (this.cpos < this.txtArray[this.tpos].length) {
            if (this.cpos === 3) this.keyboardSnd.play();
            this.introTxt.setText(this.introTxt.text + this.txtArray[this.tpos][this.cpos++]);
            if (this.txtArray[this.tpos][this.cpos]) this.introLine.setText(this.introLine.text + this.txtArray[this.tpos][this.cpos]);
            var h = this.introTxt.height;
            var w = this.introLine.width;
            this.consoleCursor.x = (w + GWBW.WIDTH)/2 + 2;
            this.consoleCursor.y = h + 8;
        } else {
            this.keyboardSnd.stop();
        }
        
        if (this.tpos === this.txtArray.length-1) {
            this.showTitle();
        }
    },
    // end of mandatory functions -------------------------------
    showTitle: function() {
        if (this.showingTitle) return;
        
        this.keyboardSnd.stop();
        this.introLine.setVisible(false);
        this.introTxt.setText("(Los dioses estarán vigilando)");
        this.introTxt.y = 150;
        this.introTxt.setFontSize(10);
        
        this.add.image(GWBW.WIDTH / 2, GWBW.HEIGHT / 2 - 20, "titulo");
        
        this.startTxt = this.add.bitmapText(GWBW.WIDTH / 2, 190, "fipps", "Click para jugar", 8);
        this.startTxt.setOrigin(0.5, 0);
        this.startTxt.setTint(0xffff00);
        this.startTxt.visible = false;
        
        this.showingTitle = true;
        if (this.consoleCursor) this.consoleCursor.setVisible(false);
        this.tpos = 0;
        this.time.delayedCall(500, function() {
            this.startTxt.visible = true;
            this.input.once("pointerdown", this.startGame, this);
        }, [], this);
    },
    startGame: function() {
        this.scene.start("GWBW.Game", { wind: this.music });
    },
    startMusic: function() {
        this.music.play();
        this.tweens.add({ targets: this.music, volume: 0.25, duration: 4000 });
        
        this.timerTxt = this.time.addEvent({ delay: 2000, loop: true, callback: this.updateTxt, callbackScope: this });
    },
    updateTxt: function() {
        if (this.showingTitle) {
            this.startTxt.visible = this.startTxt.visible ? false : true;
        } else {
            this.tpos++;
            this.introLine.setText("");
            this.cpos = 0;
            if (this.tpos == 13) {
                this.introTxt.setText("");
            }
            this.introTxt.setText(this.introTxt.text + this.txtArray[this.tpos][this.cpos++]);
            this.introLine.setText(this.introLine.text + this.txtArray[this.tpos][this.cpos]);
        }
    }
});
