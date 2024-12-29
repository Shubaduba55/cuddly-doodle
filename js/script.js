function clearAllFields(formId){
    document.getElementById(formId).reset();
}

function applyUnfilledStyle(elementId){
    document.getElementById(elementId).classList.add("unfilled-field-form");
}

function removeUnfilledStyle(elementId){
    document.getElementById(elementId).classList.remove("unfilled-field-form");
}

function removeUnfilledStyleAll(form, mandatoryFields){
    let id;
    mandatoryFields.forEach(formElement => {
        id = form[formElement];
        removeUnfilledStyle(id);
    });
}

function isFieldFilled(fieldValue, fieldId){
    if (fieldValue == ""){
        applyUnfilledStyle(fieldId);
        return false;
    }
    else{
        return true;
    }
}

function getDataFromForm(form, uploader){

    const songData = new Object();
    let isMandatoryDataPresent = true;

    // General Info
    songData.url = document.getElementById(form.urlId).value;

    songData.title = document.getElementById(form.titleId).value;
    isMandatoryDataPresent &= isFieldFilled(songData.title, form.titleId);

    songData.band = document.getElementById(form.bandId).value;
    isMandatoryDataPresent &= isFieldFilled(songData.band, form.bandId);

    songData.user = document.getElementById(form.userId).value;
    isMandatoryDataPresent &= isFieldFilled(songData.user, form.userId);
    

    // User impression
    songData.adjectives = document.getElementById(form.adjectivesId).value;
    isMandatoryDataPresent &= isFieldFilled(songData.adjectives, form.adjectivesId);

    songData.mood = document.getElementById(form.moodId).value;
    isMandatoryDataPresent &= isFieldFilled(songData.mood, form.moodId);
    
    songData.momentInLife = document.getElementById(form.momentInLifeId).value;
    isMandatoryDataPresent &= isFieldFilled(songData.momentInLife, form.momentInLifeId);
    
    songData.associations = document.getElementById(form.associationsId).value;
    isMandatoryDataPresent &= isFieldFilled(songData.associations, form.associationsId);

    // Time and will add
    songData.favouriteMoments = document.getElementById(form.favouriteMomentsId).value;
    songData.horribleMoments = document.getElementById(form.horribleMomentsId).value;

    

    flagWillAddYesChecked = document.getElementById(form.willAddYesId).checked;
    flagWillAddNoChecked = document.getElementById(form.willAddNoId).checked;
    songData.willAdd = (flagWillAddYesChecked && !flagWillAddNoChecked) ? true : false;


    // More information
    songData.comment = document.getElementById(form.commentId).value;
    songData.imageData = uploader.getImageData();
    songData.isMandatoryDataPresent = isMandatoryDataPresent;

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

    if (songData.isMandatoryDataPresent == false){
        return;
    }

    // Insert data
    putDataIntoCard(card, songData);

    let songCard = document.getElementById(card.cardId);
    songCard.style.display = 'flex';
    
    let buttonCapture = document.getElementById(form.buttonCaptureId);
    let breakButtonCapture = document.getElementById(form.breakButtonCaptureId);
    buttonCapture.style.display = 'inline';
    breakButtonCapture.style.display = 'block';
    return;
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

async function fetchJSONData(filePath){

    try {
        const response = await fetch(filePath);

        if (!response.ok){
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        return data;
    } catch (error){
        console.error("Error reading JSON file: ", error);
        return null;
    }
}

document.addEventListener("DOMContentLoaded", async function(event){

    const formFilePath = "./json/form.json";
    const mandatoryFieldsFilePath = "./json/mandatory_fields.json";
    const cardFilePath = "./json/card.json";
    const downloadWindowFilePath = "./json/download_window.json";


    const form = await fetchJSONData(formFilePath);

    // It is crucial to put "await fetchJSONData(...)" in brackets and ONLY THEN reference "mandatoryFields"
    // I guess, if we don't use the brackets, the data is not fetched in time, so when we reference 
    // "mandatoryFields" we receive undefined
    const mandatoryFields = (await fetchJSONData(mandatoryFieldsFilePath))["mandatoryFields"];;

    const card =  await fetchJSONData(cardFilePath);

    const downloadWindow = await fetchJSONData(downloadWindowFilePath);
    

    const uploader = setupFileUploader(form.doodleInputId);
    
    buttonClear = document.getElementById(form.buttoClearId);
    await buttonClear.addEventListener("click", async () =>{
        clearAllFields(form.formId);
        console.log(mandatoryFields);
        if (mandatoryFields){

            removeUnfilledStyleAll(form, mandatoryFields);

        } else {
            console.log("File 'mandatory_fields.json' could not be loaded.");
        }

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

