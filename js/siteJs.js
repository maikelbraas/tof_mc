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
        console.log(parseInt(window.getComputedStyle(panel, null).height));
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
