game.module(
    'plugins.sequencer'
)
.require(
    'engine.sprite'
)
.body(function () {

game.Sequencer = game.MovieClip.extend({

    sequence: 'default',
    sequences: [],

    init: function(pattern, sequence) {
        var match;
        if (match = pattern.match(/([a-z-]*)([#]+)([a-z.]*)/)) {
            this.prefix = match[1];
            this.zerofill = match[2].length;
            this.suffix = match[3];
            this.addSequence(this.sequence, sequence);
            this._super(this.sequences[this.sequence]);
        } else {
            console.log('invalid pattern');
        }
    },

    playSequence: function(name) {
        if(name) {
            this.sequence = name;
            this.textures = this.sequences[this.sequence];
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
