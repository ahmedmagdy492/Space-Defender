// selecting elements
var body = document.body;
var pressKey = document.getElementsByClassName('blink-anim')[0];
var splash = document.getElementsByClassName("splash")[0];
var menu = document.querySelector('.main-menu');
var menuBtns = document.querySelector('.btns');
var music = document.querySelector('audio');
var sound = document.getElementById('toggle-sound');
body.style.background = "url(./imgs/back.png)";

// vars
var rndStars = Math.round(Math.random() * 10000);
var isPlaying = true;

// functions
function show_main_menu()
{
    // hiding splash screen
    splash.style.display = "none";

    // showing main-menu
    menu.style.display = "block";

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
        }, 300);
       
    }
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