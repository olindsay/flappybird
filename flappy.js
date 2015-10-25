// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };

// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)
/*
 * Loads all resources for the game and gives them names.
 */
function preload() {
    game.load.image("player","assets/transparent_spaceship.png");
    game.load.audio("score", "assets/point.ogg");
    game.load.image("pipe","assets/pipe_mint.png");


}
var game = new Phaser.Game(790, 400, Phaser.AUTO, 'game', stateActions);
var score = -1
var labelScore
var player;
var gapStart = game.rnd.integerInRange(1, 5);
var pipes = []

/*
 * Initialises the game. This function is only called once.
 */
function create() {
    // set the background colour of the scene
    game.stage.setBackgroundColor("#000000");
    game.add.text(100, 20, "THE TRUTH IS OUT THERE",
        {font: "30px Georgia", fill: "#FFFFFF"});
    //var spaceship = game.add.sprite(10,200,"player");
    //spaceship.width = 100;
    //spaceship.height = 50;
    //spaceship.x = 150;
    //spaceship.y = 200

    labelScore = game.add.text(20,60,"0",
        {font: "30px Georgia", fill: "#FFFFFF"});
    game.input
        .onDown
        .add(clickHandler);

    game.input
        .keyboard.addKey(Phaser.Keyboard.SPACEBAR)
        .onDown.add(spaceHandler);

    game.add.text(20,20,"0")

    generatePipe();

    player = game.add.sprite(80, 200, "player");
    player.width = 100;
    player.height = 50;
    player.x = 150;
    player.y = 200
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.enable(player);
    player.body.gravity.y = 120;

    game.input.keyboard
        .addKey(Phaser.Keyboard.SPACEBAR)
        .onDown.add(playerJump);

    var pipeInterval = 1.75;
    game.time.events
        .loop(pipeInterval * Phaser.Timer.SECOND,
    generatePipe);


};

/* this function pauses the game and adds the clickHandler event
 */

function clickHandler(event) {
    var spaceship = game.add.sprite(event.x, event.y, "player");
    spaceship.width = 100;
    spaceship.height = 50;
    changeScore();
}

/*this function plays the sound*/

function spaceHandler() {
    game.sound.play("score");
    console.log("test");
}

function changeScore () {score = score + 1;
    labelScore.setText(score.toString());
}

function moveUp () {player.y = player.y - 30;
}

function generatePipe(){
    var gapStart = game.rnd.integerInRange(1, 5);
    for (var count=0; count < 8; count=count+1) {
        if(count != gapStart  &&  count != gapStart + 1) {
            addPipeBlock(790, count * 50);
        }
    }
   changeScore();
}


    function addPipeBlock(x, y) {
        /* this will create a new block*/
        var pipeBlock = game.add.sprite(x,y,"pipe");
        pipes.push(pipeBlock);
        game.physics.arcade.enable(pipeBlock);
        pipeBlock.body.velocity.x = -200;
    }


function playerJump() {
    player.body.velocity.y = -100;
}
/*
 * This function updates the scene. It is called for every new frame.
 */
function update() {
        game.physics.arcade
            .overlap(player,
        pipes,
        gameOver);
    if (player.y >400) {gameOver()}
    if (player.y <0) {gameOver()}
    }

    function gameOver(){
        game.destroy();
}

