game.module(
    'plugins.sequencer'
)
.body(function () {

game.Sequencer = game.PIXI.MovieClip.extend({

    settings: {},
    sequence: 'default',
    sequences: [],

    init: function(pattern, sequence, loop, animationSpeed) {
        var match;
        if (match = pattern.match(/([a-z-]*)([#]+)([a-z.]*)/)) {
            this.prefix = match[1];
            this.zerofill = match[2].length;
            this.suffix = match[3];
            this.addSequence(this.sequence, sequence);
            this._super(this.sequences[this.sequence]);
            this.settings.loop = typeof loop == 'boolean' ? loop : this.loop;
            if(typeof animationSpeed == 'number') {
                this.settings.animationSpeed =  animationSpeed;
            } else {
                this.settings.animationSpeed =  this.animationSpeed;
            }
            this.animationSpeed = this.settings.animationSpeed;
            this.loop = this.settings.loop;
        } else {
            console.error('invalid pattern');
        }
    },

    playSequence: function(name, loop, animationSpeed) {
        if(typeof name == 'string') {
            this.sequence = name;
            this.textures = this.sequences[this.sequence];
        }
        this.loop = typeof loop == 'boolean' ? loop : this.settings.loop;
        if(typeof animationSpeed == 'number') {
            this.animationSpeed =  animationSpeed;
        } else {
            this.animationSpeed =  this.settings.animationSpeed;
        }
        this.gotoAndPlay(0);
    },

    addSequence: function(name, sequence) {
        var textures = [];
        sequence.split(',').forEach(function (v) {
            var match;
            if (match = v.match(/^([\d]+)([-|*])([\d]+)$/)) {
                if (match[2] == '-') {
                    var f = parseInt(match[1]);
                    var n = parseInt(match[3]);
                    if (f < n) {
                        while (f <= n) {
                            textures.push(f++);
                        }
                    } else {
                        while (n <= f) {
                            textures.push(f--);
                        }
                    }
                }
                if (match[2] == '*') {
                    var frame = parseInt(match[1]);
                    var factor = parseInt(match[3]);
                    while (factor--) {
                        textures.push(frame);
                    }
                }
            } else {
                textures.push(v);
            }
        });
        var pad = function(num, size) {
            var s = num + '';
            while (s.length < size) s = '0' + s;
            return s;
        };
        for (var i = 0; i < textures.length; i++) {
            var path = this.prefix;
            path += pad(textures[i], this.zerofill);
            path += this.suffix;
            textures[i] = game.Texture.fromImage(path);
        }
        this.sequences[name] = textures;
    }

});

});
