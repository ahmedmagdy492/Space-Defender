// selectors
var audio = document.querySelectorAll('audio');
var muter = document.querySelector('#toggle-sound');
var exitBtn = document.querySelector('.exit');
var player = document.getElementById('player');
var game_frame = document.querySelector('.game-frame');
var stopMenu = document.getElementById("stop-menu");
var stop = document.getElementById('stop-game');
var scoreEle = document.getElementById('score');
var minsEle = document.querySelector('#mins');
var secsEle = document.querySelector("#secs");
var playerNameEle = document.getElementById("player-name");

var isPlaying = true;
var isMusicPlaying = true;
var score = 0;
var boxes = [];
var boxesCreated = 0;
var rows = 0;

// classes
var Player = {
    score: this.score,
    name: "",
    destroyedBoxesCount: 0,
    target: 20
}
var Shoot = function(x, y)
{
    // private
    var style = {
        position: "absolute",
        top: y + "px",
        left: x + 30 + "px",
        width: "10px",
        height: "10px",
        borderRadius: "100%",
        background: "#fff",
        zIndex: -1,
        boxShadow: "1px 1px 4px #fff",
        transition: "top 0.1s ease-out"
    }
    var speed = 10;

    // public
    this.x = x;
    this.y = y;    
    this.html = create_ele('span', style, game_frame);
    this.collide = function(obj, index, intId)
    {
       if(parseInt(this.html.style.top) == parseInt(obj.html.style.top)+4 && ((parseInt(this.html.style.left)) >= (parseInt(obj.html.style.left)) && (parseInt(this.html.style.left)) <= (parseInt(obj.html.style.left) + 75)))
        {   
            // updating the score
            // checking whether it's a lucky box or not
            console.log(obj.isLuck);
            if(!obj.isLuck)
            {                
                if(score < 19)
                {
                    score += 3;
                }
                if(obj.html.nextSibling != null && obj.html.nextSibling.nextSibling != null)
                {
                    obj.html.nextSibling.classList.add("rotate-anim");
                    obj.html.nextSibling.nextSibling.classList.add("rotate-anim");
                    setTimeout(function(){
                        obj.html.nextSibling.nextSibling.remove();
                        obj.html.nextSibling.remove();
                    }, 500);
                    boxes.splice(index, 3);
                }
            }
            else
            {
                if(score < 20)
                {
                    score++;
                }
            }
            // removing the box
            obj.html.classList.add("rotate-anim");
            setTimeout(function(){
                obj.html.remove();
            }, 500);
            // removing the collided boxes from the game
            this.html.remove();  // removing the shoot            
            boxes.splice(index, 1);
            scoreEle.innerText = score;
            clearInterval(intId);
        }       
    }

    this.move = function()
    {
        // moving the shoot upwards
        var x = this.x + 30;
        var y = this.y;
        var shootVar = this;
        
        /// making the space craft shoot
        var id = setInterval(() => {
            y -= 10;
            this.html.style.top = y + "px";
            this.html.style.left = x + "px";

            // colliding the shoot with the box
            var index = boxes.findIndex(function(box){                
                return ((parseInt(shootVar.html.style.left)) >= (parseInt(box.html.style.left)) && (parseInt(shootVar.html.style.left)) <= (parseInt(box.html.style.left) + 75)) && (parseInt(shootVar.html.style.top) >= parseInt(box.html.style.top)+4 && (parseInt(shootVar.html.style.top) <= parseInt(box.html.style.top)+4));
            });
            var intervalId = id;
            if(index != -1)
            {
                this.collide(boxes[index], index, intervalId);
            }

        }, speed);
    }
}
var Box = function(x, y, isLuck, id)
{
    // private
    var style = {
        width: 70 + "px",
        height: 70 + "px",
        zIndex: -1,
        position: "absolute",
        top: y + "px",
        left: x + "px"
    }
    // public
    this.x = x;
    this.y = y;
    this.id = id;
    this.isLuck = isLuck;
    this.html = create_ele('img', style, game_frame);
    this.html.src = isLuck == 0 ? "./imgs/mars.png" : "./imgs/stones.png";
}

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
function lose_game()
{
    isPlaying = false;
    ans = confirm(":(last score was "+ localStorage.getItem("score") +" sorry you lost, wanna try again ?",);
    localStorage.setItem("score", score);
    if(ans)
    {
        location.reload();
    }
    else
    {
        location.replace("index.html");
    }
}

// pushing a row in the array
function push_row(_y)
{
    if(rows < 6)
    {
        var x = 10;
        var rand;
        for(var i = 1; i <= 18; i++)
        {
            rand = Math.round(Math.random() * 10);
            var box = new Box(x, _y, rand, boxesCreated);
            boxes.push(box);
            boxesCreated = boxes.length;
            x+= 70 + 5;
        }
        rows++;
    }
}

// creating a countdown timer
function count_down(_mins = 04, _secs = 60)
{
    // setting the score in html
    minsEle.innerText = _mins;
    secsEle.innerText = _secs - 1;

    var mins = _mins;
    var secs = _secs;

    var timerId = setInterval(() => {
        if(isPlaying)
        {
            if(secs > 0)
        {
            secs--;
        }
        else
        {
            secs = 59;
            if(mins > 0)
            {
                mins--;
            }
            else
            {
                clearInterval(timerId);
                secs = 00;
                mins = 00;
                lose_game();
            }
        }
        minsEle.innerText = mins;
        secsEle.innerText = secs;
        }
    }, 1000);
}

// playing background music
audio[0].play();

// either mutting or unmutting the music
muter.onclick = function()
{
    if(isMusicPlaying)
    {
        this.src = "./imgs/no-sound.png";
        isMusicPlaying = false;
        audio[0].pause();
    }
    else{
        this.src = "./imgs/sound.png";
        isMusicPlaying = true;
        audio[0].play();
    }
}

// quitting game
exitBtn.onclick = function()
{
    var wantQuit = confirm("Are you sure you want to quit?");
    if(wantQuit)
    {
        location.replace("index.html");
    }
    else
    {
        return;
    }
}

// starting the game
function start_game()
{
    // setting the position of the stop menu
    stop.style.top = (window.innerHeight - 550) / 2 + "px";
    // setting the position of the player
    player.style.top = window.innerHeight - 200 + "px";
    player.style.left = (window.innerWidth - parseInt(player.style.width)) / 2 + "px";

    // creating the boxes (boxes)
    push_row(0);
}

// game update
window.addEventListener("load", function(){

    // get the name of the user and show it
    Player.name = localStorage.getItem("name");
    playerNameEle.innerText = "Welcome " + Player.name;

    // setting up every thing
    start_game();

    // starting the countdown timer
    count_down(4, 60);

    // pushing a row of boxes every 2 seconds
    var counter = 80;
    var ans;
    // checking whether the player won or not
    var id = setInterval(function(){
        if(isPlaying)
        {
            if(rows < 6)
            {
                 // checking whether the player won or not
                if(score < Player.target)
                {
                    Player.destroyedBoxesCount++;
                    push_row(counter);
                    counter += 80;
                }
                else
                {
                    ans = confirm(":) Congrates you won, wanna play again?");
                    localStorage.setItem("score", score);
                    isPlaying = false;
                    if(ans)
                    {
                        location.reload();
                    }
                    else
                    {
                        location.replace("index.html");
                    }
                }                        
            }
            else if(rows >= 6)
            {
                clearInterval(id);
                lose_game();
            }
        }
        
    }, 3000);
});

// setting the player movement
var x = (window.innerWidth - parseInt(player.style.width)) / 2;
window.onkeydown = function(e)
{
    if(this.isPlaying)
    {
        if(e.keyCode == 39)
        {
            // right arrow
            if(x < (window.innerWidth - parseInt(player.style.width)))
            {
                x += 30;
                player.style.left = x + "px";
            }
        }
        else if(e.keyCode == 37)
        {
            // left arrow
            if(x > 0)
            {
                x -= 30;
                player.style.left = x + "px";
            }
        }
        else if(e.keyCode == 32)
        {
            // space (shooting)
            var obj = new this.Shoot(this.parseInt(player.style.left),this.parseInt(player.style.top));
            obj.move();
        }
    }
    // mute/unmute the music when hitting M
    if(e.keyCode == 77)
    {
        this.muter.onclick();
    }
    else if(e.keyCode == 27)
    {
        this.stopMenu.onclick();
    }
};

// handling the pause button
stopMenu.onclick = function()
{
    if(isPlaying)   
    {
        stopMenu.src = "./imgs/play.png";
        isPlaying = false;
        stop.style.display = "block";
    }
    else
    {
        stopMenu.src = "./imgs/pause.png";
        isPlaying = true;
        stop.style.display = "none";
    }
}