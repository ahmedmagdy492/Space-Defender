// selecting elements
var body = document.body;
var pressKey = document.getElementsByClassName('blink-anim')[0];
var splash = document.getElementsByClassName("splash")[0];
var menu = document.querySelector('.main-menu');
var menuBtns = document.querySelector('.btns');
var music = document.querySelector('audio');
var sound = document.getElementById('toggle-sound');
var start_btn = document.querySelector('#start_btn');
var inName = document.querySelector("input[type=text]");
var lastScore = document.getElementById('last-score');
var animImg = document.getElementById("anim-img");
// var welcome = document.getElementById('welcome');
body.style.background = "url(./imgs/back.png)";

// vars
var isPlaying = true;

// functions
function show_main_menu()
{
    // hiding splash screen
    splash.style.display = "none";

    // show or hide the input
    // if(localStorage.getItem("name") != null)
    // {
    //     welcome.style.display = "block";
    //     inName.style.display = "none";
    //     welcome.innerText = "Welcome " + localStorage.getItem("name");
    // }
    // else{
    //     welcome.style.display = "none";
    //     inName.style.display = "block";
    // }

    // showing main-menu
    menu.style.display = "block";

    // switching to the background music
    // music.pause();
    // music.src = "./audio/bck.mp3";
    // music.play();
    // showing sound muter
    sound.style.display = "block";
}

window.onload = function()
{
    // playing the background sound
    this.music.play();
    this.body.onkeypress = function(e)
    {
        pressKey.classList.remove('blink-anim');
        pressKey.classList.add('pressed-anim');
        setTimeout(function(){
            pressKey.classList.remove('pressed-anim');
        }, 300);
        // move to main menu
        setTimeout(function(){
            this.show_main_menu();
            // focusing on the input
            this.inName.focus();
            // showing the last score
            lastScore.innerText = "Your Last Score was " + (localStorage.getItem("score") != null ? localStorage.getItem("score") : 0);
            // adding animation to the img
            
        }, 300);
       
    }

    /// starting the game after hitting enter
    this.inName.onkeydown = function(e)
    {
        if(e.keyCode == 13)
        {
            if(inName.value != "")
            {
                // saving name to localstorage
                localStorage.setItem("name", inName.value);
                // start the game when hitting enter                
                location.replace("game.html");
            }
        }
    }
}

// starting the game 
start_btn.onclick = function()
{
    // checking whether he entered a name or not
    if(inName.value != "")
    {
        // start the game
        location.replace("game.html");
    }
    // if(inName.value == "" && localStorage.getItem("name") == null)
    // {
    //     // saving name to localstorage
    //     localStorage.setItem("name", inName.value);
    // }
    // else if(inName.value == "" && localStorage.getItem("name") != null)
    // {
    //     // start the game
    //     location.replace("game.html");
    // }
}

// mute/unmute sound
sound.onclick = function()
{
    if(isPlaying)
    {
        music.pause();
        isPlaying = false;
        sound.src = "./imgs/no-sound.png";
    }
    else{
        music.play();
        isPlaying = true;
        sound.src = "./imgs/sound.png";
    }
}