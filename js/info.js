
document.getElementById('save').addEventListener('click', ()=>{getLocalstorageToFile('tofmc-materials.json')})

function getLocalstorageToFile(fileName) {
  
  /* dump local storage to string */
  
  var a = {};
  let store = ['boxes', 'materials', 'battery'];
  for(let i = 0; i < store.length; i++){
  var k = store[i];
  var v = JSON.parse(localStorage.getItem(k));
  a[k] = [v];
  }
  
  
  /* save as blob */
  
  var textToSave = JSON.stringify(a)
  var textToSaveAsBlob = new Blob([textToSave], {
    type: "text/plain"
  });
  var textToSaveAsURL = window.URL.createObjectURL(textToSaveAsBlob);
  
  /* download without button hack */
  
  var downloadLink = document.createElement("a");
  downloadLink.download = fileName;
  downloadLink.innerHTML = "Download File";
  downloadLink.href = textToSaveAsURL;
  downloadLink.onclick = function () {
    document.body.removeChild(event.target);
  };
  downloadLink.style.display = "none";
  document.body.appendChild(downloadLink);
  downloadLink.click();
  feedback('save');
}

const fileSelector = document.getElementById('backup');
fileSelector.addEventListener('change', (event) => {
    const [file] = document.querySelector('input[type=file]').files;
    if(file.type !== 'application/json'){
      feedback('upload-fail');
      // alert("JSON file only. Make sure its from the site.");
      return false;
    }
    const reader = new FileReader();

    reader.addEventListener("load", () => {
        // this will then display a text file
        let mats = Object.entries(JSON.parse(reader.result));
        for(let i = 0; i < mats.length; i++){
          localStorage.setItem(mats[i][0], JSON.stringify(mats[i][1][0]));
          console.log(mats[i][1][0]);
        }
        
    }, false);
    feedback('upload');
    if (file) {
        reader.readAsText(file);
    }
});