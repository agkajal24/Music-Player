let currentMusic = 0;
let songImage = document.querySelector(".song_image");
let songName = document.querySelector("#song_name");
let artistName = document.querySelector("#artist_name");

let bckBtn = document.querySelector("#bckBtn");
let frwdBtn = document.querySelector("#frwdBtn");

let progress = document.getElementById("progress");
let song = document.getElementById("song");
let ctrlIcon = document.getElementById("ctrlIcon");
let intervalId = null;


window.addEventListener("load", () => {
    song.pause();
    song.currentTime = 0;
});

// ctrlIcon.addEventListener("click", () => {
//     song.play();
// });

song.addEventListener("ended", ()=>{
    song.pause();
    song.currentTime = 0;
    progress.value = 0;
    ctrlIcon.classList.add("fa-play");
    ctrlIcon.classList.remove("fa-pause");
    clearInterval(intervalId);
});


song.onloadedmetadata = function(){
    progress.max = song.duration;
    progress.value = 0;
};

const setMusic = (i) => {
    clearInterval(intervalId);

    progress.value = 0;
    let song1 = songs[i];
    currentMusic = i;

    song.src = song1.path;
    song.load();

    songName.innerHTML = song1.name;
    artistName.innerHTML = song1.artist;
    songImage.src = song1.imagee;
};


setMusic(0);

function playPause(){
    if(ctrlIcon.classList.contains("fa-pause")){
        song.pause();
        ctrlIcon.classList.remove("fa-pause");
        ctrlIcon.classList.add("fa-play");

    }
    else{
        song.play();
        ctrlIcon.classList.add("fa-pause");
        ctrlIcon.classList.remove("fa-play");

        intervalId = setInterval(() => {
            progress.value = song.currentTime;
        }, 500);
    }
};


// progress.onchange = function(){
//     song.play();
//     song.currentTime = progress.value;
//     ctrlIcon.classList.add("fa-pause");
//     ctrlIcon.classList.remove("fa-paly");
// };

progress.oninput = () => {
    song.currentTime = progress.value;
};


frwdBtn.addEventListener('click', () => {
    if(currentMusic >= songs.length - 1){
        currentMusic = 0;
    }
    else{
        currentMusic++;
    }
    setMusic(currentMusic);
    song.play();
    ctrlIcon.classList.replace("fa-play", "fa-pause");
     intervalId = setInterval(() => {
        progress.value = song.currentTime;
    }) 
});

bckBtn.addEventListener('click', () => {
    if(currentMusic <= 0){
        currentMusic = songs.length - 1;
    }
    else{
        currentMusic--;
    }
    setMusic(currentMusic);
    song.play();
    ctrlIcon.classList.replace("fa-play", "fa-pause");
     intervalId = setInterval(() => {
        progress.value = song.currentTime;
    }) 
});