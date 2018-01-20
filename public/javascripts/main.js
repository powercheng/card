function show(str) {
	document.getElementById("layBg").style.display="block";
	document.getElementById(str).style.display="block";
}

function closeIt(str) {
	document.getElementById("layBg").style.display="none";
	document.getElementById(str).style.display="none";
}

function music(){    
    var audio = document.getElementById("musicId");
    if (audio.paused) {
        audio.play();
        document.getElementById("musicImage").style.backgroundImage = "url(../images/music-btn-open.png)"; 
    } else {
        audio.pause();
        document.getElementById("musicImage").style.backgroundImage = "url(../images/music-btn-close.png)"; 
    }
}