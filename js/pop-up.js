const confirmPoper = document.querySelector('.confirm');
confirmPoper.style.left = (window.innerWidth - parseInt(confirmPoper.style.width)) / 2;
confirmPoper.style.top = (window.innerHeight - parseInt(confirmPoper.style.height)) / 2;
const confirmPopUp = function(title)
{
    this.title = title;
    this.Confirmed = function()
    {
        
    }
}