

function clearAllFields(){
    document.getElementById('song-form').reset();
}

document.addEventListener("DOMContentLoaded", function(event){
    
    buttonClear = document.getElementById('button-clear');

    buttonClear.addEventListener("click", clearAllFields);
});

