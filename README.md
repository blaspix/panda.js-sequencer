## Panda.js Sequencer

Panda.js Sequencer is a plugin for [Panda.js](http://www.pandajs.net/) HTML5 game engine.
The plugin goal is to provide an easy way to animate a sprite with spritesheet sequences.

Please donate to help BLASPIX support the ongoing development.
[![Donate](https://www.paypalobjects.com/en_US/i/btn/btn_donate_SM.gif "Donate")](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=QR5TU7Q8NEANQ)

### Usage

**src/game/main.js**
```
game.module(
    'game.main'
)
.require(
    'engine.core',
    'plugins.sequencer'
)
.body(function() {

game.addAsset('src/plugins/example.json');

SceneGame = game.Scene.extend({
    backgroundColor: 0xffffff,

    init: function() {

        var piggySprite = new game.Sequencer('piggy####.png', '0');
        piggySprite.addSequence('idle', '125-184,183-126');
        piggySprite.addSequence('poop', '299-320,319*3,318-309,310-327,326-321,320*5,321-351');
        piggySprite.addSequence('look', '77-123,124*20,123-78');
        piggySprite.addSequence('walk', '0-23');

        piggySprite.animationSpeed = .3;

        piggySprite.playSequence('idle');
        console.log(piggySprite.sequence);

        this.addTimer(2000, function() {

            piggySprite.loop = false;

            piggySprite.playSequence('poop');
            console.log(piggySprite.sequence);

            piggySprite.onComplete = function () {

                piggySprite.playSequence('look');
                console.log(piggySprite.sequence);

                piggySprite.onComplete = function () {

                    piggySprite.loop = true;

                    piggySprite.playSequence('walk');
                    console.log(piggySprite.sequence);
                }
            }
        });

        piggySprite.anchor = {x: .5, y:.5};
        piggySprite.position = {x: game.system.width / 2, y: game.system.height / 2};

        game.scene.stage.addChild(piggySprite);

    }
});

game.start();

});
```

### Graphical source

The spritesheet used as example comes from [Glitch](http://www.glitchthegame.com/public-domain-game-art/) HTML5 game.

### License

Panda.js Sequencer is released under the [MIT License](http://opensource.org/licenses/MIT).

### Donation

Please donate to help BLASPIX support the ongoing development.
[![Donate](https://www.paypalobjects.com/en_US/i/btn/btn_donate_SM.gif "Donate")](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=QR5TU7Q8NEANQ)

### Keywords
```
animation, state, player
```

[![Analytics](https://ga-beacon.appspot.com/UA-48574179-2/panda.js-sequencer/index?pixel)](https://github.com/igrigorik/ga-beacon)
