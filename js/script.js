function clearAllFields(formId){
    document.getElementById(formId).reset();
}

function getDataFromForm(form, uploader){

    const songData = new Object();
    
    // General Info
    songData.url = document.getElementById(form.urlId).value;
    songData.title = document.getElementById(form.titleId).value;
    songData.band = document.getElementById(form.bandId).value;
    songData.user = document.getElementById(form.userId).value;

    // User impression
    songData.adjectives = document.getElementById(form.adjectivesId).value;
    songData.mood = document.getElementById(form.moodId).value;
    songData.momentInLife = document.getElementById(form.momentInLifeId).value;
    songData.associations = document.getElementById(form.associationsId).value;
    
    // Time and will add
    songData.favouriteMoments = document.getElementById(form.favouriteMomentsId).value;
    songData.horribleMoments = document.getElementById(form.horribleMomentsId).value;

    

    flagWillAddYesChecked = document.getElementById(form.willAddYesId).checked;
    flagWillAddNoChecked = document.getElementById(form.willAddNoId).checked;
    songData.willAdd = (flagWillAddYesChecked && !flagWillAddNoChecked) ? true : false;


    // More information
    songData.comment = document.getElementById(form.commentId).value;
    songData.imageData = uploader.getImageData();

    return songData;
}

function putDataIntoCard(card, songData){
    
    // Get all card fields
    let headingElement = document.getElementById(card.headingId);
    
    let adjectivesElement = document.getElementById(card.adjectivesId);
    let moodElement = document.getElementById(card.moodId);
    let momentInLifeElement = document.getElementById(card.momentInLifeId);
    let associationsElement = document.getElementById(card.associationsId);
    
    let favouriteMomentsElement = document.getElementById(card.favouriteMomentsId);
    let horribleMomentsElement = document.getElementById(card.horribleMomentsId);
    let willAddElement = document.getElementById(card.willAddId);


    let commentElement = document.getElementById(card.commentId);

    // Insert data

    // Insert heading

    headingElement.textContent = songData.band + " — " + songData.title;
    
    // Insert impression
    adjectivesElement.textContent = " " + songData.adjectives;
    moodElement.textContent = " " + songData.mood;
    momentInLifeElement.textContent = " " + songData.momentInLife;
    associationsElement.textContent = " " + songData.associations;
    
    // Insert time
    favouriteMomentsElement.textContent = "Favourite moments: " + songData.favouriteMoments;
    horribleMomentsElement.textContent = "Horrible moments: " + songData.horribleMoments;
    
    // Insert add status
    let userName = songData.user;
    willAddElement.textContent = (songData.willAdd) ? `${userName} added this song to their library!` : `${userName} did not add this song to their library.`;

    // comment
    commentElement.textContent = "Comment: " + songData.comment;

    // Image
    let doodleImageElement = document.getElementById(card.doodleImageId);
    if (songData.imageData) {
        doodleImageElement.src = songData.imageData;
        doodleImageElement.parentElement.style.display = "block";
        doodleImageElement.style.display = "block";
    }
    else{
        doodleImageElement.parentElement.style.display = "none";
        doodleImageElement.style.display = "none";
    }

}

function actionButtonSubmit(form, card, uploader){
    
    // Get data
    const songData = getDataFromForm(form, uploader);

    // Check data


    // Insert data
    putDataIntoCard(card, songData);

    let songCard = document.getElementById(card.cardId);
    songCard.style.display = 'flex';
    
    let buttonCapture = document.getElementById(form.buttonCaptureId);
    let breakButtonCapture = document.getElementById(form.breakButtonCaptureId);
    buttonCapture.style.display = 'inline';
    breakButtonCapture.style.display = 'block';
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

function closeDownloadWindow(downloadWindowId){
    let downloadWindow = document.getElementById(downloadWindowId);

    downloadWindow.style.display = "none";
}

function downloadImage(previewImageId, headingId){
    let previewImage = document.getElementById(previewImageId);

    if (previewImage.src){
        let link = document.createElement('a');
        link.href = previewImage.src;

        let cardHeading =  document.getElementById(headingId);
        link.download = `Card for ${cardHeading.textContent}.png`;
        link.click();
        link.remove();
    }
}


function captureCardAndDisplay(elementToCaptureId, previewImageId, downloadWindowId){
    const elementToCapture = document.getElementById(elementToCaptureId);
    const previewImage = document.getElementById(previewImageId);
    const downloadWindow = document.getElementById(downloadWindowId);

    html2canvas(elementToCapture).then((canvas) => {

        capturedImageData = canvas.toDataURL('image/png'); // Save captured image as data URL

        // Show the image in the window
        previewImage.src = capturedImageData;
        downloadWindow.style.display = 'flex'; // Show the window

});
}

document.addEventListener("DOMContentLoaded", function(event){

    const form = {
        formId: 'song-form',

        urlId: 'input-song-url',
        titleId: 'input-song-title',
        bandId: 'input-song-band',
        userId: 'input-user-name',
        
        adjectivesId: 'input-song-adjectives',
        moodId: 'input-song-mood',
        momentInLifeId: 'textarea-moment-in-life',
        associationsId: 'textarea-associations',
        
        favouriteMomentsId: 'input-song-favourite-moments',
        horribleMomentsId: 'input-song-horrible-moments',
        willAddYesId: 'input-will-add-yes',
        willAddNoId: 'input-will-add-no',
        
        commentId: 'textarea-song-comment',
        doodleInputId: 'input-image-doodle',
        
        buttoClearId: 'button-clear',
        buttonSubmitId: 'button-submit',
        buttonCaptureId: 'button-capture',
        breakButtonCaptureId: 'break-button-capture'
    };

    const card = {
        cardId: 'song-card',

        headingId: 'card-song-heading',

        adjectivesId: 'card-song-adjectives',
        moodId: 'card-song-mood',
        momentInLifeId: 'card-song-moment-in-life',
        associationsId: 'card-song-associations',

        favouriteMomentsId: 'card-song-favourite-moments',
        horribleMomentsId: 'card-song-horrible-moments',
        willAddId: 'card-song-will-add',

        doodleImageId: 'card-song-image-doodle',
        commentId: 'card-song-comment'
    }

    const downloadWindow ={
        downloadWindowId: 'download-window',
        buttonDownloadId: 'button-download',
        buttonCloseWindowId: 'button-close',
        previewImageId: 'preview-image',

    }


    const uploader = setupFileUploader(form.doodleInputId);
    
    buttonClear = document.getElementById(form.buttoClearId);
    buttonClear.addEventListener("click", () =>{
        clearAllFields(form.formId);
    });

    buttonSubmit = document.getElementById(form.buttonSubmitId);
    buttonSubmit.addEventListener('click', () => {
        actionButtonSubmit(form, card, uploader);
    });
    
    buttonClose = document.getElementById(downloadWindow.buttonCloseWindowId);
    buttonClose.addEventListener('click', () => {
        closeDownloadWindow(downloadWindow.downloadWindowId);
    })

    buttonDownload = document.getElementById(downloadWindow.buttonDownloadId);
    buttonDownload.addEventListener('click', () => {
        downloadImage(downloadWindow.previewImageId, card.headingId);
    })

    buttonCapture =  document.getElementById(form.buttonCaptureId);
    buttonCapture.addEventListener('click', () => {
            captureCardAndDisplay(card.cardId, downloadWindow.previewImageId, downloadWindow.downloadWindowId);
        });


});

