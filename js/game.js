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
        boxShadow: "1px 1px 4px #fff"
    }
    // public
    this.x = x;
    this.y = y;
    var speed = 10;
    this.html = create_ele('span', style, game_frame);
    this.collide = function(obj, index)
    {
        // updating the score
        if(obj.isLuck)
        {
            score += 3;
            obj.html.nextSibling.nextSibling.remove();
            obj.html.nextSibling.remove();
        }
        else
        {
            score++;     
        }
        // removing the collided rocks from the game
        this.html.remove();
        obj.html.remove();
        boxes.splice(index, 1);
        scoreEle.innerText = score;
        // checking whether the player won or not
        if(score < Player.target)
        {
            Player.destroyedBoxesCount++;
        }
       {// if(parseInt(this.html.style.top) == parseInt(obj.html.style.top)+4 && ((parseInt(this.html.style.left)) >= (parseInt(obj.html.style.left)) && (parseInt(this.html.style.left)) <= (parseInt(obj.html.style.left) + 75)))
        // {   
        //     // updating the score
        //     if(obj.isLuck)
        //     {
        //         score += 3;
        //         obj.html.nextSibling.nextSibling.remove();
        //         obj.html.nextSibling.remove();
        //     }
        //     else
        //     {
        //         score++;     
        //     }
        //     // removing the collided rocks from the game
        //     this.html.remove();
        //     obj.html.remove();
        //     boxes.splice(index, 1);
        //     scoreEle.innerText = score;
        //     // checking whether the player won or not
        //     if(score < Player.target)
        //     {
        //         Player.destroyedBoxesCount++;
        //     }
        //     else
        //     {
        //         alert(":) Congrates you won");
        //     }
        // }
       }
    }
    this.move = function()
    {
        // moving the shoot upwards
        var x = this.x + 30;
        var y = this.y;
        var thisVar = this;
        
        /// making the space craft shoot
        var id = setInterval(() => {
            y -= 10;
            this.html.style.top = y + "px";
            this.html.style.left = x + "px";
            // colliding the shoot with the box
            var index = boxes.findIndex(function(box){                
                return ((parseInt(thisVar.html.style.left)) >= (parseInt(box.html.style.left)) && (parseInt(thisVar.html.style.left)) <= (parseInt(box.html.style.left) + 75)) && (parseInt(thisVar.html.style.top) >= parseInt(box.html.style.top)+4 && (parseInt(thisVar.html.style.top) <= parseInt(box.html.style.top)+4));
            });
            
            this.collide(boxes[index], index);
            setTimeout(() => {                
                clearInterval(id);
            }, 2000);            

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
    this.html = create_ele('img', style, game_frame);
    this.html.src = isLuck == 0 ? "./imgs/mars.png" : "./imgs/stones.png";
}

// selectors
var audio = document.querySelectorAll('audio');
var muter = document.querySelector('#toggle-sound');
var exitBtn = document.querySelector('.exit');
var player = document.getElementById('player');
var game_frame = document.querySelector('.game-frame');
var stopMenu = document.getElementById("stop-menu");
var stop = document.getElementById('stop-game');
var isPlaying = true;
var isMusicPlaying = true;
var score = 0;
var scoreEle = document.getElementById('score');
var boxes = [];
var boxesCreated = 0;
var rows = 0;

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
    location.replace("index.html");
}

// starting the game
function start_game()
{
    // setting the position of the stop menu
    stop.style.top = (window.innerHeight - 550) / 2 + "px";
    // setting the position of the player
    player.style.top = window.innerHeight - 200 + "px";
    player.style.left = (window.innerWidth - parseInt(player.style.width)) / 2 + "px";

    // creating the rocks (boxes)
    push_row(0);
}

// game update
window.addEventListener("load", function(){
    // setting up every thing
    start_game();

    // pushing a row of rocks every 2 seconds
    var counter = 80;
    var id = setInterval(function(){
        if(isPlaying)
        {
            push_row(counter);
            counter += 80;
        }
        if(rows == 6)
        {
            isPlaying = false;            
            clearInterval(id);
            alert(":( sorry you lost");
        }
        // else if
        // {
        //     isPlaying = false;
        //     clearInterval(id);
        //     alert(":) Congrats you won");
        // }
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
        else if(e.keyCode == 77)
        {
            this.muter.onclick();
        }
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