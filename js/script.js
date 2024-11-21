

function clearAllFields(){
    document.getElementById('song-form').reset();
}

function actionButtonSubmit(uploader){
    // General Info
    const songUrl = document.getElementById('input-song-url').value;
    const songName = document.getElementById('input-song-name').value;
    const bandName = document.getElementById('input-band-name').value;

    // Your impression
    const songAdjectives = document.getElementById('input-song-adjectives').value;
    const songMood = document.getElementById('input-song-mood').value;
    const momentInLife = document.getElementById('textarea-moment-in-life').value;
    const associations = document.getElementById('textarea-associations').value;

    // Time
    const songFavouriteMoments = document.getElementById('input-song-favourite-moments').value;
    const songHorribleMoments= document.getElementById('input-song-horrible-moments').value;

    // More information

    const willAddYes = document.getElementById('input-will-add-yes').checked;    
    const willAddNo = document.getElementById('input-will-add-no').checked;
    
    const songComments = document.getElementById('textarea-song-comments').value;

    // Doodle
    const imageData = uploader.getImageData();
    if (imageData) {
        const placeUploadImage = document.getElementById('card-doodle');
        placeUploadImage.src = imageData;
        placeUploadImage.style.display = "block";
    }

    console.log(
        songUrl + songName + bandName +
        songAdjectives + songMood + 
        momentInLife + associations +
        songFavouriteMoments + songHorribleMoments +
        songComments  
    );
    console.log(willAddNo);
    // var img = document.createElement('img');
    // img.alt = "DOODLE";
    // img.src = doodle;
    // document.body.appendChild(img);
}

function setupFileUploader(fileInputElementId){
    // Function that creates an EventListener for fileInputElement
    let uploadedImageData = "";

    const inputElement = document.getElementById(fileInputElementId);

    inputElement.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                uploadedImageData = e.target.result;
            }
            reader.readAsDataURL(file);
        }
    })
    return {
        getImageData: () => uploadedImageData,
    };
}

document.addEventListener("DOMContentLoaded", function(event){

    const uploader = setupFileUploader('input-image-doodle');
    
    buttonClear = document.getElementById('button-clear');
    buttonClear.addEventListener("click", clearAllFields);

    buttonSubmit = document.getElementById('button-submit');
    buttonSubmit.addEventListener('click', () => {
        actionButtonSubmit(uploader);
    });
});

