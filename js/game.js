// classes
function Player(name, score)
{
    this.name = name;
    this.score = score;
}
var shoot = function(x, y)
{
    var style = {
        position: "absolute",
        top: y + "px",
        left: x + 30 + "px",
        width: "10px",
        height: "10px",
        borderRadius: "100%",
        background: "#fff"
    }
    this.x = x;
    this.y = y;
    var speed = 10;
    this.html = create_ele('span',style, game_frame);
    // this.setXY = function(_x, _y)
    // {
    //     this.html.style.top = _y;
    //     this.html.style.left = _x;
    // }
    this.move = function()
    {
        var x = this.x + 30;
        var y = this.y;
        var id = setInterval(() => {
            //x += 10;
            y -= 10;
            this.html.style.top = y + "px";
            this.html.style.left = x + "px";
            // console.log(x, y, this.html.style.top, this.html.style.left);
            setTimeout(() => {
                clearInterval(id);
            }, 5000);
        }, speed);
    }
}

// selectors
var audio = document.querySelectorAll('audio');
var muter = document.querySelector('#toggle-sound');
var exitBtn = document.querySelector('.exit');
var player = document.getElementById('player');
var game_frame = document.querySelector('.game-frame');
var isPlaying = true;
var score = 0;

// functions
function create_ele(name, style, parent)
{
    var ele = document.createElement(name);
    for(var i in style)
    {
        ele.style[i] = style[i];
    }
    parent.appendChild(ele);
    return ele;
}


// playing background music
audio[0].play();

// either mutting or unmutting the music
muter.onclick = function()
{
    if(isPlaying)
    {
        this.src = "./imgs/no-sound.png";
        isPlaying = false;
        audio[0].pause();
    }
    else{
        this.src = "./imgs/sound.png";
        isPlaying = true;
        audio[0].play();
    }
}

// quitting game
exitBtn.onclick = function()
{
    location.replace("index.html");
}

// starting the game
function start_game()
{
    // setting the position of the player
    player.style.top = window.innerHeight - 200 + "px";
    player.style.left = (window.innerWidth - parseInt(player.style.width)) / 2 + "px";
}

// setting the player movement
var x = (window.innerWidth - parseInt(player.style.width)) / 2;
window.onkeydown = function(e)
{
    if(e.keyCode == 39)
    {
        // right arrow
        if(x < (window.innerWidth - parseInt(player.style.width)))
        {
            x += 15;
            player.style.left = x + "px";
        }
    }
    else if(e.keyCode == 37)
    {
        // left arrow
        if(x > 0)
        {
            x -= 15;
            player.style.left = x + "px";
        }
    }
    else if(e.keyCode == 32)
    {
        // space (shooting)
        var obj = new this.shoot(this.parseInt(player.style.left),this.parseInt(player.style.top));
        obj.move();
    }
};

start_game();