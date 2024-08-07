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
fileSelector.addEventListener('change', () => {
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
        }
        
    }, false);
    feedback('upload');
    if (file) {
        reader.readAsText(file);
    }
});

let url = location.href.split('#')[1];
switch(url){
    case 'future':
        document.getElementById('future').style.display = "grid";
    break;
    case 'download':
        document.getElementById('download').style.display = "grid";
    break;
    case 'update':
        document.getElementById('update').style.display = "grid";
    break;
    case 'dimensional':
        document.getElementById('dimensional').style.display = "grid";
    break;
    case 'simulacra':
        document.getElementById('simulacra').style.display = "grid";
    break;
}

function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
  }
  
  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("mySidenav").style.padding = "60px 0 0 0";
  }

var acc = document.getElementsByClassName("accordion");
for (let i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
      this.classList.toggle("active");
      var panel = this.nextElementSibling;
      if (panel.style.display === "grid") {
        panel.style.display = "none";
      } else {
        panel.style.display = "grid";
      }
    });
  }

let isMobile = window.matchMedia("only screen and (max-width: 480px)").matches;
if(isMobile){
  var acc = document.getElementsByClassName("mobile-form");
  for (let i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
      for(let y = 0; y < acc.length; y++){
        if(acc[y].classList[1] == 'active'){
            acc[y].classList.remove('active')
            acc[y].nextElementSibling.style.height = "0px";
            acc[y].nextElementSibling.style.visibility = "hidden";
            acc[y].nextElementSibling.style.opacity = "0";
            acc[y].nextElementSibling.style.padding = "0";
        }
      }
      this.classList.toggle("active");
      var panel = this.nextElementSibling;
      if (window.getComputedStyle(panel, null).height > 0) {
        panel.style.height = "0px";
        panel.style.visibility = "hidden";
        panel.style.opacity = "0";
        panel.style.padding = "0";
      } else {
        panel.style.height = "auto";
        panel.style.visibility = "visible";
        panel.style.opacity = "1";
        panel.style.padding = "10px"
      }
    });
  }
}

function feedback(target){
  let text;
  let panel = document.getElementById('feedback-tab');
  let warningTab = document.getElementById('warning-tab');
  let warning = false;
  switch(target){
      case "calc-amound-runs":
          text = "Runs have been calculated."
      break;
      case "needed":
          text = "Simulacra has been added to goal.";
      break;
      case "change-amound-materials":
          text = "Materials have been updated.";
      break;
      case "change-amound-boxes":
          text = "Boxes have been updated.";
      break;
      case "change-amound-matrix":
          text = "Boxes have been updated.";
      break;
      case "change-amound-matrice":
          text = "Boxes have been updated.";
      break;
      case "change-amound-batteries":
          text = "Boxes have been updated.";
      break;
      case "addDimensional":
          text = "Dimensional runs added.";
      break;
      case "save":
        text = "Back-up made.";
      break;
      case "upload":
        text = "Materials, boxes and batteries uploaded.";
      break;
      case "upload-fail":
        text = "JSON file only! Make sure its the backup file.";
        warning = true;
      break;
  }
  if(!warning){
    panel.innerHTML = text;
    panel.style.height = "auto";
    panel.style.visibility = "visible";
    panel.style.opacity = "0.8";
    panel.style.padding = "10px"
    setTimeout(function(){
        panel.style.height = "0px";
        panel.style.visibility = "hidden";
        panel.style.opacity = "0";
        panel.style.padding = "0";}, 1000);
  }else{
    // panel.style.backgroundColor = "maroon";
    warningTab.innerHTML = text;
    warningTab.style.height = "auto";
    warningTab.style.visibility = "visible";
    warningTab.style.opacity = "0.8";
    warningTab.style.padding = "10px"
    setTimeout(function(){
      warningTab.style.height = "0px";
      warningTab.style.visibility = "hidden";
      warningTab.style.opacity = "0";
      warningTab.style.padding = "0";}, 2000);
  }

}
