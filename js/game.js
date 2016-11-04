GWBW.Game = function() {};
GWBW.Game.prototype = {
    init: function(wind) {
        this.wind = wind;
        this.fadeAlpha = { value: 1 };
        
        this.entities = [];
        this.buttons = {};
        
        this.SOLDIER_ID     = 0;
        this.DOCTOR_ID      = 1;
        this.SCIENTIST_ID   = 2;
        this.GIRL_ID        = 3;
        this.BURDEN_ID      = 4;
        this.DOG_ID         = 5;
        this.ROBOT_ID       = 6;
        this.STATE_CALM     = 1;
        this.STATE_NERVOUS  = 2;
        this.STATE_STRESSED = 3;
        
        this.countdown = "Faltan 40 días.";
        this.day = 0;
        this.fireAmount = 0;
        this.foodAmount = 30;
        this.radioStatus = 0;
        this.radioMax = 50;
        
        this.infected       =   [false, false, false, false];   // soldier - doctor - scientist - girl
        this.infectionLevel =   [0, 0, 0, 0];
        this.sanity         =   [14, 9, 7, 6];                  // soldier - doctor - scientist - girl
        this.sanityMax      =   [15, 10, 8, 7];
        
        this.numActions = 5;
        this.isOver = false;
        this.options = [];
        
        this.medicines = 1;
        this.ammo = 26;
        this.dialogues = [
            [
                'No subestimes el hambre, cuida las provisiones de comida \n y seremos capaces de afrontar cualquier amenaza.', 
                'Marvin es un cazador excelente, pero donde se ponga un rifle... \n En cualquier caso: adoro a este perro.', 
                'Somos demasiadas bocas. Nuestras provisiones no durarán \n mucho.', 
                'No pierdas de vista la munición: no sólo sirve para cazar, \n también para defendernos de las amenazas.', 
                'El perro se llama Marvin por un camarada que perdí \n en los campos de hidrofósforo, fue una batalla brutal...',
                'Sé que hay alimañas al acecho, \n somos un plato demasiado apetitoso para ellas...',
                '¿Y ahora...? Ahora vamos a esperar... \n a ver qué pasa...',
                'Entre nosotros; ese científico cabrón me da mala espina.'
            ],
            [
                'Estamos muy expuestos al virus Medusea aquí. Mantente alerta, \n si algunos de nosotros se paraliza, morirá en 3 días.', 
                'Creo que alguien infectado por el virus Medusea se congela \n a nivel fisiológico y no necesita comida ni atención psicológica.', 
                'Es un cigarro digital infinito: es inofensivo \n y sabe igual que los de antes.', 
                'Los cadáveres infectados por el virus Medusea son altamente \n contagiosos. Deberíamos quemarlos si llega el momento.', 
                'Espero que en caso de emergencia el perro caiga \n antes que un humano, ¿no?',
                'El tabaco me ayuda a estar entretenido y, de paso, \n me olvido del hambre.',
                'Si llega la hora de la verdad... mejor vosotros \n antes que yo.',
                'Si estoy fuera una película americana de los 90 \n yo sería el primero en morir. Soy un arquetipo.'
            ],
            [
                'Puedo trabajar en la radio, pero creo que llevará unos \n 15 días arreglarla.', 
                'Soldado, Doctor, Yo y Sarah: ése es el orden de las \n lecturas psicológicas de BR4ND-0N. Cuanto mayores las bajas, peor.', 
                'Sarah y yo llevamos casados 7 años, ella es genial. \n Seguro que nos ayudará a superar esto.', 
                'Si tienes que tomar una decisión difícil, yo antes que Sarah, \n por favor. BR4ND-0N puede continuar mi trabajo perfectamente.', 
                'Sé que no le caigo bien al Soldado, \n espero que no haga nada estúpido...',
                'Mis análisis indican que tenemos pocas probabilidades \n de salir todos con vida de ésta.',
                'Usted es el líder, Burden, debe decidir.',
                'En cuanto salgamos de esta roca absurda, me voy a comer \n una hamburguesa triple de buey de Kobe.'
            ],
            [
                'Confiamos en usted, Burden. La moral es crucial en estos casos. \n Intente mantener la moral del equipo hablando con ellos.', 
                'Si alguien del grupo muere, la moral descenderá drásticamente. \n Dependiendo de quien sea, unos se verán más afectados que otros.', 
                'No dejes que muera Marvin, todos lo queremos mucho. \n Sería un duro golpe para la moral del campamento.', 
                'Donald no es muy carismático, pero tiene un gran corazón.', 
                'Este libro habla sobre un chico que liberó la antigua Tierra \n con solo un ordenador. Se titula: "La Leyenda del Keymasher".',
                'Una reunión conmigo en situaciones límite puede elevar la moral. \n Sin embargo, la sesión lleva un rato.',
                'No hay mucho más que hacer en esta roca que leer, \n ¿no cree?'
            ],
            [
                'Una hoguera que debe durar 40 días, ¿eh? \n Lo tomaré como una metáfora. No sucumbiremos.', 
                '¿Debería guardarme una bala para mí? \n Venga, no pienses en eso...', 
                'El perro parece sabroso...', 
                'El Ingeniero está muy gordo, podría convertirse en un montón \n de comida.', 
                'Las piezas de BR4ND-0N podrían usarse para recargar \n la munición láser.', 
                'Esta zona esta habitada por depredadores. \n Deberíamos ahorrar munición para repelerlos.', 
                'Si escapo de este planeta, me apuntaré a la próxima Ludum Dare.', 
                'Estoy cansado de comer carne. Unos buenos cachelos \n estarían genial.'
            ]
        ];
        this.dialoguesIndex = [0, 0, 0, 0, 0];
        this.spokenTo = [false, false, false, false, false]; // soldier - doctor - scientist - girl
        this.numSurvivors = 5;
        this.rationsNeeded = 6;
        this.infected = [false, false, false, false, false]; // soldier - doctor - scientist - girl
        this.infectionLevel = [0, 0, 0, 0, 0];
        
        this.endings = [
            'Has muerto de hipotermia.', 
            'Los depredadores salvajes han arrasado tu campamento \n porque no tenías suficiente munición para defenderlo.', 
            '¡No has sido capaz de contactar con el Convoy Orbital!', 
            '¡Has logrado huir del planeta!', 
            'El Sargento Burden ha fallado a sus hombres \n y se ha suicidado.'
        ];
        this.end = 3;
        this.endTitle = "";
        this.summary = "";
        
        this.MEMBER_WEIGHT = [17, 15, 21, 12, 0, 10, 30];
        this.MORALE_PUNCH = [
              [-100,    -1,     0,      -2],
              [-3,      -100,   -1,     -1],
              [1,       -1,     -100,   -3],
              [-2,      -1,     -3,      -100],
              [0,      0,     0,      0],       // burden
              [-3,      -2,     -1,      -1],
              [0,       -3,     -2,      0]
        ];
        this.CREW_ENTITIES = [
            "soldier",
            "doctor",
            "scientist",
            "girl",
            "burden",
            "dog",
            "robot"
        ];
        
        this.game.canvas.style.cursor = "none";
        this.game.canvas.antialias = false;
        
        this.debugMode = false;
    },
    create: function() {
        // shuffle dialogues
        for (var q=0; q<4; q++) {
            this.dialogues[q] = Phaser.ArrayUtils.shuffle(this.dialogues[q]);
        }
        
        // create fade object
        this.fade = this.game.add.graphics(0, 0);
        this.fade.z = 500;
        this.fade.beginFill(0x000000, this.fadeAlpha.value);
        this.fade.drawRect(0, 0, this.world.width, this.world.height);
        this.fade.endFill();
        
        this.createBitmapTxts();
        
        // add background
        this.add.image(0, 0, "fondo");
        
        // add music and crossfade with wind
        this.wind.fadeOut(4000);
        this.music = this.add.audio("bso", 0, true);
        this.music.onDecoded.add(this.startMusic, this);
        
        // add sound effects
        this.stepsSnd = this.add.audio("stepsSnd", 0.1, true);
        this.campfireSnd = this.add.audio("campfireSnd", 0.4, true);
        this.laserSnd = this.add.audio("laserSnd", 0.4);
        this.howlSnd = this.add.audio("howlSnd", 0.5);
        this.roarSnd = this.add.audio("roarSnd", 0.5);
        
        // add entities
        this.addEntities();
        
        // create actions
        this.createActions();
        
        // predators
        this.predatorDay1 = 9 + this.math.between(0, 3);  // a predator will attack between day#9 and day#12
        this.predatorDay2 = 28 + this.math.between(0, 3); // a predator will attack between day#28 and day#31
        
        this.input.keyboard.addKey(Phaser.Keyboard.D).onDown.add(this.toggleDebug, this);
        
        // launch fadeout animation
        this.add.tween(this.fadeAlpha).to({value: 0}, 2000, Phaser.Easing.Quadratic.InOut, true)
            .onComplete.add(function() {
                this.countdownTxt.text = "";
            }, this);
    },
    update: function() {
        this.crosshair.x = Math.floor(this.input.mousePointer.x - 8);
        this.crosshair.y = Math.floor(this.input.mousePointer.y - 8);
        this.hoverTxt.x = this.crosshair.x + 8;
        this.hoverTxt.y = this.crosshair.y - 12;
        
        // update entities
        for (var q=0, l=this.entities.length; q<l; q++) {
            if (this.entities[q].custom_update) this.entities[q].custom_update();
        }
        
        // manage options displayed on screen, if they exist
        for (q=0, l=this.options.length; q<l; q++) {
            this.options[q].txt.tint = 0x00ff00;
        }
        for (q=0, l=this.options.length; q<l; q++) {
            if (!this.isOver && this.day < 40 && this.numActions > 0 && this.dialogbox.y <= -this.dialogbox.height/2 && this.options.length && this.options[q].img.overlap(this.crosshair)) {
                this.options[q].txt.tint = 0xffff00;
                if (this.options.length && this.input.mousePointer.isDown && this.optionsEntity && this.optionsEntity.tweenFinished) {
                    this.options[q].txt.action.call(this);
                }
                break;
            }
        }
        
        // destroy options, if user clicks on an empty zone of screen
        if (this.options.length && this.input.mousePointer.isDown && this.optionsEntity && this.optionsEntity.tweenFinished) {
            this.optionsEntity.destroy();
            
            var timerTmp = this.time.create(false);
            timerTmp.add(500, function() {
                this.optionsEntity = null;
            }, this);
            timerTmp.start();
        }
        
        // manage actions
        for (var prop in this.buttons) {
            var btn = this.buttons[prop];
            this.hoverTxt.text = "";
            if (!this.isOver && this.day < 40 && this.numActions > 0 && this.dialogbox.y <= -this.dialogbox.height/2 && !this.options.length && btn.overlap(this.crosshair)) {
                if (!this.options.length && this.input.mousePointer.isDown && !this.optionsEntity) {
                    this.optionsEntity = new GWBW.Option(this, btn);
                    this.optionsEntity.createOptionsFor(btn);
                }
                this.hoverTxt.text = btn.hoverTxt;
                break;
            }
        }
        
        // check if actions had been spent
        if (this.numActions == 0 && this.dialogbox.y <= -this.dialogbox.height/2) {
            this.numActions = -1;
            this.add.tween(this.fadeAlpha).to({value: 1}, 2000, Phaser.Easing.Quadratic.InOut, true)
                .onComplete.add(function() {
                    this.onDayPasses();
                }, this);
        } 
        
        // update actions text
        if (this.numActions >= 0) {
            this.actionsTxt.text = this.isOver ? "": "Acciones: " + this.numActions;
        }
        
        // check click on gameOver
        if (this.isOver && this.dialogbox.y <= -this.dialogbox.height/2 && this.input.mousePointer.isDown) {
            this.state.start("GWBW.Boot", true, true);
        }
        
        this.world.sort("z", Phaser.Group.SORT_ASCENDING);
    },
    render: function() {
        if (this.debugMode) {
            this.game.debug.text("Día " + this.day + ", fiera1 día" + this.predatorDay1 +  ", fiera2 día" + this.predatorDay2, 6, 20, null, "minecraft");
            this.game.debug.text("Cordura soldado " + this.sanity[this.SOLDIER_ID] +  ", doctor " + this.sanity[this.DOCTOR_ID], 6, 40, null, "minecraft");
            this.game.debug.text("Científico " + this.sanity[this.SCIENTIST_ID] +  ", psicóloga " + this.sanity[this.GIRL_ID], 6, 60, null, "minecraft");
            this.game.debug.text("Infectados soldado " + this.infected[this.SOLDIER_ID] +  ", doctor " + this.infected[this.DOCTOR_ID], 6, 80, null, "minecraft");
            this.game.debug.text("Científico " + this.infected[this.SCIENTIST_ID] + ", psicóloga " + this.infected[this.GIRL_ID], 6, 100, null, "minecraft");
            this.game.debug.text("Nivel infección soldado " + this.infectionLevel[this.SOLDIER_ID] + ", doctor " + this.infectionLevel[this.DOCTOR_ID], 6, 120, null, "minecraft");
            this.game.debug.text("Científico " + this.infectionLevel[this.SCIENTIST_ID] + ", psicóloga " + this.infectionLevel[this.GIRL_ID], 6, 140, null, "minecraft");
            this.game.debug.text("Raciones necesarias " + this.rationsNeeded + ", supervivientes " + this.numSurvivors, 6, 160, null, "minecraft");
            this.game.debug.text("Medicinas " + this.medicines + ", balas " + this.ammo + ", comida " + this.foodAmount, 6, 180, null, "minecraft");
            this.game.debug.text("Reparación radio " + this.radioStatus + " / " + this.radioMax, 6, 200, null, "minecraft");
            
            this.game.debug.text("("+(this.crosshair.x+8)+","+(this.crosshair.y+8)+")", this.crosshair.x, this.crosshair.y, "#00ff00", "minecraft");
        }
        
        if (this.fadeAlpha.value) {
            this.fade.clear();
            this.fade.beginFill(0x000000, this.fadeAlpha.value);
            this.fade.drawRect(0, 0, this.world.width, this.world.height);
            this.fade.endFill();
        }
    },
    // end of mandatory functions
    addEntities: function() {
        var entities = this.cache.getJSON("entities").entities;
        for (var q=0, l=entities.length; q<l; q++) {
            var e = entities[q];
            this[e.name] = this.add.sprite(e.x, e.y, e.name);
            this[e.name].z = e.z;
            for (var j=0, k=e.anims.length; j<k; j++) {
                this[e.name].animations.add(e.anims[j].name, e.anims[j].frames, e.anims[j].rate, e.anims[j].loop);
            }
            this[e.name].play(e.start);
            this[e.name].gameLink = this.game.state.getCurrentState();
            if (e.init)     this[e.name].custom_init   = GWBW.entities_methods[e.init].bind(this[e.name]);
            if (e.update)   this[e.name].custom_update = GWBW.entities_methods[e.update].bind(this[e.name]);
            if (e.onclick)  {
                this[e.name].custom_onclick            = GWBW.entities_methods[e.onclick].bind(this[e.name]);
                this.input.onDown.add(this[e.name].custom_onclick, this[e.name]);
            }
            
            this.entities.push(this[e.name]);
            if (this[e.name].custom_init) this[e.name].custom_init();
        }
    },
    checkBodies: function() {
        for (var q=0; q<this.CREW_ENTITIES; q++) {
            var member = this[CREW_ENTITIES[q]];
            if (member.currentAnim == member.anims.die) member.kill();
        }
    },
    checkCampfire: function() {
        this.fireAmount --;
        if (this.fireAmount < 0) {
            this.end = 0;
            this.isOver = true;
            this.dialogbox.text = "Has olvidado mantener la hoguera encendida. \n ";
            this.dialogbox.text += "Os habéis congelado durante la noche.";
            this.dialogbox.name = "Recuerda la lumbre.";
            this.tweenDialog({ y: 0 }, 1);
        }
    },
    checkGameOver: function(casualtiesText) {
        if (this.isOver) {
            this.endTitle = "GODS HAVE BEEN WATCHING";
            this.summary = "Has sobrevivido " + this.day + " día(s) \n  \n ";
            this.summary += this.endings[this.end];
            this.summary += " \n  \n Te quedaban " + this.ammo + " balas, " + this.foodAmount + " raciones de comida \n y " + this.medicines + " medicinas.";
            if (this.radioStatus >= this.radioMax) {
                this.summary += " \n La radio funciona perfectamente";
            } else {
                this.summary += " \n Reparación de la radio al " + Math.floor(this.radioStatus/this.radioMax*100) + " %.";
            }
            this.summary += ' \n  \n Gracias por jugar.';
            
            this.endTitleTxt.text = this.endTitle;
            this.summaryTxt.text = this.summary;
        } else {
            var cdTxt = "Quedan " + (40 - this.day) + " días.";
            if (40 - this.day == 1) cdTxt = "Queda 1 día.";
            this.countdown = cdTxt + casualtiesText;
            this.countdownTxt.text = this.countdown;
            
            this.add.tween(this.fadeAlpha).to({value: 0}, 2000, Phaser.Easing.Quadratic.InOut, true, 2000)
                .onComplete.add(function() {
                    this.countdownTxt.text = "";
                }, this);
        }
    },
    checkMadmen: function() {
        var madmen = [];
        var madmenText = "";
        for (var q=0; q<4; q++) {
            if (this.sanity[q] < 0 && this.sanity[q] > -99) {
                this.memberFlees(q);
                if (q == this.SOLDIER_ID)   madmen.push("el soldado");
                if (q == this.DOCTOR_ID)    madmen.push("el doctor");
                if (q == this.SCIENTIST_ID) madmen.push("el ingeniero");
                if (q == this.GIRL_ID)      madmen.push("la psiquiatra");
            }
        }
        if (madmen.length) {
            madmenText = "Ha desaparecido ";
            if (madmen.length > 1) {
                madmenText = "Han desaparecido ";
                for (q=0; q<madmen.length-2; q++) {
                    madmenText += madmen[q] + ", ";
                }
                madmenText += madmen[madmen.length-2] + " y ";
            }
            madmenText += madmen[madmen.length-1] + ". \n ";
            if (madmen.length > 1) {
                madmenText += "La locura ha hecho que huyan. No creo que regresen.";
            } else {
                madmenText += "La locura ha hecho que huya. No creo que vuelva.";
            }
            this.dialogbox.text = madmenText;
            this.dialogbox.name = "Desesperación";
            this.tweenDialog({y:0}, 1);
        }
    },
    checkCrewSanity: function() {
        for (var q=0; q < 4; q++) {
            if (!this.spokenTo[q] && !this.infected[q]) this.sanity[q] -= 2;
            if (this.foodAmount <= 0 && !this.infected[q]) this.sanity[q] -= 2;
            if (this.sanity[q] > this.sanityMax[q])  this.sanity[q] = this.sanityMax[q];
            this.spokenTo[q] = false;
        }
    },
    checkInfections: function() {
        if (Math.random() < .19) {
            var virus = this.math.between(0, 3);
            if (!this.infected[virus] && this.sanity[virus] > -99) {
                this.infected[virus] = true;
                this[this.CREW_ENTITIES[virus]+"Action"].infected = true;
                this.numSurvivors --;
                this.rationsNeeded --;
            }
        }

        var casualties = [];
        var casualtiesText = "";
        for (var q=0; q<4; q++) {
            if (this.infected[q]) {
                this.infectionLevel[q]++;
            } else {
                this.infectionLevel[q] = 0;
            }
            if (this.infectionLevel[q] >= 4 && this.sanity[q] > -99) {
                if (q == this.SOLDIER_ID)   casualties.push("el soldado");
                if (q == this.DOCTOR_ID)    casualties.push("el doctor");
                if (q == this.SCIENTIST_ID) casualties.push("el ingeniero");
                if (q == this.GIRL_ID)      casualties.push("la psiquiatra");
                this.numSurvivors++;
                this.rationsNeeded++;
                this.memberFlees(q);
            }
        }
        if (casualties.length) {
            casualtiesText = " \n El virus Medusea ha acabado con ";
            if (casualties.length > 1) {
                for (q=0; q<casualties.length-2; q++) {
                    casualtiesText += casualties[q] + ", ";
                }
                casualtiesText += casualties[casualties.length-2] + " y ";
            }
            casualtiesText += casualties[casualties.length-1] + ". \n ";
            if (casualties.length > 1) {
                casualtiesText += "Los cadáveres tóxicos han sido incinerados.";
            } else {
                casualtiesText += "El cadáver tóxico ha sido incinerado.";
            }
        }

        return casualtiesText;
    },
    checkPredators: function() {
        if (this.day == this.predatorDay1 - 1 || this.day == this.predatorDay2 - 1) {
            this.howlSnd.play();
        }
        if (this.day == this.predatorDay1 || this.day == this.predatorDay2) {
            this.roarSnd.play();
            var shooting = this.math.between(4, 7);
            if (shooting <= this.ammo) {
                var foodLost = this.math.between(3, 7);
                this.dialogbox.text =   "Las has expulsado del campamento. Has necesitado " + shooting + " balas, pero \n ";
                this.dialogbox.text +=  "te han robado " + foodLost + " raciones de comida. La moral del grupo ha bajado.";
                this.dialogbox.name = "¡Bestias salvajes atacan durante la noche!";
                this.ammo -= shooting;
                this.reduceFood(foodLost);
                this.reduceCrewSanity();
                this.tweenDialog({ y: 0 }, 1);
            } else { // we're defeated by predators
                this.end = 1;
                this.isOver = true;
                this.dialogbox.text = "Necesitabas más balas de las que disponías. \n ";
                this.dialogbox.text += "Has luchado con valentía, pero has sucumbido ante las bestias.";
                this.dialogbox.name = "¡Depredadores salvajes atacan durante la noche!";
                this.tweenDialog({ y: 0 }, 1);
            }
        }
    },
    checkSuicidalTendencies: function() {
        var commitSuicide = true;
        for (var q=0; q<this.sanity.length; q++) {
            if (this.sanity[q] > -99) commitSuicide = false;
        }
        if (commitSuicide) {
            this.isOver = true;
            this.end = 4;
        }
    },
    checkTimeLimit: function() {
        if (this.day >= 40) {
            if (this.radioStatus >= this.radioMax) {
                this.dialogbox.text = "¡Lo logramos! ¡Por fin saldremos de este maldito planeta! \n ¡Mirad! ¡El convoy orbital!";
                this.dialogbox.name = 'Sgt Burden';
                this.tweenDialog({ y: 0 }, 1);
                this.launchShip();
            } else {
                this.dialogbox.text = '¡Hemos sobrevivido! Pero la radio no funciona... \n Estamos atrapados aquí para siempre...';
                this.dialogbox.name = 'Sgt Burden';
                this.tweenDialog({ y: 0 }, 1);
                this.isOver = true;
                this.end = 2;
            }
        }
    },
    createActions: function() {
        var actionData = this.cache.getJSON("actions");
        for (var q=0; q<actionData.length; q++) {
            var action = this.formatActionObject(actionData[q]);
            this[action._name] = this.add.image(action.x, action.y);
            this[action._name].width = action.config.size.x;
            this[action._name].height = action.config.size.y;
            this[action._name].hoverTxt = action.config.hoverTxt;
            this[action._name].options = [];
            for (var j=0; j<action.config.options.length; j++) {
                this[action._name].options.push(action.config.options[j]);
            }
            if (action.config.infections) {
                this[action._name].infections = [];
                for (j=0; j<action.config.infections.length; j++) {
                    this[action._name].infections.push(action.config.infections[j]);
                }
            }
            this[action._name].gameLink = this.game.state.getCurrentState();
            this[action._name].z = 250 + q;
            
            this.buttons[action._name] = this[action._name];
        }
    },
    createBmpTxt: function(cfg) {
        this[cfg.obj] = this.add.bitmapText(cfg.x, cfg.y, cfg.font, cfg.text, cfg.size);
        this[cfg.obj].anchor.x = cfg.anchor || 0.5;
        this[cfg.obj].smoothed = false;
        this[cfg.obj].tint = cfg.tint || 0xffffff;
        this[cfg.obj].align = cfg.align || "center";
        if (cfg.z) this[cfg.obj].z = cfg.z;
    },
    createBitmapTxts: function() {
        // create endTitle bitmapText
        this.createBmpTxt({
            obj:    "endTitleTxt",
            x:      this.world.centerX,
            y:      50,
            font:   "fipps",
            text:   "",
            size:   9,
            z:      510
        });
        
        // create summary bitmapText
        this.createBmpTxt({
            obj:    "summaryTxt",
            x:      this.world.centerX,
            y:      70,
            font:   "minecraft",
            text:   "",
            size:   8,
            z:      511
        });
        
        // create countdown bitmapText
        this.createBmpTxt({
            obj:    "countdownTxt",
            x:      this.world.centerX,
            y:      this.world.centerY/2,
            font:   "minecraft",
            text:   this.countdown,
            size:   8,
            z:      550
        });
        
        
        // create actions bitmapText
        this.createBmpTxt({
            obj:    "actionsTxt",
            x:      this.world.width - 40,
            y:      this.world.height - 15,
            font:   "minecraft",
            text:   "Acciones: " + this.numActions,
            size:   8,
            z:      551
        });
        
        // create hover bitmapText
        this.createBmpTxt({
            obj:    "hoverTxt",
            x:      this.world.centerX,
            y:      this.world.centerY/2,
            font:   "minecraft",
            text:   "",
            size:   8,
            z:      400
        });
    },
    formatActionObject: function(obj) {
        var options = obj.config.options;
        for (var q=0; q<options.length; q++) {
            options[q].action = GWBW.action_methods[options[q].action].bind(this);
        }
        var infections = obj.config.infections;
        if (infections) {
            for (q=0; q<infections.length; q++) {
                infections[q].action = GWBW.action_methods[infections[q].action].bind(this, infections[q].cost);
            }
        }
        return obj;
    },
    launchShip: function() {
        this.ship.y = 0;
        this.add.tween(this.ship).to({y: 57}, 22000, Phaser.Easing.Quadratic.Out, true)
            .onComplete.add(function() {
                var title = this.add.image(this.world.centerX, this.world.centerY - 20, "titulo");
                title.anchor.set(0.5);
            }, this);
    },
    memberFlees: function(id) {
        this[this.CREW_ENTITIES[id]].kill();
        var name = this.CREW_ENTITIES[id] + "Action";
        var action = this[name];
        delete this.buttons[name];
        action.destroy();

        this.sufferMoralePunch(id);

        this.rationsNeeded --;
        this.numActions --;
        this.numSurvivors --;
    },
    onDayPasses: function() {
        console.log("a day has passed!");
        
        this.reduceFood(this.rationsNeeded);
            
        this.checkCampfire();
        this.checkBodies();
        this.checkCrewSanity();

        this.day ++;
        this.checkPredators();
        this.checkMadmen();
        var casualtiesText = this.checkInfections();
        this.refreshActions();
        this.checkSuicidalTendencies();
        this.checkTimeLimit();
        this.checkGameOver(casualtiesText);
    },
    reduceCrewSanity: function() {
        for (var q=0; q<4; q++) {
            if (!this.infected[q]) {
                this.sanity[q] -= this.math.between(1, 3);
            }
        }
    },
    reduceFood: function(amount) {
        this.foodAmount -= amount;
        if (this.foodAmount < 0) this.foodAmount = 0;
    },
    refreshActions: function() {
        this.numActions = this.numSurvivors;
        if (this.numActions <= 0) this.numActions = 1;
    },
    shootCrew: function(id) {
        this.burden.play("shoot");
        this.laserSnd.play();

        var member = this[this.CREW_ENTITIES[id]];
        member.play("die");
        
        var name = this.CREW_ENTITIES[id] + "Action";
        var action = this[name];
        delete this.buttons[name];
        action.destroy();

        // gain food or bullets
        if (id == this.ROBOT_ID) {
            this.ammo += this.MEMBER_WEIGHT[id];
        } else {
            this.foodAmount += this.MEMBER_WEIGHT[id];
        }

        this.sufferMoralePunch(id);

        this.rationsNeeded --;
        this.numActions --;
        this.numSurvivors --;
    }, 
    sufferMoralePunch: function(id) {
        var moralePunch = this.MORALE_PUNCH[id];
        for (var q=0; q<4; q++) {
            if (moralePunch[q] == -100) {
                this.sanity[q] = -100;
            } else {
                this.sanity[q] += moralePunch[q];
            }
        }
    },    
    startMusic: function() {
        this.music.play();
        this.music.fadeTo(6000, 0.25);
    },
    startTalking: function(spr, tween, member, duration) {
        member.isTalking = true;
        
        var timerTmp = this.time.create();
        timerTmp.add(duration, function() {
            member.isTalking = false;
        }, this);
        timerTmp.start();
    },
    toggleDebug: function() {
        this.debugMode = this.debugMode ? false : true;
        this.fadeAlpha.value = this.debugMode ? 0.5 : 0;
        if (!this.fadeAlpha.value) this.fade.clear();
    },
    tweenDialog: function(pos, time, callback) {
        time = time * 1000;
        var anim = this.add.tween(this.dialogbox);
        anim.to({y: pos.y}, time, Phaser.Easing.Quadratic.Out);
        
        var member = null, duration = null;
        if (arguments.length > 3) {
            member = arguments[3];
            duration = arguments[4];
        }
        if (callback) {
            anim.onComplete.add(callback, this, 0, member, duration);
        }
        this.dialogbox.isAnimated = true;
        anim.start();
    }    
};