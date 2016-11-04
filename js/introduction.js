GWBW.Introduction = function() {};

GWBW.Introduction.prototype = {
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
        this.game.context.scale(2, 2);
        
        this.introLine = this.add.bitmapText(this.world.centerX, 20, "minecraft", "", 9);
        this.introLine.anchor.x = 0.5;
        this.introLine.smoothed = false;
        this.introLine.tint = 0x000000;
        this.introLine.align = "center";
        
        this.introTxt = this.add.bitmapText(this.world.centerX, 20, "minecraft", "", 9);
        this.introTxt.anchor.x = 0.5;
        this.introTxt.smoothed = false;
        this.introTxt.tint = 0xffffff;
        this.introTxt.align = "center";
        
        this.keyboardSnd = this.add.audio("keyboard", 0.1, false);
        this.consoleCursor = this.add.sprite(0, 0, "cursor");
        this.consoleCursor.animations.add("idle", [0, 1, 2, 3, 4, 5], 6, true);
        this.consoleCursor.play("idle");
        
        this.music = this.add.audio("wind", 0, true);
        this.music.onDecoded.add(this.startMusic, this);
        
        this.input.onDown.addOnce(this.showTitle, this);
    },
    update: function() {
        if (this.showingTitle) return;
        
        if (this.cpos < this.txtArray[this.tpos].length) {
            if (this.cpos === 3) this.keyboardSnd.play();
            this.introTxt.text += this.txtArray[this.tpos][this.cpos++];
            if (this.txtArray[this.tpos][this.cpos]) this.introLine.text += this.txtArray[this.tpos][this.cpos];
            var h = this.introTxt.textHeight;
            var w = this.introLine.textWidth;
            this.consoleCursor.x = (w + this.world.width)/2 + 2;
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
        this.introLine.kill();
        this.introTxt.text = "(Los dioses estarán vigilando)";
        this.introTxt.y = 150;
        this.introTxt.fontSize = 10;
        this.introTxt.anchor.x = 0.5;
        
        var title = this.add.image(this.world.centerX, this.world.centerY - 20, "titulo");
        title.anchor.set(0.5);
        
        this.startTxt = this.add.bitmapText(this.world.centerX, 190, "fipps", "Click para jugar", 8);
        this.startTxt.anchor.x = 0.5;
        this.startTxt.smoothed = false;
        this.startTxt.tint = 0xffff00;
        this.startTxt.visible = false;
        
        this.showingTitle = true;
        if (this.consoleCursor) this.consoleCursor.kill();
        this.tpos = 0;
        var timerTmp = this.time.create(false);
        timerTmp.add(500, function() {
            this.startTxt.visible = true;
            this.input.onDown.addOnce(this.startGame, this);
        }, this);
        timerTmp.start();
    },
    startGame: function() {
        this.state.start("GWBW.Game", true, false, this.music);
    },
    startMusic: function() {
        this.music.play();
        this.music.fadeTo(4000, 0.25);
        
        this.timerTxt = this.time.create();
        this.timerTxt.loop(2000, this.updateTxt, this);
        this.timerTxt.start();
    },
    updateTxt: function() {
        if (this.showingTitle) {
            this.startTxt.visible = this.startTxt.visible ? false : true;
        } else {
            this.tpos++;
            this.introLine.text = "";
            this.cpos = 0;
            if (this.tpos == 13) {
                this.introTxt.text = "";
            }
            this.introTxt.text += this.txtArray[this.tpos][this.cpos++];
            this.introLine.text += this.txtArray[this.tpos][this.cpos];
        }
    }
};