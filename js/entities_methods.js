GWBW.entities_methods = {
    dialogbox_init: function() {
        this.name = "Sgt Burden";
        this.text = "Everything OK?";
        
        this.isAnimated = false;
        
        this.nameTxt = this.gameLink.add.bitmapText(this.x + 2, this.y + 1, "minecraft", this.name, 8);
        this.nameTxt.smoothed = false;
        this.nameTxt.tint = 0x00ff00;
        this.nameTxt.align = "left";
        this.nameTxt.z = 663;

        this.blinkTxt = this.gameLink.add.bitmapText(this.gameLink.world.width - 16, this.y + this.height - 14, "minecraft", ">>>", 8);
        this.blinkTxt.smoothed = false;
        this.blinkTxt.tint = 0xffffff;
        this.blinkTxt.align = "right";
        this.blinkTxt.z = 664;
        
        this.mainTxt = this.gameLink.add.bitmapText(this.x + 4, this.y + 12, "minecraft", this.text, 8);
        this.mainTxt.smoothed = false;
        this.mainTxt.tint = 0xffffff;
        this.mainTxt.align = "left";
        this.mainTxt.z = 665;
        
        this.blinkTimer = this.gameLink.time.create();
        this.blinkTimer.loop(800, function() {
            this.blinkTxt.visible = this.blinkTxt.visible ? false : true;
        }, this);
        this.blinkTimer.start();
    },
    dialogbox_update: function() {
        if (this.isAnimated) {
            this.nameTxt.y = Math.floor(this.y) + 6;
            this.blinkTxt.y = Math.floor(this.y) + this.height - 20;
            this.mainTxt.y = Math.floor(this.y) + 17;
            this.nameTxt.text = this.name;
            this.mainTxt.text = this.text;
        }
        if (this.y >= 0 && this.gameLink.input.mousePointer.isDown) {
            this.isAnimated = true;
            this.gameLink.add.tween(this).to({ y: -this.height }, 800, Phaser.Easing.Quadratic.Out, true)
                .onComplete.add(function() {
                    this.isAnimated = false;
                }, this);
        }
    },    
    planet1_update: function() {
        this.x = 170 + this.game.state.getCurrentState().day;
    },
    planet2_update: function() {
        this.x = 150 + this.game.state.getCurrentState().day * 2;
    },
    campfire_update: function() {
        var game = this.game.state.getCurrentState();
        this.play("fire" + game.fireAmount);
        if (!game.fireAmount) game.campfireSnd.stop();
    },
    radio_update: function() {
        var game = this.game.state.getCurrentState();
        if (game.radioStatus >= game.radioMax)        this.play("radio3");
        if (game.radioStatus < game.radioMax)         this.play("radio2");
        if (game.radioStatus <= game.radioMax / 3)    this.play("radio1");
    },
    meat_update: function() {
        var game = this.game.state.getCurrentState();
        if (game.foodAmount > 30)    this.play("meat4");
        if (game.foodAmount <= 30)   this.play("meat3");
        if (game.foodAmount <= 16)   this.play("meat2");
        if (game.foodAmount <= 6)    this.play("meat1");
    },
    burden_init: function() {
        this.speed = 45;
        this.target = 0;
        this.isWalking = false;
        this.isTalking = false;
        this.flip = false;
        
        this.anchor.x = 0.5;
        this.y = this.gameLink.world.height - this.height - 15;
        this.gameLink.physics.arcade.enable(this);
    },
    burden_update: function() {
        if (this.gameLink.isOver) return;
        
        if (!this.isTalking) {
            if (this.animations.currentAnim != this.animations._anims.shoot) {
                if (this.body.velocity.x > 0 && this.x > this.target - 20) {
                    this.body.velocity.x = 0;
                }
                if (this.body.velocity.x < 0 && this.x < this.target + 20) {
                    this.body.velocity.x = 0;
                }
                if (this.x < 39) {
                    this.body.velocity.x = 0;
                    this.x = 39;
                }
                if (!this.body.velocity.x) {
                    this.play("idle");
                }
            } else {
                this.body.velocity.x = 0;
                if (this.animations.currentAnim.isFinished) this.play("idle");
            }
        } else {
            this.body.velocity.x = 0;
            this.play("talk");
        }
        var flipX = this.flip ? -1 : 1;
        this.scale.set(flipX, 1);

        if (this.body.velocity.x && !this.isWalking) {
            this.gameLink.stepsSnd.play();
            this.isWalking = true;
        } else if (!this.body.velocity.x) {
            this.gameLink.stepsSnd.stop();
            this.isWalking = false;
        }
    },
    burden_onclick: function() {
        if (this.gameLink.dialogbox.position.y > -45) return;
        this.target = this.gameLink.input.x;
        if (this.x > this.target) {
            this.body.velocity.x = -this.speed;
            this.flip = false;
        } else {
            this.body.velocity.x = this.speed;
            this.flip = true;
        }
        this.play("walk");
    },
    doctor_update: function() {
        if (this.animations.currentAnim != this.animations._anims.die) {
            if (this.gameLink.infected[this.gameLink.DOCTOR_ID]) {
                this.play("infected");
            } else {
                if (this.gameLink.sanity[this.gameLink.DOCTOR_ID] > 7)  this.state = this.gameLink.STATE_CALM;
                if (this.gameLink.sanity[this.gameLink.DOCTOR_ID] <= 7) this.state = this.gameLink.STATE_NERVOUS;
                if (this.gameLink.sanity[this.gameLink.DOCTOR_ID] <= 4) this.state = this.gameLink.STATE_STRESSED;
                if (this.isTalking) {
                    this.play("talk" + this.state);
                } else {
                    this.play('idle' + this.state);
                }
            }
        }
    },
    soldier_update: function() {
        if (this.animations.currentAnim != this.animations._anims.die) {
            if (this.gameLink.infected[this.gameLink.SOLDIER_ID]) {
                 this.play("infected");
            } else {
                if (this.gameLink.sanity[this.gameLink.SOLDIER_ID] > 9)  this.state = this.gameLink.STATE_CALM;
                if (this.gameLink.sanity[this.gameLink.SOLDIER_ID] <= 9) this.state = this.gameLink.STATE_NERVOUS;
                if (this.gameLink.sanity[this.gameLink.SOLDIER_ID] <= 5) this.state = this.gameLink.STATE_STRESSED;
                this.play('idle' + this.state);
            }
        }
    },
    scientist_update: function() {
        if (this.animations.currentAnim != this.animations._anims.die) {
            if (this.gameLink.infected[this.gameLink.SCIENTIST_ID]) {
                 this.play("infected");
            } else {
                if (this.gameLink.sanity[this.gameLink.SCIENTIST_ID] > 6)  this.state = this.gameLink.STATE_CALM;
                if (this.gameLink.sanity[this.gameLink.SCIENTIST_ID] <= 5) this.state = this.gameLink.STATE_NERVOUS;
                if (this.gameLink.sanity[this.gameLink.SCIENTIST_ID] <= 3) this.state = this.gameLink.STATE_STRESSED;
                this.play('idle' + this.state);
            }
        }
    },
    girl_update: function() {
        if (this.animations.currentAnim != this.animations._anims.die) {
            if (this.gameLink.infected[this.gameLink.GIRL_ID]) {
                 this.play("infected");
            } else {
                if (this.gameLink.sanity[this.gameLink.GIRL_ID] > 5)  this.state = this.gameLink.STATE_CALM;
                if (this.gameLink.sanity[this.gameLink.GIRL_ID] <= 5) this.state = this.gameLink.STATE_NERVOUS;
                if (this.gameLink.sanity[this.gameLink.GIRL_ID] <= 3) this.state = this.gameLink.STATE_STRESSED;
                this.play('idle' + this.state);
            }
        }
    }
};