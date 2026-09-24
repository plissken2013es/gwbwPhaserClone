GWBW.Option = function(state, action) {
    this.gameLink = state;
    this.action = action;
    this.tweenFinished = false;
};
GWBW.Option.prototype = {
    addButtonImage: function(group, params, txt) {
        // invisible hit area, positioned relative to the container
        var img = this.gameLink.make.zone({ x: params.x, y: params.y, width: params.w, height: params.h }, false);
        img.setOrigin(0);
        group.add(img);
        this.gameLink.options.push({img: img, txt: txt});
    },
    addTxtBackground: function(group, params) {
        if (!this.graphics) {
            this.graphics = this.gameLink.make.graphics({ x: 0, y: 0 }, false);
            group.add(this.graphics);
        }
        this.graphics.fillStyle(0x000000, 0.35);
        this.graphics.fillRect(params.x - 2, params.y - 2, params.w + 2, params.h + 2);
    },
    createOptionsFor: function(opt) {
        this.container = this.gameLink.add.container(0, 0);
        this.container.setDepth(200);

        var x = Math.floor(this.gameLink.input.activePointer.x);
        var y = Math.floor(this.gameLink.input.activePointer.y);

        var list = opt.infected ? opt.infections : opt.options;
        for (var i=0; i < list.length; i++) {
            var txt = this.gameLink.make.bitmapText({ x: x - 20, y: y - 20 + i * 18, font: "minecraft", text: list[i].text, size: 10 }, false);
            if (txt.x + txt.width > GWBW.WIDTH) txt.x -= Math.floor(txt.width/2);

            txt.setTint(0x00ff00);
            txt.action = list[i].action;

            this.addTxtBackground(this.container, {x: txt.x, y: txt.y, w: txt.width, h: txt.height});
            this.container.add(txt);
            this.addButtonImage(this.container, {x: txt.x, y: txt.y, w: txt.width, h: txt.height}, txt);
        }

        this.gameLink.tweens.add({
            targets: this.container,
            y: "-=7",
            duration: 600,
            ease: "Quad.easeOut",
            onComplete: function() {
                this.tweenFinished = true;
            },
            callbackScope: this
        });
    },
    destroy: function() {
        this.graphics.destroy();
        this.container.destroy();
        this.gameLink.options = [];
    }
};
