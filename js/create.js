document.getElementsByClassName('materials')[0].addEventListener('click', showLocalStorage);
document.getElementsByClassName('boxes')[0].addEventListener('click', showLocalStorage);
document.getElementsByClassName('simulacrum')[0].addEventListener('click', showLocalStorage);
document.getElementById('addSim').addEventListener('click', addTextBox);

document.getElementById('materials').addEventListener('submit', handleSubmit);
document.getElementById('boxes').addEventListener('submit', handleSubmit);
document.getElementById('simulacrum').addEventListener('submit', handleSubmit);
