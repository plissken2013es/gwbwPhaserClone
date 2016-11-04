GWBW.Option = function(state, action) {
    this.gameLink = state;
    this.action = action;
    this.tweenFinished = false;
};
GWBW.Option.prototype = {
    addButtonImage: function(group, params, txt) {
        var img = this.gameLink.make.image(params.x, params.y);
        img.width = params.w;
        img.height = params.h;
        group.add(img);
        this.gameLink.options.push({img: img, txt: txt});
    },
    addTxtBackground: function(group, params) {
        if (!this.graphics) {
            this.graphics = this.gameLink.make.graphics(0, 0);
            group.add(this.graphics);   
        }
        this.graphics.beginFill(0x000000, 0.35);
        this.graphics.drawRect(params.x - 2, params.y - 2, params.w + 2, params.h + 2);
        this.graphics.endFill();
    },
    createOptionsFor: function(opt) {
        this.container = this.gameLink.add.group();
        
        var x = Math.floor(this.gameLink.input.mousePointer.x);
        var y = Math.floor(this.gameLink.input.mousePointer.y);
        
        if (opt.infected) {
            for (var i=0; i < opt.infections.length; i++) {
                var txt = this.gameLink.add.bitmapText(x - 20, y - 20 + i * 18, "minecraft", opt.infections[i].text, 10);
                if (txt.x + txt.textWidth > this.gameLink.world.width) txt.x -= Math.floor(txt.textWidth/2);
                
                txt.smoothed = false;
                txt.tint = 0x00ff00;
                txt.z = 200 + i;
                txt.action = opt.infections[i].action;
                
                this.addTxtBackground(this.container, {x: txt.x, y: txt.y, w: txt.textWidth, h: txt.textHeight});
                this.container.add(txt);
                this.addButtonImage(this.container, {x: txt.x, y: txt.y, w: txt.textWidth, h: txt.textHeight}, txt);
            }
        } else {
            for (var i=0; i < opt.options.length; i++) {
                var txt = this.gameLink.add.bitmapText(x - 20, y - 20 + i * 18, "minecraft", opt.options[i].text, 10);
                txt.smoothed = false;
                if (txt.x + txt.textWidth > this.gameLink.world.width) txt.x -= Math.floor(txt.textWidth/2);
                
                txt.tint = 0x00ff00;
                txt.z = 200 + i;
                txt.action = opt.options[i].action;
                
                this.addTxtBackground(this.container, {x: txt.x, y: txt.y, w: txt.textWidth, h: txt.textHeight});
                this.container.add(txt);
                this.addButtonImage(this.container, {x: txt.x, y: txt.y, w: txt.textWidth, h: txt.textHeight}, txt);
            }
        }
        this.container.cacheAsBitmap = true;
        
        this.gameLink.add.tween(this.container).to({y: "-7"}, 600, Phaser.Easing.Quadratic.Out, true)
            .onComplete.add(function() {
                this.tweenFinished = true;
                this.container.cacheAsBitmap = null;
            }, this);;
    },
    destroy: function() {
        this.graphics.destroy();
        this.container.destroy();
        this.gameLink.options = [];
    }
};