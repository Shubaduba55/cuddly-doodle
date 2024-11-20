

function clearAllFields(){
    document.getElementById('song-form').reset();
}

function actionButtonSubmit(){
    // General Info
    songUrl = document.getElementById('song-url');
    songName = document.getElementById('song-name');
    bandName = document.getElementById('band-name');

    // Your impression
    songAdjectives = document.getElementById('song-adjectives');
    songMood = document.getElementById('song-mood');
    momentInLife = document.getElementById('moment-in-life');
    associations = document.getElementById('associations');

    // Time
    songFavouriteMoments = document.getElementById('song-favourite-moments');
    songHorribleMoments= document.getElementById('song-horrible-moments');

    // More information

    // Add the song?
    
    songComments = document.getElementById('song-comments');

    // Doodle

    console.log(
        songUrl.value
    );

}

document.addEventListener("DOMContentLoaded", function(event){
    
    buttonClear = document.getElementById('button-clear');
    buttonClear.addEventListener("click", clearAllFields);

    buttonSubmit = document.getElementById('button-submit');
    buttonSubmit.addEventListener('click', actionButtonSubmit);
    
});

